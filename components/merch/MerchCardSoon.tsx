/* ==========================================================
   MerchCardSoon — placeholder card for a Fourthwall collection
   that has not yet been published on the storefront.
   Matches MerchCard visual structure exactly (same dimensions,
   same spacing, same button shape — just muted and non-interactive).
   ========================================================== */

interface MerchCardSoonProps {
    title: string;
}

export default function MerchCardSoon({ title }: MerchCardSoonProps) {
    return (
        <div className="block rounded-sm overflow-hidden border border-white/[0.06] bg-white/[0.02]">
            {/* Image placeholder — mirrors MerchCard image container */}
            <div className="w-full aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-white/[0.04] to-white/[0.01] flex items-end p-4">
                <span
                    className="inline-block rounded-full border border-yellow-500/30
                               px-2.5 py-1 text-[10px] tracking-[0.18em]
                               text-yellow-400/50 uppercase"
                >
                    Available soon
                </span>
            </div>

            {/* Meta — mirrors MerchCard meta block */}
            <div className="px-4 py-6 flex flex-col gap-3">
                <p className="text-sm font-medium tracking-[0.05em] text-white/25 leading-snug">
                    {title}
                </p>

                <div
                    className="h-12 px-6 py-2 border border-white/[0.08] text-white/20
                               rounded font-medium inline-flex items-center justify-center
                               text-sm cursor-not-allowed select-none"
                >
                    Available soon
                </div>
            </div>
        </div>
    );
}
