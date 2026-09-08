import React, { useEffect, useRef } from "react";
import ggImage from "../../assets/Image/gg.jpg";
import TiltedCard from "../ui/TiltedCard";
import gsap from "gsap";
import ScrollReveal from "../ui/ScrollReveal";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLocationArrow, FaBriefcase, FaBullseye, FaCalendarCheck } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);


  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;

    const isDesktop = window.matchMedia("(min-width: 640px)").matches;
    const targetWidth = isDesktop ? "89vw" : "95vw";
    const targetRadius = isDesktop ? "50px" : "25px";

    // Create animation with GSAP
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#home",
        start: "10% top",
        end: "100% top",
        scrub: 1,
        markers: true,
      },
    });

    // Animasikan hanya bgRef
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
    <section id="about" ref={sectionRef} className="w-full h-[800px] flex flex-col items-center relative">
      {/* Background card putih yang dianimasikan */}
      <div
        ref={bgRef}
        className="absolute top-0 h-[760px] w-screen left-1/2 transform -translate-x-1/2
             bg-white shadow-2xl rounded-2xl"
      ></div>

      {/* Title - di atas background */}
      <span className="font-HWT text-5xl md:text-6xl text-black mt-10 relative z-10">About Me</span>
      {/* Div konten - lebar statis = ukuran akhir bgRef, konten stay tidak bergerak */}
      <div
        className="w-[95vw] md:w-[89vw] px-7 md:px-10 flex flex-col md:flex-row justify-center md:justify-start md:gap-16 md:mt-16 relative z-10"
      >
        {/* Image Section - Left Side */}
        <div className="w-fit h-fit ml-1 mb-8 md:mb-0 ">
          <TiltedCard
            imageSrc={ggImage}
            altText="Dafa Taufik"
            captionText=""
            containerHeight="400px"
            containerWidth="350px"
            imageHeight="400px"
            imageWidth="350px"
            rotateAmplitude={12}
            scaleOnHover={1.08}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={false}
          />
        </div>

        {/* Right Side Content */}
        <div className="flex flex-col gap-6 md:gap-10 items-center md:items-start mb-16 md:mb-0">
          {/* Text Section - Right Side */}
          <div className="font-sans font-medium  md:text-justify  md:text-lg md:w-[800px] flex items-center">
            Hi, my name is Dafa Taufik Al Latief, you can call me Dafa. I'm a Fresh Graduate Informatics from Multimedia Nusantara University. I love diving into software development, especially building Websites and Mobile apps. My
            coding journey has been exciting - I've created projects like a website for Covenant Orphanage using Laravel, a movie recommendation site called Umoviez with ReactJS, and a health tracking app named Ciakhamik using Kotlin and
            design UI/UX for movie website called Cinex Using figma. <br />
            <br /> I'm passionate about exploring various programming technologies, and I'm having worked with PHP, JavaScript, ReactJS, Laravel, Kotlin, Firebase, MySQL, Dart and TailwindCSS, and I'm always excited to learn more and
            improve my skills in web and mobile development.
          </div>

          <div className="w-full flex">
            <div className="grid grid-cols-2 gap-y-8 gap-x-24 font-sans">
              <div className="flex flex-row gap-5 items-center">
                <div className="flex bg-black w-10 h-10  items-center justify-center rounded">
                  <FaLocationArrow className="text-white" size={21} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-xl text-gray-900">Location</h3>
                  <p className="text-gray-600 font-semibold">Tangerang, Indonesia</p>
                </div>
              </div>

              <div className="flex flex-row gap-5 items-center">
                <div className="flex bg-black w-10 h-10  items-center justify-center rounded">
                  <FaBriefcase className="text-white" size={21} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-xl text-gray-900">Experience</h3>
                  <p className="text-gray-600 font-semibold">4 Months</p>
                </div>
              </div>

              <div className="flex flex-row gap-5 items-center">
                <div className="flex bg-black w-10 h-10  items-center justify-center rounded">
                  <FaBullseye className="text-white" size={21} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-xl text-gray-900">Focus</h3>
                  <p className="text-gray-600 font-semibold">Mobile & Backend Development</p>
                </div>
              </div>

              <div className="flex flex-row gap-5 items-center">
                <div className="flex bg-black w-10 h-10  items-center justify-center rounded">
                  <FaCalendarCheck className="text-white" size={21} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-xl text-gray-900">Availability</h3>
                  <p className="text-gray-600 font-semibold">Open to opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
