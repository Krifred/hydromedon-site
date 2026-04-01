const compositionData = {
  title: "Arise, O Lord",
  subtitle: "Lead Sheet",

  description: [
    "Born from the psalms of deliverance and the quiet ache of waiting, Arise, O Lord is a cry for God's intervention, strength, and justice.",
    "This piece carries the tension between vulnerability and boldness — a prayer that rises from the depths and refuses to fall silent.",
    "Crafted for worship, rehearsal, and personal devotion, this lead sheet captures the full melodic and harmonic architecture of the song with clarity and intention."
  ],

  coverImage: "/images/sheet-music/arise-o-lord/cover.jpg",

  spotifyUrl: "https://open.spotify.com/track/placeholder",
  youtubeUrl: "https://youtube.com/watch?v=placeholder",

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
      <section className="mb-12 space-y-4">
        <a href={`/sheet-music/${slug}/resources`}>
          <img src={compositionData.coverImage} alt={compositionData.title} className="w-full rounded-lg" />
        </a>
        <h1 className="text-4xl font-bold mt-6">{compositionData.title}</h1>
        {compositionData.subtitle && <h2 className="text-xl text-gray-600">{compositionData.subtitle}</h2>}
        <p className="mt-4">{compositionData.description[0]}</p>
        <a href={`/sheet-music/${slug}/resources`} className="inline-block mt-6 px-4 py-2 bg-black text-white rounded">Get the Score</a>
      </section>

      {/* 2. Streaming Preview */}
      <section className="mb-12 space-y-4">
        <h2 className="text-2xl font-semibold">Listen</h2>
        {compositionData.spotifyUrl && (
          <a href={compositionData.spotifyUrl} target="_blank" rel="noopener noreferrer" className="inline-block mr-4 px-4 py-2 border rounded">Listen on Spotify</a>
        )}
        {compositionData.youtubeUrl && (
          <a href={compositionData.youtubeUrl} target="_blank" rel="noopener noreferrer" className="inline-block mr-4 px-4 py-2 border rounded">Watch on YouTube</a>
        )}
      </section>

      {/* 3. Description */}
      <section className="mb-12 space-y-3">
        <h2 className="text-2xl font-semibold">About This Composition</h2>
        {compositionData.description.slice(1).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </section>

      {/* 4. Product Options */}
      <section className="mb-12 space-y-4">
        <h2 className="text-2xl font-semibold">Available Scores</h2>

        {/* Lead Sheet Card */}
        <div className="border p-4 rounded-lg space-y-2">
          <h3>Lead Sheet</h3>
          <p>The primary lead sheet for this composition.</p>
          <a href={`/sheet-music/${slug}/resources`}>Get the Lead Sheet</a>
        </div>

        {/* Full Score + Instrument Parts Card */}
        <div className="border p-4 rounded-lg space-y-2">
          <h3>Full Score + Instrument Parts</h3>
          <p>The full arrangement including all instrumental parts.</p>

          {compositionData.fullScoreComingSoon ? (
            <>
              <p><strong>Coming Soon</strong></p>
              <p>This arrangement is currently in production.</p>
            </>
          ) : (
            <a href={compositionData.fullScoreProductUrl}>Get the Full Score</a>
          )}
        </div>
      </section>

      {/* 5. Sample Pages */}
      <section className="mb-12 space-y-4 grid grid-cols-1 gap-4">
        <h2 className="text-2xl font-semibold">Sample Pages</h2>
        {compositionData.sampleImages.map((src, i) => (
          <img key={i} src={src} alt={`Sample page ${i + 1}`} className="w-full rounded-lg" />
        ))}
      </section>

      {/* 6. Technical Details */}
      <section className="mb-12 space-y-4">
        <h2 className="text-2xl font-semibold">Technical Details</h2>
        <ul className="list-disc ml-6 space-y-1">
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

      {/* 7. Lyrics (optional) */}
      {compositionData.lyrics && (
        <section className="mb-12 space-y-2">
          <h2 className="text-2xl font-semibold">Lyrics</h2>
          {compositionData.lyrics.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          <p>Lyrics © Hydromedon</p>
        </section>
      )}

      {/* 8. Coming Soon (optional) */}
      {compositionData.comingSoon && (
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-semibold">Coming Soon</h2>
          {compositionData.comingSoon.map((item, i) => (
            <div key={i} className="border p-4 rounded-lg space-y-2">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Coming Soon</p>
            </div>
          ))}
        </section>
      )}

      {/* 9. Footer */}
      <section className="mt-12 text-sm text-gray-600">
        <a href="/sheet-music" className="underline">← Back to Sheet Music</a>
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
