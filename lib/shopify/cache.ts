/* ==========================================================
   Shopify data-fetching layer
   — called from Server Components / page.tsx
   ========================================================== */

import { shopifyFetch } from "./client";
import {
    COLLECTION_PRODUCTS_QUERY,
    PRODUCT_BY_HANDLE_QUERY,
    CREATE_CHECKOUT_MUTATION,
} from "./queries";
import { mapProduct } from "./mapper";
import type { Product, MerchData } from "./types";

// ---------- internal response types ----------

type CollectionResponse = {
    collectionByHandle: {
        id: string;
        title: string;
        products: { edges: { node: Parameters<typeof mapProduct>[0] }[] };
    } | null;
};

type ProductResponse = {
    productByHandle: Parameters<typeof mapProduct>[0] | null;
};

type CheckoutResponse = {
    checkoutCreate: {
        checkout: { webUrl: string } | null;
        checkoutUserErrors: { code: string; field: string[]; message: string }[];
    };
};

// ---------- helpers ----------

async function getCollectionProducts(
    handle: string,
    first = 24
): Promise<Product[]> {
    const { data } = await shopifyFetch<CollectionResponse>({
        query: COLLECTION_PRODUCTS_QUERY,
        variables: { handle, first },
    });

    return (
        data.collectionByHandle?.products.edges.map((e) =>
            mapProduct(e.node)
        ) ?? []
    );
}

// ---------- public API ----------

/** Fetches Objects + Artwork collections for the merch page */
export async function getMerchData(): Promise<MerchData> {
    const [objects, artworks] = await Promise.all([
        getCollectionProducts("objects"),
        getCollectionProducts("artwork", 50),
    ]);
    return { objects, artworks };
}

/** Fetches a single product by Shopify handle */
export async function getProductByHandle(
    handle: string
): Promise<Product | null> {
    const { data } = await shopifyFetch<ProductResponse>({
        query: PRODUCT_BY_HANDLE_QUERY,
        variables: { handle },
    });

    return data.productByHandle ? mapProduct(data.productByHandle) : null;
}

/**
 * Creates a Shopify checkout URL for a single variant.
 * Throws if the checkout cannot be created.
 */
export async function createCheckoutUrl(
    variantId: string,
    quantity = 1
): Promise<string> {
    const { data } = await shopifyFetch<CheckoutResponse>({
        query: CREATE_CHECKOUT_MUTATION,
        variables: { variantId, quantity },
    });

    const { checkout, checkoutUserErrors } = data.checkoutCreate;

    if (checkoutUserErrors.length > 0) {
        throw new Error(checkoutUserErrors.map((e) => e.message).join("; "));
    }

    if (!checkout?.webUrl) {
        throw new Error("Checkout URL not returned by Shopify");
    }

    return checkout.webUrl;
}
