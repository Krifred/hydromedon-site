/* ==========================================================
   MerchCard — card for a Fourthwall collection
   Client component: detects image brightness and applies a
   light background for dark products so they remain visible.
   ========================================================== */

"use client";

import { useRef, useState, useEffect } from "react";
import type { FourthwallCollection } from "@/lib/fourthwall/types";

const STORE_BASE = "https://store.hydromedon.com";
/** 0–255 average pixel brightness below which we use a light bg */
const DARK_THRESHOLD = 40;

function computeBrightness(img: HTMLImageElement): number {
    try {
        const SIZE = 32; // sample at 32×32 — fast and accurate enough
        const canvas = document.createElement("canvas");
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext("2d");
        if (!ctx) return 255;
        ctx.drawImage(img, 0, 0, SIZE, SIZE);
        const { data } = ctx.getImageData(0, 0, SIZE, SIZE);
        let total = 0;
        for (let i = 0; i < data.length; i += 4) {
            // Perceived brightness — ITU-R BT.601
            total += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        }
        return total / (SIZE * SIZE);
    } catch {
        // Canvas tainted by CORS — conservative default (assume light)
        return 255;
    }
}

interface MerchCardProps {
    collection: FourthwallCollection;
    /** Optional local image override — collections have no images in the API. */
    imageSrc?: string | null;
}

export default function MerchCard({ collection, imageSrc }: MerchCardProps) {
    const imageUrl = imageSrc ?? null;
    const href = `${STORE_BASE}/collections/${collection.slug}`;
    const imgRef = useRef<HTMLImageElement>(null);
    const [lightBg, setLightBg] = useState(false);

    useEffect(() => {
        if (!imageUrl) return;
        const img = imgRef.current;
        if (!img) return;

        const analyse = () => {
            const brightness = computeBrightness(img);
            setLightBg(brightness < DARK_THRESHOLD);
        };

        if (img.complete && img.naturalWidth > 0) {
            analyse();
        } else {
            img.addEventListener("load", analyse, { once: true });
        }
    }, [imageUrl]);

    return (
        <div
            className="group rounded-sm overflow-hidden border border-white/8
                       bg-white/[0.03] transition-all duration-300 ease-out
                       hover:border-yellow-500/30
                       hover:shadow-[0_0_32px_rgba(212,175,55,0.22)]"
        >
            {/* Cover image */}
            <div
                className={`relative aspect-square overflow-hidden transition-colors duration-300 ${
                    lightBg ? "bg-light-artifact border border-yellow-500/20" : "bg-black/20"
                }`}
            >
                {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        ref={imgRef}
                        src={imageUrl}
                        alt={collection.name}
                        crossOrigin="anonymous"
                        className="absolute inset-0 w-full h-full object-contain p-2
                                   transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02]" />
                )}
            </div>

            {/* Meta + button */}
            <div className="px-4 py-5 flex flex-col gap-3">
                <p className="text-sm text-white/75 leading-snug tracking-wide">
                    {collection.name}
                </p>

                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-7 py-2 border border-yellow-500 text-yellow-500
                               rounded hover:bg-yellow-500 hover:text-black
                               transition font-semibold inline-flex items-center justify-center text-sm"
                >
                    Explore Collection
                </a>
            </div>
        </div>
    );
}
