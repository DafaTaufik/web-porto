import React from "react";
import { CoursesData } from "../../data/CoursesData";
import CardCourse from "../ui/CardCourse";

export default function Courses() {
  return (
    <section id="courses" className="w-full h-full flex flex-col justify-center items-center overflow-hidden">
      <span className="font-HWT text-4xl items-center">Courses & Training</span>
      <div className="mt-5 w-full grid grid-cols-3 place-items-center px-9 gap-y-5">
        {CoursesData.map((course) => (
          <CardCourse key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
