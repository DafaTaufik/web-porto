import React from "react";
import Card from "./Card";
import { ProjectsData } from "../../data/ProjectsData";

export function Project() {
  const [featured, ...others] = ProjectsData;

  return (
    <section id="projects" className="w-full flex flex-col items-center px-6 md:px-14 py-16 md:py-24">
      <div className="w-full max-w-[1400px]">
        {/* Heading — same pattern as About Me */}
        <div className="flex flex-col items-center md:items-start">
          <span className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Selected work</span>
          <h2 className="font-HWT text-5xl md:text-7xl text-[#1D1D1D] mt-1">Projects</h2>
          <p className="font-sans text-base md:text-lg font-medium text-gray-700 mt-4 max-w-[560px] text-center md:text-left">A few things I have built across mobile, web, and design.</p>
        </div>

        <div className="mt-10 md:mt-14 flex flex-col gap-6">
          <Card project={featured} index={0} featured />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {others.map((project, i) => (
              <Card key={project.id} project={project} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Project;
