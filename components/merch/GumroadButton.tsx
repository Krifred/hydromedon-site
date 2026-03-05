/* ==========================================================
   GumroadButton  overlay purchase button powered by Gumroad
   Loads gumroad.js exactly once (Next.js Script deduplicates
   by id); renders an overlay link, falls back to direct href.
   ========================================================== */

"use client";

import Script from "next/script";

interface GumroadButtonProps {
    href: string;
    label?: string;
}

export default function GumroadButton({
    href,
    label = "Acquire",
}: GumroadButtonProps) {
    return (
        <>
            {/* next/script deduplicates by id — safe to render in multiple instances */}
            <Script
                id="gumroad-js"
                src="https://gumroad.com/js/gumroad.js"
                strategy="lazyOnload"
            />

            {/* .gumroad-button triggers Gumroad overlay on click */}
            <a
                href={href}
                className={[
                    "gumroad-button",
                    "inline-flex items-center justify-center",

                    // ✅ Mobile-first: smaller, quieter button
                    "px-4 py-2 text-xs font-medium tracking-widest uppercase",

                    // ✅ Tablet & up: restore original sizing
                    "sm:px-8 sm:py-3 sm:text-sm sm:font-light",

                    "border border-yellow-500/50 text-yellow-400 rounded-sm",
                    "transition-all duration-300",
                    "hover:bg-yellow-500/10 hover:border-yellow-400/70",
                    "hover:shadow-[0_0_24px_rgba(212,175,55,0.3)]",
                ].join(" ")}
                data-gumroad-overlay-checkout="true"
                rel="noopener noreferrer"
            >
                {label}
            </a>
        </>
    );
}