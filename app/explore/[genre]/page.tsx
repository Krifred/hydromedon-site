import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { releases } from "@/lib/releases";
import type { GenreSlug } from "@/lib/types";
import { GENRE_META } from "../page";

export const dynamicParams = false;

export async function generateStaticParams() {
    const ALL_GENRES = Object.keys(GENRE_META) as GenreSlug[];
    const singles = releases.filter((r) => r.type === "Single");

    return ALL_GENRES
        .filter((genre) => singles.some((r) => r.genres?.includes(genre)))
        .map((genre) => ({ genre }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ genre: string }>;
}): Promise<Metadata> {
    const { genre } = await params;
    const meta = GENRE_META[genre as GenreSlug];

    if (!meta) return { title: "Explore — Hydromedon" };

    return {
        title: `${meta.label} — Hydromedon`,
        description: meta.description,
    };
}

export default async function GenrePage({
    params,
}: {
    params: Promise<{ genre: string }>;
}) {
    const { genre } = await params;
    const meta = GENRE_META[genre as GenreSlug];

    if (!meta) notFound();

    const matches = releases.filter(
        (r) => r.type === "Single" && r.genres?.includes(genre as GenreSlug)
    );

    if (matches.length === 0) notFound();

    return (
        <main className="max-w-5xl mx-auto px-4 py-12">
            {/* Back link */}
            <Link
                href="/explore"
                className="inline-flex items-center gap-1 text-xs text-yellow-600 hover:text-yellow-400 uppercase tracking-widest mb-8 transition-colors duration-200"
            >
                ← Explore
            </Link>

            {/* Genre header */}
            <div className="mb-10 border-b border-yellow-900/40 pb-6">
                <h1 className="text-4xl font-bold text-yellow-400 mb-2 tracking-tight">
                    {meta.label}
                </h1>
                <p className="text-sm text-gray-400 max-w-xl leading-relaxed">
                    {meta.description}
                </p>
            </div>

            {/* Song list */}
            <div className="flex flex-col gap-4">
                {matches.map((release) => (
                    <Link
                        key={release.slug}
                        href={`/music/${release.slug}`}
                        className="group flex items-center gap-5 rounded-lg border border-yellow-900/40 bg-black/60 p-4 shadow-md transition-all duration-300 hover:border-yellow-500/60 hover:bg-yellow-950/25 hover:shadow-yellow-900/20"
                    >
                        {/* Cover */}
                        <div className="relative shrink-0 w-16 h-16 rounded overflow-hidden border border-yellow-900/50 group-hover:border-yellow-600/50 transition-colors duration-200">
                            {release.cover ? (
                                <Image
                                    src={release.cover}
                                    alt={release.title}
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-yellow-950/40 flex items-center justify-center text-yellow-700 text-xl">
                                    ♪
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h2 className="text-base font-semibold text-yellow-200 group-hover:text-yellow-100 truncate transition-colors duration-200">
                                {release.title}
                            </h2>

                            {release.subtitle && (
                                <p className="text-sm text-gray-400 truncate mt-0.5">
                                    {release.subtitle}
                                </p>
                            )}

                            {release.bibleRef && (
                                <span className="inline-block mt-1.5 text-xs text-indigo-400 tracking-wide font-medium">
                                    {release.bibleRef}
                                </span>
                            )}
                        </div>

                        {/* Arrow */}
                        <span className="shrink-0 text-yellow-700 group-hover:text-yellow-400 transition-colors duration-200 text-lg">
                            →
                        </span>
                    </Link>
                ))}
            </div>
        </main>
    );
}
