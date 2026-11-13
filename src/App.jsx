import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./components/sections/Home";
import AboutMe from "./components/sections/AboutMe";
import { getProject } from "./data/ProjectsData";
import { clearReturn, getReturn, isReturning } from "./utils/homeReturn";

// Section di bawah fold dan halaman detail dipecah jadi chunk sendiri supaya JS awal lebih kecil
const loadExperience = () => import("./components/sections/Experience");
const loadProjects = () => import("./components/sections/Projects");
const loadOrganizational = () => import("./components/sections/Organizational");
const loadSkills = () => import("./components/sections/Skills");
const loadCourses = () => import("./components/sections/Courses");
const loadFooter = () => import("./components/layout/Footer");

const Experience = lazy(loadExperience);
const Projects = lazy(loadProjects);
const Organizational = lazy(loadOrganizational);
const Skills = lazy(loadSkills);
const Courses = lazy(loadCourses);
const Footer = lazy(loadFooter);
const ProjectDetail = lazy(() => import("./components/sections/ProjectDetail"));

// Urutan tampil di halaman; di-mount satu per satu supaya tidak jadi satu tugas panjang di main thread
const BELOW_FOLD = [
  { key: "experience", load: loadExperience, Component: Experience },
  { key: "projects", load: loadProjects, Component: Projects },
  { key: "organizational", load: loadOrganizational, Component: Organizational },
  { key: "skills", load: loadSkills, Component: Skills },
  { key: "courses", load: loadCourses, Component: Courses },
  { key: "contact", load: loadFooter, Component: Footer },
];

// Refresh selalu mulai dari atas. scrollRestoration saja tidak cukup (GSAP mengembalikannya ke "auto" setelah load),
// jadi posisi juga dikembalikan ke 0 sebelum halaman ditutup/di-refresh; yang dipulihkan browser jadi posisi atas.
if (typeof window !== "undefined") {
  if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  window.addEventListener("beforeunload", () => window.scrollTo(0, 0));
}

// Pindah halaman selalu mulai dari atas; kembali ke "/#projects" (dari detail project) menggulir ke section itu
function ScrollManager({ lenisRef }) {
  const { pathname, hash } = useLocation();

  // Layout effect: jalan sebelum halaman baru membuat ScrollTrigger-nya. ScrollTrigger mengingat posisi scroll
  // terakhir dan mengembalikannya saat refresh(), jadi memorinya dibersihkan; Lenis juga punya posisi targetnya sendiri.
  useLayoutEffect(() => {
    if (hash || (pathname === "/" && isReturning())) return;
    ScrollTrigger.clearScrollMemory();
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname, hash, lenisRef]);

  // Kembali ke Home dari detail project (tombol back HP/browser atau link "Back to projects"): gulir ke baris project
  // yang tadi dibuka, di posisi layar yang sama seperti saat diklik. Section di-mount bertahap dan ScrollTrigger.refresh()
  // menggeser scroll berkali-kali, jadi digulir setelah semuanya "ready"; halaman disembunyikan selama itu supaya tidak
  // terlihat melompat-lompat.
  useEffect(() => {
    if (pathname !== "/" || !isReturning()) return;
    const { slug, offset } = getReturn();
    const root = document.documentElement;
    root.dataset.restoring = "1";
    if (hash) window.history.replaceState(window.history.state, "", pathname + window.location.search);

    const apply = () => {
      const row = document.querySelector(`a[href="/projects/${slug}"]`);
      const top = row ? row.getBoundingClientRect().top + window.scrollY - offset : document.getElementById("projects")?.offsetTop;
      if (top === undefined) return false;
      lenisRef.current?.scrollTo(top, { immediate: true, force: true });
      window.scrollTo(0, top);
      return true;
    };
    const finish = () => {
      delete root.dataset.restoring;
      clearReturn();
    };

    let tries = 0;
    const timers = [];
    const poll = setInterval(() => {
      const ready = root.dataset.belowFold === "ready";
      if (ready && apply()) {
        clearInterval(poll);
        // Gambar yang baru selesai dimuat bisa menggeser tinggi halaman; terapkan lagi sebentar setelahnya
        timers.push(setTimeout(apply, 350), setTimeout(apply, 900), setTimeout(finish, 950));
      } else if (++tries >= 50) {
        clearInterval(poll);
        apply();
        finish();
      }
    }, 100);
    return () => {
      clearInterval(poll);
      timers.forEach(clearTimeout);
      delete root.dataset.restoring;
    };
  }, [pathname, hash, lenisRef]);

  useEffect(() => {
    if (!hash || (pathname === "/" && isReturning())) return;
    // Tinggi halaman masih bergeser saat font/gambar dimuat, jadi coba lagi sekali.
    // Section lazy mungkin belum ada di DOM: tunggu (maksimal 4 detik) sampai semuanya ter-mount, lalu gulir.
    const go = () => document.querySelector(hash)?.scrollIntoView();
    let tries = 0;
    const poll = setInterval(() => {
      if (document.documentElement.dataset.belowFold === "ready" && document.querySelector(hash)) {
        clearInterval(poll);
        go();
      } else if (++tries >= 40) clearInterval(poll);
    }, 100);
    const t1 = setTimeout(go, 150);
    const t2 = setTimeout(() => {
      go();
      // Hash cuma alat untuk menggulir ke section; dibuang dari URL supaya refresh mulai dari Home, bukan lompat ke section itu
      window.history.replaceState(window.history.state, "", pathname + window.location.search);
    }, 900);
    return () => {
      clearInterval(poll);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, hash]);

  return null;
}

// Pengganti section yang belum di-mount; tinggi kira-kira supaya scrollbar tidak terlalu menipu
const BelowFoldPlaceholder = () => <div aria-hidden="true" style={{ minHeight: "300vh" }} />;

// Section di bawah fold mulai dimuat setelah halaman idle, atau begitu pengunjung berinteraksi, lalu di-mount bertahap.
// Kalau URL punya hash (mis. kembali ke "/#projects"), semuanya langsung di-mount.
function BelowFold() {
  const [count, setCount] = useState(() => (window.location.hash || isReturning() ? BELOW_FOLD.length : 0));
  const [started, setStarted] = useState(() => count > 0);
  const [eager, setEager] = useState(false); // sudah berinteraksi: tidak perlu menunggu idle lagi

  useEffect(() => {
    if (started) return;
    const start = () => {
      setEager(true);
      setStarted(true);
    };
    const events = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"];
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));

    let idle;
    const arm = () => {
      idle = "requestIdleCallback" in window ? window.requestIdleCallback(() => setStarted(true), { timeout: 4000 }) : setTimeout(() => setStarted(true), 2500);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    return () => {
      events.forEach((e) => window.removeEventListener(e, start));
      window.removeEventListener("load", arm);
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, [started]);

  // Setelah mulai: unduh semua chunk (murah), lalu naikkan jumlah section yang di-mount satu per satu
  useEffect(() => {
    if (started) BELOW_FOLD.forEach((s) => s.load());
  }, [started]);

  useEffect(() => {
    if (!started || count >= BELOW_FOLD.length) return;
    const next = () => setCount((c) => c + 1);
    if (eager || !("requestIdleCallback" in window)) {
      const t = setTimeout(next, 60);
      return () => clearTimeout(t);
    }
    const id = window.requestIdleCallback(next, { timeout: 600 });
    return () => window.cancelIdleCallback(id);
  }, [started, count, eager]);

  // Tanda "ready" milik instance ini; dihapus saat Home ditinggalkan supaya kunjungan berikutnya menunggu lagi
  useEffect(
    () => () => {
      delete document.documentElement.dataset.belowFold;
    },
    []
  );

  // Tandai kapan semua section sudah ter-mount dan ScrollTrigger-nya sempat refresh. Menggulir sebelum itu bisa
  // dibatalkan refresh (ScrollTrigger mengembalikan posisi lama), jadi klik navbar menunggu tanda ini.
  useEffect(() => {
    if (count < BELOW_FOLD.length) return;
    const t = setTimeout(() => {
      document.documentElement.dataset.belowFold = "ready";
    }, 800);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <>
      {BELOW_FOLD.slice(0, count).map(({ key, Component }) => (
        <Suspense key={key} fallback={null}>
          <Component />
        </Suspense>
      ))}
      {count < BELOW_FOLD.length && <BelowFoldPlaceholder />}
    </>
  );
}

// Halaman utama: semua section dengan navbar
function HomePage() {
  return (
    <>
      <Navbar />
      <Home />
      <AboutMe />
      <BelowFold />
    </>
  );
}

// Detail project: tanpa navbar. key = slug supaya pindah project me-mount ulang halamannya
function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <Navigate to={{ pathname: "/", hash: "#projects" }} replace />;
  return (
    <Suspense fallback={null}>
      <ProjectDetail key={project.slug} project={project} />
    </Suspense>
  );
}

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    function easeOutCubic(x) {
      return 1 - Math.pow(1 - x, 3);
    }

    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      easing: easeOutCubic,
    });
    lenisRef.current = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollManager lenisRef={lenisRef} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
