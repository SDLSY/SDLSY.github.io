# Personal Lab Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage into a Personal Lab website that feels long-term, personal, and engineering-oriented rather than only保研-facing.

**Architecture:** Keep the existing Astro static site. Store homepage content in `src/data/profile.js`, compose the page in `src/pages/index.astro`, and rebuild the visual system in `src/styles/global.css`.

**Tech Stack:** Astro 6, plain JavaScript data module, CSS, existing static assets under `public/assets`.

---

### Task 1: Document and Data Model

**Files:**
- Modify: `src/data/profile.js`
- Keep: existing `projects`, `skills`, `awards`

- [ ] Add Personal Lab content arrays:
  - `identityLine`
  - `intro`
  - `labConsole`
  - `now`
  - `notes`
  - `timeline`
- [ ] Keep existing factual content unchanged unless only the presentation label changes.
- [ ] Verify the data module imports with `npm run build`.

### Task 2: Astro Page Structure

**Files:**
- Modify: `src/pages/index.astro`

- [ ] Replace保研-style Hero copy with Personal Lab hero copy.
- [ ] Replace the old Profile/Skills/Awards sequence with:
  - Hero
  - Lab Console
  - Now
  - Featured Work
  - Lab Notes
  - Timeline
  - Contact
- [ ] Keep links to `/cv.pdf`, `/intro/`, email, and GitHub.
- [ ] Ensure no phone number appears.

### Task 3: Visual System

**Files:**
- Modify: `src/styles/global.css`

- [ ] Rebuild design tokens around white, Shandong red, deep blue, and lab green.
- [ ] Implement open Personal Lab layout with console rows, project records, notes, timeline, and responsive collapse.
- [ ] Keep cards at 8px radius or less.
- [ ] Add restrained hover and focus states.
- [ ] Verify desktop and mobile layout with browser screenshots.

### Task 4: Build, Verify, Deploy

**Files:**
- Generated: `dist/`
- Commit changed source files and docs.

- [ ] Run `npm run build`.
- [ ] Run text checks for removed保研-only wording and sensitive phone number.
- [ ] Run local browser preview at desktop and mobile widths.
- [ ] Commit and push to `main`.
- [ ] Watch GitHub Pages deployment.
- [ ] Verify `https://sdlsy.github.io/` after deployment.
