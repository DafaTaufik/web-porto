import React from "react";
import { FloatingNav } from "../ui/FloatingNav"; 
import { IconBriefcase, IconBuilding, IconBuildings, IconCertificate, IconCode, IconHome, IconMail, IconMessage, IconUser } from "@tabler/icons-react";
import { BrowserRouter as Router } from "react-router-dom"; 

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "#home",
      icon: <IconHome className="h-4 w-4 md:h-5 md:w-5" />,
    },
    {
      name: "About",
      link: "#about",
      icon: <IconUser className="h-4 w-4 md:h-5 md:w-5" />,
    },
    {
      name: "Experience",
      link: "#experience",
      icon: <IconBuildings className="h-4 w-4 md:h-5 md:w-5" />,
    },
    {
      name: "Projects",
      link: "#projects",
      icon: <IconBriefcase className="h-4 w-4 md:h-5 md:w-5" />,
    },
    {
      name: "Skills",
      link: "#skills",
      icon: <IconCode className="h-4 w-4 md:h-5 md:w-5" />,
    },
    {
      name: "Certificate",
      link: "#certificate",
      icon: <IconCertificate className="h-4 w-4 md:h-5 md:w-5" />,
    },
  ];

  return (
    <Router>
      <div className="relative w-full">
        <FloatingNav navItems={navItems} />
      </div>
    </Router>
  );
}

``
