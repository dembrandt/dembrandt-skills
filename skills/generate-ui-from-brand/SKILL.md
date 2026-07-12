---
name: generate-ui-from-brand
description: Pipeline skill — turns a URL or DESIGN.md into a concrete UI structure with decisions already made. Extracts live design tokens, normalizes them into a semantic system, applies UX principles, and outputs an actionable UI spec. Use when building UI for an existing brand from scratch, auditing a design system, or refactoring visual inconsistency.
metadata:
  priority: 9
  requires: "dembrandt"
  docs:
    - "https://dembrandt.com"
    - "https://www.npmjs.com/package/dembrandt"
  promptSignals:
    phrases:
      - "build ui for"
      - "match this brand"
      - "generate ui from"
      - "design system from"
      - "extract and build"
      - "design.md"
      - "brand tokens"
      - "audit design system"
      - "multi-brand"
      - "white-label"
      - "token governance"
      - "consolidate design system"
      - "deprecate component"
      - "deprecate old styles"
      - "pages from different eras"
retrieval:
  aliases:
    - generate ui from brand
    - brand to ui
    - design system pipeline
    - token to component
    - brand audit
    - multi-brand theming
    - white-label
    - token governance
    - design system consolidation
    - component deprecation
  intents:
    - build ui matching an existing brand
    - turn a url into a ui spec
    - audit and fix design system
    - generate design tokens and apply ux rules
    - refactor inconsistent design
    - build many brands from one token system
    - consolidate tokens across brands
    - deprecate unused components
    - migrate old pages to the current design
    - promote a repeated style into a pattern
  examples:
    - build a UI that matches stripe.com
    - generate a UI spec from this brand
    - audit this design system and tell me what to fix
    - I have a DESIGN.md, turn it into a component structure
    - I build sites for many brands, how do I keep tokens consistent
    - which components should we deprecate
---

# generate-ui-from-brand

**Type:** Pipeline / Orchestrator  
**Input:** URL or existing DESIGN.md  
**Output:** Actionable UI spec with decisions made

---

## Step 1 — Extract

**If a URL is provided and Dembrandt MCP is available:**

All MCP extraction tools are async — they return a `job_id` immediately. Poll `get_job_status` until `status` is `"completed"`, then read `result`.

```
{ job_id } = get_design_tokens({ url })
{ result } = get_job_status({ job_id })   // repeat until status === "completed"
```

Run these in sequence (each extraction launches a browser):
```
get_design_tokens, get_color_palette, get_typography, get_component_styles, get_spacing
```

**If Dembrandt MCP is not available, run CLI:**
```bash
npx dembrandt <url> --design-md --crawl 3
```

**If DESIGN.md already exists:** parse it directly — skip extraction.

---

## Step 2 — Normalize Tokens

Do not use raw extracted values directly. Map them to a semantic system first.

### Colours
Identify the role of each extracted colour:

| Role | Token | How to identify |
|---|---|---|
| `color-primary` | Main brand colour | Used on primary buttons, links, key interactive elements |
| `color-secondary` | Supporting brand colour | Used on secondary actions, accents |
| `color-surface` | Background | Page or card background |
| `color-surface-raised` | Elevated surface | Cards, panels, modals |
| `color-border` | Border / divider | Input borders, separators |
| `color-text` | Primary text | Body copy |
| `color-text-secondary` | Secondary text | Labels, metadata, captions |
| `color-error` | Error state | Red — do not assign to any other role |
| `color-warning` | Warning state | Orange/amber — do not assign to any other role |
| `color-success` | Success state | Green — do not assign to any other role |

**Decision rule:** if the extracted palette has more than 2 brand colours competing for `color-primary`, pick the one with highest usage on interactive elements.

### Typography
Map extracted sizes to a scale. Verify ratio coherence — if sizes do not follow a consistent ratio, round them to the nearest modular scale step (base 16px, ratio 1.25 recommended).

| Token | Min size | Role |
|---|---|---|
| `text-base` | 16px | Body copy — never below 16px |
| `text-sm` | 14px | Labels, captions — use sparingly |
| `text-lg` | 20px | Lead paragraph |
| `text-h4` | 25px | Section subheading |
| `text-h3` | 31px | Section heading |
| `text-h2` | 39px | Page subheading |
| `text-h1` | 49px | Page heading |
| `text-display` | 61px | Hero / landing only |

**Decision rule:** if extracted body text is below 16px, override to 16px.

### Spacing
Identify the base spacing unit from the most common small margin/padding value. Derive a scale:

```
base = extracted smallest recurring value (usually 4px or 8px)
scale = base × 1, 2, 3, 4, 6, 8, 12, 16
```

### Border Radius
Extract the most common radius value used on interactive elements (buttons, inputs). This becomes `--radius-button` — applied uniformly to all buttons regardless of variant.

---

## Step 3 — Apply UX Decisions

With normalized tokens, make the following decisions explicitly. Do not leave these open:

### Visual Hierarchy
- Identify the single primary action for the UI being built
- Assign `color-primary` to that action only
- All other actions use neutral or outlined styles
- Apply `cursor: pointer` to all interactive elements

### Gestalt Grouping
- Define spacing between related elements (tight: `space-2`) and between groups (loose: `space-6` or `space-8`)
- Confirm that related controls will be co-located in the layout

### Accessibility (WCAG 2.2 AA)
Run contrast check on normalized tokens:
- `color-text` on `color-surface`: must be ≥ 4.5:1
- `color-text-secondary` on `color-surface`: must be ≥ 4.5:1
- `color-primary` on white/surface (button label): must be ≥ 4.5:1

If any fail, darken or lighten the token to meet the threshold. Document the adjustment.

### Error / Status Colours
- Confirm `color-error` is red and used only for errors
- Confirm `color-warning` is orange/amber and used only for warnings
- If the brand uses orange as a primary colour, it cannot double as a warning — a distinct amber must be defined for warning states

---

## Step 4 — Output UI Spec

Produce a concrete, copy-pasteable output. Choose the format that fits the request:

### Design Token File (CSS)
```css
:root {
  /* Colours */
  --color-primary:          <value>;
  --color-secondary:        <value>;
  --color-surface:          <value>;
  --color-surface-raised:   <value>;
  --color-border:           <value>;
  --color-text:             <value>;
  --color-text-secondary:   <value>;
  --color-error:            <value>;
  --color-warning:          <value>;
  --color-success:          <value>;

  /* Typography */
  --font-sans:    <extracted font family>;
  --text-base:    1rem;
  --text-sm:      0.875rem;
  --text-lg:      1.25rem;
  --text-h4:      1.563rem;
  --text-h3:      1.938rem;
  --text-h2:      2.438rem;
  --text-h1:      3.063rem;

  /* Spacing */
  --space-1:  <base>px;
  --space-2:  <base×2>px;
  --space-4:  <base×4>px;
  --space-6:  <base×6>px;
  --space-8:  <base×8>px;

  /* Borders */
  --radius-button:  <extracted>px;
  --radius-card:    <extracted or radius-button + 2>px;

  /* Elevation */
  --shadow-card:   0 1px 3px rgba(0,0,0,.10), 0 1px 2px rgba(0,0,0,.06);
  --shadow-modal:  0 10px 15px rgba(0,0,0,.08), 0 4px 6px rgba(0,0,0,.05);
}
```

### UX Audit (if auditing an existing UI)
```
CONTRAST ISSUES
  - color-text-secondary on color-surface: X.X:1 (required 4.5:1) → fix: darken to #...

HIERARCHY ISSUES
  - 3 primary buttons on same screen → reduce to 1 primary, 2 secondary

CONSISTENCY ISSUES
  - Button radius varies (4px, 8px, 12px) → standardize to --radius-button: 8px

MISSING STATES
  - No disabled state defined for inputs
  - No error state for form fields

FONT SIZE VIOLATIONS
  - Caption text at 12px → minimum 14px
```

### Component Structure (if generating a layout)
```
Page layout:
  Header (fixed, 56px)
    Logo | Nav | [Global controls: small type]
  
  Main
    Hero section
      H1 (display scale) + lead text + primary CTA (color-primary, full)
    
    Feature grid (3-col)
      Card (shadow-card, radius-card) × 3
        Icon + H4 + body text
    
  Footer
    Links (text-sm, color-text-secondary)
    Language/currency selector (text-sm)

Primary action: CTA button in hero
Secondary actions: nav links, card CTAs (outlined)
Error states: inline, adjacent to field, red text + icon
```

---

## Running This Across Many Brands (Token Architecture & Governance)

Building **several brands from one pipeline**, don't treat each as a fresh start. **One system, many skins:** every brand generates from the same semantic tokens; only primitives (colour, type, radius) change per brand. A fix propagates everywhere.

**Consolidate periodically — token systems drift.** Across many brands and over time, tokens fork, one-off values creep in, and the systems diverge. Schedule a recurring consolidation pass:
- **Re-extract and compare** the live sites (use Dembrandt's extract + drift/compute-drift tooling, plus plain visual inspection and benchmarking against each other and against current design trends and best practice).
- **Fold divergences back** into the shared semantic layer where they should be common; keep genuinely brand-specific values as primitive overrides only.
- **Feed in a point of view.** Consolidation isn't just mechanical de-duplication — bring UX / visual-design opinion and a clear direction for where each product should go, not just where it is.

**When design eras conflict, recency is the tiebreaker.** A product built over years carries pages from different design generations. The newest pages and components are the best available evidence of current design intent — migrate old toward new; never average the eras into a compromise style. Recency is a default, not a verdict: the newest surface can be an unreviewed one-off. Confirm with the user before promoting a style to canonical or marking an old one deprecated.

**Deprecate on touch, not big-bang.** Keep a short list of deprecated styles — the old radius, the old shadow, the retired button variant. When work already touches an old-generation page, lift it to the current style in the same pass. Every touch moves the product one page closer to one system, with no rewrite project on the roadmap.

**Two or three occurrences make a pattern.** When the same visual treatment appears independently in 2–3 places, it is no longer a coincidence — name it, tokenise it, and make it available everywhere. Promoting it is cheaper than a fourth hand-rolled copy. Once promoted, the pattern belongs to the design language: new components may use it as-is or adapt it, as long as the adaptation stays recognisably true to the original.

**Track feature usage and deprecate the dead weight.** The same discipline applies to features, not just tokens: instrument what actually gets used, and **deprecate the features/components with little real usage** rather than maintaining them forever. A shared system stays healthy only if it's pruned — every unused component is drift waiting to happen and a cost on every future change.

---

## Audit Checklist Before Handoff

- [ ] All tokens named semantically, not by value (`color-primary` not `color-blue-600`)
- [ ] Body text ≥ 16px everywhere
- [ ] Contrast ratios verified for all text/background combinations
- [ ] One primary button per view
- [ ] All buttons share `--radius-button`
- [ ] `cursor: pointer` on all interactive elements
- [ ] Error colour reserved exclusively for errors
- [ ] Warning colour (orange) reserved exclusively for warnings
- [ ] Spacing derived from a single base unit
