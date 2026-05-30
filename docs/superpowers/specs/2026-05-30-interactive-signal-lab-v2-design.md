# Interactive Signal Lab v2 Design

## Goal

Give the personal homepage a memorable visual idea: the site should feel like an interactive signal laboratory built around wearable sensing, not a cleaner resume page.

## Accepted Visual Concept

- Hero concept: `docs/superpowers/specs/assets/interactive-signal-lab-hero.png`
- Downstream concept: `docs/superpowers/specs/assets/interactive-signal-lab-sections.png`

The concepts define the direction, not raster assets to embed. The implemented page must use code-native HTML/CSS/Canvas for text, controls, signal paths, nodes, and interactions.

## Visual System

- Background: true white with a very light technical grid.
- Primary motif: a large signal field with waveforms, IMU trajectories, and connected nodes.
- Accent colors: Shandong red `#A60B16`, deep blue `#173F7A`, lab green `#167C66`.
- Typography: large, confident hero name; compact labels; readable Chinese and English body text.
- Containers: open sections, thin rails, pipeline rows, and lab panels. Avoid generic repeated cards and nested cards.

## Required Sections

1. Header: brand, navigation, CV action.
2. Hero: name, identity, concise intro, GitHub/Email/CV actions, interactive signal field.
3. Signal Pipeline: Ring -> BLE -> Android -> Cloud -> Agent -> IMU.
4. Now: three current tasks rendered as active signal channels.
5. Featured Work: projects rendered as horizontal signal pipelines with visual artifacts and role/signal/output metadata.
6. Lab Notes: experiment-log style notes.
7. Timeline: sampling events on a signal trace.
8. Contact: compact contact terminal.

## Interaction

- Hero signal field should animate gently using Canvas.
- Mouse movement should subtly bend or energize the signal field.
- Respect `prefers-reduced-motion`.
- No required controls should be inert; links remain normal anchors.

## Content Boundaries

- No phone number.
- Keep `/cv.pdf`, `/intro/`, GitHub, and email.
- Do not reframe the homepage as a保研 page.
- Preserve project factual constraints: 2600 samples, single-subject preliminary experiment, 87.2% result, 2026 software innovation national third prize.
