"use client";

import { useState } from "react";
import type { Release } from "@/lib/releases";
import MusicGrid from "./MusicGrid";

type TabKey = "Singles" | "Albums" | "Videos";

export default function MusicTabs({
    singles,
    albums,
    videos,
}: {
    singles: Release[];
    albums: Release[];
    videos: Release[];
}) {
    const [active, setActive] = useState<TabKey>("Singles");

    const tabs: { key: TabKey; label: string }[] = [
        { key: "Singles", label: "Singles" },
        { key: "Albums", label: "Albums" },
        { key: "Videos", label: "Videos" },
    ];

    const currentItems =
        active === "Singles" ? singles :
            active === "Albums" ? albums :
                videos;

    return (
        <section className="max-w-6xl mx-auto px-4 pb-20">

            {/* ⭐ Tabs only — header removed */}
            <div className="flex justify-center mb-10">
                <div className="inline-flex gap-10 text-sm md:text-base">
                    {tabs.map((tab) => {
                        const isActive = active === tab.key;
                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActive(tab.key)}
                                className={`relative px-3 md:px-4 py-1 tracking-wide transition-colors ${isActive
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

            <MusicGrid title={active} items={currentItems} />
        </section>
    );
}
