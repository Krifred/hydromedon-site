import Breadcrumbs from "@/components/Breadcrumbs";
import FadeIn from "@/components/FadeIn";
import { getReleaseBySlug, releases } from "@/lib/releases";
import { hydrateReleaseWithLyrics } from "@/lib/hydrateRelease";
import { notFound } from "next/navigation";
import Link from "next/link";

/* =========================
   Next.js config
   ========================= */

export const dynamicParams = false;

export async function generateStaticParams() {
    return releases.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const release = getReleaseBySlug(slug);

    return {
        title: release ? `${release.title} — Hydromedon` : "Hydromedon",
    };
}

/* =========================
   Page
   ========================= */

export default async function SongPage({ params }) {
    const { slug } = await params;
    const release = getReleaseBySlug(slug);

    if (!release) notFound();

    // ⭐ THE FIX — hydrate lyrics + liner notes
    const hydrated = hydrateReleaseWithLyrics(release);

    return (
        <main>
            <section className="max-w-5xl mx-auto px-4 py-8">
                <Breadcrumbs release={hydrated} />

                {hydrated.type === "Album" ? (
                    <>
                        {/* Title / Subtitle */}
                        <div className="text-left mt-6 mb-6">
                            <h1 className="text-4xl font-bold text-yellow-400 mb-2 drop-shadow">
                                {hydrated.title}
                            </h1>

                            {hydrated.subtitle && (
                                <div className="text-lg text-gray-300 mb-1">
                                    {hydrated.subtitle}
                                </div>
                            )}

                            {hydrated.releaseDate && (
                                <div className="text-sm text-yellow-300">
                                    Released: {hydrated.releaseDate}
                                </div>
                            )}
                        </div>

                        {/* Artwork + CTA + Tracklist */}
                        <div className="grid grid-cols-1 gap-8 items-start">
                            {/* Album Artwork + CTA */}
                            <div className="flex flex-col items-center">
                                <img
                                    src={hydrated.cover}
                                    alt={hydrated.title}
                                    className="w-[220px] h-[220px] object-contain rounded-xl border border-white/10 shadow-xl"
                                />

                                {/* Primary CTA */}
                                {(() => {
                                    const cta = hydrated.type === "Video"
                                        ? { href: hydrated.youtube, label: "▶ Watch on YouTube" }
                                        : { href: hydrated.hyperfollow || hydrated.spotify, label: "▶ Listen on Spotify" };

                                    if (!cta?.href) return null;

                                    return (
                                        <a
                                            href={cta.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                                mt-8 inline-flex items-center gap-3
                                                rounded-full
                                                bg-yellow-500 px-7 py-3
                                                text-sm font-bold uppercase tracking-wide text-black
                                                shadow-lg shadow-yellow-500/40
                                                animate-pulse
                                                transition
                                                hover:bg-yellow-400 hover:scale-105 hover:shadow-yellow-400/60 hover:animate-none
                                                focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black
                                                active:scale-95
                                            "
                                        >
                                            {cta.label}
                                        </a>
                                    );
                                })()}

                                {/* Secondary platform links */}
                                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
                                    {hydrated.spotify && (
                                        <a
                                            href={hydrated.spotify}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-green-400 transition"
                                        >
                                            Spotify
                                        </a>
                                    )}

                                    {hydrated.youtube && (
                                        <a
                                            href={hydrated.youtube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-red-400 transition"
                                        >
                                            YouTube
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Tracklist */}
                            {Array.isArray(hydrated.tracks) && (
                                <div className="text-left">
                                    <div className="mb-4 text-sm text-gray-400">Tracklist</div>

                                    <ol className="space-y-3">
                                        {hydrated.tracks.map((track, idx) => {
                                            const linkedSingle = releases.find(
                                                (r) =>
                                                    r.type === "Single" &&
                                                    r.title.toLowerCase() === track.title.toLowerCase()
                                            );

                                            return (
                                                <li
                                                    key={`${track.title}-${idx}`}
                                                    className="flex items-center justify-between rounded-md border border-white/10 bg-black/30 px-4 py-3 hover:border-yellow-500/40 transition"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs text-gray-500">
                                                            {String(idx + 1).padStart(2, "0")}
                                                        </span>

                                                        {linkedSingle ? (
                                                            <Link
                                                                href={`/music/${linkedSingle.slug}`}
                                                                className="text-yellow-300 hover:underline"
                                                            >
                                                                {track.title}
                                                            </Link>
                                                        ) : (
                                                            <span className="text-gray-200">
                                                                {track.title}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {track.duration && (
                                                        <span className="text-xs text-gray-500">
                                                            {track.duration}
                                                        </span>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ol>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    /* Singles / Videos */
                    <div className="text-center mt-6 max-w-3xl mx-auto">
                        <h1 className="text-4xl font-bold text-yellow-400 mb-2 drop-shadow">
                            {hydrated.title}
                        </h1>

                        {hydrated.subtitle && (
                            <div className="text-lg text-gray-300 mb-2">
                                {hydrated.subtitle}
                            </div>
                        )}

                        {hydrated.releaseDate && (
                            <div className="text-sm text-yellow-300 mb-6">
                                Released: {hydrated.releaseDate}
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Lyrics + Liner Notes */}
            {Array.isArray(hydrated.tracks) &&
                hydrated.tracks.some((t) => t.lyrics) && (
                    <div className="mt-12 max-w-3xl mx-auto px-4">
                        <FadeIn delayMs={200} durationMs={1400} y={16}>
                            <h2 className="text-xl font-bold text-yellow-400 mb-4">
                                Lyrics
                            </h2>
                        </FadeIn>

                        <div className="space-y-10">
                            {hydrated.tracks
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

                                            {track.linerNotes && (
                                                <>
                                                    <div className="my-6 border-t border-yellow-500/20" />

                                                    <div className="text-gray-300 space-y-4">
                                                        {track.linerNotes.personalContext && (
                                                            <p><strong>Personal Context:</strong> {track.linerNotes.personalContext}</p>
                                                        )}
                                                        {track.linerNotes.musicalChoices && (
                                                            <p><strong>Musical Choices:</strong> {track.linerNotes.musicalChoices}</p>
                                                        )}
                                                        {track.linerNotes.thematicReflection && (
                                                            <p><strong>Thematic Reflection:</strong> {track.linerNotes.thematicReflection}</p>
                                                        )}
                                                        {track.linerNotes.scriptureReferences && (
                                                            <p><strong>Scripture:</strong> {track.linerNotes.scriptureReferences.join(", ")}</p>
                                                        )}
                                                        {track.linerNotes.writtenDuring && (
                                                            <p><strong>Written During:</strong> {track.linerNotes.writtenDuring}</p>
                                                        )}
                                                        {track.linerNotes.moodTags && (
                                                            <p><strong>Mood:</strong> {track.linerNotes.moodTags.join(", ")}</p>
                                                        )}
                                                    </div>
                                                </>
                                            )}

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
