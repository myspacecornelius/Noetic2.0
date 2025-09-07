# Claude Creative Guide — Noetic 2.0 (Investor‑Grade)

This is an intentionally opinionated creative brief for elevating presentation quality without destabilizing data flow or routes. Treat it as direction, not a checklist.

**Non‑negotiables**
- Do not change data shapes, IDs, or the select → preview → export wiring.
- Keep charts client‑only where they already are; avoid SSR regressions.
- MDX top level stays import/export‑only.

**Atmosphere**
- Intent: quiet confidence, studio graphite, precision tools. Zero gloss.
- Mood: carbon, instrument panel, lab‑grade. Accents feel electrical, not neon.

**Visual North Star**
- Surfaces: no pure white slabs. Pages, cards, tables, and previews sit on deep neutrals.
- Type: strong hierarchy; body copy is soft gray, not stark white.
- Brand: minimal mark; color accents restrained and consistent.
- Rhythm: generous negative space, 8px base grid, predictable gutters.

**Core Tokens (directional)**
- Background: `#0B0C0F`
- Surface 1 / 2: `#14161A` / `#1C1F25`
- Text / Muted: `#E8EAF0` / `#A7AAB3`
- Primary (Noetic): `#667EEA` with tints `#7D8CF1`, `#95A0F3`
- Accent (Infrared): `#D13A5B` (never full‑screen fills)
- Success / Warn / Danger: desaturated `#2FB47C` / `#E2A64A` / `#E26666`
- Borders: `#252932` single‑weight; increase only for emphasis

**Typography (feel, not rules)**
- Headings: heavy (800), slightly tight tracking, minimal shadow, no gradient fills.
- Body: 400–500 weight, −1% letter spacing, max 70ch, 1.55–1.7 line height.
- Links: default muted → on hover brand primary; underline only on hover.

**Layout & Composition**
- Sidebar: one step lighter than page shell; active item has a slim 2px brand bar and soft background—not a full bright pill.
- Cards: dark surface, soft 1px border, 12–16px radius; no top neon stripe.
- Buttons: primary = filled primary; secondary = subtle outline on surface; success/error avoid traffic‑light saturation.
- Chips: tinted on dark; text at 90% opacity; consistent height.

**Charts on Dark**
- Transparent chart canvas; grid lines = low‑alpha gray; ticks/labels = soft gray; legend = subtle.
- Colors pull from primary/secondary plus a single accent; avoid rainbow palettes.

**Thesis Builder — Critical Upgrades**
- Preview Stage: elevated dark surface with generous padding; no “void with spinner.”
- Thumbnails: larger, legible (min ~120×90), show a thin header bar and a faint content block to convey slide chrome.
- Capture Flow: only attempt capture after the chart reports ready; show a calm skeleton (not a spinner) while waiting; background stays dark so previews don’t flash white.
- Empty State: a single sentence with an action, e.g., “Select data and a template to preview.”

**Brand Integration**
- Header: replace text logo with the real Noetic mark (mono/light variant on dark). Keep size small; avoid big mastheads.
- Kill the gradient hero: use a neutral surface block with bold heading and muted subline. Optional: subtle noise or vignette, but no animation.

**Micro‑motion**
- Durations 120–180ms, ease‑out; shadows and scale < 1.04.
- Respect `prefers-reduced-motion`; provide non‑motion affordances.

**Do / Don’t**
- Do: one accent per view, consistent spacing, quiet borders.
- Don’t: white backgrounds, neon badges, gradient text, oversized shadows, or rainbow chart palettes.

**Acceptance Criteria**
- No pure white blocks on dark pages (cards, tables, previews, placeholders, selected lists).
- Sidebar is lighter than the shell; active state is clear but not glowing.
- Header displays the real Noetic mark; hero is neutral, not gradient.
- Chart thumbnails are readable; no perpetual “Capturing…” loops.
- Body copy isn’t stark white; warnings about stylesheet in head are gone; type checks pass.

**Touchpoints (keep changes surgical)**
- Shell & surfaces: `styles/global.css`
- Chart defaults on dark: `lib/chart-config.ts`
- Builder experience (preview, thumbnails, skeletons): `components/thesis/PreviewPanel.tsx`, `components/thesis/ChartCapture.tsx`, `styles/global.css`
- MDX pages using charts: `pages/cns-acquisition/*.mdx` (imports only)
- Brand mark: `theme.config.tsx` (logo swap only)

**Creative Levers (use sparingly)**
- Texture: a 2–3% monochrome noise overlay on hero/cards can add materiality—never animate it.
- Accent beam: a single 2px accent line (brand or infrared) can anchor a section header; avoid full‑bleed bars.
- Depth: layered shadows in 2 steps max; never blurrier than 30px on large cards.

**Quality Bar**
- If a component requires white to be legible, the composition is wrong—fix spacing/contrast instead.
- If a color draws the eye, it must encode meaning (state/emphasis), not style.
- If a skeleton shows for >600ms, prefer a shaped placeholder over a spinner.

— End —

