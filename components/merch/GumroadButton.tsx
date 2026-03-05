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
    label = "Purchase",
}: GumroadButtonProps) {
    return (
        <>
            {/* next/script deduplicates by id  safe to render in multiple instances */}
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
                    "px-8 py-3 text-sm tracking-widest uppercase font-light",
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
