/**
 * lib/youtube.ts
 *
 * Fetches uploaded videos from the Hydromedon YouTube channel
 * via YouTube Data API v3 using native fetch — no third-party library.
 *
 * Required env vars:
 *   YOUTUBE_API_KEY      — Data API v3 key (no OAuth needed for public data)
 *   YOUTUBE_CHANNEL_ID   — e.g. UCxxxxxxxxxxxxxxxxxxxxxxxx
 *
 * All internal fetch calls use { next: { revalidate: 21600 } } (6 h)
 * so Next.js ISR caches each API request individually.
 */

/* =========================
   Public types
   ========================= */

export interface YouTubeVideo {
    id: string;
    title: string;
    description: string;
    publishedAt: string;       // ISO 8601 date-time
    thumbnailUrl: string;      // maxresdefault → high fallback
    duration: string;          // ISO 8601 duration, e.g. "PT9M0S"
    viewCount: string;
}

/* =========================
   Internal API response shapes
   ========================= */

interface ChannelResponse {
    items?: Array<{
        contentDetails: {
            relatedPlaylists: {
                uploads: string;
            };
        };
    }>;
}

interface PlaylistItemsResponse {
    nextPageToken?: string;
    items?: Array<{
        snippet: {
            resourceId: {
                videoId: string;
            };
        };
    }>;
}

interface VideosResponse {
    items?: Array<{
        id: string;
        snippet: {
            title: string;
            description: string;
            publishedAt: string;
            thumbnails: {
                maxres?: { url: string };
                high?:   { url: string };
                medium?: { url: string };
                default?: { url: string };
            };
        };
        contentDetails: {
            duration: string;
        };
        statistics: {
            viewCount: string;
        };
    }>;
}

/* =========================
   Internals
   ========================= */

const BASE = "https://www.googleapis.com/youtube/v3";
const REVALIDATE = 21_600; // 6 hours in seconds

// Typed to let TypeScript accept Next.js's `next` extension on RequestInit
type NextFetchOptions = RequestInit & { next?: { revalidate?: number } };

const CACHE: NextFetchOptions = { next: { revalidate: REVALIDATE } };

async function apiFetch<T>(url: string): Promise<T> {
    const res = await fetch(url, CACHE);

    if (!res.ok) {
        const body = await res.text().catch(() => "(unreadable)");
        throw new Error(
            `YouTube API ${res.status} ${res.statusText} — ${url}\n${body}`
        );
    }

    return res.json() as Promise<T>;
}

/** Step 1 — resolve the channel's uploads playlist ID. */
async function getUploadsPlaylistId(
    channelId: string,
    apiKey: string
): Promise<string> {
    const url = new URL(`${BASE}/channels`);
    url.searchParams.set("part", "contentDetails");
    url.searchParams.set("id", channelId);
    url.searchParams.set("key", apiKey);

    const data = await apiFetch<ChannelResponse>(url.toString());
    const playlistId =
        data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!playlistId) {
        throw new Error(
            `No uploads playlist found for channel "${channelId}". ` +
            "Check that YOUTUBE_CHANNEL_ID is correct and the channel is public."
        );
    }

    return playlistId;
}

/** Step 2 — page through playlistItems to collect every video ID. */
async function getAllVideoIds(
    playlistId: string,
    apiKey: string
): Promise<string[]> {
    const ids: string[] = [];
    let pageToken: string | undefined;

    do {
        const url = new URL(`${BASE}/playlistItems`);
        url.searchParams.set("part", "snippet");
        url.searchParams.set("playlistId", playlistId);
        url.searchParams.set("maxResults", "50");
        url.searchParams.set("key", apiKey);
        if (pageToken) url.searchParams.set("pageToken", pageToken);

        const data = await apiFetch<PlaylistItemsResponse>(url.toString());

        for (const item of data.items ?? []) {
            const videoId = item.snippet?.resourceId?.videoId;
            if (videoId) ids.push(videoId);
        }

        pageToken = data.nextPageToken;
    } while (pageToken);

    return ids;
}

/** Step 3 — fetch statistics + contentDetails for up to 50 IDs at a time. */
async function getVideoDetails(
    ids: string[],
    apiKey: string
): Promise<YouTubeVideo[]> {
    const videos: YouTubeVideo[] = [];

    for (let i = 0; i < ids.length; i += 50) {
        const batch = ids.slice(i, i + 50);

        const url = new URL(`${BASE}/videos`);
        url.searchParams.set("part", "snippet,statistics,contentDetails");
        url.searchParams.set("id", batch.join(","));
        url.searchParams.set("key", apiKey);

        const data = await apiFetch<VideosResponse>(url.toString());

        for (const item of data.items ?? []) {
            const t = item.snippet?.thumbnails ?? {};
            const thumbnailUrl =
                t.maxres?.url ??
                t.high?.url ??
                t.medium?.url ??
                t.default?.url ??
                "";

            videos.push({
                id: item.id,
                title: item.snippet?.title ?? "",
                description: item.snippet?.description ?? "",
                publishedAt: item.snippet?.publishedAt ?? "",
                thumbnailUrl,
                duration: item.contentDetails?.duration ?? "",
                viewCount: item.statistics?.viewCount ?? "0",
            });
        }
    }

    return videos;
}

/* =========================
   Public API
   ========================= */

/**
 * Returns all public uploaded videos for the configured channel,
 * sorted by YouTube's default order (newest first).
 *
 * Results are ISR-cached at the fetch layer for 6 hours.
 * Call this directly from async Server Components or Route Handlers —
 * no additional `revalidate` wrapper needed at the page level.
 */
export async function getChannelVideos(): Promise<YouTubeVideo[]> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey) {
        throw new Error(
            "Missing env var: YOUTUBE_API_KEY\n" +
            "Add it to .env.local and to your Vercel project environment variables."
        );
    }
    if (!channelId) {
        throw new Error(
            "Missing env var: YOUTUBE_CHANNEL_ID\n" +
            "Add it to .env.local and to your Vercel project environment variables."
        );
    }

    const playlistId = await getUploadsPlaylistId(channelId, apiKey);
    const videoIds = await getAllVideoIds(playlistId, apiKey);

    if (videoIds.length === 0) return [];

    return getVideoDetails(videoIds, apiKey);
}
