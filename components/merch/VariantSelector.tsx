/* ==========================================================
   VariantSelector — size picker for artwork prints
   Client component (controlled by ArtworkDetail)
   ========================================================== */

"use client";

import type { Variant } from "@/lib/shopify/types";

interface VariantSelectorProps {
    variants: Variant[];
    selectedId: string | null;
    onChange: (variantId: string) => void;
}

export default function VariantSelector({
    variants,
    selectedId,
    onChange,
}: VariantSelectorProps) {
    if (variants.length === 0) return null;

    // Prefer the "Size" option label; fall back to variant.title
    const label = (v: Variant) =>
        v.selectedOptions.find(
            (o) => o.name.toLowerCase() === "size"
        )?.value ?? v.title;

    return (
        <div className="flex flex-col gap-2">
            <p className="text-xs text-white/40 tracking-widest uppercase">
                Size
            </p>
            <div className="flex flex-wrap gap-2">
                {variants.map((v) => {
                    const isSelected = v.id === selectedId;
                    const unavailable = !v.availableForSale;

                    return (
                        <button
                            key={v.id}
                            type="button"
                            disabled={unavailable}
                            onClick={() => onChange(v.id)}
                            aria-pressed={isSelected}
                            className={[
                                "px-4 py-2 text-xs tracking-wider border rounded-sm transition-all duration-200",
                                unavailable
                                    ? "border-white/10 text-white/25 cursor-not-allowed line-through"
                                    : isSelected
                                    ? "border-yellow-500/70 text-yellow-400 bg-yellow-500/10"
                                    : "border-white/20 text-white/60 hover:border-yellow-500/40 hover:text-white/80",
                            ].join(" ")}
                        >
                            {label(v)}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
