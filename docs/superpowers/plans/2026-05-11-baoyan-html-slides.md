# Baoyan HTML Slides Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a Shandong University styled HTML self-introduction slide deck for graduate recommendation interviews.

**Architecture:** Add a static `/intro/` page under Astro `public/` so it is copied directly into the site output. Keep it self-contained with local image assets and vanilla JavaScript keyboard navigation.

**Tech Stack:** Astro static site, HTML, CSS, vanilla JavaScript, GitHub Pages.

---

### Task 1: Assets And Static Page

**Files:**
- Create: `public/intro/index.html`
- Create/copy: `public/assets/sdu-emblem.png`
- Create/copy: `public/assets/resume-photo-li-shangyi-red-bg-gpt-image-2.png`

- [ ] Copy the existing SDU emblem and enhanced red-background portrait into `public/assets`.
- [ ] Create `public/intro/index.html` as a single HTML slide deck.
- [ ] Include 8 slides: cover, profile, project line, wearable health project, braille IMU project, skills, awards, closing/contact.
- [ ] Add keyboard navigation with ArrowLeft/ArrowRight, Home/End, and visible slide counter.
- [ ] Add print styles so browser print/export can produce slide pages.

### Task 2: Local Verification

**Files:**
- Verify: `public/intro/index.html`
- Verify: `dist/intro/index.html`

- [ ] Run `npm run build`.
- [ ] Serve the built `dist/` directory locally.
- [ ] Open `/intro/` in a browser and capture screenshots at desktop and mobile widths.
- [ ] Confirm text does not overlap, images load, and navigation works.

### Task 3: Deployment

**Files:**
- Commit: `public/intro/index.html`
- Commit: `public/assets/sdu-emblem.png`
- Commit: `public/assets/resume-photo-li-shangyi-red-bg-gpt-image-2.png`
- Commit: `docs/superpowers/plans/2026-05-11-baoyan-html-slides.md`

- [ ] Run `git status --short`.
- [ ] Commit the slide deck changes.
- [ ] Push to `origin main`.
- [ ] Report the public URL: `https://sdlsy.github.io/intro/`.
