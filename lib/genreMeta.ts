import type { GenreSlug } from "./types";

export const GENRE_META: Record<GenreSlug, { label: string; description: string }> = {
    "dream-pop":        { label: "Dream Pop",        description: "Layered textures, ethereal vocals, cinematic space" },
    "synthpop":         { label: "Synthpop",         description: "Electronic textures, driving rhythm, atmospheric depth" },
    "worship":          { label: "Worship",          description: "Songs written for the presence of God" },
    "shoegaze":         { label: "Shoegaze",         description: "Wall-of-sound guitars, submerged melodies" },
    "instrumental":     { label: "Instrumental",     description: "No words — just atmosphere and feeling" },
    "ambient":          { label: "Ambient",          description: "Slow, spacious, meditative soundscapes" },
    "cinematic":        { label: "Cinematic",        description: "Music written like a film score" },
    "classical-fusion": { label: "Classical Fusion", description: "Sacred music meeting orchestral tradition" },
};
