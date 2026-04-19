/**
 * videoMap.ts
 *
 * Maps YouTube video IDs to release metadata.
 *
 * KEY: YouTube video ID — the 11-character ID from the video URL, e.g.
 *   https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *                                   ^^^^^^^^^^^^ this part only, not the full URL
 *
 * Populate this map manually after each video is uploaded to YouTube.
 */

export type VideoType = "lyric" | "visual" | "making-of";

export interface VideoMeta {
    /** Must match a slug in lib/releases.ts */
    releaseSlug: string;
    type: VideoType;
    /** Human-readable title for the video (e.g. "Armor of Light — Lyric Video") */
    title: string;
}

export const videoMap: Record<string, VideoMeta> = {
    // Example entry — replace with real video IDs after uploading:
    // "dQw4w9WgXcQ": {
    //   releaseSlug: "armor-of-light",
    //   type: "lyric",
    //   title: "Armor of Light — Lyric Video",
    // },
};
