import type { Metadata } from "next";
import MusicTabs from "@/components/MusicTabs";
import { singleReleases, albumReleases, videoReleases } from "@/lib/releases";
import { abs, DEFAULT_OG_IMAGE, SITE_NAME, TWITTER_HANDLE } from "@/lib/seo";

export const dynamicParams = false;

export const metadata: Metadata = {
    title: `Music Library | ${SITE_NAME}`,
    description: `Browse all singles, albums, and music videos by ${SITE_NAME} — Christian dream pop from the Biblical Graffiti universe.`,
    alternates: { canonical: abs("/music") },
    openGraph: {
        type: "website",
        url: abs("/music"),
        title: `Music Library | ${SITE_NAME}`,
        description: `Browse all singles, albums, and music videos by ${SITE_NAME}.`,
        images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
        card: "summary_large_image",
        site: TWITTER_HANDLE,
        title: `Music Library | ${SITE_NAME}`,
        description: `Browse all singles, albums, and music videos by ${SITE_NAME}.`,
        images: [DEFAULT_OG_IMAGE],
    },
};

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

                <div className="flex justify-center gap-10 mb-12">
                    <MusicTabs
                        singles={singleReleases()}
                        albums={albumReleases()}
                        videos={videoReleases()}
                    />
                </div>
            </section>
        </main>
    );
}