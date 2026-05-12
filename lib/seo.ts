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
