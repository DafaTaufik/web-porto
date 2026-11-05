import React from "react";
import { CoursesData } from "../../data/CoursesData";
import CardCourse from "../ui/CardCourse";

export default function Courses() {
  return (
    <section id="courses" className="w-full flex flex-col items-center px-6 md:px-14 py-16 md:py-24">
      <div className="w-full max-w-[1400px]">
        {/* Heading — same pattern as About Me */}
        <div className="flex flex-col items-center md:items-start">
          <span className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Always learning</span>
          <h2 className="font-HWT text-5xl md:text-7xl text-[#1D1D1D] mt-1 text-center md:text-left">Courses & Training</h2>
          <p className="font-sans text-base md:text-lg font-medium text-gray-700 mt-4 max-w-[560px] text-center md:text-left">Certified courses I completed to sharpen my programming and design fundamentals.</p>
        </div>

        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {CoursesData.map((course) => (
            <CardCourse key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
