// lib/fourthwall/types.ts
// Shapes returned by the Fourthwall Storefront API v1
// Base URL: https://storefront-api.fourthwall.com/v1

export type FourthwallImage = {
  id: string;
  url: string;
  transformedUrl?: string;
  width?: number;
  height?: number;
};

// Collections do NOT have images in the API — images are on product variants.
export type FourthwallCollection = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
};

export type FourthwallPaging = {
  pageNumber: number;
  pageSize: number;
  elementsSize: number;
  elementsTotal: number;
  totalPages: number;
  hasNextPage: boolean;
};

export type FourthwallCollectionsResponse = {
  results: FourthwallCollection[];
  paging: FourthwallPaging;
};

export type FourthwallMoney = {
  value: number;
  currency: string;
};

export type FourthwallVariant = {
  id: string;
  name: string;
  sku?: string;
  unitPrice: FourthwallMoney;
  compareAtPrice?: FourthwallMoney | null;
  images: FourthwallImage[];
  stock?: { type: string };
};

export type FourthwallProduct = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  variants: FourthwallVariant[];
};

export type FourthwallProductsResponse = {
  results: FourthwallProduct[];
  paging: FourthwallPaging;
};
