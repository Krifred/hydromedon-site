import type { Metadata } from "next";
import Link from "next/link";
import { releases } from "@/lib/releases";
import type { GenreSlug } from "@/lib/types";

export const metadata: Metadata = {
    title: "Explore — Hydromedon",
    description: "Browse Hydromedon music by genre and mood.",
};

export const GENRE_META: Record<GenreSlug, { label: string; description: string }> = {
    "dream-pop":        { label: "Dream Pop",        description: "Layered textures, ethereal vocals, cinematic space" },
    "worship":          { label: "Worship",          description: "Songs written for the presence of God" },
    "shoegaze":         { label: "Shoegaze",         description: "Wall-of-sound guitars, submerged melodies" },
    "instrumental":     { label: "Instrumental",     description: "No words — just atmosphere and feeling" },
    "ambient":          { label: "Ambient",          description: "Slow, spacious, meditative soundscapes" },
    "cinematic":        { label: "Cinematic",        description: "Music written like a film score" },
    "classical-fusion": { label: "Classical Fusion", description: "Sacred music meeting orchestral tradition" },
};

const ALL_GENRES = Object.keys(GENRE_META) as GenreSlug[];

const singles = releases.filter((r) => r.type === "Single");

function countForGenre(genre: GenreSlug): number {
    return singles.filter((r) => r.genres?.includes(genre)).length;
}

export default function ExplorePage() {
    const genresWithSongs = ALL_GENRES.filter((g) => countForGenre(g) > 0);

    return (
        <main className="max-w-5xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="mb-10 border-b border-yellow-900/40 pb-6">
                <h1 className="text-4xl font-bold text-yellow-400 mb-2 tracking-tight">
                    Explore
                </h1>
                <p className="text-sm text-gray-400 uppercase tracking-widest">
                    Browse by genre
                </p>
            </div>

            {/* Genre grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {genresWithSongs.map((genre) => {
                    const { label, description } = GENRE_META[genre];
                    const count = countForGenre(genre);

                    return (
                        <Link
                            key={genre}
                            href={`/explore/${genre}`}
                            className="group relative flex flex-col justify-between rounded-lg border border-yellow-900/50 bg-black/60 p-5 shadow-lg transition-all duration-300 hover:border-yellow-500/70 hover:bg-yellow-950/30 hover:shadow-yellow-900/30"
                        >
                            {/* Decorative corner accent */}
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute top-0 left-0 h-6 w-6 border-t border-l border-yellow-600/40 rounded-tl-lg transition-colors duration-300 group-hover:border-yellow-400/70"
                            />
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b border-r border-yellow-600/40 rounded-br-lg transition-colors duration-300 group-hover:border-yellow-400/70"
                            />

                            <div>
                                <h2 className="text-lg font-semibold text-yellow-300 mb-1 group-hover:text-yellow-200 transition-colors duration-200">
                                    {label}
                                </h2>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {description}
                                </p>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-xs font-medium text-indigo-400 tracking-wide">
                                    {count} {count === 1 ? "song" : "songs"}
                                </span>
                                <span className="text-yellow-600 group-hover:text-yellow-400 transition-colors duration-200 text-sm">
                                    →
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}
