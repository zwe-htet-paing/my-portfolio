# zwehtetpaing.dev

Personal portfolio site for Zwe Htet Paing — AI/ML Engineer. Built with Next.js 15 and Tailwind CSS v4 against a dark/obsidian design system.

## Stack

- **Next.js 15** (App Router, static export)
- **React 19**
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **ESLint** with `eslint-config-next`

## Development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Commands

```bash
npm run dev      # Dev server with HMR
npm run build    # Production build to .next/
npm run start    # Serve the production build
npm run lint     # ESLint
```

## Structure

```
src/
  app/
    layout.jsx          # Root layout — fonts, theme boot script, AnimatedBackground
    page.jsx            # / → About
    projects/page.jsx   # /projects
    contact/page.jsx    # /contact
  components/
    Layout.jsx          # Shared nav + footer wrapper
    Header.jsx          # Sticky nav with mobile drawer
    Footer.jsx
    Portfolio.jsx       # About page content
    Projects.jsx        # Projects grid with pagination
    Contact.jsx         # Contact form + sidebar
    AnimatedBackground.jsx  # Canvas particle animation
    ThemeToggle.jsx
    Container.jsx
  hooks/
    useTheme.js
    useScrollReveal.js
    useReducedMotion.js
    useLowPowerDevice.js
  styles/
    theme.css           # Tailwind v4 @theme design tokens
public/
  profile.png
  resume.pdf
  favicon.svg
```

## Deployment

Deployed on Vercel. Push to `main` triggers a new deployment.
