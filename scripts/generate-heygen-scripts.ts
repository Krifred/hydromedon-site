/**
 * generate-heygen-scripts.ts
 *
 * Generates two output files per song:
 *   content/heygen-scripts/[slug].txt  — HeyGen-ready with pause markers
 *   content/video-scripts/[slug].md    — clean markdown for editing
 *
 * Usage:
 *   npx tsx scripts/generate-heygen-scripts.ts --slug armor-of-light
 *   npx tsx scripts/generate-heygen-scripts.ts   (processes all singles)
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { releases } from "../lib/releases";
import type { Release } from "../lib/types";

// ---------------------------------------------------------------------------
// Shared system context — mirror this constant in generate-stories.ts
// ---------------------------------------------------------------------------

const HYDROMEDON_SYSTEM_CONTEXT = `\
You are writing content for Hydromedon, an independent Christian composer \
who creates cinematic, ambient worship music. The composer's work is deeply \
personal — rooted in lived faith, scripture, and honest spiritual reflection. \
Hydromedon releases music through streaming platforms and shares the stories \
behind each song at hydromedon.com. The composer is real but not publicly named. \
Tone across all content: honest, personal, non-preachy, never marketing-speak.\
`;

const VIDEO_SYSTEM_PROMPT = `\
${HYDROMEDON_SYSTEM_CONTEXT}

You write 90-second talking-head video scripts for a composer who explains \
the story behind each song. The composer is seen via an AI-animated photo — \
they are real but not publicly named. \
Tone: personal testimony, not a lecture. Speak directly to one listener. \
Target length: 180–210 words (90–105 seconds at natural pace). \
Never use filler phrases.\
`;

// ---------------------------------------------------------------------------
// Prompt builder
// ---------------------------------------------------------------------------

function buildUserPrompt(release: Release): string {
    const track = release.tracks?.[0];
    const ln = track?.linerNotes ?? {};

    const scripture = Array.isArray(ln.scriptureReferences)
        ? ln.scriptureReferences.join("\n")
        : ln.scriptureReferences ?? "(none provided)";

    return `\
Write a HeyGen talking-head script for the song '${release.title}'.

Use this material as your source:
Personal context: ${ln.personalContext ?? "(none provided)"}
Thematic reflection: ${ln.thematicReflection ?? "(none provided)"}
Scripture: ${scripture}
Musical choices: ${ln.musicalChoices ?? "(none provided)"}

Structure:
1. Opening hook (1–2 sentences): the emotional core of the song.
   Must make a listener want to hear what comes next.
2. The story (4–5 sentences): what prompted this song. Personal, specific, honest.
3. The scripture (2–3 sentences): what this passage means and why it shaped
   the song. Quote the verse directly.
4. The sound (1–2 sentences): one specific production or instrument choice
   and what it was meant to express.
5. Closing invitation (2 sentences): soft, never coercive.
   End with: 'The full story is at hydromedon.com/stories/${release.slug}'

Format the output with [pause 0.5s] after the hook, [pause 0.8s] after the \
story section, and [pause 0.5s] before the closing invitation.\
`;
}

// ---------------------------------------------------------------------------
// File writers
// ---------------------------------------------------------------------------

function writeTxt(slug: string, content: string): void {
    const dir = path.resolve("content/heygen-scripts");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${slug}.txt`), content, "utf-8");
}

function writeMd(slug: string, title: string, content: string): void {
    const dir = path.resolve("content/video-scripts");
    fs.mkdirSync(dir, { recursive: true });

    // Strip pause markers for the clean editing copy
    const clean = content
        .replace(/\[pause [^\]]+\]\s*/g, "")
        .trim();

    const md = `# ${title}\n\n${clean}\n`;
    fs.writeFileSync(path.join(dir, `${slug}.md`), md, "utf-8");
}

// ---------------------------------------------------------------------------
// Core generator
// ---------------------------------------------------------------------------

async function generateForRelease(
    client: Anthropic,
    release: Release
): Promise<void> {
    console.log(`  Generating: ${release.title} (${release.slug})`);

    const message = await client.messages.create({
        model: "claude-opus-4-6",
        max_tokens: 1024,
        system: VIDEO_SYSTEM_PROMPT,
        messages: [
            {
                role: "user",
                content: buildUserPrompt(release),
            },
        ],
    });

    const block = message.content.find((b) => b.type === "text");
    if (!block || block.type !== "text") {
        throw new Error(`No text block in response for ${release.slug}`);
    }

    const scriptText = block.text.trim();

    writeTxt(release.slug, scriptText);
    writeMd(release.slug, release.title, scriptText);

    console.log(
        `  ✓  content/heygen-scripts/${release.slug}.txt\n` +
        `     content/video-scripts/${release.slug}.md`
    );
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        console.error("Error: ANTHROPIC_API_KEY environment variable is not set.");
        process.exit(1);
    }

    const client = new Anthropic({ apiKey });

    // Resolve which releases to process
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
        // Default: all singles (skip video releases and albums)
        targets = releases.filter((r) => r.type === "Single");
        console.log(`No --slug provided. Processing all ${targets.length} singles.`);
    }

    console.log();
    for (const release of targets) {
        await generateForRelease(client, release);
        console.log();
    }

    console.log("Done.");
}

main().catch((err) => {
    console.error("Fatal:", err);
    process.exit(1);
});
