import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createReplay } from "../../utils/replayOnVisit";
import { TECH_ICONS } from "../../data/TechIcons";
import { ProjectsData, getNextProject } from "../../data/ProjectsData";
import ProjectViewer from "../ui/ProjectViewer";
import "./ProjectDetail.css";

gsap.registerPlugin(ScrollTrigger);

const MASK = "block overflow-hidden pb-[0.05em]";
const HWT = "font-HWT";
const pad = (n) => String(n).padStart(2, "0");
const isPh = (s) => /^\[.*\]$/.test(s);

// Rasio tile placeholder; dengan gambar asli dipakai ratio dari data gallery
const PLACEHOLDER_RATIOS = ["9/16", "4/3", "4/3", "9/16", "9/16", "4/3"];
// Tile 01,03 di kolom 1; 02,04 di kolom 2; 05,06 di kolom 3 (selebihnya bergilir)
const COLUMN_OF = [0, 1, 0, 1, 2, 2];
const COLUMN_SPEEDS = [0.06, 0.14, 0.1];

const ICON = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", "aria-hidden": "true" };

function SectionHead({ no, label, className = "mb-[22px]" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`${HWT} text-xl leading-none`}>{no}</span>
      <span className="text-xs font-bold uppercase tracking-[0.14em]">{label}</span>
      <span className="h-px flex-1 bg-[#D4D4D4]" />
    </div>
  );
}

// Paragraf isi; placeholder [..] tampil italic abu
function Body({ text }) {
  return <p className={`m-0 text-[18px] font-medium leading-[1.75] ${isPh(text) ? "italic text-[#6B7280]" : "text-[#374151]"}`}>{text}</p>;
}

// Ikon stack dari TECH_ICONS, diwarnai currentColor; tanpa ikon = titik kecil
function StackIcon({ name }) {
  const parts = TECH_ICONS[name];
  if (!parts) return <span aria-hidden="true" className="h-2 w-2 flex-none rounded-full bg-current" />;
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" className="flex-none">
      {parts.map(([Tag, props], i) => (
        <Tag key={i} {...props} fill={props.fill === "none" ? "none" : "currentColor"} {...(props.stroke ? { stroke: "currentColor" } : {})} />
      ))}
    </svg>
  );
}

const ArrowUpRight = ({ size = 20 }) => (
  <svg width={size} height={size} {...ICON}>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

// Layar ponsel kerangka (placeholder, bukan screenshot asli)
function PhoneScreen() {
  return (
    <div className="relative box-border flex h-full flex-col gap-2.5 overflow-hidden rounded-[26px] bg-white px-3 pb-3 pt-4">
      <span className="h-3.5 w-[54px] self-center rounded-[7px] bg-[#1D1D1D]" />
      <span className="mt-1.5 h-3 w-[62%] rounded-md bg-[#D1D5DB]" />
      <span className="flex gap-1.5">
        <span className="h-5 w-[46px] rounded-full bg-[#1D1D1D]" />
        <span className="h-5 w-10 rounded-full bg-[#E5E7EB]" />
        <span className="h-5 w-10 rounded-full bg-[#E5E7EB]" />
      </span>
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="aspect-square rounded-[10px] bg-[#E5E7EB]" />
        ))}
      </div>
      <span className="mt-auto flex h-10 items-center justify-between rounded-[14px] bg-[#1D1D1D] px-3.5">
        <span className="h-[7px] w-11 rounded bg-[#6B7280]" />
        <span className="h-[7px] w-7 rounded bg-white" />
      </span>
    </div>
  );
}

function Phone({ left, top, w, h, rotate, z }) {
  return (
    <div data-phone className="absolute" style={{ left, top, zIndex: z }}>
      <div className="box-border rounded-[38px] border-[3px] border-[#1D1D1D] bg-[#ECECEC] p-2.5 shadow-[0_26px_50px_rgba(0,0,0,0.18)]" style={{ width: w, height: h, transform: `rotate(${rotate}deg)` }}>
        <PhoneScreen />
      </div>
    </div>
  );
}

export default function ProjectDetail({ project }) {
  const rootRef = useRef(null);
  const openerRef = useRef(null);
  const [viewer, setViewer] = useState(null);

  const next = getNextProject(project.slug);
  const total = ProjectsData.length;

  // Item gallery: data asli, atau 6 tile placeholder bila belum ada screenshot
  const items = project.gallery.length ? project.gallery.map((g) => ({ ...g, ratio: g.ratio || "9/16" })) : PLACEHOLDER_RATIOS.map((ratio) => ({ placeholder: true, ratio }));
  const columns = [[], [], []];
  items.forEach((item, i) => columns[COLUMN_OF[i] ?? i % 3].push({ ...item, i }));

  const openViewer = (i, el) => {
    openerRef.current = el;
    setViewer(i);
  };
  const closeViewer = useCallback(() => {
    setViewer(null);
    setTimeout(() => openerRef.current?.focus({ preventScroll: true }), 0);
  }, []);
  const stepViewer = useCallback((d) => setViewer((i) => (i + d + items.length) % items.length), [items.length]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 1100px)", gal: "(min-width: 761px)" }, (mq) => {
      const { motion, wide, gal } = mq.conditions;
      const root = rootRef.current;

      const ctx = gsap.context(() => {
        // Sidebar menempel sepanjang artikel. Dipin lewat ScrollTrigger karena position: sticky
        // tidak jalan: html/body punya overflow-x: hidden sehingga body jadi scroll container.
        if (wide) {
          const aside = root.querySelector("aside");
          ScrollTrigger.create({
            trigger: aside,
            start: "top 40px",
            endTrigger: "[data-article]",
            end: () => `bottom ${40 + aside.offsetHeight}px`,
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
        }

        // Reduced motion: semua konten tampil langsung dalam keadaan akhir
        if (!motion) return;

        const { replay, disconnect: disconnectReplay } = createReplay(root);

        // 1. Baris h1: trigger di PEMBUNGKUS mask, bukan di teksnya
        const lines = gsap.utils.toArray("[data-line]");
        lines.forEach((line, i) => {
          replay(line.parentElement, gsap.fromTo(line, { yPercent: 108 }, { yPercent: 0, duration: 1.2, ease: "expo.out", delay: 0.15 + i * 0.12, paused: true }));
        });

        // 2. Reveal umum; delay (ms) dibaca dari data-rv
        const reveals = gsap.utils.toArray("[data-rv]");
        reveals.forEach((el) => {
          const delay = (parseInt(el.dataset.rv, 10) || 0) / 1000;
          replay(el, gsap.fromTo(el, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.1, ease: "expo.out", delay, paused: true }));
        });

        // 3. Ponsel hero naik satu per satu (wrapper ponsel dianimasikan, rotasi ada di elemen dalam)
        const phones = gsap.utils.toArray("[data-phone]");
        const dec = root.querySelector("[data-dec]");
        if (wide && dec && phones.length) {
          const tl = gsap.timeline({ paused: true });
          phones.forEach((p, i) => tl.fromTo(p, { y: 90, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.3, ease: "expo.out" }, 0.35 + i * 0.14));
          gsap.set(phones, { y: 90, autoAlpha: 0 });
          replay(dec, tl);
        }

        // 4. Tile gallery: clip dari bawah. Trigger = pembungkus tile (elemen ber-clip-path dianggap tak terlihat)
        const tiles = gsap.utils.toArray("[data-tw]");
        tiles.forEach((wrap) => {
          const tile = wrap.querySelector("[data-tile]");
          const delay = (Number(wrap.dataset.tw) % 3) * 0.09;
          const tl = gsap
            .timeline({ paused: true, onComplete: () => gsap.set(tile, { clearProps: "clipPath" }) })
            .fromTo(tile, { clipPath: "inset(100% 0% 0% 0% round 22px)" }, { clipPath: "inset(0% 0% 0% 0% round 22px)", duration: 1.3, ease: "expo.out" }, delay);
          gsap.set(tile, { clipPath: "inset(100% 0% 0% 0% round 22px)" });
          replay(wrap, tl);
        });

        // 5. Parallax kolom gallery (hanya >760px)
        if (gal) {
          gsap.utils.toArray("[data-col]").forEach((col) => {
            const speed = parseFloat(col.dataset.speed) || 0;
            gsap.fromTo(col, { y: 0.5 * speed * 1000 }, { y: -0.5 * speed * 1000, ease: "none", scrollTrigger: { trigger: "[data-gal]", start: "top bottom", end: "bottom top", scrub: true } });
          });
        }

        // 6. Parallax objek dekor hero (mouse + scroll); float CSS ada di elemen anak
        const cleanups = [];
        if (wide) {
          const deco = gsap.utils.toArray("[data-depth]").map((el) => ({
            d: parseFloat(el.dataset.depth) || 0,
            x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" }),
          }));
          let mx = 0;
          let my = 0;
          let sp = 0;
          const apply = () =>
            deco.forEach((o) => {
              o.x(mx * o.d * 22);
              o.y(my * o.d * 14 - sp * o.d * 90);
            });
          const onMove = (e) => {
            mx = (e.clientX / window.innerWidth - 0.5) * 2;
            my = (e.clientY / window.innerHeight - 0.5) * 2;
            apply();
          };
          window.addEventListener("mousemove", onMove);
          cleanups.push(() => window.removeEventListener("mousemove", onMove));
          ScrollTrigger.create({
            trigger: "[data-hero]",
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              sp = self.progress * 2 - 1;
              apply();
            },
          });
        }

        // Pause loop CSS saat halaman di luar layar
        const io = new IntersectionObserver(([entry]) => root.classList.toggle("pd-paused", !entry.isIntersecting));
        io.observe(root);

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
          phones.forEach((p) => {
            if (gsap.getProperty(p, "opacity") < 1 && p.getBoundingClientRect().top < vh) gsap.to(p, { autoAlpha: 1, y: 0, duration: 0.6, ease: "expo.out", overwrite: "auto" });
          });
          tiles.forEach((wrap) => {
            const tile = wrap.querySelector("[data-tile]");
            if (tile.style.clipPath && tile.style.clipPath.includes("100%") && wrap.getBoundingClientRect().top < vh) {
              gsap.to(tile, { clipPath: "inset(0% 0% 0% 0% round 22px)", duration: 0.6, ease: "expo.out", overwrite: "auto", onComplete: () => gsap.set(tile, { clearProps: "clipPath" }) });
            }
          });
        }, 1800);

        // Font HWT dan gambar mengubah tinggi layout, jadi hitung ulang trigger saat tinggi halaman berubah
        let cancelled = false;
        document.fonts?.ready.then(() => {
          if (!cancelled) ScrollTrigger.refresh();
        });
        let refreshTimer;
        let lastH = document.body.scrollHeight;
        const ro = new ResizeObserver(() => {
          if (document.body.scrollHeight === lastH) return;
          lastH = document.body.scrollHeight;
          clearTimeout(refreshTimer);
          refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
        });
        ro.observe(document.body);

        return () => {
          cancelled = true;
          clearTimeout(safety);
          clearTimeout(refreshTimer);
          ro.disconnect();
          io.disconnect();
          disconnectReplay();
          cleanups.forEach((fn) => fn());
        };
      }, root);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const { meta } = project;
  const metaRows = [
    ["Role", meta.role],
    [meta.clientLabel || "Client", meta.client],
    ["Type", meta.type],
    ["Year", meta.year],
    ["Duration", meta.duration],
    ["Status", meta.status],
  ].filter(([, value]) => value);
  const work = project.work.length ? project.work : [{ title: "[Feature or task]", desc: "[What I did on it.]" }];
  const { sections } = project;

  return (
    <section ref={rootRef} className="pd relative w-full overflow-x-clip font-Inter text-[#1D1D1D]">
      <div className="mx-auto max-w-[1312px] px-5 pb-[140px] pt-[72px] min-[761px]:px-16">
        {/* Back row */}
        <div data-rv="0" className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
          <Link to={{ pathname: "/", hash: "#projects" }} className="pd-bk text-[15px] font-semibold">
            <svg width="18" height="18" {...ICON}>
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            All projects
          </Link>
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-[#6B7280]">
            <Link to={{ pathname: "/", hash: "#projects" }} className="hover:text-[#1D1D1D]">
              Projects
            </Link>{" "}
            <span className="text-[#9CA3AF]">/</span>{" "}
            <span aria-current="page" className="text-[#1D1D1D]">
              {project.title}
            </span>
          </nav>
        </div>

        {/* Hero */}
        <div data-hero className="pd-hero mt-10 grid grid-cols-[1.1fr_1fr] items-center gap-10">
          <div className="relative z-[2] flex min-w-0 flex-col gap-[26px]">
            <div data-rv="0" className="flex flex-wrap items-center gap-3.5">
              <span className="flex items-center gap-2.5 rounded-full border border-[#D4D4D4] bg-white px-4 py-2 text-sm font-semibold">
                <span className={`${HWT} text-base leading-none`}>{project.number}</span>
                Project
              </span>
              <span className="text-sm font-medium text-[#6B7280]">of {total} selected projects</span>
            </div>
            <h1 className={`m-0 ${HWT} text-[clamp(60px,8.4vw,124px)] font-normal uppercase leading-[0.95] tracking-[0.005em]`}>
              <span className={MASK}>
                <span data-line className="block">
                  {project.title}
                </span>
              </span>
              <span className={MASK}>
                <span data-line className="block text-[0.6em] text-[#9CA3AF]">
                  {project.subtitle}
                </span>
              </span>
            </h1>
            <p data-rv="200" className={`m-0 max-w-[520px] text-[19px] font-medium leading-[1.65] ${isPh(project.lead) ? "italic text-[#6B7280]" : "text-[#374151]"}`}>
              {project.lead}
            </p>
            <div data-rv="280" className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span key={`${tag}-${i}`} className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold ${i === 0 ? "border-[#1D1D1D]" : "border-[#D4D4D4]"} ${isPh(tag) ? "italic text-[#9CA3AF]" : i === 0 ? "" : "text-[#374151]"}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Dekorasi: ponsel kerangka (placeholder) + kotak kecil */}
          <div data-dec aria-hidden="true" className="pd-dec pointer-events-none relative h-[560px]">
            <div data-depth="0.5" className="absolute left-1/2 top-10 -ml-[230px] h-[480px] w-[480px]">
              <div className="pd-fl1 absolute inset-0">
                <Phone left={0} top={60} w={190} h={390} rotate={-9} z={1} />
                <Phone left={290} top={70} w={190} h={390} rotate={10} z={2} />
                <Phone left={110} top={0} w={230} h={470} rotate={2} z={3} />
              </div>
            </div>
            <div data-depth="1" className="absolute left-2.5 top-[470px]">
              <span className="pd-fl2 block h-11 w-11 rounded-[11px] bg-[#1D1D1D]" />
            </div>
            <div data-depth="0.7" className="absolute right-0 top-20">
              <span className="pd-fl2 block h-9 w-9 rounded-[10px] bg-[#E5E7EB]" />
            </div>
            <div data-depth="1.3" className="absolute right-[60px] top-[480px]">
              <span className="pd-fl3 block h-7 w-7 rounded-lg border-2 border-[#1D1D1D]" />
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div data-rv="0" className="mt-[120px] flex items-center gap-[18px]">
          <span className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.14em]">
            <svg width="18" height="18" {...ICON}>
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <circle cx="9" cy="10.5" r="1.6" />
              <path d="M21 16l-5-5-8 8" />
            </svg>
            Screens
          </span>
          <span className="h-px flex-1 bg-[#D4D4D4]" />
          <span className="hidden text-sm font-medium text-[#6B7280] sm:inline">Click a screen to enlarge</span>
        </div>
        <div data-gal className="pd-gal mt-7">
          {columns.map((col, ci) => (
            <div key={ci} data-col data-speed={COLUMN_SPEEDS[ci] ?? 0.1} className="pd-col">
              {col.map((item) => (
                <div key={item.i} data-tw={item.i} className="block">
                  <button
                    data-tile
                    type="button"
                    onClick={(e) => openViewer(item.i, e.currentTarget)}
                    aria-label={`View screenshot ${pad(item.i + 1)} of ${pad(items.length)}`}
                    className={`pd-ph ${item.placeholder ? "" : "has-img"}`}
                    style={{ aspectRatio: item.ratio }}
                  >
                    {item.placeholder ? (
                      <span className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
                        <svg width="34" height="34" {...ICON} stroke="#9CA3AF" strokeWidth="1.6">
                          <rect x="3" y="5" width="18" height="14" rx="2.5" />
                          <circle cx="9" cy="10.5" r="1.6" />
                          <path d="M21 16l-5-5-8 8" />
                        </svg>
                        <span className="text-[13px] font-semibold italic text-[#9CA3AF]">[Screenshot {pad(item.i + 1)}]</span>
                      </span>
                    ) : (
                      <img src={item.src} alt={item.alt} />
                    )}
                    <span className={`${HWT} absolute right-3.5 top-3.5 rounded-full bg-[#1D1D1D] px-[11px] py-1 text-[13px] leading-[1.2] tracking-[0.04em] text-white`}>{pad(item.i + 1)}</span>
                    <span aria-hidden="true" className="pd-ov absolute inset-0 flex items-center justify-center bg-[rgba(29,29,29,0.34)]">
                      <span className="flex items-center gap-2 rounded-full bg-white px-4 py-[9px] text-[13px] font-bold text-[#1D1D1D]">
                        <svg width="16" height="16" {...ICON}>
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                        View
                      </span>
                    </span>
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Content + sidebar */}
        <div className="pd-cg mt-[130px] grid grid-cols-[minmax(0,1fr)_400px] items-start gap-[72px]">
          <article data-article className="flex min-w-0 flex-col gap-[84px]">
            <section data-rv="0">
              <SectionHead no="01" label="Overview" />
              <Body text={sections.overview} />
            </section>

            <section data-rv="0">
              <SectionHead no="02" label="Background" />
              <Body text={sections.background} />
            </section>

            <section>
              <div data-rv="0">
                <SectionHead no="03" label="What I worked on" className="mb-2" />
              </div>
              <div className="border-b border-[#E5E7EB]">
                {work.map((w, i) => (
                  <div key={w.title} data-rv="0" className="pd-wr grid grid-cols-[64px_1fr] items-start gap-5 border-t border-[#E5E7EB] py-[26px]">
                    <span className={`pd-wn ${HWT} text-[30px] leading-none text-[#9CA3AF]`}>{pad(i + 1)}</span>
                    <div>
                      <h3 className={`m-0 ${HWT} text-[clamp(24px,2.4vw,32px)] font-normal uppercase leading-[1.05] ${isPh(w.title) ? "text-[#9CA3AF]" : ""}`}>{w.title}</h3>
                      <p className={`mb-0 mt-2 text-base font-medium leading-[1.65] ${isPh(w.desc) ? "italic text-[#6B7280]" : "text-[#4B5563]"}`}>{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section data-rv="0">
              <SectionHead no="04" label="Challenge & solution" />
              <div className="pd-cs grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-3.5 rounded-3xl border border-[#D4D4D4] bg-white p-[30px]">
                  <h3 className={`m-0 ${HWT} text-[28px] font-normal uppercase leading-none`}>Challenge</h3>
                  <p className={`m-0 text-base font-medium leading-[1.7] ${isPh(sections.challenge) ? "italic text-[#6B7280]" : "text-[#4B5563]"}`}>{sections.challenge}</p>
                </div>
                <div className="flex flex-col gap-3.5 rounded-3xl bg-[#1D1D1D] p-[30px] text-white">
                  <h3 className={`m-0 ${HWT} text-[28px] font-normal uppercase leading-none`}>Solution</h3>
                  <p className={`m-0 text-base font-medium leading-[1.7] ${isPh(sections.solution) ? "italic text-[#9CA3AF]" : "text-[#E5E7EB]"}`}>{sections.solution}</p>
                </div>
              </div>
            </section>
          </article>

          {/* Kolom penahan lebar dan tinggi; isinya (aside) yang di-pin */}
          <div className="self-stretch">
            <aside>
              <div data-rv="120" className="box-border rounded-[26px] border border-[#D4D4D4] bg-white px-7 pb-7 pt-[30px] shadow-[0_14px_40px_rgba(0,0,0,0.07)]">
                <h2 className={`mb-3.5 mt-0 ${HWT} text-[28px] font-normal uppercase leading-none`}>Project info</h2>
                {metaRows.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-t border-dashed border-[#D4D4D4] py-3.5">
                    <span className="pt-0.5 text-xs font-bold uppercase tracking-[0.12em] text-[#6B7280]">{label}</span>
                    <span className={`text-right text-[15px] font-semibold ${isPh(value) ? "italic text-[#9CA3AF]" : "text-[#1D1D1D]"}`}>{value}</span>
                  </div>
                ))}

                <div className="border-t border-dashed border-[#D4D4D4] pt-[18px]">
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#6B7280]">Stack</div>
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {project.stack.map(({ name, icon }) => (
                      <li key={name} className="inline-flex items-center gap-2 rounded-full border border-[#D4D4D4] bg-white px-3.5 py-2 text-sm font-semibold text-[#1D1D1D]">
                        <StackIcon name={icon} />
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-[22px] border-t border-dashed border-[#D4D4D4] pt-[18px]">
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#6B7280]">Links</div>
                  <div className="flex flex-col gap-2.5">
                    {project.links.map(({ label, sub, href }) =>
                      href ? (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="pd-lk flex items-center justify-between gap-3 rounded-[14px] border border-[#1D1D1D] bg-white px-[18px] py-3.5 text-[#1D1D1D]">
                          <span className="flex flex-col gap-0.5">
                            <span className="text-[15px] font-bold">{label}</span>
                            <span className={`text-[13px] font-medium opacity-65 ${isPh(sub) ? "italic" : ""}`}>{sub}</span>
                          </span>
                          <span className="pd-lar flex">
                            <ArrowUpRight />
                          </span>
                        </a>
                      ) : (
                        <span key={label} aria-disabled="true" className="flex items-center justify-between gap-3 rounded-[14px] border border-dashed border-[#D4D4D4] px-[18px] py-3.5 text-[#9CA3AF]">
                          <span className="flex flex-col gap-0.5">
                            <span className="text-[15px] font-bold">{label}</span>
                            <span className={`text-[13px] font-medium ${isPh(sub) ? "italic" : ""}`}>{sub}</span>
                          </span>
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Next project */}
        <Link data-rv="0" to={`/projects/${next.slug}`} className="pd-nx mt-[130px] flex items-center justify-between gap-8 rounded-[32px] bg-[#1D1D1D] px-16 py-14 text-white">
          <div className="flex min-w-0 flex-col gap-3.5">
            <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[#9CA3AF]">
              <span className={`${HWT} text-lg leading-none tracking-[0.04em] text-white`}>{next.number}</span>
              Next project
            </span>
            <span className={`${HWT} text-[clamp(44px,6vw,88px)] uppercase leading-[0.98]`}>{next.title}</span>
            <span className="flex flex-wrap gap-2">
              <span className="rounded-full border border-[#4B5563] px-3.5 py-[5px] text-sm font-semibold text-[#E5E7EB]">{next.meta.type}</span>
              <span className="rounded-full border border-[#4B5563] px-3.5 py-[5px] text-sm font-semibold text-[#E5E7EB]">
                {next.stack
                  .map((s) => s.name)
                  .slice(0, 3)
                  .join(" · ")}
              </span>
            </span>
          </div>
          <span aria-hidden="true" className="pd-cir flex h-24 w-24 flex-none items-center justify-center rounded-full border border-[#6B7280] text-white">
            <ArrowUpRight size={26} />
          </span>
        </Link>
      </div>

      {viewer !== null && <ProjectViewer items={items} index={viewer} title={project.title} onClose={closeViewer} onStep={stepViewer} onJump={setViewer} />}
    </section>
  );
}
