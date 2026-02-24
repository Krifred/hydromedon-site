"use client";

import FadeIn from "./FadeIn";
import { singleReleases, albumReleases, videoReleases } from "@/lib/releases";
import MusicCard from "./MusicCard";
import Link from "next/link";

export default function MusicPreview() {
    const singles = singleReleases();
    const albums = albumReleases();
    const videos = videoReleases();

    const latestSingle = singles[0];
    const featuredAlbum = albums[0];
    const latestVideo = videos[0];

    return (
        <section
            id="music"
            className="relative max-w-6xl mx-auto px-4 py-20 text-gray-200"
        >
            <div className="mx-auto max-w-3xl px-6 text-center mb-10">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                {latestSingle && (
                    <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-yellow-500/80 text-center">
                            Latest Single
                        </p>
                        <MusicCard rel={latestSingle} idx={0} />
                    </div>
                )}
                {featuredAlbum && (
                    <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-yellow-500/80 text-center">
                            Featured Album
                        </p>
                        <MusicCard rel={featuredAlbum} idx={1} />
                    </div>
                )}
                {latestVideo && (
                    <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-yellow-500/80 text-center">
                            Latest Video
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
