"use client";

import FadeIn from "./FadeIn";

export default function StatementOfFaith() {
    return (
        <section
            id="faith"
            className="max-w-4xl mx-auto px-4 py-24 text-center text-gray-200"
        >
            <div className="mx-auto max-w-3xl px-6 text-center">
                <FadeIn delayMs={0}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-400 tracking-tight drop-shadow-[0_0_18px_rgba(212,175,55,0.35)]">
                        Statement of Faith
                    </h2>
                </FadeIn>

                <FadeIn delayMs={180}>
                    <p className="text-lg leading-relaxed opacity-90 mb-8">
                        Hydromedon is rooted in a simple belief: that God is present,
                        compassionate, and endlessly creative — meeting us in the quiet,
                        the broken, the beautiful, and the in‑between places of life.
                    </p>
                </FadeIn>

                <FadeIn delayMs={320}>
                    <p className="text-lg leading-relaxed opacity-90 mb-8">
                        We believe Jesus is the One who lifts, restores, and walks with us
                        through every valley and every dawn. His grace is not a concept but
                        a lived reality — a light that finds us even when we feel lost.
                    </p>
                </FadeIn>

                <FadeIn delayMs={460}>
                    <p className="text-lg leading-relaxed opacity-90 mb-8">
                        We believe the Holy Spirit breathes creativity, comfort, and
                        courage into the human heart. Every melody, lyric, and atmosphere
                        we create is offered as a space where listeners can encounter peace,
                        healing, and the gentle nearness of God.
                    </p>
                </FadeIn>

                <FadeIn delayMs={600}>
                    <p className="text-lg leading-relaxed opacity-90 mb-8">
                        We believe faith is a journey — sometimes radiant, sometimes
                        fragile — and that honest art can help us remember who we are and
                        who God has always been. Hydromedon exists to accompany that
                        journey, not to instruct it.
                    </p>
                </FadeIn>

                <FadeIn delayMs={740}>
                    <p className="text-lg leading-relaxed opacity-90">
                        Above all, we believe in hope.
                        A hope that does not shame questions.
                        A hope that welcomes the weary.
                        A hope that whispers, even in the dark,
                        that light is coming — and the dawn is real.
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}
