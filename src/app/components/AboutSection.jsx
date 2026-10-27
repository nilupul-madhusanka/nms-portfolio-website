"use client";
import { useState } from "react";
import Image from "next/image";
import { aboutTabs, profile } from "../data/portfolio";

export default function AboutSection() {
  const [tab, setTab] = useState(aboutTabs[0].id);
  const activeTab = aboutTabs.find((item) => item.id === tab);
  return (
    <section className="py-12 text-white sm:py-16" id="about" tabIndex={-1} aria-labelledby="about-title">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <Image src="/images/about-image.png" width={500} height={500} sizes="(min-width: 1024px) 45vw, 90vw" className="mx-auto h-auto w-full max-w-md rounded-xl" alt="About Nilupul Madhusanka" />
        <div className="min-w-0">
          <h2 id="about-title" className="mb-6 text-3xl font-bold sm:text-4xl">About Me</h2>
          {profile.bio.map((paragraph) => <p key={paragraph} className="mb-4 leading-relaxed text-[#ADB7BE]">{paragraph}</p>)}
          <div className="mt-6 flex flex-wrap gap-2" aria-label="About categories">
            {aboutTabs.map((item) => (
              <button key={item.id} type="button" aria-pressed={tab === item.id} aria-controls="about-details" onClick={() => setTab(item.id)} className={`min-h-11 rounded-lg border px-3 py-2 text-sm font-semibold ${tab === item.id ? "border-purple-400 bg-purple-950 text-white" : "border-[#33353F] text-[#ADB7BE] hover:text-white"}`}>{item.title}</button>
            ))}
          </div>
          <div id="about-details" className="mt-5" aria-live="polite">
            <ul className="list-disc space-y-2 pl-5 text-[#ADB7BE]">{activeTab.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
