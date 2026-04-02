"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

type NavChild = { name: string; href: string };
type NavItem =
    | { name: string; href: string; children?: undefined }
    | { name: string; href?: undefined; children: NavChild[] };

const navLinks: NavItem[] = [
    { name: "Home",               href: "/" },
    { name: "Music",              href: "/music" },
    {
        name: "Merch",
        children: [
            { name: "Sheet Music",    href: "/sheet-music" },
            { name: "Wearables",      href: "/merch/wearables" },
            { name: "Kitchen & Cups", href: "/merch/kitchen-and-cups" },
            { name: "Computerware",   href: "/merch/computerware" },
        ],
    },
    { name: "About Hydromedon",   href: "/about" },
    { name: "Statement of Faith", href: "/about/statement-of-faith" },
    { name: "Recommended Sites",  href: "/about/recommended-sites" },
    { name: "Stay in the Light",  href: "/light" },
];

export default function MobileNav() {
    const [open, setOpen] = useState(false);
    const [openSection, setOpenSection] = useState<string | null>(null);
    const pathname = usePathname();

    // Close the entire menu when the route changes (back/forward nav or programmatic).
    // Using "setState during render" pattern avoids calling setState inside useEffect.
    const [prevPathname, setPrevPathname] = useState(pathname);
    if (prevPathname !== pathname) {
        setPrevPathname(pathname);
        setOpen(false);
        setOpenSection(null);
    }

    const close = () => {
        setOpen(false);
        setOpenSection(null);
    };

    const toggleSection = (label: string) =>
        setOpenSection((prev) => (prev === label ? null : label));

    return (
        <div className="md:hidden">
            {/* ── Hamburger button ─────────────────────────────────────────── */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex flex-col justify-center gap-1.5 p-1 group"
                aria-label="Toggle navigation menu"
                aria-expanded={open}
                aria-controls="mobile-nav"
            >
                {/* Bar 1 — rotates to form top half of × */}
                <span
                    className={`block w-7 h-0.5 bg-white transition-all duration-300
                                group-hover:bg-[#FFD700]
                                ${open ? "rotate-45 translate-y-2" : ""}`}
                />
                {/* Bar 2 — fades out */}
                <span
                    className={`block w-7 h-0.5 bg-white transition-all duration-300
                                group-hover:bg-[#FFD700]
                                ${open ? "opacity-0 scale-x-0" : ""}`}
                />
                {/* Bar 3 — rotates to form bottom half of × */}
                <span
                    className={`block w-7 h-0.5 bg-white transition-all duration-300
                                group-hover:bg-[#FFD700]
                                ${open ? "-rotate-45 -translate-y-2" : ""}`}
                />
            </button>

            {/* ── Slide-down panel ─────────────────────────────────────────── */}
            {/*
                Positioned absolute so it drops below the header without
                displacing any sibling layout.  left-0 / right-0 span the
                full header width; top-full aligns to the bottom edge of the
                nearest `position: relative` ancestor (the <header> element).
            */}
            <div
                id="mobile-nav"
                className={`absolute left-0 right-0 top-full z-50
                            overflow-hidden transition-all duration-300 ease-out
                            ${open ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}`}
            >
                <nav
                    className="bg-black/95 backdrop-blur-md border-t border-white/10
                               px-6 py-5 flex flex-col"
                    aria-label="Mobile navigation"
                >
                    {navLinks.map((item) => {
                        /* ── Expandable section (e.g. Merch) ─────────────── */
                        if (item.children) {
                            const isExpanded = openSection === item.name;
                            const childActive = item.children.some(
                                (c) => pathname === c.href || pathname.startsWith(c.href + "/")
                            );
                            return (
                                <div key={item.name} className="flex flex-col">
                                    <button
                                        type="button"
                                        onClick={() => toggleSection(item.name)}
                                        className={`flex items-center justify-between
                                                    py-3 text-sm uppercase tracking-[0.15em]
                                                    border-b border-white/5 transition-colors
                                                    ${childActive
                                                        ? "text-[#FFD700]"
                                                        : "text-white/85 hover:text-[#FFD700]"
                                                    }`}
                                        aria-expanded={isExpanded}
                                    >
                                        <span>{item.name}</span>
                                        <span
                                            aria-hidden
                                            className={`text-xs transition-transform duration-300
                                                        ${isExpanded ? "rotate-180" : ""}`}
                                        >
                                            ▾
                                        </span>
                                    </button>

                                    {/* Sub-links */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-out
                                                    ${isExpanded ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
                                    >
                                        <div className="ml-2 border-l border-white/10 pl-3 py-1 flex flex-col gap-0.5">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    onClick={close}
                                                    className="py-2 text-sm text-white/60 hover:text-[#FFD700] transition-colors"
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        /* ── Standard link ───────────────────────────────── */
                        const active =
                            item.href === "/"
                                ? pathname === "/"
                                : pathname === item.href ||
                                  pathname.startsWith(item.href + "/");

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={close}
                                className={`py-3 text-sm uppercase tracking-[0.15em]
                                            border-b border-white/5 last:border-0
                                            transition-colors
                                            ${active
                                                ? "text-[#FFD700]"
                                                : "text-white/85 hover:text-[#FFD700]"
                                            }`}
                                aria-current={active ? "page" : undefined}
                            >
                                    {item.name}
                                </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
