import React, { useEffect, useRef } from "react";
import ggImage from "../../assets/Image/gg.jpg";
import TiltedCard from "../ui/TiltedCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLocationArrow, FaBriefcase, FaBullseye, FaGraduationCap } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const INFO = [
  { icon: FaLocationArrow, label: "Location", value: "Tangerang, Indonesia" },
  { icon: FaGraduationCap, label: "Education", value: "Informatics, UMN" },
  { icon: FaBriefcase, label: "Experience", value: "4 Months" },
  { icon: FaBullseye, label: "Focus", value: "Mobile & Backend" },
];

const TECH = ["Kotlin", "Java", "Golang", "ReactJS", "Laravel", "Firebase", "MySQL", "Dart", "TailwindCSS"];

export default function AboutMe() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;

    const isDesktop = window.matchMedia("(min-width: 640px)").matches;
    const targetWidth = isDesktop ? "89vw" : "95vw";
    const targetRadius = isDesktop ? "50px" : "25px";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#home",
        start: "10% top",
        end: "100% top",
        scrub: 1,
      },
    });

    tl.to(bgRef.current, {
      width: targetWidth,
      borderRadius: targetRadius,
      ease: "power1.inOut",
    });

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full flex flex-col items-center relative pb-20">
      {/* White card that expands on scroll */}
      <div ref={bgRef} className="absolute top-0 bottom-0 w-screen left-1/2 -translate-x-1/2 bg-white shadow-2xl rounded-2xl" />

      <div className="relative z-10 w-[95vw] md:w-[89vw] px-6 md:px-14 pt-10 md:pt-14">
        {/* Heading — same voice as the Home hero */}
        <div className="flex flex-col items-center md:items-start">
          <span className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Get to know me</span>
          <h2 className="font-HWT text-5xl md:text-7xl text-[#1D1D1D] mt-1">About Me</h2>
        </div>

        <div className="mt-10 md:mt-12 flex flex-col md:flex-row md:items-center gap-10 md:gap-16">
          {/* Photo */}
          <div className="relative w-fit mx-auto md:mx-0 shrink-0">
            <TiltedCard
              imageSrc={ggImage}
              altText="Dafa Taufik Al Latief"
              captionText=""
              containerHeight="440px"
              containerWidth="350px"
              imageHeight="440px"
              imageWidth="350px"
              rotateAmplitude={12}
              scaleOnHover={1.06}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={false}
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 shadow-md pointer-events-none whitespace-nowrap">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span className="font-sans text-sm font-semibold text-[#1D1D1D]">Open to opportunities</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h3 className="font-HWT text-3xl md:text-5xl leading-tight text-[#1D1D1D]">Building efficient, scalable products for mobile & the web.</h3>

            <p className="font-sans text-base md:text-lg font-medium text-gray-700 leading-relaxed max-w-[640px] mx-auto md:mx-0">
              Hi, I&apos;m Dafa — a fresh Informatics graduate from Universitas Multimedia Nusantara. I enjoy turning ideas into working software, from a Laravel website for Covenant Orphanage and the ReactJS movie recommender Umoviez, to the
              Kotlin health tracker Ciakhamik and the Cinex UI/UX design in Figma.
            </p>

            {/* Info tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-left">
              {INFO.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#1D1D1D]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#1D1D1D]">
                    <Icon className="text-white" size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</span>
                    <span className="text-base font-semibold text-[#1D1D1D]">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech chips */}
            <ul className="flex flex-wrap justify-center md:justify-start gap-2 font-sans">
              {TECH.map((t) => (
                <li key={t} className="rounded-full border border-gray-300 px-3 py-1 text-sm font-semibold text-gray-700">
                  {t}
                </li>
              ))}
            </ul>

            {/* Buttons — same as Home */}
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="mailto:dafataufik99@gmail.com"
                className="px-4 py-2 bg-[#1D1D1D] text-white text-base font-semibold font-sans cursor-pointer rounded-md shadow-md hover:bg-gray-800 transition duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D1D1D]"
              >
                Contact Me
              </a>
              <a
                href="#experience"
                className="px-4 py-2 bg-white text-[#1D1D1D] border border-black text-base font-semibold font-sans cursor-pointer rounded-md shadow-md hover:bg-gray-100 transition duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D1D1D]"
              >
                My Experience
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
