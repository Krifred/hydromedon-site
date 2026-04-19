import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Faith Behind the Music — Hydromedon",
    description:
        "Hydromedon makes music rooted in Christian faith. This page is for anyone curious about what that actually means — written in plain language, not doctrine.",
};

/* =========================
   Sub-components
   ========================= */

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-xs tracking-[0.25em] text-yellow-400/60 uppercase mb-4">
            {children}
        </p>
    );
}

function SectionHeading({
    id,
    children,
}: {
    id?: string;
    children: React.ReactNode;
}) {
    return (
        <h2
            id={id}
            className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 leading-tight"
        >
            {children}
        </h2>
    );
}

function Prose({ children }: { children: React.ReactNode }) {
    return (
        <div className="space-y-5 text-gray-300 leading-relaxed text-[1.0625rem]">
            {children}
        </div>
    );
}

function Divider() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="h-px bg-white/8 my-16" />
        </div>
    );
}

/* =========================
   Page
   ========================= */

export default function FaithPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-2xl mx-auto px-6 pt-28 pb-24">

                {/* ── H1 ─────────────────────────────────────────────── */}
                <FadeIn>
                    <header className="mb-16">
                        <p className="text-xs tracking-[0.25em] text-yellow-400/50 uppercase mb-5">
                            Hydromedon
                        </p>
                        <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 leading-tight mb-6">
                            The faith behind the music
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            If you found this project through a song and wondered where it
                            comes from — this page is for you. It isn't written for
                            theologians. It's written for anyone curious enough to ask.
                        </p>
                    </header>
                </FadeIn>

                {/* ── Section 1 ───────────────────────────────────────── */}
                <FadeIn delayMs={120}>
                    <section aria-labelledby="s1-heading">
                        <SectionLabel>01</SectionLabel>
                        <SectionHeading id="s1-heading">
                            What Hydromedon believes
                        </SectionHeading>

                        <Prose>
                            {/* Who Jesus is */}
                            <p>
                                The music starts with one conviction: Jesus isn&apos;t a
                                metaphor, and he isn&apos;t a comfort offered to the
                                afraid. Christians across two thousand years have held that
                                he was both fully human and fully God — someone who walked
                                into the worst of human experience, died inside it, and
                                didn&apos;t stay dead. That belief isn&apos;t a detail in
                                this project. It&apos;s the load-bearing wall. Grace —
                                the idea that God reaches toward people before they reach
                                back — is treated here not as a nicety, but as the single
                                most surprising thing that has ever been claimed.
                            </p>

                            {/* What scripture means */}
                            <p>
                                Every song was shaped by actual scripture. The liner notes
                                for each release show which passage carried it — Ephesians
                                6 behind a song about endurance, Isaiah 61 behind a song
                                about loss, Philippians 4 behind a song about anxiety that
                                won&apos;t quiet down. The Bible isn&apos;t used here as
                                decoration, or to signal belonging to a tribe. It&apos;s
                                read as a document that is trusted to tell the truth: about
                                what humans are like, about what God is like, and about the
                                gap between the two that keeps causing grief.
                            </p>

                            {/* Why music is an act of faith */}
                            <p>
                                Making music this way is a form of prayer. The slower
                                tempos, the long instrumental spaces, the lines that
                                don&apos;t resolve quickly — these aren&apos;t aesthetic
                                choices made to feel spiritual. They&apos;re attempts to
                                tell the truth about what faith actually feels like from
                                the inside: patient, sometimes silent, occasionally
                                overwhelming, and carried more by what you trust than by
                                what you feel. Beauty isn&apos;t treated as coincidental
                                here. It&apos;s treated as evidence of something.
                            </p>
                        </Prose>
                    </section>
                </FadeIn>

                <Divider />

                {/* ── Section 2 ───────────────────────────────────────── */}
                <FadeIn delayMs={80}>
                    <section aria-labelledby="s2-heading">
                        <SectionLabel>02</SectionLabel>
                        <SectionHeading id="s2-heading">
                            Why this shapes every song
                        </SectionHeading>

                        <Prose>
                            {/* How liner notes themes show up across the catalog */}
                            <p>
                                Look at what the songs are actually about: spiritual
                                resistance, grief and slow rebuilding, the discomfort of
                                genuine surrender, the specific fatigue of unanswered
                                prayer, the fear of not being safe, the discipline of
                                redirecting a mind that won&apos;t stop spiraling. None of
                                these are triumph songs. They&apos;re songs written from
                                inside the difficulty, by someone who believes God is
                                present there — not to explain the difficulty away, but to
                                be present in it. The recurring phrase across the liner
                                notes is &ldquo;a season of&rdquo; — grief, waiting,
                                conflict, anxiety. The catalog is, in that sense, a record
                                of what it costs to keep trusting.
                            </p>

                            {/* The tension between beauty and truth in dream pop worship */}
                            <p>
                                Dream pop, as a genre, tends toward atmosphere, texture,
                                and emotional ambiguity — it sits with feeling rather than
                                explaining it. Worship music, as a tradition, tends toward
                                declaration and resolution — it affirms rather than
                                explores. Hydromedon sits in the tension between those two
                                impulses deliberately. The result isn&apos;t music that
                                avoids its conclusions, but music that earns them
                                slowly — that lets the weight of a question build before
                                it offers anything like an answer. If you&apos;ve listened
                                and found it unexpectedly honest about hard things,
                                that&apos;s not despite the faith — it&apos;s because of
                                it.
                            </p>
                        </Prose>
                    </section>
                </FadeIn>

                <Divider />

                {/* ── Section 3 ───────────────────────────────────────── */}
                <FadeIn delayMs={80}>
                    <section aria-labelledby="s3-heading">
                        <SectionLabel>03</SectionLabel>
                        <SectionHeading id="s3-heading">
                            A question worth sitting with
                        </SectionHeading>

                        <Prose>
                            <p>
                                If any of this resonates — the longing, the weight, the
                                recurring sense that beauty is pointing somewhere rather
                                than nowhere — that feeling has a name. Not a system, not
                                a list of requirements. Just a name.
                            </p>

                            <p>
                                This isn&apos;t a call to believe anything right now. It&apos;s
                                an acknowledgment that the questions the music raises are
                                real questions, and that they&apos;re worth taking
                                seriously. Whatever you make of the faith behind it,
                                something brought you here. That seems worth noticing.
                            </p>
                        </Prose>

                        <div className="mt-10">
                            <Link
                                href="/music"
                                className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-yellow-500 text-black text-sm font-bold uppercase tracking-wide shadow-lg shadow-yellow-500/30 hover:bg-yellow-400 hover:scale-105 hover:shadow-yellow-400/50 transition-all duration-200 active:scale-95"
                            >
                                Explore the music
                            </Link>
                        </div>
                    </section>
                </FadeIn>

                <Divider />

                {/* ── Page footer links ───────────────────────────────── */}
                <FadeIn delayMs={80}>
                    <footer className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-sm text-gray-500">
                        <div>
                            <p className="text-xs tracking-widest uppercase text-gray-600 mb-2">
                                Go deeper
                            </p>
                            <Link
                                href="/stories"
                                className="text-gray-400 hover:text-yellow-400 transition-colors"
                            >
                                Stories behind the songs →
                            </Link>
                        </div>

                        <div>
                            <p className="text-xs tracking-widest uppercase text-gray-600 mb-2">
                                Listen
                            </p>
                            <Link
                                href="/music"
                                className="text-gray-400 hover:text-yellow-400 transition-colors"
                            >
                                Full music library →
                            </Link>
                        </div>

                        <div>
                            <p className="text-xs tracking-widest uppercase text-gray-600 mb-2">
                                For believers
                            </p>
                            <Link
                                href="/about#statement-of-faith"
                                className="text-gray-400 hover:text-yellow-400 transition-colors"
                            >
                                Statement of Faith →
                            </Link>
                        </div>
                    </footer>
                </FadeIn>
            </div>
        </main>
    );
}
