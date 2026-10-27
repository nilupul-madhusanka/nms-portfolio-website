"use client";
import { useContext, useEffect, useRef } from "react";
import { HeroMotionContext } from "./HeroMotion";

export default function ParticlesBackground() {
  const canvasRef = useRef(null);
  const motionEnabled = useContext(HeroMotionContext);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    if (!motionEnabled) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      restart();
    });
    let frame;
    let particles = [];
    let width = 0;
    let height = 0;
    let inView = true;
    let previousTime = 0;
    const palette = ["103,232,249", "192,132,252", "226,232,240"];

    const draw = (time) => {
      const delta = previousTime ? Math.min((time - previousTime) / 16.67, 2) : 1;
      previousTime = time;
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        particle.x = (particle.x + particle.vx * delta + width) % width;
        particle.y = (particle.y + particle.vy * delta + height) % height;
        context.fillStyle = `rgba(${particle.color},${particle.opacity})`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
      // A small, capped constellation keeps the background visible without
      // making mobile work grow with the full screen resolution.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const distance = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (distance >= 115) continue;
          context.strokeStyle = `rgba(167,139,250,${(1 - distance / 115) * 0.18})`;
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(particles[i].x, particles[i].y);
          context.lineTo(particles[j].x, particles[j].y);
          context.stroke();
        }
      }
      frame = requestAnimationFrame(draw);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      previousTime = 0;
      context.clearRect(0, 0, width, height);
      if (!document.hidden && inView && width && height) {
        frame = requestAnimationFrame(draw);
      }
    };
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: Math.min(width < 640 ? 28 : 48, Math.floor(width * height / 10000)) }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.8, opacity: Math.random() * 0.4 + 0.25,
        color: palette[Math.floor(Math.random() * palette.length)],
        vx: Math.random() * 0.4 - 0.2, vy: Math.random() * 0.4 - 0.2,
      }));
      restart();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    visibility.observe(canvas);
    document.addEventListener("visibilitychange", restart);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", restart);
    };
  }, [motionEnabled]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
