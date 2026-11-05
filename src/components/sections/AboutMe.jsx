import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutCluster from "../ui/AboutCluster";
import "./AboutMe.css";

gsap.registerPlugin(ScrollTrigger);

const LEAD =
  "I'm an Informatics graduate from Universitas Multimedia Nusantara who enjoys the whole path of an app, from the Android screen a user taps to the Go service that answers it. I've worked on POS and HRIS apps as a mobile developer intern, and built cross-platform apps with Flutter, Clean Architecture and Firebase.";

const FACTS = [
  { label: "Focus", value: "Android & Backend" },
  { label: "Education", value: "Informatics, UMN" },
  { label: "Experience", value: "2 Internships" },
];

const MARQUEE = ["Kotlin", "Java", "Golang", "Flutter", "Firebase", "Gin", "SQL"];

const MASK = "block overflow-hidden pb-[0.05em]";

function MarqueeGroup() {
  return (
    <div className="flex items-center flex-none">
      {MARQUEE.map((item) => (
        <span key={item} className="flex items-center gap-9 pr-9 font-HWT text-5xl md:text-[72px] leading-none uppercase text-transparent [-webkit-text-stroke:2px_#1D1D1D]">
          {item}
          <span className="w-3.5 h-3.5 rounded-full bg-[#1D1D1D]" />
        </span>
      ))}
    </div>
  );
}

export default function AboutMe() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // 1. Headline: trigger di PEMBUNGKUS mask, bukan di teksnya (teks di luar mask dianggap tak terlihat)
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
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "expo.out",
              delay,
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            },
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
          reveals.forEach((el) => {
            if (gsap.getProperty(el, "opacity") < 1 && el.getBoundingClientRect().top < vh) {
              gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.6, ease: "expo.out", overwrite: "auto" });
            }
          });
        }, 2000);

        // 3. Parallax scroll pada [data-depth]
        const depthEls = gsap.utils.toArray("[data-depth]");
        depthEls.forEach((el) => {
          const d = parseFloat(el.dataset.depth);
          gsap.fromTo(
            el,
            { y: d * 70 },
            {
              y: -d * 70,
              ease: "none",
              scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
            },
          );
        });

        // 4. Parallax mouse pada [data-mouse] (hanya perangkat dengan hover)
        let removeMove = () => {};
        if (window.matchMedia("(hover: hover)").matches) {
          const movers = depthEls.map((el) => {
            const inner = el.querySelector("[data-mouse]");
            return {
              d: parseFloat(el.dataset.depth),
              x: gsap.quickTo(inner, "x", { duration: 0.8, ease: "power3.out" }),
              y: gsap.quickTo(inner, "y", { duration: 0.8, ease: "power3.out" }),
            };
          });
          const onMove = (e) => {
            const nx = (e.clientX / window.innerWidth - 0.5) * 2;
            const ny = (e.clientY / window.innerHeight - 0.5) * 2;
            movers.forEach((m) => {
              m.x(nx * m.d * 22);
              m.y(ny * m.d * 14);
            });
          };
          window.addEventListener("mousemove", onMove);
          removeMove = () => window.removeEventListener("mousemove", onMove);
        }

        // Font HWT dimuat belakangan dan mengubah tinggi headline
        let cancelled = false;
        document.fonts?.ready.then(() => {
          if (!cancelled) ScrollTrigger.refresh();
        });

        return () => {
          cancelled = true;
          clearTimeout(safety);
          removeMove();
        };
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden w-full bg-white pt-28 md:pt-[150px] font-Inter text-[#1D1D1D]">
      <div className="max-w-[1312px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Label row */}
        <div data-rv="0" className="flex items-center gap-4">
          <span className="flex items-center gap-2.5 rounded-full border border-[#D4D4D4] bg-white px-4 py-2 text-sm font-semibold">
            <span className="font-HWT text-base leading-none">01</span>
            About me
          </span>
          <span className="flex-1 h-px bg-[#D4D4D4]" />
          <span className="hidden sm:inline text-sm font-medium text-[#6B7280]">Tangerang, Indonesia</span>
        </div>

        {/* Headline */}
        <h2 className="mt-11 font-HWT font-normal uppercase text-[clamp(56px,9vw,128px)] leading-[0.98] tracking-[0.005em]">
          <span className={MASK}>
            <span data-line className="block">
              I build mobile apps
            </span>
          </span>
          <span className={MASK}>
            <span data-line className="block">
              <span aria-hidden="true" className="relative inline-block w-[0.95em] h-[0.5em] rounded-full bg-[#1D1D1D] align-[0.04em] mr-[0.18em]">
                <span className="absolute top-[0.07em] left-[0.07em] w-[0.36em] h-[0.36em] rounded-full bg-white" />
              </span>
              and the backends
            </span>
          </span>
          <span className={MASK}>
            <span data-line className="block text-[#9CA3AF]">
              behind them.
            </span>
          </span>
        </h2>

        {/* Body */}
        <div className="mt-[72px] flex flex-wrap items-start gap-x-[72px] gap-y-14">
          {/* Left */}
          <div className="flex flex-col gap-10 min-w-0 flex-[1.1_1_520px]">
            <p className="m-0 text-[clamp(21px,2.1vw,28px)] font-medium leading-normal tracking-[-0.005em]">{LEAD}</p>

            <p data-rv="0" className="m-0 max-w-[540px] text-[17px] font-medium leading-[1.7] text-[#4B5563]">
              Right now I&apos;m looking for a team where I can keep growing across mobile and backend engineering, and where clean, maintainable code is part of the culture.
            </p>

            <div className="flex flex-wrap gap-6">
              {FACTS.map(({ label, value }, i) => (
                <div key={label} data-rv={i * 100} className="flex flex-col gap-1.5 flex-[1_1_150px] border-t-2 border-[#1D1D1D] pt-3.5">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#6B7280]">{label}</span>
                  <span className="font-HWT text-[27px] leading-[1.05] uppercase">{value}</span>
                </div>
              ))}
            </div>

            <a
              data-rv="0"
              href="#experience"
              className="group flex items-center gap-2.5 w-fit pb-1 text-base font-semibold border-b-2 border-[#1D1D1D] transition-[gap] duration-300 hover:gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D1D1D]"
            >
              See my experience
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
              </svg>
            </a>
          </div>

          {/* Right: dekoratif */}
          <div data-rv="150" className="min-w-0 flex-[1_1_440px]">
            <div className="relative mx-auto w-[312px] h-[348px] sm:w-[520px] sm:h-[580px] max-w-full">
              <div className="absolute left-0 top-0 origin-top-left scale-[0.6] sm:scale-100">
                <AboutCluster />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div aria-hidden="true" className="mt-24 py-[26px] border-t border-[#D4D4D4] overflow-hidden bg-white">
        <div className="about-marquee flex w-max">
          <MarqueeGroup />
          <MarqueeGroup />
        </div>
      </div>
    </section>
  );
}
