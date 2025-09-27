import React, { useState } from "react";
import { Timeline } from "../ui/Timeline";
import { OrganizationalExperienceData } from "../../data/OrganizationalExperienceData";
import { ProfessionalExperienceData } from "../../data/ProfessionalExperienceData";

export function Experience() {
  const [activeTab, setActiveTab] = useState("Professional");

  return (
    <section id="experience" className="w-full px-4 ">
      <div className="max-w-7xl w-fit mt-20 lg:mx-56">
        {/* Headline */}
        <h2 className="font-HWT text-5xl md:text-6xl mb-4 text-black dark:text-white max-w-4xl">Experience</h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm"></p>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-200 ml-56 mt-12 mb-12 dark:bg-neutral-800 rounded-full w-fit">
        {["Professional", "Organizational"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-md font-HWT font-medium transition-colors duration-200
              ${activeTab === tab ? "bg-black text-white" : "text-gray-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content sesuai tab */}
      {activeTab === "Professional" ? (
        <div className="max-w-6xl mx-auto p-6 border rounded-xl shadow-md bg-white dark:bg-neutral-900 dark:border-neutral-700">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Professional Experience</h3>
          <p className="text-gray-600 dark:text-neutral-400">(Placeholder) — nanti bisa Anda isi dengan style/komponen custom.</p>
        </div>
      ) : (
        <Timeline data={OrganizationalExperienceData} />
      )}
    </section>
  );
}
