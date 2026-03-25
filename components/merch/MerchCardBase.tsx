/* ==========================================================
   MerchCardBase - unified card for all merch item types.
   Accepts normalised props; rendered by MerchCard and SheetCard.

   Hover behaviour:
     - atmospheric shadow (12px depth + variant-tinted glow)
     - image scales inside the overflow-hidden container (no layout shift)
     - translate-y lift and image scale gated on motion-safe so
       prefers-reduced-motion users only see the border/shadow change
   ========================================================== */

export interface MerchCardBaseProps {
    href: string;
    /** Pass null to show the local placeholder. */
    image: string | null;
    alt: string;
    title: string;
    /** Quiet sub-label beneath the title. */
    subtitle?: string;
    /** Very small provenance line (e.g. "From the Tidebound Collection"). */
    badge?: string;
    ctaLabel?: string;
    /** Optional price string — displayed above the CTA when present. */
    price?: string;
    variant?: "artifact" | "wearable" | "sheet";
}

// ----- variant-specific tokens ----------------------------------------

const BORDER_HOVER = {
    artifact: "hover:border-yellow-500/30",
    wearable: "hover:border-[#C4A882]/45",
    sheet:    "hover:border-yellow-500/20",
} as const;

const SHADOW_HOVER = {
    artifact: "hover:shadow-[0_12px_32px_rgba(0,0,0,0.25),0_0_28px_rgba(212,175,55,0.14)]",
    wearable: "hover:shadow-[0_12px_32px_rgba(0,0,0,0.22),0_0_24px_rgba(196,168,130,0.14)]",
    sheet:    "hover:shadow-[0_12px_32px_rgba(0,0,0,0.20),0_0_24px_rgba(212,175,55,0.08)]",
} as const;

// Image scale is gated on motion-safe so reduced-motion users skip it.
const IMG_SCALE = {
    artifact: "motion-safe:group-hover:scale-[1.03]",
    wearable: "motion-safe:group-hover:scale-[1.015]",
    sheet:    "motion-safe:group-hover:scale-[1.05]",
} as const;

// -----------------------------------------------------------------------

export default function MerchCardBase({
    href,
    image,
    alt,
    title,
    subtitle,
    badge,
    ctaLabel = "View",
    price,
    variant = "artifact",
}: MerchCardBaseProps) {
    const borderHover = BORDER_HOVER[variant];
    const shadowHover = SHADOW_HOVER[variant];
    const imgScale    = IMG_SCALE[variant];

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} — ${ctaLabel.toLowerCase()}`}
            className={[
                "group block rounded-sm overflow-hidden",
                "border border-white/8 bg-white/[0.03]",
                "transition-all duration-300 ease-out",
                "motion-safe:hover:-translate-y-0.5",
                "active:opacity-90",
                borderHover,
                shadowHover,
            ].join(" ")}
        >
            {/* Cover image — overflow-hidden on parent clips the scale */}
            <div className="relative aspect-square overflow-hidden">
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={image}
                        alt={alt}
                        className={[
                            "absolute inset-0 w-full h-full object-cover",
                            "opacity-[0.97] group-hover:opacity-100",
                            "transition-[transform,opacity] duration-300",
                            imgScale,
                        ].join(" ")}
                    />
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src="/images/placeholder-merch.svg"
                        alt={alt}
                        className="absolute inset-0 w-full h-full object-contain p-10 opacity-[0.25]"
                    />
                )}
            </div>

            {/* Meta */}
            <div className="px-4 py-6 flex flex-col gap-3">
                <div>
                    <p className="text-sm font-medium tracking-[0.05em] text-white/80 leading-snug">
                        {title}
                    </p>
                    {subtitle && (
                        <p className="mt-1.5 text-xs text-white/30 leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                    {badge && (
                        <p className="mt-1 text-[10px] text-white/20 tracking-[0.15em] uppercase">
                            {badge}
                        </p>
                    )}
                </div>

                {price && (
                    <span className="text-xs text-white/40 font-light tracking-[0.05em]">
                        {price}
                    </span>
                )}

                {/* CTA — styled as a button but non-interactive since the
                    whole card is the link. group-hover keeps it in sync. */}
                <span
                    className="h-12 px-6 py-2 border border-yellow-500/40 text-yellow-400/60
                               rounded group-hover:border-yellow-500/70 group-hover:text-yellow-400/90
                               transition-colors duration-300 font-medium
                               inline-flex items-center justify-center text-sm"
                >
                    {ctaLabel}
                </span>
            </div>
        </a>
    );
}
