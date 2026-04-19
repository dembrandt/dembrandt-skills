---
name: visual-emphasis-and-hierarchy
description: The most important actions and content in a UI should be visually prominent — through size, colour, weight, and position. Visual hierarchy guides the user's eye to what matters most and signals which action is primary. Use when designing button groups, CTAs, dashboards, cards, or any layout where actions or content have different importance levels.
metadata:
  priority: 8
  pathPatterns:
    - "components/**"
    - "src/components/**"
    - "**/*.tsx"
    - "**/*.jsx"
    - "design-system/**"
    - "ui/**"
    - "tailwind.config.*"
  promptSignals:
    phrases:
      - "primary button"
      - "call to action"
      - "visual hierarchy"
      - "emphasis"
      - "most important"
      - "highlight"
      - "prominent"
      - "CTA"
retrieval:
  aliases:
    - visual hierarchy
    - emphasis
    - primary action
    - CTA design
    - button hierarchy
    - content priority
  intents:
    - make the primary action stand out
    - design button hierarchy
    - guide user attention
    - emphasise key content
    - reduce visual noise
  examples:
    - make it obvious what the user should click
    - design the button group for this form
    - highlight the most important feature on this page
---

# Visual Emphasis and Hierarchy

Every screen has a most-important thing. Visual hierarchy is the design work that makes sure the user's eye finds it first — without requiring the user to read everything and decide for themselves.

Emphasis is achieved through **size**, **colour**, **weight**, **contrast**, and **position**. These tools work because they are relative: an element looks important because it differs from what surrounds it.

## The Hierarchy Ladder

Design every action group and content area with a clear hierarchy:

| Level | Role | Visual treatment |
|---|---|---|
| **Primary** | The one action the user should most likely take | Filled, brand colour, largest button in the group |
| **Secondary** | An alternative action of moderate importance | Outlined or ghost, neutral colour, same or slightly smaller size |
| **Tertiary** | Rarely needed, destructive, or low-priority | Text link or subtle ghost, smaller, visually recessive |
| **Disabled** | Unavailable | Low contrast, no hover state — signals "not yet" |

There should be **at most one primary action per view** or per logical section. Two filled buttons side by side cancel each other out — both feel equally important, so neither guides the user.

## Size as Emphasis

A larger button, heading, or element draws the eye before a smaller one. Use size deliberately:

- The primary CTA is the largest interactive element in its group
- Page headings are larger than section headings, which are larger than labels
- A featured product, plan, or option can be physically larger than its peers to signal recommendation

Size differences must be perceptible — a 2px difference reads as inconsistency, not hierarchy. Use your modular scale for type; use meaningful size steps for components.

## Colour as Emphasis

Colour is the strongest emphasis signal and therefore the most easily overused.

- **One brand colour for primary actions** — used sparingly so it retains its signal
- Secondary and tertiary actions should be neutral (grey, outlined) so the primary colour stands out
- Avoid using brand colour on large background areas and buttons simultaneously — when everything is the brand colour, nothing is emphasised
- Status colours (red, orange, green) should never appear on primary CTAs — they carry their own semantic meaning

## Weight and Contrast

Typography weight communicates importance within text:

- **Bold** for the most important label, number, or heading in a group
- Regular weight for supporting content
- Light or muted colour for metadata, timestamps, secondary labels

In data-heavy UIs (tables, dashboards), bold a key metric and keep surrounding data regular — the eye goes to bold first.

## Position as Emphasis

Users in left-to-right reading cultures scan top-left first. Position reinforces hierarchy:

- Primary action: bottom-right of a form or dialog (natural end of the reading flow), or top-right of a page header
- Most important content: top of the page, above the fold
- Warnings and critical status: top of the affected section, not buried at the bottom
- Destructive actions (Delete, Remove): visually separated from constructive actions, often at the end of an action group

## One Primary Action Per View

The biggest hierarchy mistake is giving everything equal emphasis. When every button is filled, every heading is bold, and every card is highlighted, the user has no signal about where to start.

**Rule:** In any view, ask "what is the single most likely next action for most users?" Make that one thing visually dominant. Everything else recedes.

## Review Checklist

- [ ] Is there at most one primary (filled, brand-coloured) button per section?
- [ ] Are secondary and tertiary actions visually recessive compared to the primary?
- [ ] Is the most important content positioned highest and/or largest?
- [ ] Are size differences between hierarchy levels perceptible, not just 1–2px?
- [ ] Is brand colour used sparingly enough that it retains its emphasis signal?
- [ ] Are destructive actions visually distinct and separated from constructive actions?
- [ ] Does bold text appear only on genuinely important labels or values?

## Common Anti-Patterns

| Anti-pattern | Problem | Fix |
|---|---|---|
| Two or more filled primary buttons side by side | Both feel equally important — no guidance | One primary, one secondary (outlined) |
| Brand colour used on backgrounds, headers, AND buttons | Colour loses emphasis signal | Reserve brand colour for one role |
| All text the same weight on a data-heavy screen | No visual entry point for the eye | Bold the key metric or label per group |
| "Cancel" and "Confirm" buttons the same size and colour | User must read to distinguish | Primary = filled, Cancel = ghost or text link |
| Important warnings placed below the fold | Users miss them | Surface critical status at the top of the affected section |
