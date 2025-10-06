import React, { useState, useEffect, useRef } from "react";
import { skillsData } from "../../data/SkillsData";

const SkillBar = ({ name, percentage, icon: Icon, color: Color, isVisible }) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = percentage / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= percentage) {
        setCurrentPercentage(percentage);
        clearInterval(timer);
      } else {
        setCurrentPercentage(Math.floor(current));
      }
    }, stepDuration);

    setTimeout(() => setWidth(percentage), 100);

    return () => clearInterval(timer);
  }, [isVisible, percentage]);

  return (
    <div className="w-full bg-white shadow-2xl rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={32} color={Color} />}
          <span className="font-HWT text-lg">{name}</span>
        </div>
        <span className="font-HWT text-lg">{currentPercentage}%</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-black transition-all duration-2000 ease-out rounded-full" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
};

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="w-full min-h-screen flex flex-col justify-center items-center py-8 px-24 bg-white">
      <h2 className="font-HWT text-6xl mb-24">Skills</h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
        {skillsData.map((skill, index) => (
          <SkillBar key={index} name={skill.name} percentage={skill.percentage} icon={skill.icon} color={skill.color} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
}
