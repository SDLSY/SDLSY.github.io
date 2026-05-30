# Sensor Atlas Homepage Design

## Goal

Rebuild the personal homepage around a memorable visual metaphor: a wearable-sensing atlas. The page should feel less like a dashboard and more like a personal research instrument: a central ring-shaped wearable object, signal routes, labeled capability nodes, and project routes that map the user's work.

## Visual Reference

Concept image: `docs/superpowers/specs/assets/sensor-atlas-homepage-concept.png`

The concept establishes these reusable ideas:

- A light academic atlas background with fine grid lines and route marks.
- A central ring/wearable object as the first-viewport anchor.
- Six surrounding nodes: Ring, BLE, Android, Cloud, Agent, IMU.
- Routes that visually connect sensing, mobile, cloud, and recognition work.
- Below the first viewport, projects become "Atlas Routes" rather than ordinary cards.

## Page Structure

1. Header: SDU emblem, name, compact navigation, CV action.
2. Hero: left identity rail with name, identity line, intro, and GitHub/Email/CV buttons; right full-bleed sensor atlas with a Three.js ring scene and HTML overlay nodes.
3. Atlas Route: a horizontal route section that links the user's two main projects and engineering layers.
4. Work: project records remain readable, but their visual language changes from dashboard cards to route logs with node markers.
5. Notes, Timeline, Contact: keep short and restrained so the first screen stays the most memorable part.

## Interaction

- Desktop: Three.js ring rotates slowly. Pointer movement tilts the ring and subtly shifts route particles.
- Reduced motion: the scene renders as a static ring atlas.
- Mobile: the 3D scene stays visible but shorter, and route nodes stack into a readable sequence.

## Constraints

- Do not expose phone number.
- Do not restore PPTX download.
- Do not use "方向定位" or frame the homepage as a保研 page.
- Keep `/cv.pdf`, `/intro/`, GitHub, and email.
- Avoid dark dashboards, purple gradients, decorative blobs, nested cards, and stock-like imagery.
- Keep the implementation static and deployable on GitHub Pages.
