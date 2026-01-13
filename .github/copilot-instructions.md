# Copilot instructions for scentedfumes

## Architecture overview
- **Stack:** Next.js 16.1.1 (App Router) + Tailwind CSS 4 + TypeScript, consuming WordPress/WooCommerce GraphQL backend at `https://scentedfumes.com/graphql`
- **E-commerce flow:** 67 pages total - 53 product detail pages, 6 category pages, checkout/order-received flows, plus homepage and static content pages
- The root layout in [src/app/layout.tsx] implements Poppins font (weights 300-600) via `next/font/google`, provides global `<Header/>`, `<Footer/>`, and `<CartDrawer/>` components, and wraps children in a flex column body with the Modern Luxury radial gradient background
- **Adding routes:** Drop a folder with `page.tsx` inside `src/app` - Next auto-discovers it. For dynamic routes like products/categories, use `[slug]` folders with `generateStaticParams()` for SSG
- **ISR pattern:** Product/category pages use `export const revalidate = 3600` for hourly revalidation, keeping static generation fast while ensuring fresh data

## Design System - "Modern Luxury"

### Color Palette (Always use CSS variables)
The design system is centralized in [src/app/globals.css] using CSS variables for the "Modern Luxury" aesthetic:
- **Background colors:**
  - `--bg-main`: #000000 (Pure black - drawer/main backgrounds)
  - `--bg-surface`: #3b1f0b (Deep Brown - cards, overlays, surfaces)
- **Accent & Text:**
  - `--accent-gold`: #fdddad (Primary accent - borders, CTAs, highlights)
  - `--text-primary`: #fdddad (Accent Gold - headings, prices)
  - `--text-secondary`: #ffffff (White - body text, labels)
  - `--text-muted`: rgba(255,255,255,0.6) (Faded white - secondary info)
- **NEVER hardcode hex values** - always use CSS variables: `bg-[var(--accent-gold)]`, `text-[var(--text-primary)]`, etc.
- **Opacity layers:** Use `/10`, `/15`, `/20`, `/30`, `/40` suffixes for subtle overlays (e.g., `border-[var(--accent-gold)]/15`)

### Typography System
- **Font Families:**
  - Primary: Poppins (weights 300, 400, 500, 600) - body, UI, navigation
  - Display: Playfair Display - hero headings, section titles, card headings
- **Font Loading:** Both loaded via `next/font/google` in [src/app/layout.tsx] and exposed as CSS variables `--font-poppins` and `--font-playfair`
- **Responsive sizing:** Always use `clamp()` for font sizes to scale fluidly across viewports
  - Headings: `clamp(1.5rem, 3vw, 2.5rem)`
  - Body: `clamp(0.875rem, 1vw, 1rem)`
  - Small text: `clamp(0.75rem, 0.9vw, 0.875rem)`

### Atmosphere & Visual Effects
- **Radial gradient background:** Body uses `radial-gradient(circle at top center, var(--bg-surface) 0%, var(--bg-main) 60%)` creating depth from brown center to black edges
- **Backdrop effects:** `backdrop-blur-sm`, `backdrop-blur-md`, `backdrop-blur-xl` for overlay components (modals, drawers, dropdowns)
- **Shadows:** Use layered shadows for depth:
  - Cards: `shadow-[0_14px_50px_rgba(0,0,0,0.28)]`
  - Drawers: `box-shadow: -10px 0 50px rgba(0, 0, 0, 0.5)`
- **Glow effects:** Gold borders with hover glow via `hover:shadow-[0_0_20px_rgba(253,221,173,0.3)]`

### Spacing Philosophy - EXPLICIT IS EVERYTHING
**CRITICAL PRINCIPLE: All spacing in this project defaults to ZERO. You MUST explicitly define every gap, padding, and margin.**

#### Why Explicit Spacing?
- Tailwind's default spacing utilities (`space-y-*`, `gap-*`, `p-*`) **DO NOT apply** unless you write them
- List items (`<ul>`, `<li>`) have NO vertical spacing by default
- Flex/grid containers have NO gaps unless specified
- This gives precise control but requires you to **define spacing everywhere**

#### Spacing Patterns (Use `clamp()` for fluid responsiveness)
1. **Component padding (breathing room inside containers):**
   ```tsx
   style={{
     paddingTop: "clamp(1rem, 2.2vh, 1.25rem)",
     paddingBottom: "clamp(1rem, 2.2vh, 1.25rem)",
     paddingLeft: "clamp(1rem, 3vw, 1.25rem)",
     paddingRight: "clamp(1rem, 3vw, 1.25rem)",
   }}
   ```

2. **Gaps between elements (use flexbox `gap` or margins):**
   ```tsx
   // Flex gaps (preferred)
   <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.6rem, 1.6vh, 0.9rem)" }}>
   
   // Or explicit margins for list items
   <li style={{
     marginTop: "clamp(0.5rem, 1.4vh, 0.8rem)",
     marginBottom: "clamp(0.5rem, 1.4vh, 0.8rem)"
   }}>
   ```

3. **List container padding (outer space):**
   ```tsx
   <ul style={{ 
     padding: "clamp(0.5rem, 1.8vh, 1rem) 0",  // Vertical padding
     paddingLeft: "clamp(1rem, 4vw, 1.5rem)",   // Horizontal breathing room
     paddingRight: "clamp(1rem, 4vw, 1.5rem)",
     margin: 0  // Reset default margins
   }}>
   ```

4. **Sub-element spacing (internal structure):**
   ```tsx
   // Define gaps for every nested level
   <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 2.5vh, 1.25rem)" }}>
     <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
       {/* Content */}
     </div>
   </div>
   ```

#### Mobile-First Spacing Scale
- **Minimal gaps:** `clamp(0.25rem, 0.5vh, 0.35rem)` - tightly grouped elements
- **Standard gaps:** `clamp(0.5rem, 1.4vh, 0.8rem)` - list items, cards
- **Section gaps:** `clamp(1rem, 2.5vh, 1.5rem)` - major sections
- **Page padding:** `clamp(1.5rem, 4vw, 2rem)` - outer container breathing room

#### Common Spacing Mistakes to Avoid
- ❌ Using `space-y-6` on `<ul>` and assuming items will be spaced (they won't be)
- ❌ Setting padding on a flex container and expecting children to inherit it
- ❌ Using hardcoded `padding: "1rem"` without considering viewport scaling
- ✅ **Always define explicit padding/margin with `clamp()` on the exact element**
- ✅ **Use `gap` for flex/grid containers instead of margin-based spacing**
- ✅ **Test at 375px, 768px, 1366px, and 1920px to verify spacing scales correctly**

### Tailwind 4 Configuration
- **NO `tailwind.config.js`** - configuration happens via CSS `@theme` blocks in [src/app/globals.css]
- Build pipeline: [postcss.config.mjs] instantiates `@tailwindcss/postcss` plugin
- Custom utilities and design tokens live in `globals.css`
- Keep all global styles and tokens centralized for consistency

## Responsive Design Philosophy
- **CRITICAL: Never let elements touch viewport edges.** All components must have sufficient breathing space on all sides (top, bottom, left, right).
- **CRITICAL: All spacing defaults to ZERO.** You must explicitly define every `padding`, `margin`, and `gap` - nothing is inherited or automatic.
- **Use viewport-relative units with `clamp()`** for fluid, responsive sizing that adapts to any screen size:
  - Padding: `clamp(min, preferred, max)` - e.g., `clamp(2rem, 5vw, 6rem)` for horizontal padding
  - Font sizes: `clamp(0.75rem, 0.9vw, 1rem)` scales text smoothly between breakpoints
  - Gaps/spacing: `clamp(1.5rem, 2.5vw, 3rem)` for consistent spacing ratios
  - Component widths: `clamp(180px, 15vw, 280px)` for elements that should scale with viewport
- **Apply inline styles for viewport-based values** using `style={{ padding: "clamp(...)" }}` when Tailwind classes are insufficient
- **Pattern Reference (Header, CartDrawer examples):**
  ```tsx
  // Outer container with explicit 4-side padding
  <header
    style={{
      paddingTop: "clamp(1.5rem, 3vh, 3rem)",
      paddingBottom: "clamp(1.5rem, 3vh, 3rem)",
      paddingLeft: "clamp(2rem, 5vw, 6rem)",
      paddingRight: "clamp(2rem, 5vw, 6rem)",
    }}
  >
    {/* Flex container with explicit gap */}
    <nav style={{ display: "flex", gap: "clamp(2rem, 4vw, 4rem)" }}>
      {/* Content */}
    </nav>
  </header>

  // List container with explicit padding + item margins
  <ul style={{ 
    padding: "clamp(0.5rem, 1.8vh, 1rem) 0",
    paddingLeft: "clamp(1rem, 4vw, 1.5rem)",
    paddingRight: "clamp(1rem, 4vw, 1.5rem)",
    margin: 0 
  }}>
    <li style={{
      marginTop: "clamp(0.5rem, 1.4vh, 0.8rem)",
      marginBottom: "clamp(0.5rem, 1.4vh, 0.8rem)",
      paddingTop: "clamp(1rem, 2.2vh, 1.25rem)",
      paddingBottom: "clamp(1rem, 2.2vh, 1.25rem)",
      paddingLeft: "clamp(1rem, 3vw, 1.25rem)",
      paddingRight: "clamp(1rem, 3vw, 1.25rem)",
    }}>
      {/* Card content with explicit gaps */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.6rem, 1.6vh, 0.9rem)" }}>
          {/* Nested content */}
        </div>
      </div>
    </li>
  </ul>
  ```
- **Why this approach?**
  - Eliminates edge-touching issues across all viewport sizes
  - Creates truly fluid layouts that feel premium on any device
  - Maintains proportional spacing as viewport changes
  - Prevents hardcoded breakpoint jumps that feel abrupt
  - Gives pixel-perfect control over every spacing value
- **When designing new components:** 
  - Always ask "what happens at 1920px? at 1366px? at 768px? at 375px?" 
  - Ensure breathing space exists at all sizes
  - **Define explicit spacing at every nesting level** - containers, items, sub-elements
  - Test that gaps are visually distinct (not merged due to similar backgrounds)

## Routing + pages
- [src/app/page.tsx] powers the homepage: it fetches categories/products through `fetchProductsWithCategories` and renders a hero, collection cards, and a grid of featured perfumes that link to `/product/[slug]`.
- Product detail content lives in [src/app/product/[slug]/page.tsx], uses `generateStaticParams` for 53 products, and revalidates hourly; it shows pricing, description, related scents, and includes the `AddToCartButton` component.
- Category archives live in [src/app/category/[slug]/page.tsx], pre-rendering 6 main categories (men, women, unisex, pro, eco, tester) with product grids and category descriptions.
- Checkout is handled in [src/app/checkout/page.tsx] via the `CheckoutForm` client component that submits to the `processCheckout` mutation for COD orders.
- Order confirmation displays at [src/app/order-received/page.tsx], clearing the cart on mount and showing success messages with WhatsApp contact.
- Static content pages (about, contact, privacy-policy, terms-conditions, refund-policy, shipping-policy) are all available with proper metadata and content structure.

## State & data layer
- **Cart:** Zustand store in [src/lib/store/cartStore.ts] with `persist` middleware - stores FULL `CartItem` objects (not just IDs) in `localStorage`, including all product details (name, price, image, databaseId). Access via `useCartStore()` with `addItem(product)`, `updateQuantity(id, qty)`, `removeItem(id)`, `clearCart()`, `toggleCart()`. The `isOpen` boolean controls CartDrawer visibility.
- **GraphQL client:** Singleton urql client in [src/lib/graphql/client.ts] points to `NEXT_PUBLIC_WORDPRESS_API_URL` env var, includes credentials for authenticated mutations (checkout)
- **Data fetchers:** Server-side helpers in `src/lib/graphql/`:
  - `products.ts`: `fetchProductsWithCategories()`, `fetchProductSlugs()`, `fetchProductBySlug(slug)` 
  - `categories.ts`: `fetchCategorySlugs()`, `fetchCategoryBySlug(slug)`
  - `checkout.ts`: `processCheckout(input)` - submits COD orders to WordPress
- **WooCommerce quirks:** All product queries MUST use `... on SimpleProduct` inline fragments because WPGraphQL returns a `ProductUnion` type. Price strings contain HTML entities (`₨&nbsp;2,700`) - use `formatPrice()` helper to strip them before display.
- **Client-side patterns:** Cart operations happen client-side (cart store), but checkout mutation goes through GraphQL. Use `"use client"` directive for components that need Zustand hooks or event handlers.

## Helpers & types
- Product/related data shapes live in [src/types/index.ts] so every component expects the exact structure returned by the backend (nested `productCategories`, `related.nodes`, etc.).
- Shared utilities live in [src/lib/utils.ts]. `cn()` wraps `clsx` + `twMerge` for class merging, and `formatPrice()` strips HTML entities (e.g., `₨&nbsp;2,700`) before the UI renders money strings.

## Configuration
- Remote images from WordPress are allowed through the `next/image` remote pattern in [next.config.ts], which whitelists `https://scentedfumes.com/wp-content/uploads/**`.

## Components
- **Layout components:**
  - `Header` ([src/components/layout/Header.tsx]): 
    - Fixed header with logo, navigation dropdown (Shop → Gender/Collections categories), cart button with badge
    - Uses `clamp()` for responsive padding on all sides
    - Cart badge shows total quantity via `useCartStore()`
    - **Mobile layout:** Menu and cart buttons are side-by-side (both using identical sizing/padding for visual consistency)
    - **Desktop layout:** Full navigation links with Shop dropdown, cart button on the right
  - `Footer` ([src/components/layout/Footer.tsx]): 
    - Four-column grid with Quick Links, Categories, Legal, and Social icons (Facebook, Instagram, WhatsApp, TikTok)
    - Explicit spacing between sections and line items
- **UI components:**
  - `ProductCard` ([src/components/ui/ProductCard.tsx]): 
    - Unified card design with Deep Brown background (`var(--bg-surface)`), Accent Gold border (`var(--accent-gold)`), glow effect on hover, and "VIEW" button
    - Fixed dimensions: 220×320px
    - Accepts `title`, `price`, `imageSrc`, `href` props
  - `CategoryCard`, `GenderCard`, `CategoryButton`: Home page section components
- **Cart flow:**
  - `CartDrawer` ([src/components/cart/CartDrawer.tsx]): 
    - Slide-over panel controlled by `isOpen` from cart store
    - **Header:** Icon badge, item count, close button with explicit padding
    - **Scrollable area:** Explicit padding on all 4 sides (`paddingLeft`, `paddingRight` for breathing room, `paddingTop`/`paddingBottom` for top/bottom gaps)
    - **Item cards:** Each `<li>` has explicit `marginTop`/`marginBottom` for visible separation + `paddingTop`/`paddingBottom`/`paddingLeft`/`paddingRight` for internal breathing room
    - **Card structure:** Image centered with `flex items-center justify-center`, content split into top row (title + remove button) and bottom row (quantity controls) with explicit `gap` values
    - **Footer:** Free-shipping progress bar, subtotal, shipping info, CTA button - all with explicit `gap` and `padding` definitions
    - Shows items, quantity controls, subtotal, and checkout button that routes to `/checkout`
  - `AddToCartButton` ([src/components/product/AddToCartButton.tsx]): 
    - Client component that calls `addItem(product)` - passes the ENTIRE product object to store
- **Checkout:**
  - `CheckoutForm` ([src/components/checkout/CheckoutForm.tsx]): 
    - Collects billing/shipping details, builds `lineItems` array using `product.databaseId` (NOT `id`)
    - Calls `processCheckout()`, redirects to `/order-received` on success
    - Hard-coded to COD payment
- **Animation patterns:** 
  - Framer Motion variants live in [src/lib/animations.ts] - `fadeUp`, `staggerContainer`, `scaleIn`
  - Used in Hero and home sections with `initial="hidden" animate="visible"` pattern
  - Cart items use staggered slide-in animations with delays based on index

## Scripts & workflows
- **Development:** `npm run dev` - Turbopack-powered dev server on port 3000
- **Build:** `npm run build` - Production build with static generation for 67 pages
- **Preview:** `npm run start` - Serve production build locally
- **Lint:** `npm run lint` - ESLint with Next.js + TypeScript rules
- **Environment:** Create `.env.local` with `NEXT_PUBLIC_WORDPRESS_API_URL=https://scentedfumes.com/graphql`
- **TypeScript:** All new files should be `.tsx` for components, `.ts` for utilities. Keep strict typing - the codebase has full type coverage via [src/types/index.ts] and [src/types/checkout.ts]

## Linting + tooling
- ESLint config in [eslint.config.mjs] extends `next/core-web-vitals` and `next/typescript` - avoids linting `.next`, `out`, `build`, and `next-env.d.ts`
- Tailwind 4 has NO `tailwind.config.js` - configuration happens via CSS `@theme` blocks in [src/app/globals.css] and PostCSS plugin in [postcss.config.mjs]
- TypeScript is strict mode - all components require proper typing, no `any` types allowed

## Feedback
- Let me know if there are additional conventions (state management, API layer, component directory layout, etc.) you want captured here so I can expand these instructions.

## Recent Learnings & Small Guidance

- **Header offset:** The `Header` component now measures its rendered height and exposes it as a CSS variable `--header-offset` on `:root`. Pages and the root layout should use this for top offsetting instead of hardcoded `pt-*` values. Example: in [src/app/layout.tsx] we use `style={{ paddingTop: "var(--header-offset, 5rem)" }}`. This keeps fixed-header layouts consistent across breakpoints and when header content changes.

- **Stable keys for lists:** When mapping lists (products, categories, cart items), prefer stable string keys in this order: `databaseId` → `slug` → `id`. Prefix the value (e.g., `db-123`, `slug-men`, `id-abc`) to guarantee a defined string key and avoid collisions. Avoid using array indices as keys.

- **Remote images / `next.config.ts`:** The project allows remote images from the WordPress uploads path by default. If you use third-party hosts (e.g., Unsplash for placeholders during development), add their domains to `images.remotePatterns` in `next.config.ts` and restart the dev server. Example entry added during recent changes:

  ```ts
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
    pathname: '/**',
  }
  ```

- **Dev workflow note:** Changes to `next.config.ts` require a restart of the dev server (`npm run dev`) to take effect. If images from a new host fail to load, restart before debugging further.

- **Image best-practice:** Use product images served from the WordPress uploads path when possible for production. Reserve external placeholder hosts for local development or previews only; update `next.config.ts` when promoting assets to production domains.

- **GraphQL shapes:** GraphQL responses can vary — validate the presence of `databaseId`, `slug`, and `image` before rendering. Use `formatPrice()` to normalize price strings from WPGraphQL (it strips HTML entities like `₨&nbsp;2,700`).
