import React from "react";
import { FloatingNav } from "../ui/FloatingNav";

// Ikon stroke inline (disalin dari doc/home_navbar/Home.navbar-intro.reference.html)
const Icon = ({ children }) => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "#home",
      icon: (
        <Icon>
          <path d="M3 11l9-8 9 8" />
          <path d="M5 10v10h5v-6h4v6h5V10" />
        </Icon>
      ),
    },
    {
      name: "About",
      link: "#about",
      icon: (
        <Icon>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
        </Icon>
      ),
    },
    {
      name: "Experience",
      link: "#experience",
      icon: (
        <Icon>
          <rect x="4" y="3" width="11" height="18" rx="1.5" />
          <path d="M15 9h5v12h-5M8 7h3M8 11h3M8 15h3" />
        </Icon>
      ),
    },
    {
      name: "Projects",
      link: "#projects",
      icon: (
        <Icon>
          <rect x="3" y="7" width="18" height="13" rx="2.5" />
          <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" />
        </Icon>
      ),
    },
    {
      name: "Organizational",
      link: "#organizational",
      icon: (
        <Icon>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2 20c0-3.6 3-6 7-6s7 2.4 7 6" />
          <path d="M16 4.6a3.5 3.5 0 010 6.8M18 14.3c2.3.7 4 2.5 4 5.7" />
        </Icon>
      ),
    },
    {
      name: "Skills",
      link: "#skills",
      icon: (
        <Icon>
          <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
        </Icon>
      ),
    },
    {
      name: "Courses",
      link: "#courses",
      icon: (
        <Icon>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M7 9h10M7 13h5" />
          <circle cx="16" cy="18" r="2.5" />
          <path d="M14.8 20.2L14 23l2-1 2 1-.8-2.8" />
        </Icon>
      ),
    },
  ];

  return <FloatingNav navItems={navItems} />;
}
