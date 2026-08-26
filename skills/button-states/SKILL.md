---
name: button-states
description: Every interactive element needs a complete set of visual states — rest, hover, active/pressed, focus, disabled, and loading. States should be derived algorithmically from the base colour, not chosen arbitrarily. Use when designing buttons, links, inputs, or any clickable component.
metadata:
  priority: 8
  pathPatterns:
    - "components/**"
    - "src/components/**"
    - "**/*.css"
    - "**/*.scss"
    - "**/tokens/**"
    - "**/*.tsx"
    - "**/*.jsx"
    - "design-system/**"
  promptSignals:
    phrases:
      - "hover state"
      - "active state"
      - "focus state"
      - "disabled"
      - "button states"
      - "interactive states"
      - "loading state"
      - "pressed"
retrieval:
  aliases:
    - button states
    - hover state
    - interactive states
    - focus ring
    - disabled state
    - loading button
  intents:
    - design button states
    - add hover and active states
    - style focus ring
    - handle disabled state
    - add loading state to button
  examples:
    - what colour should the hover state be
    - design all states for this button
    - how do I show a loading state on a button
    - make the focus ring visible
---

# Button and Interactive Element States

Every interactive component must have a complete, visually distinct state for each interaction mode. Missing or ambiguous states make the UI feel unfinished and reduce user confidence.

## The Six States

| State | Trigger | Visual signal |
|---|---|---|
| **Rest** | Default | Base colour, cursor: pointer |
| **Hover** | Mouse over | Slightly darker, subtle background shift |
| **Active / Pressed** | Mouse down / tap | Noticeably darker, slight scale-down |
| **Focus** | Keyboard navigation | Visible focus ring, no change to fill |
| **Disabled** | Not available | Low contrast, cursor: not-allowed, no interaction |
| **Loading** | Async action in progress | Spinner or pulse, non-interactive |

## Deriving State Colours Algorithmically

State colours are not chosen independently — they are derived from the base colour by adjusting lightness in HSL. This guarantees coherence across the entire palette.

```
base:     hsl(H, S%, L%)
hover:    hsl(H, S%, L% - 8%)    ← darken 8%
active:   hsl(H, S%, L% - 14%)   ← darken 14%
```

### Example: primary button `#635BFF` (hsl 243, 100%, 68%)

```css
.btn-primary {
  background: hsl(243, 100%, 68%);       /* rest    #635BFF */
}
.btn-primary:hover {
  background: hsl(243, 100%, 60%);       /* hover   #4A40FF */
}
.btn-primary:active {
  background: hsl(243, 100%, 54%);       /* active  #3429FF */
}
```

For light buttons on dark backgrounds, invert the logic — lighten on hover instead of darkening.

### Secondary / outlined buttons

```css
.btn-secondary {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
}
.btn-secondary:hover {
  background: var(--color-grey-100);     /* subtle fill */
  border-color: var(--color-grey-300);
}
.btn-secondary:active {
  background: var(--color-grey-200);
}
```

## When the Element Cannot React: Answer Outside It

Some things a pointer lands on are not free to change. A cell in a grid is the
grid: round its corners on hover and the lattice moves, thicken its border and
every neighbour looks misaligned, tint its fill and the surface it belongs to
develops a hole. The usual hover kit is unavailable, and the usual mistake is to
use it anyway and accept the wobble.

The answer is to put the response **outside** the shape.

Draw a ring around it: offset by a few pixels, in the accent colour, at a
one-pixel weight. The element itself does not move, does not change shape, does
not change colour. Nothing in the layout shifts, because the ring occupies space
that was already empty.

Two things follow from this, and they are the point:

- **The radius belongs to the ring, not to the element.** A square cell can carry
  a rounded halo without becoming a rounded cell. Where a shape is structural,
  its corners are load-bearing and the decoration around it is not.
- **The ring can animate where the element cannot.** A slow opacity pulse on
  something that occupies empty space costs nothing and disturbs nothing. Put
  the same pulse on the element and it reads as an error state, because a
  structural shape that breathes is a shape that is malfunctioning.

Pace it in seconds, not milliseconds. Two seconds reads as alive, four as
waiting; anything under one reads as a blink and pulls the eye off whatever the
person was actually looking at.

Applies to: cells in a grid or table, tiles on a map, segments of a chart, nodes
in a diagram, and any element whose geometry other elements are aligned to.

## Focus State

Focus is a keyboard navigation requirement (WCAG 2.2). It must be visible and must not rely on the hover style alone — keyboard users do not trigger hover.

```css
.btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}
```

- Use `outline`, not `box-shadow`, for focus rings — `outline` respects `border-radius` in modern browsers and does not affect layout
- `outline-offset: 2–4px` gives the ring breathing room from the component edge
- Never use `outline: none` without a replacement focus style

## Disabled State

```css
.btn:disabled,
.btn[aria-disabled="true"] {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
```

- Disabled elements are exempt from WCAG contrast requirements — low opacity is correct and intentional
- Use `pointer-events: none` to prevent click events even if JS is bypassed
- Do not change the shape or size of a disabled button — only colour and cursor change

## Loading State

When a button triggers an async action, replace the label with a spinner and prevent re-submission.

```css
.btn--loading {
  pointer-events: none;
  cursor: wait;
  opacity: 0.7;
}
```

- Keep the button width stable during loading — avoid layout shift when label is replaced by spinner
- Return to rest state on completion (success or error)
- For long-running operations, pair with a status message — a spinner alone does not tell the user what is happening

## Scale on Active (Optional)

A subtle scale-down on press adds physical feedback — borrowed from Disney's squash principle.

```css
.btn:active {
  transform: scale(0.97);
  transition: transform 80ms ease-out;
}
```

Keep the scale value between `0.95–0.98`. Below `0.95` feels like the button is breaking.

## Complete Button CSS Reference

```css
.btn {
  cursor: pointer;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-button);
  padding: var(--component-padding-y-md) var(--component-padding-x-md);
  height: var(--component-height-md);
  border: none;
  transition: background 120ms ease-out, transform 80ms ease-out;
}

.btn:hover           { background: var(--color-primary-hover); }
.btn:active          { background: var(--color-primary-active); transform: scale(0.97); }
.btn:focus-visible   { outline: 2px solid var(--color-primary); outline-offset: 3px; }
.btn:disabled        { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
.btn.btn--loading    { opacity: 0.7; cursor: wait; pointer-events: none; }
```

## Review Checklist

- [ ] Where the element's own geometry is structural, does hover answer with a ring outside it rather than by changing the element?
- [ ] Does any hover or waiting pulse run in seconds rather than milliseconds, and stop under `prefers-reduced-motion`?
- [ ] Does every interactive element have all six states defined?
- [ ] Are hover and active colours derived from the base by lightness adjustment (not chosen arbitrarily)?
- [ ] Is focus state visible and using `outline` (not removed)?
- [ ] Is disabled state low-opacity with `cursor: not-allowed`?
- [ ] Does loading state prevent re-submission?
- [ ] Are transition durations 80–150ms — not instant, not slow?
- [ ] Does `cursor: pointer` appear on all interactive elements at rest?
