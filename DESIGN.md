---
name: Obsidian Developer Core
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#b9c8de'
  on-secondary: '#233143'
  secondary-container: '#39485a'
  on-secondary-container: '#a7b6cc'
  tertiary: '#ffb783'
  on-tertiary: '#4f2500'
  tertiary-container: '#d97721'
  on-tertiary-container: '#452000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#d4e4fa'
  secondary-fixed-dim: '#b9c8de'
  on-secondary-fixed: '#0d1c2d'
  on-secondary-fixed-variant: '#39485a'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  stack-sm: 4px
  stack-md: 16px
  stack-lg: 40px
---

## Brand & Style
The design system focuses on a high-density, high-contrast aesthetic tailored for the modern software engineer. The personality is precise, technical, and understated. By leveraging a deep charcoal and black foundation, the UI recedes to allow the developer’s work and code to take center stage.

The style is **Minimalist-Technical**. It avoids the "heavy" feel of traditional skeuomorphism in favor of sharp lines, intentional whitespace, and "terminal-inspired" accents. The emotional response should be one of competence and clarity—mimicking the focused environment of a high-end IDE while maintaining the professional polish of a premium portfolio.

## Colors
This is a true-dark system. The background is pinned to `#000000` to maximize contrast and visual depth on OLED displays. 

- **Primary (Electric Indigo):** Reserved strictly for interactive affordances, progress indicators, and subtle highlights.
- **Surface Tiers:** Use `#121212` for cards and containers to create a soft separation from the pure black canvas.
- **Typography:** Pure white (`#FFFFFF`) is used for headlines to ensure maximum readability, while Slate Gray (`#94A3B8`) handles secondary information and metadata to reduce visual noise.

## Typography
The typography system relies on **Geist** for its mathematical precision and neutral character. It handles all structural content and reading experiences. 

**JetBrains Mono** is utilized as a secondary functional typeface. It is used for all "meta" information—labels, tags, timestamps, and code blocks—to reinforce the developer-centric narrative. Use tighter letter-spacing for headlines to maintain a compact, "engineered" look, and wider spacing for monospaced labels to ensure legibility at small sizes.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop (max-width 1200px) and a **Fluid** model on mobile devices. 

- **Grid:** A 12-column grid is used for desktop. Components should often span 6 or 12 columns to maintain a vertical "columnar" feel reminiscent of a code editor.
- **Rhythm:** An 8px base unit drives all padding and margins. 
- **Whitespace:** Emphasize vertical rhythm. Use generous `stack-lg` (40px+) between major sections to prevent the dark interface from feeling cramped or cluttered.

## Elevation & Depth
This design system avoids traditional drop shadows. Depth is communicated through **Tonal Layering** and **Subtle Outlines**.

1.  **Level 0 (Base):** `#000000` — The main page background.
2.  **Level 1 (Surface):** `#121212` — For cards, navigation bars, and modals.
3.  **Border Glows:** Instead of shadows, elevated elements use a 1px solid border of `rgba(255, 255, 255, 0.1)`. 
4.  **Active State Glow:** Interactive elements in their active or hovered state may use a subtle indigo outer glow (e.g., `0 0 12px rgba(99, 102, 241, 0.3)`) to simulate a backlit terminal screen.

## Shapes
Shapes are intentionally "Soft" (0.25rem / 4px). This subtle rounding takes the edge off the high-contrast UI without making it feel overly organic or "bubbly." 

Buttons and input fields should strictly follow the 4px radius. Small tags and chips may use a slightly more rounded profile (8px) to distinguish them from structural blocks, but never a full pill-shape.

## Components
- **Buttons:** Primary buttons are solid Electric Indigo with white text. Secondary buttons are transparent with a 1px white border. All buttons use the `label-code` typography for a technical feel.
- **Cards:** Cards use the `#121212` surface color and a 1px `rgba(255, 255, 255, 0.08)` border. On hover, the border color transitions to the Electric Indigo accent.
- **Navigation:** A minimal top-bar navigation with a blurred background (`backdrop-filter: blur(12px)`) and a bottom border. No icons, just text links using `label-code`.
- **Input Fields:** Dark background (`#000000`), 1px slate border, and focus state that glows Indigo. 
- **Code Blocks:** Syntax highlighting should be minimal, using shades of indigo, slate, and white. Avoid high-saturation "rainbow" themes.
- **Chips/Tags:** Small, monospaced text in Slate Gray with a subtle background tint (`rgba(148, 163, 184, 0.1)`).