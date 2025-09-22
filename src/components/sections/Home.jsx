import React from "react";
import Lanyard from "../ui/Lanyard";
import Particles from "../ui/Particles";
import ic_map from "../../assets/Icon/ic_maps.svg";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

export function Home() {
  return (
    <section id="home" className="relative w-full h-screen">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles particleColors={["#333333", "#666666", "#999999"]} particleCount={550} particleBaseSize={105} particleSpread={12} speed={0.03} moveParticlesOnHover={true} />
      </div>

      {/* Lanyard 3D */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>

      {/* Content Text */}
      <div className="absolute inset-0 z-20 px-3 md:px-24 pointer-events-none">
        <div className="h-full flex flex-col justify-center">
          <h1 className="text-black text-3xl md:text-4xl font-HWT">hi, im</h1>
          <h1 className="text-black text-7xl w-32 md:w-full md:text-8xl font-HWT mt-1">Dafa Taufik</h1>
          <h1 className="text-black text-6xl md:text-7xl font-HWT">Al Latief</h1>
          <h2 className="mt-5 mb-5 text-lg md:text-3xl text-black font-HWT">Android & Backend Developer</h2>

          <div className="flex items-center gap-2 mb-4">
            <img src={ic_map} alt="Map Icon" className="w-5 h-5" />
            <span className="text-gray-500 text-base md:text-sm font-medium font-sans">Tangerang, Indonesia</span>
          </div>
          <h3 className="text-sm md:text-md font-sans text-gray-700 font-medium w-[300px] md:w-[420px]">
            Mobile & Backend Developer skilled in Kotlin, Java, and Golang. Informatics student at Universitas Multimedia Nusantara with passion for creating efficient and scalable solutions.
          </h3>

          {/* Buttons - Enable pointer events only for buttons */}
          <div className="mt-5 flex gap-4 pointer-events-auto">
            <button className="px-4 py-2 bg-black text-white text-sm font-semibold cursor-pointer rounded-md shadow-md hover:bg-gray-800 transition duration-200" onClick={() => console.log("Projects clicked!")}>
              Projects
            </button>

            <button className="px-4 py-2 bg-white text-black border border-black cursor-pointer text-sm font-semibold rounded-md shadow-md hover:bg-gray-100 transition duration-200" onClick={() => console.log("Contact clicked!")}>
              Contact Me
            </button>
          </div>
          <div className="mt-8 flex gap-4 items-center pointer-events-auto">
            <a href="https://www.linkedin.com/in/dafa-taufik-al-latief" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-600 transition duration-400 transform hover:-translate-y-1 cursor-pointer">
              <FaLinkedin size={30} />
            </a>
            <a href="https://github.com/DafaTaufik" target="_blank" rel="noopener noreferrer" className="text-black hover:text-white transition duration-400 transform hover:-translate-y-1 cursor-pointer">
              <FaGithubSquare size={30} className="bg-white hover:bg-black rounded" />
            </a>

            <a href="mailto:dafataufik99@gmail.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-red-600 transition duration-400 transform hover:-translate-y-1 cursor-pointer">
              <MdOutlineMarkEmailUnread size={31} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
