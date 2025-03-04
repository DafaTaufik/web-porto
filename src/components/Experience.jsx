import React from "react";
import { Timeline } from "./ui/Timeline";
import { ExperienceData } from "../Data/ExperienceData";

export function Experience() {
  
  return (
    <div className="w-full">
      <Timeline data={ExperienceData} />
    </div>
  );
}
