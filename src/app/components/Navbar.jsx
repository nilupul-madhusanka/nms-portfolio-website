"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import NavLink from "./NavLink";
import MenuOverlay from "./MenuOverlay";

const navLinks = [
  { title: "About", path: "#about" },
  { title: "Skills", path: "#skills" },
  { title: "Projects", path: "#projects" },
  { title: "Contact", path: "#contact" },
];

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const toggleRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    if (!navbarOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setNavbarOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) setNavbarOpen(false);
    };
    const wideScreen = window.matchMedia("(min-width: 768px)");
    const onResize = () => { if (wideScreen.matches) setNavbarOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    wideScreen.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      wideScreen.removeEventListener("change", onResize);
    };
  }, [navbarOpen]);

  const closeAndNavigate = (path) => {
    setNavbarOpen(false);
    // Move keyboard focus into the destination before hiding the mobile links.
    document.querySelector(path)?.focus({ preventScroll: true });
  };

  return (
    <nav ref={navRef} aria-label="Main navigation" className="fixed inset-x-0 top-0 z-50 border-b border-[#33353F] bg-[#121212]/95 backdrop-blur">
      <div className="container mx-auto flex min-h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-12">
        <Link href="#home" onClick={() => closeAndNavigate("#home")} aria-label="NMS.Dev home" className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl">NMS.Dev</Link>
        <button ref={toggleRef} type="button" aria-label={navbarOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={navbarOpen} aria-controls="mobile-navigation" onClick={() => setNavbarOpen((open) => !open)} className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-500 text-slate-200 md:hidden">
          {navbarOpen ? <XMarkIcon aria-hidden="true" className="h-6 w-6" /> : <Bars3Icon aria-hidden="true" className="h-6 w-6" />}
        </button>
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => <li key={link.path}><NavLink href={link.path} title={link.title} /></li>)}
        </ul>
      </div>
      <MenuOverlay links={navLinks} open={navbarOpen} onNavigate={closeAndNavigate} />
    </nav>
  );
}
