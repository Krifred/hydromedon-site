import Breadcrumbs from "@/components/Breadcrumbs";
import { getReleaseBySlug, releases } from "@/lib/releases";
import { notFound } from "next/navigation";
import Link from "next/link";

/* =========================
   Helpers
   ========================= */

function withUTM(url?: string, source = "hydromedon-site") {
    if (!url) return undefined;

    try {
        const u = new URL(url);
        u.searchParams.set("utm_source", source);
        u.searchParams.set("utm_medium", "artist_site");
        u.searchParams.set("utm_campaign", "album_launch");
        return u.toString();
    } catch {
        return url;
    }
}

function getPrimaryListenLink(release: any) {
    if (release.type === "Video") {
        return {
            href: withUTM(release.youtube),
            label: "▶ Watch on YouTube",
        };
    }

    return {
        href: withUTM(release.hyperfollow || release.spotify),
        label: "▶ Listen on Spotify",
    };
}

/* =========================
   Next.js config
   ========================= */

export const dynamicParams = false;

export async function generateStaticParams() {
    return releases.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}) {
    const release = getReleaseBySlug(params.slug);

    return {
        title: release ? `${release.title} — Hydromedon` : "Hydromedon",
    };
}

/* =========================
   Page
   ========================= */

export default function AlbumPage({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = params;
    const release = getReleaseBySlug(slug);

    if (!release) notFound();

    return (
        <main>
            <section className="max-w-5xl mx-auto px-4 py-8">
                <Breadcrumbs release={release} />

                {release.type === "Album" ? (
                    <>
                        {/* Title / Subtitle */}
                        <div className="text-left mt-6 mb-6">
                            <h1 className="text-4xl font-bold text-yellow-400 mb-2 drop-shadow">
                                {release.title}
                            </h1>

                            {release.subtitle && (
                                <div className="text-lg text-gray-300 mb-1">
                                    {release.subtitle}
                                </div>
                            )}

                            {release.releaseDate && (
                                <div className="text-sm text-yellow-300">
                                    Released: {release.releaseDate}
                                </div>
                            )}
                        </div>

                        {/* Artwork + CTA + Tracklist */}
                        <div className="grid grid-cols-1 gap-8 items-start">
                            {/* Album Artwork + CTA */}
                            <div className="flex flex-col items-center">
                                {release.cover && (
                                    <img
                                        src={release.cover}
                                        alt={release.title}
                                        className="w-[220px] h-[220px] object-contain rounded-xl border border-white/10 shadow-xl"
                                    />
                                )}

                                {(() => {
                                    const cta = getPrimaryListenLink(release);
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
                                    {release.spotify && (
                                        <a
                                            href={withUTM(release.spotify)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-green-400 transition"
                                        >
                                            Spotify
                                        </a>
                                    )}

                                    {release.youtube && (
                                        <a
                                            href={withUTM(release.youtube)}
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
                            {Array.isArray(release.tracks) && (
                                <div className="text-left">
                                    <div className="mb-4 text-sm text-gray-400">Tracklist</div>

                                    <ol className="space-y-3">
                                        {release.tracks.map((track, idx) => {
                                            const linkedSingle = releases.find(
                                                (r) =>
                                                    r.type === "Single" &&
                                                    r.title.toLowerCase() ===
                                                    track.title.toLowerCase()
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
                            {release.title}
                        </h1>

                        {release.subtitle && (
                            <div className="text-lg text-gray-300 mb-2">
                                {release.subtitle}
                            </div>
                        )}

                        {release.releaseDate && (
                            <div className="text-sm text-yellow-300 mb-6">
                                Released: {release.releaseDate}
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* ✅ Lyrics intentionally NOT rendered here.
          Lyrics live exclusively at /lyrics/[slug]. */}
        </main>
    );
}
``