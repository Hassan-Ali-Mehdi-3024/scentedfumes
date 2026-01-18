# SCENTED FUMES - DESIGN SYSTEM DOCUMENTATION
**Version:** 2.0  
**Last Updated:** January 15, 2026  
**Status:** Production Ready ✅

---

## TABLE OF CONTENTS
1. [Design Philosophy](#design-philosophy)
2. [Color Palette](#color-palette)
3. [Typography System](#typography-system)
4. [Spacing System](#spacing-system)
5. [Component Patterns](#component-patterns)
6. [Gradients & Effects](#gradients--effects)
7. [Responsive Breakpoints](#responsive-breakpoints)
8. [Usage Guidelines](#usage-guidelines)
9. [Code Examples](#code-examples)

---

## DESIGN PHILOSOPHY

### Modern Luxury Aesthetic
The Scented Fumes design system embodies **Modern Luxury** - a sophisticated blend of premium materials, refined elegance, and contemporary minimalism. Key principles:

- **Dark Foundation:** Pure black (#000000) base with rich brown (#3b1f0b) accents
- **Gold Accents:** Warm accent gold (#fdddad) for highlights, CTAs, and premium touches
- **Atmospheric Depth:** Radial gradients creating dimensional backgrounds
- **Explicit Spacing:** Every pixel intentionally placed using viewport-relative units
- **Fluid Responsiveness:** Seamless scaling from mobile (375px) to ultra-wide (1920px+)

### Core Values
1. **Precision:** No arbitrary values - every measurement deliberate
2. **Consistency:** Design tokens used 100% across all components
3. **Accessibility:** High contrast ratios, readable typography
4. **Performance:** Minimal CSS, optimized for SSG/ISR

---

## COLOR PALETTE

All colors are defined as CSS variables in [src/app/globals.css](src/app/globals.css) and **MUST** be referenced via `var()` notation.

### Primary Colors

#### Backgrounds
```css
--bg-main: #000000          /* Pure Black - drawer backgrounds, main sections */
--bg-surface: #3b1f0b       /* Deep Brown - cards, overlays, surfaces */
```

**Usage:**
- `--bg-main`: Body background, drawer backgrounds, absolute black areas
- `--bg-surface`: Product cards, category cards, modal overlays, surface elements

**DO:**
```tsx
<div style={{ background: "var(--bg-surface)" }}>
```

**DON'T:**
```tsx
<div style={{ background: "#3b1f0b" }}>  {/* ❌ Never hardcode */}
<div className="bg-[#3b1f0b]">          {/* ❌ Never hardcode */}
```

#### Accent & Text Colors
```css
--accent-gold: #fdddad      /* Accent Gold - borders, CTAs, highlights */
--text-primary: #fdddad     /* Accent Gold - headings, prices, primary text */
--text-secondary: #ffffff   /* White - body text, labels, descriptions */
--text-muted: rgba(255, 255, 255, 0.6)  /* Faded White - secondary info, metadata */
```

**Usage Guide:**
- `--text-primary`: Product names, page headings, prices, CTAs
- `--text-secondary`: Body copy, descriptions, navigation links
- `--text-muted`: Timestamps, metadata, helper text, placeholders

**Example:**
```tsx
<h1 style={{ color: "var(--text-primary)" }}>Premium Perfume</h1>
<p style={{ color: "var(--text-secondary)" }}>Elegant fragrance for all occasions</p>
<span style={{ color: "var(--text-muted)" }}>Posted 2 days ago</span>
```

### Opacity Variations
Create subtle overlays using opacity suffixes on Tailwind classes:

```tsx
{/* Border with 15% opacity */}
<div className="border-[var(--accent-gold)]/15">

{/* Background with 30% opacity */}
<div className="bg-[var(--bg-surface)]/30 backdrop-blur-md">

{/* Text with 40% opacity */}
<span className="text-[var(--text-secondary)]/40">
```

**Common Opacity Values:**
- `/10` - Very subtle dividers
- `/15` - Card borders, subtle outlines
- `/20` - Hover states, light overlays
- `/30` - Modal backgrounds, medium overlays
- `/40` - Disabled states, placeholder text
- `/60` - Already defined as `--text-muted`

---

## TYPOGRAPHY SYSTEM

### Font Families

#### Poppins (Body & UI)
- **Weights:** 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold)
- **Usage:** Body text, navigation, buttons, labels, UI elements
- **Loading:** `next/font/google` in [src/app/layout.tsx](src/app/layout.tsx)
- **CSS Variable:** `var(--font-poppins)`

```tsx
<p style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
  Body text using Poppins
</p>
```

#### Playfair Display (Display & Headings)
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold), 800 (Extra-Bold)
- **Usage:** Hero headlines, section titles, product card headings, page titles
- **Loading:** `next/font/google` in [src/app/layout.tsx](src/app/layout.tsx)
- **CSS Variable:** `var(--font-playfair)`

```tsx
<h1 style={{ 
  fontFamily: "var(--font-playfair), serif",
  fontWeight: 700 
}}>
  Hero Headline
</h1>
```

### Responsive Font Sizing

**CRITICAL:** Never use hardcoded font sizes. Always use `clamp()` for fluid responsiveness.

#### Typography Scale (Mobile → Desktop)
```tsx
{/* Hero Headlines - Extra Large */}
fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)"    // 40px → 88px

{/* Section Headings - Large */}
fontSize: "clamp(1.75rem, 4vw, 3rem)"       // 28px → 48px

{/* Card Headings - Medium */}
fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)"  // 20px → 28px

{/* Body Text - Base */}
fontSize: "clamp(0.875rem, 1vw, 1rem)"      // 14px → 16px

{/* Small Text - Compact */}
fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)" // 12px → 14px
```

#### Real-World Examples

**Hero Component:**
```tsx
<h1>
  <span style={{
    fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
    fontFamily: "var(--font-playfair), serif",
    fontWeight: 100,
    letterSpacing: "0.05em",
    color: "var(--text-primary)"
  }}>
    GET THE SCENTED FUMES
  </span>
  <span style={{
    fontSize: "clamp(4rem, 6.5vw, 5.5rem)",
    fontFamily: "var(--font-playfair), serif",
    fontWeight: 800,
    letterSpacing: "0.08em",
    color: "var(--text-primary)"
  }}>
    EXPERIENCE
  </span>
</h1>
```

**Product Card:**
```tsx
<h3 style={{
  fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)",
  fontFamily: "var(--font-playfair), serif",
  fontWeight: 600,
  color: "var(--text-primary)"
}}>
  {productName}
</h3>
```

### Letter Spacing Guide
- **Headings:** `0.05em` to `0.08em` for elegant spacing
- **Body:** `0.025em` (default from globals.css)
- **Buttons/CTAs:** `0.1em` for emphasis
- **All-caps text:** `0.15em` minimum for readability

---

## SPACING SYSTEM

### The Explicit Spacing Philosophy

**CRITICAL PRINCIPLE:** This design system has **ZERO default spacing**. Every gap, padding, and margin must be explicitly defined.

#### Why Zero Defaults?
The global CSS reset in [src/app/globals.css](src/app/globals.css) sets:
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

This means:
- ❌ Tailwind spacing utilities (`space-y-*`, `p-4`, `m-6`) are **FORBIDDEN**
- ❌ List items have NO vertical spacing unless you add it
- ❌ Flex/grid containers have NO gaps unless you specify them
- ✅ **YOU MUST explicitly define every single spacing value**

### Spacing with clamp()

All spacing uses `clamp(min, preferred, max)` for viewport-relative scaling:

```tsx
clamp(
  minimumValue,    // Mobile (375px)
  preferredValue,  // Fluid scaling (vh/vw)
  maximumValue     // Desktop (1920px+)
)
```

#### Spacing Patterns

**1. Component Padding (Breathing Room Inside Containers)**
```tsx
<div style={{
  paddingTop: "clamp(1rem, 2.2vh, 1.25rem)",
  paddingBottom: "clamp(1rem, 2.2vh, 1.25rem)",
  paddingLeft: "clamp(1rem, 3vw, 1.25rem)",
  paddingRight: "clamp(1rem, 3vw, 1.25rem)",
}}>
```

**2. Gaps Between Elements (Use flexbox `gap` or margins)**
```tsx
{/* Preferred: Flex gaps */}
<div style={{ 
  display: "flex", 
  flexDirection: "column", 
  gap: "clamp(0.6rem, 1.6vh, 0.9rem)" 
}}>

{/* Alternative: Explicit margins for list items */}
<li style={{
  marginTop: "clamp(0.5rem, 1.4vh, 0.8rem)",
  marginBottom: "clamp(0.5rem, 1.4vh, 0.8rem)"
}}>
```

**3. List Container Padding (Outer Space)**
```tsx
<ul style={{ 
  padding: "clamp(0.5rem, 1.8vh, 1rem) 0",  // Vertical padding
  paddingLeft: "clamp(1rem, 4vw, 1.5rem)",   // Horizontal breathing room
  paddingRight: "clamp(1rem, 4vw, 1.5rem)",
  margin: 0  // Reset default margins
}}>
```

**4. Sub-Element Spacing (Internal Structure)**
```tsx
<div style={{ 
  display: "flex", 
  flexDirection: "column", 
  gap: "clamp(1rem, 2.5vh, 1.25rem)" 
}}>
  <div style={{ 
    display: "flex", 
    alignItems: "center", 
    gap: "0.75rem" 
  }}>
    {/* Content */}
  </div>
</div>
```

### Mobile-First Spacing Scale

| Purpose | clamp() Value | Mobile (375px) | Desktop (1920px) |
|---------|---------------|----------------|-------------------|
| **Minimal gaps** | `clamp(0.25rem, 0.5vh, 0.35rem)` | 4px | 5.6px |
| **Standard gaps** | `clamp(0.5rem, 1.4vh, 0.8rem)` | 8px | 12.8px |
| **Section gaps** | `clamp(1rem, 2.5vh, 1.5rem)` | 16px | 24px |
| **Page padding** | `clamp(1.5rem, 4vw, 2rem)` | 24px | 32px |
| **Large sections** | `clamp(2rem, 5vw, 6rem)` | 32px | 96px |

### Common Spacing Mistakes

❌ **DON'T:**
```tsx
{/* Using Tailwind spacing utilities */}
<ul className="space-y-6">
  <li className="p-4">...</li>
</ul>

{/* Hardcoded values */}
<div style={{ padding: "1rem" }}>

{/* Missing spacing definition */}
<div style={{ display: "flex" }}>
  <div>Item 1</div>
  <div>Item 2</div>  {/* No gap defined! */}
</div>
```

✅ **DO:**
```tsx
{/* Explicit clamp() with 4-side padding */}
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
  }}>...</li>
</ul>

{/* Fluid viewport-relative padding */}
<div style={{ padding: "clamp(1.5rem, 4vw, 3rem)" }}>

{/* Explicit gap definition */}
<div style={{ display: "flex", gap: "clamp(1rem, 2.5vh, 1.5rem)" }}>
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## COMPONENT PATTERNS

### Standard Component Structure

Every component follows this layered structure:

```tsx
<OuterContainer
  style={{
    // Outer breathing room (4 sides)
    paddingTop: "clamp(...)",
    paddingBottom: "clamp(...)",
    paddingLeft: "clamp(...)",
    paddingRight: "clamp(...)",
    background: "var(--bg-surface)",
  }}
>
  <InnerFlexContainer
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "clamp(1rem, 2.5vh, 1.5rem)",  // Gap between children
    }}
  >
    <Child1 />
    <Child2 />
  </InnerFlexContainer>
</OuterContainer>
```

### Card Pattern (ProductCard, CategoryCard)

```tsx
<div
  className="relative overflow-hidden"
  style={{
    width: "clamp(180px, 15vw, 220px)",
    height: "clamp(260px, 22vh, 320px)",
    background: "var(--bg-surface)",
    border: "1px solid var(--accent-gold)/15",
    borderRadius: "8px",
    paddingTop: "clamp(1rem, 2.2vh, 1.25rem)",
    paddingBottom: "clamp(1rem, 2.2vh, 1.25rem)",
    paddingLeft: "clamp(1rem, 3vw, 1.25rem)",
    paddingRight: "clamp(1rem, 3vw, 1.25rem)",
    transition: "all 0.3s ease",
  }}
>
  <Image />
  <div style={{ 
    display: "flex", 
    flexDirection: "column", 
    gap: "clamp(0.6rem, 1.6vh, 0.9rem)" 
  }}>
    <Title />
    <Price />
    <Button />
  </div>
</div>
```

### Button Pattern (CTA, AddToCart)

```tsx
<button
  className="relative group"
  style={{
    paddingTop: "clamp(0.75rem, 1.5vh, 0.9rem)",
    paddingBottom: "clamp(0.75rem, 1.5vh, 0.9rem)",
    paddingLeft: "clamp(1.5rem, 3.5vw, 2rem)",
    paddingRight: "clamp(1.5rem, 3.5vw, 2rem)",
    background: "var(--accent-gold)",
    color: "var(--bg-main)",
    fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
    fontWeight: 600,
    letterSpacing: "0.1em",
    border: "2px solid transparent",
    borderRadius: "4px",
    transition: "all 0.3s ease",
  }}
>
  BUTTON TEXT
</button>

{/* Hover effect with Tailwind */}
className="hover:shadow-[0_0_20px_rgba(253,221,173,0.3)] hover:scale-105 active:scale-95"
```

### Drawer/Modal Pattern (CartDrawer)

```tsx
<div
  className="fixed inset-y-0 right-0 z-50 overflow-y-auto"
  style={{
    width: "clamp(320px, 90vw, 450px)",
    background: "var(--gradient-drawer)",
    boxShadow: "-10px 0 50px rgba(0, 0, 0, 0.5)",
  }}
>
  {/* Header */}
  <div style={{
    paddingTop: "clamp(1.5rem, 3vh, 2rem)",
    paddingBottom: "clamp(1.5rem, 3vh, 2rem)",
    paddingLeft: "clamp(1.5rem, 4vw, 2rem)",
    paddingRight: "clamp(1.5rem, 4vw, 2rem)",
    borderBottom: "1px solid var(--accent-gold)/15",
  }}>
    <Header />
  </div>

  {/* Scrollable Content */}
  <div style={{
    paddingTop: "clamp(1rem, 2.5vh, 1.5rem)",
    paddingBottom: "clamp(1rem, 2.5vh, 1.5rem)",
    paddingLeft: "clamp(1rem, 3vw, 1.5rem)",
    paddingRight: "clamp(1rem, 3vw, 1.5rem)",
  }}>
    <ul style={{ margin: 0, padding: 0 }}>
      {items.map((item, index) => (
        <li
          key={item.id}
          style={{
            marginTop: "clamp(0.5rem, 1.4vh, 0.8rem)",
            marginBottom: "clamp(0.5rem, 1.4vh, 0.8rem)",
            paddingTop: "clamp(1rem, 2.2vh, 1.25rem)",
            paddingBottom: "clamp(1rem, 2.2vh, 1.25rem)",
            paddingLeft: "clamp(1rem, 3vw, 1.25rem)",
            paddingRight: "clamp(1rem, 3vw, 1.25rem)",
            background: "var(--bg-surface)",
            border: "1px solid var(--accent-gold)/15",
            borderRadius: "8px",
          }}
        >
          {/* Item content with explicit gaps */}
        </li>
      ))}
    </ul>
  </div>

  {/* Footer */}
  <div style={{
    paddingTop: "clamp(1.5rem, 3vh, 2rem)",
    paddingBottom: "clamp(1.5rem, 3vh, 2rem)",
    paddingLeft: "clamp(1.5rem, 4vw, 2rem)",
    paddingRight: "clamp(1.5rem, 4vw, 2rem)",
    borderTop: "1px solid var(--accent-gold)/15",
  }}>
    <Footer />
  </div>
</div>
```

---

## GRADIENTS & EFFECTS

### Gradient Variables

All gradients are centralized in [src/app/globals.css](src/app/globals.css):

```css
/* Drawer backgrounds */
--gradient-drawer: linear-gradient(to bottom, #1a0f08 0%, #0a0504 100%);

/* Surface fade overlays */
--gradient-surface-fade: linear-gradient(to bottom, rgba(59, 31, 11, 0.3) 0%, rgba(0, 0, 0, 0) 100%);

/* Newsletter background */
--gradient-newsletter: linear-gradient(to bottom, #5c311b 0%, #8c512f 50%, #3d1f11 100%);

/* Hero image overlay (darkening effect) */
--gradient-hero-overlay: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.8) 100%);

/* Category header background */
--gradient-category-header: linear-gradient(to bottom, rgba(59, 31, 11, 0.15) 0%, rgba(0, 0, 0, 0) 100%);
```

**Usage:**
```tsx
<div style={{ background: "var(--gradient-drawer)" }}>
```

### Shadow Effects

#### Card Shadows
```tsx
{/* Default card shadow - subtle depth */}
boxShadow: "0 14px 50px rgba(0, 0, 0, 0.28)"

{/* Drawer shadow - prominent separation */}
boxShadow: "-10px 0 50px rgba(0, 0, 0, 0.5)"
```

#### Hover Glow Effects
```tsx
{/* Gold glow on hover */}
className="hover:shadow-[0_0_20px_rgba(253,221,173,0.3)]"

{/* Combined with scale */}
className="hover:shadow-[0_0_20px_rgba(253,221,173,0.3)] hover:scale-105 active:scale-95"
```

### Backdrop Effects

For modals, overlays, and glassmorphism:

```tsx
{/* Light blur */}
className="backdrop-blur-sm"  // blur(4px)

{/* Medium blur */}
className="backdrop-blur-md"  // blur(12px)

{/* Heavy blur */}
className="backdrop-blur-xl"  // blur(24px)
```

**Combined with backgrounds:**
```tsx
<div 
  className="backdrop-blur-md"
  style={{ 
    background: "var(--bg-surface)/30" 
  }}
>
  {/* Glassmorphism effect */}
</div>
```

---

## RESPONSIVE BREAKPOINTS

### Viewport Testing Points

Test all components at these critical widths:

| Device | Width | Notes |
|--------|-------|-------|
| **Mobile** | 375px | iPhone SE, small Android |
| **Tablet** | 768px | iPad portrait |
| **Laptop** | 1366px | MacBook Air, standard laptop |
| **Desktop** | 1920px | Full HD monitors |
| **Ultra-Wide** | 2560px | 2K/4K displays |

### Responsive Patterns

#### Mobile-First Layout Switching

```tsx
{/* Mobile: Single column */}
<div className="lg:hidden">
  <MobileLayout />
</div>

{/* Desktop: Grid layout */}
<div className="hidden lg:block">
  <DesktopLayout />
</div>
```

#### Responsive Grid

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {/* Auto-responsive grid */}
</div>
```

#### Conditional Padding

```tsx
<div style={{
  // More padding on desktop
  paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
  paddingRight: "clamp(1.5rem, 4vw, 4rem)",
  
  // More vertical spacing on mobile
  paddingTop: "clamp(2.5rem, 6vh, 4.5rem)",
  paddingBottom: "clamp(2.5rem, 5vh, 4rem)",
}}>
```

---

## USAGE GUIDELINES

### When Building New Components

1. **Start with the container structure:**
   ```tsx
   <div style={{
     paddingTop: "clamp(...)",
     paddingBottom: "clamp(...)",
     paddingLeft: "clamp(...)",
     paddingRight: "clamp(...)",
   }}>
   ```

2. **Define all gaps between children:**
   ```tsx
   <div style={{ display: "flex", gap: "clamp(...)" }}>
   ```

3. **Use CSS variables for all colors:**
   ```tsx
   color: "var(--text-primary)"
   background: "var(--bg-surface)"
   border: "1px solid var(--accent-gold)/15"
   ```

4. **Apply responsive typography:**
   ```tsx
   fontSize: "clamp(minRem, vwValue, maxRem)"
   fontFamily: "var(--font-poppins), sans-serif"
   ```

5. **Test at all breakpoints:**
   - Open DevTools
   - Test at 375px, 768px, 1366px, 1920px
   - Verify no edge-touching
   - Ensure spacing scales smoothly

### Code Review Checklist

Before submitting any component:

- [ ] No hardcoded hex colors (`#3b1f0b`, `#fdddad`, etc.)
- [ ] No Tailwind spacing utilities (`space-y-*`, `p-4`, `gap-6`)
- [ ] All spacing uses `clamp()` with viewport units
- [ ] Padding defined on ALL 4 sides explicitly
- [ ] Gaps defined for all flex/grid containers
- [ ] Typography uses `clamp()` for font sizes
- [ ] CSS variables used for colors and fonts
- [ ] Tested at 375px, 768px, 1366px, 1920px
- [ ] No elements touching viewport edges
- [ ] Hover states defined for interactive elements

### Common Pitfalls

❌ **Forgetting to define gaps:**
```tsx
<div style={{ display: "flex" }}>  {/* Missing gap! */}
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

✅ **Always define gaps:**
```tsx
<div style={{ display: "flex", gap: "clamp(1rem, 2vw, 1.5rem)" }}>
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

❌ **Hardcoding values:**
```tsx
<h1 style={{ fontSize: "2rem" }}>  {/* Not responsive! */}
```

✅ **Use clamp():**
```tsx
<h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
```

❌ **Missing side padding:**
```tsx
<div style={{ padding: "clamp(1rem, 2vh, 1.5rem)" }}>  {/* Only vertical! */}
```

✅ **All 4 sides:**
```tsx
<div style={{
  paddingTop: "clamp(1rem, 2vh, 1.5rem)",
  paddingBottom: "clamp(1rem, 2vh, 1.5rem)",
  paddingLeft: "clamp(1.5rem, 4vw, 2rem)",
  paddingRight: "clamp(1.5rem, 4vw, 2rem)",
}}>
```

---

## CODE EXAMPLES

### Example 1: Product Card Component

```tsx
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  price: string;
  imageSrc: string;
  href: string;
}

export function ProductCard({ title, price, imageSrc, href }: ProductCardProps) {
  return (
    <Link
      href={href}
      className="block relative group overflow-hidden hover:shadow-[0_0_20px_rgba(253,221,173,0.3)] transition-all duration-300"
      style={{
        width: "clamp(180px, 15vw, 220px)",
        height: "clamp(260px, 22vh, 320px)",
        background: "var(--bg-surface)",
        border: "1px solid var(--accent-gold)/15",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          paddingTop: "clamp(1rem, 2.2vh, 1.25rem)",
          paddingBottom: "clamp(1rem, 2.2vh, 1.25rem)",
          paddingLeft: "clamp(1rem, 3vw, 1.25rem)",
          paddingRight: "clamp(1rem, 3vw, 1.25rem)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(0.8rem, 2vh, 1rem)",
          height: "100%",
        }}
      >
        {/* Image Container */}
        <div className="relative flex-shrink-0" style={{ height: "60%" }}>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(0.4rem, 1vh, 0.6rem)",
            flex: 1,
          }}
        >
          <h3
            style={{
              fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)",
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 600,
              color: "var(--text-primary)",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h3>

          <p
            style={{
              fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 500,
              color: "var(--text-primary)",
            }}
          >
            {price}
          </p>

          <button
            className="group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-main)] transition-all duration-300"
            style={{
              marginTop: "auto",
              paddingTop: "clamp(0.5rem, 1.2vh, 0.7rem)",
              paddingBottom: "clamp(0.5rem, 1.2vh, 0.7rem)",
              fontSize: "clamp(0.75rem, 1vw, 0.85rem)",
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "var(--text-primary)",
              border: "1px solid var(--accent-gold)",
              borderRadius: "4px",
            }}
          >
            VIEW
          </button>
        </div>
      </div>
    </Link>
  );
}
```

### Example 2: Section Container

```tsx
export function Section({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <section
      style={{
        paddingTop: "clamp(3rem, 8vh, 6rem)",
        paddingBottom: "clamp(3rem, 8vh, 6rem)",
        paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
        paddingRight: "clamp(1.5rem, 4vw, 4rem)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              color: "var(--text-primary)",
              textAlign: "center",
              marginBottom: "clamp(2rem, 5vh, 4rem)",
            }}
          >
            {title}
          </h2>
        )}
        
        {children}
      </div>
    </section>
  );
}
```

### Example 3: Form Input

```tsx
export function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(0.4rem, 1vh, 0.6rem)",
      }}
    >
      <label
        style={{
          fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
          fontWeight: 500,
          color: "var(--text-secondary)",
          letterSpacing: "0.025em",
        }}
      >
        {label}
      </label>
      
      <input
        {...props}
        className="border-[var(--accent-gold)]/15 focus:border-[var(--accent-gold)] transition-colors duration-200"
        style={{
          paddingTop: "clamp(0.75rem, 1.5vh, 0.9rem)",
          paddingBottom: "clamp(0.75rem, 1.5vh, 0.9rem)",
          paddingLeft: "clamp(1rem, 2.5vw, 1.25rem)",
          paddingRight: "clamp(1rem, 2.5vw, 1.25rem)",
          fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
          background: "var(--bg-surface)",
          color: "var(--text-secondary)",
          border: "1px solid",
          borderRadius: "4px",
          outline: "none",
        }}
      />
    </div>
  );
}
```

---

## VERSION HISTORY

- **v2.0** (Jan 15, 2026): Complete redesign after Phase 1-3 improvements
  - Added gradient CSS variables
  - Implemented responsive typography with clamp()
  - 100% design system consistency achieved
  - All spacing uses explicit clamp() values

- **v1.0** (Initial): Modern Luxury design system foundation established

---

**For questions or clarification, refer to:**
- [Copilot Instructions](.github/copilot-instructions.md)
- [Deep System Audit](DEEP_SYSTEM_AUDIT.md)
- [Phase 1 Fixes Documentation](PHASE_1_FIXES_COMPLETE.md)
