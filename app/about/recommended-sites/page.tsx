import Breadcrumbs from "@/components/Breadcrumbs";
import FadeIn from "@/components/FadeIn";

export const dynamicParams = false;

export default function RecommendedSitesPage() {
    const sites = [
        {
            name: "The Ancient Way",
            description:
                "The Ancient Way offers teaching and resources rooted in the Jewish faith of Jesus, highlighting Torah, Sabbath, and the seven biblical festivals as God’s appointed times.",
            url: "https://www.theancientway.org/",
        },
        {
            name: "Kavodah",
            description:
                "Kavodah offers soulful Messianic electronic music that blends modern soundscapes with worship inspired by the Psalms and a life of devotion to the King of the Universe..",
            url: "https://www.kavodah.com/",
        },
        {
            name: "Daily Grace Co.",
            description:
                "Bible studies, devotionals, and Christian lifestyle resources with a gentle, reflective aesthetic.",
            url: "https://thedailygraceco.com",
        },
        {
            name: "Seeds Family Worship",
            description:
                "Scripture memory songs for kids and families—joyful, energetic, and rooted in the Word.",
            url: "https://www.seedsfamilyworship.com",
        },
        {
            name: "Worship Tutorials",
            description:
                "Guitar, vocal, and production resources for worship musicians, including tutorials, patches, and arrangements.",
            url: "https://worshiptutorials.com",
        },
    ];

    return (
        <main className="min-h-screen bg-black text-white">
            <section className="max-w-5xl mx-auto px-4 py-10">
                <Breadcrumbs
                    release={{
                        title: "Recommended Sites",
                        slug: "recommended-sites",
                        type: "Single",
                        releaseDate: "",
                    }}
                />

                <div className="text-center mt-6 mb-10 max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-yellow-400 mb-3 drop-shadow">
                        Recommended Sites
                    </h1>

                    <p className="text-gray-300">
                        A curated collection of friendly, trusted, and spiritually aligned
                        resources—ranging from Sunday school material to worship music,
                        devotionals, and creative tools.
                    </p>
                </div>

                <div className="space-y-8 max-w-3xl mx-auto">
                    {sites.map((site, idx) => (
                        <FadeIn
                            key={site.name}
                            delayMs={200 + idx * 120}
                            durationMs={1200}
                            y={16}
                        >
                            <div className="rounded-lg border border-white/10 bg-black/30 p-6">
                                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                                    {site.name}
                                </h3>

                                <p className="text-gray-300 mb-4">{site.description}</p>

                                <a
                                    href={site.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition"
                                >
                                    Visit Site <span className="text-xs opacity-70">↗</span>
                                </a>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>
        </main>
    );
}
