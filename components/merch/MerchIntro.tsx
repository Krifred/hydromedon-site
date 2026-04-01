/* ==========================================================
   MerchIntro - cinematic header for the merch page
   ========================================================== */

import FadeIn from "@/components/FadeIn";

export default function MerchIntro() {
    return (
        <header className="relative w-full pt-32 pb-10 overflow-hidden">
            {/* Atmospheric background */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(1000px 600px at 50% 40%, rgba(212,175,55,0.07), transparent 65%)",
                    }}
                />
                <div className="bg-noise absolute inset-0" />
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/25 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative max-w-4xl mx-auto px-6 text-center">
                <FadeIn delayMs={150} durationMs={600} y={8} blurPx={0}>
                    <p className="text-[10px] tracking-[0.3em] text-white/25 uppercase mb-6 js-merch-intro">
                        Hydromedon
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white/90 leading-tight tracking-tight js-merch-intro">
                        Hydromedon Merch
                    </h1>
                    <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-xl mx-auto js-merch-intro">
                        Objects, garments, and songs shaped by tide, time, and devotion.
                    </p>
                </FadeIn>

                <FadeIn delayMs={320} durationMs={700} y={10} blurPx={4}>
                    <p className="mt-8 text-sm text-white/40 leading-relaxed max-w-2xl mx-auto text-left sm:text-center js-merch-intro">
                        Hydromedon began at the edge of a long silence — the kind that comes
                        after something breaks and before you know if it can be mended. This
                        merch is an extension of that space.
                    </p>
                    <p className="mt-4 text-sm text-white/40 leading-relaxed max-w-2xl mx-auto text-left sm:text-center js-merch-intro">
                        These are not objects made to fill shelves. Every garment, every cup,
                        every score and artifact is made with the same deliberate attention we
                        bring to the music: nothing by accident, everything for a reason. The
                        wearables are for those who carry weight quietly. The kitchen pieces are
                        for the hours around a table when the ordinary becomes holy. The
                        computerware is for the ones who create in the darkness, before the light
                        arrives.
                    </p>
                    <p className="mt-4 text-sm text-white/40 leading-relaxed max-w-2xl mx-auto text-left sm:text-center js-merch-intro">
                        We make things that last — not because permanence is possible, but
                        because the attempt is faithful. Everything here is an offering.{" "}
                        Take what speaks.
                    </p>
                </FadeIn>
            </div>
        </header>
    );
}
