---
name: layout-paradigms-and-consistency
description: A layout is not a neutral container — choosing the right layout paradigm (feed, board, table, canvas, master-detail, dashboard, gallery, timeline, map, single-focus, narrative long-scroll) is a design decision that shapes how content is understood. Landing and marketing pages get a product narrative framework — hook, problem, USP, value props, proof points, how it works, stakes, CTA — used to review whether the page carries a visitor to a decision. Once chosen, the same paradigm and page skeleton must be reused consistently across the application so users build one mental model. This is consistency at the macro scale, above component and token consistency. Use when deciding the overall structure of a screen, designing page templates, or reviewing whether screens across a product feel like one coherent application.
metadata:
  priority: 8
  pathPatterns:
    - "app/**"
    - "pages/**"
    - "src/pages/**"
    - "src/app/**"
    - "**/layouts/**"
    - "**/templates/**"
    - "**/*.tsx"
    - "**/*.jsx"
    - "**/*.vue"
    - "**/*.svelte"
    - "design-system/**"
  promptSignals:
    phrases:
      - "layout"
      - "page layout"
      - "screen layout"
      - "layout paradigm"
      - "page template"
      - "app structure"
      - "dashboard layout"
      - "feed vs"
      - "master-detail"
      - "kanban"
      - "consistent layout"
      - "page structure"
      - "landing page"
      - "marketing page"
      - "hero section"
      - "product narrative"
      - "value proposition"
      - "proof points"
      - "call to action"
      - "saas landing"
  retrieval:
    aliases:
      - layout paradigm
      - layout archetype
      - page template
      - screen structure
      - layout consistency
      - cross-page consistency
      - app-wide layout
      - macro consistency
      - landing page structure
      - product narrative framework
      - marketing page review
    intents:
      - choose the right layout for this content
      - decide the overall structure of a screen
      - design reusable page templates
      - keep layouts consistent across the app
      - review whether screens feel like one product
      - structure a landing page so it converts
      - review whether a marketing page tells a coherent story
    examples:
      - should this be a feed, a table, or a board
      - what layout fits this kind of content
      - my detail pages are all structured differently
      - the app feels like several different products stitched together
      - design a consistent page template for these screens
      - review my landing page
      - our hero section is not converting
      - does this marketing page tell the right story
---

# Layout Paradigms and Consistency

A layout is not a neutral container you pour content into. The layout paradigm you choose is part of the argument about how the content should be read, compared, and acted on. Two products showing the same data can communicate completely different things depending on whether that data is a feed, a table, or a board.

This skill operates at the **macro scale** of consistency. It sits above [[component-family-consistency]] (the *meso* scale — buttons and inputs sharing one DNA) and above token-level consistency like [[button-states]], [[status-colors-and-errors]], and [[modular-scale-typography]] (the *micro* scale). Consistency is not one rule — it is the same discipline applied at three altitudes.

## Consistency operates at three scales

| Scale | What stays consistent | Where it lives |
|---|---|---|
| **Estate** | Brand chassis and shared shell across *separate applications* | *this skill, Part 3* + [[app-shell]] |
| **Macro** | Layout paradigm and page skeleton across screens | *this skill* |
| **Meso** | Component family — shared radius, height, colour logic | [[component-family-consistency]], [[brand-visual-language]] |
| **Micro** | States, tokens, type scale, semantic colours | [[button-states]], [[status-colors-and-errors]], [[modular-scale-typography]], [[algorithmic-color-palette]] |

A product can have perfect tokens and a coherent component family and still feel broken — because every screen is laid out differently and the user re-orients on every navigation. Macro consistency is what makes a product feel like *one* application.

---

## Layout is downstream — it serves something upstream

A layout paradigm is never the starting point. It is a *consequence* of decisions made earlier, and a *means* to ends defined elsewhere. Choosing a layout in isolation — "let's use a dashboard because dashboards look impressive" — is the most common way layouts go wrong.

**It flows down from information architecture.** The data model and structure ([[information-architecture]]) largely *determine* the candidate paradigms. Entities that move through states want a board; records compared on shared fields want a table; a hierarchy of containers and items wants master–detail. If the IA says "tasks belong to projects and have a status," the layout has already half-decided itself. Get the IA right first, then read the paradigm off it.

**It serves the brand and the story.** The same content can be laid out to feel calm or urgent, premium or utilitarian, editorial or operational. Layout is one of the loudest carriers of brand tone ([[brand-visual-language]]) and of the narrative you want the user to experience ([[motion-and-storytelling]]). A spacious single-focus layout tells a different story than a dense dashboard of the same data. Ask: *what should the user feel here, and what are we trying to say?* — then pick the paradigm that says it.

**It serves the user experience.** Ultimately the test is the user's task and context: what are they trying to do, how often, on what device, under what pressure ([[ui-density]], [[responsive-paradigms]]). The paradigm that best serves the task wins, even when a flashier one is available.

So the order is: **IA and brand intent first → derive the paradigm that supports them → then apply consistency.** Part 1 is how you derive it; Part 2 is how you keep it.

---

## Part 1 — Choose the paradigm that fits the content

Start from the nature of the content and the primary task, not from a default grid. Ask: *what relationship between items matters most here?* The answer points to a paradigm.

| Content nature / primary task | Layout paradigm | Why it fits | When NOT to use it |
|---|---|---|---|
| A stream of recent, homogeneous items, consumed top-down | **Feed** | Recency and flow are the message; infinite, low-commitment scanning | When items must be compared field-by-field, or order is not temporal |
| Items moving through stages of a workflow | **Board / Kanban** | Columns make state visible and transitions physical (drag) | When there are no discrete stages, or items have many attributes to compare |
| Many records compared across the same fields | **Table** | Aligned columns make values directly comparable; sort/filter is natural | When records are visual or heterogeneous, or on small screens |
| Browsing visual, heterogeneous items | **Gallery / Grid** | The artifact itself is the content; thumbnails carry meaning | When precise values matter more than the visual |
| A list plus the detail of the selected item | **Master–detail / Split** | Keeps context while drilling in; fast scanning + deep reading | On mobile where two panes don't fit (collapse to drill-down) |
| At-a-glance overview of many metrics | **Dashboard** | Spatial arrangement lets the eye triage what needs attention | When the user has one task, not monitoring — it becomes noise |
| Spatial relationships, free arrangement | **Canvas** | The user's spatial model *is* the data (diagrams, design, maps) | When content is inherently linear or ordered |
| Events ordered in time | **Timeline** | Time is the primary axis; gaps and density are meaningful | When time is just one of many equal attributes |
| Geographic data | **Map** | Location is the primary dimension | When location is incidental to the task |
| One object, one task, full attention | **Single-focus / Wizard** | Removes everything but the current decision | When the user needs surrounding context to decide → see [[user-flows-and-guided-paths]] |
| Persuading a stranger who has not bought in yet | **Narrative long-scroll** | Sequence *is* the argument — each section earns the next scroll | Inside the product, where the user has already committed and wants to work |

The paradigm interacts with other layout skills: it must group coherently ([[gestalt-ui-organisation]]), establish one clear emphasis ([[visual-emphasis-and-hierarchy]]), reflect the data model and naming ([[information-architecture]]), and adapt — not merely shrink — across breakpoints ([[responsive-paradigms]]). Where a real-world metaphor reinforces the paradigm (a board feels like cards on a wall), lean on it ([[real-world-metaphors]]).

**A view can offer more than one paradigm.** A collection of records is legitimately a table *and* a gallery *and* a board, chosen by the user per task — see [[data-display-and-selection]]. The point is that each option is a *deliberate* fit, not an accident.

### The narrative long-scroll — the product narrative framework

Marketing and landing pages are the one paradigm where **sequence is the argument.** Every other paradigm arranges content the user already wants; this one earns each scroll from someone who has committed to nothing. Judge a landing page by how it carries a stranger through these beats — not by whether the sections look good in isolation.

| # | Beat | The job | Typical treatment |
|---|---|---|---|
| 1 | **Hook** | Stop the *right* visitor and make them want to keep reading | Large headline, generous whitespace, supporting line, product shot / video / demo alongside |
| 2 | **Problem empathy** | Prove you understand the visitor's current situation | Named pains — slow, costly, manual, unreliable, scattered, hard to source |
| 3 | **USP** | What it is, who it's for, why it's different — in one sentence | One clear statement, given room |
| 4 | **Value propositions** | The 3–5 differentiated benefits | Benefit phrasing, not feature or spec nouns |
| 5 | **Proof points** | A reason to believe each claim | Whatever counts as evidence in the field — customers, figures, case studies, certifications, test data, materials, stock and delivery times, before/after |
| 6 | **How it works** | Remove uncertainty about mechanism and effort | Three steps, in the field's own terms — order/fit/measure, connect/process/result, browse/try/return |
| 7 | **Stakes** | What it costs to do nothing | Downtime continues, competitors move, time and money leak, the problem recurs |
| 8 | **Call to action** | The obvious next step | A verb the visitor can picture doing |

The beats are the same everywhere — B2B and B2C, software and physical goods, a global manufacturer and a local shop. What changes is their **weight and their evidence.** An industrial or spare-parts buyer wants proof, specification, fit and availability, and will read further to get it; a fashion or consumer page carries the hook in the imagery itself and reaches the CTA in far less scrolling; an internal tool's page can skip persuasion but still owes the visitor *what this is, why it exists, how to start*. Decide which beats carry the load for **this** audience before deciding what the page looks like.

**The hook is a question, not a summary.** A good hero states one value and leaves the visitor thinking *"I want to see how this works."* It gets that from size and air, not decoration ([[visual-emphasis-and-hierarchy]]). If the short headline is not explanatory enough alone, add a smaller supporting line under it rather than lengthening the headline. Pair it with the product actually running — screenshot, video, or live demo, never a mockup of behaviour the product does not have ([[authentic-product-representation]]).

**Value propositions are benefits, not features.** "AI dashboard" and "14 mm hardened steel" are nouns; "the numbers that matter at a glance" and "survives a season of gravel roads" are what the visitor gets. A line that could sit unchanged on a competitor's page is not a value proposition.

**Every claim carries proof.** The bolder the claim, the harder the evidence. What counts as hard evidence is set by the field, not by fashion — a test report and a fitment guarantee do the work a customer logo does elsewhere. Unproven superlatives cost credibility on the claims that *are* true.

**Stakes come from consequence, not pressure.** State what standing still costs. Manufactured scarcity — fake countdowns, invented "3 spots left" — spends the trust the rest of the page just built.

**The CTA names the action.** "Learn more" describes nothing. "Start free", "Check fitment", "Request a quote", "Find your size" tell the visitor what happens next, and hand off to a flow that delivers exactly that ([[user-flows-and-guided-paths]]).

#### The question chain

The narrative works because it answers the visitor's questions in the order they arise:

> What is this? → Is it for me? → Why is it better? → Can I trust it? → How does it work? → How much effort is this? → What do I do next?

This is the sharpest test here. Walk the page top to bottom and mark where each answer lands. If the visitor has to hunt or scroll back, the narrative is broken however good the sections look. Answering early is a defect too — pricing above the fold answers *"how much effort?"* to someone still asking *"what is this?"*.

#### What the strongest pages share

The best pages in every sector — a developer platform, a machine-tool supplier, a clothing label, a regional garage — converge on the same discipline:

- **One message per viewport** — each section answers exactly one question in the chain.
- **No more copy than the beat needs** — persuasion sections stay short and carried by whitespace, while specification and proof sections are allowed the detail a serious buyer came for.
- **Real product imagery and video** over abstract illustration or stock photography.
- **Benefit to proof, fast** — claims do not stack up unsupported.
- **The CTA repeats down the page**, so the visitor can act the moment they are convinced.
- **One visual rhythm** — section spacing, type scale, and imagery treatment repeat ([[modular-scale-typography]], [[brand-visual-language]]).
- **Restrained motion** that supports the sequence instead of competing with it ([[motion-and-storytelling]]).

Density here is the deliberate *opposite* of an expert tool ([[ui-density]]). A landing page serves someone who owes you no attention; a dashboard serves someone who has already committed. Do not import habits from one into the other.

---

## Part 2 — Reuse the paradigm consistently across the application

Once a paradigm is chosen for a kind of content, every screen of that kind uses the same paradigm and the same page skeleton. This is what lets a user learn the product once.

### Page skeletons should be templates, not one-offs

Define a small set of page templates and reuse them:

- **List / index page** — same position for title, filters, view-mode toggle, primary action, and the collection itself, on *every* list page.
- **Detail page** — same skeleton for every detail screen: header (name + status + primary actions) → key attributes → related content → activity. When a user learns one detail page, they have learned them all.
- **Editor / form page** — consistent placement of the form body, validation summary, and the save/cancel actions → see [[form-design]].
- **Settings page** — consistent section structure and control alignment.

### What must stay in the same place across pages

- **Navigation** — global nav, breadcrumbs, and back affordances do not move between screens ([[ui-context-and-scope]]).
- **Primary action** — the main CTA sits in the same region on comparable pages, not top-right on one and bottom-left on the next.
- **Persistent chrome** — headers and toolbars behave consistently ([[sticky-and-fixed-elements]]).
- **Status and feedback** — toasts, banners, and inline errors appear in consistent locations ([[notifications-and-recovery]]).

This is **internal consistency** in Nielsen's terms (heuristic 4) — see [[nielsen-usability-heuristics]]. Familiar patterns within one application beat novel ones on every screen.

### Balance feature weight across pages

Pages of the same kind should carry a **roughly comparable amount of feature and content weight.** When one page keeps accreting features while a sibling stays thin, the imbalance is usually a *structural* signal, not a content-writing problem — it means features should be **consolidated or split** so the load is distributed. Aim to keep page count and page lengths balanced over the long run, not perfectly equal on any given day.

**When a page is too thin** — it has too little to justify its own screen:
- Fold it back into a neighbouring page, or pull a related feature onto it.
- On marketing/general surfaces, adding an image, a short video, or links to related pages is a legitimate way to give a light page substance.
- In **professional / expert tools**, resist decorative filler — a power user reads it as noise. Prefer **small contextual pulls of genuinely relevant information from elsewhere** (a related metric, a recent activity item, a linked entity) over image/video padding.

**When a page is too heavy** — it has accreted more than one screen's worth:
- **Split it out** into its own page (often the same trigger as reaching H4–H6 headings — see [[modular-scale-typography]]).
- **Move** part of it to where it more naturally belongs.
- **Shrink the feature** by crystallising its core idea — cut to the one thing it must do, rather than exposing every option (pairs with the hide-don't-serve-up-front decision in [[information-architecture]]).

### When to deviate — and how

Consistency is the default, not a cage. Deviate when a screen's task genuinely differs (a focused checkout step legitimately drops the global nav). When you deviate:

- Do it for a clear reason tied to the task, not for visual variety.
- Deviate *completely and obviously* (a distinct mode), never subtly — a layout that is almost-but-not-quite the standard reads as a bug.
- Keep the deviation itself consistent: if focus mode hides nav, every focus-mode screen hides it the same way.

---

## Part 3 — Consistency across an estate of separate applications

Parts 1 and 2 assume one application. Most organisations of any size do not have one — they have an estate: a public site, a shop, a customer portal, an internal admin tool, and older systems nobody wants to touch. Different codebases, different teams, different decades. The user crosses between them in a single working day, and internally-facing software carries the brand experience just as externally-facing software does — the employee is a user too.

Keep the shell in proportion while doing this. A user's sense of a company forms across everything they meet — search results and the favicon in them, social channels, advertising, partner and affiliate pages, app store listings, transactional email, invoices, support chat, error pages, status pages, job ads. The product's chrome is one slice of that, and often not the largest. Which is also the good news: a separate application frequently needs no more than the right favicon, two or three of the brand's colours, and the logotype to belong to the family.

The instinct is to make them all look the same. That is the wrong target, and chasing it is how estate-wide design programmes die: the admin tool gets marketing's generous whitespace and becomes unusable, or the marketing site gets the admin tool's density and becomes lifeless.

### Not every application is from the same tree

A B2B internal detail view for master data and a B2C campaign page from the same company *should* look different. They serve different people doing different things under different pressure. What must not differ is the layer beneath the styling.

**The brand chassis — identical everywhere, no exceptions.** A difference here is a defect:

- Logotype and its clear space
- Brand hue and the semantic status colours — red means the same thing in every tool ([[status-colors-and-errors]])
- Typeface family
- Focus ring treatment ([[wcag-accessibility]])
- The look of a destructive action and the shape of its confirmation ([[information-architecture]])
- Date, number, and currency formatting
- The voice of system messages ([[notifications-and-recovery]])
- The accessibility floor

**The expression layer — varies deliberately by audience and task.** A difference here is a design decision, and it should be a stated one:

| Axis | Marketing / B2C surface | Internal / operational tool |
|---|---|---|
| Density | Generous, one idea per screenful | Dense, maximum information per glance ([[ui-density]]) |
| Type scale ratio | 1.333–1.5, expressive display sizes | 1.2, tight and functional ([[modular-scale-typography]]) |
| Imagery | Central — photography, illustration, video | Near-absent; the data is the picture |
| Motion budget | Storytelling and reveal ([[motion-and-storytelling]]) | Feedback only — confirm the action, nothing more |
| Error tone | Reassuring, plain language | Terse and actionable: *Row 412: VAT number missing* |
| Time and numbers | Friendly and relative — *2 days ago* | Absolute, with timezone; someone is on a phone call about it |
| Empty states | An onboarding moment | *No results — widen the filter* |
| Keyboard | Rarely needed | Shortcuts are a requirement for trained users ([[operational-expert-tool-ui]]) |
| Performance focus | LCP — first impression ([[performance-and-web-vitals]]) | INP — the thousandth interaction of the shift |
| Role and permission | Never surfaced | Stated plainly; the user needs to know what they may do ([[ui-context-and-scope]]) |

**The layout paradigm and the page skeleton belong to this layer, not to the chassis.** An aggregating landing page, an operational tool, and an authoring surface should not share a skeleton, and forcing one on them is how estate programmes make things worse: the binding constraint is the design system — tokens, components, states, behaviours — not the shape of the page.

The line worth holding: **when the task differs in kind, the paradigm should differ; when it differs only in content, it should not.** A dashboard that gathers services, a tool someone operates for a shift, and an editor are different in kind. Two lists of different entities are not.

Applications that *are* close relatives — two internal tools for the same team, a portal and its mobile companion — should share the expression layer too, not merely the chassis. Establish the family before styling a new member: if a near-sibling exists, inherit from it rather than deriving a second time from the brand.

### The coherence ladder

A 2003 terminal application will not be rebranded, and a design programme that demands it will stall on that one system. Coherence is not on or off — it is a ladder, and each application is placed on the rung it can realistically reach.

| Rung | What it means | Typical cost |
|---|---|---|
| **0 — Identity** | Right logo, name, favicon, page title. The user can tell whose software this is. | Hours |
| **1 — Chrome** | The shared shell: top bar, sign-in, typeface ([[app-shell]]) | Days |
| **2 — Tokens** | Brand colours and spacing mapped onto whatever variables the app already has | Days to weeks |
| **3 — Components** | Real shared components — buttons, inputs, tables ([[component-family-consistency]]) | Months |

An old Bootstrap application often reaches rung 2 quickly, because Bootstrap already has variables to override. The terminal application stops at rung 0, and that is the correct answer rather than a failure. Deciding the target rung per application, out loud, is what stops the programme from becoming an all-or-nothing rewrite that never starts.

### New applications keep appearing — that is a design problem too

Teams start a fresh codebase because joining the existing one is harder than starting over. When identity, tenancy, and permissions are not genuinely shared, a new tool behind a new login is the path of least resistance, and every one of them adds an account to maintain and a look to drift.

The design-side answer is to make joining cheaper than starting over: a shared shell that drops in, tokens that can be consumed without adopting a framework, and one account that already works. The measure of an estate's design system is not how beautiful its flagship is — it is whether the next tool someone builds joins it by default.

---

## Review Checklist

- [ ] Is the layout paradigm a deliberate fit for the content's nature and primary task — not a default grid?
- [ ] Could you state in one sentence *why* this paradigm beats the alternatives for this content?
- [ ] Do all screens of the same kind (all detail pages, all list pages) share one page skeleton?
- [ ] Does navigation stay in the same place across screens?
- [ ] Does the primary action sit in the same region on comparable pages?
- [ ] If a user learns one detail page, have they effectively learned them all?
- [ ] Do sibling pages carry comparable feature/content weight — with over-heavy pages split and over-thin pages consolidated, rather than padded with filler (especially in expert tools)?
- [ ] Where a screen deviates from the standard template, is there a clear task-driven reason — and is the deviation obvious rather than subtle?
- [ ] Does the product feel like one application rather than several stitched together?

Across an estate of separate applications:

- [ ] Is the brand chassis identical in every application — logo, brand hue, semantic colours, typeface, focus ring, formatting, system voice?
- [ ] Where applications differ, is it a stated decision about audience and task rather than accumulated drift?
- [ ] Does a new application inherit from its nearest sibling instead of re-deriving from the brand?
- [ ] Does every application have a target rung on the coherence ladder — including the legacy ones that stop at 0?
- [ ] Do internal tools carry the brand experience, not just the customer-facing ones?
- [ ] Is joining the estate cheaper for a team than starting a fresh codebase?

For a landing or marketing page:

- [ ] Does the page carry all eight beats — hook, problem, USP, value props, proof, how it works, stakes, CTA?
- [ ] Are the beats weighted for *this* audience and sector, with evidence of the kind that field actually accepts?
- [ ] Does the hero state one value and leave the visitor wanting to see the product run?
- [ ] Are the value propositions benefits rather than feature nouns, and does every substantial claim have proof beside it?
- [ ] Walking top to bottom, is each question in the chain answered where it arises — none early, none requiring a scroll back?
- [ ] Does the CTA name the action, and is urgency built from real consequence rather than manufactured scarcity?
