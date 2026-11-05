import React from "react";
import { FaCalendarCheck } from "react-icons/fa";

export default function CardCourse({ course }) {
  const [category, ...rest] = course.tags;

  return (
    <article className="group flex flex-col h-full bg-white border border-gray-200 rounded-2xl p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#1D1D1D]">
      {/* Certificate Image */}
      <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
        <img src={course.image} alt={`${course.title} certificate from ${course.organization}`} loading="lazy" className="w-full aspect-[4/3] object-cover transition duration-300 group-hover:scale-[1.03]" />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 pt-5 px-1">
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">{course.organization}</span>
        <h3 className="font-sans font-bold text-xl text-[#1D1D1D] mt-1 leading-snug">{course.title}</h3>

        <p className="flex items-center gap-2 font-sans text-sm font-semibold text-gray-600 mt-3">
          <FaCalendarCheck size={14} aria-hidden="true" />
          Completed on {course.completedDate}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto pt-5">
          <span className="px-3 py-1 text-sm font-sans font-semibold rounded-full border border-gray-300 text-gray-700">{category}</span>
          {rest.map((tag) => (
            <span key={tag} className="px-3 py-1 text-sm font-sans font-semibold rounded-full bg-[#1D1D1D] text-white">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
