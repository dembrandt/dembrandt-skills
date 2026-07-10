---
name: ui-context-and-scope
description: UI should make it immediately clear where the user is, what context they are operating in, and what their actions will affect. Use lines, regions, colour areas, breadcrumbs, and scope labels to communicate hierarchy and context — especially in deep navigation structures or multi-section layouts.
metadata:
  priority: 7
  pathPatterns:
    - "components/**"
    - "src/components/**"
    - "**/*.tsx"
    - "**/*.jsx"
    - "design-system/**"
    - "ui/**"
  promptSignals:
    phrases:
      - "breadcrumb"
      - "navigation hierarchy"
      - "context"
      - "scope"
      - "where am I"
      - "information architecture"
      - "user orientation"
      - "login"
      - "sign in"
      - "authentication"
      - "auth screen"
      - "act on behalf"
      - "impersonation"
      - "view as"
      - "internal tool"
retrieval:
  aliases:
    - context clarity
    - navigation hierarchy
    - breadcrumbs
    - scope communication
    - user orientation
    - information architecture
    - login screen
    - authentication UI
    - acting on behalf
    - impersonation banner
    - internal vs external tool
  intents:
    - show where the user is
    - communicate scope of changes
    - design deep navigation
    - make hierarchy clear
    - orient the user
    - design a login or auth screen
    - indicate acting on behalf of another account
    - distinguish an internal tool from the customer app
  examples:
    - make it clear which section the user is editing
    - add breadcrumbs to this deep navigation
    - show the user what their changes will affect
    - design a login page for this product
    - show that an admin is acting as a customer
    - make this internal tool distinct from the public app
---

# UI Context and Scope

Users need to know three things at all times:
1. **Where am I?** — current location in the product hierarchy
2. **What context am I in?** — which section, record, or workspace is active
3. **What will my actions affect?** — scope of changes before committing them

When these are unclear, users make mistakes, feel lost, and lose trust in the product.

## Communicating Hierarchy with Visual Structure

### Lines and Dividers
Horizontal rules and borders signal the boundary between sections. Use them to separate content areas that belong to different contexts — not just for decoration.

- A line between a header and content says "the content below belongs to this header"
- A sidebar border says "this is a different region with a different purpose"
- Avoid overusing dividers — proximity and whitespace should do most of the work; dividers reinforce where space alone is insufficient

### Colour Regions and Background Fills
Background colour is one of the strongest signals for "you are now in a different area."

- Use a distinct background shade for sidebars, panels, or contextual drawers
- Active or selected regions benefit from a subtle fill to confirm "this is the current context"
- When a user's changes are scoped to a specific section, that section should be visually bounded — border, fill, or both — so the scope is self-evident before the user commits

### Section Labels and Context Headers
Every major region should be able to answer "what am I?" without the user having to read surrounding content.

- Name sections with the user's vocabulary, not the system's
- Show the active entity: "Editing: Invoice #2041" or "Settings for: Workspace" — not just "Settings"
- In forms that affect a specific record, show the record name prominently in the form header

## Navigating Depth

### Breadcrumbs
Use breadcrumbs when the product has three or more levels of hierarchy, or when users can arrive at a page from multiple paths.

```
Home > Projects > Website Redesign > Tasks > #142 Fix header
```

- Each breadcrumb item should be a clickable link back to that level
- The current page is the last item — not a link, just text
- On mobile, collapse to show only the immediate parent: `← Website Redesign`
- Breadcrumbs do not replace primary navigation — they complement it

### Search and Filter as Navigation
In products with large or dynamic content trees, search reduces the cognitive cost of navigating depth.

- Global search for finding any entity across the product
- Contextual filters for narrowing within the current scope
- Search results should show enough context to distinguish similar items (e.g. project name alongside task name)

## Scope Communication Before Action

When a change, setting, or action affects a specific scope, that scope must be communicated before the user commits — not discovered afterward.

- **Labels:** "This setting applies to: this workspace only" / "All users will see this change"
- **Visual bounding:** Highlight or outline the affected region when the user is about to edit it
- **Confirmation copy:** Destructive or wide-scope actions should state the scope in the confirmation dialog ("Delete this project and all 47 tasks inside it?")

## Acting on Behalf of Someone Else

Whenever the user is viewing or changing data **as another user, customer, or account** — impersonation, admin "view as", support acting on a customer's behalf — the interface must make that unmistakably obvious the entire time, not just at the moment they enter the mode.

- **Persistent, unmissable indicator:** a coloured banner or bar that stays on screen the whole session ("You are acting as **Acme Corp** — changes affect their account"), not a toast that disappears.
- **Whose view is this:** name the account/customer being acted upon, and make it visually distinct from the operator's own normal context so the two can never be confused.
- **An obvious exit:** a clear "Return to your account / Stop acting as…" control, always visible.

The risk being designed against is an operator making a change believing they're in their own context when they're really in a customer's — scope confusion here causes real damage.

## Authentication Is a Trust Context

The login / sign-up screen is where the user hands over a password — an inherently **scary moment**, and the point where they most need to feel they're in the right, safe place. Design it as a trust surface, not an afterthought:

- **It must feel unmistakably like the brand.** A generic or off-brand login page reads as suspicious ("is this really them, or a phishing page?"). Carry the full brand identity — logo, colours, type, tone — into the auth screens.
- **The URL must live in the customer's own ecosystem.** Host auth on the customer's domain or a clear subdomain — `app.customer.com`, `customer.com/login` — not a random third-party URL. Keep the path shallow and legible (at most `domain/path/path`, only meaningful query params). Users read the address bar to judge safety; an opaque redirect chain reads as phishing.

## Distinguish Internal Tools from External Products

Internal / back-office software should carry a deliberate visual "quirk" — a distinct accent colour, an env badge, a marked header — that makes it **impossible to mistake for the customer-facing app**. This prevents an operator from confusing an internal admin surface with the external product (or a staging environment with production). The cue should be persistent and immediately legible, not hidden in a settings page.

## Review Checklist

- [ ] Can the user always identify which section or record they are currently editing?
- [ ] Are colour regions or borders used consistently to separate distinct contexts?
- [ ] Does navigation deeper than 2 levels use breadcrumbs or a clear back path?
- [ ] Do action confirmation dialogs state the scope of what will be affected?
- [ ] When acting on behalf of another account, is there a persistent, unmissable indicator naming who, plus an always-visible exit?
- [ ] Do internal/back-office tools carry a persistent visual cue that distinguishes them from the customer-facing app (and staging from production)?
- [ ] Do auth screens feel fully on-brand, and does the login URL sit in the customer's own domain/subdomain with a shallow, legible path?
- [ ] Are section titles written in user vocabulary, naming the active entity where relevant?
- [ ] Is global search available when the content structure is too large to browse?
