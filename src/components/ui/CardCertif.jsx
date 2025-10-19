import React from "react";

export default function CardCertif({ certificate }) {
  return (
    <div className="flex flex-col bg-white border-2 border-black rounded-2xl w-fit h-fit shadow-2xl mx-4">
      {/* Certificate Image */}
      <div className="p-6 pb-6">
        <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-300">
          <img src={certificate.image} alt={`${certificate.organization} Certificate`} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Certificate Details */}
      <div className="px-6 pb-6 flex flex-col">
        {/* Title */}
        <h3 className="font-Inter font-semibold text-xl md:text-2xl text-black">{certificate.title}</h3>

        {/* Organization */}
        <p className="font-Inter font-semibold text-lg text-black mt-1">{certificate.organization}</p>

        {/* Divider */}
        <hr className="border-t-2 rounded-4xl border-black w-2/4 my-3" />

        {/* Completion Date */}
        <p className="font-sans font-semibold text-base text-gray-600 mb-4">Completed on {certificate.completedDate}</p>

        {/* Tags/Buttons */}
        <div className="flex gap-3 mt-2">
          {certificate.tags.map((tag, index) => (
            <span key={index} className={`px-6 py-2 text-white text-lg font-sans font-semibold rounded-full ${index === 0 ? "bg-[#86858A]" : "bg-[#464648]"}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
