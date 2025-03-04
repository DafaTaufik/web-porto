import { div } from "framer-motion/client";
import React from "react";
import dicoding from "../../assets/Image/Dart.png";

export default function CardCertif() {

    return(
    <div className="flex flex-col text-white bg-black rounded-2xl w-[450px] h-[400px]">
        <div className="p-4">
            <img src={dicoding} alt="hero template" className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full"/>
        </div>
        <div className="flex flex-col ml-5">
            <span className="font-Inter font-medium text-2xl">Belajar dasar dart</span>
            <hr className="border-t-3 w-2/4 rounded-2xl my-2" />
            <span className="font-Inter text-xl">Dicoding</span>
            <span className="font-Inter text-sm mt-1">1 Dec 2024</span>
        </div>

    </div>
);
}