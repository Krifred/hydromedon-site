"use client";
import React, { useState } from 'react';

const resourcesData = {
  title: "Arise, O Lord — Resources",
  description: [
    "All musical resources for Arise, O Lord gathered in one place.",
    "Lead sheet available now. Full score and additional materials coming soon."
  ],
  leadSheetUrl: "https://store.hydromedon.com/products/arise-o-lord-lead-sheet",
  fullScoreUrl: "https://store.hydromedon.com/products/arise-o-lord-full-score",
  fullScoreComingSoon: true,
  items: [
    { title: "Lead Sheet", status: "available" },
    { title: "Full Score + Instrument Parts", status: "coming-soon" },
    { title: "Lyric Sheet", status: "coming-soon" },
    { title: "Chord Chart", status: "coming-soon" },
    { title: "Rehearsal Tracks", status: "coming-soon" },
    { title: "Stems / MIDI", status: "coming-soon" },
    { title: "Performance Notes", status: "coming-soon" }
  ]
};

const itemDescriptions: Record<string, string> = {
    "Full Score + Instrument Parts": "A complete arrangement including piano, strings, and auxiliary instruments.",
    "Lyric Sheet": "A clean, print-ready lyric sheet for worship teams and projection operators.",
    "Chord Chart": "A simplified chord-only chart for guitarists and band rehearsals.",
    "Rehearsal Tracks": "Guide vocals and instrumental practice tracks for team preparation.",
    "Stems / MIDI": "High-quality stems and MIDI files for live performance and arrangement.",
    "Performance Notes": "Musical direction, phrasing notes, and contextual insights for worship leaders.",
};

export default function ResourcesPage() {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    return (
        <main className="mx-auto max-w-3xl py-20">

            {/* HERO SECTION */}
            <section className="mb-12 space-y-6">
                <h1 className="text-4xl font-bold tracking-tight mb-6">{resourcesData.title}</h1>
                <p className="text-lg text-gray-600 leading-relaxed">{resourcesData.description[0]}</p>
                <p className="text-lg text-gray-700 leading-relaxed">{resourcesData.description[1]}</p>
            </section>

            {/* AVAILABLE RESOURCES */}
            <section className="mb-12 space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight mb-3">Available Resources</h2>

                {/* Lead Sheet */}
                <div className="border p-4 rounded-lg space-y-2 transition hover:shadow-md">
                    <h3 className="text-lg font-semibold tracking-tight">Lead Sheet</h3>
                    <p className="text-gray-600">A clean, musician-ready 6-page lead sheet with full melody, chords, dynamics, and phrasing.</p>
                    <a
                        href={resourcesData.leadSheetUrl}
                        className="inline-block px-4 py-2 bg-black text-white rounded hover:shadow-md transition"
                    >
                        Get the Lead Sheet
                    </a>
                </div>
            </section>

            {/* COMING SOON */}
            <section className="mb-12 space-y-6 pt-4 border-t border-gray-200">
                <h2 className="text-2xl font-semibold tracking-tight mb-3">Coming Soon</h2>

                {resourcesData.items
                    .filter(item => item.status === "coming-soon")
                    .map((item, i) => (
                        <div
                            key={i}
                            className="border p-4 rounded-lg space-y-2 opacity-60 transition hover:shadow-md"
                        >
                            <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                            <p className="text-gray-600">This resource is currently in preparation and will be added soon.</p>
                            {itemDescriptions[item.title] && <p className="text-gray-600">{itemDescriptions[item.title]}</p>}
                        </div>
                    ))}
            </section>

            {/* SAMPLE PAGES */}
            <section className="mb-12 space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight mb-3">Sample Pages</h2>

                <div className="grid grid-cols-2 gap-4">
                    <img
                        src="/sample-pages/arise-o-lord-page1.jpg"
                        alt="Sample Page 1"
                        className="rounded-lg cursor-pointer hover:opacity-80 transition"
                        onClick={() => setLightboxImage('/sample-pages/arise-o-lord-page1.jpg')}
                    />
                    <img
                        src="/sample-pages/arise-o-lord-page2.jpg"
                        alt="Sample Page 2"
                        className="rounded-lg cursor-pointer hover:opacity-80 transition"
                        onClick={() => setLightboxImage('/sample-pages/arise-o-lord-page2.jpg')}
                    />
                </div>
            </section>

            {/* FOOTER */}
            <section className="mt-12 text-sm text-gray-600">
                <a href="/sheet-music/arise-o-lord" className="underline opacity-70 hover:opacity-100 transition">
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
                        "name": resourcesData.title,
                        "description": resourcesData.description.join(" "),
                        "url": "https://hydromedon.com/sheet-music/arise-o-lord/resources"
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
                                "name": "Arise, O Lord",
                                "item": "https://hydromedon.com/sheet-music/arise-o-lord"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": "Resources",
                                "item": "https://hydromedon.com/sheet-music/arise-o-lord/resources"
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
                        "name": "Arise, O Lord Resources",
                        "itemListElement": resourcesData.items.map((item, index) => ({
                            "@type": "ListItem",
                            "position": index + 1,
                            "name": item.title,
                            "url":
                                item.status === "available"
                                    ? resourcesData.leadSheetUrl
                                    : "https://hydromedon.com/sheet-music/arise-o-lord/resources"
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
