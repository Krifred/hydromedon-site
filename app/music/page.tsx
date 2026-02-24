import MusicTabs from "@/components/MusicTabs";
import { singleReleases, albumReleases, videoReleases } from "@/lib/releases";

export default function MusicPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <section className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-bold text-yellow-400 mb-4">
                    Music Library
                </h1>

                <p className="text-gray-300 mb-10">
                    Singles, albums, and videos from the Biblical Graffiti universe.
                </p>

                {/* ⭐ UPDATED SPACING HERE */}
                <div className="flex justify-center gap-10 mb-12">
                    <MusicTabs singles={singleReleases()} albums={albumReleases()} videos={videoReleases()} />
                </div>

                {/* Your content below */}
            </section>
        </main>
    );
}
