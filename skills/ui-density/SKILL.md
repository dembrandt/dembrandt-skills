---
name: ui-density
description: UI density — how much information and how many features appear at once — should match the primary platform and user type. Desktop supports dense, feature-rich interfaces; mobile requires focused, reduced layouts. Enterprise power users tolerate higher density than occasional users. Use when designing data tables, dashboards, toolbars, or adapting a desktop product for mobile.
metadata:
  priority: 7
  pathPatterns:
    - "**/*.css"
    - "**/*.scss"
    - "components/**"
    - "src/components/**"
    - "**/*.tsx"
    - "**/*.jsx"
    - "design-system/**"
  promptSignals:
    phrases:
      - "density"
      - "compact"
      - "spacious"
      - "too crowded"
      - "too much"
      - "feature count"
      - "information density"
      - "data table"
      - "dashboard"
      - "power user"
      - "power user mode"
      - "expert user"
      - "reading is time"
retrieval:
  aliases:
    - ui density
    - compact layout
    - spacious layout
    - information density
    - feature count
    - dashboard density
    - power user mode
    - expert vs casual user
    - reading is time
  intents:
    - decide how dense the UI should be
    - make a dashboard less overwhelming
    - design a compact data table
    - reduce feature count on mobile
    - match density to user type
    - design for domain experts / power users
    - reduce how much the user has to read
  examples:
    - this dashboard feels overwhelming
    - how dense should this table be
    - reduce this for mobile
    - this is an enterprise tool, can it be denser
    - design a power-user mode for domain experts
    - the UI has too much to read
---

# UI Density

Density describes how much information and how many interactive elements appear in a given area. The right density is not a universal standard — it depends on platform, user type, and session context.

## Platform Defaults

| Platform | Default density | Reason |
|---|---|---|
| Desktop | Medium to high | Large screen, precise input, often primary work surface |
| Tablet | Medium | Touch input, larger than phone but less than desktop |
| Mobile | Low | Small screen, touch targets need space, interrupted sessions |

Never port a dense desktop layout directly to mobile. Remove, collapse, or deprioritise features rather than shrinking them.

## User Type and Density

| User type | Appropriate density | Examples |
|---|---|---|
| Power user / enterprise | High density acceptable | Trading platforms, ERP, analytics, developer tools |
| Occasional / general user | Medium — clear visual breathing room | SaaS dashboards, project management |
| Consumer / first-time user | Low — guided, uncluttered | Onboarding flows, consumer apps, e-commerce |

A trading platform operator sits in the product for 8 hours a day and has learned every pixel — high density serves them. A user visiting a settings page once a month needs clear space and obvious labels.

**Domain experts tolerate complexity — if it solves the *right* problem quickly.** People who know the domain (especially in internal tools) will happily use dense, complex, feature-rich interfaces, because the complexity maps to a mental model they already hold. Two conditions make this work rather than overwhelm:

- **Terminology matches their vocabulary.** The labels, abbreviations, and jargon are the ones they already use. A term that's opaque to a consumer is a precise, fast signal to an expert — don't dumb it down for an audience that isn't there.
- **The outcome stays quickly reachable.** Density is fine as long as the *result* — the answer they came for, or the action they need — is fast to see or do, typically through an obvious **primary action** (see [[visual-emphasis-and-hierarchy]]). Complexity that surrounds a clear path to the outcome is power; complexity that buries the outcome is clutter.

Design a **power-user mode** around this: high density, expert terminology, keyboard-driven, primary action always in reach — distinct from a **casual/first-time mode** that guides and unclutters. The same product may offer both; match the mode to who is actually using the view.

## Density Tokens

Define spacing scale with density in mind. A compact variant reduces padding without changing structure:

```css
/* Default density */
--density-row-height:    44px;
--density-cell-padding:  var(--space-3) var(--space-4);
--density-gap:           var(--space-4);

/* Compact (enterprise / data-heavy) */
[data-density="compact"] {
  --density-row-height:    32px;
  --density-cell-padding:  var(--space-2) var(--space-3);
  --density-gap:           var(--space-2);
}

/* Spacious (consumer / onboarding) */
[data-density="spacious"] {
  --density-row-height:    56px;
  --density-cell-padding:  var(--space-4) var(--space-6);
  --density-gap:           var(--space-6);
}
```

## Feature Count by Platform

Not every feature belongs on every platform. For each feature ask: does a mobile user need this right now?

| Priority | Mobile | Tablet | Desktop |
|---|---|---|---|
| Core task | Always | Always | Always |
| Secondary actions | Collapsed (menu/sheet) | Visible | Visible |
| Filters and sorting | Accessible but not persistent | Collapsible | Persistent sidebar or toolbar |
| Bulk actions | Hidden or minimal | Reduced | Full |
| Advanced settings | Link to separate screen | Link or panel | Inline or panel |
| Data visualisation | Simplified (key metric only) | Reduced chart | Full chart |

## Density and Feature Reduction on Mobile

Sections and features can be removed, collapsed, or repositioned on smaller viewports — not just resized.

- **Remove:** Decorative sidebars, secondary data columns, promotional banners
- **Collapse:** Filters, advanced options, secondary navigation into accordions or bottom sheets
- **Reposition:** Toolbars move from top to bottom (thumb reach), sidebars move to drawers
- **Simplify:** A multi-column data table becomes a card list; a full chart becomes a single key metric

Progressive disclosure is the principle: show the minimum needed to complete the primary task, reveal more on demand.

## Reading Is Time

The most under-counted cost in a dense UI is **reading**. Every word the user must read to orient themselves is time spent, and it compounds — the more there is to read, the slower the whole interface feels, on every visit. Density is not just "how much fits on screen"; it's "how much the user has to *read* to act." Reduce that load:

- **Cut words before you shrink them.** The fix for a cramped screen is usually less content, not smaller type (see [[modular-scale-typography]]).
- **Let recognisable icons replace reading** where a concept has an unambiguous, standard icon — the eye recognises a shape faster than it reads a word (see [[brand-visual-language]]).
- **But don't over-ice with icons.** A wrong or decorative icon adds a thing to interpret instead of removing one; and an icon on everything is its own noise. Right icon, relevant place only.
- **Front-load the scannable bit.** Put the word or number the user scans for at the start of the line/label, so they don't read the whole thing to find it.

The goal: a user should be able to *glance*, not *read*, to know where they are and what to do next.

## Review Checklist

- [ ] Is the density appropriate for the primary platform (desktop = can be denser, mobile = must be sparse)?
- [ ] Is the density appropriate for the user type (power user = higher density, consumer = more space)?
- [ ] Are spacing tokens used to define density — not one-off padding values?
- [ ] On mobile: are secondary features collapsed, repositioned, or removed rather than shrunk?
- [ ] Are touch targets ≥ 44×44px even in compact density variants?
- [ ] Is a density toggle offered for enterprise tools where users have strong personal preferences?
