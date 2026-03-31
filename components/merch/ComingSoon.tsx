/* ==========================================================
   ComingSoon — branded "not yet available" page for /merch/[slug]
   Rendered when a product does not exist, is not published,
   is not visible, or has no purchasable variants.
   ========================================================== */

import Link from "next/link";
import FadeIn from "@/components/FadeIn";

interface ComingSoonProps {
    title: string;
}

export default function ComingSoon({ title }: ComingSoonProps) {
    return (
        <main
            data-page-enter
            className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
            style={{ animation: "merch-page-enter 700ms 100ms ease-out both" }}
        >
            <style>{`
                @keyframes merch-page-enter {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0);    }
                }
                @media (prefers-reduced-motion: reduce) {
                    [data-page-enter] { animation: none !important; }
                }
            `}</style>

            {/* Subtle radial glow — matches the merch page section background */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(800px 600px at 50% 40%, rgba(212,175,55,0.05), transparent 65%)" }}
            />

            <FadeIn delayMs={80} durationMs={700} y={16} className="relative flex flex-col items-center">
                <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-4">
                    Coming soon
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-400 leading-none tracking-tight mb-6">
                    {title}
                </h1>

                <p className="text-xs sm:text-sm text-white/40 max-w-xs leading-relaxed">
                    This item is not yet available on the store.
                    <br />
                    Check back after the official release.
                </p>

                <div className="mt-10">
                    <Link
                        href="/merch"
                        className="text-xs tracking-[0.18em] text-white/30 uppercase
                                   hover:text-white/60 transition-colors duration-200"
                    >
                        ← Back to Merch
                    </Link>
                </div>
            </FadeIn>
        </main>
    );
}
