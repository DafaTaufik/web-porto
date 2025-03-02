import React from "react";
import Lanyard from "./ui/Lanyard";

export function Home() {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 z-10">
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="h-full flex flex-col px-10 justify-center">
          <h1 className="text-black text-4xl font-HWT">hi, im</h1>
          <h1 className="text-black text-8xl font-HWT mt-1">Dafa Taufik</h1>
          <h1 className="mb-7 text-black text-7xl font-HWT">Al Latief</h1>
          <h3 className="text-md font-sans font-medium max-w-[420px]">A 6th-semester Informatics student who's diving into the world of web and mobile development.</h3>
        </div>
      </div>
    </div>
  );
}

export default Home;


  
