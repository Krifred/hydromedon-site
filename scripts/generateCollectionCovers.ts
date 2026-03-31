/**
 * scripts/generateCollectionCovers.ts
 *
 * Scans /public/covers for image files and writes lib/collectionCovers.ts.
 *
 * Run with:
 *   npm run generate:covers
 *
 * For every cover image two slug entries are emitted:
 *   1. sheet-music-0-<base>-resources   — categorised slug convention
 *   2. <base>-resources                  — bare slug used by live Fourthwall collections
 *
 * The output file is always overwritten.  Add new covers to /public/covers
 * and re-run the script — no manual editing required.
 */

import * as fs from "node:fs";
import * as path from "node:path";

// ── Paths ──────────────────────────────────────────────────────────────────────

const ROOT        = process.cwd();
const COVERS_DIR  = path.join(ROOT, "public", "covers");
const OUTPUT_PATH = path.join(ROOT, "lib", "collectionCovers.ts");

// ── Config ─────────────────────────────────────────────────────────────────────

const IMAGE_EXT = /\.(jpg|jpeg|png)$/i;

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Normalise a filename into a slug base:  "Arise_O_Lord.jpg" → "arise-o-lord" */
function toSlugBase(filename: string): string {
  return filename
    .replace(IMAGE_EXT, "")
    .replace(/_/g, "-")
    .toLowerCase();
}

// ── Main ───────────────────────────────────────────────────────────────────────

function main(): void {
  // Validate source directory
  if (!fs.existsSync(COVERS_DIR)) {
    console.error(`[generate:covers] ERROR  – directory not found: ${COVERS_DIR}`);
    process.exit(1);
  }

  const allFiles  = fs.readdirSync(COVERS_DIR);
  const images    = allFiles.filter((f) => IMAGE_EXT.test(f)).sort();
  const nonImages = allFiles.filter((f) => !IMAGE_EXT.test(f) && !f.startsWith("."));

  if (images.length === 0) {
    console.warn("[generate:covers] WARNING – no .jpg / .jpeg / .png files found in /public/covers");
  }

  if (nonImages.length > 0) {
    console.warn(`[generate:covers] WARNING – skipped non-image files: ${nonImages.join(", ")}`);
  }

  // Build mapping entries
  const lines: string[] = [];

  for (const filename of images) {
    const base         = toSlugBase(filename);
    const prefixedSlug = `sheet-music-0-${base}-resources`;
    const bareSlug     = `${base}-resources`;
    const coverPath    = `/covers/${filename}`;

    // Padded for readability; both slug forms point to the same file
    lines.push(`  "${prefixedSlug}": "${coverPath}",`);
    lines.push(`  "${bareSlug}": "${coverPath}",`);
  }

  // Generate file content
  const timestamp = new Date().toISOString();
  const content = `// lib/collectionCovers.ts
// AUTO-GENERATED — do not edit manually.
// Re-generate by running:  npm run generate:covers
// Last generated: ${timestamp}
//
// Maps Fourthwall collection slugs to local cover images in /public/covers.
// Two entries are emitted per image file:
//   sheet-music-0-<base>-resources  — categorised slug convention (<category>-0-<name>)
//   <base>-resources                 — bare slug used by existing Fourthwall collections
//
// Priority in MerchCard: collectionCovers[slug] → API primaryImage → gradient placeholder

export const collectionCovers: Record<string, string> = {
${lines.join("\n")}
};
`;

  fs.writeFileSync(OUTPUT_PATH, content, "utf8");

  console.log(`[generate:covers] ✓  Wrote ${images.length} cover${images.length !== 1 ? "s" : ""} (${images.length * 2} slug entries) → lib/collectionCovers.ts`);
}

main();
