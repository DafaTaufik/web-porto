import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import {Navbar} from "./components/Navbar";
import {Home} from "./components/Home";
import AboutMe from "./components/AboutMe";
import {Project} from "./components/Project";
import {Experience} from "./components/Experience";
import Certificate from "./components/Certificate";

function App() {
  useEffect(()=>{
    function easeOutCubic(x) {
      return 1 - Math.pow(1 - x, 3);
    }

    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      easing: easeOutCubic,
    });
    function raf(time){
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
      <Navbar/>
      <Home/>
      <AboutMe />
      <Project/>
      <Experience/>
      <Certificate/>
    </>
  )
}

export default App
