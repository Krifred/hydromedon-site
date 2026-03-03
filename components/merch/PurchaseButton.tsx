/* ==========================================================
   PurchaseButton — creates a Shopify checkout & redirects
   Client component
   ========================================================== */

"use client";

import { useState } from "react";
import { createCheckout } from "@/app/merch/actions";

interface PurchaseButtonProps {
    variantId: string | null;
    /** Label override (default: “Purchase”) */
    label?: string;
}

export default function PurchaseButton({
    variantId,
    label = "Purchase",
}: PurchaseButtonProps) {
    const [pending, setPending] = useState(false);
    const [error, setError]   = useState<string | null>(null);

    async function handleClick() {
        if (!variantId) return;
        setPending(true);
        setError(null);

        const result = await createCheckout(variantId);

        if ("error" in result) {
            setError(result.error);
            setPending(false);
            return;
        }

        // Redirect to Shopify hosted checkout
        window.location.href = result.url;
    }

    const disabled = !variantId || pending;

    return (
        <div className="flex flex-col gap-2">
            <button
                type="button"
                disabled={disabled}
                onClick={handleClick}
                className={[
                    "relative px-8 py-3 text-sm tracking-widest uppercase font-light",
                    "border transition-all duration-300 rounded-sm",
                    disabled
                        ? "border-white/15 text-white/30 cursor-not-allowed"
                        : [
                              "border-yellow-500/50 text-yellow-400",
                              "hover:bg-yellow-500/10 hover:border-yellow-400/70",
                              "hover:shadow-[0_0_24px_rgba(212,175,55,0.3)]",
                          ].join(" "),
                ].join(" ")}
            >
                {pending ? (
                    <span className="flex items-center gap-2">
                        <span
                            className="inline-block h-3 w-3 rounded-full border-2
                                       border-yellow-400/60 border-t-transparent
                                       animate-spin"
                        />
                        Redirecting…
                    </span>
                ) : (
                    label
                )}
            </button>

            {error && (
                <p className="text-xs text-red-400/70">{error}</p>
            )}
        </div>
    );
}
