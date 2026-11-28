import { useEffect, useRef, useState } from "react";

const ZOOM = 2.4;

// Click-to-zoom image with cursor-driven panning. Clicking zooms toward the cursor and expands the
// viewport to fill the stage; mouse movement pans with per-frame easing; a second click restores it.
//
// The zoom transition animates via scale(). Once it settles, the image is swapped to its real
// zoomed dimensions (no scale) on its own compositor layer, with pan offsets snapped to device
// pixels. Painting at 1:1 from the source keeps it sharp, and the dedicated layer prevents the
// repaint trails Chrome leaves when a large non-composited image is translated.
export default function ZoomImage({ src, alt, className, imgClassName }) {
  const [zoom, setZoom] = useState(false);
  const box = useRef(null);
  const img = useRef(null);
  const base = useRef({ w: 0, h: 0 });
  const origin = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const ready = useRef(false);
  const timer = useRef(0);

  useEffect(
    () => () => {
      cancelAnimationFrame(raf.current);
      clearTimeout(timer.current);
    },
    [],
  );

  // Maps the cursor position (relative to the box center, where the image is always centered) to a
  // pan offset, so the image edges line up with the box edges when the cursor reaches them.
  const calc = (e) => {
    const b = box.current.getBoundingClientRect();
    const { w, h } = base.current;
    const fx = Math.min(Math.max((e.clientX - (b.left + b.width / 2)) / w, -0.5), 0.5);
    const fy = Math.min(Math.max((e.clientY - (b.top + b.height / 2)) / h, -0.5), 0.5);
    return { x: -fx * (ZOOM - 1) * w, y: -fy * (ZOOM - 1) * h };
  };

  const scaled = () => `translate(${cur.current.x}px, ${cur.current.y}px) scale(${ZOOM})`;

  // Snaps the final position to whole device pixels so the compositor never resamples the layer.
  const paint = () => {
    const dpr = window.devicePixelRatio || 1;
    const o = origin.current;
    const x = Math.round((o.x + cur.current.x) * dpr) / dpr - o.x;
    const y = Math.round((o.y + cur.current.y) * dpr) / dpr - o.y;
    img.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const loop = () => {
    const c = cur.current;
    const t = target.current;
    c.x += (t.x - c.x) * 0.2;
    c.y += (t.y - c.y) * 0.2;
    paint();
    raf.current = Math.abs(t.x - c.x) + Math.abs(t.y - c.y) > 0.2 ? requestAnimationFrame(loop) : 0;
  };

  const sharpen = () => {
    const el = img.current;
    // Re-measure: the zoomed box is larger, so the image's max-size constraints may have changed.
    base.current = { w: el.offsetWidth, h: el.offsetHeight };
    const { w, h } = base.current;
    el.style.transition = "none";
    el.style.maxWidth = "none";
    el.style.maxHeight = "none";
    el.style.width = `${w * ZOOM}px`;
    el.style.height = `${h * ZOOM}px`;
    el.style.transform = "none";
    const r = el.getBoundingClientRect();
    origin.current = { x: r.left, y: r.top };
    el.style.willChange = "transform";
    paint();
    ready.current = true;
  };

  const unsharpen = () => {
    const el = img.current;
    el.style.willChange = "auto";
    el.style.maxWidth = el.style.maxHeight = el.style.width = el.style.height = "";
    el.style.transform = scaled();
    void el.offsetWidth; // Force a reflow so the exit transition starts from the zoomed state.
  };

  const toggle = (e) => {
    const el = img.current;
    cancelAnimationFrame(raf.current);
    raf.current = 0;
    clearTimeout(timer.current);
    if (!zoom) {
      base.current = { w: el.offsetWidth, h: el.offsetHeight };
      cur.current = calc(e);
      target.current = { ...cur.current };
      ready.current = false;
      el.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.transform = scaled();
      timer.current = setTimeout(sharpen, 360);
    } else {
      if (ready.current) unsharpen();
      ready.current = false;
      el.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.transform = "none";
    }
    setZoom(!zoom);
  };

  const move = (e) => {
    if (!zoom || !ready.current) return;
    target.current = calc(e);
    if (!raf.current) raf.current = requestAnimationFrame(loop);
  };

  return (
    <div ref={box} className={`${className} ${zoom ? "is-zoom cursor-zoom-out" : "cursor-zoom-in"}`} onClick={toggle} onMouseMove={move}>
      <img ref={img} src={src} alt={alt} draggable="false" className={imgClassName} />
    </div>
  );
}
