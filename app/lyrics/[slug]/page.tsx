import Breadcrumbs from "@/components/Breadcrumbs";
import FadeIn from "@/components/FadeIn";
import { getReleaseBySlug } from "@/lib/releases";
import { lyricsByRelease } from "@/lib/lyrics";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
    return Object.keys(lyricsByRelease).map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}) {
    const release = getReleaseBySlug(params.slug);

    return {
        title: release ? `Lyrics — ${release.title} — Hydromedon` : "Lyrics — Hydromedon",
    };
}

export default function LyricsPage({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = params;

    const release = getReleaseBySlug(slug);
    if (!release) notFound();

    // This is a map: { [trackTitle: string]: { lyrics: string } }
    const releaseLyrics = lyricsByRelease[slug];
    if (!releaseLyrics) notFound();

    const tracks = Object.entries(releaseLyrics);

    // If somehow a release exists but has zero lyric entries, treat as not found
    if (tracks.length === 0) notFound();

    return (
        <main>
            <section className="max-w-5xl mx-auto px-4 py-8">
                <Breadcrumbs release={release} />

                <div className="text-center mt-6 max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-yellow-400 mb-2 drop-shadow">
                        {release.title}
                    </h1>

                    {release.subtitle && (
                        <div className="text-lg text-gray-300 mb-2">{release.subtitle}</div>
                    )}

                    {release.releaseDate && (
                        <div className="text-sm text-yellow-300 mb-6">
                            Released: {release.releaseDate}
                        </div>
                    )}
                </div>
            </section>

            <div className="mt-6 max-w-3xl mx-auto px-4">
                <FadeIn delayMs={200} durationMs={1400} y={16}>
                    <h2 className="text-xl font-bold text-yellow-400 mb-4">Lyrics</h2>
                </FadeIn>

                <div className="space-y-10">
                    {tracks.map(([trackTitle, trackObj], idx) => (
                        <FadeIn
                            key={`${trackTitle}-${idx}`}
                            delayMs={320 + idx * 120}
                            durationMs={1100}
                            y={12}
                        >
                            <div className="rounded-lg border border-white/10 bg-black/30 px-5 py-4">
                                <div className="mb-3 text-sm font-semibold text-yellow-300 tracking-wide">
                                    {trackTitle}
                                </div>

                                <pre className="whitespace-pre-wrap font-serif text-gray-200 leading-relaxed">
                                    {trackObj.lyrics}
                                </pre>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <p className="text-xs text-gray-500 mt-12 mb-4 text-center opacity-70">
                    © {new Date().getFullYear()} Hydromedon. All lyrics are copyrighted. All rights reserved.
                </p>
            </div>
        </main>
    );
}