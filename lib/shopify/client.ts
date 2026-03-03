/* ==========================================================
   Shopify Storefront API — minimal fetch client (2026-safe)
   - Uses SHOPIFY_STOREFRONT_ACCESS_TOKEN if provided (GHCP path)
   - Otherwise mints a Storefront token via Admin OAuth + Admin GraphQL
   ========================================================== */

import "server-only";

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const STOREFRONT_ENDPOINT = `https://${DOMAIN}/api/${process.env.SHOPIFY_API_VERSION ?? "2024-01"}/graphql.json`;
const ADMIN_ENDPOINT = `https://${DOMAIN}/admin/api/${process.env.SHOPIFY_ADMIN_API_VERSION ?? "2026-01"}/graphql.json`;

const STATIC_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;

// In-memory cache (good enough for dev + single server instance)
let cachedStorefrontToken: string | null = null;
// Storefront tokens created via Admin API are not described as expiring in the referenced doc,
// so we do not assume an expiry. We simply cache for process lifetime. [2](https://printify.com/custom-band-merch/)
let storefrontTokenLogged = false;

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
      // Storefront token header for Storefront API
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

/** Prefer static token if present; otherwise mint one via Admin OAuth + Admin GraphQL. */
async function getStorefrontToken(): Promise<string> {
  // GHCP / classic path: static token already provided
  if (STATIC_STOREFRONT_TOKEN && STATIC_STOREFRONT_TOKEN.trim() && !STATIC_STOREFRONT_TOKEN.startsWith("your-")) {
    return STATIC_STOREFRONT_TOKEN.trim();
  }

  // Cached token (for the lifetime of this node process)
  if (cachedStorefrontToken) return cachedStorefrontToken;

  // Dev Dashboard fallback requires client id/secret
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error(
      "Missing Shopify credentials. Provide SHOPIFY_STOREFRONT_ACCESS_TOKEN (preferred) or SHOPIFY_CLIENT_ID + SHOPIFY_CLIENT_SECRET."
    );
  }

  // 1) Get an Admin access token via Client Credentials grant
  // Token endpoint format is documented by Shopify. [1](https://www.stylefactoryproductions.com/blog/how-to-sell-music-on-shopify)
  const adminAccessToken = await getAdminAccessToken(CLIENT_ID, CLIENT_SECRET);

  // 2) Use Admin API to create a Storefront API public access token
  // Shopify documents storefrontAccessTokenCreate as a way to create Storefront tokens. [2](https://printify.com/custom-band-merch/)
  const storefrontToken = await createStorefrontAccessToken(adminAccessToken);

  cachedStorefrontToken = storefrontToken;

  // Helpful dev-only log: lets you paste a stable token into .env.local and avoid generating new ones.
  // (Store has a max of 100 active storefront tokens.) [2](https://printify.com/custom-band-merch/)
  if (process.env.NODE_ENV !== "production" && !storefrontTokenLogged) {
    storefrontTokenLogged = true;
    // eslint-disable-next-line no-console
    console.log(
      "\n[Hydromedon] Generated Storefront token via Admin API. To make GHCP happy, set this in .env.local:\n" +
        `SHOPIFY_STOREFRONT_ACCESS_TOKEN=${storefrontToken}\n`
    );
  }

  return storefrontToken;
}

async function getAdminAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const res = await fetch(`https://${DOMAIN}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify Admin token exchange failed: ${res.status} ${text}`);
  }

  const json = (await res.json()) as { access_token: string; scope?: string; expires_in?: number };
  if (!json.access_token) throw new Error("Shopify Admin token exchange returned no access_token.");
  return json.access_token;
}

async function createStorefrontAccessToken(adminAccessToken: string): Promise<string> {
  const mutation = /* GraphQL */ `
    mutation CreateStorefrontToken($title: String!) {
      storefrontAccessTokenCreate(input: { title: $title }) {
        storefrontAccessToken {
          accessToken
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = { title: "hydromedon-nextjs-storefront" };

  const res = await fetch(ADMIN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Admin API auth header (Admin access token obtained above)
      "X-Shopify-Access-Token": adminAccessToken,
    },
    body: JSON.stringify({ query: mutation, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Admin API call failed: ${res.status} ${res.statusText}\n${text}`);
  }

  const json = (await res.json()) as any;
  const userErrors = json?.data?.storefrontAccessTokenCreate?.userErrors;
  if (Array.isArray(userErrors) && userErrors.length) {
    throw new Error(`storefrontAccessTokenCreate userErrors: ${userErrors.map((e: any) => e.message).join("; ")}`);
  }

  const token = json?.data?.storefrontAccessTokenCreate?.storefrontAccessToken?.accessToken;
  if (!token) throw new Error("storefrontAccessTokenCreate returned no accessToken.");

  return token as string;
}