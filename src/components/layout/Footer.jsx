import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createReplay } from "../../utils/replayOnVisit";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "dafataufik99@gmail.com";

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/dafataufk/",
    path: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/dafa-taufik-al-latief/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "GitHub",
    href: "https://github.com/DafaTaufik",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
];

const MASK = "block overflow-hidden pb-[0.06em]";
const COL_LABEL = "text-xs font-bold uppercase tracking-[0.14em] text-[#6B7280]";

const clockFmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Jakarta" });
const readClock = () => clockFmt.format(new Date()).split(":");

// Amplop surat: seluruhnya HTML/CSS, dekoratif
function Envelope() {
  return (
    <div className="relative h-[250px] w-[320px] rotate-[5deg]">
      <div className="absolute left-[-40px] top-[30px] h-[190px] w-[290px] -rotate-[9deg] rounded-[18px] border-2 border-[#3A3A3A] bg-[#1B1B1B]" />
      <div className="absolute left-[30px] top-[-66px] h-20 w-[260px] bg-[#C9C9C9] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
      <div className="absolute inset-0 rounded-[18px] bg-[#DADADA] shadow-[0_30px_60px_rgba(0,0,0,0.5)]" />
      <div className="absolute left-[26px] top-5 h-[226px] w-[268px] overflow-hidden rounded-t-xl">
        <div className="ft-lt absolute inset-x-0 -bottom-2 flex h-[214px] flex-col gap-3 rounded-xl bg-white px-[22px] py-5 shadow-[0_-6px_18px_rgba(0,0,0,0.15)]">
          <span className="font-HWT text-[30px] uppercase leading-none text-[#1D1D1D]">Hi, Dafa!</span>
          <span className="h-[7px] w-[88%] rounded bg-[#D1D5DB]" />
          <span className="h-[7px] w-[70%] rounded bg-[#E5E7EB]" />
          <span className="h-[7px] w-[78%] rounded bg-[#E5E7EB]" />
          <span className="mt-auto self-start rounded-full bg-[#1D1D1D] px-3 py-[5px] text-[11px] font-bold uppercase tracking-[0.08em] text-white">New message</span>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[18px] bg-[#F1F1F1] [clip-path:polygon(0_34%,50%_66%,100%_34%,100%_100%,0_100%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[18px] bg-[#E4E4E4] [clip-path:polygon(0_34%,50%_66%,50%_68%,0_36%)]" />
      <span className="absolute -bottom-[26px] -right-[22px] flex h-[62px] w-[62px] rotate-[10deg] items-center justify-center rounded-full border-[3px] border-white bg-[#1D1D1D] font-HWT text-[32px] leading-none text-white shadow-[0_12px_24px_rgba(0,0,0,0.4)]">@</span>
      <span className="absolute -left-[30px] bottom-[22px] -rotate-[8deg] rounded-full bg-white px-3.5 py-[7px] text-xs font-bold uppercase tracking-[0.1em] text-[#1D1D1D] shadow-[0_10px_20px_rgba(0,0,0,0.35)]">Say hi</span>
    </div>
  );
}

export default function Footer() {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const [copyLabel, setCopyLabel] = useState("Copy email");
  const [time, setTime] = useState(readClock);
  const copyTimer = useRef(null);

  // Jam WIB, diperbarui tiap 15 detik
  useEffect(() => {
    const id = setInterval(() => setTime(readClock()), 15000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const onCopy = useCallback(() => {
    const done = (label, ms) => {
      setCopyLabel(label);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopyLabel("Copy email"), ms);
    };
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        done("Copied!", 1800);
      } catch {
        done("Press Ctrl+C", 3000);
      }
      document.body.removeChild(ta);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(EMAIL).then(() => done("Copied!", 1800), fallback);
    } else {
      fallback();
    }
  }, []);

  const onTop = (e) => {
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  // Nama raksasa: skala otomatis ke lebar container. Diulang setelah font HWT siap dan saat resize.
  useLayoutEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const fit = () => {
      const w = el.parentElement.clientWidth;
      el.style.fontSize = "100px";
      const range = document.createRange();
      range.selectNodeContents(el);
      const tw = range.getBoundingClientRect().width;
      if (tw > 0 && w > 0) el.style.fontSize = `${Math.floor((100 * w) / tw)}px`;
    };
    fit();
    // HWT dari Typekit baru dimuat saat dipakai, jadi ukur ulang setiap font selesai dimuat dan saat lebar container berubah
    document.fonts?.ready.then(fit);
    document.fonts?.addEventListener("loadingdone", fit);
    let lastW = el.parentElement.clientWidth;
    const ro = new ResizeObserver(() => {
      const w = el.parentElement.clientWidth;
      if (w === lastW) return;
      lastW = w;
      fit();
    });
    ro.observe(el.parentElement);
    return () => {
      document.fonts?.removeEventListener("loadingdone", fit);
      ro.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 1100px)" }, (mq) => {
      const { motion, wide } = mq.conditions;
      // Reduced motion: semua konten tampil langsung dalam keadaan akhir
      if (!motion) return;

      const section = sectionRef.current;
      const ctx = gsap.context(() => {
        // Animasi masuk main lagi tiap user kembali dari atas (lihat utils/replayOnVisit)
        const { replay, disconnect: disconnectReplay } = createReplay(section);

        // 1. Baris headline dan nama raksasa: trigger di PEMBUNGKUS mask, bukan di teksnya
        const lines = gsap.utils.toArray("[data-line]");
        lines.forEach((line) => {
          const delay = (parseInt(line.dataset.line, 10) || 0) / 1000;
          replay(line.parentElement, gsap.fromTo(line, { yPercent: 108 }, { yPercent: 0, duration: 1.2, ease: "expo.out", delay, paused: true }));
        });

        // 2. Reveal umum; delay (ms) dibaca dari data-rv
        const reveals = gsap.utils.toArray("[data-rv]");
        reveals.forEach((el) => {
          const delay = (parseInt(el.dataset.rv, 10) || 0) / 1000;
          replay(el, gsap.fromTo(el, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.1, ease: "expo.out", delay, paused: true }));
        });

        // 3. Parallax objek dekor (mouse + scroll); float CSS ada di elemen anak
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
          section.classList.toggle("ft-paused", !entry.isIntersecting);
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
        }, 1800);

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
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="ft relative w-full overflow-clip font-Inter text-white">
      <div className="mx-auto max-w-[1312px] px-5 pb-9 pt-[140px] min-[701px]:px-16">
        {/* Label row */}
        <div data-rv="0" className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="flex items-center gap-2.5 rounded-full border border-[#3A3A3A] bg-[#161616] px-4 py-2 text-sm font-semibold">
            <span className="font-HWT text-base leading-none">09</span>
            Contact
          </span>
          <span className="hidden h-px flex-1 bg-[#2A2A2A] min-[701px]:block" />
          <span className="flex items-center gap-2.5 text-sm font-semibold text-[#9CA3AF]">
            <span className="ft-pu" aria-hidden="true" />
            Available for work
          </span>
        </div>

        {/* Headline + objek */}
        <div className="relative mt-11">
          <h2 className="relative z-[2] m-0 font-HWT text-[clamp(52px,8vw,116px)] font-normal uppercase leading-[0.98] tracking-[0.005em]">
            <span className={MASK}>
              <span data-line="0" className="block">
                Let&apos;s build
              </span>
            </span>
            <span className={MASK}>
              <span data-line="120" className="block">
                something
              </span>
            </span>
            <span className={MASK}>
              <span data-line="240" className="block text-[#6B7280]">
                together.
              </span>
            </span>
          </h2>

          <div aria-hidden="true" className="ft-dec pointer-events-none absolute -right-2.5 -top-[30px] z-[1] h-[420px] w-[470px]">
            <div data-depth="0.5" className="absolute left-[60px] top-[70px]">
              <div className="ft-fl1">
                <Envelope />
              </div>
            </div>
            <div data-depth="1" className="absolute left-0 top-[340px]">
              <span className="ft-fl2 block h-11 w-11 rounded-[11px] bg-white" />
            </div>
            <div data-depth="0.7" className="absolute right-5 top-10">
              <span className="ft-fl2 block h-9 w-9 rounded-[10px] bg-[#2A2A2A]" />
            </div>
            <div data-depth="1.3" className="absolute right-[110px] top-[370px]">
              <span className="ft-fl3 block h-7 w-7 rounded-lg border-2 border-white" />
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="ft-grid mt-24 grid grid-cols-[1.3fr_1fr_1fr] gap-x-14 gap-y-12 border-t border-[#2A2A2A] pt-10">
          <div data-rv="0" className="flex flex-col gap-[18px]">
            <span className={COL_LABEL}>Email</span>
            <a href={`mailto:${EMAIL}`} className="ft-ml whitespace-nowrap text-[clamp(18px,2vw,28px)] font-semibold leading-[1.2]">
              {EMAIL}
              <svg className="ft-ar flex-none" aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
            <button type="button" onClick={onCopy} className="ft-cp flex cursor-pointer items-center gap-2.5 self-start rounded-full border border-[#3A3A3A] bg-transparent px-5 py-[11px] text-sm font-semibold text-white">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="12" height="12" rx="2.5" />
                <path d="M5 15V6a2 2 0 012-2h9" />
              </svg>
              <span aria-live="polite">{copyLabel}</span>
            </button>
          </div>

          <div data-rv="90" className="flex flex-col gap-[18px]">
            <span className={COL_LABEL}>Based in</span>
            <span className="text-lg font-medium leading-[1.6] text-[#E5E7EB]">
              Kunciran, Kota Tangerang,
              <br />
              Banten, 15144
            </span>
            <span className="flex items-center gap-2.5 text-[15px] font-semibold text-[#9CA3AF]">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span>
                {time[0]}
                <span className="ft-bk">:</span>
                {time[1]} <span className="text-[#6B7280]">WIB</span>
              </span>
            </span>
          </div>

          <div data-rv="180" className="flex flex-col gap-[18px]">
            <span className={COL_LABEL}>Elsewhere</span>
            <div className="flex flex-col items-start gap-3">
              {SOCIALS.map(({ name, href, path }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="ft-sp flex items-center gap-3 rounded-full border border-[#3A3A3A] py-3 pl-4 pr-[22px] text-[15px] font-semibold">
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d={path} />
                  </svg>
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Nama raksasa */}
        <div aria-hidden="true" className="mt-24 overflow-hidden pb-[0.04em]">
          <div
            ref={nameRef}
            data-line="0"
            className="block whitespace-nowrap font-HWT text-[clamp(70px,16vw,240px)] font-normal uppercase leading-[0.9] text-transparent [-webkit-text-stroke:1.5px_#404040]"
          >
            Dafa Taufik
          </div>
        </div>

        {/* Bar bawah */}
        <div data-rv="0" className="ft-bar mt-9 flex items-center justify-between gap-6 border-t border-[#2A2A2A] pt-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-[#9CA3AF]">© 2026 Dafa Taufik Al Latief</span>
            <span className="ft-cr text-[13px] text-[#6B7280]">
              Headings set in HWT Artz, licensed via{" "}
              <a href="https://fonts.adobe.com/fonts/hwt-artz" target="_blank" rel="noopener noreferrer">
                Adobe Fonts
              </a>
              .
            </span>
          </div>
          <a href="#home" onClick={onTop} aria-label="Back to top" className="ft-tp flex items-center gap-3 rounded-full border border-[#3A3A3A] py-2.5 pl-[22px] pr-2.5 text-sm font-semibold">
            Back to top
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111]">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
