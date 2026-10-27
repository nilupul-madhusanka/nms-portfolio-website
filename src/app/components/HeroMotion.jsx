"use client";
import { createContext, useEffect, useRef, useState, useSyncExternalStore } from "react";

export const HeroMotionContext = createContext(false);

function subscribeToMotion(callback) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// CSS owns the animation; this boundary pauses it outside the visible page.
export default function HeroMotion({ children }) {
  const sectionRef = useRef(null);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, prefersReducedMotion, () => true);
  const [motionChoice, setMotionChoice] = useState(null);
  const shouldAnimate = motionChoice ?? !reducedMotion;

  useEffect(() => {
    const section = sectionRef.current;
    let inView = true;
    const syncMotion = () => {
      section.dataset.motion = inView && !document.hidden && shouldAnimate ? "running" : "paused";
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncMotion();
    });
    observer.observe(section);
    document.addEventListener("visibilitychange", syncMotion);
    syncMotion();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncMotion);
    };
  }, [shouldAnimate]);

  return (
    <HeroMotionContext.Provider value={shouldAnimate}>
      <section ref={sectionRef} aria-labelledby="hero-title" data-motion="running" data-motion-preference={motionChoice === null ? "system" : shouldAnimate ? "full" : "reduced"} className="hero relative isolate overflow-hidden py-10 sm:py-16 lg:py-24">
        {children}
        <div className="relative z-10 mt-8 flex justify-center lg:justify-start">
          <button type="button" aria-label={shouldAnimate ? "Pause hero animations" : "Play hero animations"} aria-pressed={shouldAnimate} onClick={() => setMotionChoice(!shouldAnimate)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-[#121212]/60 px-3 py-2 text-xs text-[#ADB7BE] hover:border-purple-400/50 hover:text-white">
            <span aria-hidden="true">{shouldAnimate ? "Ⅱ" : "▷"}</span>
            {shouldAnimate ? "Pause motion" : "Play motion"}
          </button>
        </div>
      </section>
    </HeroMotionContext.Provider>
  );
}
