import { getReleaseBySlug } from "@/lib/releases";

export default async function SongPage({
    params,
}: {
    params: { slug: string }
}) {
    const { slug } = params;
    const release = getReleaseBySlug(slug);

    if (!release) {
        return <div className="text-white p-10">Release not found.</div>;
    }

    return (
        <main className="min-h-screen bg-black text-white">
            <section className="max-w-3xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-yellow-400 mb-6">
                    { "Music Library" }
                </h1>

                <p className="text-gray-300 mb-8">{release.description}</p>

                {/* Add whatever content you want here */}
            </section>
        </main>
    );
}
