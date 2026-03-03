/* ==========================================================
   app/merch/artwork/[slug]/page.tsx — Artwork detail
   Server Component — fetches product by handle
   ========================================================== */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify/cache";
import ArtworkDetail from "@/components/merch/ArtworkDetail";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductByHandle(slug);

    if (!product) {
        return { title: "Artwork — Hydromedon" };
    }

    return {
        title: `${product.title} — Hydromedon`,
        description: product.description || "Original artwork by Hydromedon.",
        openGraph: product.featuredImage
            ? {
                  images: [
                      {
                          url: product.featuredImage.url,
                          width: product.featuredImage.width ?? undefined,
                          height: product.featuredImage.height ?? undefined,
                          alt: product.featuredImage.altText ?? product.title,
                      },
                  ],
              }
            : undefined,
    };
}

export default async function ArtworkDetailPage({ params }: Props) {
    const { slug } = await params;
    const product = await getProductByHandle(slug);

    if (!product) notFound();

    return (
        <main className="min-h-screen">
            <ArtworkDetail product={product} />
        </main>
    );
}
