# SCENTED FUMES - TESTING & QA GUIDE
**Version:** 1.0  
**Last Updated:** January 15, 2026  
**Purpose:** Comprehensive testing procedures for design system compliance

---

## TABLE OF CONTENTS
1. [Quick Testing Checklist](#quick-testing-checklist)
2. [Viewport Testing](#viewport-testing)
3. [Design System Compliance](#design-system-compliance)
4. [Component Testing](#component-testing)
5. [Performance Testing](#performance-testing)
6. [Accessibility Testing](#accessibility-testing)
7. [Browser Compatibility](#browser-compatibility)
8. [Automated Testing Setup](#automated-testing-setup)

---

## QUICK TESTING CHECKLIST

Use this checklist before deploying any component or page:

### Visual Inspection
- [ ] No elements touching viewport edges at any breakpoint
- [ ] All text is readable (high contrast)
- [ ] All interactive elements have visible hover states
- [ ] Spacing feels consistent and intentional
- [ ] Images load properly with appropriate alt text

### Code Inspection
- [ ] No hardcoded colors (check for `#3b1f0b`, `#fdddad`, etc.)
- [ ] No Tailwind spacing utilities (`p-4`, `space-y-6`, `gap-4`)
- [ ] All `clamp()` values use viewport units (vh/vw)
- [ ] All colors use CSS variables (`var(--accent-gold)`)
- [ ] Padding defined on all 4 sides explicitly

### Functional Testing
- [ ] Links navigate correctly
- [ ] Buttons trigger expected actions
- [ ] Forms validate and submit properly
- [ ] Cart operations work (add, remove, update quantity)
- [ ] Mobile menu opens/closes correctly

---

## VIEWPORT TESTING

### Critical Breakpoints

Test every page and component at these exact widths:

| Breakpoint | Width | Device Example | Priority |
|------------|-------|----------------|----------|
| **Mobile Small** | 375px | iPhone SE, small Android | 🔴 Critical |
| **Mobile Large** | 414px | iPhone Pro Max | 🟡 Medium |
| **Tablet Portrait** | 768px | iPad portrait | 🔴 Critical |
| **Tablet Landscape** | 1024px | iPad landscape | 🟡 Medium |
| **Laptop** | 1366px | MacBook Air, standard laptop | 🔴 Critical |
| **Desktop** | 1920px | Full HD monitors | 🔴 Critical |
| **Ultra-Wide** | 2560px | 2K displays | 🟢 Low |

### How to Test Viewports in Chrome DevTools

1. **Open DevTools:** `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Opt+I` (Mac)
2. **Toggle Device Toolbar:** Click device icon or press `Ctrl+Shift+M` / `Cmd+Shift+M`
3. **Select "Responsive" mode** from dropdown
4. **Enter exact width** in the width field
5. **Test critical breakpoints** one by one

### What to Look For at Each Breakpoint

#### 375px (Mobile Small)
**Focus Areas:**
- [ ] Header doesn't overflow (logo + menu visible)
- [ ] Navigation menu is accessible (hamburger icon)
- [ ] Product cards fit within viewport (no horizontal scroll)
- [ ] Text is readable (minimum 14px rendered size)
- [ ] Buttons are tappable (minimum 44×44px touch target)
- [ ] Footer columns stack vertically
- [ ] Cart drawer doesn't exceed viewport width

**Common Issues:**
- Text too small to read
- Buttons too small to tap accurately
- Images too large, causing horizontal scroll
- Padding too aggressive, leaving no content space

#### 768px (Tablet Portrait)
**Focus Areas:**
- [ ] Grid layouts show 2 columns where appropriate
- [ ] Navigation may still use mobile menu or show partial desktop nav
- [ ] Hero section shows appropriate font sizes
- [ ] Product cards display well in 2-column grid
- [ ] Spacing transitions smoothly from mobile

**Common Issues:**
- Awkward spacing between mobile and desktop layouts
- Grid columns too wide or too narrow
- Font sizes stuck at mobile or desktop extremes

#### 1366px (Laptop)
**Focus Areas:**
- [ ] Desktop navigation fully visible
- [ ] Grid layouts show 3-4 columns
- [ ] Hero section displays properly with full imagery
- [ ] Horizontal padding provides breathing room (not edge-touching)
- [ ] Footer displays all 4 columns horizontally
- [ ] Product grids feel balanced

**Common Issues:**
- Content centered with excessive whitespace on sides
- Font sizes too large or small
- Card grids don't utilize available space

#### 1920px (Desktop Full HD)
**Focus Areas:**
- [ ] Content doesn't exceed max-width constraints
- [ ] Font sizes reach their maximum clamp() values
- [ ] Horizontal padding feels generous but not excessive
- [ ] Spacing proportions remain elegant
- [ ] No awkward gaps or compression

**Common Issues:**
- Content stretched too wide, hard to read
- Font sizes become uncomfortably large
- Padding values too large, wasting space

### Edge-Touching Test

**Critical Rule:** NO element should touch viewport edges without intentional full-bleed design.

**Test Procedure:**
1. Open page at each critical breakpoint
2. Scroll through entire page
3. Check top, bottom, left, right edges
4. Look for:
   - Text touching edges
   - Images touching edges
   - Cards touching edges
   - Section containers touching edges

**Expected Behavior:**
- Minimum `clamp(1rem, 3vw, 2rem)` horizontal padding on all containers
- Minimum `clamp(1.5rem, 4vh, 3rem)` vertical padding on sections
- Hero images can extend to edges (full-bleed design)

---

## DESIGN SYSTEM COMPLIANCE

### Color Variable Validation

Run this in DevTools Console to find hardcoded colors:

```javascript
// Find all inline styles with hardcoded colors
document.querySelectorAll('[style*="#"]').forEach(el => {
  console.log('Hardcoded color found:', el.getAttribute('style'), el);
});

// Check for Tailwind color classes
document.querySelectorAll('[class*="bg-slate"], [class*="text-amber"], [class*="border-gray"]').forEach(el => {
  console.log('Tailwind color class found:', el.className, el);
});
```

**Expected Result:** No matches (all colors should use `var(--accent-gold)`, etc.)

### Spacing Validation

Check for forbidden Tailwind spacing utilities:

```javascript
// Find Tailwind spacing utilities
document.querySelectorAll('[class*="space-y-"], [class*="space-x-"], [class*="gap-"], [class*="p-"], [class*="m-"]').forEach(el => {
  // Ignore safe classes like "gap-" with no number
  if (el.className.match(/space-[xy]-\d|gap-\d|p-\d|m-\d/)) {
    console.log('Tailwind spacing found:', el.className, el);
  }
});
```

**Expected Result:** No matches (all spacing should use inline `clamp()` styles)

### Typography Validation

Check for hardcoded font sizes:

```javascript
// Find hardcoded font sizes (not using clamp)
document.querySelectorAll('[style*="fontSize"]').forEach(el => {
  const style = el.getAttribute('style');
  if (style.includes('fontSize') && !style.includes('clamp')) {
    console.log('Hardcoded fontSize found:', style, el);
  }
});
```

**Expected Result:** No matches (all font sizes should use `clamp()`)

---

## COMPONENT TESTING

### Header Component

**Test Scenarios:**

1. **Mobile (375px)**
   - [ ] Logo displays properly
   - [ ] Hamburger menu icon visible and clickable
   - [ ] Cart button visible with badge count
   - [ ] Menu and cart buttons are same size (visual consistency)
   - [ ] Dropdown menu opens correctly
   - [ ] Dropdown menu has proper spacing and background

2. **Desktop (1366px+)**
   - [ ] Full navigation links visible
   - [ ] Shop dropdown appears on hover
   - [ ] Cart button positioned correctly
   - [ ] Hover states work on all links
   - [ ] No layout shift when dropdown opens

**Expected Behavior:**
- Fixed header stays at top during scroll
- Header height measured and exposed as `--header-offset` CSS variable
- Body has `paddingTop: var(--header-offset)` to prevent content overlap

### CartDrawer Component

**Test Scenarios:**

1. **Opening/Closing**
   - [ ] Slides in from right smoothly
   - [ ] Backdrop overlay appears with blur effect
   - [ ] Close button works
   - [ ] Clicking backdrop closes drawer
   - [ ] ESC key closes drawer (if implemented)

2. **Empty State**
   - [ ] Shows "Your cart is empty" message
   - [ ] CTA button to continue shopping

3. **With Items**
   - [ ] Each item displays: image, title, price, quantity, subtotal
   - [ ] Quantity controls work (+ / -)
   - [ ] Remove button works
   - [ ] Subtotal updates correctly
   - [ ] Free shipping progress bar shows correct percentage
   - [ ] Checkout button enabled when cart has items

4. **Responsive Behavior**
   - [ ] At 375px: drawer width is 90vw (max 320px)
   - [ ] At 768px+: drawer width is 450px
   - [ ] Scrollable when items exceed viewport height
   - [ ] Sticky footer with checkout button

### ProductCard Component

**Test Scenarios:**

1. **Visual**
   - [ ] Image displays correctly (object-fit: contain)
   - [ ] Title truncates properly if too long
   - [ ] Price formatted correctly
   - [ ] "VIEW" button visible

2. **Interactions**
   - [ ] Hover state: gold glow shadow appears
   - [ ] Card scales slightly on hover
   - [ ] Link navigates to product page
   - [ ] Button text changes color on hover

3. **Responsive Sizing**
   - [ ] At 375px: card is ~180px wide
   - [ ] At 1920px: card is ~220px wide
   - [ ] Height scales proportionally (260px → 320px)

### Footer Component

**Test Scenarios:**

1. **Layout**
   - [ ] 4 columns on desktop (Quick Links, Categories, Legal, Social)
   - [ ] Stacks to single column on mobile
   - [ ] All links navigate correctly
   - [ ] Social icons link to correct platforms

2. **Styling**
   - [ ] Background uses Modern Luxury colors
   - [ ] All text uses CSS variables
   - [ ] Explicit spacing between sections
   - [ ] Border/dividers use `--accent-gold/15`

---

## PERFORMANCE TESTING

### Page Load Performance

**Tools:**
- Lighthouse (Chrome DevTools)
- PageSpeed Insights
- WebPageTest

**Target Metrics:**

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| **First Contentful Paint** | < 1.5s | < 2.0s |
| **Largest Contentful Paint** | < 2.5s | < 3.0s |
| **Time to Interactive** | < 3.0s | < 4.0s |
| **Cumulative Layout Shift** | < 0.1 | < 0.25 |
| **Total Blocking Time** | < 200ms | < 300ms |

### Lighthouse Testing Procedure

1. Open page in Chrome Incognito mode (clean state)
2. Open DevTools → Lighthouse tab
3. Select "Desktop" or "Mobile"
4. Check all categories (Performance, Accessibility, Best Practices, SEO)
5. Click "Generate report"

**Expected Scores:**
- Performance: 90+ (green)
- Accessibility: 95+ (green)
- Best Practices: 95+ (green)
- SEO: 100 (green)

### Image Optimization

**Checklist:**
- [ ] All images use `next/image` component
- [ ] Images have proper `width` and `height` attributes
- [ ] Images have meaningful `alt` text
- [ ] Remote images configured in `next.config.ts`
- [ ] Product images served from WordPress uploads path
- [ ] No external placeholder hosts in production

---

## ACCESSIBILITY TESTING

### Keyboard Navigation

**Test Procedure:**
1. Navigate page using only keyboard (Tab, Shift+Tab, Enter, Esc)
2. Check:
   - [ ] All interactive elements are focusable
   - [ ] Focus indicator is visible (outline or custom style)
   - [ ] Tab order is logical (top to bottom, left to right)
   - [ ] Dropdowns open with Enter/Space
   - [ ] Modals close with Esc key
   - [ ] Form inputs can be filled via keyboard

### Screen Reader Testing

**Tools:**
- NVDA (Windows - free)
- JAWS (Windows - paid)
- VoiceOver (Mac - built-in: Cmd+F5)

**Test Scenarios:**
- [ ] Page title announced correctly
- [ ] Headings hierarchy is logical (h1 → h2 → h3)
- [ ] Images have descriptive alt text
- [ ] Links describe their destination
- [ ] Buttons describe their action
- [ ] Form labels are associated with inputs

### Color Contrast

**Tools:**
- Chrome DevTools (Lighthouse)
- WebAIM Contrast Checker
- WAVE Browser Extension

**Target Ratios:**
- Normal text (< 18px): 4.5:1 minimum
- Large text (≥ 18px): 3:1 minimum
- UI components: 3:1 minimum

**Check These Combinations:**
- `--text-primary` (#fdddad) on `--bg-main` (#000000): ✅ Pass
- `--text-secondary` (#ffffff) on `--bg-main` (#000000): ✅ Pass
- `--text-secondary` (#ffffff) on `--bg-surface` (#3b1f0b): ✅ Pass
- `--text-muted` (rgba(255,255,255,0.6)) on `--bg-surface`: ⚠️ Check

---

## BROWSER COMPATIBILITY

### Supported Browsers

| Browser | Minimum Version | Priority |
|---------|----------------|----------|
| **Chrome** | 90+ | 🔴 Critical |
| **Safari** | 14+ | 🔴 Critical |
| **Firefox** | 88+ | 🟡 Medium |
| **Edge** | 90+ | 🟡 Medium |
| **Mobile Safari** | iOS 14+ | 🔴 Critical |
| **Chrome Mobile** | Android 10+ | 🔴 Critical |

### Cross-Browser Testing

**Test Procedure:**
1. Open site in each browser
2. Test critical user flows:
   - Browse homepage
   - Navigate to product page
   - Add item to cart
   - Open cart drawer
   - Proceed to checkout
3. Check for:
   - Layout differences
   - Font rendering issues
   - Animation smoothness
   - CSS variable support
   - `clamp()` rendering

**Known Issues:**
- Safari < 13.1: No `clamp()` support (use fallbacks)
- IE11: No CSS variables (unsupported browser)

---

## AUTOMATED TESTING SETUP

### Visual Regression Testing (Optional)

**Recommended Tool:** Percy, Chromatic, or BackstopJS

**Setup Example (BackstopJS):**

```json
{
  "viewports": [
    { "label": "mobile", "width": 375, "height": 667 },
    { "label": "tablet", "width": 768, "height": 1024 },
    { "label": "laptop", "width": 1366, "height": 768 },
    { "label": "desktop", "width": 1920, "height": 1080 }
  ],
  "scenarios": [
    {
      "label": "Homepage",
      "url": "http://localhost:3000"
    },
    {
      "label": "Product Page",
      "url": "http://localhost:3000/product/sample-product"
    },
    {
      "label": "Category Page",
      "url": "http://localhost:3000/category/men"
    }
  ]
}
```

### Unit Testing (Component Tests)

**Recommended:** Vitest + React Testing Library

**Example Test:**

```typescript
import { render, screen } from '@testing-library/react';
import { ProductCard } from '@/components/ui/ProductCard';

describe('ProductCard', () => {
  it('renders with correct styles', () => {
    render(
      <ProductCard
        title="Test Product"
        price="₨ 2,700"
        imageSrc="/test.jpg"
        href="/product/test"
      />
    );

    const card = screen.getByRole('link');
    const computedStyle = window.getComputedStyle(card);

    // Check CSS variables are applied
    expect(computedStyle.background).toContain('var(--bg-surface)');
    expect(computedStyle.border).toContain('var(--accent-gold)');
  });

  it('applies responsive sizing', () => {
    render(<ProductCard {...defaultProps} />);

    const card = screen.getByRole('link');
    const computedStyle = window.getComputedStyle(card);

    // Check clamp() is used
    expect(computedStyle.width).toContain('clamp');
    expect(computedStyle.height).toContain('clamp');
  });
});
```

### E2E Testing (User Flows)

**Recommended:** Playwright or Cypress

**Example E2E Test:**

```typescript
import { test, expect } from '@playwright/test';

test('add product to cart flow', async ({ page }) => {
  // Navigate to product page
  await page.goto('/product/sample-product');

  // Check spacing at mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  const productSection = page.locator('main');
  const box = await productSection.boundingBox();
  
  // Verify no edge-touching (minimum 16px padding)
  expect(box?.x).toBeGreaterThanOrEqual(16);

  // Add to cart
  await page.click('button:has-text("ADD TO CART")');

  // Verify cart drawer opens
  await expect(page.locator('[role="dialog"]')).toBeVisible();

  // Check cart item appears
  await expect(page.locator('text=Sample Product')).toBeVisible();
});
```

---

## TESTING SCHEDULE

### Before Each Deployment

- [ ] Run Lighthouse audit on 5 key pages
- [ ] Test at 4 critical breakpoints (375px, 768px, 1366px, 1920px)
- [ ] Validate color variable usage (DevTools console script)
- [ ] Check for edge-touching issues
- [ ] Test critical user flow (browse → add to cart → checkout)

### Weekly

- [ ] Full browser compatibility check (Chrome, Safari, Firefox)
- [ ] Accessibility audit with screen reader
- [ ] Performance metrics comparison (track over time)

### Monthly

- [ ] Visual regression testing across all pages
- [ ] Mobile device testing (real devices)
- [ ] Code review for design system compliance

---

## TROUBLESHOOTING GUIDE

### Issue: Text Touching Edges

**Symptoms:** Text appears flush against viewport edges, no breathing room

**Solution:**
```tsx
// Add explicit horizontal padding with clamp()
<div style={{
  paddingLeft: "clamp(1.5rem, 4vw, 2rem)",
  paddingRight: "clamp(1.5rem, 4vw, 2rem)",
}}>
```

### Issue: Elements Overlapping at Certain Breakpoints

**Symptoms:** Content overlaps or collides between mobile and desktop layouts

**Solution:**
- Check for missing `gap` definitions in flex containers
- Verify `clamp()` min/max values don't create awkward transitions
- Add conditional rendering for drastically different layouts:
  ```tsx
  <div className="lg:hidden">{/* Mobile */}</div>
  <div className="hidden lg:block">{/* Desktop */}</div>
  ```

### Issue: Font Sizes Too Small or Too Large

**Symptoms:** Text unreadable at extremes (375px or 1920px)

**Solution:**
- Recalculate `clamp()` values with tighter min/max bounds
- Use online clamp calculator: https://clamp.font-size.app/
- Test rendering at actual breakpoints, not just DevTools

### Issue: Horizontal Scroll on Mobile

**Symptoms:** Page wider than viewport, scrollbar appears

**Solution:**
1. Add to `globals.css`:
   ```css
   body {
     overflow-x: hidden;
   }
   ```
2. Find offending element:
   ```javascript
   document.querySelectorAll('*').forEach(el => {
     if (el.scrollWidth > document.documentElement.clientWidth) {
       console.log('Overflow element:', el);
     }
   });
   ```
3. Fix by adding `max-width: 100%` or reducing padding

---

## RESOURCES

### Testing Tools
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Accessibility Tool](https://wave.webaim.org/)

### Design System References
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - Complete design system documentation
- [Copilot Instructions](.github/copilot-instructions.md) - Project guidelines
- [DEEP_SYSTEM_AUDIT.md](DEEP_SYSTEM_AUDIT.md) - Initial audit findings

### Calculators & Generators
- [Clamp Calculator](https://clamp.font-size.app/) - Generate responsive clamp() values
- [Fluid Type Scale](https://www.fluid-type-scale.com/) - Typography scaling tool
- [CSS Grid Generator](https://cssgrid-generator.netlify.app/) - Visual grid builder

---

**Last Updated:** January 15, 2026  
**Next Review:** Monthly or before major releases
