"use client";

import { useRef } from "react";
import FadeIn from "./FadeIn";
import {
    singleReleases,
    albumReleases,
    videoReleases,
    Release,
} from "@/lib/releases";
import MusicCard from "./MusicCard";
import Link from "next/link";
import { useMotionSection } from "./useMotionSection";

function isFutureRelease(r: Release, now: Date) {
    return new Date(r.releaseDate).getTime() > now.getTime();
}

function latestReleased(items: Release[], now: Date): Release | undefined {
    return [...items]
        .filter((r) => new Date(r.releaseDate).getTime() <= now.getTime())
        .sort(
            (a, b) =>
                new Date(b.releaseDate).getTime() -
                new Date(a.releaseDate).getTime()
        )[0];
}

function nextUpcoming(items: Release[], now: Date): Release | undefined {
    return [...items]
        .filter((r) => new Date(r.releaseDate).getTime() > now.getTime())
        .sort(
            (a, b) =>
                new Date(a.releaseDate).getTime() -
                new Date(b.releaseDate).getTime()
        )[0];
}

export default function MusicPreview() {
    const sectionRef = useRef<HTMLElement>(null);

    // 🎬 Motion: spotlight feels right for “featured / latest”
    useMotionSection(sectionRef, {
        preset: "spotlight",
        once: true,
    });

    const singles = singleReleases();
    const albums = albumReleases();
    const videos = videoReleases();

    const now = new Date();

    const latestSingle = latestReleased(singles, now) ?? nextUpcoming(singles, now);
    const latestVideo = latestReleased(videos, now) ?? nextUpcoming(videos, now);
    const featuredAlbum = albums[0];

    const latestSingleComingSoon = latestSingle
        ? isFutureRelease(latestSingle, now)
        : false;
    const latestVideoComingSoon = latestVideo
        ? isFutureRelease(latestVideo, now)
        : false;
    const featuredAlbumComingSoon = featuredAlbum
        ? isFutureRelease(featuredAlbum, now)
        : false;

    return (
        <section
            id="music"
            ref={sectionRef}
            className="motion-section relative max-w-6xl mx-auto px-4 py-20 text-gray-200"
        >
            <div className="mx-auto max-w-3xl px-6 text-center mb-12">
                <FadeIn delayMs={0}>
                    <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 tracking-tight drop-shadow-[0_0_18px_rgba(212,175,55,0.35)] mb-4">
                        Music
                    </h2>
                </FadeIn>

                <FadeIn delayMs={180}>
                    <p className="text-sm text-gray-400">
                        A glimpse into the Biblical Graffiti universe. Explore the full
                        library on the Music page.
                    </p>
                </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                {latestSingle && (
                    <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-yellow-500/80 text-center">
                            Latest Single
                            {latestSingleComingSoon && (
                                <span className="ml-2 inline-block rounded-full border border-yellow-500/50 px-2 py-[2px] text-[10px] tracking-[0.15em] text-yellow-400/90">
                                    Coming Soon
                                </span>
                            )}
                        </p>
                        <MusicCard rel={latestSingle} idx={0} />
                    </div>
                )}

                {featuredAlbum && (
                    <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-yellow-500/80 text-center">
                            Featured Album
                            {featuredAlbumComingSoon && (
                                <span className="ml-2 inline-block rounded-full border border-yellow-500/50 px-2 py-[2px] text-[10px] tracking-[0.15em] text-yellow-400/90">
                                    Coming Soon
                                </span>
                            )}
                        </p>
                        <MusicCard rel={featuredAlbum} idx={1} />
                    </div>
                )}

                {latestVideo && (
                    <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-yellow-500/80 text-center">
                            Latest Video
                            {latestVideoComingSoon && (
                                <span className="ml-2 inline-block rounded-full border border-yellow-500/50 px-2 py-[2px] text-[10px] tracking-[0.15em] text-yellow-400/90">
                                    Coming Soon
                                </span>
                            )}
                        </p>
                        <MusicCard rel={latestVideo} idx={2} />
                    </div>
                )}
            </div>

            <div className="flex justify-center">
                <Link
                    href="/music"
                    className="px-6 py-2 rounded border border-yellow-500 text-yellow-500 text-sm font-semibold hover:bg-yellow-500 hover:text-black transition"
                >
                    View full music library
                </Link>
            </div>
        </section>
    );
}