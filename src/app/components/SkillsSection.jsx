import SkillCard from "./SkillCard";
import { skills } from "../data/portfolio";

export default function SkillsSection() {
  return (
    <section id="skills" tabIndex={-1} className="py-12 sm:py-16" aria-labelledby="skills-title">
      <h2 id="skills-title" className="mb-8 text-center text-3xl font-bold text-white sm:text-4xl">My Skills</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{skills.map((skill) => <li key={skill.name}><SkillCard {...skill} /></li>)}</ul>
    </section>
  );
}
