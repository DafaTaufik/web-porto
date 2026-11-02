import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillsData } from "../../data/SkillsData";

gsap.registerPlugin(ScrollTrigger);

// Urut dari yang tertinggi supaya terbaca sebagai peringkat: kolom kiri dulu, lalu kolom kanan.
const SKILLS = [...skillsData].sort((a, b) => b.percentage - a.percentage);

export default function Skills() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo("[data-skills-word]", { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: "[data-skills-title]", start: "top 85%", once: true } });

      // Tiap baris: bar terisi lewat transform (bukan width) dan angka menghitung naik bersamaan.
      gsap.utils.toArray("[data-skill]").forEach((row) => {
        const fill = row.querySelector("[data-skill-fill]");
        const value = row.querySelector("[data-skill-value]");
        const target = Number(row.dataset.skill);
        const counter = { n: 0 };

        gsap.set(fill, { scaleX: 0 });
        value.textContent = "0%";

        gsap.to(fill, { scaleX: target / 100, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: row, start: "top 88%", once: true } });
        gsap.to(counter, {
          n: target,
          duration: 1.4,
          ease: "power3.out",
          onUpdate: () => (value.textContent = `${Math.round(counter.n)}%`),
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative w-full overflow-hidden bg-cream text-navy px-[max(4vw,20px)] py-[clamp(80px,10vw,160px)]">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 data-skills-title className="font-HWT text-[clamp(4rem,15vw,16rem)] leading-[0.9]">
          <span className="block overflow-hidden py-[0.06em] -my-[0.06em]">
            <span data-skills-word className="block whitespace-nowrap">
              Skills
            </span>
          </span>
        </h2>
        <p className="font-PlusJakartaSans text-lg font-medium leading-snug md:max-w-[24ch] md:pb-[0.6em]">Self-rated proficiency out of 100, from strongest to newest.</p>
      </div>

      <ul className="mt-14 md:mt-20 grid grid-cols-1 gap-x-[4vw] lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-4">
        {SKILLS.map(({ name, percentage, icon: Icon }) => (
          <li
            key={name}
            data-skill={percentage}
            className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 border-b-2 border-navy py-5 first:border-t-2 md:grid-cols-[11rem_1fr_4.5rem] lg:[&:nth-child(5)]:border-t-2"
          >
            <span className="col-start-1 row-start-1 flex items-center gap-3 font-PlusJakartaSans text-xl font-semibold md:text-2xl">
              {Icon && <Icon aria-hidden="true" className="h-7 w-7 shrink-0" />}
              {name}
            </span>

            <div aria-hidden="true" className="col-span-2 row-start-2 h-5 border-2 border-navy bg-white md:col-span-1 md:col-start-2 md:row-start-1">
              <div data-skill-fill className="h-full origin-left bg-navy" style={{ transform: `scaleX(${percentage / 100})` }} />
            </div>

            <span data-skill-value className="col-start-2 row-start-1 text-right font-PlusJakartaSans text-2xl font-bold tabular-nums md:col-start-3">
              {percentage}%
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
