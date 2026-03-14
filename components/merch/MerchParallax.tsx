"use client";

/* ==========================================================
   MerchParallax - page-specific atmospheric layer for /merch
   - Fixed radial gradient with gentle scroll parallax
   - Static grain overlay (bg-noise at 4% opacity)
   - Top + side vignettes
   - Scroll-based opacity modulation on .js-merch-intro elements
   All motion effects respect prefers-reduced-motion.
   ========================================================== */

import { useEffect, useRef } from "react";

export default function MerchParallax() {
    const gradRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Honour reduced-motion preference — keep only the static layers
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let rafId: number;

        // Detect mobile once at mount — parallax is disabled on narrow screens
        const isMobile = window.matchMedia("(max-width: 639px)").matches;

        const update = () => {
            const y = window.scrollY;

            // Parallax: desktop only — skip on mobile for performance
            if (!isMobile && gradRef.current) {
                gradRef.current.style.transform =
                    `translateY(${Math.min(y * 0.036, 18).toFixed(1)}px)`;
            }

            // Scroll opacity: mobile 100%->90%, desktop 100%->85%
            const floor = isMobile ? 0.90 : 0.85;
            const opacity = Math.max(floor, 1 - Math.min(y / 280, 1) * (1 - floor))
                .toFixed(3);
            document
                .querySelectorAll<HTMLElement>(".js-merch-intro")
                .forEach((el) => { el.style.opacity = opacity; });
        };

        const onScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(update);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div aria-hidden className="pointer-events-none select-none">
            {/* Atmospheric radial gradient — moves with parallax */}
            <div
                ref={gradRef}
                className="fixed inset-0 will-change-transform"
                style={{
                    zIndex: -1,
                    background:
                        "radial-gradient(1400px 900px at 50% -10%, rgba(212,175,55,0.055), transparent 55%)",
                }}
            />

            {/* Static grain overlay — fixed to viewport, does not move */}
            <div
                className="fixed inset-0 bg-noise"
                style={{ zIndex: -1, opacity: 0.04 }}
            />

            {/* Top vignette */}
            <div
                className="fixed inset-x-0 top-0 h-24 sm:h-48 bg-gradient-to-b from-black/20 sm:from-black/30 to-transparent"
                style={{ zIndex: -1 }}
            />

            {/* Side vignettes */}
            <div
                className="fixed inset-y-0 left-0 w-8 sm:w-24 bg-gradient-to-r from-black/10 sm:from-black/15 to-transparent"
                style={{ zIndex: -1 }}
            />
            <div
                className="fixed inset-y-0 right-0 w-8 sm:w-24 bg-gradient-to-l from-black/10 sm:from-black/15 to-transparent"
                style={{ zIndex: -1 }}
            />
        </div>
    );
}
