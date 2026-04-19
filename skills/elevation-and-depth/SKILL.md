---
name: elevation-and-depth
description: Elevation — subtle shadows and layering — communicates visual hierarchy by lifting elements above the surface. Combined with border-radius, it creates the tactile quality of cards, modals, and interactive surfaces. Use when designing cards, dropdowns, modals, tooltips, or any floating UI element.
metadata:
  priority: 6
  pathPatterns:
    - "**/*.css"
    - "**/*.scss"
    - "**/tokens/**"
    - "**/theme/**"
    - "tailwind.config.*"
    - "design-system/**"
    - "components/**"
  promptSignals:
    phrases:
      - "shadow"
      - "elevation"
      - "card"
      - "border radius"
      - "depth"
      - "floating"
      - "modal"
      - "dropdown"
retrieval:
  aliases:
    - elevation
    - box shadow
    - card design
    - depth hierarchy
    - border radius
    - floating elements
  intents:
    - make a card stand out
    - design elevation system
    - set up shadow tokens
    - make hierarchy feel physical
    - style a modal or dropdown
  examples:
    - make this card feel elevated
    - set up a shadow scale for the design system
    - what border radius should cards use
---

# Elevation and Depth

Elevation uses shadow and layering to communicate that an element sits above the base surface — giving UI a sense of physical depth. Combined with border-radius, it creates the tactile quality that makes cards graspable, modals clearly floating, and dropdowns feel like they've appeared on top of content.

## The Elevation Scale

Define a small set of elevation levels as tokens. Each level maps to a specific UI role.

| Level | Token | Shadow | Role |
|---|---|---|---|
| 0 | `--shadow-none` | none | Flat surface, inline elements |
| 1 | `--shadow-xs` | `0 1px 2px rgba(0,0,0,0.06)` | Subtle card, table row hover |
| 2 | `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)` | Card, input focus ring area |
| 3 | `--shadow-md` | `0 4px 6px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06)` | Dropdown, popover |
| 4 | `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.05)` | Modal, dialog, side drawer |
| 5 | `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.08), 0 8px 10px rgba(0,0,0,0.04)` | Command palette, full-screen overlay |

Keep shadows subtle. Dark, heavy shadows feel dated and visually aggressive. Light, diffuse shadows feel modern and material.

## Pairing Elevation with Border-Radius

Border-radius and shadow work together to define the character of a surface. The combination signals the element's role and the product's visual tone.

| Surface | Shadow | Border-Radius | Tone |
|---|---|---|---|
| Inline chip / tag | none | `--radius-full` (pill) | Flat, lightweight |
| Card | `--shadow-sm` | `--radius-md` (8–12px) | Graspable, contained |
| Dropdown / popover | `--shadow-md` | `--radius-md` (8px) | Floating, contextual |
| Modal / dialog | `--shadow-lg` | `--radius-lg` (12–16px) | Prominent, focused |
| Toast / notification | `--shadow-md` | `--radius-md` | Ephemeral, above content |
| Button | none or `--shadow-xs` | **consistent across all buttons** — see below |

## Border-Radius Consistency Rule

**Button border-radius must not vary within a product.** All buttons — primary, secondary, destructive, ghost — use the same radius token. Varying radius between button types breaks visual consistency and implies a semantic difference that does not exist.

```css
/* Correct: one radius for all buttons */
.btn { border-radius: var(--radius-button); }

/* Wrong: different radii for different button variants */
.btn-primary { border-radius: 8px; }
.btn-secondary { border-radius: 4px; }  /* ← breaks consistency */
```

The button radius token is a brand decision — set it once, apply it everywhere.

## Dark Mode Shadows

Shadows are less visible on dark backgrounds. On dark surfaces, compensate with:
- Slightly higher opacity on shadow values
- Adding a subtle border (`1px solid rgba(255,255,255,0.08)`) to define card edges
- Increasing the elevation level by one step for the same perceived depth

## Review Checklist

- [ ] Is there a defined elevation scale as design tokens (not one-off shadow values per component)?
- [ ] Does each elevated element use the correct level for its role (card ≠ modal)?
- [ ] Are all buttons using the same border-radius token regardless of variant?
- [ ] Do shadows feel subtle and diffuse rather than heavy and dark?
- [ ] On dark surfaces, are card/panel edges visible through border or adjusted shadow?
- [ ] Is elevation used to communicate layering — not just decoration?

## Common Anti-Patterns

| Anti-pattern | Problem | Fix |
|---|---|---|
| Different border-radius on primary vs secondary buttons | Implies semantic difference that doesn't exist | Single `--radius-button` token for all buttons |
| Heavy `box-shadow: 0 8px 16px rgba(0,0,0,0.4)` | Feels dated and visually aggressive | Use low-opacity, multi-layer diffuse shadows |
| Shadow on every element regardless of role | Elevation loses meaning when everything is elevated | Reserve shadow for genuinely floating elements |
| Flat cards with no elevation on a white background | Card edge disappears into the page | Use `--shadow-sm` or a `1px` border to define the card boundary |
