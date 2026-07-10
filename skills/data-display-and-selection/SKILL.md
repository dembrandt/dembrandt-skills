---
name: data-display-and-selection
description: Complex data deserves multiple view modes — grid, list, table — chosen by the user based on their task. Row and item selection should use large hit areas (the whole row or card, not just a checkbox). Selected state is communicated through a subtle background colour shift. Mass actions appear when items are selected. Use when designing data tables, product listings, file browsers, or any multi-item collection.
metadata:
  priority: 7
  pathPatterns:
    - "components/**"
    - "src/components/**"
    - "**/*.tsx"
    - "**/*.jsx"
    - "design-system/**"
    - "ui/**"
  promptSignals:
    phrases:
      - "data table"
      - "list view"
      - "grid view"
      - "mass action"
      - "bulk action"
      - "row selection"
      - "select all"
      - "item selection"
      - "view toggle"
      - "collection"
      - "search"
      - "autocomplete"
      - "typeahead"
      - "search results"
      - "chart"
      - "infographic"
      - "metric"
retrieval:
  aliases:
    - data table
    - list view
    - grid view
    - mass actions
    - bulk actions
    - row selection
    - view modes
    - collection UI
    - search and autocomplete
    - typeahead search
    - instant search results
    - chart type choice
    - infographic colour
    - making numbers comprehensible
  intents:
    - design a data table
    - add grid and list view toggle
    - implement row selection
    - add bulk actions
    - design a product listing
    - make selection easier
    - design a search with instant results
    - choose a familiar chart type
    - present a number or metric clearly
  examples:
    - add grid and list view to this product listing
    - design row selection for this table
    - add bulk delete to this list
    - make it easier to select multiple items
    - add an autocomplete search to this app
    - what chart should I use for this trend
    - make this number easier to understand
---

# Data Display and Selection

Complex data collections — products, files, users, orders, tasks — have no single correct view. Different tasks call for different views. Browsing benefits from grid; comparing details benefits from list or table; bulk management benefits from a dense table with mass actions. Give users the choice.

---

## View Modes

Offer multiple views when the data has both visual and detailed dimensions.

| View | Best for | When to default |
|---|---|---|
| **Grid** | Visual items: products, images, files, cards | When items are visually distinct and browsing is the primary task |
| **List** | Moderate detail: tasks, emails, articles | When a key piece of text or metadata drives selection |
| **Table** | Dense data: orders, reports, user management | When multiple columns of data must be compared |

**View toggle placement:** top-right of the collection, adjacent to sort/filter controls. Use icon buttons with tooltips (`grid`, `list`, `table`). Persist the user's choice in localStorage.

```
[Filter ▾]  [Sort ▾]          [⊞ Grid]  [☰ List]  [⊟ Table]
```

On mobile, collapse to the view that works best for the content — grid for visual items, list for text. Do not offer a view toggle on small screens unless both views are genuinely usable.

---

## Selection: Prefer Large Hit Areas

Checkboxes are small targets. Requiring users to hit a 16×16px checkbox to select a row is unnecessary friction — especially on touch devices.

**Default: the entire row or card is the selection target.**

- Click anywhere on the row → selects the row (background shifts, checkbox checks)
- The checkbox is a visual indicator of selection state, not the only way to select
- Keyboard: Space selects the focused row; Shift+click extends selection; Ctrl/Cmd+click toggles individual items

```css
.row {
  cursor: pointer;
  background: var(--color-surface);
  transition: background 100ms ease-out;
}
.row:hover {
  background: var(--color-grey-50);
}
.row.selected {
  background: var(--color-primary-subtle); /* subtle brand tint */
}
```

For cards in a grid, the entire card is the selection area — not just a checkbox in the corner.

---

## Selected State Visual Language

Selected items communicate their state through a background colour shift — not just a checkbox tick.

**Background:** `--color-primary-subtle` — the brand primary colour heavily desaturated and lightened to ~5–8% opacity. Perceptible but not jarring.

**Left border accent (optional):** A 3px left border in `--color-primary` reinforces the selected state for list and table rows.

**Checkbox:** Checked and filled with `--color-primary`. The checkbox is a secondary signal, not the primary one.

```css
.row.selected {
  background: var(--color-primary-subtle);    /* e.g. hsl(224, 21%, 94%) */
  border-left: 3px solid var(--color-primary);
}
```

**Do not** use a high-contrast or saturated background for selection — it competes with content and makes dense tables hard to read.

---

## Mass Actions

When one or more items are selected, mass actions appear. They disappear when nothing is selected.

**Placement:** A contextual toolbar that appears at the top of the collection (replacing or supplementing the standard toolbar) when selection is active.

```
[✓ 3 selected]  [Delete]  [Archive]  [Export]  [Move to ▾]  [× Clear]
```

- Lead with the selection count: "3 selected" — confirms the scope before any action
- Show only actions applicable to the selection — if some actions require a single item, disable them for multi-select
- "Clear" deselects everything and dismisses the toolbar
- Destructive mass actions (Delete) always trigger a confirm dialog naming the count: "Delete 3 projects? This cannot be undone."

**Select all:** A checkbox in the table header selects all items on the current page. A secondary action "Select all 247" extends to the full dataset.

```
[☑ Select all on page]  →  [Select all 247 results]
```

---

## Sorting and Filtering

### Column sorting (table view)
- Click a column header to sort ascending; click again for descending; third click clears sort
- Active sort column shows a directional arrow (↑ ↓)
- Only sortable columns are clickable — non-sortable columns have no hover state on header

### Filters
- Persistent filters belong in a sidebar or filter bar above the collection
- Active filters should be visible as chips/tags that can be individually removed
- "Clear all filters" removes all active filters in one action
- Filter count badge on the filter button when filters are active: `Filter (3)`

### Empty states
- **No results from filter:** "No results for these filters. [Clear filters]" — do not show a generic empty state
- **Genuinely empty collection:** show a call to action for the first item: "No projects yet. [Create project]"

---

## Search and Autocomplete

Search is how users find one thing in a large set, so it must feel **instant and recognisable**.

**Suggest from the first keystrokes.** Start returning results after **1 character, at most 2–3** — don't make the user finish typing or press enter to see anything. Results appear live in a dropdown as they type.

**Make a valid result recognisable at a glance.** The whole point of a suggestion list is that the user spots *their* result in a long list without reading every row. Give each result more than a bare string:
- a **thumbnail/image** where the item is visual (products, people, files),
- the **category / area** it belongs to, and for typed domains (products, spare parts, services) a **category icon and colour** so the type is legible before the label is read — find good brand-appropriate icons for these result types (see [[brand-visual-language]]),
- the matched text **highlighted** within the result.

This is a *soft* rule — not every search needs images — but the goal is constant: **the user should identify the right result out of many, fast** (reading is time — see [[ui-density]]).

**Give a way out to the full results.** The dropdown is a shortcut, not the whole story. Always offer "See all results for '…'", opening a **full listing/results page with filters** (the collection patterns above) for when the quick suggestions aren't enough.

**Fully keyboard-navigable.** Arrow keys move through suggestions, Enter selects, Esc closes — and it must all work by mouse too. Search is a power-user path; don't force the hand off the keyboard.

---

## Table-Specific Patterns

### Sticky header
Table column headers stick to the top when scrolling vertically — users must always be able to see what each column means.

### Sticky first column
For wide tables that scroll horizontally, the first column (row identifier — name, ID) sticks to the left.

### Row actions
Per-row actions (Edit, Delete, View) appear on hover in the rightmost column. Do not show them at rest — they add visual noise.

```
[Name]  [Status]  [Date]  [Amount]          ← at rest
[Name]  [Status]  [Date]  [Amount]  [Edit] [⋯]  ← on hover
```

### Column resize and reorder
For enterprise data tables: allow columns to be resized by dragging the header border, and reordered by dragging the header. Persist the layout.

---

## Making Numbers Comprehensible

A raw number is hard to judge on its own — "1,240 users" or "€48,900" means little without a reference. Presenting data is not just laying out the figures; it is giving them the context and shape that let a user *understand* them at a glance.

**Give a number a reference.** A bare value communicates far less than a value with a baseline: a percentage, an average, a delta, or a comparison. "€48,900 (+12% vs last month)", "72% of target", "avg 3.4 per user" — the comparison is usually the insight, not the absolute figure.

**Visualise when the story is a pattern.** Reach for a graph when the message is a **trend, distribution, comparison, or relationship** the eye reads faster than a column of digits. A single KPI can pair with a sparkline; a set of categories reads better as a bar chart than a table. A table is for looking up exact values; a chart is for seeing the shape.

**Show time-series for anything that evolves.** If a value lives and changes over time — revenue, usage, a status history — present its trajectory, not just the current snapshot. A trend line answers "is this getting better or worse?" that a single number never can. Whenever something is time-dependent, consider showing its history alongside its current value.

**Choose familiar, widely-understood chart types.** Pick the chart most people already know how to read — **bar, line, area, pie/donut, sparkline** — over an exotic one (sankey, radar, chord, treemap) that looks impressive but forces the user to *learn the chart* before they can read the data. Novelty in a chart type is a tax on comprehension; spend it only when a common chart genuinely can't tell the story.

**Limited, semantic palette.** At most 2–3 colours; each means exactly one thing (see [[status-colors-and-errors]]). Traffic-light or a known convention (brand-primary vs grey). Need more distinctions? Add a legend or tooltips — don't add hues. Chart craft (axes, legends, light/dark): `dataviz`. Pairing a chart with its table: [[coordinated-data-views]].

---

## Review Checklist

- [ ] Is a view mode toggle offered when data has both visual and detail dimensions?
- [ ] Is the user's preferred view persisted across sessions?
- [ ] Is the entire row or card the selection hit area — not just the checkbox?
- [ ] Does selected state use a subtle background colour shift (`--color-primary-subtle`)?
- [ ] Does a mass action toolbar appear when items are selected, showing the selection count?
- [ ] Do destructive mass actions require a confirm dialog naming the item count?
- [ ] Does "Select all" work per page, with an option to extend to the full dataset?
- [ ] Are active filters visible as removable chips?
- [ ] Does the empty state differ between "no results" and "genuinely empty"?
- [ ] Are per-row actions shown on hover only, not at rest?
- [ ] Is the table header sticky when the table scrolls vertically?
- [ ] Are key numbers given a reference (%, average, delta, comparison) rather than shown bare?
- [ ] Is a graph used where the story is a trend/distribution/comparison, and is time-evolving data shown as a time-series, not just a snapshot?
- [ ] Are chart types familiar and widely understood (bar/line/area/pie/sparkline) rather than exotic ones that must be learned before they can be read?
- [ ] Does a chart/infographic use a small, semantic palette (≤2–3 colours, traffic-light or a known convention), with each colour meaning one thing — and a legend/tooltips where the encoding isn't self-evident?
