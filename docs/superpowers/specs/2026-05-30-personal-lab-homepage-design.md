# Personal Lab Homepage Design

## Goal

Rebuild the homepage from a保研-oriented profile page into a long-term personal website: a clean Personal Lab that presents Li Shangyi as a computer science student and builder, while still keeping CV, GitHub, projects, notes, timeline, and contact easy to access.

## Visual Direction

- Overall mood: calm, readable, engineering-oriented, personal rather than admissions-focused.
- Palette: white and near-white base, black-gray text, Shandong University red as the primary accent, deep blue and lab green as secondary accents.
- Typography: strong but restrained headings, dense readable body text, small uppercase English labels for sections and console fields.
- Motif: subtle signal lines, lab console rows, project records, and timeline markers. Avoid cyberpunk, large gradients, decorative blobs, and repeated generic cards.

## Information Architecture

1. Header: name, concise navigation, CV action.
2. Hero: name, English identity line, personal positioning, primary links.
3. Lab Console: current status, building, reading, location, and key metrics.
4. Now: short current-state items that can be updated over time.
5. Featured Work: two project records in a project-archive style.
6. Lab Notes: preview entries for future writing, with honest "drafting" states.
7. Timeline: yearly growth path from入学 to current exploration.
8. Contact: email, GitHub, CV, online intro.

## Content Boundaries

- Do not show phone number.
- Keep `cv.pdf` as the downloadable CV.
- Keep project claims consistent with current resume: 2600 IMU samples, single-subject preliminary experiment, 87.2% result, 2026 software innovation national third prize.
- The homepage is not framed as a保研 page; CV and academic material remain accessible but secondary.

## Implementation Notes

- Use the existing Astro single-page structure.
- Extend `src/data/profile.js` with `now`, `labConsole`, `notes`, and `timeline` arrays so future updates are data-only.
- Replace the current resume-like sections with Personal Lab sections.
- Keep existing project images and portrait assets.
- Preserve `/cv.pdf` and `/intro/` links.
