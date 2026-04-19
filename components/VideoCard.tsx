import Link from "next/link";
import type { YouTubeVideo } from "@/lib/youtube";
import type { VideoMeta, VideoType } from "@/src/data/videoMap";

/* =========================
   Helpers
   ========================= */

function formatViewCount(raw: string): string {
    const n = parseInt(raw, 10);
    if (isNaN(n) || n === 0) return "";
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}K views`;
    return `${n} views`;
}

const BADGE: Record<VideoType, { label: string; classes: string }> = {
    lyric: {
        label: "Lyric Video",
        classes: "border-yellow-400/50 text-yellow-400 bg-yellow-400/5",
    },
    visual: {
        label: "Visual",
        classes: "border-sky-400/50 text-sky-400 bg-sky-400/5",
    },
    "making-of": {
        label: "Making-of",
        classes: "border-purple-400/50 text-purple-400 bg-purple-400/5",
    },
};

/* =========================
   Component
   ========================= */

export default function VideoCard({
    video,
    meta,
}: {
    video: YouTubeVideo;
    meta: VideoMeta | undefined;
}) {
    const badge = meta ? BADGE[meta.type] : null;
    const views = formatViewCount(video.viewCount);

    return (
        <article className="group flex flex-col bg-black/80 rounded-xl border border-yellow-900/30 overflow-hidden hover:border-yellow-400/60 hover:-translate-y-1 hover:scale-[1.025] hover:shadow-2xl transition-all duration-300">
            {/* Thumbnail */}
            <Link href={`/videos/${video.id}`} className="block relative aspect-video overflow-hidden bg-zinc-900 flex-shrink-0">
                <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    loading="lazy"
                />
                {/* Play overlay */}
                <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <span className="w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white text-xl pl-1">
                        ▶
                    </span>
                </span>

                {/* Type badge */}
                {badge && (
                    <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded border ${badge.classes}`}>
                        {badge.label}
                    </span>
                )}
            </Link>

            {/* Meta */}
            <div className="flex flex-col gap-1.5 p-4 flex-1">
                <h2 className="text-sm font-semibold text-white leading-snug line-clamp-2">
                    <Link href={`/videos/${video.id}`} className="hover:text-yellow-400 transition-colors">
                        {video.title}
                    </Link>
                </h2>

                {views && (
                    <p className="text-xs text-gray-500">{views}</p>
                )}
            </div>
        </article>
    );
}
