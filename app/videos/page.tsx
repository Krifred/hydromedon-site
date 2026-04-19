import { getChannelVideos } from "@/lib/youtube";
import { videoMap } from "@/src/data/videoMap";
import VideoTabs from "@/components/VideoTabs";
import FadeIn from "@/components/FadeIn";
import type { Metadata } from "next";

export const revalidate = 21600; // 6 hours — matches youtube.ts fetch cache

export const metadata: Metadata = {
    title: "Videos — Hydromedon",
    description:
        "Official videos from Hydromedon — lyric videos, visual films, and making-of sessions.",
};

/* =========================
   Fallback (no API key)
   ========================= */

function NoApiKeyFallback() {
    return (
        <div className="flex flex-col items-center gap-4 py-28 text-center">
            <div className="w-14 h-14 rounded-full border border-yellow-900/40 bg-yellow-900/10 flex items-center justify-center text-yellow-900/50 text-2xl">
                ▶
            </div>
            <div>
                <p className="text-white/70 text-lg font-medium mb-2">
                    Videos coming soon
                </p>
                <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                    Watch on{" "}
                    <a
                        href="https://www.youtube.com/@Hydromedon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:text-yellow-300 transition underline underline-offset-2"
                    >
                        YouTube
                    </a>{" "}
                    in the meantime.
                </p>
            </div>
        </div>
    );
}

/* =========================
   Page
   ========================= */

export default async function VideosPage() {
    let videos: Awaited<ReturnType<typeof getChannelVideos>> = [];
    let apiError = false;

    try {
        videos = await getChannelVideos();
    } catch {
        apiError = true;
    }

    return (
        <main className="min-h-screen bg-black text-white">
            <section className="max-w-6xl mx-auto px-4 pt-28 pb-20">
                <FadeIn>
                    <div className="text-center mb-14">
                        <h1 className="text-4xl font-bold text-yellow-400 mb-3">
                            Videos
                        </h1>
                        <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
                            Lyric films, visual pieces, and behind-the-scenes sessions.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delayMs={160}>
                    {apiError ? (
                        <NoApiKeyFallback />
                    ) : (
                        <VideoTabs videos={videos} videoMap={videoMap} />
                    )}
                </FadeIn>
            </section>
        </main>
    );
}
