## Confirmed Approach

### What you get
- A centered `/gift-sets` page with 4 themed cards (uses the 4 labeled images in `public/`).
- A selection UI to choose products for each pack.
- Gift sets are **not** WooCommerce products, but the final order total is still correct by applying WooCommerce **coupon(s)** during checkout (server-side).

## Gift Set Cards + Images
- 3 pcs ECO perfumes for 4500 → `/gift-of-3-eco.png`
- 3 pcs PRO for 6500 → `/gift-of-3-pro.png`
- Buy Pro and get 50% off on ECO → `/gift-of-eco-n-pro.png`
- Buy Pro and get 50% off on Testers pack → `/gift-of-eco-n-testers.png`

## Selection Rules (Strict)
- Offer 1: pick exactly 3 ECO products.
- Offer 2: pick exactly 3 PRO products.
- Offer 3: pick 1 PRO + 1 ECO.
- Offer 4: pick 1 PRO; testers pack is auto-added.

## How Discounts Apply to the Final Woo Order (No “mess”)

### Server-side coupon application (authoritative)
- Extend cart state to persist:
  - `promotionCode` (one of the 4 offers)
  - `promotionSummary` (human-readable list of selections)
- On checkout submission, send `promotionCode` to `/api/checkout`.
- In `/api/checkout` route:
  1) `emptyCart`
  2) `addToCart` for selected real products
  3) `applyCoupon(code)` (new WooGraphQL mutation)
  4) `checkout`

### Safety rules
- The API validates eligibility before applying coupons (correct quantities/categories).
- If a promotion is selected but coupon apply fails, **checkout is blocked** with a clear error (prevents wrong-priced orders).

## Coupon Configuration (Backend prerequisite)
- Create these 4 coupons in WooCommerce admin (codes can be finalized, but must exist):
  - `GIFT3ECO`
  - `GIFT3PRO`
  - `PRO50ECO`
  - `PRO50TESTERS`
- In the repo, store them as env vars (so no hardcoding):
  - `NEXT_PUBLIC_GIFTSET_COUPON_GIFT3ECO`
  - `NEXT_PUBLIC_GIFTSET_COUPON_GIFT3PRO`
  - `NEXT_PUBLIC_GIFTSET_COUPON_PRO50ECO`
  - `NEXT_PUBLIC_GIFTSET_COUPON_PRO50TESTERS`

### Fixed-price bundle note (4500/6500)
- If ECO/PRO prices are uniform, fixed-price bundles are straightforward with fixed-cart coupons.
- If ECO/PRO prices vary, the clean solutions are:
  - create gift set products in Woo, or
  - add a small Woo customization/plugin for dynamic bundle pricing.
- I will implement the frontend + validation to support either, but coupon correctness depends on your Woo configuration.

## Files to Add/Change
- Add: `src/app/gift-sets/page.tsx` (server fetch + centered layout)
- Add: `src/components/gift-sets/GiftSetsClient.tsx` (selection UI, clamp spacing)
- Update: `src/lib/store/cartStore.ts` (promotion metadata)
- Update: `src/components/checkout/CheckoutForm.tsx` (send promotionCode + include promotionSummary in note)
- Update: `src/app/api/checkout/route.ts` (applyCoupon step + validation)
- Add: `src/lib/graphql/promotions.ts` (applyCoupon mutation helper)

## Verification
- `tsc --noEmit`
- Manual: build each gift set and confirm coupon application path + error path

If you confirm, I’ll implement exactly this with the project’s spacing/clamp/theme rules and keep changes isolated to these files.