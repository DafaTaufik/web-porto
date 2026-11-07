const pad = (n) => String(n).padStart(2, "0");

const ICON = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": "true",
};

// [data-card] hanya dianimasikan reveal-nya oleh GSAP; hover sepenuhnya CSS di .course-tile
export default function CardCourse({ cert, index, onOpen }) {
  return (
    <div data-card className="h-full">
      <button type="button" data-index={index} onClick={(e) => onOpen(index, e.currentTarget)} aria-label={`View certificate: ${cert.title}`} className="course-tile">
        <span className="course-thumb">
          {cert.thumb ? (
            <img src={cert.thumb} alt={`Certificate preview: ${cert.title}`} loading="lazy" />
          ) : (
            <span className="course-ph">
              <svg width="26" height="26" {...ICON} strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="9" cy="9" r="1.6" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              [Certificate image]
            </span>
          )}
          <span className="course-type">{cert.type.toUpperCase()}</span>
          <span className="course-no">{pad(index + 1)}</span>
          <span className="course-veil" aria-hidden="true">
            <span>
              <svg width="16" height="16" {...ICON}>
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
              View certificate
            </span>
          </span>
        </span>

        <span className="flex flex-col flex-1 px-2.5 pt-5 pb-2">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#6B7280]">{cert.platform}</span>
          <span className="block mt-2.5 min-h-[2.1em] font-HWT text-[26px] leading-[1.05] uppercase">{cert.title}</span>
          <span className="flex flex-wrap items-center gap-x-[18px] gap-y-2 mt-4 text-[13px] font-semibold text-[#4B5563]">
            <span className="flex items-center gap-[7px]">
              <svg width="15" height="15" {...ICON}>
                <rect x="3" y="4" width="18" height="18" rx="3" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              {cert.date}
            </span>
            {cert.hours && (
              <span className="flex items-center gap-[7px]">
                <svg width="15" height="15" {...ICON}>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                {cert.hours}
              </span>
            )}
          </span>
          <span className="flex items-end justify-between gap-3 mt-auto pt-[18px]">
            <span className="flex flex-wrap gap-2">
              {cert.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[#D4D4D4] px-3 py-[5px] text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </span>
            <span className="course-go" aria-hidden="true">
              <svg width="18" height="18" {...ICON}>
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </span>
          </span>
        </span>
      </button>
    </div>
  );
}
