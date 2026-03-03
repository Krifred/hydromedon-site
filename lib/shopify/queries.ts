/* ==========================================================
   Shopify Storefront API — GraphQL queries
   ========================================================== */

const PRODUCT_FIELDS = /* graphql */ `
    fragment ProductFields on Product {
        id
        handle
        title
        description
        productType
        vendor
        tags
        featuredImage {
            url
            altText
            width
            height
        }
        images(first: 6) {
            edges {
                node {
                    url
                    altText
                    width
                    height
                }
            }
        }
        variants(first: 10) {
            edges {
                node {
                    id
                    title
                    sku
                    availableForSale
                    price {
                        amount
                        currencyCode
                    }
                    selectedOptions {
                        name
                        value
                    }
                }
            }
        }
    }
`;

/** Fetch all products in a collection by handle */
export const COLLECTION_PRODUCTS_QUERY = /* graphql */ `
    ${PRODUCT_FIELDS}
    query CollectionByHandle($handle: String!, $first: Int!) {
        collectionByHandle(handle: $handle) {
            id
            title
            products(first: $first) {
                edges {
                    node {
                        ...ProductFields
                    }
                }
            }
        }
    }
`;

/** Fetch a single product by handle */
export const PRODUCT_BY_HANDLE_QUERY = /* graphql */ `
    ${PRODUCT_FIELDS}
    query ProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
            ...ProductFields
        }
    }
`;

/** Create a checkout for a single item */
export const CREATE_CHECKOUT_MUTATION = /* graphql */ `
    mutation CheckoutCreate($variantId: ID!, $quantity: Int!) {
        checkoutCreate(
            input: {
                lineItems: [{ variantId: $variantId, quantity: $quantity }]
            }
        ) {
            checkout {
                webUrl
            }
            checkoutUserErrors {
                code
                field
                message
            }
        }
    }
`;
