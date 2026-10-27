"use client";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { filterProjects, projectCategories } from "../data/portfolio";

export default function ProjectsSection() {
  const [category, setCategory] = useState("All");
  const visibleProjects = filterProjects(category);
  return (
    <section id="projects" tabIndex={-1} className="py-12 sm:py-16" aria-labelledby="projects-title">
      <h2 id="projects-title" className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl">My Projects</h2>
      <p className="mx-auto max-w-2xl text-center leading-relaxed text-[#ADB7BE]">Recent work in web, mobile, desktop, and AI automation, alongside the projects I’ve learned from.</p>
      <div className="flex flex-wrap items-center justify-center gap-2 py-6" aria-label="Filter projects">
        {projectCategories.map((name) => <ProjectTag key={name} name={name} onClick={setCategory} isSelected={category === name} />)}
      </div>
      <p role="status" className="mb-6 text-center text-sm text-[#ADB7BE]">{visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"} · {category}</p>
      <ul className="grid auto-rows-fr gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project) => <li key={project.id} className="min-w-0"><ProjectCard project={project} /></li>)}
      </ul>
    </section>
  );
}
