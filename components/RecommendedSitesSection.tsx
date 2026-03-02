"use client";

import { useEffect } from "react";
import { useAnalytics } from "@/app/providers/analytics";
import FadeIn from "@/components/FadeIn";

export default function RecommendedSitesSection() {
    const { setComponentContext } = useAnalytics();

    useEffect(() => {
        setComponentContext("recommended_sites");
    }, [setComponentContext]);

    const sites = [
        {
            name: "The Ancient Way",
            description:
                "The Ancient Way invites followers of Jesus to walk the ancient paths of Scripture, celebrating the seven appointed times God established to meet with His people.",
            url: "https://www.theancientway.org",
        },
        {
            name: "Kavodah",
            description:
                "Kavodah creates soulful Messianic electronic music inspired by Scripture, blending modern beats with worship rooted in the Psalms and lived faith.",
            url: "https://www.kavodah.com/",
        },
        {
            name: "Revayah Paper Co.",
            description:
                "A creative homeschool site providing thoughtfully crafted resources that help families teach Scripture, the biblical feasts, and God’s appointed times with beauty and intention.",
            url: "https://www.revayah.co/",
        },
    ];

    return (
        <section className="max-w-5xl mx-auto px-4 py-10">
            <div className="text-center mt-6 mb-10 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-yellow-400 mb-3 drop-shadow">
                    Recommended Sites
                </h1>

                <p className="text-gray-300">
                    A curated collection of friendly, trusted, and spiritually aligned
                    resources.
                </p>
            </div>

            <div className="space-y-8 max-w-3xl mx-auto">
                {sites.map((site, idx) => (
                    <FadeIn
                        key={site.name}
                        delayMs={200 + idx * 120}
                        durationMs={1200}
                        y={16}
                    >
                        <div className="rounded-lg border border-white/10 bg-black/30 p-6">
                            <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                                {site.name}
                            </h3>

                            <p className="text-gray-300 mb-4">{site.description}</p>

                            <a
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-site-name={site.name}
                                className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition"
                            >
                                Visit Site <span className="text-xs opacity-70">↗</span>
                            </a>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}
