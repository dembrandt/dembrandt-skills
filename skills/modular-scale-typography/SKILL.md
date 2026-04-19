---
name: modular-scale-typography
description: Typography feels cohesive and intentional when font sizes follow a modular scale — a ratio-based sequence where every size is mathematically related to the others. Use when defining type scales, setting up design tokens, reviewing font size choices, or when typography feels inconsistent or arbitrary.
metadata:
  priority: 7
  docs:
    - "https://typescale.com"
    - "https://www.modularscale.com"
  pathPatterns:
    - "**/*.css"
    - "**/*.scss"
    - "**/*.tokens.json"
    - "**/tokens/**"
    - "**/typography/**"
    - "**/theme/**"
    - "tailwind.config.*"
    - "design-system/**"
  promptSignals:
    phrases:
      - "modular scale"
      - "type scale"
      - "font sizes"
      - "typography tokens"
      - "heading sizes"
      - "typographic hierarchy"
      - "text feels inconsistent"
retrieval:
  aliases:
    - modular scale
    - type scale
    - typographic rhythm
    - font size tokens
    - visual harmony typography
  intents:
    - define font sizes
    - make typography feel cohesive
    - set up type tokens
    - fix inconsistent font sizes
    - create typographic hierarchy
  examples:
    - my font sizes feel random, fix them
    - set up a modular scale for this design system
    - which ratio should I use for my type scale
---

# Modular Scale Typography

Typography feels cohesive when all font sizes are related to each other through a single mathematical ratio. Without a scale, sizes get picked arbitrarily and the result feels visually noisy — headings that don't contrast enough, body text too close in size to captions, labels that blend into content.

## What Is a Modular Scale

A modular scale starts from a **base size** and multiplies or divides by a **ratio** to generate every size in the system.

```
size(n) = base × ratio^n
```

Every size is thus a deliberate step away from the base — not a guess.

## Choosing a Ratio

| Ratio | Name | Feel | Good for |
|---|---|---|---|
| 1.067 | Minor Second | Very tight | Dense data UIs, dashboards |
| 1.125 | Major Second | Subtle | Long-form reading, editorial |
| 1.200 | Minor Third | Balanced | Most UI applications |
| 1.250 | Major Third | Clear hierarchy | Marketing, landing pages |
| 1.333 | Perfect Fourth | Strong contrast | Display, hero sections |
| 1.414 | Augmented Fourth | Dramatic | Portfolios, branding |
| 1.500 | Perfect Fifth | Very dramatic | Use sparingly |

**Default recommendation:** `1.25` (Major Third) — enough contrast between steps to feel intentional without being theatrical.

## Generating a Scale

Starting from `base = 16px`, ratio `1.25`:

| Step | Formula | Value | Rounded | Role |
|---|---|---|---|---|
| -2 | 16 ÷ 1.25² | 10.24px | 10px | Caption, label-xs |
| -1 | 16 ÷ 1.25 | 12.80px | 13px | Label, small |
| 0 | 16 | 16px | 16px | Body (base) |
| +1 | 16 × 1.25 | 20px | 20px | Body-lg, lead |
| +2 | 16 × 1.25² | 25px | 25px | H4 |
| +3 | 16 × 1.25³ | 31.25px | 31px | H3 |
| +4 | 16 × 1.25⁴ | 39.06px | 39px | H2 |
| +5 | 16 × 1.25⁵ | 48.83px | 49px | H1 |
| +6 | 16 × 1.25⁶ | 61.04px | 61px | Display |

Round to whole pixels or rem — the ratio provides the intent, exact pixel rounding is fine.

## Design Tokens (CSS custom properties)

```css
:root {
  --text-xs:   0.625rem;  /* 10px  — caption */
  --text-sm:   0.813rem;  /* 13px  — label   */
  --text-base: 1rem;      /* 16px  — body    */
  --text-lg:   1.25rem;   /* 20px  — lead    */
  --text-xl:   1.563rem;  /* 25px  — h4      */
  --text-2xl:  1.938rem;  /* 31px  — h3      */
  --text-3xl:  2.438rem;  /* 39px  — h2      */
  --text-4xl:  3.063rem;  /* 49px  — h1      */
  --text-5xl:  3.813rem;  /* 61px  — display */
}
```

## Tailwind Config

```js
// tailwind.config.js
fontSize: {
  'xs':   ['0.625rem', { lineHeight: '1rem' }],
  'sm':   ['0.813rem', { lineHeight: '1.25rem' }],
  'base': ['1rem',     { lineHeight: '1.5rem' }],
  'lg':   ['1.25rem',  { lineHeight: '1.75rem' }],
  'xl':   ['1.563rem', { lineHeight: '2rem' }],
  '2xl':  ['1.938rem', { lineHeight: '2.25rem' }],
  '3xl':  ['2.438rem', { lineHeight: '2.5rem' }],
  '4xl':  ['3.063rem', { lineHeight: '1.1' }],
  '5xl':  ['3.813rem', { lineHeight: '1' }],
}
```

## Why This Makes Typography Feel Cohesive

Without a scale, designers and developers pick sizes by eye or habit (`14px`, `16px`, `18px`, `24px`, `32px`, `48px`). These feel subtly wrong because the intervals are uneven — the jump from 14→16 is small, 32→48 is large, and there is no underlying logic tying them together. The eye senses the inconsistency even when the viewer cannot name it.

With a modular scale, every size step carries the same visual weight of change. Hierarchy reads clearly because each level is a proportional step away from the next, not an arbitrary gap.

## Minimum Font Size

**Body text base: 16px minimum.** This is the browser default for good reason — it is the threshold below which reading comfort drops significantly, especially on screens.

- **16px** — standard body text, the default base
- **14px** — acceptable for secondary UI text (labels, captions, metadata) used sparingly
- **Below 14px** — do not use. Even at high DPI, sub-14px text fails WCAG contrast requirements for normal text and creates accessibility issues.

In the modular scale, this means the base (`step 0`) should be 16px, and negative steps (step -1, step -2) should be used only for genuinely secondary content — never for body copy or primary labels.

## Type Scale by Page Context

**Landing pages and marketing surfaces** benefit from large, expressive type — steps +4 to +6 for headlines create drama and brand presence.

**Feature pages and application UI** should use a more controlled range — steps +2 to +3 for headings, with body text at step 0. Oversized headings inside a functional UI distract from the content and make the layout feel unbalanced.

Match the ratio and scale usage to the purpose of the surface, not just the brand.

## Review Checklist

- [ ] Are all font sizes derived from a single base + ratio?
- [ ] Is the base size 16px or larger?
- [ ] Is 14px used only for secondary/metadata text, never for body copy?
- [ ] Is nothing below 14px used anywhere in the UI?
- [ ] Is there at least 3–4 distinct steps between body text and the largest heading?
- [ ] Are adjacent steps (e.g. body vs. label) different enough to be distinguishable at a glance?
- [ ] Are font size tokens named by role (`--text-body`, `--text-h1`) or step (`--text-base`, `--text-2xl`), not by raw pixel value?
- [ ] Does the chosen ratio suit the UI density? (tight ratio for data-heavy UIs, wider ratio for marketing)

## Common Anti-Patterns

| Anti-pattern | Problem | Fix |
|---|---|---|
| Sizes like 14, 15, 16, 17px used side by side | Steps too small to read as distinct levels | Use at minimum a 1.125 ratio so each step is perceptible |
| Arbitrary sizes with no relationship (13, 18, 27, 36px) | No underlying logic — hierarchy feels accidental | Regenerate from a single base and ratio |
| Pixel values hard-coded in components instead of tokens | Scale changes require hunting through every file | Define once as CSS custom properties or design tokens |
| Same scale used for display headings and dense data tables | One ratio rarely serves both extremes well | Use a tighter ratio (1.125) for data, wider (1.25–1.333) for marketing contexts |
