import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const pad = (n) => String(n).padStart(2, "0");

const ICON = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", "aria-hidden": "true" };
const FOCUSABLE = "button:not([disabled]), [tabindex]:not([tabindex='-1'])";

// Viewer screenshot project. item: { src, alt, caption, ratio, placeholder }
export default function ProjectViewer({ items, index, title, onClose, onStep, onJump }) {
  const ref = useRef(null);
  const closeRef = useRef(null);
  const item = items[index];

  // Fokus masuk ke tombol tutup; scroll dikunci (body + Lenis lewat data-lenis-prevent) dan selalu dipulihkan
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowRight") onStep(1);
    else if (e.key === "ArrowLeft") onStep(-1);
    else if (e.key === "Tab") {
      const nodes = [...ref.current.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === ref.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const label = `Screenshot ${pad(index + 1)}`;

  return createPortal(
    <div ref={ref} role="dialog" aria-modal="true" aria-label="Screenshot viewer" tabIndex={-1} onKeyDown={onKeyDown} data-lenis-prevent className="pd-modal font-Inter">
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        <div className="flex min-w-0 items-center gap-3.5">
          <span className="whitespace-nowrap font-HWT text-base tracking-[0.06em]">
            {pad(index + 1)} / {pad(items.length)} · {title}
          </span>
          <span className={`truncate text-sm font-medium ${item.caption ? "text-[#D1D5DB]" : "italic text-[#9CA3AF]"}`}>{item.caption || "[Caption]"}</span>
        </div>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close viewer" className="pd-vb h-11 w-11 flex-none">
          <svg width="20" height="20" {...ICON}>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="pd-stage relative flex min-h-0 flex-1 items-center justify-center px-[90px] py-2" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <button type="button" onClick={() => onStep(-1)} aria-label="Previous screenshot" className="pd-vb absolute left-5 top-1/2 -mt-[26px] h-[52px] w-[52px] max-[760px]:left-1.5">
          <svg width="22" height="22" {...ICON}>
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <div
          key={index}
          className="pd-pop box-border flex max-w-full flex-col items-center justify-center overflow-hidden rounded-[20px]"
          style={{ height: "min(66vh, 720px)", aspectRatio: item.ratio, ...(item.placeholder ? { border: "1px dashed #6B7280", background: "#1B1B1B", gap: 12, color: "#9CA3AF" } : {}) }}
        >
          {item.placeholder ? (
            <>
              <svg width="44" height="44" {...ICON} strokeWidth="1.5">
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <circle cx="9" cy="10.5" r="1.6" />
                <path d="M21 16l-5-5-8 8" />
              </svg>
              <span className="text-[15px] font-semibold italic">[{label}]</span>
            </>
          ) : (
            <img src={item.src} alt={item.alt} className="h-full w-full object-contain" />
          )}
        </div>
        <button type="button" onClick={() => onStep(1)} aria-label="Next screenshot" className="pd-vb absolute right-5 top-1/2 -mt-[26px] h-[52px] w-[52px] max-[760px]:right-1.5">
          <svg width="22" height="22" {...ICON}>
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="pd-vst flex justify-center gap-2.5 px-6 pb-2 pt-3.5">
        {items.map((it, i) => (
          <button key={i} type="button" onClick={() => onJump(i)} aria-label={`Go to screenshot ${pad(i + 1)}`} aria-current={i === index} className={`pd-th ${i === index ? "act" : ""}`}>
            {it.placeholder ? pad(i + 1) : <img src={it.src} alt="" />}
          </button>
        ))}
      </div>
      <div className="pd-vh px-6 pb-4 text-center text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">← → browse · Esc close</div>
    </div>,
    document.body,
  );
}
