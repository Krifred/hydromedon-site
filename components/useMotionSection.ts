"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

type MotionPreset = "soft" | "spotlight" | "reveal";

export function useMotionSection(
    ref: RefObject<HTMLElement>,
    {
        preset = "soft",
        once = true,
        rootMargin = "0px 0px -12% 0px",
    }: { preset?: MotionPreset; once?: boolean; rootMargin?: string } = {}
) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Respect reduced motion
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (media.matches) {
            el.classList.add("is-active");
            el.style.setProperty("--vp", "1");
            el.dataset.preset = preset;
            return;
        }

        el.dataset.preset = preset;

        // Smooth ratio updates: 0..1 in 5% increments
        const thresholds: number[] = [];
        for (let i = 0; i <= 20; i++) thresholds.push(i / 20);

        const io = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry) return;

                const ratio = entry.intersectionRatio; // 0..1
                el.style.setProperty("--vp", ratio.toFixed(3));

                if (entry.isIntersecting) {
                    el.classList.add("is-active");
                    if (once) io.unobserve(el);
                }
            },
            { threshold: thresholds, rootMargin }
        );

        io.observe(el);
        return () => io.disconnect();
    }, [ref, preset, once, rootMargin]);
}