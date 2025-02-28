import React from "react";
import ggImage from "../assets/Image/gg.jpg";

export function AboutMe() {
    return(
        <div className="bg-black w-screen h-[2000px] flex flex-col items-center ">
            <span className="font-HWT text-7xl text-white mt-28">About Me</span>
            <div className="w-screen flex flex-row justify-between px-16 mt-44">
                <div className="font-sans font-semibold text-lg text-white">Heloo my name is dafa taufik</div>
                <div className="w-fit">
                    <div className="w-96">
                        <img
                            src={ggImage}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;
