// lib/fourthwall/client.ts
// Fourthwall Storefront API v1 — minimal fetch client
//
// Required env var:
//   FOURTHWALL_STOREFRONT_TOKEN — public storefront token from
//   Fourthwall Dashboard → Developer → Storefront API

import type {
  FourthwallCollection,
  FourthwallCollectionsResponse,
  FourthwallProduct,
  FourthwallProductsResponse,
} from "./types";

const BASE = "https://storefront-api.fourthwall.com/v1";
const REVALIDATE = 3600; // 1 hour

function storefrontToken(): string {
  const t = process.env.FOURTHWALL_STOREFRONT_TOKEN;
  if (!t) throw new Error("FOURTHWALL_STOREFRONT_TOKEN is not set in environment variables.");
  return t;
}

function url(path: string, params: Record<string, string> = {}): string {
  const qs = new URLSearchParams({
    storefront_token: storefrontToken(),
    ...params,
  });
  return `${BASE}${path}?${qs.toString()}`;
}

/**
 * Fetch all publicly listed store collections.
 * Guards against the API incorrectly reporting hasNextPage=true by
 * deduplicating on ID and stopping when no new items are returned.
 */
export async function getCollections(): Promise<FourthwallCollection[]> {
  const all: FourthwallCollection[] = [];
  const seen = new Set<string>();
  let pageNumber = 0;
  const MAX_PAGES = 20;

  do {
    const res = await fetch(
      url("/collections", { pageSize: "50", pageNumber: String(pageNumber) }),
      { next: { revalidate: REVALIDATE } }
    );
    if (!res.ok) {
      throw new Error(`Fourthwall getCollections failed: ${res.status} ${res.statusText}`);
    }
    const data: FourthwallCollectionsResponse = await res.json();

    let newItems = 0;
    for (const c of data.results) {
      if (!seen.has(c.id)) {
        seen.add(c.id);
        all.push(c);
        newItems++;
      }
    }

    // Stop if: no more pages, no new items (API looping), or safety limit reached
    if (!data.paging.hasNextPage || newItems === 0 || pageNumber >= MAX_PAGES) break;
    pageNumber++;
  } while (true);

  return all;
}

/** Fetch products belonging to a collection by slug. */
export async function getProductsByCollection(
  collectionSlug: string,
  limit = 50
): Promise<FourthwallProduct[]> {
  const res = await fetch(
    url(`/collections/${encodeURIComponent(collectionSlug)}/products`, {
      pageSize: String(limit),
    }),
    { next: { revalidate: REVALIDATE } }
  );
  if (!res.ok) {
    throw new Error(
      `Fourthwall getProductsByCollection(${collectionSlug}) failed: ${res.status} ${res.statusText}`
    );
  }
  const data: FourthwallProductsResponse = await res.json();
  return data.results;
}

/**
 * Returns the URL of the first image found in a collection's products.
 * Used as a fallback cover image when no local image is available.
 */
export async function getCollectionCoverImage(
  collectionSlug: string
): Promise<string | null> {
  try {
    const products = await getProductsByCollection(collectionSlug, 1);
    return products[0]?.variants[0]?.images[0]?.url ?? null;
  } catch {
    return null;
  }
}

/** Fetch a single product by slug. */
export async function getProduct(productSlug: string): Promise<FourthwallProduct> {
  const res = await fetch(url(`/products/${encodeURIComponent(productSlug)}`), {
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) {
    throw new Error(
      `Fourthwall getProduct(${productSlug}) failed: ${res.status} ${res.statusText}`
    );
  }
  return res.json() as Promise<FourthwallProduct>;
}
