/* ==========================================================
   ArtworkDetail — full product detail for an artwork print
   Client component: manages selected variant state
   ========================================================== */

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VariantSelector from "./VariantSelector";
import PurchaseButton from "./PurchaseButton";
import PriceTag from "./PriceTag";
import type { Product } from "@/lib/shopify/types";

export default function ArtworkDetail({ product }: { product: Product }) {
    // Default to the first available variant
    const defaultVariant =
        product.variants.find((v) => v.availableForSale) ??
        product.variants[0] ??
        null;

    const [selectedId, setSelectedId] = useState<string | null>(
        defaultVariant?.id ?? null
    );

    const selectedVariant =
        product.variants.find((v) => v.id === selectedId) ?? null;

    const image = product.featuredImage;
    const images = product.images ?? [];
    const primaryImage = image ?? images[0] ?? null;

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
                    {primaryImage ? (
                        <Image
                            src={primaryImage.url}
                            alt={primaryImage.altText ?? product.title}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white/20 text-xs tracking-widest uppercase">
                                No image
                            </span>
                        </div>
                    )}
                </div>

                {/* ---- Details ---- */}
                <div className="flex flex-col gap-7">
                    {/* Title */}
                    <div>
                        <p className="font-cinzel text-xs tracking-[0.3em] text-yellow-500/50 uppercase mb-2">
                            Artwork
                        </p>
                        <h1 className="font-cinzel text-3xl sm:text-4xl text-white/90 tracking-tight leading-tight">
                            {product.title}
                        </h1>
                    </div>

                    {/* Price */}
                    {selectedVariant ? (
                        <div>
                            <PriceTag price={selectedVariant.price} />
                        </div>
                    ) : null}

                    {/* Description */}
                    {product.description && (
                        <p className="text-sm text-white/50 leading-relaxed">
                            {product.description}
                        </p>
                    )}

                    {/* Variant selector */}
                    <VariantSelector
                        variants={product.variants}
                        selectedId={selectedId}
                        onChange={setSelectedId}
                    />

                    {/* Purchase */}
                    <PurchaseButton variantId={selectedId} />

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
