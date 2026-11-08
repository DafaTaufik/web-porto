import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SkillGroups, FamiliarWith } from "../../data/SkillsData";
import TechIcon from "../ui/TechIcon";
import "./Skills.css";

gsap.registerPlugin(ScrollTrigger);

const MASK = "block overflow-hidden pb-[0.05em]";
const BLOCKS = 20; // tiap blok = 5%
const pad = (n) => String(n).padStart(2, "0");

function Row({ no, skill }) {
  const { name, percent } = skill;
  const has = typeof percent === "number";
  const filled = has ? Math.round(percent / 5) : 0;

  return (
    <li data-row>
      <div className="skill-row">
        <span aria-hidden="true" className="skill-num font-HWT text-base text-[#9CA3AF]">
          {pad(no)}
        </span>
        <span aria-hidden="true" className="skill-ic">
          <TechIcon name={name} />
        </span>
        <span className="skill-nm font-HWT text-[26px] leading-none uppercase whitespace-nowrap">{name}</span>
        <div role="img" aria-label={has ? `${name}, ${percent} percent` : `${name}, level to be added`} className="skill-meter flex gap-1">
          {Array.from({ length: BLOCKS }, (_, i) => (
            <span key={i} className="skill-cell">
              {i < filled && <i data-fill />}
            </span>
          ))}
        </div>
        <span className="skill-pc flex items-baseline justify-end gap-0.5 font-HWT text-[40px] leading-none">
          {has ? <span data-count={percent}>{percent}</span> : <span className="opacity-45">[xx]</span>}
          <span className="skill-sg text-[20px] text-[#6B7280]">%</span>
        </span>
      </div>
    </li>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 1000px)" }, (mq) => {
      const { motion, wide } = mq.conditions;

      const ctx = gsap.context(() => {
        // Kolom kiri menempel sepanjang daftar. Dipin lewat ScrollTrigger karena position: sticky
        // tidak jalan: html/body punya overflow-x: hidden sehingga body jadi scroll container.
        if (wide) {
          const aside = sectionRef.current.querySelector("aside");
          ScrollTrigger.create({
            trigger: aside,
            start: "top 110px",
            endTrigger: "[data-list]",
            end: () => `bottom ${110 + aside.offsetHeight}px`,
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
        }

        // Reduced motion: semua konten tampil langsung dalam keadaan akhir
        if (!motion) return;

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

        // 2. Reveal umum
        const reveals = gsap.utils.toArray("[data-rv]");
        reveals.forEach((el) => {
          gsap.fromTo(el, { autoAlpha: 0, y: 42 }, { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        });

        // 3-5. Baris: masuk, lalu meter + angka. playMeter dipakai ulang saat hover.
        const rows = gsap.utils.toArray("[data-row]");
        const playMeter = (row, delay = 0) => {
          const fills = row._fills;
          const num = row._num;
          row._tl?.kill();
          const tl = gsap.timeline({ delay });
          if (fills.length) {
            tl.fromTo(fills, { scaleY: 0.5, autoAlpha: 0 }, { scaleY: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(3)", stagger: 0.028 }, 0);
          }
          if (num) {
            const o = { v: 0 };
            tl.to(
              o,
              {
                v: parseInt(num.dataset.count, 10),
                duration: Math.max(0.7, fills.length * 0.028 + 0.3),
                ease: "power3.out",
                onUpdate: () => {
                  num.textContent = Math.round(o.v);
                },
              },
              0,
            );
          }
          row._tl = tl;
        };

        const canHover = window.matchMedia("(hover: hover)").matches;
        const offs = [];
        rows.forEach((row) => {
          row._fills = gsap.utils.toArray("[data-fill]", row);
          row._num = row.querySelector("[data-count]");
          gsap.set(row, { autoAlpha: 0, y: 40 });
          gsap.set(row._fills, { scaleY: 0.5, autoAlpha: 0 });
          if (row._num) row._num.textContent = "0";

          ScrollTrigger.create({
            trigger: row,
            start: "top 92%",
            once: true,
            onEnter: () => {
              gsap.to(row, { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out" });
              playMeter(row, 0.25);
              row._ready = true;
            },
          });

          if (canHover) {
            const onEnter = () => row._ready && playMeter(row, 0);
            row.addEventListener("mouseenter", onEnter);
            offs.push(() => row.removeEventListener("mouseenter", onEnter));
          }
        });

        // Cadangan: kalau trigger tidak jalan, tampilkan yang sudah ada di layar
        const safety = setTimeout(() => {
          const vh = window.innerHeight;
          lines.forEach((line) => {
            if (gsap.getProperty(line, "yPercent") > 0 && line.parentElement.getBoundingClientRect().top < vh) {
              gsap.to(line, { yPercent: 0, duration: 0.6, ease: "expo.out", overwrite: "auto" });
            }
          });
          [...reveals, ...rows].forEach((el) => {
            if (gsap.getProperty(el, "opacity") < 1 && el.getBoundingClientRect().top < vh) {
              gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.6, ease: "expo.out", overwrite: "auto" });
              if (el._fills && !el._ready) {
                el._ready = true;
                playMeter(el, 0.1);
              }
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
          offs.forEach((off) => off());
          rows.forEach((row) => row._tl?.kill());
        };
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  let no = 0;

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-x-clip w-full bg-white pt-28 md:pt-[150px] pb-24 md:pb-[140px] font-Inter text-[#1D1D1D]">
      <div className="max-w-[1312px] mx-auto px-5 min-[701px]:px-16">
        <div className="grid grid-cols-1 gap-12 min-[1000px]:grid-cols-[minmax(0,440px)_minmax(0,1fr)] min-[1000px]:gap-16 items-start">
          {/* Kolom penahan lebar dan tinggi; isinya (aside) yang di-pin */}
          <div className="self-stretch">
            <aside>
              <div data-rv className="flex items-center gap-3">
                <span className="flex items-center gap-2.5 rounded-full border border-[#D4D4D4] bg-white px-4 py-2 text-sm font-semibold">
                  <span className="font-HWT text-base leading-none">07</span>
                  Skills
                </span>
                <span className="flex-1 h-px bg-[#D4D4D4]" />
              </div>

              <h2 className="mt-10 font-HWT font-normal uppercase text-[clamp(40px,4.2vw,60px)] leading-none whitespace-nowrap tracking-[0.005em]">
                <span className={MASK}>
                  <span data-line className="block">
                    The tools
                  </span>
                </span>
                <span className={MASK}>
                  <span data-line className="block">
                    I build with
                  </span>
                </span>
                <span className={MASK}>
                  <span data-line className="block text-[#9CA3AF]">
                    &amp; how well.
                  </span>
                </span>
              </h2>

              <p data-rv className="mt-9 mb-0 max-w-[400px] text-base font-medium leading-[1.7] text-[#4B5563]">
                Percentages are how I rate myself, not exam scores. Each block is 5%, so you can see where I&apos;m strongest and where I&apos;m still growing.
              </p>

              {/* Also familiar with */}
              <div data-rv className="mt-10 rounded-[22px] bg-[#1D1D1D] px-[26px] pt-6 pb-[26px] text-white">
                <div className="flex items-baseline justify-between gap-3 border-b border-[#3A3A3A] pb-3.5">
                  <h3 className="m-0 font-HWT text-[26px] font-normal leading-none uppercase">Also familiar with</h3>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#9CA3AF]">No score</span>
                </div>
                <ul className="m-0 mt-[18px] flex list-none flex-wrap gap-2.5 p-0">
                  {FamiliarWith.map((name) => (
                    <li key={name} className="inline-flex items-center gap-[7px] rounded-full border border-[#D4D4D4] bg-white py-[7px] pr-3.5 pl-2.5 text-[13px] font-semibold text-[#1D1D1D]">
                      <TechIcon name={name} size={15} />
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* Daftar */}
          <div data-list>
            {SkillGroups.map((group, gi) => (
              <div key={group.name}>
                <h3 data-rv className={`flex items-center gap-3.5 pb-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#4B5563] ${gi ? "mt-[34px]" : ""}`}>
                  <span>{group.name}</span>
                  <span className="flex-1 h-px bg-[#1D1D1D]" />
                  <span className="text-[#9CA3AF]">{group.skills.length} tools</span>
                </h3>
                <ul className="m-0 list-none p-0">
                  {group.skills.map((skill) => (
                    <Row key={skill.name} no={++no} skill={skill} />
                  ))}
                </ul>
              </div>
            ))}

            <a
              data-rv
              href="#courses"
              className="flex items-center gap-2.5 w-fit mt-[52px] pb-1 text-base font-semibold border-b-2 border-[#1D1D1D] transition-[gap] duration-300 hover:gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D1D1D]"
            >
              Next: Courses
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
