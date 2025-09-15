// Shopify Storefront API configuration and functions
// 🔧 SHOPIFY-VERDIER OPPDATERT:
const SHOPIFY_DOMAIN = 'qzzi0h-i1.myshopify.com'; // Din butikk-URL
const STOREFRONT_ACCESS_TOKEN = 'c9aee092ab7443cdf196e82d3f4aec3b'; // Ditt Storefront API token

const SHOPIFY_ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
      };
    }>;
  };
}

interface ShopifyCheckout {
  id: string;
  webUrl: string;
  lineItems: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        variant: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
        };
      };
    }>;
  };
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
}

export async function shopifyFetch(query: string, variables: any = {}) {
  try {
    const response = await fetch(SHOPIFY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('Shopify API errors:', data.errors);
      throw new Error(data.errors[0].message);
    }
    
    return data.data;
  } catch (error) {
    console.error('Shopify API error:', error);
    throw error;
  }
}

// Get product by handle (slug)
export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, { handle });
    return data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Create checkout
export async function createCheckout(variantId: string, quantity: number = 1): Promise<ShopifyCheckout | null> {
  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          lineItems(first: 5) {
            edges {
              node {
                id
                quantity
                variant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
          totalPrice {
            amount
            currencyCode
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lineItems: [{
        variantId,
        quantity
      }]
    }
  };

  try {
    const data = await shopifyFetch(query, variables);
    
    if (data.checkoutCreate.checkoutUserErrors.length > 0) {
      console.error('Checkout errors:', data.checkoutCreate.checkoutUserErrors);
      return null;
    }
    
    return data.checkoutCreate.checkout;
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
}

// Add customer info to checkout
export async function addCustomerToCheckout(
  checkoutId: string, 
  email: string, 
  customAttributes: Array<{ key: string; value: string }> = []
): Promise<ShopifyCheckout | null> {
  const query = `
    mutation checkoutEmailUpdateV2($checkoutId: ID!, $email: String!) {
      checkoutEmailUpdateV2(checkoutId: $checkoutId, email: $email) {
        checkout {
          id
          email
          webUrl
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, { checkoutId, email });
    
    if (data.checkoutEmailUpdateV2.checkoutUserErrors.length > 0) {
      console.error('Email update errors:', data.checkoutEmailUpdateV2.checkoutUserErrors);
      return null;
    }

    // If we have custom attributes (birth data), add them
    if (customAttributes.length > 0) {
      const attributesQuery = `
        mutation checkoutAttributesUpdateV2($checkoutId: ID!, $input: CheckoutAttributesUpdateV2Input!) {
          checkoutAttributesUpdateV2(checkoutId: $checkoutId, input: $input) {
            checkout {
              id
              customAttributes {
                key
                value
              }
            }
            checkoutUserErrors {
              field
              message
            }
          }
        }
      `;

      await shopifyFetch(attributesQuery, {
        checkoutId,
        input: { customAttributes }
      });
    }
    
    return data.checkoutEmailUpdateV2.checkout;
  } catch (error) {
    console.error('Error adding customer to checkout:', error);
    return null;
  }
}

// Product handles - these should match your Shopify product handles
export const PRODUCT_HANDLES = {
  FULL_REPORT: 'astrology-full-report',
  MINI_REPORT: 'astrology-mini-report'
} as const;

// Mock data for development - replace with actual Shopify products once set up
export const MOCK_PRODUCTS = {
  [PRODUCT_HANDLES.FULL_REPORT]: {
    id: 'gid://shopify/Product/1',
    handle: PRODUCT_HANDLES.FULL_REPORT,
    title: 'Complete Astrology Report',
    description: 'Detailed personalized astrology report with birth chart analysis, power dates, and compatibility insights.',
    priceRange: {
      minVariantPrice: {
        amount: '29.00',
        currencyCode: 'USD'
      }
    },
    variants: {
      edges: [{
        node: {
          id: 'gid://shopify/ProductVariant/1',
          title: 'Default Title',
          price: {
            amount: '29.00',
            currencyCode: 'USD'
          },
          availableForSale: true
        }
      }]
    }
  },
  [PRODUCT_HANDLES.MINI_REPORT]: {
    id: 'gid://shopify/Product/2',
    handle: PRODUCT_HANDLES.MINI_REPORT,
    title: 'Mini Astrology Report',
    description: 'PDF report testimonial with 1 key insight, perfect for first-timers.',
    priceRange: {
      minVariantPrice: {
        amount: '19.00',
        currencyCode: 'USD'
      }
    },
    variants: {
      edges: [{
        node: {
          id: 'gid://shopify/ProductVariant/2',
          title: 'Default Title',
          price: {
            amount: '19.00',
            currencyCode: 'USD'
          },
          availableForSale: true
        }
      }]
    }
  }
};

// Helper function to format birth data for Shopify custom attributes
export function formatBirthDataForShopify(formData: any) {
  return [
    { key: 'birth_name', value: formData.fullName || '' },
    { key: 'birth_date', value: formData.birthDate || '' },
    { key: 'birth_time', value: formData.birthTime || 'unknown' },
    { key: 'birth_city', value: formData.birthCity || '' },
    { key: 'birth_country', value: formData.birthCountry || '' },
    { key: 'favorite_color', value: formData.favoriteColor || '#EBCB8B' },
    { key: 'uncertain_time', value: formData.uncertainTime ? 'true' : 'false' }
  ];
}