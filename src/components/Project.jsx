import { div } from "framer-motion/client";
import React from "react";
import Card from "./ui/Card";

export function Project() {
    return(
        <div className="w-full h-full bg-white flex flex-col items-center mt-20 mb-20">
            <span className="font-HWT text-6xl">Project</span>
            <div className="mt-20 grid grid-cols-1  gap-12 overflow-hidden">
                <Card/>
                <Card/>
            </div>
        </div>
    );
}
export default Project;