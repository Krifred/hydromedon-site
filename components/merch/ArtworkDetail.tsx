/* ==========================================================
   ArtworkDetail — artwork detail view (Gumroad-powered)
   Client component: manages selected size state
   ========================================================== */

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VariantSelector from "./VariantSelector";
import GumroadButton from "./GumroadButton";
import type { GumroadItem } from "@/lib/gumroad/catalog";

const PRINT_SIZES = ["12×12", "18×18"];

export default function ArtworkDetail({ item }: { item: GumroadItem }) {
    const [selectedSize, setSelectedSize] = useState(PRINT_SIZES[0]);

    return (
        <div className="max-w-5xl mx-auto px-6 py-14">
            {/* Back link */}
            <Link
                href="/merch"
                className="inline-flex items-center gap-2 text-xs text-white/40
                           hover:text-white/70 transition-colors tracking-widest
                           uppercase mb-10"
            >
                <span aria-hidden>&#8592;</span> Merch
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* ---- Image ---- */}
                <div
                    className="relative aspect-square rounded-sm overflow-hidden
                               border border-white/8 bg-black/20
                               shadow-[0_0_60px_rgba(212,175,55,0.08)]"
                >
                    <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>

                {/* ---- Details ---- */}
                <div className="flex flex-col gap-7">
                    {/* Title */}
                    <div>
                        <p className="font-cinzel text-xs tracking-[0.3em] text-yellow-500/50 uppercase mb-2">
                            Artwork
                        </p>
                        <h1 className="font-cinzel text-3xl sm:text-4xl text-white/90 tracking-tight leading-tight">
                            {item.title}
                        </h1>
                    </div>

                    {/* Price */}
                    {item.priceText && (
                        <span className="text-sm text-yellow-400/80 font-light tracking-wide">
                            {item.priceText}
                        </span>
                    )}

                    {/* Description */}
                    {item.description && (
                        <p className="text-sm text-white/50 leading-relaxed">
                            {item.description}
                        </p>
                    )}

                    {/* Size selector (UI only — all sizes link to the same Gumroad product) */}
                    <VariantSelector
                        sizes={PRINT_SIZES}
                        selected={selectedSize}
                        onChange={setSelectedSize}
                    />

                    {/* Purchase via Gumroad overlay */}
                    <GumroadButton href={item.gumroadUrl} />

                    {/* Fine print */}
                    <p className="text-xs text-white/25 leading-relaxed pt-2">
                        Prints are fulfilled and shipped directly. No returns on
                        custom artwork prints unless the item arrives damaged.
                    </p>
                </div>
            </div>
        </div>
    );
}

