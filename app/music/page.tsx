import type { Metadata } from "next";
import MusicCard from "@/components/MusicCard";
import { releases } from "@/lib/releases";

export const metadata: Metadata = {
    title: "Music Library",
    description: "Browse all Hydromedon releases.",
    alternates: { canonical: "https://www.hydromedon.com/music" },
};

export default function MusicLibraryPage() {
    return (
        <main className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-yellow-400 mb-2">Music Library</h1>
                <p className="text-sm text-gray-400">All releases from Hydromedon</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {releases.map((release, idx) => (
                    <MusicCard key={release.slug} rel={release} idx={idx} />
                ))}
            </div>
        </main>
    );
}