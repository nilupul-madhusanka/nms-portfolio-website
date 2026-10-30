import Image from "next/image";
import Link from "next/link";
import HexagonalBackground from "./HexagonalBackground";
import HeroMotion from "./HeroMotion";
import { profile } from "../data/portfolio";

export default function HeroSection() {
  return (
    <HeroMotion>
      <div aria-hidden="true" className="hero-atmosphere pointer-events-none absolute inset-0">
        <div className="hero-grid absolute inset-0" />
        <div className="hero-aura hero-aura-violet hero-loop" />
        <div className="hero-aura hero-aura-cyan hero-loop" />
        <div className="hero-light-trail hero-loop" />
      </div>
      <HexagonalBackground />
      <div className="relative z-10 grid items-center gap-12 px-4 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="min-w-0 text-center lg:col-span-8 lg:text-left">
          <div className="hero-reveal hero-reveal-role mb-5 flex justify-center lg:justify-start">
            <p className="hero-role inline-flex max-w-full items-center gap-2 rounded-full border border-purple-400/20 bg-[#171322]/80 px-3 py-2 text-xs font-medium text-purple-200 sm:gap-3 sm:px-4 sm:text-sm">
              <span aria-hidden="true" className="hero-code-mark text-cyan-300">&lt;/&gt;</span>
              <span className="sr-only">{profile.role}. Desktop applications and AI automation.</span>
              <span aria-hidden="true" className="hero-role-stack grid text-left">
                <span className="hero-role-word hero-loop">Web &amp; Mobile Developer</span>
                <span className="hero-role-word hero-loop">Desktop App Builder</span>
                <span className="hero-role-word hero-loop">AI Automation Explorer</span>
              </span>
              <span aria-hidden="true" className="hero-role-cursor hero-loop" />
            </p>
          </div>
          <h1 id="hero-title" className="hero-reveal hero-reveal-heading mb-6 text-4xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
            <span className="hero-greeting hero-loop bg-clip-text text-transparent">Hello, I'm</span>
            <br /><span className="hero-name">Nilupul<span className="hero-name-dot text-purple-400">.</span></span>
          </h1>
          <p className="hero-reveal hero-reveal-description mx-auto mb-8 max-w-xl text-base leading-relaxed text-[#ADB7BE] sm:text-lg lg:mx-0">{profile.introduction}</p>
          <div className="hero-reveal hero-reveal-actions flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link href="#contact" className="hero-primary-action relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-600 to-secondary-700 px-6 py-3 font-medium text-white hover:from-primary-700 hover:to-secondary-800">Let's Connect<span aria-hidden="true" className="ml-2">↗</span></Link>
            <a href={profile.cv} download="Nilupul_Madhusanka_CV.pdf" className="hero-secondary-action inline-flex min-h-12 items-center justify-center rounded-full border border-purple-400/70 bg-[#121212]/50 px-6 py-3 font-medium text-white hover:bg-purple-950">Download CV</a>
          </div>
        </div>
        <div className="hero-reveal hero-reveal-portrait mx-auto pb-6 lg:col-span-4">
          <div className="hero-portrait hero-loop relative h-56 w-56 sm:h-64 sm:w-64 xl:h-80 xl:w-80">
            <div aria-hidden="true" className="hero-portrait-glow hero-loop absolute -inset-6 rounded-full" />
            <div aria-hidden="true" className="hero-portrait-ring hero-loop absolute inset-0 rounded-full" />
            <div aria-hidden="true" className="hero-portrait-ring-inner hero-loop absolute inset-2 rounded-full" />
            <div aria-hidden="true" className="hero-orbit hero-loop absolute -inset-2 rounded-full"><span /><span /></div>
            <div className="absolute inset-5 overflow-hidden rounded-full border border-white/15 bg-[#181818]">
              <Image src="/images/profile.jpg" alt={profile.name} fill sizes="(min-width: 1280px) 280px, (min-width: 640px) 216px, 184px" className="object-cover" priority />
            </div>
            <div aria-hidden="true" className="hero-portrait-caption absolute -bottom-2 left-1/2 whitespace-nowrap rounded-full border border-purple-300/25 bg-[#191421]/95 px-4 py-2 text-xs tracking-wide text-purple-100 shadow-lg">Web <span className="px-1 text-cyan-300">·</span> Mobile <span className="px-1 text-cyan-300">·</span> Beyond</div>
          </div>
        </div>
      </div>
    </HeroMotion>
  );
}
