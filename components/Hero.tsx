
"use client";

import FadeIn from "./FadeIn";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Hero() {
  const [fade, setFade] = useState(1);
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const max = 260;
      const value = Math.max(0, Math.min(1, 1 - y / max));
      setFade(value);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
      <section className="relative flex flex-col items-center justify-start min-h-[60vh] pt-10 pb-12 text-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04)_0%,transparent_55%)]">
      {/* Step 1: Subtle film grain / texture (CSS-only fallback) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.12] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.03)_0%,transparent_40%)]"
      />

      {/* Step 2: Foreground content stays above background layers */}
      <div
        className="relative z-10 flex flex-col items-center transition-[opacity,transform] duration-300 ease-out"
        style={{ opacity: fade, transform: `translateY(${(1 - fade) * -12}px)` }}
      >
        <div className="relative flex items-center justify-center">
          {/* OUTER BLOOM (big + soft) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.16)_0%,rgba(212,175,55,0.08)_32%,transparent_68%)] blur-3xl"
          />

          {/* INNER HALO (tighter + warmer) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.30)_0%,rgba(212,175,55,0.12)_39%,transparent_65%)] blur-2xl"
          />

          {/* Step 3: Floating but grounded logo */}
          <Image
            src="/brand/logo/hydromedon_logo_light.svg"
            alt="Hydromedon logo"
            width={840}
            height={840}
            priority
            className="relative z-10 -translate-y-1 drop-shadow-[0_28px_70px_rgba(0,0,0,0.65)]"
          />
        </div>

              <FadeIn delayMs={300} durationMs={1500} y={24}>
          <p className="mt-0 mb-6 text-xl md:text-2xl text-gray-300 max-w-xl text-center">
            Mythic, cinematic, kingdom‑themed music experience
          </p>
        </FadeIn>
              <FadeIn delayMs={600} durationMs={1400} y={20}>
          <div className="mt-14 flex flex-col sm:flex-row gap-6 justify-center">
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
