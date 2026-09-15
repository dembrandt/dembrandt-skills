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
      - "shared header"
      - "who owns the design system"
      - "token source of truth"
      - "design tokens package"
retrieval:
  aliases:
    - marketing vs app
    - site vs product
    - landing page vs dashboard
    - public vs signed-in
    - brand vs product UI
    - two surfaces one brand
    - who owns the tokens
    - shared component across site and app
  intents:
    - decide what may differ between the marketing site and the app
    - stop the product UI drifting from the brand
    - audit a codebase that renders both a site and a product
    - add a theme to the app but not the site
    - unify tokens across two surfaces
    - share tokens across separate repositories
    - decide who owns the token source
  examples:
    - the app doesn't look like our website
    - can the dashboard use tighter corners than the landing page
    - we have three different ways of writing colours
    - should the app support light mode if the site doesn't
    - our marketing pages and product have drifted
    - the header is duplicated in both codebases
    - nobody owns our design tokens
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
  at high density large radii eat the corners of adjacent elements and read as mushy. Between them the two
  surfaces may well use five or six steps, and that is not a broken scale as long as every step is drawn from the
  same ladder. What breaks it is a value that is on no ladder at all.
- **Density and width.** Marketing measures a reading column. Product measures a work area, and the shell, not
  the page, owns that width.
- **Motion.** Marketing may animate on entry, because nothing has been asked of the visitor yet. Product animates
  in response to the user, with two standing exceptions: onboarding, where motion is what shows a first-time user
  where a thing came from, and empty states, where it says the screen is waiting rather than broken. Both are
  answers to a user's situation, which is why they do not contradict the rule.
- **Theme.** A product may need light mode when the marketing site does not. Someone using a tool for six hours
  has a right to choose; a visitor passing through does not need the switch.

## Components That Render on Both

The header, the primary call to action, the pricing widget, the footer: a handful of components appear on both
surfaces, and they are where a surface rule turns into an argument. They belong to neither surface.

**The rule: a shared component reads its surface from context, it does not carry a variant per surface.** A
component with a `marketing` prop and an `app` prop has already forked; the two branches drift on the next change
and nobody notices, because both still render.

What that means in practice:

- The component takes tokens from the surface it is mounted in. If the product is themed and the site is not, the
  component is theme-aware everywhere and the site simply never changes the value.
- Surface-specific *size* is a prop the component already has. A call to action large on a landing page and medium
  in a toolbar is one component at two sizes, not two components.
- If the two surfaces genuinely need different behaviour rather than different sizing, that is two components with
  two names. Say so out loud instead of hiding the fork behind a boolean.
- A shared component's owner is the token source's owner, not whichever team touched it last.

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

### Where the Boundary Actually Sits

More often than a stray hex, the second blue arrives at a *repository or system boundary*. Where the boundary
falls decides what work the single source needs:

- **One repository, both surfaces.** Easiest case, and the one most likely to fail anyway. The values must live
  outside both surfaces' folders, or the surface built first quietly becomes the definition.
- **Separate repositories.** The source has to be a published, versioned artifact that both consume, and updating
  it has to be a release rather than a copy. If the honest answer to "how does the site get the new accent" is
  "someone pastes it", there is no single source, only a habit.
- **A CMS or marketing platform beside the product.** The values have to be exported into the platform's own
  theming as a build step, not re-entered by hand in an admin screen. Anything typed into a settings field is a
  fork with no history.
- **A design tool as the origin.** Fine, as long as one direction is authoritative. Two-way sync between a design
  tool and code is not a single source, it is two sources with a merge conflict on a delay.

The cost of crossing a boundary is what people actually optimise for. If consuming the shared source is slower
than hardcoding the value, the value gets hardcoded, and no rule survives that.

## Someone Owns the Source

A source of truth owned by everyone is owned by nobody, and this is the failure that outlives every other point
here. The tokens go stale, each surface patches locally because asking is slower, and the split is complete before
anyone proposes it.

**Name one owner for the token source: a person or a single team, written down where the tokens live.** The owner
does not decide what each surface looks like. They decide what goes into the shared layer, they review changes to
it, and they are the person a surface team asks before adding a value.

Two further rules make the ownership real rather than nominal:

- **Adding to the shared layer is the owner's call. Choosing from it is not.** If the owner is consulted on every
  radius a page uses, they become a bottleneck and get routed around within a month.
- **The owner is accountable for the boundary being cheap to cross.** If teams keep hardcoding values, that is the
  owner's problem to fix, not the teams' discipline to blame.

## Practical Checks

- Extract both surfaces and diff the palettes. Any hue present on one and absent on the other is a question to
  answer, not a fact to accept.
- List the radius values in use across both surfaces. Not the count: the question is whether every value is a
  step of the declared scale. One off-ladder value matters more than six on-ladder ones.
- Check the smallest text on the product's densest screen against the contrast floor, not the marketing body copy.
- Grep for literal colour values in markup. The count is the drift debt, and it only goes up on its own.

See also: `ui-density` for choosing the product's density, `color-mode-and-theme` for adding a theme to one
surface, `component-family-consistency` for keeping a component meaning one thing everywhere.
