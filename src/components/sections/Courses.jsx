import { useCallback, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createReplay } from "../../utils/replayOnVisit";
import { CoursesData } from "../../data/CoursesData";
import CardCourse from "../ui/CardCourse";
import CertificateModal from "../ui/CertificateModal";
import "./Courses.css";

gsap.registerPlugin(ScrollTrigger);

const MASK = "block overflow-hidden pb-[0.05em]";

// Tiap dekorasi: scroll (GSAP scrub) > mouse (GSAP quickTo) > float (CSS loop)
const DECO = [
  { depth: 0.4, pos: "left-5 -top-5", node: <span className="block font-HWT text-[360px] leading-none text-transparent [-webkit-text-stroke:2px_#D4D4D4]">+</span> },
  { depth: 1, pos: "left-[60px] top-[250px]", node: <span className="courses-fl1 block w-[52px] h-[52px] rounded-xl bg-[#1D1D1D]" /> },
  { depth: 0.7, pos: "right-6 top-[300px]", node: <span className="courses-fl2 block w-[38px] h-[38px] rounded-[10px] bg-[#E5E7EB]" /> },
  { depth: 1.3, pos: "right-[130px] top-10", node: <span className="courses-fl3 block w-[30px] h-[30px] rounded-[9px] border-2 border-[#1D1D1D]" /> },
];

export default function Courses() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(-1);
  const trigger = useRef(null);

  const open = useCallback((i, el) => {
    trigger.current = el;
    setOpenIndex(i);
  }, []);

  const close = useCallback(() => {
    setOpenIndex(-1);
    // Fokus kembali ke kartu pemicu
    trigger.current?.focus();
  }, []);

  const step = useCallback((d) => {
    setOpenIndex((i) => {
      const next = (i + d + CoursesData.length) % CoursesData.length;
      trigger.current = gridRef.current?.querySelector(`[data-index="${next}"]`) ?? trigger.current;
      return next;
    });
  }, []);

  // Glow kursor: satu listener pada grid (delegasi)
  const onGridMove = (e) => {
    const tile = e.target.closest(".course-tile");
    if (!tile) return;
    const r = tile.getBoundingClientRect();
    tile.style.setProperty("--mx", `${e.clientX - r.left}px`);
    tile.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      const ctx = gsap.context(() => {
        // Animasi masuk main lagi tiap user kembali dari atas (lihat utils/replayOnVisit)
        const { replay, disconnect: disconnectReplay } = createReplay(section);

        // 1. Headline: trigger di PEMBUNGKUS mask, bukan di teksnya
        const lines = gsap.utils.toArray("[data-line]");
        lines.forEach((line, i) => {
          replay(line.parentElement, gsap.fromTo(line, { yPercent: 108 }, { yPercent: 0, duration: 1.1, ease: "expo.out", delay: i * 0.12, paused: true }));
        });

        // 2. Reveal blok teks
        const reveals = gsap.utils.toArray("[data-rv]");
        reveals.forEach((el) => {
          replay(el, gsap.fromTo(el, { autoAlpha: 0, y: 42 }, { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", paused: true }));
        });

        // 3. Reveal kartu per baris grid
        const cards = gsap.utils.toArray("[data-card]");
        gsap.set(cards, { autoAlpha: 0, y: 46 });
        cards.forEach((cw) => {
          gsap.to(cw, {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: cw, start: "top bottom", end: () => `top+=${cw.offsetHeight * 0.4} bottom`, scrub: true },
          });
        });

        // Cadangan: kalau trigger tidak jalan, tampilkan yang sudah ada di layar
        const safety = setTimeout(() => {
          const vh = window.innerHeight;
          const pending = [...lines.map((l) => [l, l.parentElement, "yPercent"]), ...reveals.map((r) => [r, r, "opacity"]), ...cards.map((c) => [c, c, "opacity"])];
          pending.forEach(([el, ref, prop]) => {
            const hidden = prop === "yPercent" ? gsap.getProperty(el, prop) > 0 : gsap.getProperty(el, prop) < 1;
            if (hidden && ref.getBoundingClientRect().top < vh) {
              gsap.to(el, prop === "yPercent" ? { yPercent: 0, duration: 0.6, ease: "expo.out", overwrite: "auto" } : { autoAlpha: 1, y: 0, duration: 0.6, ease: "expo.out", overwrite: "auto" });
            }
          });
        }, 2000);

        // 4. Dekorasi: parallax scroll + mouse (hanya > 1100px)
        const decoMM = gsap.matchMedia();
        decoMM.add("(min-width: 1101px)", () => {
          const scrolls = gsap.utils.toArray("[data-parallax-scroll]");
          scrolls.forEach((el) => {
            const d = parseFloat(el.dataset.parallaxScroll);
            gsap.fromTo(el, { y: 90 * d }, { y: -90 * d, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.8 } });
          });

          if (!window.matchMedia("(hover: hover)").matches) return;
          const movers = gsap.utils.toArray("[data-parallax-mouse]").map((el) => ({
            d: parseFloat(el.dataset.parallaxMouse),
            x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" }),
          }));
          let nx = 0;
          let ny = 0;
          let frame = 0;
          const apply = () => {
            frame = 0;
            movers.forEach((m) => {
              m.x(nx * m.d * 22);
              m.y(ny * m.d * 14);
            });
          };
          const onMove = (e) => {
            nx = (e.clientX / window.innerWidth - 0.5) * 2;
            ny = (e.clientY / window.innerHeight - 0.5) * 2;
            if (!frame) frame = requestAnimationFrame(apply);
          };
          window.addEventListener("mousemove", onMove);
          return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(frame);
          };
        });

        // Pause loop float saat section di luar layar
        const io = new IntersectionObserver(([entry]) => section.classList.toggle("courses-paused", !entry.isIntersecting));
        io.observe(section);

        // Font HWT dan gambar memengaruhi tinggi layout
        let cancelled = false;
        document.fonts?.ready.then(() => {
          if (!cancelled) ScrollTrigger.refresh();
        });
        const imgs = [...section.querySelectorAll("img")];
        const onImg = () => ScrollTrigger.refresh();
        imgs.forEach((img) => !img.complete && img.addEventListener("load", onImg, { once: true }));

        return () => {
          cancelled = true;
          clearTimeout(safety);
          io.disconnect();
          disconnectReplay();
          decoMM.revert();
          imgs.forEach((img) => img.removeEventListener("load", onImg));
        };
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <section id="courses" ref={sectionRef} className="relative overflow-x-clip w-full bg-white pt-28 md:pt-[150px] pb-24 md:pb-[140px] font-Inter text-[#1D1D1D]">
        <div className="max-w-[1312px] mx-auto px-5 min-[701px]:px-16">
          {/* Header row */}
          <div data-rv className="flex items-center gap-4">
            <span className="flex items-center gap-2.5 rounded-full border border-[#D4D4D4] bg-white px-4 py-2 text-sm font-semibold">
              <span className="font-HWT text-base leading-none">08</span>
              Courses
            </span>
            <span className="flex-1 h-px bg-[#D4D4D4]" />
            <span className="hidden sm:inline text-sm font-medium text-[#6B7280]">Learning beyond the classroom</span>
          </div>

          {/* Hero */}
          <div className="relative mt-11">
            <div aria-hidden="true" className="courses-deco absolute right-0 top-0 w-[400px] h-[400px] z-[1] pointer-events-none">
              {DECO.map(({ depth, pos, node }) => (
                <div key={depth} className={`absolute ${pos}`} data-parallax-scroll={depth}>
                  <div data-parallax-mouse={depth}>{node}</div>
                </div>
              ))}
            </div>
            <h2 className="relative z-[2] m-0 font-HWT font-normal uppercase text-[clamp(52px,8vw,116px)] leading-[0.98] tracking-[0.005em]">
              <span className={MASK}>
                <span data-line className="block">
                  Always
                </span>
              </span>
              <span className={MASK}>
                <span data-line className="block">
                  learning,
                </span>
              </span>
              <span className={MASK}>
                <span data-line className="block text-[#9CA3AF]">
                  never done.
                </span>
              </span>
            </h2>
          </div>

          <p data-rv className="mt-[52px] mb-0 max-w-[560px] text-[17px] font-medium leading-[1.7] text-[#4B5563]">
            Courses and training I took outside of university to go deeper into the things I care about: mobile, backend, and clean software engineering.
          </p>

          {/* Label row */}
          <div data-rv className="flex items-center gap-3.5 mt-14">
            <span className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.14em]">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                <path d="M8.2 13.6 7 21l5-3 5 3-1.2-7.4" />
              </svg>
              Certificates
            </span>
            <span className="flex-1 h-px bg-[#D4D4D4]" />
            <span className="hidden sm:inline text-[13px] font-medium text-[#6B7280]">Click a card to view the certificate</span>
          </div>

          {/* Grid */}
          <div ref={gridRef} onMouseMove={onGridMove} className="grid grid-cols-1 min-[701px]:grid-cols-2 min-[1101px]:grid-cols-3 gap-6 mt-6">
            {CoursesData.map((cert, i) => (
              <CardCourse key={i} cert={cert} index={i} onOpen={open} />
            ))}
          </div>

          <a
            data-rv
            href="#contact"
            className="flex items-center gap-2.5 w-fit mt-16 pb-1 text-base font-semibold border-b-2 border-[#1D1D1D] transition-[gap] duration-300 hover:gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D1D1D]"
          >
            Next: Contact
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
            </svg>
          </a>
        </div>
      </section>

      {openIndex >= 0 && <CertificateModal items={CoursesData} index={openIndex} onClose={close} onStep={step} />}
    </>
  );
}
