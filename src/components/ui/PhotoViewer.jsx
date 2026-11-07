import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const pad = (n) => String(n).padStart(2, "0");

const ICON = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", "aria-hidden": "true" };
const FOCUSABLE = "button:not([disabled]), [tabindex]:not([tabindex='-1'])";

export default function PhotoViewer({ photos, index, orgName, onClose, onStep, onJump }) {
  const ref = useRef(null);
  const photo = photos[index];

  // Fokus masuk ke dialog saat dibuka; scroll dikunci (body + Lenis lewat data-lenis-prevent) dan selalu dipulihkan
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
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

  const hasCaption = Boolean(photo.caption);

  return createPortal(
    <div ref={ref} role="dialog" aria-modal="true" aria-label="Photo viewer" tabIndex={-1} onKeyDown={onKeyDown} data-lenis-prevent className="org-modal font-Inter">
      <div className="org-bar flex items-center gap-3.5 border-b border-white/[0.14] px-[22px] py-3.5">
        <button type="button" onClick={onClose} aria-label="Close viewer" className="org-round org-mb h-11 w-11">
          <svg width="20" height="20" {...ICON}>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">
            <span className="font-HWT text-sm tracking-[0.04em]">
              {pad(index + 1)} / {pad(photos.length)}
            </span>{" "}
            · {orgName}
          </div>
          <div className={`mt-1 truncate text-sm font-semibold ${hasCaption ? "text-[#D1D5DB]" : "italic text-[#D1D5DB]"}`}>{hasCaption ? photo.caption : "[Caption for this photo]"}</div>
        </div>
      </div>

      <div className="org-stage" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <button type="button" onClick={() => onStep(-1)} aria-label="Previous photo" className="org-round org-mb org-arr left-[22px] max-[700px]:left-1.5">
          <svg width="22" height="22" {...ICON}>
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>
        <img key={photo.src} src={photo.src} alt={photo.alt} className="org-pg" />
        <button type="button" onClick={() => onStep(1)} aria-label="Next photo" className="org-round org-mb org-arr right-[22px] max-[700px]:right-1.5">
          <svg width="22" height="22" {...ICON}>
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="org-strip flex items-center justify-center gap-2.5 border-t border-white/[0.14] px-[26px] pt-3.5 pb-5">
        {photos.map((p, i) => (
          <button key={p.src} type="button" onClick={() => onJump(i)} aria-label={`Go to photo ${pad(i + 1)}`} aria-current={i === index} className={`org-tb ${i === index ? "act" : ""}`}>
            <img src={p.src} alt="" />
          </button>
        ))}
        <span className="org-hint ml-[18px] text-xs font-medium text-[#9CA3AF]">← → browse · Esc close</span>
      </div>
    </div>,
    document.body,
  );
}
