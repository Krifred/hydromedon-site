"use client";

import { useRef } from "react";
import FadeIn from "./FadeIn";
import type { Release } from "@/lib/releases";
import MusicCard from "./MusicCard";
import { useMotionSection } from "./useMotionSection";

export default function MusicGrid({
    title,
    items,
    id = "music",
    preset = "spotlight",
}: {
    title: string;
    items: Release[];
    id?: string;
    preset?: "soft" | "spotlight" | "reveal";
}) {
    const sectionRef = useRef<HTMLElement>(null);

    useMotionSection(sectionRef, { preset, once: true });

    return (
        <section
            id={id}
            ref={sectionRef}
            className="motion-section relative max-w-6xl mx-auto px-4 py-12 text-gray-200"
        >
            <div className="mx-auto max-w-3xl px-6 text-center">
                <FadeIn delayMs={0}>
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-10 tracking-tight drop-shadow-[0_0_18px_rgba(212,175,55,0.35)]">
                        {title}
                    </h2>
                </FadeIn>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {items.map((rel, idx) => (
                    <MusicCard key={rel.slug} rel={rel} idx={idx} />
                ))}
            </div>
        </section>
    );
}