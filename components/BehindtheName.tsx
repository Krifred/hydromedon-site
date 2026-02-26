"use client";

import { useRef } from "react";
import FadeIn from "./FadeIn";
import { useMotionSection } from "./useMotionSection";

export default function BehindTheName() {
    const sectionRef = useRef<HTMLElement>(null!);

    // 🌊 Soft motion fits reflective narrative tone
    useMotionSection(sectionRef, {
        preset: "soft",
        once: true,
    });

    return (
        <section
            id="behind-the-name"
            ref={sectionRef}
            className="motion-section max-w-4xl mx-auto px-4 py-24 text-center text-gray-200"
        >
            <div className="mx-auto max-w-3xl px-6 text-center">
                <FadeIn delayMs={0}>
                    <h2 className="text-center text-3xl md:text-4xl font-bold mb-6 text-yellow-400 tracking-tight drop-shadow-[0_0_18px_rgba(212,175,55,0.35)]">
                        Behind the Name “Hydromedon”
                    </h2>
                </FadeIn>

                <FadeIn delayMs={180}>
                    <p className="text-left leading-relaxed opacity-90 mb-6">
                        The name <span className="text-yellow-300">Hydromedon</span> carries
                        the imagery of deep waters, drifting light, and quiet mystery. Like a
                        jellyfish moving through the ocean’s hidden places, it evokes beauty,
                        fragility, and a sense of being carried by currents larger than
                        ourselves.
                    </p>
                </FadeIn>

                <FadeIn delayMs={360}>
                    <p className="text-left leading-relaxed opacity-90 mb-6">
                        In Scripture, water is a symbol of renewal, cleansing, and the
                        presence of God moving in unseen ways. The name reflects that
                        spiritual undercurrent — the idea that grace flows beneath the
                        surface of our lives, guiding us even when we cannot see the path
                        clearly.
                    </p>
                </FadeIn>

                <FadeIn delayMs={540}>
                    <p className="text-left leading-relaxed opacity-90 mb-6">
                        Hydromedon also hints at the tension between vulnerability and
                        resilience. A creature made of light and softness, yet able to
                        survive in the vastness of the deep. This mirrors the heart of the
                        project: music born from fragile places, strengthened by faith,
                        illuminated by hope.
                    </p>
                </FadeIn>

                <FadeIn delayMs={720}>
                    <p className="text-left leading-relaxed opacity-90">
                        Ultimately, the name is an invitation — to drift, to listen, to
                        breathe, and to encounter God in the quiet waters of the soul.
                        Hydromedon is not just a title; it is a posture of wonder, a symbol of
                        spiritual depth, and a reminder that even in the deep, we are held.
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}
``