import { getStorySummaries } from "@/lib/stories";
import StoryCard from "@/components/StoryCard";
import FadeIn from "@/components/FadeIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Stories — Hydromedon",
    description:
        "The personal stories behind the songs — what prompted them, the scriptures that shaped them, and the seasons they came from.",
};

export default function StoriesPage() {
    const published = getStorySummaries()
        .filter((s) => !s.draft)
        .sort(
            (a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
        );

    return (
        <main className="min-h-screen bg-black text-white">
            <section className="max-w-5xl mx-auto px-4 pt-28 pb-20">
                {/* Page header */}
                <FadeIn>
                    <div className="text-center mb-14">
                        <h1 className="text-4xl font-bold text-yellow-400 mb-3">
                            Stories
                        </h1>
                        <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
                            Every song starts somewhere. These are the moments,
                            scriptures, and seasons behind the music.
                        </p>
                    </div>
                </FadeIn>

                {published.length === 0 ? (
                    /* Empty state */
                    <FadeIn delayMs={200}>
                        <div className="flex flex-col items-center gap-5 py-28 text-center">
                            <div className="w-16 h-16 rounded-full border border-yellow-900/40 bg-yellow-900/10 flex items-center justify-center text-2xl text-yellow-900/50">
                                ♪
                            </div>
                            <div>
                                <p className="text-white/70 text-lg font-medium mb-2">
                                    Stories are coming
                                </p>
                                <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                                    Each song has a story. They&apos;re being written
                                    and will be published here soon.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                ) : (
                    /* Story grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {published.map((story, idx) => (
                            <FadeIn
                                key={story.slug}
                                delayMs={120 + idx * 80}
                            >
                                <StoryCard story={story} />
                            </FadeIn>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
