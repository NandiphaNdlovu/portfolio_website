# Portfolio Update Log

Every change made to the portfolio, and why. Newest first. Reviews and answers that changed nothing are not listed.

---

## Update 4 — Game toggle

| Change | Why |
|---|---|
| Added a **Snake / Flappy bird** toggle above the stats row on the game page (`GamePage.tsx`). | So visitors can pick either game on any screen, instead of being locked to whichever one their screen width chose. |
| The toggle overrides the screen-size default once used. | Resizing the window shouldn't swap the game out from under someone who chose one. |
| Switching games resets the word count but keeps unlocked rewards. | Words from one game shouldn't mix into the other's run, and switching must never lock the email again. |
| The intro text follows the active game. | The old text described the wrong game after switching. |
| 4 new page tests (switching both ways, clicking the active game, reset-but-keep-unlocks). | To prove the behaviour above. |
| Updated the README. | To document the toggle. |

---

## Update 3 — Flappy-bird game for small screens

| Change | Why |
|---|---|
| Added a flappy-bird game (`flappyEngine.ts`, `FlappyGame.tsx`) that shows under 600px wide. | The snake board needs more room than a phone has. |
| `GamePage` picks the game with a screen-width media query. | To show the right game per screen without the visitor choosing. |
| Flappy uses the same word list, levels, unlocks and saved progress as the snake. | So both games feed one reward system and the unlock rules stay in one place. |
| Moved the word deck, level maths and status types into `wordDeck.ts`. | Both engines needed them, and copying them would let the games drift apart. |
| Moved the Start / Pause / Resume / Play again buttons into `GameControls.tsx`. | Same reason: one shared component instead of two copies. |
| Consecutive pipe gaps can differ by at most 100px (`MAX_GAP_SHIFT`). | Without a cap, neighbouring gaps could sit at opposite ends of the board, which is impossible to clear. |
| Gap height widened from 130 to 140. | A simulated player showed the game was winnable, but visitors aren't gamers, so I made it more forgiving. |
| Stacked the game and the Unlocks list vertically below 640px (`flex-col sm:flex-row`) in `GamePage.tsx`. | Your side-by-side layout overflowed on phones, which is exactly where Flappy shows. Desktop is unchanged. |
| Made the Space-key handler check the event target is an element before using `.closest()` (both games). | It would have crashed if a key event ever came from the window rather than an element. |
| 14 flappy engine tests plus 4 page tests (right game per screen size, a bird that never flaps falls, a full replay that collects a word and unlocks the email). | To prove the rules and the screen-size switching. |
| Updated the README. | To document the two games. |

---

## Update 2 — Snake game that unlocks contact details

| Change | Why |
|---|---|
| Added the game page at `/#/game` (`GamePage.tsx`, lazy-loaded like the other pages). | You asked for a small game page following the site's structure. |
| Snake game (`snakeEngine.ts` rules, `SnakeGame.tsx` canvas and input). | A snake that eats words about you, as requested. |
| Levels every 10 words, unlocking the email, CV, GitHub and Projects page in order (`data/game.ts`). | Your spec: level 1 = 10 words for the email, level 2 = 20 words for the CV, and so on. |
| Empty rewards are skipped, so levels stay consecutive. | LinkedIn is empty, and a gap in the levels would be confusing. |
| `UnlockList.tsx` shows padlocks with "collect N words" and hides what each reward is until unlocked. | So the reward stays a surprise. |
| `useStoredLevel.ts` saves the highest level in the browser. | Unlocks persist between visits, with a reset button. |
| Added steering by arrow keys / WASD, swipe, and an on-screen pad on touch devices. | So it's playable on desktop and touch screens. |
| Pause on P / Space, and auto-pause when the tab is hidden. | The snake shouldn't die while no one is watching. |
| Set `profile.email` to `biameleng@icloud.com` (copied from your CV) in `data/profile.ts`. | The email had to come from somewhere; change it if you'd rather publish a different one. |
| Removed `contactLink` and the dead "Let's Talk" drawer item; added a **Game** item with a puzzle icon. | The email is now unlocked through the game, so a direct contact link would bypass it. |
| Added icons (puzzle, lock, envelope, document, play, pause, arrows) to the icon map and enum. | The game screens needed them. |
| Added the `/game` route constant. | Routing and the drawer both use it. |
| Stubbed canvas `getContext` in `setupTests.js`. | jsdom has no canvas and logs errors without the stub. |
| Fixed the board stretching the whole page sideways on phones (`grid-cols-1` on the page grid). | The 480px board forced the single-column layout wider than the screen. |
| Moved the "ready" message to the top of the board. | It covered the snake. |
| Tests: 12 for the snake rules, 5 for the unlock list, 3 that play the real game, 2 page tests. | To prove the rules, the unlock gating and the saved progress. |
| Updated the README. | To document how to edit words, levels and rewards. |

---

## Update 1 — Site rework (suggestions 1–4 and 7–10)

You asked for suggestions 1–5 and 7–10 with 5 and 6 skipped. 5 appeared in both parts, so I treated it as skipped: dead components were not deleted and there was no Vite migration.

### Routing and navigation
| Change | Why |
|---|---|
| Switched `BrowserRouter` to `HashRouter` (`App.js`). | The site is on GitHub Pages under `/portfolio_website`, where deep links like `/projects` 404 on refresh. |
| The drawer now uses router `NavLink`s with an active highlight. | The old plain `href`s caused full page reloads. |
| Tab selection lives in the URL (`/#/?tab=skills`). | Tabs become linkable; the old hard-coded `"about"` default only worked by coincidence. |
| Removed the duplicate `id="page"` on every tab panel. | Invalid HTML; the panel is now styled through the theme. |
| The navbar shows your name as the home link, with a code icon. | It said "Projects" with an Android bot icon. |
| Removed the "Settings" drawer item. | It linked nowhere and there was no settings page. |
| Unknown routes show the home page. | A mistyped link no longer shows a blank page. |

### Content
| Change | Why |
|---|---|
| About Me, Skills, Experience and Projects pages now have real content in `src/data/` (`profile`, `skills`, `experience`, `projects`). | The tabs only said "AboutMe" and "Skills", and the real content was commented out in `HomePage.ts`. |
| Deleted `HomePage.ts` after moving its content. | Its content now lives in typed data files. |
| Projects renders an empty-state message with a GitHub link. | I didn't want to invent projects; add yours to `projects.ts`. |
| Wired the navbar GitHub, LinkedIn and Download CV buttons (LinkedIn is hidden until you add a URL). | They had no links or handlers. |
| Moved the two older CVs to `archive/cv/`. | Only the current CV should be bundled and downloadable; nothing was deleted. |
| Rewrote `CardElement` and `ChipElement`. | They were demos with fake favourite/share buttons and a hard-coded "Custom delete icon" label. |
| Made the timeline switch to a compact layout on small screens. | The alternating layout was cramped on phones. |

### Dependencies and tooling
| Change | Why |
|---|---|
| Removed 13 unused packages (including the bogus `tailwind` package and the Tailwind v4 CLI); added `classnames`. | Smaller installs, a Tailwind v3-only setup, and `classnames` was imported but never declared. |
| Fixed the Tailwind content path (`./public/index.html`). | It pointed at a file that doesn't exist. |
| Replaced the stale "learn react" test with 5 smoke tests. | The old test failed. |
| Added a Jest `moduleNameMapper` and a `TextEncoder` polyfill. | react-router v7 doesn't load under CRA's Jest 27 without them. |
| Added `.github/workflows/deploy.yml` (test, build, deploy on push to `main`). | So deployment doesn't depend on running a script by hand. Set Pages → Source to GitHub Actions for it to work. |
| Rewrote `README.md`. | It was the stock CRA text. |

### Look and theming
| Change | Why |
|---|---|
| Colours defined once in `theme/tokens.js`, shared by Tailwind and a new MUI theme (`theme.ts`). | The purple was hard-coded in several places. |
| Moved the tab "scoop" styling and the content card into the theme; deleted `App.css`. | It relied on `!important` chains to beat MUI's styles. |
| Used a darker purple for links and selected-tab text. | The light purple was hard to read on the white panels. |
| Fixed the icon enum typo (`"FileDownloadOutlined "` had a trailing space). | A latent bug waiting to bite lookups. |
| Tightened the navbar title spacing on small screens. | The name was truncated to "Nandipha …". |

### Accessibility and SEO
| Change | Why |
|---|---|
| Added `aria-label`s to icon buttons, a skip link, `<nav>` / `<main>` landmarks and an `<h1>` per page. | A tooltip isn't an accessible name, and screen-reader users had no landmarks or page headings. |
| The layout scrolls (`min-h-screen`) instead of clipping (`max-h-screen`). | Longer content would have been cut off on small screens. |
| Added a real meta description, Open Graph tags, a canonical URL, a proper manifest and per-page document titles. | They still said "Create React App". |
| The tab title is now "Nandipha Ndlovu \| Software Developer" (was "Crispy Code Chronicles"). | A descriptive title helps search and sharing; change it back if you prefer the old name. |
| Footer year is dynamic (was "© 2023"); footer text wraps. | The year was out of date and the text was truncated. |
| Added a `prefers-reduced-motion` rule. | Respects users who turn animation off. |

### Performance
| Change | Why |
|---|---|
| Pages are lazy-loaded with `React.lazy`. | Visitors only download the page they're viewing. |
| MUI icons are imported by path instead of from the barrel. | Only the icons used end up in the bundle. |
| Aurora background PNGs became WebP (1.27 MB to 9.6 KB for the light one) and the background now covers the viewport. | A huge image for a smooth gradient; it also tiled on tall pages. |
