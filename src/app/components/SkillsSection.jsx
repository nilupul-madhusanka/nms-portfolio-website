"use client";
import React, { useRef } from "react";
import SkillCard from "./SkillCard";
import { motion, useInView } from "framer-motion";

const skillsData = [
  {
    id: 1,
    name: "React",
    level: "Advanced",
    iconUrl: "/images/skills/react-svgrepo-com.svg",
  },
  {
    id: 2,
    name: "Flutter",
    level: "Advanced",
    iconUrl: "/images/skills/flutter-svgrepo-com.svg",
  },
  {
    id: 3,
    name: "Tailwind CSS",
    level: "Intermediate",
    iconUrl: "/images/skills/tailwindcss-svgrepo-com.svg",
  },
  {
    id: 4,
    name: "Node.js",
    level: "Intermediate",
    iconUrl: "/images/skills/node-js-svgrepo-com.svg",
  },
  {
    id: 5,
    name: "MySQL",
    level: "Intermediate",
    iconUrl: "/images/skills/mysql-logo-svgrepo-com.svg",
  },
  {
    id: 6,
    name: "Git",
    level: "Intermediate",
    iconUrl: "/images/skills/github-color-svgrepo-com.svg",
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
      <section id="skills" className="mt-20">
        <h2 className="text-center text-4xl font-bold text-white mb-8 md:mb-12">
          My Skills
        </h2>
        <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
          {skillsData.map((skill, index) => (
              <motion.li
                  key={index}
                  variants={cardVariants}
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                  transition={{ duration: 0.3, delay: index * 0.3 }}
              >
                <SkillCard
                    name={skill.name}
                    level={skill.level}
                    iconUrl={skill.iconUrl}
                />
              </motion.li>
          ))}
        </ul>
      </section>
  );
};

export default SkillsSection;
