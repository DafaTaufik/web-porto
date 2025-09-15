import React from "react";
import CardCertif from "../ui/CardCertif";

export default function Certificate(){
    return(
        <div className="w-full h-full flex flex-col justify-center items-center mt-30 overflow-hidden">
            <span className="font-HWT text-4xl items-center">Certificate</span>
            <div className="mt-5 w-full grid grid-cols-3 place-items-center px-9 gap-y-5">
                <CardCertif />
                <CardCertif />
                <CardCertif />
                <CardCertif />
                <CardCertif />
            </div>

        </div>
    );
}