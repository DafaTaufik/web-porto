import React, { useEffect, useRef } from "react";
import ggImage from "../assets/Image/gg.jpg";
import TiltedCard from "./ui/TiltedCard";
import gsap from "gsap";
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
            width: "90vw",
            borderRadius: '50px',
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
                className="absolute top-0 h-[900px]  bg-black w-screen left-1/2 transform -translate-x-1/2"
            ></div>
            
            {/* Content that sits on top of the animated background */}
            <span className="font-HWT text-6xl text-white mt-32 relative z-10">About Me</span>

            <div className="w-screen flex flex-row justify-between px-24 mt- relative z-10">
                <div className="font-sans font-semibold text-lg w-96 text-white">Heloo my name is dafa taufik, you can call me Dafa. Iam a sixty-semester student, from informatics, Multimedia Nusantara University</div>
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