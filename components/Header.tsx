"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const navLinks = [
  { href: "#top", label: "Top" },
  { href: "#music", label: "Music" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [visible, setVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);


    onScroll(); // ✅ set initial state on mount
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        visible ? "bg-black/60 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-end px-4 py-3">
        <nav
          className={`flex gap-6 transition-opacity duration-300 ${
            visible ? "opacity-100" : "opacity-75"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="uppercase tracking-wide text-sm transition-colors hover:text-[#FFD700] focus:text-[#FFD700]"
            >
              {link.label}
            </a>
          ))}
              </nav>
              {/* MOBILE HAMBURGER */}
              <button onClick={() => setMenuOpen(!menuOpen)}
                  className="
            md:hidden flex flex-col gap-1.5
            transition-all duration-300
            group
          "
                  aria-label="Toggle menu"
              >
                  <span className={` w-7 h-0.5 bg-hydra-ice transition-all duration-300 group-hover:bg-hydra-gold ${menuOpen ? "rotate-45 translate-y-2" : ""} `} />
                  <span className={` w-7 h-0.5 bg-hydra-ice transition-all duration-300 group-hover:bg-hydra-gold ${menuOpen ? "opacity-0" : ""} `} />
                  <span className={` w-7 h-0.5 bg-hydra-ice transition-all duration-300 group-hover:bg-hydra-gold ${menuOpen ? "-rotate-45 -translate-y-2" : ""} `} />
              </button>
      </div>
    </header>
  );
}