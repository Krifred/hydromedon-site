/* =========================
   Liner Notes
   ========================= */

/**
 * Reflective, optional commentary that accompanies a song.
 * These are intentionally non-marketing, non-instructional,
 * and written as journal-like reflections.
 */
export interface LinerNotes {
    /** The lived experience or season behind the song */
    personalContext?: string;

    /** Instrumentation, production, and arrangement decisions */
    musicalChoices?: string;

    /** Spiritual or thematic reflection (non-preachy) */
    thematicReflection?: string;

    /** Optional references that shaped the song */
    scriptureReferences?: string[];

    /** Free-text timeframe (e.g. "Winter 2023", "A season of grief") */
    writtenDuring?: string;

    /** Emotional or descriptive tags (used sparingly) */
    moodTags?: string[];
}

/* =========================
   Track
   ========================= */

/**
 * A single musical composition.
 * Tracks may appear as standalone singles
 * or as part of an album release.
 */
export interface Track {
    /** Track title as displayed publicly */
    title: string;

    /** Duration (e.g. "4:52") */
    duration?: string;

    /** Full lyrics (kept inline for now) */
    lyrics?: string;

    /** Optional reflective liner notes */
    linerNotes?: LinerNotes;
}

/* =========================
   Release
   ========================= */

/**
 * A public-facing release entity.
 * Can represent a Single, Album, or Video.
 */
export interface Release {
    /** URL-safe identifier */
    slug: string;

    /** Display title */
    title: string;

    /** Release category */
    type: "Single" | "Album" | "Video";

    /** Optional subtitle or tagline */
    subtitle?: string;

    /** Human-readable release date */
    releaseDate: string;
    year?: string;

    /** Cover artwork URL/path */
    cover?: string;

    /** Streaming / platform links */
    spotify?: string;
    youtube?: string;
    hyperfollow?: string;

    description?: string;
    themes?: string[];

    /** Album tracklist or single track data */
    tracks?: Track[];
}
