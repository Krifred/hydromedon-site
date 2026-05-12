import type { MetadataRoute } from "next";
import { releases } from "@/lib/releases";
import { lyricsByRelease } from "@/lib/lyrics";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: SITE_URL,                  lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
        { url: `${SITE_URL}/music`,       lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
        { url: `${SITE_URL}/about`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/merch`,       lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
        { url: `${SITE_URL}/explore`,     lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    ];

    // Released singles, albums, and videos
    const releasePages: MetadataRoute.Sitemap = releases
        .filter((r) => !r.releaseDate || new Date(r.releaseDate) <= now)
        .map((r) => ({
            url: `${SITE_URL}/single/${r.slug}`,
            lastModified: r.releaseDate ? new Date(r.releaseDate) : now,
            changeFrequency: "monthly" as const,
            priority: r.type === "Album" ? 0.9 : 0.8,
        }));

    // Lyrics pages
    const lyricsPages: MetadataRoute.Sitemap = Object.keys(lyricsByRelease).map((slug) => ({
        url: `${SITE_URL}/lyrics/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    // Genre explore pages
    const genres = new Set<string>();
    for (const r of releases) {
        for (const g of r.genres ?? []) genres.add(g);
    }
    const genrePages: MetadataRoute.Sitemap = [...genres].map((genre) => ({
        url: `${SITE_URL}/explore/${genre}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticPages, ...releasePages, ...lyricsPages, ...genrePages];
}
