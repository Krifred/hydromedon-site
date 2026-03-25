/* ==========================================================
   MerchCard — card for a Fourthwall collection
   ========================================================== */

import type { FWCollection } from "@/lib/fourthwall";
import MerchCardBase from "./MerchCardBase";

type CardVariant = "artifact" | "wearable";

const SUB_LABELS: Record<CardVariant, string> = {
    artifact: "A piece shaped by tide and time.",
    wearable: "Pieces meant to be lived in.",
};

const CTA_LABELS: Record<CardVariant, string> = {
    artifact: "View the Object",
    wearable: "Enter Collection",
};

interface MerchCardProps {
    collection: FWCollection;
    variant?: CardVariant;
}

export default function MerchCard({ collection, variant = "artifact" }: MerchCardProps) {
    return (
        <MerchCardBase
            href={collection.url}
            image={collection.primaryImage?.url ?? null}
            alt={collection.name}
            title={collection.name}
            subtitle={SUB_LABELS[variant]}
            badge={variant === "artifact" ? "From the Tidebound Collection" : undefined}
            ctaLabel={CTA_LABELS[variant]}
            variant={variant}
        />
    );
}
