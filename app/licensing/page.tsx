import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";

export const metadata: Metadata = {
    title: "License My Music",
    description:
        "License Hydromedon's original compositions for church worship, online video, podcasts, film, and commercial use. Per-song and full-album bundles available.",
    alternates: {
        canonical: "https://www.hydromedon.com/licensing",
    },
    openGraph: {
        title: "License My Music | Hydromedon",
        description:
            "License Hydromedon's original compositions for church worship, online video, podcasts, film, and commercial use.",
        url: "https://www.hydromedon.com/licensing",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "License My Music | Hydromedon",
        description:
            "License Hydromedon's original compositions for church worship, online video, podcasts, film, and commercial use.",
    },
};

// ── License data ──────────────────────────────────────────────────────────────

const perSongLicenses = [
    {
        id: "church",
        name: "Church & Worship",
        price: "$19.95",
        description:
            "For congregations, worship teams, and ministry organizations. Covers live performance, projection, recordings for internal church use, and streaming of church services.",
        includes: [
            "Sync license + master license in one purchase",
            "Live performance at services and events",
            "Lyrics & chord projection",
            "Recording for internal church/ministry use",
            "Church service livestream and archive",
            "Unlimited congregations at one location",
        ],
        notIncluded: [
            "Commercial release or distribution",
            "Broadcast TV or film sync",
        ],
        storeUrl: "https://store.hydromedon.com/products/license-per-song-church",
        color: "yellow",
    },
    {
        id: "online",
        name: "Online Video",
        price: "$29.95",
        description:
            "For content creators, podcasters, and ministries publishing to YouTube, social media, or podcast platforms. Covers one song used in one channel or show.",
        includes: [
            "Sync license + master license in one purchase",
            "YouTube, Vimeo, and social media videos",
            "Podcast episodes",
            "Online course content",
            "One channel or show per license",
            "Perpetual use — no expiry",
        ],
        notIncluded: [
            "Broadcast TV or theatrical release",
            "Commercial advertising",
        ],
        storeUrl: "https://store.hydromedon.com/products/license-per-song-online-video",
        color: "yellow",
    },
    {
        id: "film",
        name: "Film, TV & Commercial",
        price: "$99.95",
        description:
            "For filmmakers, documentary producers, ad agencies, and broadcasters. Covers one song in one production for worldwide distribution. Includes both sync and master rights — no second license required.",
        includes: [
            "Sync license + master license in one purchase",
            "Feature film, short film, and documentary",
            "Broadcast television and streaming platforms",
            "Commercial advertising",
            "Worldwide distribution",
            "Perpetual use — no expiry",
        ],
        notIncluded: [
            "Multiple productions (separate license per project)",
        ],
        storeUrl: "https://store.hydromedon.com/products/license-per-song-film-tv",
        color: "yellow",
    },
];

const bundleLicenses = [
    {
        id: "bundle-church",
        name: "Church & Worship Bundle",
        subtitle: "Biblical Graffiti — All 8 Songs",
        price: "$99.95",
        saving: "Save $59.65 vs. individual licenses",
        description:
            "License the entire Biblical Graffiti album for your congregation. Everything in the per-song Church & Worship license, applied to all 8 compositions.",
        storeUrl: "https://store.hydromedon.com/products/license-bundle-biblical-graffiti-church",
    },
    {
        id: "bundle-online",
        name: "Online Video Bundle",
        subtitle: "Biblical Graffiti — All 8 Songs",
        price: "$149.95",
        saving: "Save $89.65 vs. individual licenses",
        description:
            "License all 8 songs from the Biblical Graffiti album for your channel or show. Everything in the per-song Online Video license, applied to all compositions.",
        storeUrl: "https://store.hydromedon.com/products/license-bundle-biblical-graffiti-online-video",
    },
    {
        id: "bundle-film",
        name: "Film, TV & Commercial Bundle",
        subtitle: "Biblical Graffiti — All 8 Songs",
        price: "$499.95",
        saving: "Save $299.65 vs. individual licenses",
        description:
            "License the full Biblical Graffiti album for your production. Everything in the per-song Film/TV license, applied to all 8 compositions.",
        storeUrl: "https://store.hydromedon.com/products/license-bundle-biblical-graffiti-film-tv",
    },
];

const songs = [
    "Arise, O Lord",
    "Armor of Light",
    "Beauty for Ashes",
    "Change Me, Mold Me, Make Me New",
    "Make a Way",
    "The Lord Bless You and Keep You",
    "Under Your Wings",
    "Your Peace Surpasses All Understanding",
];

const faqs = [
    {
        q: "Do I need a separate sync license and master license?",
        a: "No. Hydromedon is an independent composer who owns both the composition (sync) rights and the recording (master) rights to every song. One license from this page covers both — unlike major label music, where you would need to clear two separate rights holders.",
    },
    {
        q: "Do I need to credit Hydromedon?",
        a: "Yes — a simple credit is appreciated and required. For video and film use: \"[Song Title] by Hydromedon (hydromedon.com)\". For worship/projection use, crediting on your song list or bulletin is sufficient.",
    },
    {
        q: "Can I use the music before I receive the license?",
        a: "No. Please complete your purchase before using the music in any production, service, or publication.",
    },
    {
        q: "Is CCLI registration included?",
        a: "Not at this time. These licenses are direct from Hydromedon. If your church requires CCLI coverage, please contact us directly to discuss options.",
    },
    {
        q: "What if I need something not covered here?",
        a: "Reach out via the contact form and describe your use case. Custom licensing is available for unusual or large-scale uses.",
    },
    {
        q: "Are licenses transferable?",
        a: "No. Each license is issued to the purchaser for the specific use described. If you are licensing on behalf of an organization, the organization is the licensee.",
    },
    {
        q: "Can I use a licensed song in multiple projects?",
        a: "Per-song licenses cover one project or channel. If you need to use the same song in a second production or on a second channel, a separate license is required.",
    },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LicensingPage() {
    return (
        <main className="relative min-h-screen">

            {/* ── Ambient glow ───────────────────────────────────────── */}
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute inset-0" style={{ background: "radial-gradient(900px 600px at 50% 0%, rgba(212,175,55,0.06), transparent 60%)" }} />
            </div>

            <div className="relative z-10">

                {/* ── Header ─────────────────────────────────────────── */}
                <header className="max-w-4xl mx-auto px-6 pt-24 pb-14 text-center">
                    <FadeIn delayMs={0}>
                        <p className="text-[10px] tracking-[0.3em] text-white/25 uppercase mb-6">Hydromedon</p>
                        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 leading-tight tracking-tight mb-5">
                            License My Music
                        </h1>
                        <p className="text-sm text-white/50 leading-relaxed max-w-2xl mx-auto">
                            Hydromedon's compositions are available for licensing across worship, media, and commercial use.
                            Each license is a direct agreement with the composer — straightforward, honest, and built to serve your project.
                        </p>
                        <p className="mt-4 text-sm text-yellow-500/60 leading-relaxed max-w-2xl mx-auto">
                            As an independent composer, Hydromedon owns both the <span className="text-yellow-400/80">sync rights</span> and the <span className="text-yellow-400/80">master rights</span> to every recording.
                            One license covers both — no second rights holder to track down.
                        </p>
                    </FadeIn>
                </header>

                {/* ── Available songs ────────────────────────────────── */}
                <section className="max-w-4xl mx-auto px-6 pb-16">
                    <FadeIn delayMs={100}>
                        <div className="border border-white/8 bg-white/[0.02] rounded-sm px-6 py-5">
                            <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-4">Licensed Catalog</p>
                            <p className="text-sm text-white/50 mb-4">
                                All licenses apply to songs from the <span className="text-yellow-400/80">Biblical Graffiti</span> album:
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {songs.map((song, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                                        <span className="w-1 h-1 rounded-full bg-yellow-500/50 flex-shrink-0" />
                                        {song}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeIn>
                </section>

                {/* ── Per-song licenses ──────────────────────────────── */}
                <section className="max-w-6xl mx-auto px-6 pb-20">
                    <FadeIn delayMs={120}>
                        <div className="mb-10">
                            <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">Per Song</p>
                            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 leading-tight tracking-tight">
                                Single Song Licenses
                            </h2>
                            <p className="mt-3 text-sm text-white/45 max-w-xl">
                                One license per song, per use. Purchase multiple times to cover additional songs.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {perSongLicenses.map((license, i) => (
                            <FadeIn key={license.id} delayMs={140 + i * 80}>
                                <div className="flex flex-col h-full border border-white/8 bg-white/[0.02] rounded-sm p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-500/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12),0_0_32px_rgba(212,175,55,0.18)]">
                                    <p className="text-xs tracking-[0.2em] text-yellow-500/60 uppercase mb-2">{license.name}</p>
                                    <p className="text-3xl font-bold text-yellow-400 mb-3">{license.price}</p>
                                    <p className="text-xs text-white/45 leading-relaxed mb-5">{license.description}</p>

                                    <div className="mb-5 space-y-1.5">
                                        {license.includes.map((item, j) => (
                                            <div key={j} className="flex items-start gap-2 text-xs text-white/55">
                                                <span className="mt-0.5 text-yellow-500/70 flex-shrink-0">✓</span>
                                                {item}
                                            </div>
                                        ))}
                                        {license.notIncluded.map((item, j) => (
                                            <div key={j} className="flex items-start gap-2 text-xs text-white/25">
                                                <span className="mt-0.5 flex-shrink-0">✗</span>
                                                {item}
                                            </div>
                                        ))}
                                    </div>


                                    href={license.storeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto h-11 px-6 border border-yellow-500/40 text-yellow-400/70 rounded hover:border-yellow-500/80 hover:text-yellow-400 hover:bg-yellow-500/5 transition-colors duration-300 inline-flex items-center justify-center text-sm font-medium"
                                    >
                                    Get This License
                                </a>
                            </div>
                            </FadeIn>
                        ))}
            </div>
        </section>

                {/* ── Bundle licenses ────────────────────────────────── */ }
    <section className="max-w-6xl mx-auto px-6 pb-20">
        <FadeIn delayMs={0}>
            <div className="mb-10">
                <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">Full Album</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 leading-tight tracking-tight">
                    Biblical Graffiti Bundles
                </h2>
                <p className="mt-3 text-sm text-white/45 max-w-xl">
                    License all 8 songs from the album at once — the most economical option for productions that need the full catalog.
                </p>
            </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bundleLicenses.map((license, i) => (
                <FadeIn key={license.id} delayMs={80 + i * 80}>
                    <div className="flex flex-col h-full border border-yellow-500/20 bg-yellow-500/[0.03] rounded-sm p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-500/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12),0_0_40px_rgba(212,175,55,0.22)]">
                        <p className="text-xs tracking-[0.2em] text-yellow-500/60 uppercase mb-1">{license.name}</p>
                        <p className="text-xs text-white/30 mb-3">{license.subtitle}</p>
                        <p className="text-3xl font-bold text-yellow-400 mb-1">{license.price}</p>
                        <p className="text-xs text-yellow-500/50 mb-4">{license.saving}</p>
                        <p className="text-xs text-white/45 leading-relaxed mb-6">{license.description}</p>


                        href={license.storeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto h-11 px-6 bg-yellow-500/10 border border-yellow-500/50 text-yellow-400 rounded hover:bg-yellow-500/20 hover:border-yellow-500/80 transition-colors duration-300 inline-flex items-center justify-center text-sm font-medium"
                                    >
                        Get the Bundle
                    </a>
                </div>
                            </FadeIn>
                        ))}
    </div>
                </section >

        {/* ── FAQ ────────────────────────────────────────────── */ }
        < section className = "max-w-3xl mx-auto px-6 pb-20" >
                    <FadeIn delayMs={0}>
                        <div className="mb-10">
                            <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">Questions</p>
                            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 leading-tight tracking-tight">
                                Frequently Asked
                            </h2>
                        </div>
                    </FadeIn>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <FadeIn key={i} delayMs={60 + i * 40}>
                                <div className="border border-white/8 bg-white/[0.02] rounded-sm px-5 py-4">
                                    <p className="text-sm font-medium text-white/80 mb-2">{faq.q}</p>
                                    <p className="text-xs text-white/45 leading-relaxed">{faq.a}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </section >

        {/* ── Custom licensing CTA ───────────────────────────── */ }
        < section className = "max-w-3xl mx-auto px-6 pb-28 text-center" >
            <FadeIn delayMs={0}>
                <div className="border border-white/8 bg-white/[0.02] rounded-sm px-8 py-10">
                    <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-4">Custom Use</p>
                    <h2 className="text-xl font-bold text-yellow-400 mb-3">Need something different?</h2>
                    <p className="text-sm text-white/45 leading-relaxed mb-6 max-w-md mx-auto">
                        Large-scale broadcast, multi-territory use, exclusive licensing, or anything not covered above —
                        reach out and we'll work something out.
                    </p>
                    <Link
                        href="/#contact"
                        className="h-11 px-8 border border-yellow-500/40 text-yellow-400/70 rounded hover:border-yellow-500/80 hover:text-yellow-400 transition-colors duration-300 inline-flex items-center justify-center text-sm font-medium"
                    >
                        Get in Touch
                    </Link>
                </div>
            </FadeIn>
                </section >

            </div >

        {/* ── JSON-LD ────────────────────────────────────────────── */ }
        < script
    type = "application/ld+json"
    dangerouslySetInnerHTML = {{
        __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "License My Music | Hydromedon",
            "description": "License Hydromedon's original compositions for church worship, online video, podcasts, film, and commercial use.",
            "url": "https://www.hydromedon.com/licensing",
        }),
                }
}
            />
    < script
type = "application/ld+json"
dangerouslySetInnerHTML = {{
    __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hydromedon.com" },
            { "@type": "ListItem", "position": 2, "name": "Licensing", "item": "https://www.hydromedon.com/licensing" },
        ],
    }),
                }}
            />
    < script
type = "application/ld+json"
dangerouslySetInnerHTML = {{
    __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Hydromedon Music Licenses",
        "itemListElement": [...perSongLicenses, ...bundleLicenses].map((l, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": l.name,
            "url": l.storeUrl,
        })),
    }),
                }}
            />

        </main >
    );
}