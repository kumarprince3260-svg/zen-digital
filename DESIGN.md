# ZEN Digital — Design System

## Visual Direction
Dark luxury premium affiliate platform. Refined minimalism, restrained gold accents, professional B2B tone. Deep navy near-black background with three-tier surface hierarchy. Serif display font paired with clean sans-serif body. Inspired by high-end fintech and luxury brand interfaces.

## Palette

| Token | OKLCH | Hex Equivalent | Usage |
|-------|-------|---|---|
| background | 0.03 0 0 | #05050f | App background |
| card | 0.08 0 0 | #0c0c1e | Surface layer 1 |
| secondary | 0.15 0 0 | #111128 | Surface layer 2 |
| tertiary | 0.1 0 0 | #18183a | Surface layer 3 |
| foreground | 0.94 0.01 280 | #f0f0ff | Primary text |
| muted | 0.42 0.01 280 | rgba(240,240,255,0.42) | Secondary text |
| primary (gold) | 0.75 0.22 49 | #d4a843 | Accent, highlights, CTAs |
| border | 0.3 0.01 280 | rgba(255,255,255,0.07) | Default borders |
| border-gold | 0.3 0.15 49 | rgba(212,168,67,0.3) | Gold-accented borders |
| chart-1 | 0.5 0.27 264 | #00d4ff | Cyan accent |
| chart-2 | 0.65 0.17 162 | #7c3aed | Purple accent |
| chart-3 | 0.7 0.18 149 | #22d67a | Green accent |
| destructive | 0.65 0.25 22 | #ff4d6d | Error, delete, danger |

## Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display | Cormorant Garamond | 700, 600 | Headlines, hero text |
| Body | Outfit | 400, 500, 600 | Body copy, UI text |
| Mono | DM Mono | 400, 500 | Labels, data, timestamps |

## Structural Zones

| Zone | Surface | Border | Notes |
|------|---------|--------|-------|
| Sidebar | card | border | Left navigation, fixed width, dark |
| Topbar | card | border | Status & time, sticky top |
| Main content | background | none | Full-bleed darkest background |
| Cards/Sections | card | border | Elevated surfaces with subtle borders |
| Hover states | card (darkened) | border-gold | Raised on interaction |
| Active elements | primary (gold) | primary | Gold gradient or solid |

## Interactive Patterns

- **Buttons**: Gold gradient (primary), solid gold background, or outline variant with gold border
- **Hover**: Slight lift (+2px translate), background lightens or glows
- **Active**: Solid gold with dark foreground
- **Disabled**: Muted, no hover, cursor disabled
- **Cards**: Border highlight on hover, subtle shadow lift

## Animations

- **Fade-up**: 0.4s ease, entry animation for major sections
- **Float**: 3s ease-in-out infinite, subtle vertical pulse for icons
- **Glow**: 0.3s ease, gold accent pulse on hover
- **Shimmer**: Loading state animation, gold sweep left-to-right
- **Pulse**: Small opacity/scale pulse for loading spinners

## Density & Spacing

- **Compact**: Labels, metadata, small pills — 8px baseline
- **Regular**: Cards, sections — 16px baseline
- **Spacious**: Hero sections, major content blocks — 24–28px baseline

## Constraints

| Do | Don't |
|---|---|
| Use inline styles for component styling | Use Tailwind utility classes in JSX |
| Consume CSS tokens via `style={{}}` prop | Hardcode hex values in components |
| Gold accent sparingly on CTAs and highlights | Overuse gold — it loses impact |
| Vary surface layers to create depth | Flatten all sections to single bg color |
| Animate entrance and interaction smoothly | Rapid jerky animations |
| High contrast text on backgrounds | Pale text on light surfaces |

## Learnings
- Gold accent is the sole visual excitement; let whitespace and structure carry hierarchy
- Three surface tiers create visual depth without color noise
- Serif headings paired with sans-serif body signals premium, editorial quality
