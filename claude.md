# Claude Guide (High‑Level)

This document provides high‑level context and guardrails for Claude when working in this repository. It is intentionally non‑prescriptive so Claude can choose the most suitable approach within these boundaries.

## Purpose
- Communicate a clear, investor‑ready story for Noetic 2.0 through docs, visuals, and a guided Thesis Builder.
- Keep UX clean, consistent, and performance‑aware; prioritize clarity and credibility over flourish.

## Architecture (Conceptual)
- Documentation app built on a React/Next foundation with a docs theme and MDX pages.
- Charts and dashboards are modular components fed by a single, typed data source.
- A Thesis Builder composes selected charts/sections into exportable pages.

## How To Work Here
- Respect the current information architecture; prefer incremental changes over large restructures.
- Maintain type safety: extend shared types first, then adapt components and data.
- Keep visual consistency: reuse existing tokens, utilities, and patterns; avoid one‑off styles.
- Optimize for load and interactivity: code‑split heavy visuals; guard charts with error boundaries.
- Prefer deterministic data flow: read from the canonical data source and keep transformations localized and predictable.

## Repo Structure (High‑Level)
- Pages: MDX content and navigation metadata.
- Components: UI primitives, charts, dashboard sections, and Thesis Builder modules.
- Lib: shared configuration (e.g., charts) and cross‑cutting utilities.
- Data: canonical metrics (market, phases, risks, capital plan).
- Hooks: typed selectors/accessors over the canonical data.
- Styles/Theme: global styles and docs theme configuration.

## Decision Heuristics
- Adding capability: start with data and types, then implement the minimal component(s), then surface in pages or builder.
- Navigation/content: prefer metadata‑driven updates over ad‑hoc links to preserve structure.
- Styling: extend tokens/utilities only when existing patterns cannot express the need.
- Error handling: assume charts and async UI can fail; provide graceful fallbacks.
- Performance: keep initial bundles small; defer heavy UI until needed.

## Quality Bar
- Changes should be small, reversible, and well‑reasoned.
- Type and lint clean before considering a feature “ready”.
- Validate the exact surface you changed; avoid broad rewrites.

## Dev Server & Build (Guidance)
- Environments must allow the app to bind a local port; if binding is restricted, choose interfaces/ports compatible with the environment.
- Resolve type errors first; the app may block serving pages while type checks fail.
- If builds reference remote assets (e.g., fonts), prefer resilient handling or local fallbacks.
- Use one package manager consistently per environment.

## Collaboration
- When proposing schema or IA changes, outline the rationale and expected impact across pages/components.
- Prefer a short plan with checkpoints; verify the smallest slice end‑to‑end before expanding scope.

— End —

