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
    - tell buttons and badges apart visually
  examples:
    - my buttons and inputs look like they are from different products
    - my badges look clickable but they are not buttons
    - make all form components consistent
    - review this component library for visual consistency
---

# Component Family Consistency

Every interactive component in a product — buttons, inputs, selects, checkboxes, radio buttons, pills, badges, tags, calendars, date pickers, sliders, toggles — belongs to the same visual family. They share a common design DNA. A user should be able to look at any component and feel that it belongs to the same product as every other component.

When components are designed in isolation without shared tokens, the product feels assembled from parts rather than built as a whole.

## Reuse Before You Build a New Component

Before creating any component, **audit what already exists** — a new-from-scratch component is another mouth to feed: another entry in the family that must stay consistent (radius, height, states, motion) and another thing to maintain. Building fresh should be the last resort, not the first move. Work down this order:

1. **Is there already a component that does this?** Use it as-is. If it *almost* fits, extend it with a prop or variant rather than cloning it — one flexible `Button` beats `PrimaryButton`, `BigButton`, and `CtaButton` living in parallel.
2. **Is there something close in the codebase you can generalise?** Often a one-off was built inline for a single screen. If a small change would make it generic — lift it into the shared library, parameterise the hard-coded bits (label, colour, size via props/tokens), drop the screen-specific assumptions — do that instead of writing a second near-identical thing.
3. **Only build new when nothing existing fits and nothing can be reasonably generalised** — and when you do, build it *from the shared DNA below* so it joins the family cleanly.

Parallel one-offs — three near-identical buttons, two cards with different radius — are how a design system drifts. Before adding a component, ask: *does this exist, or is it one refactor from existing?*

The inverse also holds: a visual treatment that appears independently in 2–3 places has earned promotion — name it and make it a shared component or token before a fourth copy appears. And when pages from different design eras disagree, migrate old toward new: the newest components are the best evidence of current intent, but confirm before deprecating a style — see [`generate-ui-from-brand`](../generate-ui-from-brand/SKILL.md) for the consolidation pass.

> **Find the inconsistency automatically (dembrandt engine, optional).** Spotting where a live product has already diverged — five near-identical button radii, three greys that should be one — is tedious by eye. `get_findings` runs a design-system lint over a real extraction and reports consistency and duplication issues to consolidate. (And `compute_drift` scores how far two extractions have drifted apart — e.g. this product vs. its reference, or before vs. after a cleanup.) Use them to audit an existing product before deciding what to reuse. See [`extract-design`](../extract-design/SKILL.md).

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

### One Interaction Language
The colour table above defines *what* each state looks like; this rule governs *how many* interaction patterns a product is allowed to have. **Pick one and reuse it — don't run 3–4 different hover/active/interaction patterns within the same product.**

The user already knows what site they're on. Variety *between* products is expected; variety *within* one is taxing — every new pattern is another thing to learn mid-task. So converge:

- **One hover response.** If interactive elements lift on hover, they all lift; if they shift background tint, they all shift tint. Don't mix lift, underline, colour-swap, and scale across sibling components.
- **One active/pressed response,** one focus ring, one selected treatment — applied identically everywhere (this is why the colour roles above are shared tokens, not per-component choices).
- **One motion signature** — the same easing and duration for the same *kind* of transition, so hovers, reveals, and toggles feel like one hand made them (see `micro-interactions`).

A tight, repeated interaction vocabulary is what makes a product feel learnable: the user learns the pattern once and trusts it everywhere.

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

## Family Resemblance, Distinct Roles

Shared DNA makes components look *related* — it must not make them look *interchangeable*. The riskiest pairs are the ones that share the most: a pill-shaped button next to a pill-shaped badge, a bordered button next to a bordered input. When they blur, users click badges that do nothing and skip buttons that looked like labels.

The rule: **role must be readable before interaction.** From appearance alone, the user can tell what is clickable, what is editable, and what is read-only.

- **Button** — clickable: solid fill or a firm border, `cursor: pointer`, a hover response.
- **Badge / tag** — read-only: muted fill, smaller type, **no hover response and no pointer cursor, ever** — those two signals are reserved for interactive elements and are exactly what separates a badge from a button of the same shape.
- **Input** — editable: border with an empty interior, placeholder, text cursor.

Distinguish through at least two visual channels (fill + size, border + cursor) — never by colour alone. Squint test: with labels unreadable, can you still sort the buttons from the badges from the inputs? If not, the family has collapsed into one component.

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
- [ ] Is there a single interaction language — one hover response, one active/pressed response, one focus ring, one motion signature — reused across the product, rather than 3–4 competing patterns?
- [ ] Are all radius values derived from the same base token — not set independently per component?
- [ ] Do pills and tags use `--radius-full` consistently?
- [ ] Can a button, badge, and input be told apart from appearance alone (squint test) — with non-interactive elements carrying no hover response or pointer cursor?
- [ ] Is gradient usage (if any) consistent across all button variants?
- [ ] Before building a new component, was the existing library (and codebase) checked for one that fits as-is, or a one-off that could be generalised with a small change, rather than cloning?
- [ ] Could a new component be added to the library using only existing tokens?
- [ ] Are inline labels, statuses, code tokens, keyboard hints, and metrics separate components — not variants of a generic Badge?
- [ ] Do chip/badge components use `em`-relative sizing so they scale with their text context?
- [ ] Is chip colour defined in CSS classes (not inline props) so light/dark lives in one place?
- [ ] On rows mixing text, badges, and icons, does everything share one type size and centre line?
- [ ] Are status/traffic-light indicators vertically centred against their label?
- [ ] Do small components avoid stacked/nested borders (boxed-in look)?
- [ ] Do small components carry at most one icon?
- [ ] Has card-in-card-in-card nesting been flattened in favour of spacing and hierarchy?
