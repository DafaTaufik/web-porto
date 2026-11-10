import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrganizationalData as ORG, OrganizationalPhotos as PHOTOS, GalleryColumns } from "../../data/OrganizationalData";
import PhotoViewer from "../ui/PhotoViewer";
import "./Organizational.css";

gsap.registerPlugin(ScrollTrigger);

const MASK = "block overflow-hidden pb-[0.05em]";
const pad = (n) => String(n).padStart(2, "0");
const isPh = (text) => text.startsWith("[");
const PH_TEXT = "italic text-[#6B7280]";

// Baris clipboard: [lebar garis 1, lebar garis 2], dan apakah tercentang (baris 1-4 ya, baris 5 tidak)
const CHECKS = [
  [70, 45],
  [55, 30],
  [80, 55],
  [62, 37],
  [48, 25],
];

// Objek dekor: [data-depth] (parallax GSAP) > anak (float CSS)
function Deco() {
  return (
    <div aria-hidden="true" className="org-deco absolute -right-2.5 -top-1.5 z-[1] h-[420px] w-[470px] pointer-events-none">
      <div data-depth="0.5" className="absolute left-[70px] top-2.5">
        <div className="org-fl1">
          <div className="relative h-[380px] w-[300px]">
            <div className="absolute left-[-46px] top-[34px] box-border h-[330px] w-[250px] -rotate-[9deg] rounded-[22px] border-2 border-[#D4D4D4] bg-white shadow-[0_14px_30px_rgba(0,0,0,0.08)]" />
            <div className="absolute inset-0 box-border rotate-6 rounded-[30px] bg-[#ECECEC] p-2.5 shadow-[0_26px_50px_rgba(0,0,0,0.18)]">
              <div className="relative box-border flex h-full w-full flex-col gap-4 rounded-[22px] border-[3px] border-[#1D1D1D] bg-[#F4F4F4] px-5 pb-5 pt-[52px]">
                <span className="absolute left-1/2 -top-4 -ml-[58px] flex h-11 w-[116px] items-center justify-center rounded-[14px] bg-[#1D1D1D]">
                  <span className="h-2 w-11 rounded bg-[#F4F4F4]" />
                </span>
                <div className="flex items-center justify-between border-b-2 border-dashed border-[#1D1D1D] pb-3">
                  <span className="font-HWT text-2xl leading-none uppercase">Check-in</span>
                  <span className="rounded-full bg-[#1D1D1D] px-[9px] py-[3px] text-[10px] font-bold tracking-[0.08em] text-white">4 / 5</span>
                </div>
                {CHECKS.map(([a, b], i) => (
                  <div key={i} className="flex items-center gap-3.5">
                    <span className="relative box-border h-6 w-6 flex-none rounded-[7px] border-[2.5px] border-[#1D1D1D] bg-white">
                      {i < 4 && (
                        <svg viewBox="0 0 24 24" width="26" height="26" className="absolute -left-px -top-[5px] overflow-visible">
                          <path className="org-tk" style={{ animationDelay: `${i * 0.55}s` }} d="M4 13 L10 19 L22 4" fill="none" stroke="#1D1D1D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" pathLength="24" />
                        </svg>
                      )}
                    </span>
                    <span className="flex flex-1 flex-col gap-1.5">
                      <span className="h-2 rounded bg-[#D1D5DB]" style={{ width: `${a}%` }} />
                      <span className="h-1.5 rounded-sm bg-[#E5E7EB]" style={{ width: `${b}%` }} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <span className="absolute -left-[26px] bottom-[34px] -rotate-[8deg] rounded-full bg-[#1D1D1D] px-3.5 py-[7px] text-xs font-bold uppercase tracking-[0.1em] text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)]">Committee</span>
          </div>
        </div>
      </div>
      <div data-depth="1" className="absolute left-0 top-[330px]">
        <span className="org-fl2 block h-11 w-11 rounded-[11px] bg-[#1D1D1D]" />
      </div>
      <div data-depth="0.7" className="absolute right-[30px] top-[340px]">
        <span className="org-fl2 block h-9 w-9 rounded-[10px] bg-[#E5E7EB]" />
      </div>
      <div data-depth="1.3" className="absolute right-[120px] top-0">
        <span className="org-fl3 block box-border h-7 w-7 rounded-lg border-2 border-[#1D1D1D]" />
      </div>
    </div>
  );
}

// Tombol foto. [data-tw] = clip reveal, button = hover/lift, [data-zm] = zoom reveal, [data-herozoom] = zoom scroll hero
function Photo({ index, hero = false, onOpen }) {
  const photo = PHOTOS[index];
  const radius = hero ? 28 : 22;
  const img = <img className="org-im" src={photo.src} alt={photo.alt} loading={hero ? undefined : "lazy"} />;

  return (
    <div data-tw data-radius={radius} className="relative">
      <button
        type="button"
        data-ph={index}
        onClick={(e) => onOpen(index, e.currentTarget)}
        aria-label={`View photo ${pad(index + 1)} of ${pad(PHOTOS.length)}`}
        className="org-ph"
        style={{ borderRadius: radius, aspectRatio: hero ? "16 / 9" : photo.ratio, boxShadow: hero ? "0 14px 40px rgba(0,0,0,.07)" : "0 10px 30px rgba(0,0,0,.05)" }}
      >
        <span data-zm className="absolute inset-0 block">
          {hero ? (
            <span data-herozoom className="absolute inset-0 block">
              {img}
            </span>
          ) : (
            img
          )}
        </span>
        {hero && <span className="absolute left-[18px] top-[18px] rounded-full border border-[#D4D4D4] bg-white px-3 py-[5px] text-[11px] font-bold tracking-[0.1em]">GROUP PHOTO</span>}
        <span className={`absolute rounded-full bg-[#1D1D1D] font-HWT leading-[1.2] text-white ${hero ? "right-[18px] top-[18px] px-3 py-[5px] text-sm" : "right-3 top-3 px-2.5 py-1 text-[13px]"}`}>{pad(index + 1)}</span>
        <span aria-hidden="true" className="org-vw" style={{ background: hero ? "rgba(29,29,29,.3)" : "rgba(29,29,29,.35)" }}>
          <span className={`flex items-center gap-2 rounded-full bg-white font-bold text-[#1D1D1D] ${hero ? "px-5 py-3 text-sm" : "px-[18px] py-2.5 text-[13px]"}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            View photo
          </span>
        </span>
      </button>
    </div>
  );
}

export default function Organizational() {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(-1);

  const openRef = useRef(-1);
  useEffect(() => {
    openRef.current = openIndex;
  }, [openIndex]);

  const open = useCallback((i) => setOpenIndex(i), []);
  const close = useCallback(() => {
    // Fokus kembali ke foto yang terakhir dilihat (bukan yang pertama diklik)
    const last = openRef.current;
    setOpenIndex(-1);
    requestAnimationFrame(() => sectionRef.current?.querySelector(`[data-ph="${last}"]`)?.focus());
  }, []);
  const step = useCallback((d) => setOpenIndex((i) => (i + d + PHOTOS.length) % PHOTOS.length), []);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 1101px)", desktop: "(min-width: 701px)" }, (mq) => {
      const { motion, wide, desktop } = mq.conditions;
      if (!motion) return;
      const section = sectionRef.current;

      const ctx = gsap.context(() => {
        // Animasi masuk hanya dimainkan saat user datang dari ATAS (scroll turun). Selama section masih di layar tidak diulang.
        // Reset hanya terjadi kalau user pergi ke section di atas (section 05 keluar lewat bawah layar), jadi main lagi saat kembali.
        // User yang kembali dari bawah (mis. section 06 scroll naik): elemen langsung tampil tanpa animasi.
        // Pakai IntersectionObserver (bukan ScrollTrigger) karena membaca posisi yang benar-benar tampil,
        // termasuk geseran parallax kolom galeri; ScrollTrigger menghitung dari posisi layout sehingga elemen bisa telat muncul
        const observers = [];
        const replays = [];
        const replay = (el, anim) => {
          const state = { anim, played: false };
          replays.push(state);
          const enter = new IntersectionObserver(
            ([entry]) => {
              if (!entry.isIntersecting || state.played) return;
              state.played = true;
              if (entry.boundingClientRect.top > 0) anim.play();
              else anim.progress(1);
            },
            { rootMargin: "0px 0px -6% 0px" },
          );
          enter.observe(el);
          observers.push(enter);
        };
        const resetAll = () =>
          replays.forEach((state) => {
            state.played = false;
            state.anim.pause(0);
          });

        // 1. Headline: trigger di PEMBUNGKUS mask, bukan di teksnya
        const lines = gsap.utils.toArray("[data-line]");
        lines.forEach((line, i) => {
          replay(line.parentElement, gsap.fromTo(line, { yPercent: 108 }, { yPercent: 0, duration: 1.1, ease: "expo.out", delay: i * 0.12, paused: true }));
        });

        // 2. Reveal umum; delay (ms) dibaca dari data-rv
        const reveals = gsap.utils.toArray("[data-rv]");
        reveals.forEach((el) => {
          const delay = (parseInt(el.dataset.rv, 10) || 0) / 1000;
          replay(el, gsap.fromTo(el, { autoAlpha: 0, y: 42 }, { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", delay, paused: true }));
        });

        // 3. Foto: clip dari bawah + zoom turun. clipPath dibuang setelah selesai supaya lift/shadow hover tidak terpotong
        const tws = gsap.utils.toArray("[data-tw]");
        tws.forEach((tw, i) => {
          const r = `${tw.dataset.radius}px`;
          const zm = tw.querySelector("[data-zm]");
          const delay = (i % 3) * 0.09;
          const tl = gsap
            .timeline({ paused: true, onComplete: () => gsap.set(tw, { clearProps: "clipPath" }) })
            .fromTo(tw, { clipPath: `inset(100% 0% 0% 0% round ${r})` }, { clipPath: `inset(0% 0% 0% 0% round ${r})`, duration: 1.3, ease: "expo.out" }, delay)
            .fromTo(zm, { scale: 1.22 }, { scale: 1, duration: 1.6, ease: "expo.out" }, delay);
          replay(tw, tl);
        });

        // 4. Parallax kolom galeri (desktop) dan zoom foto utama
        if (desktop) {
          gsap.utils.toArray("[data-col]").forEach((col) => {
            const speed = parseFloat(col.dataset.speed) || 0;
            gsap.fromTo(col, { y: 0.5 * speed * 1000 }, { y: -0.5 * speed * 1000, ease: "none", scrollTrigger: { trigger: "[data-gal]", start: "top bottom", end: "bottom top", scrub: true } });
          });
        }
        gsap.fromTo("[data-herozoom]", { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top bottom", end: "bottom top", scrub: true } });

        // 5. Parallax objek dekor (mouse + scroll); float CSS ada di elemen anak
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
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              sp = self.progress * 2 - 1;
              apply();
            },
          });
        }

        // Pause loop CSS saat section di luar layar
        const io = new IntersectionObserver(([entry]) => {
          section.classList.toggle("org-paused", !entry.isIntersecting);
          if (!entry.isIntersecting && entry.boundingClientRect.top > 0) resetAll();
        });
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
          tws.forEach((tw) => {
            if (tw.style.clipPath && tw.style.clipPath.includes("100%") && tw.getBoundingClientRect().top < vh) {
              gsap.to(tw, { clipPath: `inset(0% 0% 0% 0% round ${tw.dataset.radius}px)`, duration: 0.6, ease: "expo.out", overwrite: "auto", onComplete: () => gsap.set(tw, { clearProps: "clipPath" }) });
              gsap.to(tw.querySelector("[data-zm]"), { scale: 1, duration: 0.8, ease: "expo.out", overwrite: "auto" });
            }
          });
        }, 1800);

        // Font HWT dan foto memengaruhi tinggi layout
        let cancelled = false;
        document.fonts?.ready.then(() => {
          if (!cancelled) ScrollTrigger.refresh();
        });

        return () => {
          cancelled = true;
          clearTimeout(safety);
          io.disconnect();
          observers.forEach((o) => o.disconnect());
          cleanups.forEach((fn) => fn());
        };
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <section id="organizational" ref={sectionRef} className="relative overflow-x-clip w-full bg-white pt-28 md:pt-[150px] pb-24 md:pb-[140px] font-Inter text-[#1D1D1D]">
        <div className="max-w-[1312px] mx-auto px-5 min-[701px]:px-16">
          {/* Label row */}
          <div data-rv="0" className="flex items-center gap-4">
            <span className="flex items-center gap-2.5 rounded-full border border-[#D4D4D4] bg-white px-4 py-2 text-sm font-semibold">
              <span className="font-HWT text-base leading-none">05</span>
              Organizational
            </span>
            <span className="flex-1 h-px bg-[#D4D4D4]" />
            <span className="hidden sm:inline text-sm font-medium text-[#6B7280]">1 organization</span>
          </div>

          {/* Headline + clipboard */}
          <div className="relative mt-11">
            <Deco />
            <h2 className="relative z-[2] m-0 font-HWT font-normal uppercase text-[clamp(52px,8vw,116px)] leading-[0.98] tracking-[0.005em]">
              <span className={MASK}>
                <span data-line className="block">
                  Beyond the
                </span>
              </span>
              <span className={MASK}>
                <span data-line className="block">
                  code, with
                </span>
              </span>
              <span className={MASK}>
                <span data-line className="block text-[#9CA3AF]">
                  people.
                </span>
              </span>
            </h2>
          </div>

          {/* Info */}
          <div className="org-info mt-[88px] grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-start gap-x-[72px] gap-y-10">
            <div data-rv="0">
              <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#6B7280]">Organization</span>
              <h3 className="m-0 mt-3.5 font-HWT font-normal italic uppercase text-[clamp(34px,4vw,56px)] leading-none">{ORG.name}</h3>
              <span className="block mt-4 text-lg font-bold italic text-[#374151]">{ORG.role}</span>
              <div className="mt-[22px] flex flex-wrap gap-2.5">
                <span className="rounded-full border border-[#1D1D1D] bg-white px-3.5 py-[7px] text-[13px] font-bold italic">{ORG.period}</span>
                <span className="rounded-full border border-[#D4D4D4] bg-white px-3.5 py-[7px] text-[13px] font-semibold italic text-[#6B7280]">{ORG.event}</span>
              </div>
            </div>
            <div data-rv="120">
              <p className={`m-0 text-[17px] font-medium leading-[1.7] ${isPh(ORG.summary) ? PH_TEXT : "text-[#4B5563]"}`}>{ORG.summary}</p>
              <ul className="m-0 mt-7 flex list-none flex-col gap-3.5 p-0">
                {ORG.bullets.map((b) => (
                  <li key={b} className={`flex items-start gap-3.5 text-base font-medium leading-[1.65] ${isPh(b) ? PH_TEXT : "text-[#4B5563]"}`}>
                    <span aria-hidden="true" className="mt-[9px] h-2.5 w-2.5 flex-none rounded-[3px] bg-[#1D1D1D]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Foto utama */}
          <div data-hero className="relative mt-[88px]">
            <Photo index={0} hero onOpen={open} />
            <div className="mt-3.5 flex flex-wrap justify-between gap-x-6 gap-y-2 text-[13px] font-medium text-[#6B7280]">
              <span className="italic">{ORG.heroCaption}</span>
              <span>All participants and committee together</span>
            </div>
          </div>

          {/* Label galeri */}
          <div data-rv="0" className="mt-24 flex items-center gap-3.5">
            <span className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.14em]">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Behind the scenes
            </span>
            <span className="flex-1 h-px bg-[#D4D4D4]" />
            <span className="hidden sm:inline text-[13px] font-medium text-[#6B7280]">Click a photo to enlarge</span>
          </div>

          {/* Galeri 3 kolom bergerigi */}
          <div data-gal className="org-gal mt-7 grid grid-cols-3 items-start gap-6">
            {GalleryColumns.map((col) => (
              <div key={col.speed} data-col data-speed={col.speed} className="flex flex-col gap-6" style={{ marginTop: col.top }}>
                {col.photos.map((i) => (
                  <Photo key={i} index={i} onOpen={open} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {openIndex >= 0 && <PhotoViewer photos={PHOTOS} index={openIndex} orgName={ORG.name} onClose={close} onStep={step} onJump={setOpenIndex} />}
    </>
  );
}
