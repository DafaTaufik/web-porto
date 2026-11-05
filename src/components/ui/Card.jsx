import React from "react";
import { FaGithub } from "react-icons/fa";

function Cover({ project, index, className }) {
  return (
    <div className={`relative overflow-hidden rounded-xl flex items-center justify-center ${className}`}>
      {project.image ? (
        <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="w-full h-full object-contain transition duration-300 group-hover:scale-[1.04]" />
      ) : (
        <>
          <span className="font-HWT text-[9rem] leading-none text-white/10 select-none transition duration-300 group-hover:text-white/20" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute bottom-3 left-4 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-white/60">{project.category}</span>
        </>
      )}
    </div>
  );
}

function Tags({ tags, dark }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className={`px-3 py-1 text-sm font-sans font-semibold rounded-full border ${dark ? "border-white/30 text-white" : "border-gray-300 text-gray-700"}`}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

function RepoButton({ link, title, dark }) {
  if (!link) return null;
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${title} source on GitHub`}
      className={`inline-flex items-center gap-2 w-fit px-4 py-2 text-base font-semibold font-sans rounded-md shadow-md cursor-pointer transition duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 ${
        dark ? "bg-white text-[#1D1D1D] hover:bg-gray-100 focus-visible:outline-white" : "bg-[#1D1D1D] text-white hover:bg-gray-800 focus-visible:outline-[#1D1D1D]"
      }`}
    >
      <FaGithub size={18} aria-hidden="true" />
      View Code
    </a>
  );
}

export default function Card({ project, index, featured = false }) {
  if (featured) {
    return (
      <article className="group grid md:grid-cols-5 gap-6 md:gap-10 bg-[#1D1D1D] text-white rounded-3xl p-5 md:p-8 shadow-2xl">
        <Cover project={project} index={index} className="md:col-span-2 bg-white h-64 md:h-auto md:min-h-[320px] p-6" />
        <div className="md:col-span-3 flex flex-col justify-center gap-5">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Featured · {project.category}</span>
          <h3 className="font-HWT text-4xl md:text-6xl">{project.title}</h3>
          <p className="font-sans text-base md:text-lg font-medium text-white/80 leading-relaxed max-w-[560px]">{project.description}</p>
          <Tags tags={project.tags} dark />
          <RepoButton link={project.link} title={project.title} dark />
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col h-full bg-white border border-gray-200 rounded-2xl p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#1D1D1D]">
      <Cover project={project} index={index} className="bg-[#1D1D1D] h-44" />
      <div className="flex flex-col flex-1 gap-3 pt-5 px-1">
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">{project.category}</span>
        <h3 className="font-sans font-bold text-xl text-[#1D1D1D] leading-snug">{project.title}</h3>
        <p className="font-sans text-base font-medium text-gray-700 leading-relaxed">{project.description}</p>
        <div className="mt-auto pt-3 flex flex-col gap-4">
          <Tags tags={project.tags} />
          <RepoButton link={project.link} title={project.title} />
        </div>
      </div>
    </article>
  );
}
