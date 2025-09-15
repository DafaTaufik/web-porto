import React from "react";
import ic_email from "../../assets/Icon/emails.png";
import ic_instagram from "../../assets/Icon/instagram.png";
import ic_linkedin from "../../assets/Icon/linkedin.png";
import ic_github from "../../assets/Icon/github.png";

export default function Footer(){
    return(
        <div className="bg-black mt-20 w-full h-[300px] flex justify-center">
            <div className="w-7xl text-white  h-full py-12 flex flex-col">
                <p className="font-HWT text-5xl">Contact</p>
                <p className="font-Inter">Currently i </p>
                <p>Kunciran, Kota Tangerang, Banten, 15144</p>
                <div className="flex flex-row gap-2 mt-2">
                    <img src={ic_email} alt="Email Icon" className="w-6 h-6" />
                    <a href="mailto:dafataufik99@gmail.com">dafataufik99@gmail.com</a>
                </div>
                <div className="flex flex-row -ml-2 py-2 gap-1">
                    <a href="https://www.instagram.com/dafataufk/">
                        <img src={ic_instagram} alt="ic_instagram" className="w-10 h-10 hover:transform hover:-translate-y-1 transition-transform duration-500" />
                    </a>
                    <a href="https://www.linkedin.com/in/dafa-taufik-al-latief/">
                        <img src={ic_linkedin} alt="ic_linkedin" className="w-10 h-10 hover:transform hover:-translate-y-1 transition-transform duration-500" />
                    </a>
                    <a href="https://github.com/DafaTaufik">
                        <img src={ic_github } alt="ic_github" className="w-7 h-7 mt-[5px] ml-[3px] hover:transform hover:-translate-y-1 transition-transform duration-500" />
                    </a>
                </div>
            </div>

        </div>
    );
}