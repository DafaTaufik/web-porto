import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { Link } from "react-router-dom";
import clsx from "clsx"; // Gunakan clsx untuk className yang dinamis

export const FloatingNav = ({ navItems, className }) => {
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={clsx(
         "flex max-w-[56%] fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-2xl dark:bg-black bg-white shadow-lg z-[5000] py-3 px-3 sm:px-5 md:px-7 lg:px-8 justify-between",
          className
          // "flex max-w-[46%] fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-2xl dark:bg-black bg-white shadow-lg z-[5000] pr-2 pl-8 py-3 items-center justify-center space-x-4",
          // className
        )}
      >
        <p className="font-HWT text-2xl sm:text-3xl lg:text-3xl">Dafa</p>
        <div className="flex space-x-2.5 md:space-x-6 xl:space-x-8">
        {navItems.map((navItem, idx) => (
          <Link
            key={idx}
            to={navItem.link}
            className="relative font-HWT items-center flex"
          >
            {/* Mobile: Hanya icon */}
            <span className="block sm:hidden dark:text-neutral-50 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 transition-colors duration-200">
              {navItem.icon}
            </span>
            
            {/* Tablet ke atas: Icon + Text */}
            <span className="hidden sm:flex items-center space-x-2 dark:text-neutral-50 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 transition-colors duration-200">
              <span className="hidden lg:block">{navItem.icon}</span>
              <span className="text-sm sm:text-base md:text-lg lg:text-xl">{navItem.name}</span>
            </span>
          </Link>
        ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
