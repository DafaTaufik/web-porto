import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import clsx from "clsx"; // Gunakan clsx untuk className yang dinamis

export const FloatingNav = ({ navItems, className }) => {
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [activeSection, setActiveSection] = useState("home");

  // Gunakan useEffect untuk mendeteksi scroll (karena useScroll Framer Motion lebih optimal di Next.js)
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

  const handleNavClick = (link) => {
    const targetId = link.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={clsx(
          "flex max-w-[90%] sm:max-w-[60%] fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-2xl dark:bg-black bg-white shadow-lg z-[5000] py-2 px-2 sm:py-3 sm:px-4 md:px-6 justify-between",
          className
          // "flex max-w-[46%] fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-2xl dark:bg-black bg-white shadow-lg z-[5000] pr-2 pl-8 py-3 items-center justify-center space-x-4",
          // className
        )}
      >
        <p className="font-HWT text-2xl sm:text-3xl lg:text-3xl dark:text-white">Dafa</p>
        <div className=" flex space-x-1 md:space-x-3 xl:space-x-4">
          {navItems.map((navItem, idx) => {
            const sectionId = navItem.link.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <button key={idx} onClick={() => handleNavClick(navItem.link)} className="relative font-HWT items-center flex transition-all duration-100 rounded-full px-3 py-1.5 cursor-pointer">
                {isActive && (
                  <motion.span
                    layoutId="navHighlight"
                    className="absolute inset-0 rounded-full bg-black dark:bg-white shadow-md"
                    transition={{
                      type: "spring",
                      stiffness: 550, // makin besar makin cepat
                      damping: 45, // makin kecil makin "lemes"
                      mass: 0.6, // makin besar makin berat (makin lambat)
                    }}
                  />
                )}

                {/* Mobile: Icon only */}
                <span
                  className={clsx(
                    "block sm:hidden relative z-10", // z-10 supaya text di atas bg
                    isActive ? "text-white dark:text-black" : "dark:text-neutral-50 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                  )}
                >
                  {navItem.icon}
                </span>

                {/* Tablet ke atas: Icon + Text */}
                <span className={clsx("hidden sm:flex items-center space-x-2 relative z-10", isActive ? "text-white dark:text-black" : "dark:text-neutral-50 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500")}>
                  <span className="hidden lg:block">{navItem.icon}</span>
                  <span className="text-sm sm:text-base md:text-lg">{navItem.name}</span>
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
