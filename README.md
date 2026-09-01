# VÉRA Clothing — WhatsApp Catalogue

A mobile-first, static fashion catalogue for small Sri Lankan sellers. Customers can browse, search, filter, choose options and continue an order on WhatsApp. There is no checkout, payment, account, database or admin panel.

## Run locally

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Content and branding

- Shop identity, contact links and WhatsApp number: `src/config/shop.config.ts`
- Theme tokens: `src/styles/globals.css` and `src/config/theme.config.ts`
- Products: `src/data/products.ts`
- Categories: `src/data/categories.ts`

To add a product, append a seed record in `products.ts`; the typed mapping creates its item code, slug, stock state and image set. For production, place optimized WebP/AVIF assets in `public/images/products/` and replace each remote `src` with `/images/products/file.webp`. Keep a 4:5 crop and provide meaningful alt text.

## Cloudflare Pages

Use build command `npm run build` and output directory `dist`. The included `public/_redirects` handles direct visits to product URLs. Connect the repository in Cloudflare Pages, deploy, then attach a custom domain under Pages → Custom domains. Alternatively, deploy the built `dist` folder with Wrangler or Cloudflare Direct Upload.

## Phase two: multiple shops

Keep the catalogue engine shared. At startup, read `window.location.hostname`, extract the shop subdomain, and select a shop bundle containing its config, theme and product dataset. For example, `fashion.ourdomain.com` selects `shops/fashion`, while `toys` and `parts` select their own bundles and visual templates. A small registry can map hostname slugs to lazy imports. Later, product data may move to a CMS or Cloudflare D1/R2 without changing reusable catalogue components.

## Phase-one limitations

Products are local TypeScript data; stock does not update automatically. Orders continue outside the site in WhatsApp. Remote demo photography requires a network connection and should be replaced by each client's optimized product photography before launch.
