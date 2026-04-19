---
name: algorithmic-color-palette
description: Derive a full UI colour palette algorithmically from one or two brand colours. Darker and lighter variants for interactive states, desaturated greys from the brand hue for borders and backgrounds, and semantic colours that feel coherent with the brand rather than generic. Use when building a colour system from scratch or expanding a limited brand palette for UI use.
metadata:
  priority: 8
  pathPatterns:
    - "**/*.css"
    - "**/*.scss"
    - "**/tokens/**"
    - "**/theme/**"
    - "tailwind.config.*"
    - "design-system/**"
  promptSignals:
    phrases:
      - "colour palette"
      - "color palette"
      - "brand colours"
      - "derive colours"
      - "colour tokens"
      - "hover colour"
      - "shade"
      - "tint"
      - "colour system"
  retrieval:
    aliases:
      - colour system
      - algorithmic colours
      - brand colour palette
      - derive shades
      - colour tokens
    intents:
      - generate a colour palette from brand colours
      - derive hover and active colours
      - create grey palette from brand
      - build a full colour system
      - extend a limited brand palette
    examples:
      - generate a full colour palette from this brand blue
      - what colour should the hover state be
      - create a grey palette that fits this brand
      - derive semantic colours from the brand primary
---

# Algorithmic Colour Palette

A brand palette of 2–3 colours is not enough for a UI. You need shades for states (hover, active, disabled), neutrals for backgrounds and borders, and semantic colours for status. Deriving these algorithmically from the brand colours produces a palette that feels coherent — everything is visually related to the brand rather than pulled from a generic grey or a stock colour library.

## Deriving Interactive State Colours

From each brand colour, generate at minimum three variants: base, darker (hover/active), lighter (tint/background).

### Method: HSL adjustment

```
base:    hsl(H, S%, L%)
hover:   hsl(H, S%, L% - 8%)     ← darken by reducing lightness
active:  hsl(H, S%, L% - 14%)    ← darken further
tint:    hsl(H, S%, L% + 40%)    ← lighten significantly for backgrounds
subtle:  hsl(H, S% * 0.3, L% + 45%)  ← heavily desaturated, near-white
```

### Example: brand primary `#133174` (hsl 224, 70%, 27%)

```css
--color-primary-subtle:  hsl(224, 21%, 94%);  /* background tint */
--color-primary-tint:    hsl(224, 70%, 67%);  /* light variant */
--color-primary:         hsl(224, 70%, 27%);  /* base */
--color-primary-hover:   hsl(224, 70%, 19%);  /* hover: -8% lightness */
--color-primary-active:  hsl(224, 70%, 13%);  /* active: -14% lightness */
```

### Example: success green derived from a teal brand colour

If the brand has a green or teal, shift it toward a clearer success green:

```css
--color-success-subtle:  hsl(142, 20%, 94%);
--color-success:         hsl(142, 60%, 35%);
--color-success-hover:   hsl(142, 60%, 27%);
```

## Deriving Brand-Tinted Greys

Generic greys (`#666`, `#999`, `#eee`) feel disconnected from the brand. Desaturating the brand hue produces greys that are subtly tinted — warm, cool, or neutral depending on the brand — and feel like they belong to the same palette.

### Method: desaturate + adjust lightness

```
brand hue H
grey-900: hsl(H, 12%, 10%)   ← near-black, text
grey-700: hsl(H, 10%, 30%)   ← dark text, icons
grey-500: hsl(H,  8%, 50%)   ← secondary text, placeholders
grey-300: hsl(H,  6%, 70%)   ← disabled text, subtle labels
grey-200: hsl(H,  5%, 82%)   ← borders, dividers
grey-100: hsl(H,  4%, 92%)   ← input backgrounds, table stripes
grey-50:  hsl(H,  3%, 96%)   ← page background, subtle fills
```

### Example: brand primary `#133174` (H = 224, blue-tinted)

```css
--color-grey-900: hsl(224, 12%, 10%);  /* #16171f — slightly blue-black */
--color-grey-500: hsl(224,  8%, 50%);  /* #7b7e8a — cool grey */
--color-grey-200: hsl(224,  5%, 82%);  /* #cfd0d5 — cool light border */
--color-grey-50:  hsl(224,  3%, 96%);  /* #f4f4f6 — near-white with a hint of blue */
```

Compare to generic `#f5f5f5` (no hue) — the brand-tinted version is subtly different but feels intentional.

## Semantic Colour Derivation

Status colours (error, warning, success, info) should feel harmonious with the brand. Where possible, derive them from the brand hue family or choose a hue that does not clash.

| Semantic | Default hue | Brand adjustment |
|---|---|---|
| Error | Red (H: 0–10) | Shift slightly toward brand hue if it is warm |
| Warning | Orange/Amber (H: 30–45) | Keep distinct from brand if brand is orange |
| Success | Green (H: 130–150) | Shift toward teal if brand is blue/teal |
| Info | Blue (H: 210–230) | Can match brand primary if primary is blue |

**Critical rule:** if the brand primary is orange, warning cannot also be orange — differentiate by hue (amber vs. orange-red) or use a non-orange warning (yellow).

## Full Token Output Example

```css
:root {
  /* Primary — derived from brand #133174 */
  --color-primary-subtle:  hsl(224, 21%, 94%);
  --color-primary-tint:    hsl(224, 70%, 67%);
  --color-primary:         hsl(224, 70%, 27%);
  --color-primary-hover:   hsl(224, 70%, 19%);
  --color-primary-active:  hsl(224, 70%, 13%);

  /* Brand-tinted neutrals */
  --color-grey-900: hsl(224, 12%, 10%);
  --color-grey-700: hsl(224, 10%, 30%);
  --color-grey-500: hsl(224,  8%, 50%);
  --color-grey-300: hsl(224,  6%, 70%);
  --color-grey-200: hsl(224,  5%, 82%);
  --color-grey-100: hsl(224,  4%, 92%);
  --color-grey-50:  hsl(224,  3%, 96%);

  /* Semantic */
  --color-error:   hsl(4,  72%, 44%);
  --color-warning: hsl(38, 80%, 44%);
  --color-success: hsl(142, 58%, 35%);
  --color-info:    hsl(224, 70%, 27%); /* = primary */

  /* Semantic subtle backgrounds */
  --color-error-subtle:   hsl(4,  50%, 95%);
  --color-warning-subtle: hsl(38, 60%, 95%);
  --color-success-subtle: hsl(142, 40%, 95%);
}
```

## Review Checklist

- [ ] Are hover and active colours derived from the base by lightness adjustment, not chosen independently?
- [ ] Are neutral greys tinted with the brand hue rather than using generic `#666` / `#eee`?
- [ ] Is saturation reduced progressively as lightness increases in the grey scale?
- [ ] Are semantic colours (error, warning, success) harmonious with the brand palette?
- [ ] If the brand primary is orange or amber, is warning colour clearly distinct from it?
- [ ] Does each brand colour have at minimum: subtle, base, hover, active variants?
