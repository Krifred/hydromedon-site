"use client";
import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { compositions } from '@/data/compositions';
import {
  buildScoreProductJsonLd,
  buildBreadcrumbJsonLdForResources,
  buildResourcesWebPageJsonLd,
} from "@/lib/schema/sheetMusic";

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
                <h1 className="text-4xl font-bold tracking-tight mb-6">{composition.title} â€” Resources</h1>
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
                        alt={`${composition.title} â€” Sample Page`}
                        className="rounded-lg cursor-pointer hover:opacity-80 transition"
                        onClick={() => setLightboxImage(composition.sampleImage)}
                    />
                </div>
            </section>

            {/* FOOTER */}
            <section className="mt-12 text-sm text-gray-600">
                <a href={`/sheet-music/${slug}`} className="underline opacity-70 hover:opacity-100 transition">
                    â† Back to Composition Page
                </a>
            </section>

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

            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(
                            buildResourcesWebPageJsonLd(composition, slug)
                        ),
                    }}
                />

                {composition.scores.map((score) => (
                    <script
                        key={score.type}
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(
                                buildScoreProductJsonLd(composition, slug, score)
                            ),
                        }}
                    />
                ))}

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(
                            buildBreadcrumbJsonLdForResources(composition, slug)
                        ),
                    }}
                />
            </>
        </main>
    );
}
