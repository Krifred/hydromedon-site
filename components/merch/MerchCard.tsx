/* ==========================================================
   MerchCard — card for a Fourthwall collection
   ========================================================== */

import type { FWCollection } from "@/lib/fourthwall";

type CardVariant = "artifact" | "wearable";

const SUB_LABELS: Record<CardVariant, string> = {
    artifact: "A piece shaped by tide and time.",
    wearable: "Pieces meant to be lived in.",
};

const CTA_LABELS: Record<CardVariant, string> = {
    artifact: "View the Object",
    wearable: "Enter Collection",
};

interface MerchCardProps {
    collection: FWCollection;
    variant?: CardVariant;
}

export default function MerchCard({ collection, variant = "artifact" }: MerchCardProps) {
    const hoverBorder = variant === "wearable"
        ? "hover:border-[#C4A882]/45"
        : "hover:border-yellow-500/30";
    const hoverShadow = variant === "wearable"
        ? "hover:shadow-[0_8px_24px_rgba(0,0,0,0.10),0_0_28px_rgba(196,168,130,0.16)]"
        : "hover:shadow-[0_8px_24px_rgba(0,0,0,0.12),0_0_32px_rgba(212,175,55,0.22)]";
    const imgScale = variant === "wearable" ? "group-hover:scale-[1.015]" : "group-hover:scale-[1.03]";

    return (
        <a
            href={collection.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${collection.name} — open collection`}
            className={`group block rounded-sm overflow-hidden border border-white/8 bg-white/[0.03] transition-all duration-300 ease-out hover:-translate-y-0.5 active:opacity-90 ${hoverBorder} ${hoverShadow}`}
        >
            {/* Cover image — fixed warm-grey background */}
            <div
                className="relative aspect-square overflow-hidden"
                style={{ backgroundColor: "#D9D9D9" }}
            >
                {collection.primaryImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={collection.primaryImage.url}
                        alt={collection.name}
                        className={`absolute inset-0 w-full h-full object-contain p-2 opacity-[0.97] group-hover:opacity-100 transition-[transform,opacity] duration-500 ${imgScale}`}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02]" />
                )}
            </div>

            {/* Meta + button */}
            <div className="px-4 py-6 flex flex-col gap-3">
                <div>
                    <p className="text-sm font-medium tracking-[0.05em] text-white/80 leading-snug">
                        {collection.name}
                    </p>
                    <p className="mt-1.5 text-xs text-white/30 leading-relaxed">
                        {SUB_LABELS[variant]}
                    </p>
                    {variant === "artifact" && (
                        <p className="mt-1 text-[10px] text-white/20 tracking-[0.15em] uppercase">
                            From the Tidebound Collection
                        </p>
                    )}
                </div>

                <span
                    className="h-12 px-6 py-2 border border-yellow-500/40 text-yellow-400/60
                               rounded group-hover:border-yellow-500/70 group-hover:text-yellow-400/90
                               transition-colors duration-300 font-medium
                               inline-flex items-center justify-center text-sm"
                >
                    {CTA_LABELS[variant]}
                </span>
            </div>
        </a>
    );
}
