"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Latest Release", href: "/#latest" },
    { label: "Music", href: "/music" },
    {
        label: "About",
        children: [
            { label: "About Hydromedon", href: "/about#about" },
            { label: "Behind the Name", href: "/about#behind-the-name" },
            { label: "Statement of Faith", href: "/about#statement-of-faith" },
        ],
    },
    { label: "Contact", href: "/#contact" },
];

type NavItem =
    | { label: string; href: string; children?: never }
    | { label: string; children: { label: string; href: string }[]; href?: never };

const ABOUT_SECTION_IDS = ["about", "behind-the-name", "statement-of-faith"] as const;

function getHashId(href: string) {
    const idx = href.indexOf("#");
    return idx >= 0 ? href.slice(idx + 1) : "";
}

export default function Header() {
    const pathname = usePathname();

    const [visible, setVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false); // mobile accordion

    // Drives highlight (tap + scroll on /about and /)
    const [activeAnchor, setActiveAnchor] = useState<string>("");

    // Header background on scroll
    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 80);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Keep activeAnchor synced with URL hash (tap links, browser back/forward)
    useEffect(() => {
        const syncFromHash = () => {
            const h = window.location.hash?.replace("#", "") || "";
            if (h) setActiveAnchor(h);
        };

        syncFromHash();
        window.addEventListener("hashchange", syncFromHash);
        return () => window.removeEventListener("hashchange", syncFromHash);
    }, []);

    // Scroll-based active section detection for /about
    useEffect(() => {
        if (pathname !== "/about") return;

        // If no hash, default to first section
        if (!window.location.hash) setActiveAnchor("about");

        const elements = ABOUT_SECTION_IDS.map((id) => document.getElementById(id)).filter(
            Boolean
        ) as HTMLElement[];

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

                const top = visibleEntries[0]?.target as HTMLElement | undefined;
                if (top?.id) setActiveAnchor(top.id);
            },
            {
                root: null,
                threshold: [0.12, 0.2, 0.35, 0.5],
                rootMargin: "-20% 0px -55% 0px",
            }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [pathname]);

    // ✅ Scroll-based active section detection for Home page (/#latest, /#contact)
    useEffect(() => {
        if (pathname !== "/") return;

        // If user loaded with a hash, honor it
        const currentHash = window.location.hash?.replace("#", "") || "";
        if (currentHash) setActiveAnchor(currentHash);

        // Find all top-level "#..." ids from navItems (Latest Release, Contact, etc.)
        const homeIds = (navItems as NavItem[])
            .flatMap((item) => {
                const href = "href" in item ? item.href : undefined;

                return typeof href === "string" && href.startsWith("/#")
                    ? [getHashId(href)]
                    : [];
            })
            .filter(Boolean);


        const elements = homeIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

                const top = visibleEntries[0]?.target as HTMLElement | undefined;
                if (top?.id) setActiveAnchor(top.id);
            },
            {
                root: null,
                threshold: [0.12, 0.2, 0.35, 0.5],
                rootMargin: "-20% 0px -60% 0px",
            }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [pathname]);

    // ✅ When at top of Home (no hash + not scrolled), highlight Home (clear activeAnchor)
    useEffect(() => {
        if (pathname !== "/") return;
        if (!visible && !window.location.hash) setActiveAnchor("");
    }, [pathname, visible]);

    // Optional nicety: auto-open About accordion when opening menu on /about
    useEffect(() => {
        if (menuOpen && pathname === "/about") setAboutOpen(true);
    }, [menuOpen, pathname]);

    const closeMenu = () => {
        setMenuOpen(false);
        setAboutOpen(false);
    };

    const isHomeHashActive = (href: string) => {
        const id = getHashId(href); // e.g. "/#latest" -> "latest"
        return pathname === "/" && !!id && activeAnchor === id;
    };

    const isAboutHashActive = (href: string) => {
        const id = getHashId(href);
        return pathname === "/about" && !!id && activeAnchor === id;
    };

    const aboutIsActive = useMemo(() => pathname === "/about", [pathname]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${visible ? "bg-black/60 backdrop-blur-md shadow-lg" : "bg-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 gap-8">
                {/* Brand */}
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="uppercase tracking-[0.3em] text-sm font-semibold text-white/90 hover:text-[#FFD700] transition"
                    aria-label="Home"
                >
                    <span className="sr-only">Hydromedon</span>
                    <span aria-hidden className="hidden sm:inline">

                    </span>
                </Link>

                {/* Desktop navigation */}
                <nav
                    className={`hidden md:flex gap-10 lg:gap-12 xl:gap-16 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-75"
                        }`}
                    aria-label="Main"
                >
                    {(navItems as NavItem[]).map((item) => {
                        // Dropdown item (About)
                        if ("children" in item) {
                            return (
                                <div key={item.label} className="relative group">
                                    <button
                                        type="button"
                                        className={`px-3 py-2 uppercase tracking-wide text-sm transition-colors flex items-center gap-2 ${aboutIsActive
                                                ? "text-[#FFD700]"
                                                : "text-white/90 hover:text-[#FFD700] focus:text-[#FFD700]"
                                            }`}
                                        aria-haspopup="menu"
                                        aria-expanded="false"
                                    >
                                        {item.label}
                                        <span
                                            aria-hidden
                                            className={`transition ${aboutIsActive ? "text-[#FFD700]" : "text-white/60 group-hover:text-[#FFD700]"
                                                }`}
                                        >
                                            ▾
                                        </span>
                                    </button>

                                    {/* Dropdown panel */}
                                    <div className="absolute left-0 top-full mt-2 hidden group-hover:block group-focus-within:block">
                                        <div className="min-w-[220px] rounded-md border border-white/10 bg-black/80 backdrop-blur-md shadow-lg overflow-hidden">
                                            {Array.isArray(item.children) &&
                                                item.children.map((child) => {
                                                const active = isAboutHashActive(child.href);
                                                return (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className={`block px-4 py-3 text-sm transition ${active ? "text-[#FFD700] bg-white/5" : "text-white/85 hover:text-[#FFD700] hover:bg-white/5"
                                                            }`}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        // Standard desktop link
                        const active =
                            item.href === "/"
                                ? pathname === "/" && !activeAnchor // ✅ Home active when no section is active
                                : item.href === pathname || isHomeHashActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-3 py-2 uppercase tracking-wide text-sm transition-colors ${active ? "text-[#FFD700]" : "text-white/90 hover:text-[#FFD700] focus:text-[#FFD700]"
                                    }`}
                                aria-current={active ? "page" : undefined}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMenuOpen((v) => !v)}
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
                <div id="mobile-menu" className="md:hidden bg-black/80 backdrop-blur-md border-t border-white/10">
                    <nav className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-3" aria-label="Mobile">
                        {(navItems as NavItem[]).map((item) => {
                            // Mobile accordion for About
                            if ("children" in item) {
                                return (
                                    <div key={item.label} className="flex flex-col">
                                        <button
                                            type="button"
                                            onClick={() => setAboutOpen((v) => !v)}
                                            className={`px-1.5 py-2 uppercase tracking-wide text-sm transition flex items-center justify-between ${aboutIsActive ? "text-[#FFD700]" : "text-white/85 hover:text-[#FFD700]"
                                                }`}
                                            aria-expanded={aboutOpen}
                                        >
                                            <span>{item.label}</span>
                                            <span aria-hidden className={`transition-transform duration-300 ${aboutOpen ? "rotate-180" : ""}`}>
                                                ▾
                                            </span>
                                        </button>

                                        {aboutOpen && (
                                            <div className="mt-1 ml-2 border-l border-white/10 pl-3 flex flex-col">
                                                {Array.isArray(item.children) &&
                                                    item.children.map((child) => {
                                                    const id = getHashId(child.href);
                                                    const active = isAboutHashActive(child.href);

                                                    return (
                                                        <Link
                                                            key={child.href}
                                                            href={child.href}
                                                            onClick={() => {
                                                                if (id) setActiveAnchor(id);
                                                                closeMenu();
                                                            }}
                                                            className={`relative px-2 py-2 text-sm transition rounded-md ${active
                                                                    ? "text-[#FFD700] bg-white/5 shadow-[0_0_18px_rgba(212,175,55,0.18)]"
                                                                    : "text-white/80 hover:text-[#FFD700]"
                                                                }`}
                                                            aria-current={active ? "location" : undefined}
                                                        >
                                                            {active && (
                                                                <span
                                                                    aria-hidden
                                                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2px] bg-[#FFD700] rounded"
                                                                />
                                                            )}
                                                            <span className={active ? "pl-2" : ""}>{child.label}</span>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            // Standard mobile link
                            const active =
                                item.href === "/"
                                    ? pathname === "/" && !activeAnchor
                                    : item.href === pathname || isHomeHashActive(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => {
                                        const id = getHashId(item.href);
                                        if (id) setActiveAnchor(id);
                                        closeMenu();
                                    }}
                                    className={`px-1.5 py-2 uppercase tracking-wide text-sm transition ${active ? "text-[#FFD700]" : "text-white/85 hover:text-[#FFD700]"
                                        }`}
                                    aria-current={active ? "page" : undefined}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
}
