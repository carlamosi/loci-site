# /ui-ux-designer

This guide is the mandatory UI/UX standard for this project.

## Brand Identity (Required)

Only these colors are allowed:

- Primary brand, labels, accents: `#7B5CFF`
- Highlight, CTA, key metrics: `#C6FF00`
- Alerts, spindle waves: `#FF4A62`
- Data accents, ripple: `#00D4FF`
- Primary background: `#080A0F`
- Cards, secondary surfaces: `#0E1018`
- Card hover surface (explicitly allowed): `#131625`
- Primary CTA hover (explicitly allowed): `#B3E000`

Typography:

- Primary font: DM Sans loaded via `next/font` in `app/layout.tsx`.

## Interaction Rules

### Hover behavior

- Use subtle hover only.
- Never use scale values above `1.02`.
- Standard transition: `transition-all duration-200 ease-out`.
- Never use durations under `200ms` for hover.
- Avoid aggressive glow/shadow jumps.

### Cards and containers

- Base: `bg-surface`.
- Hover: `hover:bg-[#131625]`.
- Elevation: `hover:shadow-md`.
- Scale: max `hover:scale-[1.01]`.

### Primary CTA buttons (Acid Green)

- Base background: `#C6FF00`.
- Hover background: `#B3E000`.
- Optional scale for large CTA only: `hover:scale-[1.02]`.
- Keep dimensions stable (no abrupt padding/font changes).

### Text links

- No size or font-weight shift on hover.
- Use subtle color/underline:
  - `hover:underline`
  - `decoration-[#C6FF00]`
  - `underline-offset-4`

### Inputs and focus states

- Use clear but subtle focus:
  - `focus:ring-1 focus:ring-violet`
  - no scaling on focus.

## Motion Rules

- Entry motion should be soft and short (~400ms).
- Use shared fade-up style for cards/sections.
- Respect `prefers-reduced-motion`.
- Spinners/loaders should use Acid Green with soft opacity pulse.

## Forbidden Patterns

- `hover:scale-105` or any scale > `1.02`
- `duration-150` (or lower) for hover interactions
- non-brand hex colors in components
- harsh shadow jumps (`shadow-xl`/`shadow-2xl`) for regular cards
- hover patterns that change layout dimensions abruptly

## QA Checklist

Before merging UI changes:

1. Brand palette compliance verified.
2. Hover intensity is subtle and consistent.
3. Navigation and section visibility are intact.
4. Build and lint pass.
5. Favicon and metadata remain valid.
