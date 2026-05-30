# Sensor Atlas Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage into a visually memorable Sensor Atlas with a central wearable ring, signal nodes, route sections, and readable project records.

**Architecture:** Keep Astro as a static single-page site. Add Three.js for the hero's code-native ring scene, replace the current signal-panel hero with an atlas stage, and restyle project sections as route logs. Preserve existing data fields and public links.

**Tech Stack:** Astro 6, Three.js, plain JavaScript, CSS, existing static assets.

---

### Task 1: Add Three.js Dependency

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [x] Install `three` through npm.
- [x] Confirm `package.json` includes `three` under dependencies.

### Task 2: Sensor Atlas Script

**Files:**
- Create: `src/scripts/sensor-atlas.js`
- Modify: `src/pages/index.astro`

- [x] Create a client script that imports `three`.
- [x] Mount the scene into `[data-atlas-scene]`.
- [x] Render a metallic torus as the central ring, inner dark sensor blocks, route particles, and subtle orbit lines.
- [x] Add pointer tilt and reduced-motion handling.
- [x] Replace the old `/assets/signal-lab.js` script reference with the new bundled script.

### Task 3: Homepage Markup

**Files:**
- Modify: `src/pages/index.astro`

- [x] Rename the hero visual from `signal-field` to `atlas-stage`.
- [x] Add overlay nodes for Ring, BLE, Android, Cloud, Agent, IMU.
- [x] Add an "Atlas Routes" section below the hero.
- [x] Keep project, notes, timeline, and contact content readable.

### Task 4: Visual System

**Files:**
- Modify: `src/styles/global.css`

- [x] Rebuild the first viewport around a large atlas stage.
- [x] Add route-node, orbit, atlas-route, and route-log styling.
- [x] Keep a white academic background with red, navy, green, cyan, amber, and violet route accents.
- [x] Make mobile stack cleanly without horizontal overflow.

### Task 5: Verification and Deploy

**Files:**
- Generated: `dist/`

- [x] Run `npm run build`.
- [x] Run text checks for old wording and phone number.
- [x] Start local dev server.
- [x] Capture desktop and mobile screenshots with Playwright.
- [x] Inspect screenshots and the concept image with `view_image`.
- [ ] Commit and push to `main`.
- [ ] Watch GitHub Pages deployment and verify the live page and `cv.pdf`.
