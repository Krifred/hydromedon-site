/* ==========================================================
   Server Actions — merch checkout
   ========================================================== */

"use server";

import { createCheckoutUrl } from "@/lib/shopify/cache";

/**
 * Creates a Shopify checkout for a single variant and returns the URL.
 * Returns an error string on failure so the client can surface it.
 */
export async function createCheckout(
    variantId: string,
    quantity = 1
): Promise<{ url: string } | { error: string }> {
    try {
        const url = await createCheckoutUrl(variantId, quantity);
        return { url };
    } catch (err) {
        const message =
            err instanceof Error ? err.message : "Checkout unavailable";
        return { error: message };
    }
}
