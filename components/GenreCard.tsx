import Link from "next/link";
import type { GenreSlug } from "@/lib/types";

export function formatGenreLabel(slug: GenreSlug | string): string {
    return slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

export default function GenreCard({
    genre,
    count,
    descriptor,
}: {
    genre: GenreSlug;
    count: number;
    descriptor: string;
}) {
    return (
        <Link
            href={`/explore/${genre}`}
            className="group relative flex flex-col justify-between rounded-xl border border-yellow-900/30 bg-black/80 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:scale-[1.025] hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-500/10"
        >
            <div>
                <h2 className="text-2xl font-bold text-yellow-400 tracking-tight drop-shadow-[0_0_12px_rgba(212,175,55,0.3)] transition group-hover:drop-shadow-[0_0_18px_rgba(212,175,55,0.5)]">
                    {formatGenreLabel(genre)}
                </h2>
                <p className="mt-1 text-sm italic text-gray-400">{descriptor}</p>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <span className="font-mono text-xs text-yellow-300">
                    {count} {count === 1 ? "release" : "releases"}
                </span>
                <span className="text-xs text-gray-500 transition group-hover:text-yellow-400">
                    Explore →
                </span>
            </div>
        </Link>
    );
}
