/* ==========================================================
   Shopify Storefront API — minimal fetch client
   ========================================================== */

import "server-only";   

const DOMAIN   = process.env.SHOPIFY_STORE_DOMAIN!;
const API_VER  = process.env.SHOPIFY_API_VERSION ?? "2025-01";
const ADM_VER  = process.env.SHOPIFY_ADMIN_API_VERSION ?? "2025-01";

const STOREFRONT_ENDPOINT = `https://${DOMAIN}/api/${API_VER}/graphql.json`;
const ADMIN_ENDPOINT      = `https://${DOMAIN}/admin/api/${ADM_VER}/graphql.json`;

// Preferred: static Storefront token (SHOPIFY_STOREFRONT_ACCESS_TOKEN)
// Fallback : mint one at startup using SHOPIFY_ADMIN_ACCESS_TOKEN (shpat_...)
const STATIC_SF_TOKEN    = (process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "").trim();
const ADMIN_ACCESS_TOKEN = (process.env.SHOPIFY_ADMIN_ACCESS_TOKEN ?? "").trim();

// In-memory cache — storefront tokens don't expire
let _cachedSfToken: string | null = null;
let _logged = false;

type ShopifyErrors = { message: string }[];

export async function shopifyFetch<T = unknown>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<{ data: T; errors?: ShopifyErrors }> {
  const token = await getStorefrontToken();

  const res = await fetch(STOREFRONT_ENDPOINT, {
    method: "POST",
    headers: {      
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify Storefront fetch failed: ${res.status} ${res.statusText}\n${text}`);
  }

  return res.json() as Promise<{ data: T; errors?: ShopifyErrors }>;
}

async function getStorefrontToken(): Promise<string> {
  // 1. Valid static storefront token
  if (STATIC_SF_TOKEN && !STATIC_SF_TOKEN.startsWith("your-") && STATIC_SF_TOKEN !== "...") {
    return STATIC_SF_TOKEN;
  }

  // 2. Cached minted token
  if (_cachedSfToken) return _cachedSfToken;

  // 3. Mint using Admin API access token (shpat_...)
  if (!ADMIN_ACCESS_TOKEN || ADMIN_ACCESS_TOKEN.startsWith("your-") || ADMIN_ACCESS_TOKEN === "...") {
    throw new Error(
      "Missing Shopify credentials. Set SHOPIFY_STOREFRONT_ACCESS_TOKEN " +
      "(preferred) or SHOPIFY_ADMIN_ACCESS_TOKEN (shpat_...) in .env.local."
    );
  }

  _cachedSfToken = await createStorefrontAccessToken(ADMIN_ACCESS_TOKEN);

  if (process.env.NODE_ENV !== "production" && !_logged) {
    _logged = true;
    console.log(
      "\n[Hydromedon] Minted Storefront token via Admin API. " +
      "To skip this on restart, add to .env.local:\n" +
      `SHOPIFY_STOREFRONT_ACCESS_TOKEN=${_cachedSfToken}\n`
    );
  }

  return _cachedSfToken;
}

async function createStorefrontAccessToken(adminToken: string): Promise<string> {
  const mutation = /* GraphQL */ `
    mutation CreateStorefrontToken($title: String!) {
      storefrontAccessTokenCreate(input: { title: $title }) {
        storefrontAccessToken { accessToken }
        userErrors { field message }
      }
    }
  `;

  const res = await fetch(ADMIN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": adminToken,
    },
    body: JSON.stringify({ query: mutation, variables: { title: "hydromedon-nextjs" } }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Admin API storefrontAccessTokenCreate failed: ${res.status}\n${text}`);
  }

  const json = (await res.json()) as {
    data?: {
      storefrontAccessTokenCreate?: {
        storefrontAccessToken?: { accessToken: string };
        userErrors?: { field: string[]; message: string }[];
      };
    };
  };

  const errs = json?.data?.storefrontAccessTokenCreate?.userErrors;
  if (errs?.length) {
    throw new Error(`storefrontAccessTokenCreate userErrors: ${errs.map((e) => e.message).join("; ")}`);
  }

  const token = json?.data?.storefrontAccessTokenCreate?.storefrontAccessToken?.accessToken;
  if (!token) throw new Error("storefrontAccessTokenCreate returned no accessToken.");
  return token;
}
