import Link from "next/link";
import { notFound } from "next/navigation";

import FadeIn from "@/components/FadeIn";
import { formatGenreLabel } from "@/components/GenreCard";
import SongCard from "@/components/SongCard";
import { releases } from "@/lib/releases";
import type { GenreSlug } from "@/lib/types";

export const dynamicParams = false;

export async function generateStaticParams() {
    const genres = new Set<GenreSlug>();
    for (const release of releases) {
        for (const genre of release.genres ?? []) {
            genres.add(genre);
        }
    }
    return [...genres].map((genre) => ({ genre }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ genre: string }>;
}) {
    const { genre } = await params;
    return {
        title: `${formatGenreLabel(genre)} Music | Hydromedon`,
    };
}

export default async function GenrePage({
    params,
}: {
    params: Promise<{ genre: string }>;
}) {
    const { genre } = await params;
    const filtered = releases.filter((r) =>
        r.genres?.includes(genre as GenreSlug)
    );

    if (filtered.length === 0) notFound();

    // Albums first, then singles, then videos; within each group newest first
    const typeOrder: Record<string, number> = { Album: 0, Single: 1, Video: 2 };
    const sorted = [...filtered].sort((a, b) => {
        const tDiff = (typeOrder[a.type] ?? 9) - (typeOrder[b.type] ?? 9);
        if (tDiff !== 0) return tDiff;
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    });

    return (
        <main className="min-h-screen bg-black text-white">
            <section className="mx-auto max-w-4xl px-4 py-16">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-400">
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link href="/explore" className="transition hover:text-yellow-400">
                                Explore
                            </Link>
                        </li>
                        <li className="opacity-60">/</li>
                        <li className="font-medium text-yellow-300">
                            {formatGenreLabel(genre)}
                        </li>
                    </ol>
                </nav>

                <FadeIn delayMs={0}>
                    <h1 className="mb-2 text-4xl font-bold tracking-tight text-yellow-400 drop-shadow-[0_0_18px_rgba(212,175,55,0.35)]">
                        {formatGenreLabel(genre)}
                    </h1>
                    <p className="mb-10 text-gray-400">
                        {sorted.length} {sorted.length === 1 ? "release" : "releases"}
                    </p>
                </FadeIn>

                <div className="flex flex-col gap-4">
                    {sorted.map((release, idx) => (
                        <FadeIn key={release.slug} delayMs={80 + idx * 60}>
                            <SongCard release={release} />
                        </FadeIn>
                    ))}
                </div>
            </section>
        </main>
    );
}
