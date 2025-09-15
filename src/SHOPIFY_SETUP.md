# Shopify Integration Setup Guide

This guide will help you set up Shopify to work with your AstraTest application.

## Step 1: Create a Shopify Store

1. Go to [shopify.com](https://shopify.com) and create a new store
2. Choose a plan (Basic Shopify should be sufficient)
3. Complete the store setup process

## Step 2: Get Your Storefront API Credentials

1. In your Shopify Admin, go to **Apps and sales channels**
2. Click **Develop apps**
3. Click **Create an app**
4. Name it "AstraTest Integration"
5. Click **Configure Storefront API scopes**
6. Enable these scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_products`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_customer_tags`

7. Click **Save**
8. Click **Install app**
9. Copy your **Storefront access token**

## Step 3: Update Your Application Configuration

In `/lib/shopify.ts`, replace these values:

```typescript
const SHOPIFY_DOMAIN = 'your-store-name.myshopify.com'; // Replace with your actual domain
const STOREFRONT_ACCESS_TOKEN = 'your_storefront_access_token_here'; // Replace with your token
```

## Step 4: Create Products in Shopify

Create two products in your Shopify admin:

### Product 1: Complete Astrology Report
- **Title**: Complete Astrology Report
- **Handle**: `astrology-full-report` (important - must match exactly)
- **Price**: €19.00
- **Description**: Detailed personalized astrology report with birth chart analysis, power dates, and compatibility insights.
- **SKU**: ASTRO-FULL-001
- **Track quantity**: Unchecked (digital product)
- **Continue selling when out of stock**: Checked

### Product 2: Mini Astrology Insight
- **Title**: Mini Astrology Insight  
- **Handle**: `astrology-mini-report` (important - must match exactly)
- **Price**: €0.00 (free)
- **Description**: Quick astrology insight perfect for first-timers.
- **SKU**: ASTRO-MINI-001
- **Track quantity**: Unchecked (digital product)

## Step 5: Configure Order Processing

### Automatic Order Processing
1. Go to **Settings > Checkout and accounts**
2. Under **Order processing**:
   - Set **Automatically fulfill** for digital products
   - Enable **Automatically archive the order**

### Email Templates
1. Go to **Settings > Notifications**
2. Customize the **Order confirmation** email to include:
   - Instructions for accessing the report
   - Birth data confirmation
   - Support contact information

### Webhooks (Optional but Recommended)
Set up webhooks to handle order processing:

1. Go to **Settings > Notifications**
2. Scroll to **Webhooks**
3. Create webhook for **Order paid**:
   - URL: `https://your-backend.com/webhooks/shopify/order-paid`
   - Format: JSON

## Step 6: Configure Taxes and Shipping

### Taxes
1. Go to **Settings > Taxes and duties**
2. Set up EU VAT rates (automatic for EU stores)
3. Configure tax collection for your regions

### Shipping
Since these are digital products:
1. Go to **Settings > Shipping and delivery**
2. Create a **Digital Products** shipping profile
3. Set rate to €0.00 for all regions
4. Set delivery as "Instant download"

## Step 7: Test the Integration

1. In your React app, toggle the "Use Shopify" switch in the checkout
2. Complete a test order
3. Verify the order appears in Shopify admin
4. Test the checkout flow with different products

## Step 8: Payment Configuration

1. Go to **Settings > Payments**
2. Enable your preferred payment providers:
   - Shopify Payments (recommended)
   - PayPal
   - Stripe
3. Configure payout settings

## Step 9: Domain and SSL (Production)

1. Buy a domain or use your existing one
2. In **Settings > Domains**, add your custom domain
3. Enable SSL (automatic with Shopify)

## Step 10: Launch Checklist

- [ ] Products created with correct handles
- [ ] Storefront API credentials configured
- [ ] Test orders completed successfully
- [ ] Email notifications working
- [ ] Payment methods tested
- [ ] Customer birth data being captured in order attributes
- [ ] Domain configured (if using custom domain)

## Custom Attribute Handling

Your app automatically passes birth data to Shopify as custom attributes:

- `birth_name`: Customer's full name
- `birth_date`: Birth date
- `birth_time`: Birth time (or "unknown")
- `birth_city`: Birth city
- `birth_country`: Birth country
- `favorite_color`: Selected color
- `uncertain_time`: Whether time is uncertain

You can view these in the Shopify admin under each order's details.

## Development vs Production

The app includes a toggle to switch between:
- **Demo mode**: Uses mock data, no real payments
- **Shopify mode**: Uses real Shopify integration

Toggle this in the checkout page for testing.

## Troubleshooting

### Common Issues:

1. **"Product not found" error**
   - Check that product handles match exactly
   - Ensure products are published to the Online Store channel

2. **"Insufficient access" error**
   - Verify Storefront API scopes are enabled
   - Regenerate access token if needed

3. **Checkout creation fails**
   - Check that variants exist and are available for sale
   - Verify inventory settings allow out-of-stock purchases

4. **Custom attributes not showing**
   - They appear in the order details in Shopify admin
   - May take a few minutes to appear after order creation

## Support

- Shopify Help Center: [help.shopify.com](https://help.shopify.com)
- Storefront API Documentation: [shopify.dev/api/storefront](https://shopify.dev/api/storefront)