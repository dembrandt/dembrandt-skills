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

**The 1% heuristic.** Sub-16px text is the rare exception (target: under ~1% of a page, never below 14px). Nobody counts characters, so apply it as a role test:

- **May go below 16px** — a fixed whitelist of glanced-at roles: timestamps, captions, table metadata, helper text, fine print, badge labels.
- **Never** — body copy, primary labels, list item titles, anything actually read to do the task.

Check: scan one screen, count distinct sub-16px roles. Two or three from the whitelist is healthy; five or more — or any reading content — means you've over-shrunk. That's layout density, not a type problem: cut what's shown rather than shrink the type to fit.

## Type Rendering Details

Size and ratio set the structure; these details determine whether the type actually reads well on screen.

### Letter Spacing
- **Body and default text:** keep tracking at `0`. Adding it to running text slows reading and makes the type feel loose.
- **Uppercase and small labels:** the one place tracking helps, since capitals are visually tight. Cap it at `0.04em`, and reach for that only when the label genuinely needs air.
- Pattern: **zero on lowercase body, at most a hair (`≤ 0.04em`) on uppercase labels** — never a blanket value. Over-tracking reads as dated, not premium.

### Weight on Dark Backgrounds
Light text on dark appears optically **thinner** — a halation effect where bright type bleeds into the dark field. Step up one weight to compensate: where regular (400) works on light, use **medium or semibold for the equivalent text on dark**. This keeps perceived weight consistent across modes instead of dark-mode text looking frail.

### Monospace
Monospace is for technical content where character alignment matters — code, IDs, numeric tables, diffs. **Don't use it as a default UI typeface, and avoid monospace + uppercase** (even widths plus tall capitals are hard to scan).

## Type Scale by Page Context

**Landing pages and marketing surfaces** benefit from large, expressive type — steps +4 to +6 for headlines create drama and brand presence.

**Feature pages and application UI** should use a more controlled range — steps +2 to +3 for headings, with body text at step 0. Oversized headings inside a functional UI distract from the content and make the layout feel unbalanced.

Match the ratio and scale usage to the purpose of the surface, not just the brand.

## Heading Hierarchy and Page Complexity

A successful heading scale uses more than just font size to distinguish levels. It also respects the cognitive limits of the page.

### Tools for Differentiation
If headings only differ by small increments of size, they become hard to distinguish at a glance. Use these tools to create a more meaningful scale:
- **Capitalization:** Use uppercase (`text-transform: uppercase`) for small, lower-level headings (H4–H5) to give them visual weight without needing large sizes.
- **Letter Spacing:** When using uppercase or bold headings, add at most a hair of `letter-spacing` (`≤ 0.04em`) — and only when the heading genuinely needs the air. Keep it subtle; over-tracking reads as dated, not premium.
- **Color:** Use your brand primary colour or a slightly muted grey for secondary headings to differentiate them from the main black/dark-grey text.
- **Style:** Use italics or subtle underlines for supplementary or metadata-style headings.

### The Rule of Three (H1–H3)
Most well-designed pages require only **three levels of heading hierarchy (H1, H2, H3)**. 
- **Simplicity:** H1–H3 is enough to cover the page title, section titles, and sub-sections.
- **Complexity Warning:** If you find yourself needing H4, H5, or H6, the content is likely too dense. Instead of adding more heading levels, consider **splitting the content across multiple pages** or using a more modular navigation structure (e.g., a sidebar or tabs).

A page that needs 6 levels of headings is a page that most users will stop reading.

## Reading Comfort and Editorial Patterns

Typography is not just about size — it is about the rhythm and structure of the content.

### Line Length (Measure)
For optimal reading comfort, keep body text between **45–75 characters per line** (approx. 500–700px).
- Lines that are too long make it hard for the eye to find the start of the next line.
- Lines that are too short break the reading rhythm and create distracting "rags."

### Measure, Leading and Size Move Together
Line length, line-height (leading) and font size are not three independent knobs — they are one system. This is a foundational typographic principle (Bringhurst's *The Elements of Typographic Style*) repeatedly validated on digital platforms, and it underpins the line-height ramps in the Material and Apple HIG type scales.

**The longer the measure, the more leading the eye needs** to track from the end of one line back to the start of the next. A tight line-height that reads fine on a narrow column becomes tiring on a wide one.

| Measure | Recommended body line-height |
|---|---|
| Narrow (~45ch) | 1.4 |
| Comfortable (55–66ch) | 1.5 |
| Wide (~75ch) | 1.6–1.7 |

Practical rules:
- **Body text:** line-height **1.4–1.7**, never below 1.4 for multi-line copy. WCAG SC 1.4.12 also requires text to stay readable when users override line-height to **at least 1.5**, so design with that headroom.
- **Headings:** large type needs *less* leading — tighten to **1.1–1.25** as size grows, or the lines drift apart and stop reading as one unit. Leading and size are inversely related.
- **Fix the cause, not the symptom:** if a line of body text feels hard to read, widen the leading *or* narrow the measure — don't just shrink the font. The three move together.

### Line Clamping
In grids, cards, or lists with unpredictable content lengths, clamp text to keep a consistent visual rhythm and equal-height cards. Limit descriptions to 2–3 lines so all cards in a row stay the same height.

**Multi-line clamp.** Pair the standard `line-clamp` with the `-webkit-` fallback — the legacy `-webkit-box` form is still required for full browser support, so keep both.
```css
.card-description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
}
```

**Single-line clamp.** For titles and labels that must never wrap, use the ellipsis pattern instead.
```css
.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

**Inside flex or grid.** Truncation silently fails when the item can't shrink below its content width. Add `min-width: 0` (or `min-inline-size: 0`) to the clamped child so it is allowed to narrow.

**Accessibility — never lose the content.** Clamping hides text *visually only*; the full string stays in the DOM and is read in full by screen readers, but a sighted user can no longer see it. Always give them a path to the rest:
- Provide a `title` attribute (or accessible tooltip) carrying the full text, or
- Link to a detail view / "Read more" where the complete content lives.

Never clamp text that the user *must* read to act (prices, errors, legal copy, primary instructions) — clamp only supporting descriptions where truncation is safe.

### Editorial Hierarchy
Use specific typographic roles to provide context and guide the user through the story:

| Role | Visual Treatment | Purpose |
|---|---|---|
| **Pre-title (Eyebrow)** | Small (12–13px), often all-caps, subtle letter-spacing (`≤ 0.04em`), muted colour | Provides context or category without distracting from the main heading |
| **Heading** | Large, bold, modular scale step +3 to +5 | The primary hook or subject |
| **Ingress (Lead text)** | Larger than body (step +1), slightly bolder or higher line-height | Summarises the core value; bridging the heading and the body copy |
| **Body** | Base size (16px), regular weight, comfortable line-height (1.5) | The primary reading experience |

### Wording and Voice
- **Use active voice.** "Get started" instead of "Getting started is easy."
- **Be punchy.** Use clear, descriptive labels that promise a result.
- **Consistency.** Use the same terms for the same actions throughout the product.

## Responsive Type Scale

The scale compresses on smaller viewports by **tightening the ratio**, not by manually overriding individual sizes. The floor (body, labels) stays stable — readability has a hard minimum. The ceiling (H1, display) shrinks significantly. Every heading level scales proportionally because the ratio changes; hierarchy stays internally coherent.

**Rule:** use a wider ratio on desktop (more drama), a tighter ratio on mobile (more restraint). The base stays the same. The top end gives way.

- Desktop → wider ratio (e.g. 1.25–1.333): large contrast between H1 and body
- Tablet → moderate ratio (e.g. 1.200): scale pulls in
- Mobile → tight ratio (e.g. 1.125): H1 is notably smaller, body is unchanged

Never shrink the scale from the bottom. Body text at 16px is already a floor — compression always comes from the top.

### Fluid Type with `clamp()`
Instead of stepping sizes at fixed breakpoints, let the top end scale smoothly between a floor and a ceiling using CSS `clamp(MIN, PREFERRED, MAX)`. The viewport-relative middle term does the scaling; the floor and ceiling stop it from ever getting too small or too large.
```css
:root {
  --text-body: 1rem;                         /* the floor stays fixed */
  --text-h1: clamp(2rem, 1.5rem + 3vw, 3.5rem);
}
```
- The `MIN` is the mobile size, the `MAX` is the desktop size — the same floor/ceiling thinking as the stepped scale, just interpolated.
- Apply `clamp()` to the **top of the scale** (headings, display). Keep body and labels at a fixed size — readability has a hard minimum, so the floor must not move.
- Include a `rem` term in the preferred value (e.g. `1.5rem + 3vw`, not `3vw` alone) so the text still responds to user zoom and root font-size — a pure `vw` value breaks zoom accessibility.

## Review Checklist

- [ ] Are all font sizes derived from a single base + ratio?
- [ ] Is the base size 16px or larger?
- [ ] Is 14px used only for secondary/metadata text, never for body copy?
- [ ] Is nothing below 14px used anywhere in the UI?
- [ ] Counting distinct sub-16px text roles on a screen, are there only a few (≤3) and all from the secondary whitelist — never reading content?
- [ ] Is body letter-spacing 0, with uppercase-label tracking capped at `0.04em` and used only when air is needed?
- [ ] Does light-on-dark text use a slightly heavier cut to compensate for halation?
- [ ] Is monospace scoped to technical content, never used as a default or with uppercase?
- [ ] Is there at least 3–4 distinct steps between body text and the largest heading?
- [ ] Are adjacent steps (e.g. body vs. label) different enough to be distinguishable at a glance?
- [ ] Are font size tokens named by role (`--text-body`, `--text-h1`) or step (`--text-base`, `--text-2xl`), not by raw pixel value?
- [ ] Does the chosen ratio suit the UI density? (tight ratio for data-heavy UIs, wider ratio for marketing)
- [ ] Is body text line length between 45–75 characters?
- [ ] Does body line-height scale with the measure (≈1.4 narrow → ≈1.6+ wide), staying ≥1.4 and leaving 1.5 override headroom for WCAG 1.4.12?
- [ ] Is heading leading tightened (≈1.1–1.25) as size grows, so large type still reads as one unit?
- [ ] Is line-clamping used to keep grid/card layouts consistent?
- [ ] Does clamped text keep a path to the full content (`title`/tooltip or detail view), and is must-read content never clamped?
- [ ] If fluid type (`clamp()`) is used, is it applied only to the top of the scale, with a `rem`-based preferred term so zoom still works?
- [ ] Are editorial roles like pre-titles and lead text used to improve scannability?
- [ ] Are headings differentiated by more than just size (e.g., color, case, spacing)?
- [ ] Is the heading hierarchy limited to H1–H3 per view where possible?

## Common Anti-Patterns

| Anti-pattern | Problem | Fix |
|---|---|---|
| Sizes like 14, 15, 16, 17px used side by side | Steps too small to read as distinct levels | Use at minimum a 1.125 ratio so each step is perceptible |
| Arbitrary sizes with no relationship (13, 18, 27, 36px) | No underlying logic — hierarchy feels accidental | Regenerate from a single base and ratio |
| Pixel values hard-coded in components instead of tokens | Scale changes require hunting through every file | Define once as CSS custom properties or design tokens |
| Same scale used for display headings and dense data tables | One ratio rarely serves both extremes well | Use a tighter ratio (1.125) for data, wider (1.25–1.333) for marketing contexts |
| Letter-spacing added to running body text | Loosens the type and slows reading | Keep body tracking at 0; add at most `0.04em` to uppercase labels when air is needed |
| Regular-weight white text on a dark background | Halation makes it look thin and frail | Step up one weight (medium/semibold) for light-on-dark text |
| Monospace as a default UI font, or monospace + uppercase | Hard to scan, reads as "unstyled" | Scope monospace to code/IDs/numeric data only |
