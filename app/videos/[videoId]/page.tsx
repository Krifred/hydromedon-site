import { notFound } from "next/navigation";
import Link from "next/link";
import { getChannelVideos } from "@/lib/youtube";
import { videoMap } from "@/src/data/videoMap";
import { getReleaseBySlug } from "@/lib/releases";
import type { Metadata } from "next";

// No generateStaticParams — video set changes as new uploads arrive.
// Pages are rendered on first request and cached for 6 hours via ISR.
export const revalidate = 21600;

/* =========================
   Metadata
   ========================= */

export async function generateMetadata({
    params,
}: {
    params: Promise<{ videoId: string }>;
}): Promise<Metadata> {
    const { videoId } = await params;

    let title = "Video — Hydromedon";
    try {
        const videos = await getChannelVideos();
        const match = videos.find((v) => v.id === videoId);
        if (match) title = `${match.title} — Hydromedon`;
    } catch {
        // API unavailable — fall back to generic title
    }

    return { title };
}

/* =========================
   Sidebar CTA row helper
   ========================= */

function SidebarLink({
    href,
    external,
    children,
}: {
    href: string;
    external?: boolean;
    children: React.ReactNode;
}) {
    const cls =
        "flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-sm text-gray-300 hover:border-yellow-400/40 hover:text-yellow-400 transition group";

    if (external) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                <span className="opacity-0 group-hover:opacity-100 transition text-yellow-400 text-xs">
                    →
                </span>
                {children}
            </a>
        );
    }

    return (
        <Link href={href} className={cls}>
            <span className="opacity-0 group-hover:opacity-100 transition text-yellow-400 text-xs">
                →
            </span>
            {children}
        </Link>
    );
}

/* =========================
   Page
   ========================= */

export default async function VideoPage({
    params,
}: {
    params: Promise<{ videoId: string }>;
}) {
    const { videoId } = await params;

    // Resolve video details from channel uploads
    let videos: Awaited<ReturnType<typeof getChannelVideos>> = [];
    try {
        videos = await getChannelVideos();
    } catch {
        notFound();
    }

    const video = videos.find((v) => v.id === videoId);
    if (!video) notFound();

    // Resolve optional release linkage
    const meta = videoMap[videoId];
    const release = meta ? getReleaseBySlug(meta.releaseSlug) : undefined;

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-5xl mx-auto px-4 pt-28 pb-20">

                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-400">
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link href="/videos" className="hover:text-yellow-400 transition">
                                Videos
                            </Link>
                        </li>
                        <li className="opacity-60">/</li>
                        <li className="text-yellow-300 font-medium line-clamp-1">
                            {video.title}
                        </li>
                    </ol>
                </nav>

                <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 lg:items-start">

                    {/* ── Main: embed + title ── */}
                    <div>
                        {/* youtube-nocookie embed */}
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900 shadow-2xl shadow-black/60 mb-6">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>

                        <h1 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-2">
                            {video.title}
                        </h1>

                        {video.viewCount && parseInt(video.viewCount) > 0 && (
                            <p className="text-sm text-gray-500 mb-4">
                                {parseInt(video.viewCount).toLocaleString()} views
                            </p>
                        )}

                        {video.description && (
                            <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line mt-4 max-w-prose">
                                {video.description.slice(0, 400)}
                                {video.description.length > 400 ? "…" : ""}
                            </p>
                        )}
                    </div>

                    {/* ── Sidebar: More from this song ── */}
                    {meta && release && (
                        <aside className="mt-12 lg:mt-0 lg:sticky lg:top-28">
                            <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
                                {release.cover && (
                                    <img
                                        src={release.cover}
                                        alt={release.title}
                                        className="w-full aspect-square object-cover"
                                    />
                                )}

                                <div className="p-5 flex flex-col gap-3">
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">
                                        More from this song
                                    </p>

                                    <h2 className="text-base font-bold text-white">
                                        {release.title}
                                    </h2>

                                    {/* Primary CTA — Spotify */}
                                    {release.spotify && (
                                        <a
                                            href={release.spotify}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-yellow-500 text-black text-sm font-bold hover:bg-yellow-400 transition shadow shadow-yellow-500/30"
                                        >
                                            <span>▶</span>
                                            <span>Stream on Spotify</span>
                                        </a>
                                    )}

                                    <hr className="border-white/10 my-1" />

                                    <SidebarLink href={`/sheet-music/${meta.releaseSlug}`}>
                                        Sheet music
                                    </SidebarLink>

                                    <SidebarLink href={`/licensing/${meta.releaseSlug}`}>
                                        License for worship
                                    </SidebarLink>

                                    <SidebarLink href={`/stories/${meta.releaseSlug}`}>
                                        Story behind the song
                                    </SidebarLink>
                                </div>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </main>
    );
}
