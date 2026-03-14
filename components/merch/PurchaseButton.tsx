/* ==========================================================
   PurchaseButton — thin wrapper around GumroadButton
   Retained for compatibility; prefer GumroadButton directly.
   ========================================================== */

"use client";

import GumroadButton from "./GumroadButton";

interface PurchaseButtonProps {
    href: string;
    label?: string;
}

export default function PurchaseButton({
    href,
    label = "Purchase",
}: PurchaseButtonProps) {
    return <GumroadButton href={href} label={label} />;
}