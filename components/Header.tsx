"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/music", label: "Music" },
    { href: "/about/behind-the-name", label: "Behind the Name" },
    { href: "/about", label: "About" },
];

export default function Header() {
    const [visible, setVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 80);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${visible ? "bg-black/60 backdrop-blur-md shadow-lg" : "bg-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 gap-8">
                {/* Brand (kept empty label since you're using logo elsewhere) */}
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="uppercase tracking-[0.3em] text-sm font-semibold text-white/90 hover:text-[#FFD700] transition"
                    aria-label="Home"
                />

                {/* Desktop navigation */}
                <nav
                    className={`hidden md:flex gap-10 lg:gap-12 xl:gap-16 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-75"
                        }`}
                    aria-label="Main"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="px-3 py-2 uppercase tracking-wide text-sm text-white/90 hover:text-[#FFD700] focus:text-[#FFD700] transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex flex-col gap-1.5 transition-all duration-300 group"
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                >
                    <span
                        className={`w-7 h-0.5 bg-hydra-ice transition-all duration-300 group-hover:bg-hydra-gold ${menuOpen ? "rotate-45 translate-y-2" : ""
                            }`}
                    />
                    <span
                        className={`w-7 h-0.5 bg-hydra-ice transition-all duration-300 group-hover:bg-hydra-gold ${menuOpen ? "opacity-0" : ""
                            }`}
                    />
                    <span
                        className={`w-7 h-0.5 bg-hydra-ice transition-all duration-300 group-hover:bg-hydra-gold ${menuOpen ? "-rotate-45 -translate-y-2" : ""
                            }`}
                    />
                </button>
            </div>

            {/* Mobile menu panel */}
            {menuOpen && (
                <div
                    id="mobile-menu"
                    className="md:hidden bg-black/80 backdrop-blur-md border-t border-white/10"
                >
                    <nav className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-5" aria-label="Mobile">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMenu}
                                className="px-1.5 py-2 uppercase tracking-wide text-sm text-white/85 hover:text-[#FFD700] transition"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
