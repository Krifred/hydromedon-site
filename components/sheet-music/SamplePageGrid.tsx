/* ==========================================================
   SamplePageGrid — sheet music sample page thumbnail grid
   Renders a responsive grid of score preview images.
   Clicking any thumbnail opens a simple CSS-modal lightbox.
   ========================================================== */

"use client";

import { useState } from "react";
import Image from "next/image";

interface SamplePageGridProps {
    images: string[];
    title: string;
}

export default function SamplePageGrid({ images, title }: SamplePageGridProps) {
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((src, i) => (
                    <button
                        key={i}
                        onClick={() => setLightboxSrc(src)}
                        className="relative aspect-[3/4] overflow-hidden rounded-sm border border-white/8
                                   bg-white/[0.02] hover:border-yellow-500/30 transition-colors duration-300
                                   group"
                        aria-label={`View sample page ${i + 1}`}
                    >
                        <Image
                            src={src}
                            alt={`${title} — sample page ${i + 1}`}
                            fill
                            sizes="(min-width: 640px) 33vw, 50vw"
                            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        />
                    </button>
                ))}
            </div>

            {lightboxSrc && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Sample page preview"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 cursor-zoom-out"
                    onClick={() => setLightboxSrc(null)}
                >
                    <div className="relative max-w-3xl w-full max-h-[90vh] aspect-[3/4]">
                        <Image
                            src={lightboxSrc}
                            alt="Sample page preview"
                            fill
                            sizes="(min-width: 768px) 768px, 100vw"
                            className="object-contain"
                        />
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); setLightboxSrc(null); }}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                                   text-white/50 hover:text-white transition-colors text-xl leading-none"
                        aria-label="Close preview"
                    >
                        ×
                    </button>
                </div>
            )}
        </>
    );
}
