"use client";

import FadeIn from "./FadeIn";
import Link from "next/link";
import type { Release } from "@/lib/releases";
import { useEffect, useMemo, useState } from "react";

function formatReleaseDate(dateStr: string) {
    // Expects YYYY-MM-DD (your data matches this)
    const [y, m, d] = dateStr.split("-").map(Number);
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    if (!y || !m || !d || m < 1 || m > 12) return dateStr;
    return `${months[m - 1]} ${d}, ${y}`;
}

export default function MusicCard({
    rel,
    idx,
}: {
    rel: Release;
    idx: number;
}) {
    // Compute "now" only on the client after mount to avoid hydration mismatches.
    const [nowMs, setNowMs] = useState<number | null>(null);

    useEffect(() => {
        setNowMs(Date.now());
    }, []);

    const isFuture = useMemo(() => {
        if (nowMs == null) return false;
        // Treat releaseDate as an all-day UTC date; allow the whole day to count as "released"
        const releaseEndUtc = Date.parse(`${rel.releaseDate}T23:59:59Z`);
        return releaseEndUtc > nowMs;
    }, [nowMs, rel.releaseDate]);

    const badge =
        rel.type === "Album" ? (
            <span className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded shadow">
                Album
            </span>
        ) : rel.type === "Video" ? (
            <span className="absolute top-2 left-2 border border-yellow-400 text-yellow-400 text-xs font-bold px-2 py-1 rounded shadow bg-black/60">
                Video
            </span>
        ) : null;

    // "Coming Soon" badge for any future release (Single/Album/Video)
    const comingSoonBadge = isFuture ? (
        <span className="absolute top-2 right-2 border border-yellow-400 text-yellow-400 text-xs font-bold px-2 py-1 rounded shadow bg-black/60">
            Coming Soon
        </span>
    ) : null;

    return (
        <FadeIn delayMs={120 + idx * 120}>
            <div className="bg-black/80 rounded-xl shadow-lg overflow-hidden flex flex-col items-center p-6 border border-yellow-900/30 transition group hover:shadow-2xl hover:border-yellow-400/60 hover:-translate-y-1 hover:scale-[1.025] hover:z-10 duration-300">
                <Link href={`/music/${rel.slug}`} className="w-full block">
                    <div className="relative w-full aspect-square bg-zinc-900 rounded-lg mb-4 overflow-hidden flex items-center justify-center cursor-pointer">
                        {badge}
                        {comingSoonBadge}
                        <img
                            src={rel.cover}
                            alt={rel.title}
                            className="object-cover w-full h-full group-hover:shadow-[0_0_32px_0_rgba(212,175,55,0.25)] transition"
                            loading="lazy"
                        />
                    </div>

                    <div className="flex flex-col items-center gap-1 mb-4">
                        <div className="text-lg font-semibold text-white tracking-wide">
                            {rel.title}
                        </div>

                        <div className="text-sm text-yellow-300 font-mono">
                            {rel.year}
                        </div>

                        {/* Show future release date (only when in the future) */}
                        {isFuture && (
                            <div className="text-xs text-yellow-300 font-mono opacity-80">
                                Releases {formatReleaseDate(rel.releaseDate)}
                            </div>
                        )}

                        {rel.subtitle && (
                            <div className="text-xs text-gray-400 mt-1 text-center">
                                {rel.subtitle}
                            </div>
                        )}
                    </div>
                </Link>

                <div className="flex gap-4 mt-auto">
                    {rel.spotify && (
                        <a
                            href={rel.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 rounded bg-yellow-500 text-black font-semibold text-sm shadow hover:bg-yellow-400 transition"
                        >
                            Spotify
                        </a>
                    )}
                    {rel.youtube && (
                        <a
                            href={rel.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 rounded border border-yellow-500 text-yellow-500 font-semibold text-sm hover:bg-yellow-500 hover:text-black transition"
                        >
                            YouTube
                        </a>
                    )}
                </div>
            </div>
        </FadeIn>
    );
}
