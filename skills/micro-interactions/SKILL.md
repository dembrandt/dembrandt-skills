---
name: micro-interactions
description: Micro-interactions are small, purposeful animations and responses that reward the user and make the interface feel alive — an animated icon, a satisfying toggle, a subtle reveal. Borrowed from the natural world, they add delight without distraction. Use when designing interactive components, success states, toggles, loaders, or any moment worth celebrating.
metadata:
  priority: 6
  pathPatterns:
    - "components/**"
    - "src/components/**"
    - "**/*.css"
    - "**/*.scss"
    - "**/*.tsx"
    - "**/*.jsx"
    - "design-system/**"
  promptSignals:
    phrases:
      - "micro-interaction"
      - "micro interaction"
      - "animated icon"
      - "delight"
      - "satisfying"
      - "toggle animation"
      - "celebrate"
      - "reward"
      - "lottie"
      - "tiny animation"
retrieval:
  aliases:
    - micro-interactions
    - delight
    - animated icons
    - satisfying UI
    - toggle animation
    - success animation
  intents:
    - add a micro-interaction
    - make this feel more satisfying
    - animate this icon
    - celebrate a user action
    - add delight to this component
  examples:
    - make this toggle feel more satisfying
    - add a small animation when the form is submitted
    - animate the checkmark on success
    - make this button feel alive
---

# Micro-Interactions

A micro-interaction is a moment. A checkbox that draws its checkmark. A heart that pulses when liked. A toggle that eases into place with a little overshoot. A confetti burst on completing a goal. These moments are small in duration — 200–600ms — but they communicate that the product was made by people who cared.

The reference is always the natural world. Nothing in nature snaps instantly. Everything has weight, momentum, and a moment of settling.

---

## What Makes a Good Micro-Interaction

A micro-interaction earns its place when it:

1. **Confirms an action** — makes the result of a click, tap, or input unmistakably clear
2. **Rewards a milestone** — celebrates something the user worked toward
3. **Reveals something** — unfolds information in a way that aids understanding
4. **Adds texture** — makes an otherwise flat moment feel physical and real

It fails when it:
- Delays the user (animation blocks the next action)
- Repeats too often (becomes noise, not signal)
- Exists only for decoration (no information is conveyed)

---

## Natural World as Reference

Physical objects have inertia, springiness, and weight. UI that borrows these properties feels intuitive because it matches expectations built over a lifetime.

| Natural behaviour | UI equivalent |
|---|---|
| A door swinging to rest | Toggle that overshoots slightly before settling |
| Water dripping | Staggered list item reveals |
| A rubber band snapping back | Pull-to-refresh bounce |
| A leaf falling | Gentle fade + drift downward on dismiss |
| A light switching on | Icon that briefly blooms brighter before settling |
| Ripples from a stone | Tap ripple expanding from touch point |
| A stamp pressing paper | Button scale-down on press, spring back on release |

The motion should feel *inevitable* — as if the element has physical properties and cannot behave any other way.

---

## Patterns

### Animated Icons

Icons that animate on trigger communicate state change more vividly than a static swap.

**Checkmark draw-on:** A checkmark that draws itself from start to end point on completion.
```css
@keyframes check-draw {
  from { stroke-dashoffset: 20; }
  to   { stroke-dashoffset: 0; }
}
.checkmark path {
  stroke-dasharray: 20;
  animation: check-draw 300ms ease-out forwards;
}
```

**Heart pulse on like:** Scale up slightly then settle back.
```css
@keyframes heart-pulse {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.25); }
  100% { transform: scale(1); }
}
```

**Hamburger → close morphing:** Lines animate to form an × when a menu opens.

**Bell shake on notification:** A brief oscillating rotation.

**Loading spinner:** Rotate with easing rather than linear — a spring rotation feels alive; linear feels mechanical.

### Toggle / Switch

A toggle should feel like a physical switch, not a state change.

```css
.toggle-thumb {
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
  /* cubic-bezier with overshoot — the thumb slides and bounces slightly */
}
.toggle:checked .toggle-thumb {
  transform: translateX(20px);
}
```

The cubic-bezier `(0.34, 1.56, 0.64, 1)` produces a spring effect — the thumb overshoots and settles. This is the difference between a switch that feels cheap and one that feels premium.

### Success / Completion

Mark moments of genuine completion — a form submitted, an onboarding step finished, a goal reached.

- **Checkmark animation** that draws on
- **Subtle confetti** for high-value milestones (first purchase, account created, goal achieved) — use sparingly, never for routine actions
- **Green fill transition** on a progress bar completing
- **Number count-up** when a stat reaches its final value

### Reveal and Disclosure

Accordions, tooltips, and popovers that open via a small reveal feel more considered than appearing instantly.

```css
.accordion-content {
  overflow: hidden;
  max-height: 0;
  transition: max-height 250ms ease-out;
}
.accordion-content.open {
  max-height: 500px; /* generous upper bound */
}
```

Content that slides down as if gravity is pulling it into place feels natural. Content that blinks into existence does not.

### Button Press Feedback

```css
.btn {
  transition: transform 80ms ease-out, box-shadow 80ms ease-out;
}
.btn:active {
  transform: scale(0.97);
  box-shadow: var(--shadow-xs); /* reduces as button presses "into" surface */
}
```

The button briefly presses into the page on click — a physical metaphor for pressing a real button.

### Skeleton → Content Transition

When content loads, do not flash it in. Fade it over the skeleton at 150–200ms. The skeleton dissolves, the content arrives.

```css
.content-loaded {
  animation: fade-in 150ms ease-out;
}
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

---

## Restraint

Micro-interactions are seasoning, not the meal.

- **Once per trigger** — a checkmark animates once on save, not on every render
- **Skip on repeat actions** — a bulk delete of 50 items should not animate 50 times
- **No blocking animations** — the user must be able to continue immediately; the animation runs alongside, not instead of, the result
- **Respect `prefers-reduced-motion`** — always

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

**Ask for each interaction:** does this make the result clearer, or just more visually busy? If the answer is the latter, remove it.

---

## Review Checklist

- [ ] Does each micro-interaction confirm an action, reward a milestone, or aid understanding?
- [ ] Is the duration 200–600ms — not instant, not slow enough to feel like waiting?
- [ ] Does motion reference natural physics (spring, ease-out, overshoot) rather than linear timing?
- [ ] Is the animation non-blocking — the user can continue immediately?
- [ ] Is `prefers-reduced-motion` respected?
- [ ] Are high-effort celebrations (confetti, bloom effects) reserved for genuine milestones?
- [ ] Do animated icons clearly communicate the state change they represent?
- [ ] Does the toggle/switch use a spring easing curve, not linear?
