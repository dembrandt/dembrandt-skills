# dembrandt-skills

UX and design system skills for AI agents. Install once, and your agent knows how to design.

## What this is

A set of opinionated, practical skills covering the fundamentals of good UI: hierarchy, typography, accessibility, interaction patterns. Based on established principles (Gestalt, Nielsen, WCAG) and real design practice.

Use with Claude Code or any agent harness that supports the Open Agent Skills format.

## Skills

| Skill | What it covers |
|---|---|
| `gestalt-ui-organisation` | Group related controls visually: proximity, similarity, common region |
| `modular-scale-typography` | Ratio-based type scales, minimum sizes, context-aware usage |
| `nielsen-usability-heuristics` | 10 usability principles with review checklists |
| `ui-context-and-scope` | Hierarchy, breadcrumbs, colour regions, scope communication |
| `elevation-and-depth` | Shadow scale, border-radius consistency, card and modal patterns |
| `real-world-metaphors` | Cards, carousels, drawers: when to use and how |
| `status-colors-and-errors` | Minimal semantic colours, error recovery, error prevention |
| `user-flows-and-guided-paths` | Wizards, purchase flows, onboarding sequences |
| `visual-emphasis-and-hierarchy` | Primary actions, size and colour as emphasis, one CTA per view |
| `wcag-accessibility` | WCAG 2.2 AA / EN 301 549: contrast, keyboard, ARIA, disabled element exceptions |
| `scroll-areas` | Avoid inner scroll, one axis only, user-controlled |
| `sticky-and-fixed-elements` | Headers, bottom toolbars, z-index tokens |
| `global-toolbar-controls` | Currency, language, locale: placement and typography |
| `generate-ui-from-brand` | Pipeline: URL or DESIGN.md → normalized tokens → UX decisions → UI spec |
| `color-mode-and-theme` | Light vs dark vs combined: brand tone, use context, when to offer a theme selector |
| `responsive-paradigms` | Mobile/tablet/desktop as different paradigms: navigation, sections, sticky behaviour |
| `brand-visual-language` | Shape language: rounded vs angular, icon style, typography tone, visual consistency |
| `ui-density` | Match information density to platform and user type: compact, default, spacious |
| `motion-and-storytelling` | Disney principles, cinematic language, and comic conventions applied subtly to UI motion |
| `component-family-consistency` | Buttons, inputs, pills, calendars share border-radius, colour logic, height, and spacing |
| `algorithmic-color-palette` | Derive hover/active states and brand-tinted greys algorithmically from brand colours |
| `button-states` | All six interactive states: rest, hover, active, focus, disabled, loading — derived algorithmically |

## Install

```bash
npx skills add dembrandt/dembrandt-skills
```

## License

MIT
