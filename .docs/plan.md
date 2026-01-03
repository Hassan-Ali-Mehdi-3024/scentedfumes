# scentedfumes Plan

## Phase 1 — Headless Connection Setup
- Install and configure WPGraphQL and WooGraphQL on WordPress.
- Enable CORS for the WordPress install (allow the Vercel domain and localhost during dev).
- Generate WooCommerce Consumer credentials (read/write) or configure JWT if user accounts become necessary.
- Confirm the GraphQL schema by requesting products/categories via GraphiQL, Postman, or similar before touching the frontend.

## Phase 2 — Frontend Foundation (Next.js)
- Stick with the Next.js App Router + Tailwind + TypeScript stack (`npx create-next-app --tailwind --typescript`).
- ✅ Persistent Zustand cart store with `persist` middleware lives in [src/lib/store/cartStore.ts](src/lib/store/cartStore.ts) so reloads keep the current state.
- ✅ Singleton urql GraphQL client in [src/lib/graphql/client.ts](src/lib/graphql/client.ts) to reuse across pages and include credentials.

## Phase 3 — Read Layer (Content Rendering) ✅ COMPLETE
- ✅ Build the homepage and category listing via SSG/ISR (Next.js `generateStaticParams`/`fetch` with `next revalidate = 3600`).
- ✅ Add dynamic `/product/[slug]` routes that pull product details, variations, and related products before rendering.
- ✅ Allow external WordPress media domains by mapping them in `next.config.ts` so `next/image` optimizes them.
- ✅ Product shapes live in [src/types/index.ts](src/types/index.ts) so every component builds against the actual response structure (nested categories, related products, etc.).
- ✅ Helpers in [src/lib/utils.ts](src/lib/utils.ts) include `formatPrice()` to normalize WooCommerce price strings and `cn()` for Tailwind class merging.
- ✅ Homepage and `/product/[slug]` now render using `fetchProductsWithCategories`, `fetchProductBySlug`, and `generateStaticParams` from [src/lib/graphql/products.ts](src/lib/graphql/products.ts) with `revalidate = 3600`.
- ✅ Category archives in `/category/[slug]` pre-render 6 main categories with proper product filtering.
- ✅ All static pages (About, Contact, Privacy, Terms, Refund, Shipping) created with proper content.

## Phase 4 — Write Layer (Cart & Checkout) ✅ COMPLETE
- ✅ Implement add-to-cart actions that push `{ id, quantity }` into the Zustand store.
- ✅ Build checkout form with billing/shipping details validating name, address/city/zone, phone, and order notes.
- ✅ Fire the WooCommerce checkout mutation with `paymentMethod: "cod"`, then navigate to an Order Received page showing the returned order ID and clearing the cart.
- ✅ Cart drawer component with quantity controls and checkout navigation.
- ✅ AddToCartButton component for product pages.
- ✅ Full cart state persistence with product details in localStorage.

## Phase 5 — Production & Polish 🎨 IN PROGRESS (Next: Design Transformation)
- Emit dynamic OpenGraph/SEO metadata for each product page (title/description/image) to improve sharing.
- Deploy through GitHub → Vercel and manage API keys via environment variables.
- (Optional) Wire a WooCommerce webhook that triggers a Vercel rebuild whenever product data changes.
- **Next Focus:** Visual design transformation to match scentedfumes.com brand identity.

## Documentation Norms
- Keep README, `.github/copilot-instructions.md`, and this plan updated with whatever we learn.
- Treat this plan and `.github/copilot-instructions.md` as living documents that reference the current code structure and critical workflows.
