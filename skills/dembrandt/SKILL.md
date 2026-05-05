---
name: dembrandt
description: Orchestrates a multi-dimensional UI/UX task through the full dembrandt design pipeline (brand → tokens → layout → components → UX polish → accessibility/performance gate), loading the right sub-skill at each stage. Use when designing or reviewing a non-trivial UI (a screen, flow, or design system), going from brand to UI end-to-end, or auditing an existing interface across multiple dimensions. Do NOT use for single-dimension tasks (e.g. "review my color palette" — load `algorithmic-color-palette` directly).
metadata:
  priority: 10
  promptSignals:
    phrases:
      - "design a"
      - "build ui"
      - "design review"
      - "ui review"
      - "audit interface"
      - "ux review"
      - "from brand to ui"
      - "design system review"
      - "review this screen"
      - "design pipeline"
retrieval:
  aliases:
    - dembrandt
    - design pipeline
    - ui orchestrator
    - design router
    - opinionated ui review
    - end-to-end design
  intents:
    - run a full design pipeline on a UI task
    - decide which dembrandt skills apply to a task
    - review a UI across hierarchy / a11y / consistency at once
    - go from brand → tokens → layout → components → polish
    - audit a design system end-to-end
  examples:
    - design a dashboard for this brand
    - review my checkout flow end to end
    - audit our design system against best practice
    - build a UI from this DESIGN.md
    - we're shipping next week, run the full design review
---

# dembrandt

Opinionated orchestrator for the dembrandt design-skill collection. Routes a multi-dimensional UI task through the right sub-skills, in the right order.

## Philosophy

dembrandt packages senior-designer judgement as agent skills. Three working principles override generic best-practice when they conflict:

1. **Decide explicitly, don't leave open.** Hierarchy, primary action, error colour, type scale — pinned at design time, not "we'll decide later."
2. **Visual coherence beats theoretical perfection.** Every element shares one shape language, one type scale, one spacing system. A 95%-coherent system ships better than a 100%-correct one with three competing radii.
3. **Accessibility and recovery are the floor, not polish.** WCAG 2.2 AA contrast, recoverable errors, body text ≥ 16px, every interactive state defined — these are non-negotiable.

When a sub-skill contradicts a generic article, follow the sub-skill.

## When to use this skill

| Task | Use this skill | Skip — go direct |
|---|---|---|
| Design or review a screen, flow, or app | ✓ | |
| Build a UI from an existing brand | ✓ | (or call `generate-ui-from-brand` directly) |
| Audit a design system end-to-end | ✓ | |
| Review a single dimension (just contrast, just one button state) | | ✓ load the specific sub-skill |
| Implement an already-designed Figma file in code | | ✓ use `frontend-design` / `vercel-react-best-practices` |

## Pipeline

Six stages. Each consumes the previous stage's output. Skip a stage only when the task explicitly excludes it. **Load sub-skills on demand** as you progress — never all 30 upfront.

### Stage 1 — Brand foundation
*"What is this product visually saying?"*

| Load | When |
|---|---|
| `brand-visual-language` | Establishing tone, choosing rounded vs angular, picking icon style |
| `algorithmic-color-palette` | Deriving full palette from one or two brand colours |
| `color-mode-and-theme` | Deciding light / dark / both, and whether to expose a theme picker |

### Stage 2 — Design tokens & scales
*"What are the building blocks?"*

| Load | When |
|---|---|
| `modular-scale-typography` | Defining the type ramp on a coherent ratio (h1 … body … caption) |
| `elevation-and-depth` | Card / modal shadow scale, depth hierarchy |
| `button-states` | Rest / hover / active / focus / disabled / loading for every interactive element |
| `component-family-consistency` | Buttons, inputs, pills, calendars share radius / shadow / border logic |
| `status-colors-and-errors` | Error / warning / success — one colour, one meaning, no overlap |

### Stage 3 — Layout & structure
*"Where does each thing live?"*

| Load | When |
|---|---|
| `gestalt-ui-organisation` | Grouping controls so users see what belongs together |
| `visual-emphasis-and-hierarchy` | One primary action per view; size / weight / colour for emphasis |
| `information-architecture` | Naming, navigation, mirroring the data model |
| `ui-context-and-scope` | Making it clear where the user is and what an action affects |
| `responsive-paradigms` | Mobile / tablet / desktop as different paradigms, not scaled clones |
| `ui-density` | Dense desktop tools vs spacious mobile — match user and platform |
| `sticky-and-fixed-elements` | Persistent headers, mobile bottom toolbars |
| `scroll-areas` | Avoid nested scroll; one axis at a time |

### Stage 4 — Components & interaction
*"How does the user touch this?"*

| Load | When |
|---|---|
| `real-world-metaphors` | Cards, drawers, carousels — borrow from the physical world deliberately |
| `form-design` | Helper text + placeholder + validation; real-time but non-punitive |
| `data-display-and-selection` | Grid / list / table, large hit areas, multi-select |
| `global-toolbar-controls` | Currency, language, region — frequent but low-prominence |
| `notifications-and-recovery` | Toasts vs inline vs banners; every error must be recoverable |

### Stage 5 — UX polish
*"How does this feel to use?"*

| Load | When |
|---|---|
| `nielsen-usability-heuristics` | General audit lens; the foundation |
| `user-flows-and-guided-paths` | Multi-step flows feel coherent (onboarding, checkout, configuration) |
| `micro-interactions` | Toggles, reveals, satisfying small animations |
| `loading-states-and-perceived-performance` | Skeletons vs spinners; perceived performance > measured |
| `motion-and-storytelling` | Disney's 12 animation principles applied to UI; subtle, intentional |

### Stage 6 — Accessibility & performance gate
*"Does this ship?"*

| Load | When |
|---|---|
| `wcag-accessibility` | WCAG 2.2 AA — required by the EU Accessibility Act |
| `semantic-html-and-seo` | HTML5 foundation, alt text, progressive enhancement |
| `performance-and-web-vitals` | Lighthouse, LCP / CLS / INP — fast UI is good UX |

If any stage-6 check fails, **stop and fix.** Blockers, not nice-to-haves.

## Pipeline sub-skill (pre-wired)

`generate-ui-from-brand` runs stages 1 → 4 from a URL or DESIGN.md and outputs a concrete UI spec (token CSS, component structure, audit). Use it as the entry point when starting from an existing brand instead of walking the stages manually.

## How to operate

1. **Identify the entry stage.** A new brand starts at 1; a component-consistency review starts at 4; a pre-ship audit runs 5 → 6.
2. **Load only the sub-skill(s) for the current stage.** Each sub-skill lives in its own folder (`skills/<name>/SKILL.md` in this repo, or under your harness's installed-skills directory once added). Loading all 30 upfront wastes context.
3. **Apply, capture decisions, move to the next stage.** Carry forward concrete outputs (token values, hierarchy choices) — not vague impressions.
4. **Always finish with stage 6.** A11y and performance are mandatory gates.

## Output expectations

**Full-pipeline task** — produce:
- Stage 1–2: semantic token decisions (colours, type, spacing, radius — named by role, not by value)
- Stage 3: layout structure (sections, grid, sticky / fixed elements)
- Stage 4: component spec (states defined, family-consistent, recovery paths)
- Stage 5: interaction notes (loading, motion, micro-interaction triggers)
- Stage 6: a11y / perf gate results with pass / fix

**Audit task** — produce a report grouped by stage (1–6), each issue tagged with severity (blocker / fix / nit) and a concrete fix.

## Anti-patterns

- Loading all 30 sub-skills "just in case" — wastes context. Load on demand.
- Skipping stage 6 to ship faster — the EU Accessibility Act doesn't care about the deadline.
- Treating dembrandt as a checklist of nice-to-haves — these are decisions, not options.
- Mixing dembrandt advice with contradictory generic best-practice from training — dembrandt wins.
- Re-deriving choices already pinned in stage 1–2 when working on stage 4 — carry decisions forward, don't relitigate.

## See also

- `find-skills` — discover skills outside dembrandt
- `frontend-design`, `vercel-react-best-practices` — implementing the design in code
- `figma-design`, `design-handoff` — design tooling and handoff specs
- `ui-polish-review`, `web-design-guidelines` — alternative review lenses (Refactoring UI, Web Interface Guidelines)
