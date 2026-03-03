/* ==========================================================
   Shopify raw response → app domain types
   ========================================================== */

import type { Product, Variant, ShopifyImage, Money } from "./types";

// ---------- raw Shopify GraphQL shapes ----------

type RawMoney = { amount: string; currencyCode: string };

type RawVariant = {
    id: string;
    title: string;
    sku: string;
    availableForSale: boolean;
    price: RawMoney;
    selectedOptions: { name: string; value: string }[];
};

type RawImage = {
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
};

type RawProduct = {
    id: string;
    handle: string;
    title: string;
    description: string;
    productType?: string;
    vendor?: string;
    tags?: string[];
    featuredImage?: RawImage | null;
    images?: { edges: { node: RawImage }[] };
    variants: { edges: { node: RawVariant }[] };
};

// ---------- mappers ----------

function mapMoney(m: RawMoney): Money {
    return { amount: m.amount, currencyCode: m.currencyCode };
}

function mapImage(img: RawImage): ShopifyImage {
    return {
        url: img.url,
        altText: img.altText ?? null,
        width: img.width ?? null,
        height: img.height ?? null,
    };
}

function mapVariant(v: RawVariant): Variant {
    return {
        id: v.id,
        title: v.title,
        sku: v.sku ?? "",
        availableForSale: v.availableForSale,
        price: mapMoney(v.price),
        selectedOptions: v.selectedOptions,
    };
}

export function mapProduct(raw: RawProduct): Product {
    return {
        id: raw.id,
        handle: raw.handle,
        title: raw.title,
        description: raw.description,
        productType: raw.productType,
        vendor: raw.vendor,
        tags: raw.tags ?? [],
        featuredImage: raw.featuredImage ? mapImage(raw.featuredImage) : null,
        images: raw.images?.edges.map((e) => mapImage(e.node)) ?? [],
        variants: raw.variants.edges.map((e) => mapVariant(e.node)),
    };
}

export type { RawProduct };
