import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getStorySummaries, getStoryContent } from "@/lib/stories";
import { getReleaseBySlug } from "@/lib/releases";
import FadeIn from "@/components/FadeIn";
import type { Metadata } from "next";

/* =========================
   Next.js config
   ========================= */

export const dynamicParams = false;

export async function generateStaticParams() {
    return getStorySummaries()
        .filter((s) => !s.draft)
        .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const story = getStoryContent(slug);

    if (!story) return { title: "Hydromedon" };

    const release = getReleaseBySlug(slug);

    return {
        title: `${story.frontmatter.title} — Story Behind the Song | Hydromedon`,
        description:
            story.frontmatter.excerpt ??
            `The story behind "${story.frontmatter.title}" by Hydromedon.`,
        openGraph: {
            title: `${story.frontmatter.title} — Story Behind the Song`,
            description: story.frontmatter.excerpt,
            images: release?.cover ? [{ url: release.cover }] : [],
        },
    };
}

/* =========================
   Page
   ========================= */

export default async function StoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const story = getStoryContent(slug);

    if (!story || story.frontmatter.draft) notFound();

    const { frontmatter, content } = story;
    const release = getReleaseBySlug(slug);

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-5xl mx-auto px-4 pt-28 pb-20">

                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-400">
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link href="/stories" className="hover:text-yellow-400 transition">
                                Stories
                            </Link>
                        </li>
                        <li className="opacity-60">/</li>
                        <li className="text-yellow-300 font-medium">{frontmatter.title}</li>
                    </ol>
                </nav>

                <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-14 lg:items-start">

                    {/* ── Article ── */}
                    <article>
                        {/* Header */}
                        <FadeIn>
                            <header className="mb-10">
                                {frontmatter.bibleRef && (
                                    <p className="text-xs font-mono text-yellow-300 tracking-widest uppercase mb-3">
                                        {frontmatter.bibleRef}
                                    </p>
                                )}

                                <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 leading-tight mb-4">
                                    {frontmatter.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                    {frontmatter.date && (
                                        <time dateTime={frontmatter.date}>
                                            {new Date(frontmatter.date).toLocaleDateString(
                                                "en-US",
                                                {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    timeZone: "UTC",
                                                }
                                            )}
                                        </time>
                                    )}

                                    {frontmatter.genres &&
                                        frontmatter.genres.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {frontmatter.genres.map((g) => (
                                                    <span
                                                        key={g}
                                                        className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-gray-500 bg-white/5"
                                                    >
                                                        {g}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                </div>
                            </header>
                        </FadeIn>

                        {/* MDX body */}
                        <FadeIn delayMs={160}>
                            <div className="prose-story">
                                <MDXRemote source={content} />
                            </div>
                        </FadeIn>

                        {/* Footer copyright */}
                        <p className="text-xs text-gray-600 mt-16 border-t border-white/5 pt-6">
                            © {new Date().getFullYear()} Hydromedon. All rights reserved.
                        </p>
                    </article>

                    {/* ── Sidebar ── */}
                    <aside className="mt-16 lg:mt-0 lg:sticky lg:top-28">
                        <FadeIn delayMs={240}>
                            <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
                                {/* Cover art */}
                                {release?.cover && (
                                    <img
                                        src={release.cover}
                                        alt={frontmatter.title}
                                        className="w-full aspect-square object-cover"
                                    />
                                )}

                                <div className="p-5 flex flex-col gap-3">
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">
                                        This song
                                    </p>

                                    {/* Spotify */}
                                    {release?.spotify && (
                                        <a
                                            href={release.spotify}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-yellow-500 text-black text-sm font-bold hover:bg-yellow-400 transition shadow shadow-yellow-500/30"
                                        >
                                            <span>▶</span>
                                            <span>Listen on Spotify</span>
                                        </a>
                                    )}

                                    {/* YouTube */}
                                    {release?.youtube && (
                                        <a
                                            href={release.youtube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-gray-300 text-sm hover:border-yellow-400/40 hover:text-yellow-400 transition"
                                        >
                                            <span>▶</span>
                                            <span>Watch on YouTube</span>
                                        </a>
                                    )}

                                    <hr className="border-white/10 my-1" />

                                    {/* Internal links */}
                                    {[
                                        {
                                            href: `/music/${slug}`,
                                            label: "Song page",
                                        },
                                        {
                                            href: `/sheet-music/${slug}`,
                                            label: "Sheet music",
                                        },
                                        {
                                            href: `/music/${slug}#license`,
                                            label: "License this song",
                                        },
                                        {
                                            href: "/faith",
                                            label: "About the faith",
                                        },
                                    ].map(({ href, label }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            className="text-sm text-gray-400 hover:text-yellow-400 transition flex items-center gap-1.5 group"
                                        >
                                            <span className="opacity-0 group-hover:opacity-100 transition text-yellow-400 text-xs">
                                                →
                                            </span>
                                            {label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </aside>
                </div>
            </div>
        </main>
    );
}
