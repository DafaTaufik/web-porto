import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

const FOCUSABLE = "a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex='-1'])";

// Embed PDF di HP (terutama iOS Safari) sering hanya menampilkan halaman 1
function useIsSmall() {
  const [small, setSmall] = useState(() => window.matchMedia("(max-width: 700px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    const onChange = (e) => setSmall(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return small;
}

// Klik untuk zoom ke titik kursor, gerakkan mouse untuk menggeser, klik lagi untuk kembali
function ZoomImage({ src, alt }) {
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const point = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    return `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
  };

  return (
    <div
      className={`cert-view cert-zoom ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`}
      onClick={(e) => {
        if (!zoom) setOrigin(point(e));
        setZoom(!zoom);
      }}
      onMouseMove={(e) => zoom && setOrigin(point(e))}
    >
      <img src={src} alt={alt} className="cert-img" draggable="false" style={{ transform: zoom ? "scale(2.4)" : "none", transformOrigin: origin }} />
    </div>
  );
}

function Viewer({ cert, small }) {
  if (!cert.src) {
    return (
      <div className="cert-view flex w-[min(780px,100%)] aspect-[1.414/1] flex-col items-center justify-center gap-2.5 text-[15px] font-semibold text-[#6B7280]">
        <svg width="34" height="34" {...ICON} strokeWidth="1.6">
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
        </svg>
        [Certificate file preview]
      </div>
    );
  }
  if (cert.type === "pdf" && !small) {
    return (
      <iframe key={cert.src} src={`${cert.src}#view=FitH`} title={`Certificate: ${cert.title}`} className="cert-view cert-frame">
        <a href={cert.src}>Open PDF</a>
      </iframe>
    );
  }
  if (cert.type === "pdf") {
    return (
      <div key={cert.src} className="cert-view flex flex-col items-center gap-4 p-4 text-center">
        <img src={cert.thumb} alt={`Certificate preview: ${cert.title}`} className="block w-full h-auto rounded" />
        <a href={cert.src} target="_blank" rel="noopener noreferrer" className="cert-pill-w">
          Open PDF
        </a>
      </div>
    );
  }
  return <ZoomImage key={cert.src} src={cert.src} alt={`Certificate: ${cert.title}`} />;
}

export default function CertificateModal({ items, index, onClose, onStep }) {
  const ref = useRef(null);
  const small = useIsSmall();
  const cert = items[index];

  // Fokus masuk ke dialog saat dibuka, kunci scroll (body + Lenis lewat data-lenis-prevent)
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowRight") onStep(1);
    else if (e.key === "ArrowLeft") onStep(-1);
    else if (e.key === "Tab") {
      const nodes = [...ref.current.querySelectorAll(FOCUSABLE)];
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

  const facts = [
    ["Completed", cert.date],
    cert.hours && ["Duration", cert.hours],
    cert.credentialId && ["Credential ID", cert.credentialId],
    cert.validUntil && ["Valid until", cert.validUntil],
  ].filter(Boolean);

  return createPortal(
    <div ref={ref} role="dialog" aria-modal="true" aria-label="Certificate viewer" tabIndex={-1} onKeyDown={onKeyDown} data-lenis-prevent className="cert-modal font-Inter">
      <div className="cert-bar">
        <button type="button" onClick={onClose} aria-label="Close viewer" className="cert-round cert-mb">
          <svg width="20" height="20" {...ICON}>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <span aria-hidden="true" className="cert-ftype">
          {cert.type.toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <b className="block truncate text-[15px] font-semibold">{cert.file}</b>
          <span className="block mt-0.5 truncate text-[13px] text-[#D1D5DB]">
            {cert.platform} · {cert.date}
          </span>
        </div>
        {cert.src && (
          <>
        <a href={cert.src} download={cert.file} className="cert-pill cert-mb">
          <svg width="18" height="18" {...ICON}>
            <path d="M12 3v12m0 0-4-4m4 4 4-4M4 20h16" />
          </svg>
          <span className="cert-lbl">Download</span>
          <span className="sr-only">Download file</span>
        </a>
        <a href={cert.src} target="_blank" rel="noopener noreferrer" className="cert-pill cert-mb">
          <svg width="18" height="18" {...ICON}>
            <path d="M14 4h6v6M20 4 10 14M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
          </svg>
          <span className="cert-lbl">Open in new tab</span>
          <span className="sr-only">Open in new tab</span>
        </a>
          </>
        )}
        {cert.verifyUrl && (
          <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="cert-pill-w">
            <svg width="18" height="18" {...ICON}>
              <path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6l-8-3z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="cert-lbl">Verify</span>
            <span className="sr-only">Verify credential</span>
          </a>
        )}
      </div>

      <div className="cert-stage" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <button type="button" onClick={() => onStep(-1)} aria-label="Previous certificate" className="cert-round cert-mb cert-arr left-[22px] max-[700px]:left-1.5">
          <svg width="22" height="22" {...ICON}>
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>
        <div className="flex w-full justify-center" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <Viewer cert={cert} small={small} />
        </div>
        <button type="button" onClick={() => onStep(1)} aria-label="Next certificate" className="cert-round cert-mb cert-arr right-[22px] max-[700px]:right-1.5">
          <svg width="22" height="22" {...ICON}>
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="cert-info">
        <div className="min-w-0">
          <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">
            <i className="font-HWT text-sm not-italic tracking-[0.04em]">
              {pad(index + 1)} / {pad(items.length)}
            </i>{" "}
            · {cert.platform}
          </div>
          <h3 className="mt-1.5 font-HWT text-2xl font-normal leading-[1.05] uppercase">{cert.title}</h3>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2.5">
          {facts.map(([label, value]) => (
            <div key={label}>
              <small className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">{label}</small>
              <b className="block mt-1 text-sm font-semibold">{value}</b>
            </div>
          ))}
        </div>
        <div className="cert-hint text-xs font-medium text-[#9CA3AF]">← → browse · Esc close</div>
      </div>
    </div>,
    document.body,
  );
}
