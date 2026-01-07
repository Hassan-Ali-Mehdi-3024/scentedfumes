# Scented Fumes - Headless E-Commerce

A Next.js 16.1.1 + Tailwind CSS 4 headless frontend for the Scented Fumes perfume store, powered by WordPress + WooCommerce GraphQL backend.

## Project Status

✅ **Phase 1-2:** Complete - GraphQL connection, cart store, and data fetching layer  
✅ **Phase 3:** Complete - All content pages (Homepage, Products, Categories)  
✅ **Phase 4:** Complete - Cart drawer and checkout flow  
✅ **Phase 5:** Complete - "Modern Luxury" design system implementation  
🎨 **Phase 6:** In Progress - Component redesign and polish

## Quick Start

1. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Set NEXT_PUBLIC_WORDPRESS_API_URL=https://scentedfumes.com/graphql
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Development**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

4. **Production Build**
   ```bash
   npm run build
   npm run start
   ```

## Architecture

### Pages (67 Total)
- **Homepage** (`/`) - Featured products and category navigation
- **Product Pages** (`/product/[slug]`) - 53 pre-rendered product detail pages
- **Category Pages** (`/category/[slug]`) - 6 categories (Men, Women, Unisex, Pro, Eco, Tester)
- **Checkout Flow** (`/checkout`, `/order-received`) - COD payment processing
- **Static Pages** (`/about`, `/contact`, `/privacy-policy`, etc.) - 6 content pages

### State & Data Layers

- **Cart Store** ([src/lib/store/cartStore.ts](src/lib/store/cartStore.ts)) - Zustand with persist middleware, stores full product details in `localStorage`
- **GraphQL Client** ([src/lib/graphql/client.ts](src/lib/graphql/client.ts)) - Singleton urql client with credentials
- **Data Fetchers**:
  - [src/lib/graphql/products.ts](src/lib/graphql/products.ts) - Product queries
  - [src/lib/graphql/categories.ts](src/lib/graphql/categories.ts) - Category queries
  - [src/lib/graphql/checkout.ts](src/lib/graphql/checkout.ts) - Checkout mutation
- **Types** ([src/types/index.ts](src/types/index.ts), [src/types/checkout.ts](src/types/checkout.ts)) - TypeScript definitions matching WPGraphQL schema
- **Utilities** ([src/lib/utils.ts](src/lib/utils.ts)) - `cn()` for class merging, `formatPrice()` for WooCommerce price normalization

### Components

- **Layout** ([src/components/layout/](src/components/layout/)) - Header with cart badge, Footer with navigation
- **Cart** ([src/components/cart/CartDrawer.tsx](src/components/cart/CartDrawer.tsx)) - Slide-over cart with quantity management
- **Product** ([src/components/product/AddToCartButton.tsx](src/components/product/AddToCartButton.tsx)) - Client-side add to cart
- **Checkout** ([src/components/checkout/CheckoutForm.tsx](src/components/checkout/CheckoutForm.tsx)) - COD checkout form

## Scripts

- `npm run dev` - Turbopack development server
- `npm run build` - Production build with SSG
- `npm run start` - Serve production build
- `npm run lint` - ESLint (Next.js + TypeScript)

## Documentation

- **Architecture Guide:** [.github/copilot-instructions.md](.github/copilot-instructions.md)
- **Development Plan:** [.docs/plan.md](.docs/plan.md)
- **Phase 2 Sitemap:** [.docs/phase-2-plan.md](.docs/phase-2-plan.md)

## Design System - "Modern Luxury"

### Typography
- **Font:** Poppins (Google Fonts)
- **Weights:** 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold)
- **Strategy:** Light headings (300-400), body text (300), buttons (500)

### Color Palette
- `--bg-main`: #000000 (Pure Black)
- `--bg-surface`: #3b1f0b (Deep Brown - cards/sections)
- `--accent-gold`: #fdddad (Primary brand color)
- `--text-primary`: #fdddad (Headings/highlights)
- `--text-secondary`: #ffffff (Body text)
- `--text-muted`: rgba(255, 255, 255, 0.6) (Meta/secondary)

### Atmosphere
- **Background:** Radial gradient from Deep Brown to Pure Black
- **Spacing:** Mobile (`px-5`), Desktop (`px-16`) for luxury negative space
- **Components:** Unified ProductCard with glow effects and hover animations

## Tech Stack

- **Framework:** Next.js 16.1.1 (App Router, Turbopack)
- **Styling:** Tailwind CSS 4 with CSS Variables
- **Typography:** Poppins (Modern Luxury)
- **State:** Zustand with persist middleware
- **Data:** urql GraphQL client
- **Backend:** WordPress + WPGraphQL + WooGraphQL
- **Deployment:** Ready for Vercel

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── product/[slug]/    # Product detail pages
│   ├── category/[slug]/   # Category archive pages
│   ├── checkout/          # Checkout flow
│   └── [static pages]/    # About, Contact, Policies
├── components/
│   ├── cart/              # Cart drawer
│   ├── checkout/          # Checkout form
│   ├── layout/            # Header, Footer
│   └── product/           # Product components
├── lib/
│   ├── graphql/           # GraphQL client and queries
│   ├── store/             # Zustand state management
│   └── utils.ts           # Shared utilities
└── types/                 # TypeScript definitions
```

---

**Current Phase:** Component redesign - implementing Modern Luxury aesthetic across all UI elements
