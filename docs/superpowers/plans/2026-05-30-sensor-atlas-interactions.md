# Sensor Atlas Interactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Sensor Atlas hero meaningfully interactive through node highlighting, click-to-lock modes, route explanation, scroll-driven route reveal, and stronger pointer response.

**Architecture:** Keep the existing Astro page and Three.js scene. Add data attributes and a small readout panel in the Astro markup, CSS states for active/selected nodes and route stops, and a focused state machine inside `src/scripts/sensor-atlas.js` that coordinates DOM state and Three.js route materials.

**Tech Stack:** Astro 6, Three.js, plain JavaScript, CSS.

---

### Task 1: Markup Hooks

**Files:**
- Modify: `src/pages/index.astro`

- [x] Add `data-atlas-stage` to the hero atlas container.
- [x] Add `data-atlas-node` and `tabindex="0"` to each atlas node.
- [x] Add a live route readout panel with `data-atlas-readout`.
- [x] Add `data-route-stop` to each route stop in the Atlas Routes section.

### Task 2: CSS Interaction States

**Files:**
- Modify: `src/styles/global.css`

- [x] Add hover/focus styles for `.atlas-node`.
- [x] Add `.is-active` and `.is-muted` states for atlas nodes.
- [x] Add `.is-revealed` and `.is-active` states for route stops.
- [x] Add readout panel styling that remains readable on desktop and hides compactly on mobile.

### Task 3: Three.js State Machine

**Files:**
- Modify: `src/scripts/sensor-atlas.js`

- [x] Add node metadata for Ring, BLE, Android, Cloud, Agent, IMU.
- [x] Store route lines and route particles with a key per node.
- [x] Implement hover to temporarily activate a route.
- [x] Implement click and Enter/Space to lock a route.
- [x] Implement pointer-strength response that speeds particles near the atlas.
- [x] Implement IntersectionObserver for scroll-revealed route stops.
- [x] Keep reduced-motion as static rendering with DOM interactions still available.

### Task 4: Verification and Deploy

**Files:**
- Generated: `dist/`

- [x] Run `npm run build`.
- [x] Run `npm audit --omit=dev`.
- [x] Run text checks for old wording and phone number.
- [x] Capture desktop and mobile screenshots with Playwright.
- [x] Verify route nodes are focusable and the page title remains `Sensor Atlas`.
- [x] Commit and push to `main`.
- [x] Watch GitHub Pages deployment and verify the live page.
