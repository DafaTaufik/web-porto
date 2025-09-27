import React from "react";
import { Timeline } from "../ui/Timeline";
import { OrganizationalExperienceData } from "../../data/OrganizationalExperienceData";
import { ProfessionalExperienceData } from "../../data/ProfessionalExperienceData";

export function Experience() {
  return (
    <section id="experience" className="w-full px-4 ">
      <div className=" max-w-7xl w-fit my-20 lg:mx-56">
        <h2 className="font-HWT text-5xl md:text-6xl mb-4 text-black dark:text-white max-w-4xl">Experience</h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm"></p>
      </div>
      <Timeline data={OrganizationalExperienceData} />
    </section>
  );
}
