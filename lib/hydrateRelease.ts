// lib/hydrateRelease.ts

import type { Release, Track } from "./types";
import { lyricsByRelease } from "./lyrics";

/**
 * Hydrates a Release with lyrics (and later liner notes)
 * from the lyricsByRelease map.
 *
 * This keeps pages clean and centralizes content merging.
 */
export function hydrateReleaseWithLyrics(release: Release): Release {
    if (!release.tracks?.length) return release;

    const lyricsForRelease = lyricsByRelease[release.slug];
    if (!lyricsForRelease) return release;

    return {
        ...release,
        tracks: release.tracks.map((track: Track) => {
            const entry = lyricsForRelease[track.title];
            if (!entry) return track;

            return {
                ...track,
                lyrics: entry.lyrics,
                linerNotes: entry.linerNotes,
            };
        }),
    };
}
