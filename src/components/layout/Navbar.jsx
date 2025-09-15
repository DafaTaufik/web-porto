import React from "react";
import { FloatingNav } from "../ui/FloatingNav"; 
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { BrowserRouter as Router } from "react-router-dom"; 

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 md:h-5 md:w-5" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 md:h-5 md:w-5" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: (
        <IconMessage className="h-4 w-4 md:h-5 md:w-5" />
      ),
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
