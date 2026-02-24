"use client";

import FadeIn from "./FadeIn";

export default function AboutSection() {
    return (
        <section
            id="about"
            className="max-w-4xl mx-auto px-4 py-24 text-gray-200"
        >
            <div className="mx-auto max-w-3xl px-6">
                <FadeIn delayMs={0}>
                    <h2 className="text-center text-3xl md:text-4xl font-bold mb-6 text-yellow-400 tracking-tight drop-shadow-[0_0_18px_rgba(212,175,55,0.35)]">
                        About Hydromedon
                    </h2>
                </FadeIn>

                <FadeIn delayMs={180}>
                    <p className="text-left leading-relaxed opacity-90 mb-6">
                        Hydromedon is a Christian dreampop project born from a desire to
                        create music that feels like a place — a kingdom‑themed,
                        cinematic world where faith, beauty, and spiritual longing meet.
                        It is a space for worshippers, wanderers, and anyone searching for
                        light in the middle of their story.
                    </p>
                </FadeIn>

                <FadeIn delayMs={360}>
                    <p className="text-left leading-relaxed opacity-90 mb-6">
                        The songs are built like landscapes: shimmering textures,
                        ethereal vocals, and slow‑burn melodies shaped to feel like
                        prayer, lament, and hope. Every track is crafted with intention —
                        not to preach, but to accompany. Not to instruct, but to lift.
                        Hydromedon exists to offer a quiet place where listeners can
                        breathe, reflect, and encounter the presence of God in a way that
                        feels intimate and deeply human.
                    </p>
                </FadeIn>

                <FadeIn delayMs={540}>
                    <p className="text-left leading-relaxed opacity-90 mb-6">
                        The project was created by a lifelong musician and software
                        architect who spent decades building systems by day and writing
                        worship songs by night. Hydromedon is the merging of those two
                        worlds — technical precision and spiritual imagination — brought
                        together to form something honest, cinematic, and full of wonder.
                    </p>
                </FadeIn>

                <FadeIn delayMs={720}>
                    <p className="text-left leading-relaxed opacity-90">
                        At its heart, Hydromedon is an offering: a collection of songs,
                        visuals, and stories meant to encourage believers, comfort the
                        weary, and remind every listener that grace is not fragile, hope
                        is not naïve, and God is still making all things new.
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}
