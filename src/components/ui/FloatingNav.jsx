import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import clsx from "clsx";

export const FloatingNav = ({ navItems, className }) => {
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef(null);

  // Animasi masuk navbar (wrapper terpisah dari motion.div yang mengurus hide/show saat scroll)
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(el, { y: -26, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out" });
    return () => tween.kill();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleActiveSection = () => {
      const sections = navItems
        .map((item) => ({
          id: item.link.replace("#", ""),
          element: document.getElementById(item.link.replace("#", "")),
        }))
        .filter((section) => section.element);

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleActiveSection);
    handleActiveSection();

    return () => window.removeEventListener("scroll", handleActiveSection);
  }, [navItems]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    const id = link.replace("#", "");
    // Home dan About selalu ada; section lain dimuat belakangan (lazy) dan baru aman digulir setelah ditandai ready
    const alwaysThere = id === "home" || id === "about";
    const canScroll = () => (alwaysThere || document.documentElement.dataset.belowFold === "ready") && document.getElementById(id);
    const scrollToTarget = () => {
      const targetElement = canScroll();
      if (targetElement) targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      return !!targetElement;
    };
    if (scrollToTarget()) return;
    let tries = 0;
    const wait = setInterval(() => {
      if (scrollToTarget() || ++tries >= 60) clearInterval(wait);
    }, 100);
  };

  return (
    <motion.header
      initial={{ opacity: 1, y: -100 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed top-7 inset-x-0 flex justify-center px-6 z-[5000] pointer-events-none"
    >
      <nav
        ref={navRef}
        aria-label="Primary"
        className={clsx("pointer-events-auto flex w-full max-w-[1210px] items-center justify-between gap-x-4 gap-y-2 whitespace-nowrap rounded-full bg-white py-2.5 pr-3.5 pl-5 sm:pl-7 shadow-[0_6px_30px_rgba(0,0,0,0.08)]", className)}
      >
        <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="hidden min-[561px]:block font-HWT text-[32px] leading-none uppercase text-[#1D1D1D]">
          Dafa
        </a>
        <div className="flex items-center gap-0.5 font-HWT text-[19px] uppercase text-[#4B5563] max-[560px]:mx-auto">
          {navItems.map((navItem) => {
            const sectionId = navItem.link.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <a
                key={sectionId}
                href={navItem.link}
                aria-current={isActive ? "page" : undefined}
                aria-label={navItem.name}
                onClick={(e) => handleNavClick(e, navItem.link)}
                className={clsx(
                  "flex items-center gap-2 rounded-full transition-colors duration-300 py-[11px] px-3.5 min-[1240px]:px-4 focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-[#1D1D1D]",
                  isActive ? "bg-[#1D1D1D] text-white min-[1240px]:px-5" : "hover:bg-[#F3F4F6] hover:text-[#1D1D1D]",
                )}
              >
                {navItem.icon}
                <span className="hidden min-[1240px]:inline">{navItem.name}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </motion.header>
  );
};
