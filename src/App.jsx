import { useEffect, useLayoutEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./components/sections/Home";
import AboutMe from "./components/sections/AboutMe";
import Projects from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import Organizational from "./components/sections/Organizational";
import Skills from "./components/sections/Skills";
import Courses from "./components/sections/Courses";
import ProjectDetail from "./components/sections/ProjectDetail";
import Footer from "./components/layout/Footer";
import { getProject } from "./data/ProjectsData";

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
    if (hash) return;
    ScrollTrigger.clearScrollMemory();
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname, hash, lenisRef]);

  useEffect(() => {
    if (!hash) return;
    // Tinggi halaman masih bergeser saat font/gambar dimuat, jadi coba lagi sekali
    const go = () => document.querySelector(hash)?.scrollIntoView();
    const t1 = setTimeout(go, 150);
    const t2 = setTimeout(() => {
      go();
      // Hash cuma alat untuk menggulir ke section; dibuang dari URL supaya refresh mulai dari Home, bukan lompat ke section itu
      window.history.replaceState(window.history.state, "", pathname + window.location.search);
    }, 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, hash]);

  return null;
}

// Halaman utama: semua section dengan navbar
function HomePage() {
  return (
    <>
      <Navbar />
      <Home />
      <AboutMe />
      <Experience />
      <Projects />
      <Organizational />
      <Skills />
      <Courses />
      <Footer />
    </>
  );
}

// Detail project: tanpa navbar. key = slug supaya pindah project me-mount ulang halamannya
function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <Navigate to={{ pathname: "/", hash: "#projects" }} replace />;
  return <ProjectDetail key={project.slug} project={project} />;
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
