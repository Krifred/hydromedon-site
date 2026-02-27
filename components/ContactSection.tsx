"use client";

import { useRef, useState } from "react";
import FadeIn from "./FadeIn";
import { useMotionSection } from "./useMotionSection";
import JoinTheJourneyForm from "./JoinTheJourneyForm";

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null!);
    const [lang, setLang] = useState<"en" | "fr">("en");

    useMotionSection(sectionRef, {
        preset: "soft",
        once: true,
    });

    const t = {
        en: {
            title: "Stay in the Light",
            subtitle:
                "Receive new releases, behind‑the‑song reflections, and moments of encouragement.",
            privacy: "No spam. Unsubscribe anytime.",
        },
        fr: {
            title: "Reste dans la Lumière",
            subtitle:
                "Reçois les dernieres publications, les réflexions derrière les chansons, et des pensées d’encouragement.",
            privacy: "Aucun spam. Désabonnement en tout temps.",
        },
    }[lang];

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="motion-section max-w-4xl mx-auto px-4 py-24 text-center text-gray-200"
        >
            <div className="mx-auto max-w-3xl px-6 text-center">
                <FadeIn delayMs={0}>
                    <div className="flex justify-center gap-4 mb-6">
                        <button
                            onClick={() => setLang("en")}
                            className={`px-3 py-1 rounded-md text-sm ${lang === "en"
                                    ? "bg-yellow-500 text-black"
                                    : "bg-transparent border border-yellow-500 text-yellow-400"
                                }`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setLang("fr")}
                            className={`px-3 py-1 rounded-md text-sm ${lang === "fr"
                                    ? "bg-yellow-500 text-black"
                                    : "bg-transparent border border-yellow-500 text-yellow-400"
                                }`}
                        >
                            FR
                        </button>
                    </div>
                </FadeIn>

                <FadeIn delayMs={120}>
                    <h2 className="text-3xl font-bold mb-4 text-yellow-400">
                        {t.title}
                    </h2>
                </FadeIn>

                <FadeIn delayMs={240}>
                    <p className="text-lg opacity-80 mb-10">{t.subtitle}</p>
                </FadeIn>

                <FadeIn delayMs={360}>
                    <JoinTheJourneyForm />
                    <p className="text-xs opacity-60 mt-4">{t.privacy}</p>
                </FadeIn>
            </div>
        </section>
    );
}
