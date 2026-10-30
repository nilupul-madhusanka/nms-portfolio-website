import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const coverColors = {
  violet: "from-violet-950 to-indigo-900 text-violet-200",
  emerald: "from-emerald-950 to-teal-900 text-emerald-200",
  orange: "from-orange-950 to-amber-900 text-orange-200",
  rose: "from-rose-950 to-fuchsia-900 text-rose-200",
};

export default function ProjectCard({ project }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[#33353F] bg-[#181818]">
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.image ? (
          <Image src={project.image} alt={`${project.title} project thumbnail`} fill sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
        ) : (
          <div aria-hidden="true" className={`flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br ${coverColors[project.color]}`}>
            <span className="text-6xl font-extrabold tracking-tighter">{project.cover}</span>
            <span className="text-xs font-medium uppercase tracking-[0.2em]">{project.category}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 text-left text-white">
        <h3 className="mb-3 text-xl font-semibold">{project.title}</h3>
        <p className="mb-5 text-sm leading-relaxed text-[#ADB7BE]">{project.description}</p>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {project.featured && <span className="rounded-full border border-white/20 bg-[#121212]/90 px-3 py-1 text-xs font-medium text-white">Recent work</span>}
          <ul aria-label="Technologies" className="flex flex-wrap gap-2">{project.technologies.map((tech) => <li key={tech} className="rounded-md bg-[#252530] px-2 py-1 text-xs text-purple-200">{tech}</li>)}</ul>
        </div>
        <div className="mt-auto flex flex-wrap gap-2 border-t border-[#33353F] pt-4">
          {project.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${project.title}: ${link.label} (opens in new tab)`} className="inline-flex min-h-11 items-center gap-1 rounded-lg border border-[#4b4b58] px-3 py-2 text-sm text-white hover:border-purple-400 hover:bg-purple-950">{link.label}<ArrowUpRightIcon aria-hidden="true" className="h-4 w-4" /></a>)}
          {project.availability && <p className="py-3 text-sm text-[#ADB7BE]">{project.availability}</p>}
        </div>
      </div>
    </article>
  );
}
