# dembrandt-skills

[![skills.sh installs](https://skills.sh/b/dembrandt/dembrandt-skills)](https://skills.sh/dembrandt/dembrandt-skills)

![Enterprise UX for every agent](dembrandt-skills.png)

UX and design-system skills for AI agents. Install once, and your agent knows how to design.

```bash
npx skills add dembrandt/dembrandt-skills --all
```

`--all` installs every skill at once. They load only when a prompt needs them, so there is no runtime cost to having them all. Want to pick by hand? Drop `--all` for an interactive picker. Add `--global` to install across all your projects.

## How to use

A skill is just instructions your agent reads. You don't run it. The agent reads each skill's description and loads the matching one when your request fits.

1. Install with the command above, then start a new session. Skills load at session start.
2. Ask in plain words. "What layout fits a list of orders?" or "Does this pass WCAG AA?" loads the right skill on its own.
3. For a full pass, ask broadly ("review this screen", "build a UI from this brand") and the `dembrandt` skill runs the whole pipeline.

No special syntax. You can name a skill to force it ("use the layout skill"), but you rarely need to. Run `npx skills list` to see what's installed.

## Connect the engine (optional)

Most skills are pure knowledge and work on their own. Two of them, `extract-design` and `generate-ui-from-brand`, read **real** design tokens off a live website. That needs the [`dembrandt`](https://npm.im/dembrandt) engine. Connect it as an MCP server. There is nothing to install first, `npx` fetches it on first run:

```json
{
  "mcpServers": {
    "dembrandt": {
      "command": "npx",
      "args": ["-y", "--package", "dembrandt", "dembrandt-mcp"]
    }
  }
}
```

Add this to your agent's MCP config. In Claude Code, this repo already ships a `.mcp.json`, so it connects automatically when you work in the project. Prefer the CLI? `npx -y dembrandt https://stripe.com` works without any config.

## What this is

Opinionated, practical skills covering the fundamentals of good UI: hierarchy, typography, accessibility, interaction patterns. Distilled from working across hundreds of products and domains: enterprise tools, SaaS, financial platforms, e-commerce, consumer apps, and more. The kind of UX knowledge that usually lives with a senior designer or consultant.

Works with Claude Code, Cursor, Codex, GitHub Copilot and any agent that reads the Open Agent Skills format.

## Where the rules come from

The base skills cover the fundamentals. The rest comes from field work. When a real interface gets something wrong, we record the failure, the fix, and why the obvious fix was wrong. Once the rule stands on its own, without the product that produced it, it goes into the skill it belongs to, with what breaks otherwise. New judgements land every few weeks.

## Try it

Ask in your own words. The right skill loads on its own.

| Ask | What loads |
|---|---|
| "I have one brand colour, #133174. Build me a full UI palette." | `algorithmic-color-palette` |
| "My font sizes feel random. Set up a proper type scale." | `modular-scale-typography` |
| "Review this interface for usability issues." | `nielsen-usability-heuristics` |
| "Our buttons, inputs and badges look like three different products." | `component-family-consistency` |
| "Design a multi-step onboarding flow for a B2B SaaS tool." | `user-flows-and-guided-paths` |
| "Does this pass WCAG 2.2 AA?" | `wcag-accessibility` |
| "Extract the design system from stripe.com." | `extract-design`, needs the [engine](#connect-the-engine-optional) |

## Skills

**Brand & Visual Identity**

| Skill | What it covers |
|---|---|
| `brand-visual-language` | Shape language, icon style, typography tone |
| `color-mode-and-theme` | Light vs dark vs combined, when to offer a theme selector |
| `marketing-vs-product-system` | What a marketing site and the product may differ on, and what is drift |
| `algorithmic-color-palette` | Derive states and brand-tinted greys from brand colours |

**Design Tokens & Scales**

| Skill | What it covers |
|---|---|
| `modular-scale-typography` | Ratio-based type scales, minimum sizes, context-aware usage |
| `elevation-and-depth` | Shadow scale, border-radius, card and modal patterns |
| `surface-separation` | One separation strategy per surface; opacity as state, not tint |
| `button-states` | Six states: rest, hover, active, focus, disabled, loading |
| `component-family-consistency` | Buttons, inputs, pills: shared radius, colour, height |
| `sizing-units` | px vs rem vs relative: which values move when the user enlarges text |

**Layout & Structure**

| Skill | What it covers |
|---|---|
| `layout-paradigms-and-consistency` | Choose the layout paradigm that fits the content; reuse the page skeleton across screens |
| `gestalt-ui-organisation` | Group related controls: proximity, similarity, common region |
| `visual-emphasis-and-hierarchy` | One CTA per view, colour and size as emphasis |
| `information-architecture` | Naming, mental models, data UI, confirm dialogs |
| `ui-context-and-scope` | Hierarchy, breadcrumbs, colour regions, scope communication |
| `responsive-paradigms` | Mobile/tablet/desktop: nav, sections, sticky behaviour |
| `ui-density` | Match density to platform and user type |
| `sticky-and-fixed-elements` | Headers, bottom toolbars, z-index tokens |
| `scroll-areas` | Avoid inner scroll, one axis only, user-controlled |

**Components & Interaction**

| Skill | What it covers |
|---|---|
| `real-world-metaphors` | Cards, carousels, drawers: when to use and how |
| `form-design` | Helper text, placeholder, validation, submit state |
| `tab-navigation` | Tab types, overflow handling, roving tabindex, ARIA tablist, URL state |
| `modal-and-overlay-patterns` | Overlay hierarchy, focus trap, dismiss rules, destructive confirms |
| `data-display-and-selection` | Grid/list/table, large hit areas, mass actions |
| `repeated-component-alignment` | Repeated components as slot models: equal size, pinned anchors, clamp + recover text |
| `operational-expert-tool-ui` | Dense, workflow-driven UIs for trained daily B2B users |
| `coordinated-data-views` | Keep a table and a visual view (map, diagram, chart) in sync |
| `domain-expert-configuration` | Expose solver/algorithm settings in domain language |
| `app-shell` | Top bar, app launcher, tenant and environment cue, status bar: one shell across an estate |
| `global-toolbar-controls` | Currency, language, region and unit selectors: frequent but not primary |
| `notifications-and-recovery` | Toasts, banners, retry, undo: always a path forward |
| `status-colors-and-errors` | Minimal semantic colours, error recovery, prevention |

**UX Principles**

| Skill | What it covers |
|---|---|
| `nielsen-usability-heuristics` | 10 usability principles with review checklists |
| `wcag-accessibility` | WCAG 2.2 AA / EN 301 549: contrast, keyboard, ARIA |
| `user-flows-and-guided-paths` | Wizards, purchase flows, onboarding sequences |
| `authentic-product-representation` | Real content and real output over staged mockups and marketing chrome |
| `micro-interactions` | Animated icons, toggles, reveals, celebrations |
| `loading-states-and-perceived-performance` | Spinners, skeleton screens, and staggered entry animations |
| `motion-and-storytelling` | Disney principles and cinematic language in UI |

**Technical Foundation**

| Skill | What it covers |
|---|---|
| `semantic-html-and-seo` | HTML5, alt texts, Open Graph, progressive enhancement |
| `performance-and-web-vitals` | Lighthouse audit, LCP, CLS, INP, images, fonts, JS loading |

**Pipeline & Orchestration**

| Skill | What it covers |
|---|---|
| `extract-design` | Extract real design tokens from any live website via Dembrandt CLI or MCP (requires dembrandt ≥ 0.23.1) |
| `clone-website` | Rebuild a live page 1:1 from capture and computed styles, into Figma, Penpot or code |
| `generate-ui-from-brand` | URL or DESIGN.md to tokens to decisions to UI spec (requires dembrandt ≥ 0.23.1) |
| `dembrandt` | Full 6-stage UX orchestrator: brand, tokens, layout, components, polish, a11y gate |

## Ecosystem

These skills are one half of [dembrandt](https://github.com/dembrandt/dembrandt). The engine is the other.

The engine reads a live URL and returns the brand as it actually renders: colours, type, spacing, shadows, components, as W3C design tokens, in seconds. Run it once and you have a baseline. Run it in CI and every pull request is checked against that baseline, so drift shows up before it ships. No guessing hex codes, no digging through DevTools.

The skills give the agent the judgment to use those tokens well: which layout fits the content, when a modal is wrong, what the type scale should be, whether the result passes WCAG 2.2 AA. Tokens say what the brand is. Skills say what good looks like.

Both are free and open source. The engine runs in your terminal and inside Claude Code, Cursor and Windsurf via MCP.

**Start with the engine: `npm i -g dembrandt`, then `dembrandt https://your-site.com`. → [dembrandt.com](https://dembrandt.com)**

## License

MIT
