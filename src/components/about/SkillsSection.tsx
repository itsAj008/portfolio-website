import { skills } from "@/data";
import { useState } from "react";

export const SkillsSection = () => {
  const [showSkill, setShowSkill] = useState("");

  return (
    <section className="py-12 flex flex-col gap-10">
      <h3 className="subhead-text">My Skills</h3>

      <article className="flex flex-wrap gap-10">
        {skills.map((skill) => (
          <div
            className="block-container w-20 h-20 relative"
            key={skill.name}
            onMouseEnter={() => setShowSkill(skill.name)}
            onMouseLeave={() => setShowSkill("")}
          >
            <span className="btn-back rounded-xl" />
            <div className="btn-front rounded-xl flex justify-center items-center relative overflow-hidden">
              {/* Icon with smooth scale down */}
              <img
                src={skill.imageUrl}
                alt={skill.name}
                className={`w-1/2 h-1/2 object-contain transition-transform duration-300 ${
                  showSkill === skill.name ? "scale-75 opacity-50" : "scale-100"
                }`}
              />

              {/* Text sliding in from left */}
              <span
                className={`absolute text-sm font-medium transition-all duration-300 ${
                  showSkill === skill.name
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
              >
                {skill.name}
              </span>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
};
