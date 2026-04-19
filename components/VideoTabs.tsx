"use client";

import { useState } from "react";
import type { YouTubeVideo } from "@/lib/youtube";
import type { VideoMeta, VideoType } from "@/src/data/videoMap";
import VideoCard from "./VideoCard";

/* =========================
   Types
   ========================= */

type TabKey = "all" | VideoType;

const TABS: { key: TabKey; label: string }[] = [
    { key: "all",        label: "All"          },
    { key: "lyric",      label: "Lyric Videos" },
    { key: "visual",     label: "Visual"       },
    { key: "making-of",  label: "Making-of"    },
];

/* =========================
   Component
   ========================= */

export default function VideoTabs({
    videos,
    videoMap,
}: {
    videos: YouTubeVideo[];
    videoMap: Record<string, VideoMeta>;
}) {
    const [active, setActive] = useState<TabKey>("all");

    const filtered =
        active === "all"
            ? videos
            : videos.filter((v) => videoMap[v.id]?.type === active);

    return (
        <div>
            {/* Tab bar */}
            <div className="flex justify-center mb-10">
                <div className="inline-flex gap-8 text-sm md:text-base">
                    {TABS.map((tab) => {
                        const isActive = active === tab.key;
                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActive(tab.key)}
                                className={`relative px-2 py-1 tracking-wide transition-colors ${
                                    isActive
                                        ? "text-yellow-400"
                                        : "text-gray-500 hover:text-gray-300"
                                }`}
                            >
                                <span className="relative z-10">{tab.label}</span>
                                {isActive && (
                                    <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-[2px] bg-gradient-to-r from-yellow-500/0 via-yellow-400 via-60% to-yellow-500/0 shadow-[0_0_18px_rgba(212,175,55,0.7)]" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Grid or empty state */}
            {filtered.length === 0 ? (
                <div className="py-24 text-center text-gray-600 text-sm">
                    {active === "all"
                        ? "No videos available yet."
                        : `No ${TABS.find((t) => t.key === active)?.label.toLowerCase()} yet.`}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((video) => (
                        <VideoCard
                            key={video.id}
                            video={video}
                            meta={videoMap[video.id]}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
