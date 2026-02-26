"use client";

import { useRef } from "react";
import FadeIn from "./FadeIn";
import { useMotionSection } from "./useMotionSection";

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);

    // 🌙 Soft motion — calm landing at the end of the page
    useMotionSection(sectionRef, {
        preset: "soft",
        once: true,
    });

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="motion-section max-w-4xl mx-auto px-4 py-24 text-center text-gray-200"
        >
            <div className="mx-auto max-w-3xl px-6 text-center">
                <FadeIn delayMs={0}>
                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                        Contact
                    </h2>
                </FadeIn>

                <FadeIn delayMs={180}>
                    <p className="text-lg opacity-80">
                        This is a placeholder for the Contact section.
                    </p>
                </FadeIn>

                <FadeIn delayMs={360}>
                    {/* Form block placeholder - preserve fields/styles if present */}
                </FadeIn>
            </div>
        </section>
    );
}