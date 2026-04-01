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
    <main className="mx-auto max-w-4xl py-20">
      <h1 className="text-4xl font-bold mb-4">Sheet Music</h1>
      <p className="text-lg text-gray-600 mb-12">Explore all available and upcoming Hydromedon compositions.</p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {sheetMusicData.map((item, i) => (
          <div
            key={i}
            className={`space-y-3 ${
              item.status === "coming-soon" ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            <h2 className="text-2xl font-semibold tracking-tight">{item.title}</h2>
            <p className="text-gray-600">{item.subtitle}</p>

            {item.status === "available" ? (
              <a href={`/sheet-music/${item.slug}`}>
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                />
              </a>
            ) : (
              <div className="relative">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="rounded-lg shadow-sm"
                />
                <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                  Coming Soon
                </span>
              </div>
            )}

            <p className="text-gray-700">{item.description}</p>
            <p className="text-sm text-gray-500 capitalize">Status: {item.status}</p>
          </div>
        ))}
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