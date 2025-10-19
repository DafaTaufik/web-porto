import React from "react";
import { ProfessionalExperienceData } from "../../data/ProfessionalExperienceData";

export const ProfessionalExperience = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="space-y-6">
        {ProfessionalExperienceData.map((experience, index) => (
          <div key={index} className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-neutral-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h4 className="text-xl font-semibold font-sans text-black dark:text-white">{experience.position}</h4>
                <p className="text-blue-600 dark:text-blue-400 font-medium font-sans">{experience.company}</p>
              </div>
              <div className="text-base text-black font-semibold dark:text-neutral-400 mt-2 md:mt-0">{experience.duration}</div>
            </div>

            {/* Activities */}
            <div className="mb-4">
              <h5 className="text-base font-medium text-gray-700 dark:text-neutral-300 mb-2">Key Activities:</h5>
              <ul className="list-disc list-inside space-y-1 text-base font-semibold text-black">
                {experience.activities.map((activity, idx) => (
                  <li key={idx}>{activity}</li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h5 className="text-base font-medium text-gray-700 dark:text-neutral-300 mb-3">Technologies:</h5>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
