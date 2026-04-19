import Link from "next/link";
import { getReleaseBySlug } from "@/lib/releases";
import type { StorySummary } from "@/lib/stories";

export default function StoryCard({ story }: { story: StorySummary }) {
    const release = getReleaseBySlug(story.slug);

    return (
        <article className="bg-black/80 rounded-xl border border-yellow-900/30 overflow-hidden flex flex-col group hover:border-yellow-400/60 hover:-translate-y-1 hover:scale-[1.025] hover:shadow-2xl transition-all duration-300">
            {/* Cover */}
            <Link href={`/stories/${story.slug}`} className="block aspect-square overflow-hidden bg-zinc-900 flex-shrink-0">
                {release?.cover ? (
                    <img
                        src={release.cover}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-yellow-900/20 to-black flex items-center justify-center">
                        <span className="text-yellow-900/60 text-4xl">♪</span>
                    </div>
                )}
            </Link>

            {/* Body */}
            <div className="p-5 flex flex-col gap-2.5 flex-1">
                {story.bibleRef && (
                    <p className="text-xs font-mono text-yellow-300 tracking-wide">
                        {story.bibleRef}
                    </p>
                )}

                <h2 className="text-base font-bold text-white leading-snug">
                    <Link
                        href={`/stories/${story.slug}`}
                        className="hover:text-yellow-400 transition-colors"
                    >
                        {story.title}
                    </Link>
                </h2>

                {story.genres && story.genres.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {story.genres.map((g) => (
                            <span
                                key={g}
                                className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-gray-400 bg-white/5"
                            >
                                {g}
                            </span>
                        ))}
                    </div>
                )}

                {story.excerpt && (
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                        {story.excerpt}
                    </p>
                )}

                <div className="mt-auto pt-3">
                    <Link
                        href={`/stories/${story.slug}`}
                        className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
                    >
                        Read the story →
                    </Link>
                </div>
            </div>
        </article>
    );
}
