"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  // Update height dengan ResizeObserver — otomatis re-measure saat gambar/konten selesai load
  useEffect(() => {
    if (!ref.current) return;

    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.getBoundingClientRect().height);
      }
    };

    // ResizeObserver: trigger setiap kali ukuran konten berubah (termasuk setelah gambar load)
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(ref.current);

    // Jalankan sekali di awal
    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 55%", "end 20%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full xl:ml-20 bg-cream dark:bg-neutral-950 font-sans md:px-10" ref={containerRef}>
      {/* Garis animasi */}
      <motion.div style={{ height: heightTransform }} className="absolute w-1  bg-navy dark:bg-black" />

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <motion.div key={index} className="flex justify-start pt-10 md:pt-24 md:gap-10" style={{ opacity: opacityTransform }}>
            <div className="sticky  flex flex-row z-40 top-40 self-start w-fit ml-2">
              <div className="h-10 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-accent dark:bg-neutral-800  dark:border-neutral-700 p-2" />
              </div>
              <h3 className="font-HWT block text-xl mt-[7px] md:pl-20 md:text-5xl font-bold text-navy/60 dark:text-neutral-500">{item.title}</h3>
            </div>
            <div className="w-full md:w-auto">{item.content}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
