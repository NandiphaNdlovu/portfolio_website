# Nandipha Ndlovu – Portfolio

Personal portfolio built with React 18, React Router 7, MUI 7 and Tailwind CSS 3
(Create React App). Live at https://nandiphandlovu.github.io/portfolio_website/

## Scripts

| Command         | What it does                                          |
| --------------- | ----------------------------------------------------- |
| `npm start`     | Dev server on http://localhost:3000                   |
| `npm test`      | Jest + Testing Library (smoke tests for the app)      |
| `npm run build` | Production build into `build/`                        |
| `npm run deploy`| Manual deploy of `build/` to the `gh-pages` branch    |

Pushes to `main` are built, tested and deployed to GitHub Pages by
`.github/workflows/deploy.yml`. In the repo settings, set
**Pages → Source** to **GitHub Actions** for this to work.

## Editing content

All site content lives in `src/data/`:

- `profile.ts` – name, title, summary, GitHub/LinkedIn/email links and the CV.
  **LinkedIn and email are empty;** links left empty are hidden. Fill them in.
- `skills.ts` – skill cards and the tech-stack chips.
- `experience.ts` – the work timeline and education.
- `projects.ts` – project cards (empty for now, so the Projects page shows a placeholder).

The CV that visitors download is `src/assets/data/Nandipha_Ndlovu_CV-2025.pdf`.
Older CVs are kept in `archive/cv/` and are not bundled.

## Structure

```
src/
  components/   atoms → molecules → organisms → layouts → pages
  data/         site content (see above)
  routing/      route paths and the route table
  theme/        tokens.js (colours) + theme.ts (MUI component overrides)
  hooks/        useDocumentTitle
```

- **Routing:** `HashRouter`, so deep links such as `/#/projects` work on GitHub Pages.
  Tabs on the home page are stored in the URL (`/#/?tab=skills`).
- **Theming:** colours and glass opacities are defined once in `src/theme/tokens.js` and
  shared by `tailwind.config.js` and the MUI theme.
- **Tests:** react-router v7 needs a `moduleNameMapper` and a `TextEncoder` polyfill under
  CRA's Jest 27; both are set up in `package.json` and `src/setupTests.js`.
