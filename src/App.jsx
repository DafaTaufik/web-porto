import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./components/sections/Home";
import AboutMe from "./components/sections/AboutMe";
import { Project } from "./components/ui/Project";
import { Experience } from "./components/sections/Experience";
import Certificate from "./components/sections/Certificate";
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
      <Project />
      <Experience />
      <Certificate />
      <Footer />
    </>
  );
}

export default App;
