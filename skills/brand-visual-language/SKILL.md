---
name: brand-visual-language
description: A brand's visual tone — playful or serious, rounded or angular — should be consistent across all UI elements. Shape language in typography, border-radius, and iconography communicates personality before a single word is read. Use when establishing a design system, choosing icon libraries, setting border-radius tokens, or reviewing visual consistency.
metadata:
  priority: 7
  pathPatterns:
    - "**/*.css"
    - "**/*.scss"
    - "**/tokens/**"
    - "**/theme/**"
    - "tailwind.config.*"
    - "design-system/**"
    - "components/**"
  promptSignals:
    phrases:
      - "brand tone"
      - "visual language"
      - "rounded"
      - "angular"
      - "icon style"
      - "border radius"
      - "playful"
      - "serious"
      - "brand personality"
retrieval:
  aliases:
    - brand visual language
    - shape language
    - brand tone
    - rounded vs angular
    - icon style
    - visual personality
  intents:
    - establish brand visual style
    - choose border radius
    - pick icon library
    - match ui to brand personality
    - make design feel consistent
  examples:
    - should we use rounded or sharp corners
    - what icon style fits this brand
    - make the UI feel more playful
    - this feels too corporate, how do I soften it
---

# Brand Visual Language

Visual shape communicates personality. A rounded corner says something different to the user than a sharp one — and that message arrives before they read a single word. The shapes in typography, border-radius, and iconography should tell a consistent story.

## Shape Language

| Shape | Tone | Associated with |
|---|---|---|
| **Rounded, pill-shaped** | Friendly, approachable, playful, modern | Consumer apps, health, kids, lifestyle, social |
| **Softly rounded (8–12px)** | Professional, warm, accessible | SaaS, productivity, general B2B |
| **Lightly rounded (2–4px)** | Precise, structured, efficient | Enterprise tools, finance, data platforms |
| **Sharp / no radius** | Technical, serious, authoritative | Developer tools, security, industrial |

The radius chosen for buttons sets the expectation for the entire product. Every component — cards, inputs, modals, badges — should follow the same radius logic.

## Reading Shape from an Existing Brand

Before choosing a radius, look at the brand's existing materials:

- **Logo:** Is it rounded, geometric, or angular? The logo's shapes are intentional brand decisions.
- **Product photography or illustration style:** Rounded, bubbly illustrations signal a different personality than sharp, technical diagrams.
- **Typography:** A geometric sans-serif (Circular, Futura) reads differently than a humanist sans (Inter, Söhne) or a sharp editorial serif.
- **Competitor landscape:** Sometimes being the slightly softer option in a sharp market, or the more structured option in a playful market, is the differentiator.

## Typography and Shape

Typeface shapes carry the same tonal signals:

| Type style | Tone |
|---|---|
| Geometric sans (circular letterforms) | Modern, clean, slightly playful |
| Humanist sans (varied stroke widths) | Warm, readable, professional |
| Grotesque sans (neutral, utilitarian) | Serious, efficient, no-frills |
| Serif | Authoritative, established, editorial |
| Rounded sans | Friendly, approachable, informal |
| Monospace | Technical, developer-facing, precise |

The typeface and the border-radius should not contradict each other. A rounded, friendly typeface paired with sharp 0px corners creates visual dissonance.

## Iconography

Icon style must match the brand's shape language. Mixing icon styles — some thin, some bold, some filled, some outlined — breaks visual cohesion even when individual icons are correct.

| Icon style | Tone | Use when |
|---|---|---|
| **Thin / outline (1–1.5px stroke)** | Minimal, elegant, refined | Luxury, editorial, premium SaaS |
| **Regular outline (2px stroke)** | Balanced, professional | General SaaS, productivity tools |
| **Bold / thick (2.5–3px stroke)** | Strong, clear, accessible | Consumer apps, mobile-first, accessibility focus |
| **Filled** | Solid, confident, clear at small sizes | Dashboard indicators, status icons, mobile nav |
| **Rounded corners on icon paths** | Friendly, approachable | Consumer, lifestyle, health |
| **Sharp corners on icon paths** | Technical, precise | Developer tools, finance, data |

**Rule:** Use one icon library and one weight throughout. If mixing is unavoidable (e.g. a specialised icon not available in the chosen library), match stroke width and corner style manually.

## Consistency Across Elements

All shape-bearing elements should follow the same visual logic:

| Element | Applies shape language via |
|---|---|
| Buttons | `--radius-button` |
| Cards | `--radius-card` (same or slightly larger than button) |
| Inputs | `--radius-input` (typically same as button) |
| Badges / tags | Can be more rounded than buttons — pill shape is common |
| Modals / drawers | `--radius-modal` (often larger, 12–16px) |
| Avatars | Always fully round (`--radius-full`) |
| Icons | Stroke weight and corner style match brand |
| Illustrations | Shape style consistent with icon style |

## Review Checklist

- [ ] Does the border-radius token match the brand's shape language (logo, illustrations, photography)?
- [ ] Is the same radius logic applied to buttons, inputs, and cards?
- [ ] Does the typeface tone match the overall brand personality?
- [ ] Is a single icon library used consistently throughout?
- [ ] Do icons match the brand in stroke weight (thin for refined, bold for accessible)?
- [ ] Are rounded icon corners used for friendly brands and sharp corners for technical brands?
- [ ] Is there no visual contradiction between typeface style and shape choices (e.g. rounded type + sharp cards)?
