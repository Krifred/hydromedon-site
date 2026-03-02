"use client";

import FadeIn from "./FadeIn";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
    const [fade, setFade] = useState(1);
    const hasScrolledRef = useRef(false);
    const [isBreathing, setIsBreathing] = useState(true);
    const prefersReducedMotionRef = useRef(false);

    /* Scroll-based fade (content never disappears) */
    useEffect(() => {
        setFade(1);

        const handleScroll = () => {
            const y = window.scrollY;

            if (!hasScrolledRef.current) {
                if (y === 0) return;
                hasScrolledRef.current = true;
            }

            const max = 260;
            const value = Math.max(0.25, Math.min(1, 1 - y / max));
            setFade(value);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* Breathing animation (stops on interaction) */
    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        prefersReducedMotionRef.current = media.matches;

        if (media.matches) {
            setIsBreathing(false);
            return;
        }

        const stopBreathing = () => setIsBreathing(false);

        window.addEventListener("scroll", stopBreathing, { passive: true });
        window.addEventListener("mousedown", stopBreathing);
        window.addEventListener("touchstart", stopBreathing);

        return () => {
            window.removeEventListener("scroll", stopBreathing);
            window.removeEventListener("mousedown", stopBreathing);
            window.removeEventListener("touchstart", stopBreathing);
        };
    }, []);

    return (
        <section className="relative flex flex-col items-center justify-start min-h-[60vh] pt-10 pb-12 text-center overflow-hidden">
            {/* Cinematic vignette frame */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 bg-hero-vignette"
            />

            {/* Foreground content */}
            <div
                className="relative z-10 flex flex-col items-center transition-[opacity,transform] duration-300 ease-out"
                style={{
                    opacity: fade,
                    transform: `translateY(${(1 - fade) * -12}px)`,
                }}
            >
                <div className="relative flex items-center justify-center">
                    {/* OUTER SACRED HALO */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hero-halo blur-3xl animate-halo-pulse"
                        style={{ opacity: fade }}
                    />

                    {/* INNER FOCAL HALO */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hero-halo-inner blur-2xl"
                        style={{ opacity: fade }}
                    />

                    {/* Logo */}
                    <Image
                        src="/brand/logo/hydromedon_logo_light.svg"
                        alt="Hydromedon logo"
                        width={840}
                        height={840}
                        priority
                        className={`relative z-10 -translate-y-1 drop-shadow-[0_28px_70px_rgba(0,0,0,0.65)] ${isBreathing
                                ? "animate-[hero-breathe_16s_ease-in-out_infinite]"
                                : ""
                            }`}
                    />
                </div>

                <FadeIn delayMs={300} durationMs={1500} y={24}>
                    <p className="mt-0 mb-2 text-xl md:text-2xl text-gray-300 max-w-xl text-center">
                        Mythic, cinematic, kingdom‑themed music experience
                    </p>
                </FadeIn>

                <FadeIn delayMs={600} durationMs={1400} y={20}>
                    <div className="mt-0 flex flex-col sm:flex-row gap-6 justify-center">
                        <a
                            href="#music"
                            className="h-10 px-7 py-2 bg-yellow-500 text-black rounded shadow hover:bg-yellow-400 font-semibold transition"
                        >
                            Listen
                        </a>
                        <a
                            href="#about"
                            className="h-10 px-7 py-2 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-black transition font-semibold"
                        >
                            About
                        </a>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}