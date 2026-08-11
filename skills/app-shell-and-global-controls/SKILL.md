---
name: app-shell-and-global-controls
description: The persistent shell around an application — top bar, app launcher, status bar — and the global controls it carries — tenant, region, language, currency, units, theme. In an estate of several applications the shell belongs to the estate rather than to any one app, and it is what carries a user between tools. These controls are frequent but not primary, so they use small typography and stay out of the main content hierarchy. Use when designing the top bar, an app switcher, tenant or locale selectors, a status bar, or navigation between separate tools behind one login.
metadata:
  priority: 5
  pathPatterns:
    - "components/**"
    - "src/components/**"
    - "**/*.tsx"
    - "**/*.jsx"
    - "design-system/**"
    - "ui/**"
  promptSignals:
    phrases:
      - "currency"
      - "language"
      - "locale"
      - "region"
      - "global settings"
      - "toolbar"
      - "header controls"
      - "units"
      - "top bar"
      - "app shell"
      - "app launcher"
      - "app switcher"
      - "tenant"
      - "status bar"
retrieval:
  aliases:
    - global settings
    - locale switcher
    - currency selector
    - language switcher
    - toolbar controls
    - header utility bar
    - top bar
    - app shell
    - app launcher
    - app switcher
    - tenant selector
    - status bar
  intents:
    - add currency switcher
    - design language selector
    - place global settings in layout
    - add locale controls to header
    - add an app launcher to the top bar
    - let users move between our internal tools
    - add a tenant or customer selector
    - add a status bar to a heavy tool
  examples:
    - where should the currency selector go
    - add a language switcher to the header
    - design global settings controls for the toolbar
    - how do users get from the shop to the intranet portal
    - where does the customer selector belong
---

# The App Shell and Its Global Controls

The shell is the part of the screen that does not change when the user navigates: the bar across the top, whatever sits in it, and in heavy tools a strip along the bottom. Everything between them belongs to the application. The shell is small, and it carries more weight than its size suggests — it is the only thing a user sees on every screen of every tool.

## The Shell Belongs to the Estate, Not to the App

One company rarely has one application. It has a public shop, a customer portal, an internal admin tool, a dashboard someone built in 2015 with Bootstrap, and a service from 2006 that still runs payroll. The user crosses between them during a working day, and each crossing is where the sense of one company either holds or breaks.

**The rule: the top bar is estate-level furniture. The app owns everything below it.** Same height, same position, same contents, same behaviour in the shop and in the intranet portal. An app that restyles the shared bar to fit its own look has taken something that was not its to change — the bar's job is to be the one fixed point, and it can only do that by being identical everywhere.

This also settles a hierarchy question that otherwise gets argued per team. Anything *above* the application in scope lives in the shell; anything *within* the application lives in the app's own navigation.

| Lives in the shell (above the app) | Lives in the app's own nav (within it) |
|---|---|
| Tenant / customer / organisation | Sections, modules, pages |
| Region or market | Filters and views |
| Language and locale | Entity-level actions |
| Identity, role, sign-out | Feature settings |
| App launcher | Search within this tool |

If a control changes what the *whole estate* shows you, it is a shell control. If it changes what *this tool* shows you, it is not.

## The App Launcher

When a user has access to more than three tools, the shell needs a launcher: one icon in the top bar that opens the full set. It is what replaces the bookmark folder and the link someone pasted in chat two years ago.

- **Show everything the user can reach, and nothing they cannot** — a launcher listing tools that return a 403 teaches users to distrust it
- **Name tools the way people name them out loud**, not by internal project codename
- **Mark what opens in a new context** — a 2006 system that will not share the shell's look should say so, quietly, rather than surprising the user
- **Order by the user's use, then alphabetically** — not by the org chart of who built what

## Tenant, Environment, and the Colour Trap

In a multi-tenant or multi-customer tool, the user must always know whose data is on screen. Two related controls, one important difference.

**Environment is worth a colour.** Production, staging, and a local build should be impossible to confuse, because the cost of the confusion is a real change to real data. A coloured strip or a tinted bar is the right tool, and this is one of the few places where deliberately breaking the calm of the shell is correct.

**Tenant is not.** Tinting the whole UI per customer is a tempting idea that makes every customer a different-looking product, breaks the brand, and quietly wrecks contrast the moment a customer's colour is not one you chose. Show the tenant as a **label** in the shell — name, and an avatar or initials if you have one — not as a theme. If a tenant genuinely needs its own visual identity, that is a white-label decision made once at the product level, not a per-session tint ([[brand-visual-language]]).

Whoever is selected, the shell states it plainly and permanently, and destructive actions repeat it in the confirmation ([[ui-context-and-scope]]).

## The Status Bar

Heavy tools — dispatch boards, data managers, editors people sit in for six hours ([[operational-expert-tool-ui]]) — benefit from a strip along the bottom that carries ambient state. It answers questions the user would otherwise have to go looking for:

connection and sync state · environment · active filters and how many records they match · selection count · last saved · the one keyboard hint that matters here

It is ambient, so it stays quiet: the same small, muted type as the rest of the shell, no animation, no colour except when something is genuinely wrong. A status bar that flashes is a notification in the wrong place ([[notifications-and-recovery]]).

Consumer products almost never need one. If the user is not in the tool long enough to build a habit of glancing down, the strip is just a stolen row of screen.

## What Belongs Here

Global controls affect the entire product experience but are not the user's primary task. They are reached occasionally — once per session or less — and should not compete visually with primary navigation or content.

Typical global toolbar controls:
- **Currency selector** (e-commerce, financial tools)
- **Language / locale switcher**
- **Region or market selector**
- **Unit system** (metric / imperial)
- **Theme toggle** (light / dark)
- **Accessibility preferences** (font size, contrast)

These are distinct from user account settings (which live in a profile menu) and from contextual settings (which live adjacent to the feature they affect).

## Where to Place Them

### Header utility strip
A secondary row above or within the main header, right-aligned. Common on e-commerce and international sites.

```
[Logo]                    [EN | EUR | 🌍]  [Account]  [Cart]
────────────────────────────────────────────────────────────
[Main navigation]
```

### Header right — compact
Inline with the main header, far right, using small typography and minimal visual weight.

```
[Logo]  [Nav items ...]              [EUR ▾]  [EN ▾]  [Account ▾]
```

### Footer
For controls the user sets once and rarely revisits. Language and region selectors frequently appear in footers on large international sites (Airbnb, Apple). Appropriate when the control is truly infrequent.

### Dedicated settings area
For more complex preference sets, a Settings page or panel is cleaner than cramming everything into the toolbar. The toolbar should link to it, not contain it.

## Typography and Visual Treatment

Global toolbar controls are secondary UI — they should not draw the eye away from primary content.

- **Font size: 13–14px** — deliberately smaller than body text (14px maximum per the type scale)
- **Colour: muted** — use a secondary text colour (`--color-text-secondary`), not the primary text colour
- **No bold** — regular weight only
- **Compact spacing** — tighter padding than primary navigation items
- **Separator** — a `|` or thin vertical rule between adjacent controls (language | currency) keeps them grouped without using full button chrome

```css
.toolbar-control {
  font-size: var(--text-sm);       /* 13–14px */
  color: var(--color-text-secondary);
  font-weight: 400;
  padding: 4px 8px;
}
```

## Interaction Pattern

Global controls typically use a **compact dropdown** — clicking the label opens a small popover or select with the available options.

- Show the current value as the trigger label: `EUR ▾`, `EN ▾`
- Use a flag icon + language code for locale, or currency symbol + code for currency
- Keep the option list short — if it exceeds ~20 items, add a search input inside the dropdown
- On selection, apply immediately and confirm with a brief status update (toast or inline update) if the change has a visible effect

## Review Checklist

- [ ] Are global controls placed consistently in one location across all pages?
- [ ] Is the typography smaller and more muted than primary navigation?
- [ ] Does the control show the current value as its label?
- [ ] Is the dropdown or popover compact and keyboard-navigable?
- [ ] Are global controls separated from user account settings?
- [ ] On mobile, are global controls accessible without being prominent? (Often moved to a menu or footer on small screens)
- [ ] Is the shell identical across every application in the estate — same height, position, contents, behaviour?
- [ ] Does every control sit at the right level: estate-scope in the shell, app-scope in the app's own nav?
- [ ] Does the launcher list exactly the tools this user can actually open?
- [ ] Is the current tenant stated as a label rather than applied as a theme?
- [ ] Is the environment (production / staging) unmistakable?
- [ ] In a heavy tool, does the status bar carry ambient state — and stay quiet?
