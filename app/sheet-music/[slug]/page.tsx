import { notFound } from "next/navigation";
import { compositions } from "@/data/compositions";
import FadeIn from "@/components/FadeIn";

export default async function CompositionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const composition = compositions.find((c) => c.slug === slug);

  if (!composition) return notFound();

  const leadScore = composition.scores.find((s) => s.type === "Lead Sheet");
  const fullScore = composition.scores.find((s) => s.type === "Full Score + Instrument Parts");

  const leadSheetUrl = leadScore?.purchaseUrl;
  const fullScoreUrl = fullScore && "url" in fullScore ? fullScore.url : undefined;
  const fullScoreComingSoon = fullScore?.status === "coming-soon";

  return (
    <main
      data-page-enter
      className="relative min-h-screen"
      style={{ animation: "merch-page-enter 700ms 100ms ease-out both" }}
    >
      <style>{`@keyframes merch-page-enter{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@media(prefers-reduced-motion:reduce){[data-page-enter]{animation:none!important}}`}</style>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-gradient-to-b from-[#E8E4DF]/[0.06] to-transparent" />

      <div className="relative max-w-3xl mx-auto px-6 py-20 space-y-16">

        {/* HERO */}
        <section>
          <FadeIn delayMs={60}>
            <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">Sheet Music</p>
            <h1 className="text-4xl font-bold tracking-tight text-yellow-400 mb-6">{composition.title}</h1>
          </FadeIn>
        </section>

        {/* ABOUT */}
        <section>
          <FadeIn delayMs={80}>
            <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">About</p>
            <h2 className="text-2xl font-bold text-yellow-400 leading-tight tracking-tight mb-4">About This Composition</h2>
            <p className="text-white/55 leading-relaxed mb-3">{composition.description}</p>
            <p className="text-white/55 leading-relaxed">{composition.about}</p>
          </FadeIn>
        </section>

        {/* TECHNICAL DETAILS */}
        <section>
          <FadeIn delayMs={80}>
            <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">Details</p>
            <h2 className="text-2xl font-bold text-yellow-400 leading-tight tracking-tight mb-4">Technical Details</h2>
            <ul className="space-y-2 text-white/55">
              <li><span className="text-white/40 text-sm">Key</span> &mdash; {composition.technical.key}</li>
              <li><span className="text-white/40 text-sm">Tempo</span> &mdash; {composition.technical.tempo}</li>
              <li><span className="text-white/40 text-sm">Time Signature</span> &mdash; {composition.technical.timeSignature}</li>
              <li><span className="text-white/40 text-sm">Difficulty</span> &mdash; {composition.technical.difficulty}</li>
            </ul>
          </FadeIn>
        </section>

        {/* AVAILABLE SCORES */}
        <section>
          <FadeIn delayMs={80}>
            <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">Scores</p>
            <h2 className="text-2xl font-bold text-yellow-400 leading-tight tracking-tight mb-6">Available Scores</h2>
          </FadeIn>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* LEAD SHEET */}
            <FadeIn delayMs={100}>
              <div className="border border-white/8 bg-white/[0.02] rounded-sm p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-500/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12),0_0_32px_rgba(212,175,55,0.22)]">
                <h3 className="text-sm font-medium tracking-[0.05em] text-white/80">Lead Sheet</h3>
                <p className="text-xs text-white/45 leading-relaxed">
                  {leadScore?.details?.length && `${leadScore.details.length} - `}{leadScore?.details?.instrumentation}
                </p>
                {leadSheetUrl && (
                  <a
                    href={leadSheetUrl}
                    className="mt-auto h-11 px-6 border border-yellow-500/40 text-yellow-400/60 rounded hover:border-yellow-500/70 hover:text-yellow-400 transition-colors duration-300 inline-flex items-center justify-center text-sm font-medium"
                  >
                    Get the Lead Sheet
                  </a>
                )}
              </div>
            </FadeIn>

            {/* FULL SCORE */}
            <FadeIn delayMs={160}>
              <div className="border border-white/8 bg-white/[0.02] rounded-sm p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-500/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12),0_0_32px_rgba(212,175,55,0.22)]">
                <h3 className="text-sm font-medium tracking-[0.05em] text-white/80">Full Score + Instrument Parts</h3>
                <p className="text-xs text-white/45 leading-relaxed">
                  {fullScore?.details?.length && `${fullScore.details.length} - `}{fullScore?.details?.instrumentation}
                </p>
                {fullScoreComingSoon ? (
                  <p className="mt-auto text-xs text-white/30 tracking-[0.15em] uppercase">Coming Soon</p>
                ) : (
                  <a
                    href={fullScoreUrl}
                    className="mt-auto h-11 px-6 border border-yellow-500/40 text-yellow-400/60 rounded hover:border-yellow-500/70 hover:text-yellow-400 transition-colors duration-300 inline-flex items-center justify-center text-sm font-medium"
                  >
                    Get Full Score
                  </a>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* LYRICS */}
        <section>
          <FadeIn delayMs={80}>
            <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">Lyrics</p>
            <h2 className="text-2xl font-bold text-yellow-400 leading-tight tracking-tight mb-6">Lyrics</h2>
            <div className="space-y-4">
              {composition.lyrics.split('\n\n').map((stanza, i) => (
                <p key={i} className="text-white/55 leading-relaxed">
                  {stanza.split('\n').map((line, j, arr) => (
                    <span key={j}>
                      {line}
                      {j < arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ))}
            </div>
            <p className="mt-6 text-xs text-white/30 tracking-[0.15em] uppercase">Lyrics &copy; Hydromedon</p>
          </FadeIn>
        </section>

        {/* SAMPLE PREVIEW */}
        <section>
          <FadeIn delayMs={80}>
            <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">Preview</p>
            <h2 className="text-2xl font-bold text-yellow-400 leading-tight tracking-tight mb-6">Sample Pages</h2>
            <img
              src={composition.sampleImage}
              alt={`Sample pages for ${composition.title}`}
              className="rounded-sm w-full shadow-md"
            />
          </FadeIn>
        </section>

      </div>
    </main>
  );
}
