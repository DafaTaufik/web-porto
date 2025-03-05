import React, { useEffect, useRef } from "react";
import ggImage from "../assets/Image/gg.jpg";
import TiltedCard from "./ui/TiltedCard";
import gsap from "gsap";
import ScrollReveal from "./ui/ScrollReveal";
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
                trigger: sectionRef.current,
                start: "top top",
                end: "center-=30px top", 
                scrub: 1,      
                markers: true, 
                onEnter: () => console.log("About Me section entered"),
                onLeave: () => console.log("About Me section left"),
            }
        });
        

        tl.to(bgRef.current, {
            "@media (min-width: 640px)": {
            width: "90vw",
            borderRadius: '50px',
            ease: "power1.inOut"
            },
            width: "95vw",
            borderRadius: '25px',
            ease: "power1.inOut"
        });
        
        return () => {
            if (tl.scrollTrigger) {
                tl.scrollTrigger.kill();
            }
        };
    }, []);
    
    return(
        <div ref={sectionRef} className="w-full h-[900px] flex flex-col items-center relative bg-white">
            {/* This is the black background div that will be resized on scroll */}
            <div 
                ref={bgRef}
                className="absolute top-0 h-[900px] bg-black w-screen left-1/2 transform -translate-x-1/2"
            ></div>
            
            {/* Content that sits on top of the animated background */}
            <span className="font-HWT text-5xl  md:text-6xl text-white mt-32 relative z-10">About Me</span>

            <div className="px-7 w-screen flex flex-col md:flex-row justify-center md:justify-between md:px-32 mt-16 md:mt-30 relative z-10">
                <div className="font-Asap md:tracking-wider md:text-justify md:font-semibold text-md md:text-lg md:w-[700px] text-white flex items-center">
                Hi, my name is Dafa Taufik Al Latief, you can call me Dafa. Iam a 6th-semester Informatics student from Multimedia Nusantara University. I love diving into software development, especially building websites and mobile apps. My coding journey has been exciting - I've created projects like a website for Covenant Orphanage using Laravel, a movie recommendation site called Umoviez with ReactJS, and a health tracking app named Ciakhamik using Kotlin and design UI/UX for movie website called Cinex Using figma. I'm passionate about exploring various programming technologies, and I'm having worked with PHP, JavaScript, ReactJS, Laravel, Kotlin, Firebase, MySQL, Dart and TailwindCSS, and I'm always excited to learn more and improve my skills in web and mobile development.
                </div>
                <div className="w-fit mr-16">
                    <TiltedCard
                        imageSrc={ggImage}
                        altText="Dafa Taufik"
                        captionText=""
                        containerHeight="400px"
                        containerWidth="350px"
                        imageHeight="350px"
                        imageWidth="300px"
                        rotateAmplitude={12}
                        scaleOnHover={1.2}
                        showMobileWarning={false}
                        showTooltip={false}
                        displayOverlayContent={false}
                    />
                </div>
            </div>
        </div>
    );
}