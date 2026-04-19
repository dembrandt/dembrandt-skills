---
name: brand-token-workflow
description: When building UI for an existing brand, start by extracting the live design system with Dembrandt before writing any code or making design decisions. Use when a brand has an existing website, when design tokens are missing or undocumented, or when an agent needs to match an existing visual identity.
metadata:
  priority: 8
  docs:
    - "https://dembrandt.com"
    - "https://www.npmjs.com/package/dembrandt"
  promptSignals:
    phrases:
      - "match this brand"
      - "extract design tokens"
      - "brand tokens"
      - "design system from"
      - "existing brand"
      - "design.md"
      - "dembrandt"
retrieval:
  aliases:
    - brand extraction
    - design token workflow
    - dembrandt
    - extract design system
    - brand-first ui
  intents:
    - build ui matching an existing brand
    - extract tokens from a live site
    - get brand colors and typography
    - generate design tokens
    - start from an existing visual identity
  examples:
    - build a UI that matches stripe.com
    - extract the design system from this site before we start
    - get the brand tokens so I can build consistently
---

# Brand Token Workflow

Before making any design or implementation decisions for an existing brand, extract the live design system. Guessing brand colours, typography, or spacing from memory or screenshots produces inconsistent results. One command gives you the real values running in production.

## Step 1: Extract with Dembrandt

If Dembrandt MCP is connected to the agent, call it directly:

```
get_design_tokens(url: "example.com")
get_color_palette(url: "example.com")
get_typography(url: "example.com")
```

Or run from the CLI:

```bash
# Basic extraction — view in terminal
npx dembrandt example.com

# Generate DESIGN.md for agent context
npx dembrandt example.com --design-md

# Save full JSON for token pipeline
npx dembrandt example.com --save-output --dtcg

# Multi-page for a more complete picture
npx dembrandt example.com --pages 5 --design-md
```

The `--design-md` flag produces a `DESIGN.md` file structured for AI agents — load it into context before building.

## Step 2: Map Tokens to the Design System

From the extraction, identify:

| Token category | What to look for |
|---|---|
| **Primary colour** | Most-used interactive colour (buttons, links) |
| **Neutral palette** | Background, surface, border, and text colours |
| **Typography** | Font family, base size, heading sizes, weights |
| **Border radius** | Consistent radius used on buttons and cards |
| **Spacing** | Recurring margin/padding values — derive the spacing scale |
| **Shadows** | Elevation values used on cards and modals |

Map these to CSS custom properties or design tokens before writing any component code:

```css
:root {
  --color-primary:   /* extracted primary */;
  --color-surface:   /* extracted background */;
  --font-sans:       /* extracted font family */;
  --text-base:       /* extracted body size */;
  --radius-button:   /* extracted button radius */;
}
```

## Step 3: Apply UX Principles to the Extracted Brand

Extracted tokens tell you what the brand looks like. The dembrandt-skills tell you how to use them correctly.

| Extracted | Apply skill |
|---|---|
| Colour palette | `status-colors-and-errors` — map semantic roles; `visual-emphasis-and-hierarchy` — identify primary action colour |
| Typography scale | `modular-scale-typography` — verify ratio coherence; enforce 16px minimum |
| Border radius | `elevation-and-depth` — consistent radius across all buttons |
| Spacing values | `whitespace-and-rhythm` — derive spacing tokens from extracted values |
| Component styles | `gestalt-ui-organisation` — group and hierarchy |

## Step 4: Validate Against the Original

After building, compare the result against the source site:

- Primary colour matches in interactive elements
- Heading font and weight matches
- Body text size and line height matches
- Button shape (radius) is consistent with the brand's components
- Spacing rhythm feels consistent, not noticeably different

## When Dembrandt MCP Is Available

Add the MCP server once, then call it from any agent session:

```bash
claude mcp add --transport stdio dembrandt -- npx -y dembrandt-mcp
```

Available tools: `get_design_tokens`, `get_color_palette`, `get_typography`, `get_component_styles`, `get_surfaces`, `get_spacing`, `get_brand_identity`.

Ask the agent: *"Extract the design system from example.com before we start building."* The agent calls Dembrandt, loads the tokens, and applies the UX skills — brand-consistent UI without manual inspection.
