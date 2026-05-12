import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import GenreCard from "@/components/GenreCard";
import { releases } from "@/lib/releases";
import type { GenreSlug } from "@/lib/types";
import { abs, DEFAULT_OG_IMAGE, SITE_NAME, TWITTER_HANDLE } from "@/lib/seo";

export const dynamicParams = false;

export const metadata: Metadata = {
    title: `Explore by Genre | ${SITE_NAME}`,
    description: `Explore Hydromedon's music by genre — dream pop, cinematic worship, shoegaze, ambient, and more.`,
    alternates: { canonical: abs("/explore") },
    openGraph: {
        type: "website",
        url: abs("/explore"),
        title: `Explore by Genre | ${SITE_NAME}`,
        description: `Explore Hydromedon's music by genre — dream pop, cinematic worship, shoegaze, ambient, and more.`,
        images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
        card: "summary_large_image",
        site: TWITTER_HANDLE,
        title: `Explore by Genre | ${SITE_NAME}`,
        description: `Explore Hydromedon's music by genre.`,
        images: [DEFAULT_OG_IMAGE],
    },
};

const GENRE_DESCRIPTORS: Record<GenreSlug, string> = {
    "dream-pop": "Ethereal textures and devotional depth",
    "worship": "Songs shaped for communal prayer and praise",
    "cinematic": "Visual storytelling through sound and image",
    "shoegaze": "Walls of sound and introspective drift",
    "instrumental": "Pure melody, no words needed",
    "ambient": "Space, silence, and the sacred",
    "classical-fusion": "Ancient forms, new devotion",
    "synthpop": "Bright melodies wrapped in electronic warmth",
};

export default function ExplorePage() {
    const genreCounts = new Map<GenreSlug, number>();
    for (const release of releases) {
        for (const genre of release.genres ?? []) {
            genreCounts.set(genre, (genreCounts.get(genre) ?? 0) + 1);
        }
    }

    const activeGenres = [...genreCounts.entries()]
        .filter(([, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]);

    return (
        <main className="min-h-screen bg-black text-white">
            <section className="mx-auto max-w-5xl px-4 py-16">
                <FadeIn delayMs={0}>
                    <h1 className="mb-3 text-4xl font-bold tracking-tight text-yellow-400 drop-shadow-[0_0_18px_rgba(212,175,55,0.35)]">
                        Explore
                    </h1>
                    <p className="mb-12 text-gray-400">
                        Browse the music by genre and sound.
                    </p>
                </FadeIn>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {activeGenres.map(([genre, count], idx) => (
                        <FadeIn key={genre} delayMs={80 + idx * 80}>
                            <GenreCard
                                genre={genre}
                                count={count}
                                descriptor={GENRE_DESCRIPTORS[genre]}
                            />
                        </FadeIn>
                    ))}
                </div>
            </section>
        </main>
    );
}
