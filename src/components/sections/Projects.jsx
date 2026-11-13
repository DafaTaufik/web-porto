import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { rememberClick } from "../../utils/homeReturn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createReplay } from "../../utils/replayOnVisit";
import { ProjectsData } from "../../data/ProjectsData";
import { COVERS, SHOTS } from "../ui/ProjectPlaceholders";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

const MASK = "block overflow-hidden pb-[0.05em]";
const STEP = 1.4; // detik per slide
const pad = (n) => String(n).padStart(2, "0");
const isPh = (text) => text.startsWith("[");

// Asal project (field `origin` di ProjectsData). Ikon: SVG inline, stroke 2, viewBox 24.
const ORIGINS = {
  internship: {
    label: "Internship",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
      </>
    ),
  },
  campus: {
    label: "Campus project",
    icon: (
      <>
        <path d="M22 10L12 5 2 10l10 5 10-5z" />
        <path d="M6 12v5c3 2 9 2 12 0v-5" />
      </>
    ),
  },
  personal: {
    label: "Personal project",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
  },
  family: {
    label: "Family business",
    icon: (
      <>
        <path d="M3 9l1.5-5h15L21 9" />
        <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
        <path d="M5 12v8h14v-8" />
        <path d="M10 20v-5h4v5" />
      </>
    ),
  },
};

// Pill asal project. Dirender dua kali: .pj-tr (kolom kanan, desktop) dan .pj-tt (pojok thumbnail, <=1000px)
function OriginTag({ origin, className }) {
  return (
    <span aria-hidden="true" className={`pj-tag ${className}`}>
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {origin.icon}
      </svg>
      {origin.label}
    </span>
  );
}

// Tiga ponsel dekoratif. Tiap ponsel: [data-depth] (parallax GSAP) > .pj-flN (float CSS)
function PhoneCluster() {
  return (
    <div aria-hidden="true" className="pj-dec absolute right-0 -top-6 z-0 h-[400px] w-[300px] pointer-events-none">
      <div data-depth="0.4" className="absolute left-2.5 top-[70px]">
        <div className="pj-fl2">
          <div className="box-border h-[230px] w-44 -rotate-[9deg] rounded-[28px] bg-[#ECECEC] p-2 shadow-[0_18px_36px_rgba(0,0,0,0.1)]">
            <div className="box-border h-full w-full rounded-[21px] border-[3px] border-[#1D1D1D] bg-[#F4F4F4]" />
          </div>
        </div>
      </div>
      <div data-depth="0.8" className="absolute left-24 top-6">
        <div className="pj-fl3">
          <div className="box-border h-[230px] w-44 rotate-[7deg] rounded-[28px] bg-[#ECECEC] p-2 shadow-[0_18px_36px_rgba(0,0,0,0.1)]">
            <div className="box-border flex h-full w-full flex-col gap-2.5 rounded-[21px] border-[3px] border-[#1D1D1D] bg-[#F4F4F4] p-4">
              <span className="h-2 w-1/2 rounded bg-[#D1D5DB]" />
              <span className="h-2 w-3/4 rounded bg-[#E5E7EB]" />
            </div>
          </div>
        </div>
      </div>
      <div data-depth="1.2" className="absolute left-[52px] top-[150px]">
        <div className="pj-fl1">
          <div className="box-border h-[250px] w-[196px] -rotate-2 rounded-[30px] bg-[#ECECEC] p-[9px] shadow-[0_26px_50px_rgba(0,0,0,0.18)]">
            <div className="relative box-border flex h-full w-full flex-col gap-3 overflow-hidden rounded-[22px] border-[3px] border-[#1D1D1D] bg-[#F4F4F4] p-4">
              <div className="flex gap-1.5">
                <span className="h-[9px] w-[9px] rounded-full bg-[#1D1D1D]" />
                <span className="h-[9px] w-[9px] rounded-full bg-[#9CA3AF]" />
                <span className="h-[9px] w-[9px] rounded-full bg-[#9CA3AF]" />
              </div>
              <div className="font-HWT text-[92px] leading-none text-transparent [-webkit-text-stroke:2px_#1D1D1D]">03</div>
              <div className="mt-auto flex gap-1.5 border-t-2 border-dashed border-[#1D1D1D] pt-2.5">
                <span className="rounded-full bg-[#1D1D1D] px-2.5 py-1 text-[11px] font-semibold text-white">Go</span>
                <span className="rounded-full border border-[#D4D4D4] bg-white px-2.5 py-1 text-[11px] font-semibold">Kotlin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slides({ project, index }) {
  if (project.images.length) {
    return project.images.map((src, i) => (
      <div key={src} data-sl className="pj-sl">
        <img src={src} alt={i === 0 ? `${project.title} preview` : ""} loading={index ? "lazy" : undefined} />
      </div>
    ));
  }
  return [COVERS[index % COVERS.length], ...SHOTS].map((node, i) => (
    <div key={i} data-sl className="pj-sl" style={{ flexDirection: "column", gap: 10 }}>
      {node}
    </div>
  ));
}

function Row({ project, index }) {
  const slideCount = project.images.length || 1 + SHOTS.length;
  const typeIsPh = isPh(project.meta.type);
  const origin = ORIGINS[project.origin];
  // Link internal (/projects/:slug) lewat router; selain itu anchor biasa
  const href = project.slug ? `/projects/${project.slug}` : "#";
  const internal = Boolean(project.slug);
  const RowLink = internal ? Link : "a";
  const rowProps = internal ? { to: href, onClick: (e) => rememberClick(project.slug, e.currentTarget) } : { href };

  return (
    <div data-rv className="relative">
      <span aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-[#D4D4D4]" />
      <span aria-hidden="true" data-ln className="absolute left-0 right-0 top-0 h-0.5 bg-[#1D1D1D] origin-left" />
      <RowLink {...rowProps} data-row className="pj-row">
        <span aria-hidden="true" className="pj-ix">
          {pad(index + 1)}
        </span>

        <div aria-hidden="true" className="pj-thumb">
          <Slides project={project} index={index} />
          {slideCount > 1 && (
            <span className="pj-bars">
              {Array.from({ length: slideCount }, (_, i) => (
                <span key={i} data-bar className="pj-bar">
                  <i />
                </span>
              ))}
            </span>
          )}
          {origin && <OriginTag origin={origin} className="pj-tt" />}
        </div>

        <div className="pj-body flex min-w-0 flex-col gap-3.5">
          {origin && <span className="sr-only">Project type: {origin.label}.</span>}
          <div className="flex flex-wrap gap-2">
            <span className={`rounded-full border border-[#1D1D1D] bg-white px-3 py-[5px] text-xs font-bold uppercase tracking-[0.08em] ${typeIsPh ? "italic" : ""}`}>{project.meta.type}</span>
            {project.meta.year && <span className="rounded-full border border-[#D4D4D4] bg-white px-3 py-[5px] text-xs font-semibold text-[#4B5563]">{project.meta.year}</span>}
            {project.meta.status && <span className="rounded-full bg-[#1D1D1D] px-3 py-[5px] text-xs font-semibold text-white">{project.meta.status}</span>}
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#6B7280]">{project.meta.role}</span>
          <h3 className="pj-nm">{project.title}</h3>
          <p className={`m-0 max-w-[520px] text-base font-medium leading-[1.65] ${isPh(project.summary) ? "italic text-[#6B7280]" : "text-[#4B5563]"}`}>{project.summary}</p>
          <div className="flex flex-wrap gap-2 border-t-2 border-dashed border-[#1D1D1D] pt-3.5">
            {project.stack.slice(0, 3).map(({ name: t }, i) => (
              <span key={i} className={`pj-chip ${isPh(t) ? "ph" : ""}`}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="pj-rt">
          {origin && <OriginTag origin={origin} className="pj-tr" />}
          <span aria-hidden="true" className="pj-arr">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
            </svg>
          </span>
        </div>
      </RowLink>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)", hover: "(hover: hover)", wide: "(min-width: 1000px)" }, (mq) => {
      const { motion, hover, wide } = mq.conditions;
      const section = sectionRef.current;

      const ctx = gsap.context(() => {
        const list = section.querySelector("[data-list]");
        const rows = gsap.utils.toArray("[data-row]");
        const cleanups = [];

        // Dim baris lain saat hover/fokus: CSS. Galeri thumbnail hanya saat motion aktif.
        if (hover) {
          const setOn = (row) => rows.forEach((o) => o.classList.toggle("on", o === row));
          let stopShow = () => {};
          let startShow = () => {};
          const galleries = new Map();

          if (motion) {
            rows.forEach((r) => {
              galleries.set(r, { slides: gsap.utils.toArray("[data-sl]", r), bars: gsap.utils.toArray("[data-bar] i", r), i: 0, call: null });
              gsap.set(galleries.get(r).bars, { scaleX: 0 });
            });

            const showSlide = (g, n) => {
              g.i = n;
              g.slides.forEach((sl, i) => {
                gsap.to(sl, { autoAlpha: i === n ? 1 : 0, scale: i === n ? 1 : 0.96, duration: i === n ? 0.6 : 0.45, ease: "expo.out", overwrite: "auto" });
              });
              g.bars.forEach((b, i) => {
                gsap.killTweensOf(b);
                if (i < n) gsap.set(b, { scaleX: 1 });
                else if (i === n) gsap.fromTo(b, { scaleX: 0 }, { scaleX: 1, duration: STEP, ease: "none" });
                else gsap.set(b, { scaleX: 0 });
              });
            };

            stopShow = (r) => {
              const g = galleries.get(r);
              g.call?.kill();
              g.call = null;
              if (g.slides.length < 2) return;
              g.i = 0;
              g.slides.forEach((sl, i) => gsap.to(sl, { autoAlpha: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.96, duration: 0.45, overwrite: "auto" }));
              g.bars.forEach((b) => gsap.killTweensOf(b));
              gsap.set(g.bars, { scaleX: 0 });
            };

            startShow = (r) => {
              const g = galleries.get(r);
              if (g.slides.length < 2) return;
              g.call?.kill();
              showSlide(g, 1); // langsung ke slide ke-2
              const tick = () => {
                showSlide(g, (g.i + 1) % g.slides.length);
                g.call = gsap.delayedCall(STEP, tick);
              };
              g.call = gsap.delayedCall(STEP, tick);
            };
          }

          rows.forEach((r) => {
            const enter = () => {
              list.classList.add("hv");
              setOn(r);
              rows.forEach((o) => o !== r && stopShow(o));
              startShow(r);
            };
            const leave = () => {
              list.classList.remove("hv");
              setOn(null);
              stopShow(r);
            };
            r.addEventListener("mouseenter", enter);
            r.addEventListener("focus", enter);
            r.addEventListener("blur", leave);
            cleanups.push(() => {
              r.removeEventListener("mouseenter", enter);
              r.removeEventListener("focus", enter);
              r.removeEventListener("blur", leave);
            });
          });
          const leaveAll = () => {
            list.classList.remove("hv");
            setOn(null);
            rows.forEach(stopShow);
          };
          list.addEventListener("mouseleave", leaveAll);
          cleanups.push(() => {
            list.removeEventListener("mouseleave", leaveAll);
            rows.forEach(stopShow);
            list.classList.remove("hv");
            setOn(null);
          });
        }

        // Reduced motion: semua konten tampil langsung dalam keadaan akhir
        if (!motion) return () => cleanups.forEach((fn) => fn());

        // Animasi masuk main lagi tiap user kembali dari atas (lihat utils/replayOnVisit)
        const { replay, disconnect: disconnectReplay } = createReplay(section);

        // 1. Headline: trigger di PEMBUNGKUS mask, bukan di teksnya
        const lines = gsap.utils.toArray("[data-line]");
        lines.forEach((line, i) => {
          replay(line.parentElement, gsap.fromTo(line, { yPercent: 108 }, { yPercent: 0, duration: 1.2, ease: "expo.out", delay: i * 0.12, paused: true }));
        });

        // 2. Reveal umum
        const reveals = gsap.utils.toArray("[data-rv]");
        reveals.forEach((el) => {
          replay(el, gsap.fromTo(el, { autoAlpha: 0, y: 42 }, { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", paused: true }));
        });

        // 3. Garis tepi atas tergambar mengikuti scroll (scaleX dari kiri)
        gsap.utils.toArray("[data-ln]").forEach((ln) => {
          gsap.fromTo(ln, { scaleX: 0, transformOrigin: "0 50%" }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ln.parentElement, start: "top 92%", end: "top 70%", scrub: true } });
        });

        // 4. Parallax klaster ponsel (mouse + scroll); float CSS ada di elemen anak
        if (wide) {
          const deco = gsap.utils.toArray("[data-depth]").map((el) => ({
            d: parseFloat(el.dataset.depth) || 0,
            x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" }),
          }));
          let mx = 0;
          let my = 0;
          let sp = 0; // progres scroll -1..1
          const apply = () =>
            deco.forEach((o) => {
              o.x(mx * o.d * 22);
              o.y(my * o.d * 14 - sp * o.d * 70);
            });
          const onMove = (e) => {
            mx = (e.clientX / window.innerWidth - 0.5) * 2;
            my = (e.clientY / window.innerHeight - 0.5) * 2;
            apply();
          };
          window.addEventListener("mousemove", onMove);
          cleanups.push(() => window.removeEventListener("mousemove", onMove));
          ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              sp = self.progress * 2 - 1;
              apply();
            },
          });
        }

        // Pause loop float saat section di luar layar
        const io = new IntersectionObserver(([entry]) => section.classList.toggle("pj-paused", !entry.isIntersecting));
        io.observe(section);

        // Cadangan: kalau trigger tidak jalan, tampilkan yang sudah ada di layar
        const safety = setTimeout(() => {
          const vh = window.innerHeight;
          lines.forEach((line) => {
            if (gsap.getProperty(line, "yPercent") > 0 && line.parentElement.getBoundingClientRect().top < vh) {
              gsap.to(line, { yPercent: 0, duration: 0.6, ease: "expo.out", overwrite: "auto" });
            }
          });
          reveals.forEach((el) => {
            if (gsap.getProperty(el, "opacity") < 1 && el.getBoundingClientRect().top < vh) {
              gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.6, ease: "expo.out", overwrite: "auto" });
            }
          });
        }, 2000);

        // Font HWT dimuat belakangan dan mengubah tinggi layout
        let cancelled = false;
        document.fonts?.ready.then(() => {
          if (!cancelled) ScrollTrigger.refresh();
        });

        return () => {
          cancelled = true;
          clearTimeout(safety);
          io.disconnect();
          disconnectReplay();
          cleanups.forEach((fn) => fn());
        };
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-x-clip w-full bg-white pt-28 md:pt-[150px] pb-24 md:pb-[140px] font-Inter text-[#1D1D1D]">
      <div className="max-w-[1312px] mx-auto px-6 min-[701px]:px-16">
        {/* Label row */}
        <div data-rv className="flex items-center gap-4">
          <span className="flex items-center gap-2.5 rounded-full border border-[#D4D4D4] bg-white px-4 py-2 text-sm font-semibold">
            <span className="font-HWT text-base leading-none">03</span>
            Projects
          </span>
          <span className="flex-1 h-px bg-[#D4D4D4]" />
          <span className="hidden sm:inline text-sm font-medium text-[#6B7280]">{ProjectsData.length} selected projects</span>
        </div>

        {/* Headline + klaster ponsel */}
        <div className="relative mt-11">
          <PhoneCluster />
          <h2 className="relative z-[1] m-0 font-HWT font-normal uppercase text-[clamp(56px,9vw,128px)] leading-[0.98] tracking-[0.005em]">
            <span className={MASK}>
              <span data-line className="block">
                Selected work
              </span>
            </span>
            <span className={MASK}>
              <span data-line className="block">
                from the screen
              </span>
            </span>
            <span className={MASK}>
              <span data-line className="block text-[#9CA3AF]">
                to the server.
              </span>
            </span>
          </h2>
        </div>

        {/* Daftar */}
        <div data-list className="pj-list relative mt-24">
          {ProjectsData.map((project, i) => (
            <Row key={i} project={project} index={i} />
          ))}
          {/* Penutup daftar */}
          <div data-rv className="relative h-0.5">
            <span aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-[#D4D4D4]" />
            <span aria-hidden="true" data-ln className="absolute left-0 right-0 top-0 h-0.5 bg-[#1D1D1D] origin-left" />
          </div>
        </div>
      </div>
    </section>
  );
}
