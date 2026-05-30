# Interactive Signal Lab v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage’s visual surface around an interactive wearable-signal laboratory motif.

**Architecture:** Keep the Astro static page and data module. Add a small project-local browser script for Canvas signal animation, restructure the homepage markup around signal field, pipeline, channel, and event components, and rebuild CSS around open lab panels and pipeline rows.

**Tech Stack:** Astro 6, plain JavaScript, Canvas 2D, CSS, existing static project images.

---

### Task 1: Data Extensions

**Files:**
- Modify: `src/data/profile.js`

- [x] Add `signalPipeline` array with stages Ring, BLE, Android, Cloud, Agent, IMU.
- [x] Keep existing project facts unchanged.
- [x] Verify the data module still supports `tools/build-intro.mjs` by preserving existing fields.

### Task 2: Signal Animation Script

**Files:**
- Create: `public/assets/signal-lab.js`

- [x] Implement a lightweight Canvas animation that draws two waveforms, an IMU trajectory, and floating signal particles.
- [x] Add pointer tracking to subtly alter amplitude and phase.
- [x] Respect `prefers-reduced-motion` by drawing one static frame.
- [x] Avoid dependencies and avoid layout reads inside the animation loop except canvas dimensions.

### Task 3: Homepage Markup

**Files:**
- Modify: `src/pages/index.astro`

- [x] Replace the current Lab Console hero with a full signal-lab hero.
- [x] Add a `signal-field` canvas and code-native nodes for Ring, BLE, Android, Cloud, Agent, IMU.
- [x] Convert Now into signal channels.
- [x] Convert Featured Work into signal pipeline records.
- [x] Convert Timeline into sampling events.
- [x] Keep Contact links and CV/Intro links.

### Task 4: Visual System CSS

**Files:**
- Modify: `src/styles/global.css`

- [x] Rebuild layout around the interactive signal field, pipeline rows, channels, and sampling events.
- [x] Use true white background and restrained red/blue/green accents.
- [x] Ensure desktop first viewport has a clear signal visual anchor.
- [x] Ensure mobile collapses without horizontal overflow.

### Task 5: Verification and Deploy

**Files:**
- Generated only: `dist/`

- [x] Run `npm run build`.
- [x] Run text checks for phone number and old homepage wording.
- [x] Run local dev server.
- [x] Capture desktop and mobile screenshots with Playwright.
- [x] Compare implementation screenshots with concept images using `view_image`.
- [x] Commit and push to `main`.
- [x] Watch GitHub Pages deployment and verify the live homepage.
