/**
 * generate-storyboards.ts
 *
 * Generates one output file per song:
 *   content/storyboards/[slug].md  — 12-scene visual storyboard (Markdown)
 *
 * Usage:
 *   npx tsx scripts/generate-storyboards.ts --slug armor-of-light
 *   npx tsx scripts/generate-storyboards.ts   (processes all singles)
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { releases } from "../lib/releases";
import type { Release } from "../lib/types";

// ---------------------------------------------------------------------------
// Shared system context — keep in sync with generate-heygen-scripts.ts
// ---------------------------------------------------------------------------

const HYDROMEDON_SYSTEM_CONTEXT = `\
You are writing content for Hydromedon, an independent Christian composer \
who creates cinematic, ambient worship music. The composer's work is deeply \
personal — rooted in lived faith, scripture, and honest spiritual reflection. \
Hydromedon releases music through streaming platforms and shares the stories \
behind each song at hydromedon.com. The composer is real but not publicly named. \
Tone across all content: honest, personal, non-preachy, never marketing-speak.\
`;

const STORYBOARD_SYSTEM_PROMPT = `\
${HYDROMEDON_SYSTEM_CONTEXT}

You are a visual director for a Christian dream pop artist. \
Visual style: Victorian steampunk, gothic architecture, brass machinery and gears, \
soft fog, amber and indigo colour palette, cinematic 16:9 aspect ratio. \
Faith and spiritual themes must be encoded visually and symbolically — never \
literally (no crosses, halos, or church buildings unless they are incidental \
to a scene). \
Every scene description must be usable directly as an image generation prompt \
for Midjourney or Adobe Firefly.\
`;

// ---------------------------------------------------------------------------
// Prompt builder
// ---------------------------------------------------------------------------

function buildUserPrompt(release: Release): string {
    const track = release.tracks?.[0];
    const ln = track?.linerNotes ?? {};

    const themes = release.themes?.join(", ") ?? "(none provided)";

    const scripture = Array.isArray(ln.scriptureReferences)
        ? ln.scriptureReferences.join("\n")
        : ln.scriptureReferences ?? "(none provided)";

    // Release type has no dedicated mood field; themes serve as the closest proxy
    const mood = release.themes?.join(", ") ?? "(none provided)";

    return `\
Generate a 12-scene visual storyboard for a 3-minute cinematic video of the \
Hydromedon song '${release.title}'.

Song themes: ${themes}
Scripture: ${scripture}
Mood: ${mood}
Personal context summary: ${ln.personalContext ?? "(none provided)"}

For each scene output exactly this structure:

### Scene [N] — [0:00–0:15]
**Image prompt:** [Midjourney/Firefly-ready description, 50–70 words, steampunk style, specific visual details]
**Animation note:** [1 sentence for Runway/Kling: camera move or element to animate, e.g. 'slow push in', 'gears rotating gently', 'fog drifting left to right']
**Lyric moment:** [which lyric line or moment this accompanies, or 'instrumental' if no lyrics here]

Distribute 12 scenes across the full 3 minutes (15 seconds per scene). \
The first and last scenes should feel like bookends — related in composition \
but transformed in mood.\
`;
}

// ---------------------------------------------------------------------------
// File writer
// ---------------------------------------------------------------------------

function writeMd(slug: string, title: string, content: string): void {
    const dir = path.resolve("content/storyboards");
    fs.mkdirSync(dir, { recursive: true });

    const md = `# ${title} — Storyboard\n\n${content.trim()}\n`;
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
        max_tokens: 3000,
        system: STORYBOARD_SYSTEM_PROMPT,
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

    writeMd(release.slug, release.title, block.text);

    console.log(`  ✓  content/storyboards/${release.slug}.md`);
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
