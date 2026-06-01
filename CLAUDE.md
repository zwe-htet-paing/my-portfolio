# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Zwe Htet Paing (AI/ML Engineer). Single-page React app with three routes (About, Projects, Contact), styled with Tailwind utility classes against a dark/obsidian design system. Static content — no backend, no API calls, no global state.

## Commands

```bash
npm run dev       # Vite dev server with HMR (default: http://localhost:5173)
npm run build     # Production build to dist/
npm run preview   # Preview the production build
npm run lint      # ESLint (flat config, React Hooks + react-refresh rules)
```

No test runner is configured. There is no separate "single test" command.

## Tech Stack

- **React 19.2** + **React Router DOM 6.24** (BrowserRouter with 3 routes)
- **Vite 8** with `@vitejs/plugin-react`
- **Tailwind utility classes** — note: there is no `tailwind.config.js` in the repo. Custom utility classes (e.g. `font-headline-xl`, `bg-surface-container`, `text-on-surface`, `px-gutter`, `card-glow`, `glass-card`, `obsidian-card`, `timeline-node`, `terminal-badge`, `animate-fade-up`) are referenced throughout the components but are NOT defined locally. They rely on a precompiled stylesheet that is not in this codebase — adding new pages will require either (a) the stylesheet to be present, or (b) replacing these classes with standard Tailwind utilities.
- **Material Symbols Outlined** icon font (loaded via Google Fonts CDN in the rendered HTML — not in `index.html` head, so add the link if icons don't render).
- **ESLint 10** flat config (`eslint.config.js`) with `@eslint/js` recommended + React Hooks + react-refresh.

## File Layout

```
src/
  main.jsx              # React entry; mounts <App /> in StrictMode
  App.jsx               # Router + 3 <Route> elements
  App.css               # Unused by current pages (left over from Vite template)
  index.css             # Global CSS variables (light/dark theme tokens, font stacks)
  components/
    Portfolio.jsx       # Route "/" — hero, tech stack grid, experience timeline, education
    Projects.jsx        # Route "/projects" — header + 1 example project card grid
    Contact.jsx         # Route "/contact" — 2-col layout (form + info cards)
  assets/               # hero.png, react.svg, vite.svg (template leftovers)
public/
  favicon.svg, icons.svg
```

## Architecture Notes

- **Routing**: `App.jsx` is the only place routes are declared. To add a page, create a component in `src/components/` and add a `<Route>` in `App.jsx`. Existing in-page links use plain `<a href="/path">` rather than `<Link>` — this triggers a full page reload. Consider switching to React Router `<Link>` for client-side navigation.
- **Shared layout is duplicated**: the nav `<header>` and `<footer>` are copy-pasted across all three components. A `Layout` wrapper component would be a natural refactor.
- **Contact form** (`Contact.jsx`) currently has no real submission handler — `onSubmit` calls `alert('Message sent successfully!')`. Treat the form as visual-only until a backend is wired up.
- **Image assets** are hosted externally at `lh3.googleusercontent.com/aida-public/...` URLs (Stitch-generated placeholders). Replace with real assets when available.
- **No TypeScript**: project is plain JSX. `@types/react` is in devDependencies but unused.

## Skills Available

Project-local skills in `.claude/skills/` (managed via `skills-lock.json`):

- **frontend-design** — for building new pages/components with the dark, editorial aesthetic already established (distinctive fonts, color tokens, motion). The `index.css` defines the canonical theme tokens (`--text`, `--text-h`, `--bg`, `--accent`, etc.) — match new components to this palette.
- **react-components** (Stitch) — for converting Stitch-generated designs into modular Vite/React components. Uses `scripts/validate.js` for AST-based validation and `scripts/fetch-stitch.sh` for system-level networking.

When the user asks to design a new page, prefer invoking the `frontend-design` skill — it carries the design-thinking guidance that the existing components already follow.

## Gotchas

- `DESIGN.md` exists but is empty. If asked to follow it, surface that it's a stub.
- The Vite template's `App.css` is still imported via `App.jsx` indirectly through `index.css`-style tokens, but the CSS classes it defines (`.counter`, `.hero`, `#center`, `#next-steps`, etc.) are leftover from the default Vite + React starter and are not used by the actual portfolio pages. Don't waste time modifying it for the portfolio.
- `.claude/settings.local.json` contains an API key in plain text. Don't echo it back, don't commit it. (It's already covered by `.gitignore`-style local-only config but worth being aware of.)
</content>
</invoke>