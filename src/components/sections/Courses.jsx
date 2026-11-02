import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CoursesData } from "../../data/CoursesData";
import CardCourse from "../ui/CardCourse";

gsap.registerPlugin(ScrollTrigger);

export default function Courses() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Judul: tiap baris naik dari balik mask-nya, sama seperti About.
      gsap.fromTo("[data-courses-word]", { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: "[data-courses-title]", start: "top 85%", once: true } });

      // Kartu muncul bergantian per baris; pembungkusnya yang dianimasikan supaya hover kartu tidak tertimpa.
      gsap.set("[data-course]", { autoAlpha: 0, y: 16 });
      ScrollTrigger.batch("[data-course]", {
        start: "top 90%",
        once: true,
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.08 }),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="courses" className="relative w-full overflow-hidden bg-white text-navy px-[max(4vw,20px)] py-[clamp(80px,10vw,160px)]">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 data-courses-title className="font-HWT text-[clamp(3.5rem,11vw,11rem)] leading-[0.9]">
          <span className="block overflow-hidden py-[0.06em] -my-[0.06em]">
            <span data-courses-word className="block whitespace-nowrap">
              Courses &amp;
            </span>
          </span>
          <span className="block overflow-hidden py-[0.06em] -my-[0.06em] ml-[0.9em] md:ml-[1.3em]">
            <span data-courses-word className="block whitespace-nowrap">
              Training
            </span>
          </span>
        </h2>
        <p className="font-PlusJakartaSans text-lg font-medium leading-snug md:max-w-[24ch] md:pb-[0.6em]">
          {CoursesData.length} certificates. Click a card to open the certificate in a new tab.
        </p>
      </div>

      <ul className="mt-14 md:mt-20 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
        {CoursesData.map((course) => (
          <li key={course.id} data-course className="flex">
            <CardCourse course={course} />
          </li>
        ))}
      </ul>
    </section>
  );
}
