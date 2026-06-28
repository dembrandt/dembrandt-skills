---
name: component-family-consistency
description: Buttons, inputs, pills, badges, calendars, and other interactive components form a visual family — they share the same border-radius, colour logic, shadow scale, border style, and spacing rhythm. Inconsistency between them breaks the sense of a coherent product. Use when building or reviewing a component library, design system, or any set of UI components.
metadata:
  priority: 8
  pathPatterns:
    - "components/**"
    - "src/components/**"
    - "**/*.tsx"
    - "**/*.jsx"
    - "**/tokens/**"
    - "**/theme/**"
    - "design-system/**"
    - "tailwind.config.*"
  promptSignals:
    phrases:
      - "component library"
      - "design system"
      - "button"
      - "input"
      - "form"
      - "badge"
      - "pill"
      - "consistent components"
      - "component family"
retrieval:
  aliases:
    - component family
    - design system consistency
    - component tokens
    - visual consistency
    - form components
    - ui components
  intents:
    - make components look consistent
    - build a component library
    - review design system consistency
    - align button and input styles
    - create visual cohesion
  examples:
    - my buttons and inputs look like they are from different products
    - make all form components consistent
    - review this component library for visual consistency
---

# Component Family Consistency

Every interactive component in a product — buttons, inputs, selects, checkboxes, radio buttons, pills, badges, tags, calendars, date pickers, sliders, toggles — belongs to the same visual family. They share a common design DNA. A user should be able to look at any component and feel that it belongs to the same product as every other component.

When components are designed in isolation without shared tokens, the product feels assembled from parts rather than built as a whole.

## The Shared DNA

Define these tokens once. Every component inherits from them.

### Border-Radius
All interactive components use the same base radius token. Variations are derived, not invented.

```css
--radius-base:    8px;   /* buttons, inputs, selects */
--radius-sm:      4px;   /* checkboxes, small badges */
--radius-lg:      12px;  /* cards, modals, large panels */
--radius-full:    9999px; /* pills, tags, avatar chips */
```

A button and an input on the same form must have the same radius. A pill is always `--radius-full`. A badge is `--radius-sm` or `--radius-full` depending on brand tone — but consistent across all badges.

### Border Style

Borders across all form components and containers should use a highly restricted set of tokens.

**The 2-Step Rule:** Limit border widths to at most two options (e.g., `1px` and `4px`, or `1px` and `8px`). Do not use an incremental scale like `1px, 2px, 3px, 4px...`. A limited choice makes the hierarchy clear and the product feel intentional.

```css
--border-width-thin:   1px;   /* Default for inputs, cards, dividers */
--border-width-thick:  4px;   /* Featured items, bold accents, active indicators */

--border-color:        var(--color-border);
--border-color-focus:  var(--color-primary);
--border-color-error:  var(--color-error);
```

An input border and a select border are identical at rest. Focus state uses `--border-color-focus` everywhere. Error state uses `--border-color-error` everywhere.

### Spacing and Height
Components at the same visual scale share height and internal padding.

```css
/* Default (md) size */
--component-height-md:    40px;
--component-padding-x-md: 12px;
--component-padding-y-md: 8px;

/* Small */
--component-height-sm:    32px;
--component-padding-x-sm: 8px;
--component-padding-y-sm: 6px;

/* Large */
--component-height-lg:    48px;
--component-padding-x-lg: 16px;
--component-padding-y-lg: 10px;
```

A button and an input placed next to each other must be the same height. This is not cosmetic — mismatched heights break form layouts and signal disorder.

### Shadow
Interactive components use a consistent shadow logic:

- At rest: no shadow, or `--shadow-xs` for floating components (select dropdown trigger)
- On focus: focus ring via `outline`, not `box-shadow` (unless using `box-shadow` as the focus ring consistently)
- Elevated (dropdowns, popovers opening from components): `--shadow-md`

### Colour Logic
The same colour roles apply uniformly across all components:

| State | Colour token |
|---|---|
| Rest border | `--color-border` |
| Focus border / ring | `--color-primary` |
| Error border | `--color-error` |
| Disabled | `--color-text-secondary` at reduced opacity |
| Selected / active fill | `--color-primary` |
| Hover background | `--color-primary` at 8–12% opacity |

## Component Family Members

| Component | Shares radius | Shares height | Shares border | Shares colour logic |
|---|---|---|---|---|
| Button | ✓ | ✓ | — (filled) | ✓ |
| Input / textarea | ✓ | ✓ | ✓ | ✓ |
| Select | ✓ | ✓ | ✓ | ✓ |
| Checkbox | `--radius-sm` | — | ✓ | ✓ |
| Radio | `--radius-full` | — | ✓ | ✓ |
| Toggle / switch | `--radius-full` | ✓ | — | ✓ |
| Pill / tag | `--radius-full` | ✓ | ✓ optional | ✓ |
| Badge | `--radius-sm` or `--radius-full` | — | — | ✓ |
| Date picker / calendar | `--radius-base` | ✓ | ✓ | ✓ |
| Slider | `--radius-full` (track + thumb) | — | — | ✓ |
| Search input | ✓ | ✓ | ✓ | ✓ |
| Combobox | ✓ | ✓ | ✓ | ✓ |

## Semantic Chip Components

Generic `Badge` components lead to misuse — the same component ends up used for statuses, code tokens, keyboard shortcuts, and categorical labels, with style overrides scattered across the codebase.

**The pattern: one component per meaning, not one component with many variants.**

A product's inline labels typically fall into a small set of distinct meanings. Define a component for each one. Common examples:

| Component | Meaning | Shape |
|---|---|---|
| `Tag` | Categorical label, status, filter | Pill (`rounded-full`) |
| `Code` | Inline literal, path, key | `<code>`, mono, tight radius |
| `Kbd` | Keyboard shortcut | `<kbd>`, mono, tight radius |
| `Metric` | Measured value (`1.2s`, `42px`) | Mono, tight radius |

Add product-specific types as needed (e.g. `Flag` for CLI products, `Token` for API products). Each new type gets its own component — not a new `variant` prop on an existing one.

Each component encodes exactly one meaning. Appearance follows from it — callers never pass colour or shape props.

**Sizing:** use `em`-relative padding so a chip renders at the right size for whatever text context it sits in (heading, body, caption) without per-context overrides.

```tsx
const BASE = "inline-flex items-center align-middle whitespace-nowrap border leading-none";
const PILL = "text-[0.85em] px-[0.6em] py-[0.25em] rounded-full font-medium";
const CHIP = "text-[0.85em] px-[0.5em] py-[0.2em] rounded-[0.4em] font-mono";

export function Tag({ children }: { children: ReactNode }) {
  return <span className={`chip-tag ${BASE} ${PILL}`}>{children}</span>;
}
export function Code({ children }: { children: ReactNode }) {
  return <code className={`chip-code ${BASE} ${CHIP}`}>{children}</code>;
}
export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className={`chip-kbd ${BASE} ${CHIP}`}>{children}</kbd>;
}
```

**Colour:** keep per-semantic colours in CSS classes (`chip-tag`, `chip-code`, etc.) in one file. Do not inline colour props. This keeps light/dark mode in one place and lets you audit the full chip palette at a glance.

```css
.chip-tag, .chip-code, .chip-kbd, .chip-metric {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.09);
  color: var(--text-secondary);
}
.chip-tag { color: var(--text-primary); }
```

**Back-compat:** if existing call sites use a generic `Badge`, re-export the most common semantic variant as the default so old imports keep working without a migration.

---

## Alignment on a Line

When a line mixes element types — label, badge, status dot, value, icon — they must read as one aligned row, not a jumble of differently-sized pieces.

- **Same type size on the line.** Text next to a badge or chip shares the surrounding typeface size; a badge must not silently shrink or enlarge its row. Use `leading-none` and `align-middle` (as in the chip `BASE` above) so every element sits on a shared centre line.
- **Centre status indicators.** A traffic-light dot (red/amber/green) is **vertically centred against the text it annotates** — aligned to the label's cap-height centre, not the baseline.
- **One optical centre line.** If badges, text, and icons jump up and down, the row reads as broken even when each piece is fine alone.

## Small Component Restraint

The smaller the component, the less it can carry. Restraint that looks plain at large sizes is what keeps small components legible.

- **Avoid multi-border / boxed-in containers.** Don't stack bordered layers (a bordered chip inside a bordered cell inside a bordered card) — a small element can't absorb the weight. Prefer one border or none; use fill or spacing instead. The small-scale companion to the 2-Step border rule.
- **At most one icon.** Two or three icons in a pill, badge, or row create clutter and ambiguity about which is actionable. If you need more, the component has outgrown its size — promote it to a larger pattern.
- **Multi-card-container design → pivot.** Card-in-card-in-card nesting solves grouping with boxes instead of spacing and hierarchy. Flatten it, group with whitespace and headings (see [[gestalt-ui-organisation]]), and keep the card metaphor for the outermost meaningful container only.

If the brand uses gradients, apply them consistently:

- A gradient on a primary button should use the same gradient angle and stops as gradient usage elsewhere in the product
- Hover state: slightly shift the gradient lightness, not the hue
- Do not use gradients on some button variants and flat colour on others — pick one approach per variant and apply it universally

## Review Checklist

- [ ] Do buttons and inputs on the same form share the same height?
- [ ] Do all bordered components use at most two border-width options (e.g., 1px and 4px)?
- [ ] Does focus state look identical across all focusable components?
- [ ] Does error state look identical across all components that can have errors?
- [ ] Are all radius values derived from the same base token — not set independently per component?
- [ ] Do pills and tags use `--radius-full` consistently?
- [ ] Is gradient usage (if any) consistent across all button variants?
- [ ] Could a new component be added to the library using only existing tokens?
- [ ] Are inline labels, statuses, code tokens, keyboard hints, and metrics separate components — not variants of a generic Badge?
- [ ] Do chip/badge components use `em`-relative sizing so they scale with their text context?
- [ ] Is chip colour defined in CSS classes (not inline props) so light/dark lives in one place?
- [ ] On rows mixing text, badges, and icons, does everything share one type size and centre line?
- [ ] Are status/traffic-light indicators vertically centred against their label?
- [ ] Do small components avoid stacked/nested borders (boxed-in look)?
- [ ] Do small components carry at most one icon?
- [ ] Has card-in-card-in-card nesting been flattened in favour of spacing and hierarchy?
