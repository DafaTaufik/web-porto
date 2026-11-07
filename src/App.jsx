import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./components/sections/Home";
import AboutMe from "./components/sections/AboutMe";
import Projects from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import Organizational from "./components/sections/Organizational";
import Skills from "./components/sections/Skills";
import Courses from "./components/sections/Courses";
import Footer from "./components/layout/Footer";

function App() {
  useEffect(() => {
    function easeOutCubic(x) {
      return 1 - Math.pow(1 - x, 3);
    }

    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      easing: easeOutCubic,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Home />
      <AboutMe />
      <Experience />
      <Projects />
      <Organizational />
      <Skills />
      <Courses />
      <Footer />
    </>
  );
}

export default App;
