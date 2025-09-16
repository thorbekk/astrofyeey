export default async function handler(req, res) {
  try {
    const { variant, qty } = req.query;
    if (!variant) {
      res.status(400).send("Missing ?variant=NUMERIC_ID");
      return;
    }
    const quantity = parseInt(qty || "1", 10);
    const gid = `gid://shopify/ProductVariant/${variant}`;

    const query = `
      mutation($lines:[CheckoutLineItemInput!]!){
        checkoutCreate(input:{lineItems:$lines}){
          checkout{ webUrl }
          checkoutUserErrors{ message }
        }
      }`;

    const r = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-07/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables: { lines: [{ variantId: gid, quantity }] } }),
    });

    const data = await r.json();
    const url = data?.data?.checkoutCreate?.checkout?.webUrl;

    if (!url) {
      res.status(500).send(`Checkout error: ${JSON.stringify(data)}`);
      return;
    }

    res.writeHead(302, { Location: url });
    res.end();
  } catch (e) {
    res.status(500).send(`Server error: ${e.message}`);
  }
}
