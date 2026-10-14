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
  **LinkedIn is empty** (add it; empty links are hidden). The email was copied from the CV
  and is only shown by the game, so change it here if you'd rather use another address.
- `skills.ts` – skill cards and the tech-stack chips.
- `experience.ts` – the work timeline and education.
- `projects.ts` – project cards (empty for now, so the Projects page shows a placeholder).
- `game.ts` – the snake game: the words to collect (`gameWords`), the words per level
  (`WORDS_PER_LEVEL`, default 10) and the rewards (`unlocks`). Rewards unlock in list order
  (level 1 = email, level 2 = CV, then GitHub, LinkedIn if set, and the Projects page);
  rewards with no value are skipped, so levels stay consecutive. Add one by adding an entry.

The CV that visitors download is `src/assets/data/Nandipha_Ndlovu_CV-2025.pdf`.
Older CVs are kept in `archive/cv/` and are not bundled.

## Structure

```
src/
  components/   atoms → molecules → organisms → layouts → pages
  data/         site content (see above)
  routing/      route paths and the route table
  theme/        tokens.js (colours) + theme.ts (MUI component overrides)
  hooks/        useDocumentTitle, useStoredLevel (game progress in localStorage)
```

- **Game:** `/#/game`. Screens at least 600px wide get a snake game; narrower ones (phones)
  get a flappy-bird game, since the snake board needs more room. A "Snake / Flappy bird"
  toggle above the board lets anyone switch games on any screen size. Both collect the same words
  and feed the same levels and unlocks. The rules are pure functions in
  `pages/GamePage/snakeEngine.ts` and `flappyEngine.ts` (unit tested, sharing `wordDeck.ts`);
  `organisms/SnakeGame` and `organisms/FlappyGame` draw them on a canvas and handle input
  (snake: arrow keys/WASD, swipe, on-screen pad; flappy: tap, Space or up arrow);
  `organisms/UnlockList` shows the rewards. Switching games (toggle or resizing across
  600px, when the toggle hasn't been used) restarts the word count; unlocked rewards stay. The gate is for fun, not security: the contact details are in
  the site's source.
- **Routing:** `HashRouter`, so deep links such as `/#/projects` work on GitHub Pages.
  Tabs on the home page are stored in the URL (`/#/?tab=skills`).
- **Theming:** colours and glass opacities are defined once in `src/theme/tokens.js` and
  shared by `tailwind.config.js` and the MUI theme.
- **Tests:** react-router v7 needs a `moduleNameMapper` and a `TextEncoder` polyfill under
  CRA's Jest 27; both are set up in `package.json` and `src/setupTests.js`.
