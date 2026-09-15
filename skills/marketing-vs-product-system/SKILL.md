---
name: marketing-vs-product-system
description: A marketing site and the product it sells share a brand but not a design system. The surfaces differ in density, type scale, radius and weight for good reasons, and those differences are legitimate, but the token layer underneath them must stay single. Use when a product app and its public site drift apart, when deciding which values may differ between the two, when a signed-in surface needs a theme the marketing site does not have, or when auditing one codebase that renders both.
metadata:
  priority: 6
  pathPatterns:
    - "app/**"
    - "src/app/**"
    - "components/**"
    - "src/components/**"
    - "**/*.css"
    - "**/*.tsx"
    - "**/*.jsx"
    - "design-system/**"
  promptSignals:
    phrases:
      - "marketing site"
      - "landing page vs app"
      - "product UI"
      - "signed-in"
      - "logged-in area"
      - "same brand different"
      - "design system drift"
      - "app feels different"
      - "dashboard vs homepage"
      - "one codebase two surfaces"
retrieval:
  aliases:
    - marketing vs app
    - site vs product
    - landing page vs dashboard
    - public vs signed-in
    - brand vs product UI
    - two surfaces one brand
  intents:
    - decide what may differ between the marketing site and the app
    - stop the product UI drifting from the brand
    - audit a codebase that renders both a site and a product
    - add a theme to the app but not the site
    - unify tokens across two surfaces
  examples:
    - the app doesn't look like our website
    - can the dashboard use tighter corners than the landing page
    - we have three different ways of writing colours
    - should the app support light mode if the site doesn't
    - our marketing pages and product have drifted
---

# Marketing and Product Are Two Surfaces of One Brand

The public site sells; the product is used. A visitor reads one marketing page for ninety seconds and leaves. An
operator opens the same brand every morning and stays for hours. Designing both to one specification produces
either a brochure that is exhausting to work in or a product screen that cannot sell anything.

So the two surfaces *should* diverge. The question is never whether, it is **which layer is allowed to diverge**.

## The Layer Rule

**Brand values are shared. Application values are chosen per surface.**

| Shared, one value for both | Chosen per surface |
|---|---|
| Hue: brand accent, warm accent, status colours | Which of them dominates a screen |
| Font families | Type scale in use |
| Radius *scale* (the set of allowed steps) | Which step a surface reaches for |
| Icon library | Icon size and weight |
| Contrast floors for text | Density, spacing rhythm |
| Component contracts (what a button is) | Button size defaults |

If a value answers *who are we*, it is shared. If it answers *what is this screen for*, it is the surface's own
call. A product screen picking a tighter radius is design. A product screen picking a different blue is drift.

## What Legitimately Differs

These divergences are healthy and worth stating explicitly rather than letting them happen by accident:

- **Type scale.** Marketing lives in the display registers and has real hero sizes. Product lives two or three
  steps down, with the small end of the scale carrying most of the interface. The scale is the same ladder; the
  two surfaces stand on different rungs.
- **Weight.** Marketing leans bold, because a headline is competing for attention. Product leans medium and
  semibold, because everything on screen is already wanted.
- **Radius.** Marketing can afford larger, softer cards: few elements, lots of air. Product goes tighter, because
  at high density large radii eat the corners of adjacent elements and read as mushy.
- **Density and width.** Marketing measures a reading column. Product measures a work area, and the shell, not
  the page, owns that width.
- **Motion.** Marketing may animate on entry. Product animates only in response to the user.
- **Theme.** A product may need light mode when the marketing site does not. Someone using a tool for six hours
  has a right to choose; a visitor passing through does not need the switch.

## What Is Drift, Not Divergence

- A second grey, or a second brand blue, that exists only on one surface
- A component that means one thing in the site and another in the product: a pill that is a link here and a label
  there
- Contrast that meets the floor on the marketing page and quietly drops below it in the dense product screen,
  where small text makes it worse
- Interaction affordances present on one surface only: focus-visible states, keyboard paths and ARIA roles that
  the product has and the site lacks, or the reverse

## The Token Layer Must Be Single

This is where one codebase serving both surfaces usually fails, and it fails invisibly.

The failure looks like three mechanisms carrying the same values at once: CSS custom properties defined once,
literal hex values pasted into markup, and a runtime helper that returns class names per theme. Each arrives for a
good local reason. Together they mean a colour cannot be changed in one place, and nothing reports the mismatch.

**The rule: one source of truth for values, any number of consumers.** A themed surface resolving tokens at
runtime is fine as long as it resolves *the shared tokens* rather than holding its own copies. The test is
mechanical: change the brand accent in one place and see whether both surfaces move. If one does not, you have
two design systems wearing one logo.

Literal values in markup are the specific thing to hunt. They are invisible to a token audit, they are what a
theme cannot reach, and they multiply fastest on whichever surface was built in the most hurry.

## Practical Checks

- Extract both surfaces and diff the palettes. Any hue present on one and absent on the other is a question to
  answer, not a fact to accept.
- Count radius steps across both. More than four in use means the scale has stopped being a scale.
- Check the smallest text on the product's densest screen against the contrast floor, not the marketing body copy.
- Grep for literal colour values in markup. The count is the drift debt, and it only goes up on its own.

See also: `ui-density` for choosing the product's density, `color-mode-and-theme` for adding a theme to one
surface, `component-family-consistency` for keeping a component meaning one thing everywhere.
