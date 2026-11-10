import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Particles from "../ui/Particles";

export function Home() {
  // Three.js + Rapier berat: dimuat terpisah supaya teks Home tampil lebih dulu.
  // Tanpa React.lazy/Suspense: <Canvas> R3F menyuspend boundary di atasnya dan lanyard tidak tampil.
  const [Lanyards, setLanyards] = useState(null);
  useEffect(() => {
    let alive = true;
    import("../ui/lanyard_dafa").then((m) => alive && setLanyards(() => m.default));
    return () => {
      alive = false;
    };
  }, []);

  // Animasi masuk baris intro: lokasi -> paragraf -> sosial. State awal lewat JS supaya tetap terlihat bila JS gagal.
  const introRef = useRef(null);
  useEffect(() => {
    const root = introRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = root.querySelectorAll("[data-rv]");
    const tween = gsap.fromTo(items, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", delay: 0.47, stagger: 0.07, clearProps: "transform" });
    const safety = setTimeout(() => gsap.set(items, { opacity: 1, y: 0 }), 1800);
    return () => {
      tween.kill();
      clearTimeout(safety);
    };
  }, []);

  return (
    <section id="home" className="relative w-full h-screen">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles particleColors={["#333333", "#666666", "#999999"]} particleCount={550} particleBaseSize={105} particleSpread={12} speed={0.03} />
      </div>

      {/* Lanyard 3D */}
      <div className="absolute inset-0 z-10 pointer-events-none">{Lanyards && <Lanyards position={[0, 0, 20]} gravity={[0, -40, 0]} />}</div>

      {/* Content Text */}
      <div className="absolute inset-0 z-20 px-3 md:px-24 pointer-events-none">
        <div ref={introRef} className="h-full flex flex-col justify-center">
          <h1 className="text-[#1D1D1D] text-3xl md:text-4xl font-HWT">hi, im</h1>
          <h1 className="text-[#1D1D1D] text-7xl w-32 md:w-full md:text-8xl font-HWT mt-1">Dafa Taufik</h1>
          <h1 className="text-[#1D1D1D] text-6xl md:text-7xl font-HWT">Al Latief</h1>
          <h2 className="mt-5 mb-5 text-lg md:text-3xl text-[#1D1D1D] font-HWT">Android & Backend Developer</h2>

          <div className="flex max-w-[720px] flex-col gap-6 font-Inter">
            <div data-rv className="flex items-center gap-2 text-[15px] font-semibold text-[#6B7280]">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0116 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Tangerang, Indonesia
            </div>

            <p data-rv className="m-0 max-w-[540px] text-[18px] font-medium leading-[1.65] text-[#374151]">
              Mobile & backend developer skilled in Kotlin, Java, Flutter/Dart, and Golang. I’m an Informatics graduate from Universitas Multimedia Nusantara, with internship experience on POS, HRIS, and cross-platform apps. I care most
              about writing clean code that's easy to maintain.
            </p>

            <div data-rv className=" flex flex-wrap items-center gap-x-[22px] gap-y-3.5 pointer-events-auto">
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/in/dafa-taufik-al-latief" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-btn">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://github.com/DafaTaufik" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-btn">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
                <a href="mailto:dafataufik99@gmail.com" aria-label="Email" className="social-btn">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <path d="M3 8l9 6 9-6" />
                  </svg>
                </a>
              </div>
              <span aria-hidden="true" className="h-7 w-px bg-[#D4D4D4]" />
              <span className="flex items-center gap-2.5 text-[15px] font-semibold text-[#1D1D1D]">
                <span className="pulse-dot" aria-hidden="true" />
                Available for work
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
