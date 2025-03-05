import React from "react";
import Lanyard from "./ui/Lanyard";
import Particles from "./ui/Particles";

export function Home() {
  return (
    <div className="relative w-full h-screen">
       <div className="absolute inset-0 z-0">
       <Particles
        particleColors={['#333333', '#666666', '#999999']}
        particleCount={450}
        particleBaseSize={100}
        particleSpread={12}
        speed={0.03}
        moveParticlesOnHover={true}
      />
      </div>
      <div className="absolute inset-0 z-10">
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none px-3 md:px-10">
        <div className="h-full flex flex-col justify-center">
          <h1 className="text-black text-3xl md:text-4xl font-HWT">hi, im</h1>
          <h1 className="text-black text-7xl w-32 md:w-full md:text-8xl font-HWT mt-1">Dafa Taufik</h1>
          <h1 className="mb-7 text-black text-6xl md:text-7xl font-HWT">Al Latief</h1>
          <h3 className="text-sm md:text-md font-sans font-medium w-[300px] md:w-[420px]">A 6th-semester Informatics student who's diving into the world of web and mobile development.</h3>
        </div>
      </div>
    </div>
  );
}

export default Home;


  
