import React from "react";
import Logo from "../../assets/Image/CiakhamikLogo.png";

export default function Card() {
  return (
    <div className="w-[973] h-[407] bg-black border-2 flex rounded-2xl text-white ">
        <div className="p-7 grid grid-cols-2 gap-6">
        <div className="w-fit h-fit">
            <img src={Logo} className="w-[450px] h-[350px] rounded-2xl" alt="Logo" />
        </div>
        <div className="flex flex-col w-[447px] gap-5 mt-5">
            <div className="font-HWT text-5xl">CiakHamik APPS</div>
            <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the </div>
            <div className="flex flex-row gap-2">
                <div className="bg-red-400 rounded-lg p-1">Firebase</div>
                <div className="bg-green-400 rounded-lg p-1">Android Studio</div>
                <div className="bg-purple-400 rounded-lg p-1">Kotlin</div>
            </div>
        </div>
    </div>
    </div>
  );
}
