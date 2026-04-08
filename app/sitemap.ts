import type { MetadataRoute } from "next";
import { releases } from "@/lib/releases";
import { compositions } from "@/data/compositions";

const BASE_URL = "https://www.hydromedon.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // ── Static pages ───────────────────────────────────────────────────────────
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/music`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/sheet-music`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/merch`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/licensing`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/about/recommended-sites`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.4,
        },
    ];

    // ── Music release pages ────────────────────────────────────────────────────
    // Only include releases that are already out
    const releasedReleases = releases.filter(
        (r) => new Date(r.releaseDate) <= now
    );

    const releasePages: MetadataRoute.Sitemap = releasedReleases.map((r) => ({
        url: `${BASE_URL}/music/${r.slug}`,
        lastModified: new Date(r.releaseDate),
        changeFrequency: "monthly" as const,
        priority: r.type === "Album" ? 0.85 : 0.75,
    }));

    // ── Sheet music composition pages ──────────────────────────────────────────
    // Include all compositions — available and coming-soon
    // (coming-soon pages are live, just don't have a purchase link yet)
    const compositionPages: MetadataRoute.Sitemap = compositions.map((c) => {
        const leadScore = c.scores.find((s) => s.type === "Lead Sheet");
        const isAvailable = leadScore?.status === "available";

        return {
            url: `${BASE_URL}/sheet-music/${c.slug}`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: isAvailable ? 0.8 : 0.6,
        };
    });

    // ── Lyrics pages ───────────────────────────────────────────────────────────
    const lyricPages: MetadataRoute.Sitemap = releasedReleases
        .filter((r) => r.type === "Single" || r.type === "Album")
        .map((r) => ({
            url: `${BASE_URL}/lyrics/${r.slug}`,
            lastModified: new Date(r.releaseDate),
            changeFrequency: "monthly" as const,
            priority: 0.5,
        }));

    return [
        ...staticPages,
        ...releasePages,
        ...compositionPages,
        ...lyricPages,
    ];
}
