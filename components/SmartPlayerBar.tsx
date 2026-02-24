"use client";

import { useEffect, useState } from "react";
import { singleReleases } from "@/lib/releases";
// If not used, you can remove this import:
// import Link from "next/link";

export default function SmartPlayerBar() {
    const singles = singleReleases();

    // Rotation index
    const [index, setIndex] = useState(0);

    // Fade/zoom animation state
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        if (singles.length === 0) return;

        const interval = setInterval(() => {
            setIsFading(true);

            setTimeout(() => {
                setIndex((prev) => (prev + 1) % singles.length);
                setIsFading(false);
            }, 350); // fade-out duration
        }, 10000); // 10 seconds

        return () => clearInterval(interval);
    }, [singles.length]);

    const current = singles[index];
    if (!current) return null;

    return (
        <div
            className={`
        fixed bottom-0 left-0 right-0 z-50
        bg-black/90 border-t border-yellow-900/40
        backdrop-blur-md shadow-[0_-4px_22px_rgba(212,175,55,0.15)]
        transition-all duration-500
      `}
        >
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
                {/* Cover */}
                <div
                    className={`
            w-14 h-14 rounded-md overflow-hidden border border-yellow-900/40
            shadow-md flex-shrink-0
            transition-all duration-500
            ${isFading ? "opacity-0 scale-[0.97]" : "opacity-100 scale-100"}
          `}
                >
                    <img
                        src={current.cover}
                        alt={current.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Title + Subtitle */}
                <div
                    className={`
            flex flex-col transition-all duration-500
            ${isFading ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"}
          `}
                >
                    <span className="text-sm font-semibold text-yellow-300 tracking-wide">
                        {current.title}
                    </span>
                    {current.subtitle && (
                        <span className="text-xs text-gray-400">{current.subtitle}</span>
                    )}
                </div>

                <div className="flex-grow" />

                {/* Buttons */}
                <div className="flex gap-3">
                    {current.spotify && (
                        <a
                            href={current.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-1.5 rounded bg-yellow-500 text-black text-sm font-semibold shadow hover:bg-yellow-400 transition"
                        >
                            Play on Spotify
                        </a>
                    )}

                    {current.youtube && (
                        <a
                            href={current.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-1.5 rounded border border-yellow-500 text-yellow-500 text-sm font-semibold hover:bg-yellow-500 hover:text-black transition"
                        >
                            Watch on YouTube
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}