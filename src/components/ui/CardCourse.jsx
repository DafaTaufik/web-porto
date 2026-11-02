import React from "react";

export default function CardCourse({ course }) {
  return (
    <div className="flex flex-col bg-white border-2 border-navy rounded-2xl w-fit h-fit shadow-2xl mx-4">
      {/* Certificate Image */}
      <div className="p-6 pb-6">
        <div className="bg-mist rounded-xl overflow-hidden border border-navy/10">
          <img src={course.image} alt={`${course.organization} Certificate`} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Certificate Details */}
      <div className="px-6 pb-6 flex flex-col">
        {/* Title */}
        <h3 className="font-Inter font-semibold text-xl md:text-2xl text-navy">{course.title}</h3>

        {/* Organization */}
        <p className="font-Inter font-semibold text-lg text-navy mt-1">{course.organization}</p>

        {/* Divider */}
        <hr className="border-t-2 rounded-4xl border-navy w-2/4 my-3" />

        {/* Completion Date */}
        <p className="font-Sora font-semibold text-base text-navy/70 mb-4">Completed on {course.completedDate}</p>

        {/* Tags/Buttons */}
        <div className="flex gap-3 mt-2">
          {course.tags.map((tag, index) => (
            <span key={index} className={`px-6 py-2 text-white text-lg font-Sora font-semibold rounded-full ${index === 0 ? "bg-navy/70" : "bg-navy"}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
