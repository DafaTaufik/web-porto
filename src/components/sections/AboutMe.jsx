import React, { useEffect, useRef } from "react";
import ggImage from "../../assets/Image/gg.jpg";
import TiltedCard from "../ui/TiltedCard";
import gsap from "gsap";
import ScrollReveal from "../ui/ScrollReveal";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;

    // Create animation with GSAP
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#home", // Menggunakan section home sebagai trigger
        start: "10% top", // Dimulai ketika center home mencapai top viewport
        end: "100% top",
        scrub: 1,
        markers: true,
      },
    });

    const isDesktop = window.matchMedia("(min-width: 640px)").matches;

    if (isDesktop) {
      // Animasi untuk desktop
      tl.to(bgRef.current, {
        width: "89vw",
        borderRadius: "50px",
        ease: "power1.inOut",
      });
    } else {
      // Animasi untuk mobile
      tl.to(bgRef.current, {
        width: "95vw",
        borderRadius: "25px",
        ease: "power1.inOut",
      });
    }

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full h-[800px] flex flex-col items-center relative">
      {/* This is the black background div that will be resized on scroll */}
      <div
        ref={bgRef}
        className="absolute top-0 h-[760px] w-screen left-1/2 transform -translate-x-1/2 
             bg-white shadow-2xl rounded-2xl"
      ></div>

      {/* Content that sits on top of the animated background */}
      <span className="font-HWT text-5xl md:text-6xl text-black mt-16 relative z-10">About Me</span>

      <div className="px-7 md:px-32 w-screen flex flex-col md:flex-row justify-center md:justify-between md:mt-16 relative z-10">
        {/* Image Section - Left Side */}
        <div className="w-fit h-fit ml-20 mb-8 md:mb-0 ">
          <TiltedCard
            imageSrc={ggImage}
            altText="Dafa Taufik"
            captionText=""
            containerHeight="400px"
            containerWidth="350px"
            imageHeight="400px"
            imageWidth="350px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={false}
          />
        </div>

        {/* Right Side Content */}
        <div className="flex flex-col gap-6 md:gap-10 items-center md:items-start mb-16 md:mb-0">
          {/* Text Section - Right Side */}
          <div className="font-sans font-medium  md:text-justify  md:text-base md:w-[600px] flex items-center">
            Hi, my name is Dafa Taufik Al Latief, you can call me Dafa. Iam a 6th-semester Informatics student from Multimedia Nusantara University. I love diving into software development, especially building websites and mobile apps. My
            coding journey has been exciting - I've created projects like a website for Covenant Orphanage using Laravel, a movie recommendation site called Umoviez with ReactJS, and a health tracking app named Ciakhamik using Kotlin and
            design UI/UX for movie website called Cinex Using figma. <br />
            <br /> I'm passionate about exploring various programming technologies, and I'm having worked with PHP, JavaScript, ReactJS, Laravel, Kotlin, Firebase, MySQL, Dart and TailwindCSS, and I'm always excited to learn more and
            improve my skills in web and mobile development.
          </div>

          <div className="w-full flex">
            <div className="grid grid-cols-2 gap-8 font-sans">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Location</h3>
                <p className="text-gray-600">Tangerang, Indonesia</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Experience</h3>
                <p className="text-gray-600">4 Mounths</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Focus</h3>
                <p className="text-gray-600">Mobile & Backend Development</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Availability</h3>
                <p className="text-gray-600">Open to opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
