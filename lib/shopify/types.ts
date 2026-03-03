export type Money = { amount: string; currencyCode: string };

export type ShopifyImage = {
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
};

export type Variant = {
    id: string;
    title: string;
    sku: string;
    availableForSale: boolean;
    price: Money;
    selectedOptions: { name: string; value: string }[];
};

export type Product = {
    id: string;
    handle: string;
    title: string;
    description: string;
    productType?: string;
    vendor?: string;
    featuredImage?: ShopifyImage | null;
    images?: ShopifyImage[];
    variants: Variant[];
    tags?: string[];
};

export type MerchData = {
    objects: Product[]; // fixed set: Sigil Tee + Lament Hoodie
    artworks: Product[]; // expanding archive: artwork prints
};