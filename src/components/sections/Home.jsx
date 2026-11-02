import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import photo from "../../assets/Image/gg.jpg";

const STAIRS = 3;

export function Home() {
  const sectionRef = useRef(null);
  const stairsRef = useRef([]);
  const wordsRef = useRef([]);
  const masksRef = useRef([]);
  const groupRef = useRef(null);
  const photoRef = useRef(null);

  useLayoutEffect(() => {
    // Scroll dikunci lewat event, bukan overflow:hidden, supaya scrollbar tetap tampil dari awal.
    const block = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const blockKeys = (e) => {
      if ([" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(e.key)) block(e);
    };
    const resetScroll = () => window.scrollTo(0, 0);
    const lock = () => {
      window.addEventListener("wheel", block, { passive: false, capture: true });
      window.addEventListener("touchmove", block, { passive: false, capture: true });
      window.addEventListener("keydown", blockKeys, true);
      window.addEventListener("scroll", resetScroll);
    };
    const unlock = () => {
      window.removeEventListener("wheel", block, true);
      window.removeEventListener("touchmove", block, true);
      window.removeEventListener("keydown", blockKeys, true);
      window.removeEventListener("scroll", resetScroll);
    };

    const ctx = gsap.context(() => {
      // Hijau menutupi semuanya; headline sudah di posisinya di belakang hijau.
      gsap.set(stairsRef.current, { scaleX: 1, transformOrigin: "100% 50%" });
      lock();

      // Foto belum ada: terpotong penuh sampai animasi pembukaan dimulai.
      gsap.set(photoRef.current, { clipPath: "inset(0% 50% 0% 50%)" });

      const tl = gsap.timeline({
        onComplete: unlock,
      });

      // Hijau menyapu ke kanan per anak tangga (dari atas), membuka headline.
      tl.to(stairsRef.current, { scaleX: 0, duration: 1.1, ease: "power3.inOut", stagger: 0.15 }, 0.5);

      // Kata-kata slide ke kanan keluar dari mask-nya saat hijau disapu.
      tl.fromTo(wordsRef.current, { xPercent: -110 }, { xPercent: 0, duration: 1.1, ease: "power3.out", stagger: 0.15 }, 0.9);

      // Headline diam 0,2 detik, lalu terbuka seperti tirai.
      const OPEN = 2.15 + 0.15;
      const OPEN_DUR = 1.1;
      const LETTER = 0.05; // em: kira-kira jarak satu huruf
      const REACH = 1.2; // em: jarak geser akhir tiap kata

      // "Dafa" bergeser ke kiri, "Taufik" ke kanan, dalam satu gerakan menerus.
      // Jarak akhir dibuat beda per kata: "Dafa" hanya menyisakan setengah huruf A terakhir di foto,
      // "Taufik" menyisakan huruf T dan setengah A. REACH di atas tetap dipakai untuk menghitung PASSED.
      const REACH_LEFT = 1.3;
      const REACH_RIGHT = 1.57;
      tl.to(masksRef.current[0], { x: `${-REACH_LEFT}em`, duration: OPEN_DUR, ease: "power2.inOut" }, OPEN);
      tl.to(masksRef.current[1], { x: `${REACH_RIGHT}em`, duration: OPEN_DUR, ease: "power2.inOut" }, OPEN);

      // Setelah tiap kata melewati ~1 huruf (power2.inOut: progres p = 2t² sebelum titik tengah),
      // zoom out sedikit dan biarkan foto terbuka dari tengah.
      const PASSED = OPEN + OPEN_DUR * Math.sqrt(LETTER / REACH / 2);
      tl.to(groupRef.current, { scale: 0.7, duration: 0.9, ease: "power2.inOut" }, PASSED);
      // Mulai sebagai garis vertikal tipis di tengah, lalu sisi kiri menyapu ke kiri dan sisi kanan ke kanan.
      tl.fromTo(photoRef.current, { clipPath: "inset(0% 49.5% 0% 49.5%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power2.out", immediateRender: false }, PASSED + 0.15);

      // Info di sekeliling foto muncul pelan setelah foto terbuka; tidak mengubah tween di atas.
      gsap.set(".hero-info", { autoAlpha: 0 });
      tl.fromTo(".hero-info", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.1, immediateRender: false }, PASSED + 0.8);

      // Garis kecil pada indikator scroll bergerak turun berulang.
      gsap.fromTo(".hero-scroll-bar", { yPercent: -100 }, { yPercent: 100, duration: 1.4, ease: "power1.inOut", repeat: -1 });
    }, sectionRef);

    return () => {
      unlock();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative isolate w-full h-screen min-h-[560px] overflow-hidden bg-cream">
      {/* Foto — terbuka dari tengah saat kata-kata mulai membuka */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div ref={photoRef} className="h-[80vh] w-[min(64vh,72vw)] overflow-hidden">
          <img src={photo} alt="Dafa Taufik" className="h-full w-full object-cover" />
        </div>
      </div>

      {/* Headline */}
      <h1 className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none font-HWT text-navy text-[clamp(4rem,15vw,16rem)] leading-[0.9]">
        <span ref={groupRef} className="flex flex-col">
          <span ref={(el) => (masksRef.current[0] = el)} className="block overflow-hidden py-[0.06em] -my-[0.06em]">
            <span ref={(el) => (wordsRef.current[0] = el)} className="block whitespace-nowrap">
              Dafa
            </span>
          </span>
          <span ref={(el) => (masksRef.current[1] = el)} className="block overflow-hidden py-[0.06em] -my-[0.06em] ml-[1.3em]">
            <span ref={(el) => (wordsRef.current[1] = el)} className="block whitespace-nowrap">
              Taufik
            </span>
          </span>
        </span>
      </h1>

      {/* Info pendukung di sekitar foto */}
      <div className="absolute inset-0 z-[25] pointer-events-none font-PlusJakartaSans text-navy text-[11px] sm:text-xs uppercase tracking-[0.18em]">
        <p className="hero-info absolute top-24 left-[4vw] hidden md:block font-semibold leading-relaxed">
          Mobile & Backend
          <br />
          Developer
        </p>

        <p className="hero-info absolute top-24 right-[4vw] hidden md:block text-right opacity-60">(Portfolio — 2026)</p>

        <p className="hero-info absolute bottom-6 left-[4vw] hidden sm:flex items-center gap-2.5 font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for work
        </p>

        <div className="hero-info absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span>Scroll</span>
          <span className="relative block h-8 w-px overflow-hidden bg-navy/20">
            <span className="hero-scroll-bar absolute inset-0 bg-navy" />
          </span>
        </div>

        <div className="hero-info absolute bottom-6 right-[4vw] hidden sm:flex items-center gap-5 font-semibold pointer-events-auto">
          {[
            ["GitHub", "https://github.com/DafaTaufik"],
            ["LinkedIn", "https://www.linkedin.com/in/dafa-taufik-al-latief/"],
            ["Instagram", "https://www.instagram.com/dafataufk/"],
          ].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Intro: penutup navy berbentuk anak tangga */}
      <div className="absolute inset-0 z-30 pointer-events-none flex flex-col" aria-hidden="true">
        {Array.from({ length: STAIRS }).map((_, i) => (
          <div key={i} ref={(el) => (stairsRef.current[i] = el)} className="flex-1 bg-navy -mb-px" />
        ))}
      </div>
    </section>
  );
}

export default Home;
