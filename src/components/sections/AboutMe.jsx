import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import photo from "../../assets/Image/gg.jpg";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  ["Ciakhamik", "Health tracking app", "Kotlin"],
  ["Umoviez", "Movie recommendation site", "ReactJS"],
  ["Covenant Orphanage", "Orphanage website", "Laravel"],
  ["Cinex", "Movie website UI/UX", "Figma"],
];

const TOOLS = ["PHP", "JavaScript", "ReactJS", "Laravel", "Kotlin", "Dart", "Firebase", "MySQL", "TailwindCSS"];

const FACTS = [
  ["Location", "Tangerang, Indonesia"],
  ["Experience", "4 months"],
  ["Focus", "Mobile & Backend development"],
  ["Availability", "Open to opportunities"],
];

const CHAPTER = "border-t-2 border-navy pt-6 pb-12 md:pb-16";
const CHAPTER_TITLE = "font-HWT text-[clamp(2rem,3.4vw,3.25rem)] leading-none";

export default function AboutMe() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Judul: naik dari balik mask, seperti nama di hero.
      gsap.fromTo("[data-about-word]", { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: "[data-about-title]", start: "top 85%", once: true } });

      // Tiap bab dan baris muncul sendiri-sendiri saat masuk layar, offset kecil supaya terbaca sebagai fade.
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });

      // Indikator progres: terisi mengikuti posisi baca di kolom bab.
      gsap.fromTo("[data-about-progress]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-about-chapters]", start: "top 55%", end: "bottom 75%", scrub: true } });
      // Foto menempel selama bab-bab di kanan bergulir (hanya desktop). Pakai pin, bukan sticky,
      // karena overflow-x:hidden di html/body mematikan position:sticky.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const photoEl = document.querySelector("[data-about-photo]");
        ScrollTrigger.create({
          trigger: photoEl,
          start: "top 112px",
          endTrigger: "[data-about-chapters]",
          end: () => `bottom ${112 + photoEl.offsetHeight}px`,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative w-full bg-cream text-navy px-[max(4vw,20px)] pt-[clamp(80px,10vw,160px)] pb-[clamp(48px,6vw,96px)]">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 data-about-title className="font-HWT text-[clamp(4rem,15vw,16rem)] leading-[0.9]">
          <span className="block overflow-hidden py-[0.06em] -my-[0.06em]">
            <span data-about-word className="block whitespace-nowrap">
              About me
            </span>
          </span>
        </h2>
        <p data-reveal className="font-PlusJakartaSans text-lg font-medium leading-snug md:max-w-[22ch] md:pb-[0.6em]">
          Mobile &amp; backend developer from Tangerang, building apps and the servers behind them.
        </p>
      </div>

      <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-x-[4vw] gap-y-12">
        {/* Foto menempel saat bab-bab di kanan bergulir */}
        <div data-about-photo className="md:col-span-5 self-start flex gap-4">
          <div className="hidden md:block w-1.5 shrink-0 bg-navy/15" aria-hidden="true">
            <div data-about-progress className="h-full w-full origin-top bg-accent" />
          </div>
          <div className="w-full border-2 border-navy shadow-[10px_10px_0_0_var(--color-navy)]">
            <img src={photo} alt="Dafa Taufik" width="1080" height="1350" loading="lazy" className="block aspect-[4/5] w-full object-cover" />
          </div>
        </div>

        <div data-about-chapters className="md:col-span-7 font-PlusJakartaSans">
          <article data-reveal className={CHAPTER}>
            <h3 className={CHAPTER_TITLE}>Who I am</h3>
            <p className="mt-6 text-[clamp(1.375rem,2vw,1.875rem)] font-medium leading-[1.3]">
              I&rsquo;m Dafa Taufik Al Latief, but you can call me Dafa. A fresh Informatics graduate from Multimedia Nusantara University.
            </p>
            <p className="mt-5 max-w-[60ch] text-lg leading-relaxed">I love diving into software development, especially building websites and mobile apps. My coding journey has been exciting, and I&rsquo;m always keen to learn more.</p>
          </article>

          <article className={CHAPTER}>
            <h3 data-reveal className={CHAPTER_TITLE}>
              What I&rsquo;ve built
            </h3>
            <ul className="mt-6">
              {PROJECTS.map(([name, what, tech]) => (
                <li key={name} data-reveal className="flex flex-col gap-1 border-b-2 border-navy py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 first:border-t-2">
                  <span className="text-xl font-semibold sm:text-2xl">{name}</span>
                  <span className="text-base sm:text-right">
                    {what} <span className="font-semibold">· {tech}</span>
                  </span>
                </li>
              ))}
            </ul>
          </article>

          <article className={CHAPTER}>
            <h3 data-reveal className={CHAPTER_TITLE}>
              What I work with
            </h3>
            <ul data-reveal className="mt-6 flex flex-wrap gap-3">
              {TOOLS.map((tool) => (
                <li key={tool} className="border-2 border-navy px-4 py-2 text-base font-semibold">
                  {tool}
                </li>
              ))}
            </ul>
            <p data-reveal className="mt-6 max-w-[60ch] text-lg leading-relaxed">
              Always excited to improve my skills in web and mobile development.
            </p>
          </article>

          <article data-reveal className="border-t-2 border-navy pt-6">
            <h3 className={CHAPTER_TITLE}>At a glance</h3>
            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 border-2 border-navy">
              {FACTS.map(([label, value], i) => (
                <div key={label} className={`p-5 ${i % 2 === 0 ? "sm:border-r-2" : ""} ${i < 2 ? "border-b-2" : i === 2 ? "border-b-2 sm:border-b-0" : ""} border-navy`}>
                  <dt className="text-base text-navy/80">{label}</dt>
                  <dd className="mt-1 flex items-start gap-2.5 text-xl font-semibold leading-snug sm:text-2xl">
                    {label === "Availability" && (
                      <span className="relative mt-[0.5em] flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                      </span>
                    )}
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}
