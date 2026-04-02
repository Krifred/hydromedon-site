import React from 'react';
import { notFound } from 'next/navigation';
import { compositions } from '@/data/compositions';

export default async function CompositionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const composition = compositions.find(c => c.slug === slug);
  if (!composition) return notFound();

  const leadScore = composition.scores.find(s => s.type === "Lead Sheet");
  const fullScore = composition.scores.find(s => s.type === "Full Score + Instrument Parts");
  const fullScoreComingSoon = fullScore?.status === "coming-soon";
  const fullScoreUrl = fullScore && 'url' in fullScore ? fullScore.url : undefined;
  const leadSheetUrl = leadScore && 'purchaseUrl' in leadScore
    ? leadScore.purchaseUrl
    : `/sheet-music/${slug}/resources`;

  return (
    <main className="mx-auto max-w-3xl py-20">

      {/* 1. Hero */}
      <section className="mb-12 space-y-6">
        <h1 className="text-4xl font-bold tracking-tight mb-6 text-yellow-400">{composition.title}</h1>
      </section>

      {/* 2. Streaming Preview */}
      <section className="mb-12 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-3 text-yellow-400">Listen</h2>
        <div className="flex gap-3">
          {composition.spotify && (
            <a
              href={composition.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center h-11 px-7 rounded bg-yellow-500 text-black font-semibold text-sm shadow hover:bg-yellow-400 transition"
            >
              Listen on Spotify
            </a>
          )}
          {composition.youtube && (
            <a
              href={composition.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center h-11 px-7 rounded border border-yellow-500 text-yellow-500 font-semibold text-sm hover:bg-yellow-500 hover:text-black transition"
            >
              Watch on YouTube
            </a>
          )}
        </div>
      </section>

      {/* 3. About */}
      <section className="mb-12 space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight mb-3 text-yellow-400">About This Composition</h2>
        <p className="mb-4">{composition.description}</p>
        <p>{composition.about}</p>
      </section>

      {/* 4. Available Scores */}
      <section className="mb-12 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-3 text-yellow-400">Available Scores</h2>

        {/* Lead Sheet */}
        <div className="border border-white/8 bg-white/[0.02] p-4 rounded-lg space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-white/80">Lead Sheet</h3>
          <p className="text-white/55 leading-relaxed">The primary lead sheet for this composition.</p>
          <p><strong>Length:</strong> {leadScore?.details?.length}</p>
          <p><strong>Instrumentation:</strong> {leadScore?.details?.instrumentation}</p>
          <a
            href={leadSheetUrl}
            className="inline-flex items-center gap-2 h-11 px-7 border border-yellow-500/40 text-yellow-400/70 text-sm rounded hover:border-yellow-500/70 hover:text-yellow-400 transition-colors duration-300"
          >
            Get the Lead Sheet
          </a>
        </div>

        {/* Full Score + Instrument Parts */}
        <div className="border border-white/8 bg-white/[0.02] p-4 rounded-lg space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-white/80">Full Score + Instrument Parts</h3>
          <p><strong>Length:</strong> {fullScore?.details?.length}</p>
          <p><strong>Instrumentation:</strong> {fullScore?.details?.instrumentation}</p>

          {fullScoreComingSoon ? (
            <p className="text-white/40 text-sm">Coming Soon</p>
          ) : (
            <a
              href={fullScoreUrl}
              className="inline-flex items-center gap-2 h-11 px-7 border border-yellow-500/40 text-yellow-400/70 text-sm rounded hover:border-yellow-500/70 hover:text-yellow-400 transition-colors duration-300"
            >
              Get Full Score
            </a>
          )}
        </div>
      </section>

      {/* 5. Lead Sheet Preview */}
      <section className="mb-12 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-3 text-yellow-400">Lead Sheet Preview</h2>
        <img
          src={composition.sampleImage}
          alt={`${composition.title} — Lead Sheet Preview`}
          className="rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
        />
      </section>

      {/* 6. Technical Details */}
      <section className="mb-12 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-3 text-yellow-400">Technical Details</h2>
        <ul className="list-disc ml-6 space-y-1 text-white/55">
          {composition.technical.key && <li>Key: {composition.technical.key}</li>}
          {composition.technical.tempo && <li>Tempo: {composition.technical.tempo}</li>}
          {composition.technical.timeSignature && <li>Time Signature: {composition.technical.timeSignature}</li>}
          {composition.technical.difficulty && <li>Difficulty: {composition.technical.difficulty}</li>}
        </ul>
      </section>

      {/* 7. Lyrics */}
      <section className="mb-12 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-3 text-yellow-400">Lyrics</h2>
        <div className="space-y-4">
          {composition.lyrics.split('\n\n').map((stanza, i) => (
            <p key={i} className="text-gray-200 leading-relaxed">
              {stanza.split('\n').map((line, j, arr) => (
                <React.Fragment key={j}>
                  {line}
                  {j < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          ))}
        </div>
        <p className="text-white/30 text-sm">Lyrics © Hydromedon</p>
      </section>

      {/* 9. Footer */}
      <section className="mt-12 text-sm text-white/30">
        <a href="/sheet-music" className="text-white/40 hover:text-white/70 transition-colors">
          ? Back to Sheet Music
        </a>
      </section>

      {/* JSON-LD: WebPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": composition.title,
            "url": `https://www.hydromedon.com/sheet-music/${slug}`
          })
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
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Sheet Music",
                "item": "https://www.hydromedon.com/sheet-music"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": composition.title,
                "item": `https://www.hydromedon.com/sheet-music/${slug}`
              }
            ]
          })
        }}
      />

      {/* JSON-LD: MusicComposition */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicComposition",
            "name": composition.title,
            "description": composition.description,
            "image": composition.sampleImage,
            "sameAs": [composition.spotify, composition.youtube].filter(Boolean),
            "additionalProperty": [
              { "@type": "PropertyValue", "name": "Key", "value": composition.technical.key },
              { "@type": "PropertyValue", "name": "Tempo", "value": composition.technical.tempo },
              { "@type": "PropertyValue", "name": "Time Signature", "value": composition.technical.timeSignature },
              { "@type": "PropertyValue", "name": "Difficulty", "value": composition.technical.difficulty }
            ]
          })
        }}
      />

      {/* JSON-LD: Score Offers */}
      {composition.scores.map((score, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Offer",
              "name": `${composition.title} ${score.type}`,
              "url": "url" in score ? score.url : undefined,
              "availability": score.status === "coming-soon"
                ? "https://schema.org/PreOrder"
                : "https://schema.org/InStock",
              "additionalProperty": [
                { "@type": "PropertyValue", "name": "Length", "value": score.details?.length },
                { "@type": "PropertyValue", "name": "Instrumentation", "value": score.details?.instrumentation }
              ]
            })
          }}
        />
      ))}

      {/* JSON-LD: OfferCatalog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            "name": `${composition.title} — Scores`,
            "itemListElement": composition.scores.map((score, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": score.type,
              "url": "url" in score ? score.url : undefined,
              "availability": score.status === "coming-soon"
                ? "https://schema.org/PreOrder"
                : "https://schema.org/InStock"
            }))
          })
        }}
      />

      {/* JSON-LD: Sample Image */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "contentUrl": composition.sampleImage,
            "associatedArticle": composition.title
          })
        }}
      />

    </main>
  );
}
