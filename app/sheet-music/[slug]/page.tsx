import React from 'react';

const compositionData = {
  title: "Arise, O Lord",
  subtitle: "Lead Sheet",

  description: [
    "Born from the psalms of deliverance and the quiet ache of waiting, Arise, O Lord is a cry for God's intervention, strength, and justice.",
    "This piece carries the tension between vulnerability and boldness — a prayer that rises from the depths and refuses to fall silent.",
    "Crafted for worship, rehearsal, and personal devotion, this lead sheet captures the full melodic and harmonic architecture of the song with clarity and intention."
  ],

  coverImage: "/images/sheet-music/arise-o-lord/cover.jpg",

  spotifyUrl: "https://open.spotify.com/track/3ut8WjurvXkLDsT24joSSO",
  youtubeUrl: "https://youtu.be/YuNm0FGE8AU",

  leadSheetProductUrl: "https://store.hydromedon.com/products/arise-o-lord-lead-sheet",

  fullScoreProductUrl: "https://store.hydromedon.com/products/arise-o-lord-full-score",
  fullScoreComingSoon: true,

  sampleImages: [
    "/images/sheet-music/arise-o-lord/sample-1.jpg",
    "/images/sheet-music/arise-o-lord/sample-3.jpg"
  ],

  technical: {
    key: "C\u266f major",
    tempo: "121 BPM",
    timeSignature: "4/4",
    difficulty: "Intermediate",
    length: "6 pages",
    instrumentation: ["Voice", "Chord Symbols", "Lead Sheet Format"]
  },

  lyrics: [
    "Arise, O Lord, and shine Your light upon us,",
    "Lift up our hearts to see Your glory near."
  ],

  comingSoon: [
    {
      title: "Full Score + Instrument Parts",
      description: "A complete arrangement including strings, piano, and auxiliary instruments."
    }
  ]
};

export default function CompositionPage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <main className="mx-auto max-w-3xl py-20">

      {/* 1. Hero */}
      <section className="mb-12 space-y-6">
        <h1 className="text-4xl font-bold tracking-tight mb-6 text-yellow-400">{compositionData.title}</h1>
        {compositionData.subtitle && <h2 className="text-2xl font-semibold tracking-tight mb-3 text-white/60">{compositionData.subtitle}</h2>}
        <p className="mt-4 text-white/55 leading-relaxed">{compositionData.description[0]}</p>
        <a href={`/sheet-music/${slug}/resources`} className="inline-flex items-center gap-2 h-11 px-7 border border-yellow-500/40 text-yellow-400/70 text-sm rounded hover:border-yellow-500/70 hover:text-yellow-400 transition-colors duration-300">Get the Score</a>
      </section>

      {/* 2. Streaming Preview */}
      <section className="mb-12 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-3 text-yellow-400">Listen</h2>
        <div className="flex gap-3">
          {compositionData.spotifyUrl && (
            <a href={compositionData.spotifyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-11 px-7 rounded bg-yellow-500 text-black font-semibold text-sm shadow hover:bg-yellow-400 transition">Listen on Spotify</a>
          )}
          {compositionData.youtubeUrl && (
            <a href={compositionData.youtubeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-11 px-7 rounded border border-yellow-500 text-yellow-500 font-semibold text-sm hover:bg-yellow-500 hover:text-black transition">Watch on YouTube</a>
          )}
        </div>
      </section>

      {/* 3. Description */}
      <section className="mb-12 space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight mb-3 text-yellow-400">About This Composition</h2>
        {compositionData.description.slice(1).map((para, i) => (
          <p key={i} className="text-white/55 leading-relaxed">{para}</p>
        ))}
      </section>

      {/* 4. Product Options */}
      <section className="mb-12 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-3 text-yellow-400">Available Scores</h2>

        {/* Lead Sheet Card */}
        <div className="border border-white/8 bg-white/[0.02] p-4 rounded-lg space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-white/80">Lead Sheet</h3>
          <p className="text-white/55 leading-relaxed">The primary lead sheet for this composition.</p>
          <a href={`/sheet-music/${slug}/resources`} className="inline-flex items-center gap-2 h-11 px-7 border border-yellow-500/40 text-yellow-400/70 text-sm rounded hover:border-yellow-500/70 hover:text-yellow-400 transition-colors duration-300">Get the Lead Sheet</a>
        </div>

        {/* Full Score + Instrument Parts Card */}
        <div className="border border-white/8 bg-white/[0.02] p-4 rounded-lg space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-white/80">Full Score + Instrument Parts</h3>
          <p className="text-white/55 leading-relaxed">The full arrangement including all instrumental parts.</p>

          {compositionData.fullScoreComingSoon ? (
            <>
              <p className="text-yellow-400/70 font-semibold text-sm">Coming Soon</p>
              <p className="text-white/55 leading-relaxed">This arrangement is currently in production.</p>
            </>
          ) : (
            <a href={compositionData.fullScoreProductUrl} className="inline-flex items-center gap-2 h-11 px-7 border border-yellow-500/40 text-yellow-400/70 text-sm rounded hover:border-yellow-500/70 hover:text-yellow-400 transition-colors duration-300">Get the Full Score</a>
          )}
        </div>
      </section>

      {/* 5. Lead Sheet Preview */}
      <section className="mb-12 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-3 text-yellow-400">Lead Sheet Preview</h2>
        <img src="/samples/arise-o-lord.jpg" alt="Arise, O Lord — Lead Sheet Preview" className="rounded-lg shadow-sm hover:shadow-md transition cursor-pointer" />
      </section>

      {/* 6. Technical Details */}
      <section className="mb-12 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-3 text-yellow-400">Technical Details</h2>
        <ul className="list-disc ml-6 space-y-1 text-white/55">
          {compositionData.technical.key && <li>Key: {compositionData.technical.key}</li>}
          {compositionData.technical.tempo && <li>Tempo: {compositionData.technical.tempo}</li>}
          {compositionData.technical.timeSignature && <li>Time Signature: {compositionData.technical.timeSignature}</li>}
          {compositionData.technical.difficulty && <li>Difficulty: {compositionData.technical.difficulty}</li>}
          {compositionData.technical.length && <li>Length: {compositionData.technical.length}</li>}
          {compositionData.technical.instrumentation && (
            <li>Instrumentation: {compositionData.technical.instrumentation.join(", ")}</li>
          )}
        </ul>
      </section>

      {/* 7. Lyrics */}
      <section className="mb-12 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-3 text-yellow-400">Lyrics</h2>
        <div className="space-y-4">
          <p className="text-gray-200 leading-relaxed">
            Almighty God, my shelter and shield<br />
            My defender, my strength in the field<br />
            I come not quiet, but bold in my cry<br />
            There are battles I can&#39;t win, though I try
          </p>
          <p className="text-gray-200 leading-relaxed">
            You are the God who rescues and saves<br />
            You step in when the storm misbehaves<br />
            So I lift my voice and call on Your name<br />
            Jesus, fight for me again
          </p>
          <p className="text-gray-200 leading-relaxed">
            Arise, O Lord, scatter my foes<br />
            Silence the lies only heaven knows<br />
            You are my justice, my refuge, my peace<br />
            You speak for me when my words cease<br />
            Arise, O Lord, surround me like flame<br />
            Let every trial glorify Your name
          </p>
          <p className="text-gray-200 leading-relaxed">
            You dress a table where enemies see<br />
            That You, O Lord, have fought for me<br />
            You heal the wounds no one can trace<br />
            You pour Your oil on every place
          </p>
          <p className="text-gray-200 leading-relaxed">
            Arise and let no false word stand<br />
            No witness rise by human hand<br />
            You are my shield, my holy flame<br />
            You guard my soul, You know my name
          </p>
          <p className="text-gray-200 leading-relaxed">
            Hope is rising in the waiting<br />
            Faith is growing in the fire<br />
            You are working in the silence<br />
            Turning ashes into choir<br />
            Every tear sown in sorrow<br />
            Will bloom in joy tomorrow<br />
            You are faithful, You are near<br />
            My Redeemer, I won&#39;t fear
          </p>
          <p className="text-gray-200 leading-relaxed">
            Arise, O Lord, scatter my foes<br />
            Silence the lies only heaven knows<br />
            You are my justice, my refuge, my peace<br />
            You speak for me when my words cease<br />
            Arise, O Lord, surround me like flame<br />
            Let every trial glorify Your name
          </p>
          <p className="text-gray-200 leading-relaxed">
            Let my story stir dry bones awake<br />
            Let my breakthrough show the path You make<br />
            You still redeem, You still renew<br />
            And I will trust the fight to You
          </p>
        </div>
        <p className="text-white/30 text-sm">Lyrics © Hydromedon</p>
      </section>

      {/* 8. Coming Soon (optional) */}
      {compositionData.comingSoon && (
        <section className="mb-12 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-3 text-yellow-400">Coming Soon</h2>
          {compositionData.comingSoon.map((item, i) => (
            <div key={i} className="border border-white/8 bg-white/[0.02] p-4 rounded-lg space-y-3">
              <h3 className="text-lg font-semibold tracking-tight text-white/80">{item.title}</h3>
              <p className="text-white/55 leading-relaxed">{item.description}</p>
              <p className="text-white/40 text-sm">Coming Soon</p>
            </div>
          ))}
        </section>
      )}

      {/* 9. Footer */}
      <section className="mt-12 text-sm text-white/30">
        <a href="/sheet-music" className="text-white/40 hover:text-white/70 transition-colors">← Back to Sheet Music</a>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": compositionData.title,
            "url": `https://www.hydromedon.com/sheet-music/${compositionData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
          })
        }}
      />

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
                "name": compositionData.title,
                "item": `https://www.hydromedon.com/sheet-music/${compositionData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
              }
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicComposition",
            "name": compositionData.title,
            "description": compositionData.description.join(" "),
            "image": compositionData.coverImage,
            "sameAs": [
              compositionData.spotifyUrl,
              compositionData.youtubeUrl
            ].filter(Boolean)
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Offer",
              "name": `${compositionData.title} Lead Sheet`,
              "url": compositionData.leadSheetProductUrl,
            "availability": "https://schema.org/InStock"
          })
        }}
      />

      {!compositionData.fullScoreComingSoon && compositionData.fullScoreProductUrl && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Offer",
              "name": `${compositionData.title} Full Score + Instrument Parts`,
              "url": compositionData.fullScoreProductUrl,
              "availability": "https://schema.org/InStock"
            })
          }}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "contentUrl": compositionData.coverImage,
            "associatedArticle": compositionData.title
          })
        }}
      />

      {compositionData.sampleImages.map((img, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ImageObject",
              "contentUrl": img,
              "associatedArticle": compositionData.title
            })
          }}
        />
      ))}

    </main>
  );
}
