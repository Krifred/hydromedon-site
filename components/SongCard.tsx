import Link from "next/link";
import type { Release } from "@/lib/types";

export default function SongCard({ release }: { release: Release }) {
    const isVideo = release.type === "Video";
    const detailHref = `/music/${release.slug}`;

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-yellow-900/30 bg-black/80 p-4 shadow-lg transition duration-300 hover:border-yellow-400/40 sm:flex-row">
            {/* Cover */}
            <Link href={detailHref} className="shrink-0 self-start">
                <div className="h-24 w-24 overflow-hidden rounded-lg border border-white/10 sm:h-28 sm:w-28">
                    {release.cover && (
                        <img
                            src={release.cover}
                            alt={release.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    )}
                </div>
            </Link>

            {/* Content */}
            <div className="flex min-w-0 flex-col justify-between gap-3">
                <div>
                    {/* Title + type badge */}
                    <div className="mb-1 flex items-center gap-2">
                        <Link
                            href={detailHref}
                            className="truncate text-lg font-semibold text-white transition hover:text-yellow-300"
                        >
                            {release.title}
                        </Link>
                        {release.type !== "Single" && (
                            <span className="shrink-0 rounded border border-yellow-500/60 px-2 py-0.5 text-xs text-yellow-400">
                                {release.type}
                            </span>
                        )}
                    </div>

                    {/* Mood */}
                    {release.mood && (
                        <p className="mb-2 text-xs italic text-gray-400">{release.mood}</p>
                    )}

                    {/* Scripture */}
                    {release.bibleRef && (
                        <p className="mb-2 text-xs text-yellow-600">{release.bibleRef}</p>
                    )}

                    {/* Theme pills */}
                    {release.themes && release.themes.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {release.themes.map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-400"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                    <Link
                        href={detailHref}
                        className="text-xs font-semibold text-yellow-400 transition hover:text-yellow-300"
                    >
                        View →
                    </Link>

                    {!isVideo && release.spotify && (
                        <a
                            href={release.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded bg-yellow-500 px-3 py-1 text-xs font-semibold text-black transition hover:bg-yellow-400"
                        >
                            Spotify
                        </a>
                    )}

                    {isVideo && release.youtube && (
                        <a
                            href={release.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded border border-yellow-500 px-3 py-1 text-xs font-semibold text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
                        >
                            YouTube
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
