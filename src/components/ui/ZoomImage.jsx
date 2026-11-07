import { useEffect, useRef, useState } from "react";

const ZOOM = 2.4;

// Klik untuk zoom ke titik kursor; saat zoom area foto melebar memenuhi seluruh stage, geser mouse untuk menggeser (dihaluskan per frame), klik lagi untuk kembali
export default function ZoomImage({ src, alt, className, imgClassName }) {
  const [zoom, setZoom] = useState(false);
  const box = useRef(null);
  const img = useRef(null);
  const cur = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const ready = useRef(false);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // Posisi kursor terhadap kotak foto (tanpa transform) -> geseran agar tepi foto tercapai di tepi kotak
  const calc = (e) => {
    const b = box.current.getBoundingClientRect();
    const i = img.current;
    const fx = Math.min(Math.max((e.clientX - (b.left + i.offsetLeft + i.offsetWidth / 2)) / i.offsetWidth, -0.5), 0.5);
    const fy = Math.min(Math.max((e.clientY - (b.top + i.offsetTop + i.offsetHeight / 2)) / i.offsetHeight, -0.5), 0.5);
    return { x: -fx * (ZOOM - 1) * i.offsetWidth, y: -fy * (ZOOM - 1) * i.offsetHeight };
  };

  const paint = () => {
    img.current.style.transform = `translate(${cur.current.x}px, ${cur.current.y}px) scale(${ZOOM})`;
  };

  const loop = () => {
    const c = cur.current;
    const t = target.current;
    c.x += (t.x - c.x) * 0.2;
    c.y += (t.y - c.y) * 0.2;
    paint();
    raf.current = Math.abs(t.x - c.x) + Math.abs(t.y - c.y) > 0.2 ? requestAnimationFrame(loop) : 0;
  };

  const toggle = (e) => {
    const el = img.current;
    cancelAnimationFrame(raf.current);
    raf.current = 0;
    el.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
    if (!zoom) {
      cur.current = calc(e);
      target.current = { ...cur.current };
      ready.current = false;
      paint();
      setTimeout(() => {
        el.style.transition = "none";
        ready.current = true;
      }, 360);
    } else {
      ready.current = false;
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
