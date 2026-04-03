"use client";
import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { compositions } from '@/data/compositions';

export default function ResourcesPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    const composition = compositions.find(c => c.slug === slug);
    if (!composition) return notFound();

    const leadScore = composition.scores.find(s => s.type === "Lead Sheet");
    const fullScore = composition.scores.find(s => s.type === "Full Score + Instrument Parts");

    const leadSheetUrl = leadScore && "url" in leadScore ? leadScore.url : undefined;
    const fullScoreUrl = fullScore && "url" in fullScore ? fullScore.url : undefined;
    const fullScoreComingSoon = fullScore?.status === "coming-soon";

    return (
        <main className="mx-auto max-w-3xl py-20">

            {/* HERO SECTION */}
            <section className="mb-12 space-y-6">
                <h1 className="text-4xl font-bold tracking-tight mb-6">{composition.title} — Resources</h1>
                <p className="text-lg text-gray-600 leading-relaxed">{composition.description}</p>
            </section>

            {/* AVAILABLE RESOURCES */}
            <section className="mb-12 space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight mb-3">Available Resources</h2>

                {/* Lead Sheet */}
                <div className="border p-4 rounded-lg space-y-2 transition hover:shadow-md">
                    <h3 className="text-lg font-semibold tracking-tight">Lead Sheet</h3>
                    <p className="text-gray-600">A clean, musician-ready 6-page lead sheet with full melody, chords, dynamics, and phrasing.</p>
                    <a
                        href={leadSheetUrl}
                        className="inline-block px-4 py-2 bg-black text-white rounded hover:shadow-md transition"
                    >
                        Get the Lead Sheet
                    </a>
                </div>
            </section>

            {/* COMING SOON */}
            <section className="mb-12 space-y-6 pt-4 border-t border-gray-200">
                <h2 className="text-2xl font-semibold tracking-tight mb-3">Coming Soon</h2>

                {composition.scores.filter(s => s.status === "coming-soon").map((item, i) => (
                    <div
                        key={i}
                        className="border p-4 rounded-lg space-y-2 opacity-60 transition hover:shadow-md"
                    >
                        <h3 className="text-lg font-semibold tracking-tight">{item.type}</h3>
                        <p className="text-gray-600">This resource is currently in preparation and will be added soon.</p>
                    </div>
                ))}
            </section>

            {/* SAMPLE PAGES */}
            <section className="mb-12 space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight mb-3">Sample Pages</h2>

                <div className="grid grid-cols-2 gap-4">
                    <img
                        src={composition.sampleImage}
                        alt={`${composition.title} — Sample Page`}
                        className="rounded-lg cursor-pointer hover:opacity-80 transition"
                        onClick={() => setLightboxImage(composition.sampleImage)}
                    />
                </div>
            </section>

            {/* FOOTER */}
            <section className="mt-12 text-sm text-gray-600">
                <a href={`/sheet-music/${slug}`} className="underline opacity-70 hover:opacity-100 transition">
                    ← Back to Composition Page
                </a>
            </section>

            {/* JSON-LD: WebPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": `${composition.title} — Resources`,
                        "description": composition.description,
                        "url": `https://hydromedon.com/sheet-music/${slug}/resources`
                    })
                }}
            />

            {/* JSON-LD: BreadcrumbList */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Sheet Music",
                                "item": "https://hydromedon.com/sheet-music"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": composition.title,
                                "item": `https://hydromedon.com/sheet-music/${slug}`
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": "Resources",
                                "item": `https://hydromedon.com/sheet-music/${slug}/resources`
                            }
                        ]
                    })
                }}
            />

            {/* JSON-LD: ItemList of Resources */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": `${composition.title} Resources`,
                        "itemListElement": composition.scores.map((score, index) => ({
                            "@type": "ListItem",
                            "position": index + 1,
                            "name": score.type,
                            "url": "url" in score ? score.url : `https://hydromedon.com/sheet-music/${slug}/resources`,
                            "additionalProperty": [
                                {
                                    "@type": "PropertyValue",
                                    "name": "Availability",
                                    "value": score.status === "coming-soon" ? "PreOrder" : "InStock"
                                }
                            ]
                        }))
                    })
                }}
            />

            {lightboxImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={() => setLightboxImage(null)}
                >
                    <img
                        src={lightboxImage}
                        alt="Preview"
                        className="max-w-3xl w-full rounded-lg shadow-lg"
                    />
                </div>
            )}

        </main>
    );
}
