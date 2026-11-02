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
      tl.to(masksRef.current[0], { x: `${-REACH}em`, duration: OPEN_DUR, ease: "power2.inOut" }, OPEN);
      tl.to(masksRef.current[1], { x: `${REACH}em`, duration: OPEN_DUR, ease: "power2.inOut" }, OPEN);

      // Setelah tiap kata melewati ~1 huruf (power2.inOut: progres p = 2t² sebelum titik tengah),
      // zoom out sedikit dan biarkan foto terbuka dari tengah.
      const PASSED = OPEN + OPEN_DUR * Math.sqrt(LETTER / REACH / 2);
      tl.to(groupRef.current, { scale: 0.7, duration: 0.9, ease: "power2.inOut" }, PASSED);
      // Mulai sebagai garis vertikal tipis di tengah, lalu sisi kiri menyapu ke kiri dan sisi kanan ke kanan.
      tl.fromTo(photoRef.current, { clipPath: "inset(0% 49.5% 0% 49.5%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power2.out", immediateRender: false }, PASSED + 0.15);
    }, sectionRef);

    return () => {
      unlock();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative isolate w-full h-screen min-h-[560px] overflow-hidden bg-[#F0EFEB]">
      {/* Foto — terbuka dari tengah saat kata-kata mulai membuka */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div ref={photoRef} className="h-[92vh] w-[min(73.6vh,72vw)] overflow-hidden">
          <img src={photo} alt="Dafa Taufik" className="h-full w-full object-cover" />
        </div>
      </div>

      {/* Headline */}
      <h1 className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none font-HWT text-[#1B2A1B] text-[clamp(4rem,15vw,16rem)] leading-[0.9]">
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

      {/* Intro: penutup hijau berbentuk anak tangga */}
      <div className="absolute inset-0 z-30 pointer-events-none flex flex-col" aria-hidden="true">
        {Array.from({ length: STAIRS }).map((_, i) => (
          <div key={i} ref={(el) => (stairsRef.current[i] = el)} className="flex-1 bg-[#242B19] -mb-px" />
        ))}
      </div>
    </section>
  );
}

export default Home;
