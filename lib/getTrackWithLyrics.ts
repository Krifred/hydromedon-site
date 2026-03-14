import type { Track, LinerNotes } from "./types";
import type { TrackLyrics } from "./lyrics";
import { lyricsByRelease } from "./lyrics";

export type HydratedTrack = Track & {
    lyrics?: string;
    linerNotes?: LinerNotes;
};

export function hydrateTrack(releaseSlug: string, track: Track): HydratedTrack {
    const entry = lyricsByRelease[releaseSlug]?.[track.title];

    if (!entry) return track;

    return {
        ...track,
        lyrics: entry.lyrics,
        linerNotes: entry.linerNotes,
    };
}