import { useState, useRef } from "react";
import { Timeline } from "../ui/Timeline";
import { ProfessionalExperience } from "../ui/ProfessionalExperience";
import { OrganizationalExperienceData } from "../../data/OrganizationalExperienceData";

export function Experience() {
  const [activeTab, setActiveTab] = useState("Professional");
  const [animState, setAnimState] = useState("idle"); // 'idle' | 'exit' | 'enter'
  const isAnimating = useRef(false);

  const handleTabChange = (tab) => {
    if (tab === activeTab || isAnimating.current) return;
    isAnimating.current = true;

    // Step 1: Exit cepat (150ms) — langsung terasa responsif
    setAnimState("exit");

    setTimeout(() => {
      // Step 2: Ganti konten, set posisi awal enter (bawah, invisible) — tanpa transisi
      setActiveTab(tab);
      setAnimState("prepare-enter");

      // Step 3: Frame berikutnya — slide up lambat (700ms)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimState("enter");

          setTimeout(() => {
            setAnimState("idle");
            isAnimating.current = false;
          }, 700);
        });
      });
    }, 150);
  };

  const getContentStyle = () => {
    switch (animState) {
      case "exit":
        return {
          opacity: 0,
          transform: "translateY(12px)",
          transition: "opacity 150ms ease-in, transform 150ms ease-in",
        };
      case "prepare-enter":
        return {
          opacity: 0,
          transform: "translateY(40px)",
          transition: "none",
        };
      case "enter":
        return {
          opacity: 1,
          transform: "translateY(0px)",
          transition: "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
        };
      default: // idle
        return {
          opacity: 1,
          transform: "translateY(0px)",
          transition: "none",
        };
    }
  };

  return (
    <section id="experience" className="w-full">
      <div className="max-w-7xl w-fit mt-20 lg:mx-44">
        {/* Headline */}
        <h2 className="font-HWT text-5xl md:text-6xl text-navy dark:text-white max-w-4xl">Experience</h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm"></p>
      </div>

      {/* Tabs */}
      <div className="relative flex bg-mist ml-42 mt-14  mb-11 dark:bg-neutral-800 rounded-full w-fit p-1">
        {/* Sliding pill hitam */}
        <div
          className="absolute top-1 bottom-1 rounded-full bg-accent transition-all duration-700 ease-in-out"
          style={{
            width: "calc(50% - 4px)",
            left: activeTab === "Professional" ? "4px" : "calc(50%)",
          }}
        />

        {["Professional", "Organizational"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`relative z-10 px-6 py-2 rounded-full text-lg font-HWT font-medium transition-colors duration-700
              ${activeTab === tab ? "text-white" : "text-navy/70 dark:text-neutral-400 hover:text-navy dark:hover:text-white"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content dengan animasi slide up */}
      <div style={getContentStyle()}>
        {activeTab === "Professional" ? (
          <ProfessionalExperience />
        ) : (
          <Timeline data={OrganizationalExperienceData} />
        )}
      </div>
    </section>
  );
}
