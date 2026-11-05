import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExperienceCard from "../ui/ExperienceCard";
import { ProfessionalExperienceData as EXPERIENCES } from "../../data/ProfessionalExperienceData";

gsap.registerPlugin(ScrollTrigger);

const INK = "#1D1D1D";
const MASK = "block overflow-hidden pb-[0.05em]";
const pad = (n) => String(n).padStart(2, "0");

export function Experience() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 1000px)" }, (mq) => {
      // Callback jalan selama salah satu kondisi cocok; reduced-motion = tampil langsung di keadaan akhir
      if (!mq.conditions.motion) return;

      const ctx = gsap.context(() => {
        // 1. Headline: trigger di PEMBUNGKUS mask, bukan di teksnya
        const lines = gsap.utils.toArray("[data-line]");
        gsap.set(lines, { yPercent: 108 });
        lines.forEach((line, i) => {
          gsap.to(line, {
            yPercent: 0,
            duration: 1.1,
            ease: "expo.out",
            delay: i * 0.12,
            scrollTrigger: { trigger: line.parentElement, start: "top 92%", once: true },
          });
        });

        // 2. Reveal umum; delay (ms) dibaca dari data-rv
        const reveals = gsap.utils.toArray("[data-rv]");
        reveals.forEach((el) => {
          const delay = (parseInt(el.dataset.rv, 10) || 0) / 1000;
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 42 },
            { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", delay, scrollTrigger: { trigger: el, start: "top 92%", once: true } },
          );
        });

        // 3. Kartu masuk dari kanan
        const cards = gsap.utils.toArray("[data-card]");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { autoAlpha: 0, x: 64, rotation: 2 },
            { autoAlpha: 1, x: 0, rotation: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 92%", once: true } },
          );
        });

        // Cadangan: kalau trigger tidak jalan, tampilkan yang sudah ada di layar
        const safety = setTimeout(() => {
          const vh = window.innerHeight;
          lines.forEach((line) => {
            if (gsap.getProperty(line, "yPercent") > 0 && line.parentElement.getBoundingClientRect().top < vh) {
              gsap.to(line, { yPercent: 0, duration: 0.6, ease: "expo.out", overwrite: "auto" });
            }
          });
          [...reveals, ...cards].forEach((el) => {
            if (gsap.getProperty(el, "opacity") < 1 && el.getBoundingClientRect().top < vh) {
              gsap.to(el, { autoAlpha: 1, x: 0, y: 0, rotation: 0, duration: 0.6, ease: "expo.out", overwrite: "auto" });
            }
          });
        }, 2000);

        // 4. Garis progres timeline
        gsap.fromTo(
          "[data-prog]",
          { scaleY: 0, transformOrigin: "50% 0" },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-tl]", start: "top 60%", end: "bottom 60%", scrub: true } },
        );

        // 5 + 6. Node timeline dan penghitung per entri
        const entries = gsap.utils.toArray("[data-entry]");
        const nodes = gsap.utils.toArray("[data-node]");
        gsap.set(nodes, { backgroundColor: "#FFFFFF" });
        const track = (idx) => {
          gsap.to(["[data-num]", "[data-co]"], { yPercent: -(100 / entries.length) * idx, duration: 0.7, ease: "expo.out", overwrite: true });
        };
        entries.forEach((entry, i) => {
          ScrollTrigger.create({
            trigger: entry,
            start: "top+=56 60%",
            onEnter: () => {
              gsap.to(nodes[i], { backgroundColor: INK, duration: 0.4 });
              track(i);
            },
            onLeaveBack: () => {
              gsap.to(nodes[i], { backgroundColor: "#FFFFFF", duration: 0.4 });
              track(Math.max(i - 1, 0));
            },
          });
        });

        // Sidebar menempel sepanjang timeline. Dipin lewat ScrollTrigger karena position: sticky
        // tidak jalan: html/body punya overflow-x: hidden sehingga body jadi scroll container.
        if (mq.conditions.wide) {
          const aside = sectionRef.current.querySelector("aside");
          ScrollTrigger.create({
            trigger: aside,
            start: "top 110px",
            endTrigger: "[data-tl]",
            end: () => `bottom ${110 + aside.offsetHeight}px`,
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
        }

        // 7. Stempel berputar mengikuti scroll
        gsap.to("[data-spin]", {
          rotation: 720,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });

        // 8. Parallax angka outline: satu ScrollTrigger untuk semua
        const parallax = gsap.timeline({
          defaults: { ease: "none", duration: 1 },
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
        gsap.utils.toArray("[data-depth]").forEach((el) => {
          const d = parseFloat(el.dataset.depth) || 0;
          parallax.fromTo(el, { y: d * 60 }, { y: -d * 60 }, 0);
        });

        // 9. Tilt kartu mengikuti mouse (hanya perangkat dengan hover)
        const cleanups = [];
        if (window.matchMedia("(hover: hover)").matches) {
          gsap.utils.toArray("[data-tilt]").forEach((el) => {
            gsap.set(el, { transformPerspective: 1000 });
            const rx = gsap.quickTo(el, "rotationX", { duration: 0.35, ease: "power2.out" });
            const ry = gsap.quickTo(el, "rotationY", { duration: 0.35, ease: "power2.out" });
            const move = (e) => {
              const r = el.getBoundingClientRect();
              rx(-((e.clientY - r.top) / r.height - 0.5) * 5);
              ry(((e.clientX - r.left) / r.width - 0.5) * 6);
            };
            const leave = () => {
              rx(0);
              ry(0);
            };
            el.addEventListener("mousemove", move);
            el.addEventListener("mouseleave", leave);
            cleanups.push(() => {
              el.removeEventListener("mousemove", move);
              el.removeEventListener("mouseleave", leave);
            });
          });
        }

        // Font HWT dimuat belakangan dan mengubah tinggi headline
        let cancelled = false;
        document.fonts?.ready.then(() => {
          if (!cancelled) ScrollTrigger.refresh();
        });

        return () => {
          cancelled = true;
          clearTimeout(safety);
          cleanups.forEach((fn) => fn());
        };
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative w-full overflow-x-clip bg-white pt-28 pb-24 md:pt-[150px] md:pb-[140px] font-Inter text-[#1D1D1D]">
      <div className="mx-auto max-w-[1312px] px-6 sm:px-10 lg:px-16">
        {/* Label row */}
        <div data-rv="0" className="flex items-center gap-4">
          <span className="flex items-center gap-2.5 rounded-full border border-[#D4D4D4] bg-white px-4 py-2 text-sm font-semibold">
            <span className="font-HWT text-base leading-none">02</span>
            Work experience
          </span>
          <span className="h-px flex-1 bg-[#D4D4D4]" />
          <span className="hidden text-sm font-medium text-[#6B7280] sm:inline">{EXPERIENCES.length} internships</span>
        </div>

        {/* Headline */}
        <h2 className="mt-11 font-HWT font-normal uppercase text-[clamp(56px,9vw,128px)] leading-[0.98] tracking-[0.005em]">
          <span className={MASK}>
            <span data-line className="block">
              Hands-on with
            </span>
          </span>
          <span className={MASK}>
            <span data-line className="block">
              real products
            </span>
          </span>
          <span className={MASK}>
            <span data-line className="block text-[#9CA3AF]">
              &amp; real teams.
            </span>
          </span>
        </h2>

        {/* Body */}
        <div className="mt-16 flex flex-wrap items-start gap-x-[72px] gap-y-14 md:mt-20">
          {/* Sidebar */}
          {/* Kolom penahan lebar dan tinggi; isinya (aside) yang di-pin */}
          <div className="min-w-[260px] flex-[0_1_340px] self-stretch">
            <aside className="flex flex-col gap-7">
              {/* Stempel melingkar */}
              <div data-rv="0" aria-hidden="true" className="relative h-[190px] w-[190px]">
                <div data-spin className="absolute inset-0">
                  <svg width="190" height="190" viewBox="0 0 200 200" fill="none">
                    <defs>
                      <path id="exp-stamp-circle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
                    </defs>
                    <text style={{ fontFamily: "HWT, sans-serif", fontSize: 17, textTransform: "uppercase", fill: INK }}>
                      <textPath href="#exp-stamp-circle" textLength="498" lengthAdjust="spacing">
                        Mobile developer • Backend • Software engineering •{" "}
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className="absolute left-1/2 top-1/2 -ml-[35px] -mt-[35px] flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#1D1D1D]">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7m0 0H8m9 0v9" />
                  </svg>
                </div>
              </div>

              {/* Penghitung (hanya saat sidebar menempel) */}
              <div data-rv="100" className="hidden flex-col gap-1.5 min-[1000px]:flex">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#6B7280]">Now showing</span>
                <div className="flex items-end gap-3.5">
                  <div className="h-[104px] overflow-hidden">
                    <div data-num className="flex flex-col">
                      {EXPERIENCES.map((_, i) => (
                        <span key={i} className="h-[104px] font-HWT text-[112px] leading-[104px]">
                          {pad(i + 1)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="pb-2 font-HWT text-[32px] leading-none text-[#9CA3AF]">/ {pad(EXPERIENCES.length)}</span>
                </div>
                <div className="mt-1 h-[34px] overflow-hidden">
                  <div data-co className="flex flex-col">
                    {EXPERIENCES.map((exp) => (
                      <span key={exp.company} className="h-[34px] whitespace-nowrap font-HWT text-2xl leading-[34px] uppercase">
                        {exp.company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p data-rv="200" className="m-0 text-[17px] font-medium leading-[1.7] text-[#4B5563]">
                Two internships, two stacks: native Android with Kotlin and Java, and cross-platform apps with Flutter.
              </p>

              <a
                data-rv="300"
                href="#projects"
                className="flex w-fit items-center gap-2.5 border-b-2 border-[#1D1D1D] pb-1 text-base font-semibold transition-[gap] duration-300 hover:gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D1D1D]"
              >
                Next: Projects
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                </svg>
              </a>
            </aside>
          </div>

          {/* Timeline */}
          <div data-tl className="relative box-border min-w-0 flex-[1_1_440px] pl-10 min-[1000px]:pl-14">
            <div aria-hidden="true" className="absolute bottom-3 left-[9px] top-3 w-0.5 bg-[#D4D4D4]" />
            <div aria-hidden="true" data-prog className="absolute bottom-3 left-[9px] top-3 w-0.5 origin-top bg-[#1D1D1D]" />

            {EXPERIENCES.map((entry, i) => (
              <div key={entry.company} data-entry className={`relative ${i < EXPERIENCES.length - 1 ? "mb-14" : ""}`}>
                <span
                  data-node
                  aria-hidden="true"
                  className="absolute -left-10 top-11 box-border h-5 w-5 rounded-full border-2 border-[#1D1D1D] bg-[#1D1D1D] min-[1000px]:-left-14"
                />
                <ExperienceCard entry={entry} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
