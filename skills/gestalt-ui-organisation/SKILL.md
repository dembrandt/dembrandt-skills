---
name: gestalt-ui-organisation
description: UI layout and grouping should follow Gestalt principles so users immediately understand which controls, commands, and elements belong together. Use when designing or reviewing component layout, navigation, toolbars, forms, dashboards, or any UI where visual grouping communicates relationships.
metadata:
  priority: 7
  docs:
    - "https://www.interaction-design.org/literature/topics/gestalt-principles"
  pathPatterns:
    - "**/*.tsx"
    - "**/*.jsx"
    - "**/*.vue"
    - "**/*.svelte"
    - "components/**"
    - "src/components/**"
    - "design-system/**"
    - "ui/**"
  promptSignals:
    phrases:
      - "gestalt"
      - "grouping"
      - "visual hierarchy"
      - "ui layout"
      - "component organisation"
      - "related controls"
      - "ui clarity"
retrieval:
  aliases:
    - gestalt
    - visual grouping
    - ui organisation
    - proximity
    - similarity
    - figure ground
  intents:
    - group related controls
    - make ui clearer
    - organise components
    - show which elements belong together
    - improve visual hierarchy
  examples:
    - group these buttons so users know they're related
    - make it clearer which commands belong together
    - organise this toolbar using gestalt
---

# Gestalt UI Organisation

UI should be organised so that the visual structure communicates relationships — which commands, controls, and elements belong together — without requiring users to read labels or documentation.

## Core Gestalt Principles for UI Layout

### 1. Proximity
Elements that are close together are perceived as a group.

- Place related controls (e.g. Bold / Italic / Underline) close together with minimal gap between them
- Separate unrelated groups with larger whitespace
- Do not use lines or borders as the primary grouping mechanism — proximity alone should convey the relationship

**Example:** A toolbar with `[Cut] [Copy] [Paste]` grouped tightly, then a wider gap before `[Undo] [Redo]`, communicates two distinct command groups without any visual divider.

#### Prefer whitespace over separator lines
Default to **whitespace, not divider lines**, for grouping. Most separators do work that spacing does better — they add noise and a "boxed-in" feel without adding information. Remove the majority and let proximity carry the grouping.

Caveat: a line takes almost no space, so removing it leaves groups too close. **Removing separators usually means adding spacing** — budget the whitespace (occasionally a subtle background or heading) rather than just deleting the line and leaving the layout cramped.

#### Cause and effect stay close
Proximity also governs time: what a click produces should appear next to the click. When a left-hand menu opens content that starts at the far right, the eye crosses the whole screen for every selection, and the user re-orients each time.

- Anchor content to the left edge of the pane, not the centre. Content begins where the menu ends.
- Put the page title and primary action in the top-left of the pane, level with the selected menu row. The first landing point is then a short hop from the click.
- On wide screens prefer three narrow columns (menu, list, detail) over one narrow menu and one wide field. Each step moves the eye one column, never the full width.
- Highlight the selected row and let the content enter with a small motion from the left, so the movement leads the eye.
- Do this the same way in every view. If one screen answers a click next to it and another answers far away, the user learns nothing they can reuse.

### 2. Similarity
Elements that look alike are perceived as related.

- Use consistent colour, shape, size, and iconography within a functional group
- Differentiate groups through visual contrast (shape, fill, size) — not just position
- Primary actions and secondary actions should look visually distinct from each other

**Example:** Destructive actions (Delete, Remove) use a different colour than constructive actions (Save, Add), signalling different intent groups.

### 3. Common Region
Elements enclosed in a shared region are perceived as a group.

- Use cards, panels, or background fills to enclose logically related content
- Avoid wrapping unrelated elements in the same container
- Nested regions should reflect nested logical hierarchy

**A region needs no border — but a borderless one needs air.** Enclosure can come from a border/fill *or* from whitespace alone. When a card has no border or background, generous internal padding and a clear gap to its neighbours are what make it read as one region; without a border doing that job, cut the air and separate cards collapse into one blur. Borderless is fine — cramped-and-borderless is not.

**Example:** Form sections grouped in bordered cards signal that fields inside each card form a logical unit.

### 4. Connectedness
Elements connected by lines or visual links are perceived as related.

- Use connectors, lines, or flow arrows only when a genuine relationship exists
- In navigation trees or node-based editors, visible connections should match data relationships exactly

### 5. Figure / Ground
Users distinguish foreground interactive elements from background context.

- Interactive controls should have sufficient contrast against their background
- Disabled or contextual information should visually recede (lower contrast, smaller weight)
- Modals and overlays must clearly separate from the underlying content layer

### 6. Continuity
The eye follows smooth paths and lines.

- Align related controls along a consistent axis (left edge, baseline, or centre line)
- Avoid breaking alignment within a logical group
- Grid-aligned layouts reinforce groupings through shared axis continuity

## Review Checklist

When reviewing a UI layout for Gestalt compliance:

- [ ] Can a new user identify which controls belong together without reading labels?
- [ ] Is proximity used as the primary grouping signal (not only borders/lines)?
- [ ] Do visually similar elements share a functional purpose?
- [ ] Are unrelated groups separated by meaningful whitespace?
- [ ] Does the result of a click appear near the click, in the same place on every view?
- [ ] Have unnecessary divider lines been removed in favour of whitespace (with spacing added to compensate)?
- [ ] Does visual hierarchy match interaction hierarchy (primary > secondary > tertiary)?
- [ ] Are destructive or irreversible actions visually distinct from constructive ones?
- [ ] Is the figure/ground contrast sufficient for all interactive elements?

## Common Anti-Patterns

| Anti-pattern | Problem | Fix |
|---|---|---|
| All buttons same size and colour regardless of function | Similarity principle violated — implies all actions are equivalent | Differentiate primary, secondary, destructive visually |
| Related controls spread across distant areas of the screen | Proximity violated — user cannot perceive the relationship | Co-locate related controls |
| Menu on the left, content starting far right | The eye crosses the screen on every selection | Anchor content left, title level with the selected row; add a middle column on wide screens |
| Overuse of divider lines to group elements | Relies on decoration rather than spatial logic | Use whitespace and proximity instead |
| Identical whitespace between all elements | No grouping signal — everything reads as a flat list | Apply 8pt/4pt spacing scale: tight within group, loose between groups |
| Mixed icon styles within one toolbar | Similarity broken — implies different functional families | Use a single consistent icon set and weight per toolbar |
