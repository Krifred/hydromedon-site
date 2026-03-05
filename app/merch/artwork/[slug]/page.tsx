/* ==========================================================
   app/merch/artwork/[slug]/page.tsx — Artwork detail
   Static Server Component — looks up artwork from catalog
   ========================================================== */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArtworkBySlug } from "@/lib/gumroad/catalog";
import ArtworkDetail from "@/components/merch/ArtworkDetail";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const item = getArtworkBySlug(slug);

    if (!item) {
        return { title: "Artwork — Hydromedon" };
    }

    return {
        title: `${item.title} — Hydromedon`,
        description: item.description || "Original artwork by Hydromedon.",
        openGraph: {
            images: [{ url: item.imageSrc, alt: item.title }],
        },
    };
}

export default async function ArtworkDetailPage({ params }: Props) {
    const { slug } = await params;
    const item = getArtworkBySlug(slug);

    if (!item) notFound();

    return (
        <main className="min-h-screen">
            <ArtworkDetail item={item} />
        </main>
    );
}
