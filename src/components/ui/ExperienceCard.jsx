// Tiga lapis supaya transform tidak saling menimpa:
// [data-card] (reveal masuk) > [data-tilt] (miring mouse) > isi kartu, angka outline [data-depth] terpisah
export default function ExperienceCard({ entry, index }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article data-card className="relative">
      <div data-tilt className="relative box-border p-2.5 rounded-[32px] bg-[#ECECEC] shadow-[0_24px_50px_rgba(0,0,0,0.12)]">
        <div className="relative overflow-hidden box-border flex flex-col gap-5 rounded-3xl border-[3px] border-[#1D1D1D] bg-[#F4F4F4] px-[22px] pt-8 pb-7 sm:px-8">
          {/* Angka outline */}
          <div
            aria-hidden="true"
            data-depth="0.5"
            className="absolute right-6 bottom-2 z-0 font-HWT text-[110px] sm:text-[170px] leading-none text-transparent [-webkit-text-stroke:2px_#D4D4D4]"
          >
            {number}
          </div>

          {/* Periode + tipe */}
          <div className="relative z-1 flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full border border-[#1D1D1D] bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[#4B5563]">{entry.duration}</span>
            <span className="rounded-full bg-[#1D1D1D] px-3 py-[3px] text-xs font-bold uppercase text-white">{entry.type}</span>
          </div>

          {/* Perusahaan + jabatan */}
          <div className="relative z-1 flex flex-col gap-2">
            <h3 className="m-0 font-HWT font-normal uppercase leading-none text-[clamp(36px,4.2vw,58px)]">{entry.company}</h3>
            <span className="text-lg font-bold">
              {entry.position}
              {entry.mode && <span className="font-medium text-[#6B7280]"> · {entry.mode}</span>}
            </span>
          </div>

          {/* Projects (hanya jika ada) */}
          {entry.projects?.length > 0 && (
            <div className="relative z-1 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-bold uppercase tracking-[0.12em] text-[#6B7280]">Projects</span>
              {entry.projects.map((project) => (
                <span key={project} className="rounded-full bg-[#1D1D1D] px-3.5 py-1.5 text-sm font-semibold text-white">
                  {project}
                </span>
              ))}
            </div>
          )}

          {/* Poin */}
          <ul className="relative z-1 m-0 flex max-w-[560px] flex-col gap-3 p-0 list-none">
            {entry.activities.map((activity) => (
              <li key={activity} className="flex gap-3 text-base font-medium leading-[1.65] text-[#374151]">
                <span aria-hidden="true" className="mt-[9px] h-2 w-2 flex-none bg-[#1D1D1D]" />
                {activity}
              </li>
            ))}
          </ul>

          {/* Teknologi */}
          <div className="relative z-1 flex flex-wrap gap-2 border-t-2 border-dashed border-[#1D1D1D] pt-4">
            {entry.technologies.map((tech) => (
              <span key={tech} className="rounded-full border border-[#D4D4D4] bg-white px-3.5 py-[7px] text-[13px] font-semibold">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
