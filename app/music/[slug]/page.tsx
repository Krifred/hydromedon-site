import FadeIn from "@/components/FadeIn";
import { getReleaseBySlug, releases } from "@/lib/releases";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamicParams = false;

export async function generateStaticParams() {
    return releases.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const release = getReleaseBySlug(slug);

    return {
        title: release ? `${release.title} — Hydromedon` : "Hydromedon",
    };
}

export default async function SongPage({ params }) {
    const { slug } = await params;
    const release = getReleaseBySlug(slug);

    if (!release) notFound();

    return (
        <main>
            {/* ...all your hero, description, themes, tracklist... */}

            {/* ⭐ PLACE THE LYRICS BLOCK HERE — inside the return */}
            {Array.isArray(release.tracks) &&
                release.tracks.some((t) => t.lyrics) && (
                    <div className="mt-12">
                        <FadeIn delayMs={200} durationMs={1400} y={16}>
                            <h2 className="text-xl font-bold text-yellow-400 mb-4">
                                Lyrics
                            </h2>
                        </FadeIn>

                        <div className="space-y-10">
                            {release.tracks
                                .filter((t) => t.lyrics)
                                .map((track, idx) => (
                                    <FadeIn
                                        key={`${track.title}-lyrics-${idx}`}
                                        delayMs={320 + idx * 120}
                                        durationMs={1100}
                                        y={12}
                                    >
                                        <div className="rounded-lg border border-white/10 bg-black/30 px-5 py-4">
                                            <div className="mb-3 text-sm font-semibold text-yellow-300 tracking-wide">
                                                {track.title}
                                            </div>

                                            <pre className="whitespace-pre-wrap font-serif text-gray-200 leading-relaxed">
                                                {track.lyrics}
                                            </pre>
                                        </div>
                                    </FadeIn>
                                ))}
                        </div>

                        <p className="text-xs text-gray-500 mt-12 mb-4 text-center opacity-70">
                            © {new Date().getFullYear()} Hydromedon. All lyrics are copyrighted. All rights reserved.
                        </p>
                    </div>
                )}
        </main>
    );
}

