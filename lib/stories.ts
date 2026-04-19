import fs from "fs";
import path from "path";
import matter from "gray-matter";

/* =========================
   Types
   ========================= */

export interface StorySummary {
    slug: string;
    title: string;
    date: string;
    draft: boolean;
    bibleRef?: string;
    genres?: string[];
    mood?: string;
    excerpt?: string;
}

/* =========================
   Internals
   ========================= */

const STORIES_DIR = path.join(process.cwd(), "content/stories");

function parseFrontmatter(slug: string, data: Record<string, unknown>): StorySummary {
    return {
        slug,
        title: typeof data.title === "string" ? data.title : slug,
        date: typeof data.date === "string" ? data.date : "",
        draft: typeof data.draft === "boolean" ? data.draft : true,
        bibleRef: typeof data.bibleRef === "string" ? data.bibleRef : undefined,
        genres: Array.isArray(data.genres) ? (data.genres as string[]) : undefined,
        mood: typeof data.mood === "string" ? data.mood : undefined,
        excerpt: typeof data.excerpt === "string" ? data.excerpt : undefined,
    };
}

/* =========================
   Public API
   ========================= */

/**
 * Returns a summary for every .mdx file in content/stories/.
 * Includes draft stories — callers must filter by `draft: false` as needed.
 */
export function getStorySummaries(): StorySummary[] {
    if (!fs.existsSync(STORIES_DIR)) return [];

    const files = fs
        .readdirSync(STORIES_DIR)
        .filter((f) => f.endsWith(".mdx"));

    return files.map((filename) => {
        const slug = filename.replace(/\.mdx$/, "");
        const raw = fs.readFileSync(path.join(STORIES_DIR, filename), "utf-8");
        const { data } = matter(raw);
        return parseFrontmatter(slug, data);
    });
}

/**
 * Returns the parsed frontmatter and raw MDX content string for a single story.
 * Returns null if the file does not exist.
 */
export function getStoryContent(slug: string): {
    frontmatter: StorySummary;
    content: string;
} | null {
    const filepath = path.join(STORIES_DIR, `${slug}.mdx`);

    if (!fs.existsSync(filepath)) return null;

    const raw = fs.readFileSync(filepath, "utf-8");
    const { data, content } = matter(raw);

    return {
        frontmatter: parseFrontmatter(slug, data),
        content,
    };
}
