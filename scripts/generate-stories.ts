#!/usr/bin/env tsx
/**
 * scripts/generate-stories.ts
 *
 * Generates MDX story articles for Hydromedon songs using the Claude API.
 *
 * Usage:
 *   npx tsx scripts/generate-stories.ts                       # all un-published
 *   npx tsx scripts/generate-stories.ts --slug armor-of-light # one release
 *
 * Prerequisites:
 *   - ANTHROPIC_API_KEY set in environment (or .env.local)
 *   - Run: npm install  (installs @anthropic-ai/sdk and tsx)
 *   - If tsx is not installed globally: npm install -D tsx
 */

import Anthropic from "@anthropic-ai/sdk";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

import { HYDROMEDON_SYSTEM_CONTEXT } from "../lib/hydromedon-identity";
import { lyricsByRelease } from "../lib/lyrics";
import { releases } from "../lib/releases";
import type { Release } from "../lib/types";

// ─── Client ──────────────────────────────────────────────────────────────────

const client = new Anthropic();

// ─── System prompt ───────────────────────────────────────────────────────────
//
// Cached across all calls in one run — the long HYDROMEDON_SYSTEM_CONTEXT
// only counts against tokens once.

const STORY_SYSTEM = `\
${HYDROMEDON_SYSTEM_CONTEXT}

You write story articles for individual songs. Each article is 600–800 words.
Tone: personal, theologically grounded, accessible to someone who has never
been to church.
Never use the phrase "journey" or "just" as a filler word.
Do not start sentences with "I" more than twice per paragraph.`;

// ─── Prompt builder ──────────────────────────────────────────────────────────

function buildUserPrompt(release: Release): string | null {
    const trackTitle = release.tracks?.[0]?.title;
    if (!trackTitle) return null;

    const entry = lyricsByRelease[release.slug]?.[trackTitle];
    if (!entry) return null;

    const ln = entry.linerNotes ?? {};
    const scripture = ln.scriptureReferences?.join(", ") ?? "";
    const themes = release.themes?.join(", ") ?? "";

    return `\
Write a story article for the Hydromedon song "${release.title}".

Personal context: ${ln.personalContext ?? ""}
Musical choices: ${ln.musicalChoices ?? ""}
Thematic reflection: ${ln.thematicReflection ?? ""}
Scripture: ${scripture}
Written during: ${ln.writtenDuring ?? ""}
Themes: ${themes}

Structure the article with these sections:

## The Song
[2–3 paragraphs: the personal story and inspiration]

## The Sound
[1–2 paragraphs: what the instrumentation communicates spiritually — expand on musicalChoices]

## The Scripture
[1 paragraph: unpack the scripture reference in plain language]

## Reflection
[This section always ends with:]
- One reflection question (non-rhetorical, genuinely open)
- One sentence: "If this resonates, [link to /faith]."

## For Worship Leaders
[2–3 sentences: how this song can be used in a worship context. End with: \
"Sheet music and lead sheets are available at [/sheet-music/${release.slug} link]."]`;
}

// ─── Frontmatter builder ─────────────────────────────────────────────────────

function yamlStr(value: string): string {
    // Escape double quotes so the value is safe inside YAML double-quote strings
    return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function buildFrontmatter(release: Release, body: string): string {
    const trackTitle = release.tracks?.[0]?.title ?? "";
    const lyricsEntry = lyricsByRelease[release.slug]?.[trackTitle];
    const bibleRef = lyricsEntry?.linerNotes?.scriptureReferences?.[0] ?? "";

    // Excerpt: first 150 chars of prose — skip heading lines, strip markdown symbols
    const excerpt = body
        .split("\n")
        .filter((line) => line.trim() && !line.trimStart().startsWith("#"))
        .join(" ")
        .replace(/[*_`[\]]/g, "")
        .slice(0, 150)
        .trimEnd();

    const today = new Date().toISOString().split("T")[0];

    const genreYaml =
        (release.genres ?? []).length === 0
            ? "genres: []"
            : `genres:\n${(release.genres ?? []).map((g) => `  - ${g}`).join("\n")}`;

    return [
        "---",
        `title: "${yamlStr(`${release.title} — Story Behind the Song`)}"`,
        `slug: "${release.slug}"`,
        `date: "${today}"`,
        `draft: true`,
        `bibleRef: "${yamlStr(bibleRef)}"`,
        genreYaml,
        `mood: "${yamlStr(release.mood ?? "")}"`,
        `excerpt: "${yamlStr(excerpt)}"`,
        "---",
    ].join("\n");
}

// ─── Core generator ──────────────────────────────────────────────────────────

async function generateStory(release: Release): Promise<void> {
    const userPrompt = buildUserPrompt(release);

    if (!userPrompt) {
        console.log(`  ↷  ${release.slug}: no track/lyrics data — skipped`);
        return;
    }

    const response = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 2048,
        system: [
            {
                type: "text",
                text: STORY_SYSTEM,
                cache_control: { type: "ephemeral" },
            },
        ],
        messages: [
            { role: "user", content: userPrompt },
        ],
    });

    const body = response.content
        .filter((block): block is Anthropic.Messages.TextBlock => block.type === "text")
        .map((block) => block.text)
        .join("\n")
        .trim();

    const frontmatter = buildFrontmatter(release, body);
    const mdx = `${frontmatter}\n\n${body}\n`;

    const outDir = join(process.cwd(), "content", "stories");
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, `${release.slug}.mdx`), mdx, "utf8");

    console.log(`  ✓ content/stories/${release.slug}.mdx written (draft: true)`);
}

// ─── Entry point ─────────────────────────────────────────────────────────────

async function main(): Promise<void> {
    const slugIdx = process.argv.indexOf("--slug");
    const targetSlug = slugIdx !== -1 ? process.argv[slugIdx + 1] ?? null : null;

    let targets: Release[];

    if (targetSlug) {
        const found = releases.find((r) => r.slug === targetSlug);
        if (!found) {
            console.error(`Error: no release found with slug "${targetSlug}"`);
            process.exit(1);
        }
        targets = [found];
    } else {
        targets = releases.filter((r) => r.storyPublished !== true);
    }

    if (targets.length === 0) {
        console.log("Nothing to generate — all releases are already published.");
        return;
    }

    console.log(`Generating ${targets.length} story article(s)...\n`);

    for (const release of targets) {
        process.stdout.write(`  → ${release.slug} ... `);
        process.stdout.write("\n");
        await generateStory(release);
    }

    console.log("\nDone.");
}

main().catch((err: unknown) => {
    console.error(err);
    process.exit(1);
});
