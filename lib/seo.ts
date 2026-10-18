/**
 * Shared SEO constants used across metadata and JSON-LD.
 */

export const SITE_URL = "https://hydromedon.com";
export const SITE_NAME = "Hydromedon";
export const SITE_DESCRIPTION =
    "Hydromedon is a Christian dream pop music project — cinematic, devotional, and atmospheric. Explore singles, albums, and lyrics from the Biblical Graffiti universe.";
export const TWITTER_HANDLE = "@Hydromedon";

/** Default OG image shown when no release cover is available. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/brand/logo/hydromedon_logo_dark.png`;

/** Absolute URL helper. */
export function abs(path: string): string {
    return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type SeoRelease = {
    slug: string;
    title: string;
    artists?: string[];
    description?: string;
    subtitle?: string;
    cover?: string;
    spotify?: string;
    youtube?: string;
    releaseDate?: string;
    label?: string;
    upc?: string;
    tracks?: { duration?: string }[];
};

/** Canonical path for a release detail page. */
export function releasePath(slug: string): string {
    return `/music/${slug}`;
}

/** Credited artists; defaults to Hydromedon alone. */
export function releaseArtists(release: SeoRelease): string[] {
    return release.artists?.length ? release.artists : [SITE_NAME];
}

/** Release-specific metadata (title, description, canonical, OG, Twitter). */
export function releaseMetadata(release: SeoRelease) {
    const artists = releaseArtists(release);
    const credit = artists.join(" × ");
    const title = `${release.title} — ${credit}`;
    const description =
        release.description ?? release.subtitle ?? `Listen to ${release.title} by ${artists.join(" & ")}.`;
    const ogImage = release.cover ? abs(release.cover) : DEFAULT_OG_IMAGE;
    const url = abs(releasePath(release.slug));
    const alt = `${release.title} — ${credit} cover art`;

    return {
        title: { absolute: title },
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "music.song",
            url,
            title,
            description,
            siteName: SITE_NAME,
            images: [{ url: ogImage, alt }],
        },
        twitter: {
            card: "summary_large_image" as const,
            site: TWITTER_HANDLE,
            title,
            description,
            images: [{ url: ogImage, alt }],
        },
    };
}

/**
 * MusicRecording JSON-LD crediting every listed artist.
 * When a label or UPC is known, a MusicRelease node carries them
 * (recordLabel and a UPC identifier), since MusicRecording has no such properties.
 */
export function releaseJsonLd(release: SeoRelease) {
    const artists = releaseArtists(release).map((name) => ({ "@type": "MusicGroup", name }));
    const sameAs = [release.spotify, release.youtube].filter(Boolean);
    const url = abs(releasePath(release.slug));
    const recording = {
        "@type": "MusicRecording",
        "@id": `${url}#recording`,
        name: release.title,
        byArtist: artists.length === 1 ? artists[0] : artists,
        ...(release.tracks?.[0]?.duration ? { duration: release.tracks[0].duration } : {}),
        ...(release.releaseDate ? { datePublished: release.releaseDate } : {}),
        image: release.cover ? abs(release.cover) : DEFAULT_OG_IMAGE,
        url,
        ...(sameAs.length ? { sameAs } : {}),
    };

    if (!release.label && !release.upc) {
        return { "@context": "https://schema.org", ...recording };
    }

    const musicRelease = {
        "@type": "MusicRelease",
        "@id": `${url}#release`,
        name: release.title,
        byArtist: recording.byArtist,
        ...(release.releaseDate ? { datePublished: release.releaseDate } : {}),
        ...(release.label ? { recordLabel: { "@type": "Organization", name: release.label } } : {}),
        ...(release.upc
            ? { identifier: { "@type": "PropertyValue", propertyID: "UPC", value: release.upc } }
            : {}),
        track: { "@id": recording["@id"] },
    };

    return { "@context": "https://schema.org", "@graph": [recording, musicRelease] };
}
