/**
 * generate-yt-descriptions.ts
 *
 * Pure template generation — no API calls.
 * Reads release metadata and liner notes from existing TypeScript data files.
 *
 * Outputs per song:
 *   content/yt-descriptions/[slug].txt        — full YouTube description
 *   content/yt-descriptions/[slug]-short.txt  — ≤150 chars for Shorts
 *
 * Usage:
 *   npx tsx scripts/generate-yt-descriptions.ts --slug armor-of-light
 *   npx tsx scripts/generate-yt-descriptions.ts   (all singles)
 */

import fs from "fs";
import path from "path";
import { releases } from "../lib/releases";
import { lyricsByRelease } from "../lib/lyrics";
import type { Release, LinerNotes } from "../lib/types";

/* =========================
   ESV verse texts
   Keyed by the exact string used in linerNotes.scriptureReferences.
   ========================= */

const ESV: Record<string, string> = {
    "Ephesians 6:10–18":
        "Finally, be strong in the Lord and in the strength of his might. Put on the whole armor of God, that you may be able to stand against the schemes of the devil.",

    "Isaiah 61:1–3":
        "The Spirit of the Lord God is upon me, because the Lord has anointed me to bring good news to the poor; he has sent me to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to those who are bound.",

    "Jeremiah 18:1–6":
        "Behold, like the clay in the potter's hand, so are you in my hand, O house of Israel.",

    "Psalm 51":
        "Have mercy on me, O God, according to your steadfast love; according to your abundant mercy blot out my transgressions.",

    "Isaiah 43:19":
        "Behold, I am doing a new thing; now it springs forth, do you not perceive it? I will make a way in the wilderness and rivers in the desert.",

    "Proverbs 3:5–6":
        "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",

    "Numbers 6:24–26":
        "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.",

    "Psalm 91":
        "He who dwells in the shelter of the Most High will abide in the shadow of the Almighty. I will say to the Lord, 'My refuge and my fortress, my God, in whom I trust.'",

    "Psalm 57:1":
        "Be merciful to me, O God, be merciful to me, for in you my soul takes refuge; in the shadow of your wings I will take refuge, till the storms of destruction pass by.",

    "Philippians 4:6–9":
        "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.",

    "Psalm 3":
        "O Lord, how many are my foes! Many are rising against me; many are saying of my soul, 'There is no salvation for him in God.' But you, O Lord, are a shield about me, my glory, and the lifter of my head.",

    "Psalm 68:1":
        "God shall arise, his enemies shall be scattered; and those who hate him shall flee before him!",
};

/* =========================
   Helpers
   ========================= */

/** Retrieve the merged liner notes for a release (first track). */
function getLinerNotes(release: Release): LinerNotes | undefined {
    const releaseEntry = lyricsByRelease[release.slug];
    if (!releaseEntry) return undefined;
    const firstKey = Object.keys(releaseEntry)[0];
    return releaseEntry[firstKey]?.linerNotes;
}

/** Find the album that contains this release as a track. */
function findParentAlbum(release: Release): Release | undefined {
    const normalise = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");
    return releases.find(
        (r) =>
            r.type === "Album" &&
            r.tracks?.some((t) => normalise(t.title) === normalise(release.title))
    );
}

/**
 * Extract up to 2 sentences from a longer reflection string.
 * Truncates at maxChars if the result is still too long.
 */
function extractTeaser(text: string, maxChars = 200): string {
    const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
    let result = sentences
        .slice(0, 2)
        .map((s) => s.trim())
        .join(" ")
        .trim();

    if (result.length > maxChars) {
        result = result.slice(0, maxChars - 1).trimEnd() + "…";
    }
    return result || text.slice(0, maxChars - 1).trim() + "…";
}

/**
 * Extract the Bible book name from a reference and return it as a hashtag.
 * e.g. "Ephesians 6:10–18" → "#Ephesians", "Psalm 68:1" → "#Psalms"
 */
function bibleBookHashtag(ref: string): string {
    // Match optional leading number + book word(s) before the chapter digits
    const match = ref.match(/^([1-3]?\s?[A-Za-z]+(?:\s[A-Za-z]+)?)\s*\d/);
    const book = (match?.[1] ?? ref.split(" ")[0]).trim();
    // Pluralise "Psalm" for conventional hashtag usage
    const tag = book === "Psalm" ? "Psalms" : book.replace(/\s+/g, "");
    return `#${tag}`;
}

/** Convert a theme string to a hashtag (no spaces, no special chars). */
function themeHashtag(theme: string): string {
    return `#${theme.replace(/[^a-zA-Z0-9]/g, "")}`;
}

/* =========================
   Description generators
   ========================= */

function buildLongDescription(release: Release): string {
    const ln = getLinerNotes(release);
    const album = findParentAlbum(release);

    const teaser = ln?.thematicReflection
        ? extractTeaser(ln.thematicReflection)
        : "";

    const firstRef =
        Array.isArray(ln?.scriptureReferences) && ln.scriptureReferences.length > 0
            ? ln.scriptureReferences[0]
            : undefined;

    const verseText = firstRef ? ESV[firstRef] : undefined;
    const bookTag = firstRef ? bibleBookHashtag(firstRef) : "#Scripture";
    const themeTag =
        release.themes && release.themes.length > 0
            ? themeHashtag(release.themes[0])
            : "";

    const lines: string[] = [];

    // ── Before fold ─────────────────────────────────────────────────────────
    lines.push(
        release.subtitle
            ? `${release.title} — ${release.subtitle}`
            : release.title
    );
    if (release.spotify) {
        lines.push(`Stream: ${release.spotify}`);
    } else if (release.youtube) {
        lines.push(`Watch: ${release.youtube}`);
    }

    // ── Teaser paragraph ────────────────────────────────────────────────────
    if (teaser) {
        lines.push("");
        lines.push(teaser);
    }

    lines.push("");
    lines.push(
        `Read the full story: https://www.hydromedon.com/stories/${release.slug}`
    );

    // ── Scripture ───────────────────────────────────────────────────────────
    if (firstRef) {
        lines.push("");
        if (verseText) {
            lines.push(`📖 ${firstRef} — "${verseText}"`);
        } else {
            lines.push(`📖 ${firstRef}`);
        }
    }

    // ── Platform links ──────────────────────────────────────────────────────
    lines.push("");
    if (album) {
        lines.push(
            `🎵 Full album: ${album.title} — https://www.hydromedon.com/music/${album.slug}`
        );
    }
    lines.push(
        `📄 Sheet music & lead sheets: https://www.hydromedon.com/sheet-music/${release.slug}`
    );
    lines.push(
        `⛪ License for your church: https://www.hydromedon.com/licensing/${release.slug}`
    );
    lines.push(`✝️ About Hydromedon's faith: https://www.hydromedon.com/faith`);

    // ── Signoff ─────────────────────────────────────────────────────────────
    lines.push("");
    lines.push(
        "— Hydromedon is a Christian dream pop project by Soundscape Records."
    );

    // ── Hashtags ─────────────────────────────────────────────────────────────
    lines.push("");
    const hashtags = [
        "#HydromedOn",
        "#ChristianDreamPop",
        bookTag,
        themeTag,
        "#WorshipMusic",
        "#DreamPop",
    ].filter(Boolean);
    lines.push(hashtags.join(" "));

    return lines.join("\n");
}

function buildShortDescription(release: Release): string {
    // Target: ≤150 chars, paste-ready for YouTube Shorts
    const streamPart = release.spotify
        ? `Stream: ${release.spotify}`
        : release.youtube
        ? `Watch: ${release.youtube}`
        : null;

    const tags = "#HydromedOn #ChristianDreamPop #WorshipMusic";

    const parts = [
        `"${release.title}" by Hydromedon ✝️`,
        streamPart,
        tags,
    ].filter(Boolean) as string[];

    const full = parts.join(" · ");
    if (full.length <= 150) return full;

    // Drop the stream link if it pushes us over
    const noStream = [`"${release.title}" by Hydromedon ✝️`, tags].join(" · ");
    if (noStream.length <= 150) return noStream;

    // Last resort: hard truncate
    return noStream.slice(0, 149) + "…";
}

/* =========================
   File writer
   ========================= */

function writeDescriptions(release: Release): void {
    const dir = path.resolve("content/yt-descriptions");
    fs.mkdirSync(dir, { recursive: true });

    const long = buildLongDescription(release);
    const short = buildShortDescription(release);

    fs.writeFileSync(path.join(dir, `${release.slug}.txt`), long, "utf-8");
    fs.writeFileSync(
        path.join(dir, `${release.slug}-short.txt`),
        short,
        "utf-8"
    );

    console.log(
        `  ✓  content/yt-descriptions/${release.slug}.txt\n` +
        `     content/yt-descriptions/${release.slug}-short.txt` +
        `  (${short.length} chars)`
    );
}

/* =========================
   CLI entry point
   ========================= */

function main(): void {
    const slugIndex = process.argv.indexOf("--slug");
    const slugArg = slugIndex !== -1 ? process.argv[slugIndex + 1] : null;

    let targets: Release[];

    if (slugArg) {
        const match = releases.find((r) => r.slug === slugArg);
        if (!match) {
            console.error(
                `Error: No release found with slug '${slugArg}'.\n` +
                `Available slugs:\n${releases.map((r) => `  ${r.slug}`).join("\n")}`
            );
            process.exit(1);
        }
        targets = [match];
    } else {
        targets = releases.filter((r) => r.type === "Single");
        console.log(
            `No --slug provided. Processing all ${targets.length} singles.\n`
        );
    }

    for (const release of targets) {
        console.log(`  ${release.title} (${release.slug})`);
        writeDescriptions(release);
        console.log();
    }

    console.log("Done.");
}

main();
