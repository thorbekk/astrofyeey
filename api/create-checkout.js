export default async function handler(req, res) {
  try {
    const { variantGid, handle, quantity } = req.query;
    const qty = Number(quantity || 1);

    const domain = process.env.SHOPIFY_STORE_DOMAIN;
    const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
    if (!domain || !token) {
      res.status(500).send("Missing env vars");
      return;
    }

    const endpoint = `https://${domain}/api/2024-07/graphql.json`;
    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    };

    let merchandiseId = variantGid || undefined;
    if (!merchandiseId && handle) {
      const prodQuery = `
        query ProductByHandle($handle: String!) {
          product(handle: $handle) { variants(first: 1) { nodes { id } } }
        }`;
      const prodRes = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({ query: prodQuery, variables: { handle } }),
      });
      const prodData = await prodRes.json();
      merchandiseId = prodData?.data?.product?.variants?.nodes?.[0]?.id;
    }

    if (!merchandiseId) {
      res.status(400).send("No variant");
      return;
    }

    const cartMutation = `
      mutation CartCreate($lines: [CartLineInput!]!) {
        cartCreate(input: { lines: $lines }) {
          cart { checkoutUrl }
          userErrors { message }
        }
      }`;
    const variables = { lines: [{ quantity: qty, merchandiseId }] };

    const cartRes = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ query: cartMutation, variables }),
    });
    const cartData = await cartRes.json();

    const err = cartData?.data?.cartCreate?.userErrors?.[0]?.message;
    if (err) {
      res.status(400).send(err);
      return;
    }

    const checkoutUrl = cartData?.data?.cartCreate?.cart?.checkoutUrl;
    if (!checkoutUrl) {
      res.status(400).send("No checkoutUrl");
      return;
    }

    res.writeHead(302, { Location: checkoutUrl });
    res.end();
  } catch (e) {
    res.status(500).send("Error");
  }
}
