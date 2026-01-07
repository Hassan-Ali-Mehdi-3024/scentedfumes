# Copilot instructions for scentedfumes

## Architecture overview
- The project is a Next.js 16.1.1 App Router app under `src/app`; the root layout in [src/app/layout.tsx] implements the Poppins font family (weights 300, 400, 500, 600) via `next/font/google`, exports the `metadata` object, and renders `{children}` inside a flex column `<body>` with the Modern Luxury radial gradient background.
- Add new routes by dropping a folder with its own `page.tsx` inside `src/app` so Next automatically picks it up; keep each route typed as a `React.ReactNode` component that mirrors the default `page.tsx` shape.
- Update the shared metadata (title/description) at [src/app/layout.tsx] whenever you want a new default for the entire site rather than per-page metadata overrides.

## Design System - "Modern Luxury"
- The design system is centralized in [src/app/globals.css] using CSS variables for the "Modern Luxury" aesthetic:
  - **Colors:** `--bg-main` (#000000), `--bg-surface` (#3b1f0b), `--accent-gold` (#fdddad), `--text-primary` (#fdddad), `--text-secondary` (#ffffff), `--text-muted` (rgba(255,255,255,0.6))
  - **Typography:** Poppins font family with weights 300 (body/headings), 400 (headings), 500 (buttons), 600 (emphasis)
  - **Atmosphere:** Body uses a fixed radial gradient (`radial-gradient(circle at top center, var(--bg-surface) 0%, var(--bg-main) 60%)`) to create depth
- **Spacing Strategy:** Mobile uses `px-5`, Desktop uses `px-16` for luxury negative space. Components use `gap-6` (mobile) and `gap-12` (desktop).
- **Components:** Use CSS variables for all colors (e.g., `bg-[var(--accent-gold)]`, `text-[var(--text-primary)]`) - never hardcode hex values.
- Because this project uses Tailwind 4, there is no `tailwind.config.js`; the build pipeline comes directly from [postcss.config.mjs], which instantiates the `@tailwindcss/postcss` plugin to process `globals.css`.
- Keep all design tokens and global styles in `globals.css` to ensure consistency across all pages.

## Routing + pages
- [src/app/page.tsx](../src/app/page.tsx) powers the homepage: it fetches categories/products through `fetchProductsWithCategories` and renders a hero, collection cards, and a grid of featured perfumes that link to `/product/[slug]`.
- Product detail content lives in [src/app/product/[slug]/page.tsx](../src/app/product/[slug]/page.tsx), uses `generateStaticParams` for 53 products, and revalidates hourly; it shows pricing, description, related scents, and includes the `AddToCartButton` component.
- Category archives live in [src/app/category/[slug]/page.tsx](../src/app/category/[slug]/page.tsx), pre-rendering 6 main categories (men, women, unisex, pro, eco, tester) with product grids and category descriptions.
- Checkout is handled in [src/app/checkout/page.tsx](../src/app/checkout/page.tsx) via the `CheckoutForm` client component that submits to the `processCheckout` mutation for COD orders.
- Order confirmation displays at [src/app/order-received/page.tsx](../src/app/order-received/page.tsx), clearing the cart on mount and showing success messages with WhatsApp contact.
- Static content pages (about, contact, privacy-policy, terms-conditions, refund-policy, shipping-policy) are all available with proper metadata and content structure.

## State & data layer
- The cart store sits in [src/lib/store/cartStore.ts](../src/lib/store/cartStore.ts) and exposes `useCartStore()` with `addItem`, `updateQuantity`, `removeItem`, `clearCart`, and `toggleCart`. It uses Zustand's `persist` middleware to store full `CartItem` objects (including product details) in local storage, and includes an `isOpen` boolean to control the cart drawer visibility.
- All GraphQL requests go through the singleton in [src/lib/graphql/client.ts](../src/lib/graphql/client.ts) (urql). Point `NEXT_PUBLIC_WORDPRESS_API_URL` at the WordPress GraphQL endpoint, and the client handles credentials for authenticated mutations.
- Canonical GraphQL helpers live in [src/lib/graphql/products.ts](../src/lib/graphql/products.ts), [src/lib/graphql/categories.ts](../src/lib/graphql/categories.ts), and [src/lib/graphql/checkout.ts](../src/lib/graphql/checkout.ts). Use `fetchProductsWithCategories`, `fetchProductSlugs`, `fetchProductBySlug`, `fetchCategorySlugs`, `fetchCategoryBySlug`, and `processCheckout` to keep the app aligned with the WordPress contract.
- All product queries use `... on SimpleProduct` inline fragments to handle WooCommerce's ProductUnion type correctly.

## Helpers & types
- Product/related data shapes live in [src/types/index.ts](../src/types/index.ts) so every component expects the exact structure returned by the backend (nested `productCategories`, `related.nodes`, etc.).
- Shared utilities live in [src/lib/utils.ts](../src/lib/utils.ts). `cn()` wraps `clsx` + `twMerge` for class merging, and `formatPrice()` strips HTML entities (e.g., `₨&nbsp;2,700`) before the UI renders money strings.

## Configuration
- Remote images from WordPress are allowed through the `next/image` remote pattern in [next.config.ts](../next.config.ts), which whitelists `https://scentedfumes.com/wp-content/uploads/**`.

## Components
- The shared `Header` component in [src/components/layout/Header.tsx](../src/components/layout/Header.tsx) displays navigation links to all 6 main categories and includes a cart button with badge showing total item count. It uses `useCartStore()` to track cart state and `toggleCart()` to open the drawer. Styled with `px-5 lg:px-16` for responsive luxury spacing.
- The shared `Footer` component in [src/components/layout/Footer.tsx](../src/components/layout/Footer.tsx) includes Quick Links (Home, About, Contact), Categories (Men, Women, Unisex, Pro, Eco), Legal links (Privacy, Terms, Refund, Shipping), and Social media icons (Facebook, Instagram, WhatsApp, TikTok). Uses luxury spacing `px-5 lg:px-16`.
- The `ProductCard` component in [src/components/ui/ProductCard.tsx](../src/components/ui/ProductCard.tsx) is the unified card design: Deep Brown background (`--bg-surface`), Accent Gold borders (`--accent-gold`), glow effect that fades on hover, and a button with hover transition from gold to white. Fixed dimensions: 220×320px.
- The `CartDrawer` component in [src/components/cart/CartDrawer.tsx](../src/components/cart/CartDrawer.tsx) is a slide-over panel that shows cart items, allows quantity changes, displays subtotal, and includes a checkout button that routes to `/checkout` after closing the drawer.
- The `AddToCartButton` client component in [src/components/product/AddToCartButton.tsx](../src/components/product/AddToCartButton.tsx) calls `addItem(product)` from the cart store to add products with all their details (name, price, image).
- The `CheckoutForm` component in [src/components/checkout/CheckoutForm.tsx](../src/components/checkout/CheckoutForm.tsx) handles COD checkout: it collects billing/shipping details, builds `lineItems` from cart state (using `product.databaseId`), calls `processCheckout()`, and redirects to `/order-received` on success.

## Scripts & workflows
- All runtime scripts come from [package.json#L5-L25]: use `npm run dev` for the Turbopack-powered dev server, `npm run build` for a production build, `npm run start` for serving the compiled app, and `npm run lint` to run ESLint over the TypeScript sources. Installing dependencies uses the `package-lock.json` that `npm` created alongside this file.
- Because the toolchain is TypeScript-first, keep new files typed (e.g., `page.tsx` components should be `function Component()` returning JSX) to avoid needing extra type annotations or `@ts-ignore` stubs.

## Linting + tooling
- The lint config in [eslint.config.mjs#L1-L18] extends Next’s `core-web-vitals` and `typescript` presets, then re-applies the default ignore list so `.next`, `out`, `build`, and `next-env.d.ts` stay skipped; avoid manually re-ignoring those unless something new generates build artifacts.

## Feedback
- Let me know if there are additional conventions (state management, API layer, component directory layout, etc.) you want captured here so I can expand these instructions.
