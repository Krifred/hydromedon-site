/* ==========================================================
   ArtworkCard — minimal card for an Artwork product
   Links to the internal artwork detail page.
   ========================================================== */

import Image from "next/image";
import Link from "next/link";
import PriceTag from "./PriceTag";
import type { Product } from "@/lib/shopify/types";

interface ArtworkCardProps {
    product: Product;
}

export default function ArtworkCard({ product }: ArtworkCardProps) {
    const price = product.variants[0]?.price;
    const image = product.featuredImage;
    const href = `/merch/artwork/${product.handle}`;

    return (
        <Link
            href={href}
            className="group block rounded-sm overflow-hidden border border-white/8
                       bg-white/[0.03] transition-all duration-300 ease-out
                       hover:border-yellow-500/30
                       hover:shadow-[0_0_32px_rgba(212,175,55,0.22)]"
        >
            {/* Image — square crop */}
            <div className="relative aspect-square bg-black/20 overflow-hidden">
                {image ? (
                    <Image
                        src={image.url}
                        alt={image.altText ?? product.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500
                                   group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/20 text-xs tracking-widest uppercase">
                            No image
                        </span>
                    </div>
                )}
            </div>

            {/* Meta */}
            <div className="px-4 py-4">
                <p className="text-sm text-white/75 leading-snug tracking-wide mb-1">
                    {product.title}
                </p>
                {price && <PriceTag price={price} />}
            </div>
        </Link>
    );
}
