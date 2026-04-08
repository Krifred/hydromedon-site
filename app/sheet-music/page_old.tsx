const sheetMusicData = [
  {
    slug: "arise-o-lord",
    title: "Arise, O Lord",
    subtitle: "Psalm 3 — Worship Anthem",
    coverImage: "/covers/arise-o-lord.jpg",
    status: "available",
    description: "A cinematic worship anthem based on Psalm 3."
  }
  // Additional compositions can be added here later
];

export default function SheetMusicIndexPage() {
  return (
    <main className="relative min-h-screen">

      {/* ── Header ────────────────────────────────────────────────── */}
      <header className="relative max-w-4xl mx-auto px-6 pt-24 pb-12 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0" style={{ background: "radial-gradient(1000px 600px at 50% 40%, rgba(212,175,55,0.07), transparent 65%)" }} />
        </div>
        <div className="relative">
          <p className="text-[10px] tracking-[0.3em] text-white/25 uppercase mb-6">Hydromedon</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 leading-tight tracking-tight">Sheet Music</h1>
          <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-xl mx-auto">
            Handcrafted lead sheets for the songs that surface from silence. For those who play by faith.
          </p>
        </div>
      </header>

      {/* ── Compositions ──────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-6 pt-8 pb-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0" style={{ background: "radial-gradient(900px 500px at 20% 10%, rgba(212,175,55,0.06), transparent 60%)" }} />
        </div>

        <div className="relative mb-10 sm:mb-12">
          <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">Browse</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 leading-tight tracking-tight">Compositions</h2>
        </div>

        <ul className="relative grid grid-cols-2 lg:grid-cols-4 gap-5 p-0 m-0 list-none">
          {sheetMusicData.map((item, i) => (
            <li key={i}>
              <a
                href={item.status === "available" ? `/sheet-music/${item.slug}` : "#"}
                className={`group block rounded-sm overflow-hidden border border-white/8 bg-white/[0.03] transition-all duration-300 ease-out ${
                  item.status === "available"
                    ? "hover:-translate-y-0.5 hover:border-yellow-500/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12),0_0_32px_rgba(212,175,55,0.22)]"
                    : "opacity-60 pointer-events-none"
                }`}
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  {item.coverImage ? (
                    <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/[0.02]" />
                  )}
                  {item.status === "coming-soon" && (
                    <span className="absolute bottom-2 right-2 border border-yellow-400/60 text-yellow-400/60 text-xs px-2 py-1 rounded bg-black/60">
                      Coming Soon
                    </span>
                  )}
                </div>

                <div className="px-4 py-6 flex flex-col gap-3">
                  <h3 className="text-sm font-medium tracking-[0.05em] text-white/80 leading-snug">{item.title}</h3>
                  {item.subtitle && <p className="text-xs text-white/45 leading-relaxed">{item.subtitle}</p>}
                  {item.description && <p className="text-xs text-white/45 leading-relaxed">{item.description}</p>}
                  {item.status === "available" && (
                    <div className="h-12 px-6 border border-yellow-500/40 text-yellow-400/60 rounded group-hover:border-yellow-500/70 group-hover:text-yellow-400/90 transition-colors duration-300 font-medium inline-flex items-center justify-center text-sm">
                      View Score
                    </div>
                  )}
                </div>
              </a>
            </li>
          ))}
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
            "url": "https://hydromedon.com/sheet-music"
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
                "item": "https://hydromedon.com/sheet-music"
              }
            ]
          })
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
            "itemListElement": sheetMusicData.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.title,
              "url": `https://hydromedon.com/sheet-music/${item.slug}`,
              "description": item.description,
              "additionalProperty": {
                "@type": "PropertyValue",
                "name": "status",
                "value": item.status
              }
            }))
          })
        }}
      />

    </main>
  );
}