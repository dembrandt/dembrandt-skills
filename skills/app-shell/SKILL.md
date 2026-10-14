---
name: app-shell
description: Top bar, sidebar rail, app launcher, tenant and environment cue, status bar. Use when designing the persistent shell, a collapsible sidebar, or navigation between apps behind one login.
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
      - "app shell"
      - "top bar"
      - "app launcher"
      - "app switcher"
      - "tenant"
      - "status bar"
      - "environment banner"
      - "sidebar"
      - "side nav"
      - "navigation rail"
      - "collapsible sidebar"
retrieval:
  aliases:
    - app shell
    - top bar
    - app launcher
    - app switcher
    - tenant selector
    - status bar
    - environment cue
    - sidebar
    - side navigation
    - navigation rail
    - collapsed sidebar
  intents:
    - add an app launcher to the top bar
    - let users move between our internal tools
    - add a tenant or customer selector
    - add a status bar to a heavy tool
    - make staging impossible to confuse with production
    - add a collapsible sidebar
    - decide what goes in the sidebar footer
  examples:
    - how do users get from the shop to the intranet portal
    - where does the customer selector belong
    - what goes in the top bar across all our apps
    - should the sidebar collapse to icons
    - where does sign-out go in a sidebar app
---
# The App Shell

The shell is the part of the screen that does not change when the user navigates: the bar across the top, whatever sits in it, and in heavy tools a strip along the bottom. Everything between them belongs to the application. The shell is small, and it carries more weight than its size suggests — it is the only thing a user sees on every screen of every tool.

## The Shell Belongs to the Estate, Not to the App

One company rarely has one application. It has a public site, a shop, a customer portal, an internal admin tool, and something older that nobody wants to touch but that people depend on. The user crosses between them during a working day, and each crossing is where the sense of one company either holds or breaks.

**The rule: the top bar is estate-level furniture. The app owns everything below it.** An app that restyles the shared bar to fit its own look has taken something that was not its to change — the bar's job is to be the one fixed point.

But *fixed* is not the same as *full*. What the shell contains may shrink to whatever of its jobs are still unanswered here; what remains is identical — same position, same behaviour, same wording. Quantity flexes, treatment does not.

This also settles a hierarchy question that otherwise gets argued per team. Anything *above* the application in scope lives in the shell; anything *within* the application lives in the app's own navigation.

| Lives in the shell (above the app) | Lives in the app's own nav (within it) |
|---|---|
| Tenant / customer / organisation | Sections, modules, pages |
| Region or market | Filters and views |
| Language and locale | Entity-level actions |
| Identity, role, sign-out | Feature settings |
| App launcher | Search within this tool |

If a control changes what the *whole estate* shows you, it is a shell control. If it changes what *this tool* shows you, it is not.

## How Small the Shell May Get

A sub-application entered only from its parent has one estate-level job left — the way back — so the shell may collapse to a single line: one label, one icon, on the same background as the content, no bar and no chrome. Everything else the shell would carry was already answered upstream, and repeating it is noise.

The condition is the entry path, and it is the whole rule:

- **Entry is always through the parent** — a return affordance is enough.
- **Entry can be direct or lateral** — a deep link from chat, a bookmark, an email button, another tool — then a return affordance points at nothing, because browser history is not hierarchy. Carry a home affordance instead. It can still be one icon.

**Name it by destination, not by action.** `← Dashboard` stays true when history and hierarchy disagree; `← Back` does not. Back is a history concept, up is a hierarchy concept, and a shell that conflates them lies exactly when the user is most lost.

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

## The Sidebar

A single application often has no top bar at all: a sidebar down the left edge is the whole shell. Then the sidebar carries both jobs — the estate-level controls from the table above, and the app's own sections — and it must keep them visibly apart. Sections go in the middle and scroll if they must. Estate-level controls go in a footer that is pinned to the bottom, so the user always finds them in the same place regardless of how many sections the app grows. The whole sidebar is sticky to the viewport: a long page scrolls under it and the nav never leaves.

**Order the footer by what it does.** Scope first (tenant, location, customer — the control that decides *what* the app shows), then preferences (language, theme — *how* it shows it), then identity and sign-out, separated by a rule. Scope and preferences are different decisions and read wrong when mixed in one row; preferences can share a row, since they are small and cost no height.

**Logo at the top, inside the sidebar.** Lockup when expanded, mark alone when collapsed, with the clear space the brand asks for. Padding is what shrinks the logo, so solve the padding from the exclusion zone rather than picking a round number.

**The logo links home.** In a sidebar app the logo is the one way back to the front door, so it is a link, not a picture. Swap the asset with the theme rather than filtering it; a logo built for a dark rail rarely survives inversion.

**Identity lives in one place.** Either the sidebar footer or the page header, never both. Put it in the footer when the sidebar is the only persistent chrome; move it to the page header when every page already has one and the footer is better spent on scope.

**Show what sign-in unlocks, hide what role unlocks.** An item the user could reach by signing in stays visible with a quiet mark, because it is an invitation. An item gated by role is removed, because a link that returns a 403 teaches the user to distrust the whole nav.

### Collapsing to a rail

A sidebar that collapses to an icon rail gives the content column back the expanded width minus the rail, which in a canvas or table tool is the difference between seeing the work and scrolling it. Four rules make the rail usable instead of merely narrow:

- **Pick icons that can carry the label alone.** When the rail is collapsed the icon is the whole affordance, so it is chosen for recognition, not decoration. A generic circle is not a navigation item. Keep the label in the DOM as screen-reader text and repeat it in a `title` tooltip.
- **Hide group headers, do not shrink them.** A category header has no icon and nothing to collapse to. Hiding it is honest; an orphaned "ADM" is not, and a visually hidden header announces structure the rail no longer shows.
- **Start collapsed on narrow viewports, then obey the user.** On a tablet-width viewport (below about 1024px) the rail is the right default. Once the user has chosen a side, that choice wins everywhere and persists across sessions — a sidebar that springs open on every reload is a sidebar the user stops trusting. Keep open tabs in step, so two windows do not overwrite each other's preference.
- **Put the toggle on the edge, clear of the content's own controls.** A toggle that straddles the seam, half over the sidebar and half over the content, is found without being looked for. Measure what rises from the bottom of the content area — canvas controls, a floating button — and place the toggle above the taller stack. Because it sits on two backgrounds, its hover must be opaque; a translucent hover washes over both.

### On a phone

On a phone-width viewport (below about 768px) the sidebar is not narrowed, it is gone, and a drawer takes its place ([[modal-and-overlay-patterns]]). The drawer is the same sidebar — same logo row, same items in the same order, same footer — so the user keeps one mental model across devices ([[responsive-paradigms]]). What changes is the entry: a floating trigger in the bottom corner, inside the safe-area insets so a home indicator never covers it. The drawer scrims the page, locks body scroll, and closes itself on navigation; a drawer that stays open after a tap has made the user do the closing.

Active state is a background shift plus weight, never colour alone ([[status-colors-and-errors]]). A dark rail inside a light app is fine, and common, but it needs its own surface tokens — base, raised, sunken — rather than borrowing the content area's ([[surface-separation]]).

## Review Checklist

- [ ] Is the shell in the same position, with the same behaviour and wording, across every application in the estate?
- [ ] Where it is reduced, is the reduction justified by the entry path rather than by one app's taste?
- [ ] Does a return affordance name its destination rather than saying "back"?
- [ ] Does every control sit at the right level: estate-scope in the shell, app-scope in the app's own nav?
- [ ] Does the launcher list exactly the tools this user can actually open?
- [ ] Is the current tenant stated as a label rather than applied as a theme?
- [ ] Is the environment (production / staging) unmistakable?
- [ ] In a heavy tool, does the status bar carry ambient state — and stay quiet?
- [ ] In a sidebar app, are estate-level controls in a pinned footer, ordered scope → preferences → identity?
- [ ] Is the logo a link home, swapped per theme rather than inverted?
- [ ] Is the active item marked by background and weight, not colour alone?
- [ ] Collapsed to a rail, does every item still read from its icon, with its label kept for screen readers?
- [ ] Does the collapse preference persist across reloads and tabs, and start collapsed only on narrow viewports?
- [ ] On a phone, is the drawer the same sidebar, opened from a safe-area-aware trigger, and does it close on navigation?
- [ ] Are sign-in-gated items shown with a quiet mark, and role-gated items removed?
