import React from "react";
import { Timeline } from "../ui/Timeline";
import { ExperienceData } from "../../data/ExperienceData";

export function Experience() {
  
  return (
    <section id="experience"className="w-full px-4">
      <Timeline data={ExperienceData} />
    </section>
  );
}
