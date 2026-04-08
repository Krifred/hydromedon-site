import type { Metadata } from "next";
import { compositions } from "@/data/compositions";

export const metadata: Metadata = {
    title: "Sheet Music",
    description:
        "Handcrafted lead sheets and full scores for every Hydromedon composition. For worship teams, musicians, and those who play by faith.",
    alternates: {
        canonical: "https://www.hydromedon.com/sheet-music",
    },
    openGraph: {
        title: "Sheet Music | Hydromedon",
        description:
            "Handcrafted lead sheets and full scores for every Hydromedon composition. For worship teams, musicians, and those who play by faith.",
        url: "https://www.hydromedon.com/sheet-music",
        type: "website",
    },
};

export default function SheetMusicIndexPage() {
    return (
        <main className="relative min-h-screen">

            {/* ── Header ────────────────────────────────────────────────── */}
            <header className="relative max-w-4xl mx-auto px-6 pt-24 pb-12 text-center">
                <div className="pointer-events-none absolute inset-0">
                    <div
                        className="absolute inset-0"
                        style={{ background: "radial-gradient(1000px 600px at 50% 40%, rgba(212,175,55,0.07), transparent 65%)" }}
                    />
                </div>
                <div className="relative">
                    <p className="text-[10px] tracking-[0.3em] text-white/25 uppercase mb-6">Hydromedon</p>
                    <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 leading-tight tracking-tight">
                        Sheet Music
                    </h1>
                    <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-xl mx-auto">
                        Handcrafted lead sheets for the songs that surface from silence. For those who play by faith.
                    </p>
                </div>
            </header>

            {/* ── Compositions ──────────────────────────────────────────── */}
            <section className="relative max-w-6xl mx-auto px-6 pt-8 pb-16 sm:pb-20">
                <div className="pointer-events-none absolute inset-0">
                    <div
                        className="absolute inset-0"
                        style={{ background: "radial-gradient(900px 500px at 20% 10%, rgba(212,175,55,0.06), transparent 60%)" }}
                    />
                </div>

                <div className="relative mb-10 sm:mb-12">
                    <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">Browse</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 leading-tight tracking-tight">
                        Compositions
                    </h2>
                </div>

                <ul className="relative grid grid-cols-2 lg:grid-cols-4 gap-5 p-0 m-0 list-none">
                    {compositions.map((item, i) => {
                        const leadScore = item.scores.find((s) => s.type === "Lead Sheet");
                        const isAvailable = leadScore?.status === "available";

                        return (
                            <li key={i}>
                                <a
                                    href={isAvailable ? `/sheet-music/${item.slug}` : "#"}
                                    className={`group block rounded-sm overflow-hidden border border-white/8 bg-white/[0.03] transition-all duration-300 ease-out ${isAvailable
                                            ? "hover:-translate-y-0.5 hover:border-yellow-500/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12),0_0_32px_rgba(212,175,55,0.22)]"
                                            : "opacity-60 pointer-events-none"
                                        }`}
                                >
                                    <div className="relative w-full aspect-[3/4] overflow-hidden">
                                        <img
                                            src={`/covers/${item.slug}.jpg`}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                        {!isAvailable && (
                                            <span className="absolute bottom-2 right-2 border border-yellow-400/60 text-yellow-400/60 text-xs px-2 py-1 rounded bg-black/60">
                                                Coming Soon
                                            </span>
                                        )}
                                    </div>

                                    <div className="px-4 py-6 flex flex-col gap-3">
                                        <h3 className="text-sm font-medium tracking-[0.05em] text-white/80 leading-snug">
                                            {item.title}
                                        </h3>
                                        {item.subtitle && (
                                            <p className="text-xs text-white/45 leading-relaxed">{item.subtitle}</p>
                                        )}
                                        {leadScore?.priceText && (
                                            <p className="text-xs text-yellow-500/70">{leadScore.priceText}</p>
                                        )}
                                        {isAvailable && (
                                            <div className="h-12 px-6 border border-yellow-500/40 text-yellow-400/60 rounded group-hover:border-yellow-500/70 group-hover:text-yellow-400/90 transition-colors duration-300 font-medium inline-flex items-center justify-center text-sm">
                                                View Score
                                            </div>
                                        )}
                                    </div>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* JSON-LD: WebPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Sheet Music",
                        "description": "Explore all available and upcoming Hydromedon compositions.",
                        "url": "https://www.hydromedon.com/sheet-music",
                    }),
                }}
            />

            {/* JSON-LD: BreadcrumbList */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hydromedon.com" },
                            { "@type": "ListItem", "position": 2, "name": "Sheet Music", "item": "https://www.hydromedon.com/sheet-music" },
                        ],
                    }),
                }}
            />

            {/* JSON-LD: ItemList of Compositions */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": "Hydromedon Sheet Music Catalog",
                        "itemListElement": compositions.map((item, index) => ({
                            "@type": "ListItem",
                            "position": index + 1,
                            "name": item.title,
                            "url": `https://www.hydromedon.com/sheet-music/${item.slug}`,
                            "description": item.description,
                        })),
                    }),
                }}
            />

        </main>
    );
}
