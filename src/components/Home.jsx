import React from "react";
import Lanyard from "./Lanyard";

export function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 z-10">
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="h-full flex flex-col pl-10 justify-center">
          <h1 className="text-black text-4xl font-bold">hi, iam</h1>
          <h1 className="text-black text-4xl font-bold">Dafa Taufik</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;


// onCreated={({ gl }) => {
//   gl.setClearColor('#ffffff', 1); // Set white background
// }}