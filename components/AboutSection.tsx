// components/AboutSection.tsx
"use client";

import FadeIn from "@/components/FadeIn";

export default function AboutSection() {
    return (
        <section
            id="about"
            className="scroll-mt-28 max-w-4xl mx-auto px-4 py-24 text-gray-200"
        >
            <div className="mx-auto max-w-3xl px-6">
                <FadeIn delayMs={0}>
                    <h2 className="text-center text-3xl md:text-4xl font-bold mb-6 text-yellow-400 tracking-tight drop-shadow-[0_0_18px_rgba(212,175,55,0.35)]">
                        About Hydromedon
                    </h2>
                </FadeIn>

                <FadeIn delayMs={180}>
                    <p className="text-left leading-relaxed opacity-90 mb-6">
                        Hydromedon was born in the quiet places where words fail and music
                        becomes the only language left. It is not a band, not a brand, and
                        not a mission to persuade — it is a vessel for the cries, questions,
                        and fragile hopes that rise from the deepest parts of the soul.
                        These songs were written in seasons marked by loss, uncertainty, and
                        the kind of silence that makes you wonder if God is still listening.
                        Yet in those same seasons, faith became the thread that held
                        everything together.
                    </p>
                </FadeIn>

                <FadeIn delayMs={360}>
                    <p className="text-left leading-relaxed opacity-90 mb-6">
                        The name Hydromedon carries the imagery of storms and waters — the
                        overwhelming tides of life that threaten to pull us under, and the
                        unexpected grace that meets us in the depths. The music reflects
                        that tension: cinematic and intimate, ethereal and grounded, shaped
                        by the textures of dreampop, the reverence of sacred music, and the
                        raw honesty of lament and prayer. Hydromedon does not exist to
                        preach or proselytize. There is no agenda, no attempt to convince or
                        correct. These songs are simply the overflow of lived experience —
                        the nights of wrestling, the mornings of fragile hope, the moments
                        when faith was held with trembling hands. They are confessions, not
                        arguments; testimonies, not instructions.
                    </p>
                </FadeIn>

                <FadeIn delayMs={540}>
                    <p className="text-left leading-relaxed opacity-90 mb-6">
                        At the heart of Hydromedon is a desire to accompany those who are
                        walking through their own valleys. If you have ever felt abandoned,
                        unseen, or overwhelmed… if you have ever cried out into the dark and
                        heard nothing in return… if you have ever clung to faith not because
                        it was easy, but because it was the only thing left — then these
                        songs are for you. Every melody, every lyric, every atmospheric
                        swell is crafted with the hope that you might feel less alone, that
                        you might sense a flicker of light in the shadows, and that you
                        might remember that Jesus has not left you, even when the night
                        feels endless.
                    </p>
                </FadeIn>

                <FadeIn delayMs={720}>
                    <p className="text-left leading-relaxed opacity-90">
                        Hydromedon is a reminder that lament is not the opposite of faith —
                        it is often the doorway to deeper trust. This is music for the
                        broken, the searching, the weary, and the quietly courageous. Music
                        for those who still believe, or want to believe, or are trying to
                        believe again. Music for anyone who needs to hear that hope is not
                        lost, and that dawn always follows the longest night. Hydromedon is
                        not here to convert. Hydromedon is here to accompany, to witness, to
                        testify, to sing in the dark until the light returns.
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}