# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Zwe Htet Paing (AI/ML Engineer) — `zwehtetpaing.dev`. Three routes (About, Projects, Contact) built on Next.js App Router, styled with Tailwind CSS v4 against a dark/obsidian design system. Static content — no backend, no database, no API routes.

## Commands

Use `make`, not `npm run`, directly:

```bash
make install      # npm install
make dev          # Next.js dev server with HMR (http://localhost:3000)
make build        # Production build to .next/
make start        # Serve the production build
make lint         # ESLint (flat config, eslint-config-next)
make clean        # rm -rf .next
```

Package manager is **npm**, pinned via `packageManager` in `package.json`. The `Makefile` at the repo root wraps the npm scripts — always invoke it that way rather than calling `npm run <script>` directly.

No test runner is configured. There is no separate "single test" command.

## Tech Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** via `@tailwindcss/postcss` — design tokens defined with `@theme` in `src/styles/theme.css` (no `tailwind.config.js`; v4 is CSS-first)
- Path alias `@/*` → `src/*` (`jsconfig.json`)
- **Geist** and **JetBrains Mono** fonts, plus **Material Symbols Outlined** icon font, loaded via Google Fonts `<link>` tags in `src/app/layout.jsx` (not next/font)
- **ESLint 9** flat config (`eslint.config.mjs`) using `eslint-config-next/core-web-vitals`
- Deployed on **Vercel** (`vercel.json` pins `framework: nextjs`) — push to `main` triggers a deployment
- **CI**: GitHub Actions (`.github/workflows/ci.yml`) runs `make lint` + `make build` on PRs and pushes to `main`. Lint errors fail CI — escape `'`/`"` in JSX text (`&apos;`, `&quot;`)

## File Layout

```text
src/
  app/
    layout.jsx          # Root layout — fonts, inline theme-init script, AnimatedBackground
    page.jsx            # "/" — About
    projects/page.jsx   # "/projects"
    contact/page.jsx    # "/contact"
  components/
    Layout.jsx           # Shared page wrapper (Header + Footer)
    Header.jsx           # Sticky nav, mobile drawer — uses next/link
    Footer.jsx
    Portfolio.jsx         # About page content
    Projects.jsx          # Projects grid with pagination
    Contact.jsx            # Contact form + info sidebar
    AnimatedBackground.jsx # Canvas particle background
    ThemeToggle.jsx
    Container.jsx
  hooks/
    useTheme.js
    useScrollReveal.js
    useReducedMotion.js
    useLowPowerDevice.js
  styles/
    theme.css            # Tailwind v4 @theme design tokens (source of truth for colors/type/spacing)
public/
  profile.png, profile-light.png, profile-dark.png, Zwe-Htet-Paing-CV-AIML.pdf, favicon.svg
```

## Architecture Notes

- **Routing**: App Router — a page lives at `src/app/<route>/page.jsx`. To add a route, create that file and wrap its content in `<Layout>`.
- **Client components**: `AnimatedBackground`, `Contact`, `Header`, `Portfolio`, `Projects`, and `ThemeToggle` are all `"use client"` (state, effects, or browser APIs). Keep new interactive components client-side explicitly; don't assume server-component defaults.
- **Navigation** already uses `next/link` (`Header.jsx`) — no plain `<a href>` internal links to fix.
- **Theme**: dark/light is applied via a `class` on `<html>`, set by an inline `beforeInteractive` script in `layout.jsx` reading `localStorage.theme` (avoids FOUC). `useTheme.js` handles runtime toggling; `ThemeToggle.jsx` is the UI control.
- **Contact form** (`Contact.jsx`) has no real submission handler — `onSubmit` calls `alert('Message sent successfully!')`. Treat it as visual-only until a backend/API route is wired up.
- **No TypeScript**: project is plain JSX (`.jsx`, not `.tsx`).

## Skills Available

Project-local skills in `.claude/skills/` (managed via `skills-lock.json`):

- **frontend-design** — for building new pages/components matching the established dark, editorial aesthetic. `src/styles/theme.css` is the canonical source of design tokens — match new components to it.
- **react-components** (Stitch) — for converting Stitch-generated designs (see `.stitch/*.html`) into modular Next.js/React components.

When the user asks to design a new page, prefer invoking the `frontend-design` skill.

## Gotchas

- `DESIGN.md` documents the design system (Obsidian Developer Core) in prose/frontmatter form — it is populated, not a stub. Treat it as the design spec when styling new UI, alongside `src/styles/theme.css` as the implementation source of truth.
- `.claude/settings.local.json` may contain locally-scoped credentials. Don't echo its contents back, don't commit it — it's already excluded via `.gitignore` (`.claude/`).
