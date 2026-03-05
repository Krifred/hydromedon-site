/* ==========================================================
   VariantSelector — size picker for artwork prints
   Accepts plain string size labels (UI-only; no variant IDs)
   ========================================================== */

"use client";

interface VariantSelectorProps {
    sizes: string[];
    selected: string;
    onChange: (size: string) => void;
}

export default function VariantSelector({
    sizes,
    selected,
    onChange,
}: VariantSelectorProps) {
    if (sizes.length === 0) return null;

    return (
        <div className="flex flex-col gap-2">
            <p className="text-xs text-white/40 tracking-widest uppercase">
                Size
            </p>
            <div className="flex flex-wrap gap-2">
                {sizes.map((size) => {
                    const isSelected = size === selected;
                    return (
                        <button
                            key={size}
                            type="button"
                            onClick={() => onChange(size)}
                            aria-pressed={isSelected}
                            className={[
                                "px-4 py-2 text-xs tracking-wider border rounded-sm transition-all duration-200",
                                isSelected
                                    ? "border-yellow-500/70 text-yellow-400 bg-yellow-500/10"
                                    : "border-white/20 text-white/60 hover:border-yellow-500/40 hover:text-white/80",
                            ].join(" ")}
                        >
                            {size}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
