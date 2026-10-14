import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  LinearProgress,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { SnakeGame } from "../../organisms/SnakeGame/SnakeGame.tsx";
import { FlappyGame } from "../../organisms/FlappyGame/FlappyGame.tsx";
import { UnlockList } from "../../organisms/UnlockList/UnlockList.tsx";
import ChipElement from "../../atoms/Chip/ChipElement.tsx";
import { gameWords, unlocks, WORDS_PER_LEVEL } from "../../../data/game.ts";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle.ts";
import { useStoredLevel } from "../../../hooks/useStoredLevel.ts";
import { GameProgress, levelForWords } from "./wordDeck.ts";

type GameKind = "snake" | "flappy";

export default function GamePage() {
  useDocumentTitle("Game");

  const [collected, setCollected] = useState<string[]>([]);
  const [storedLevel, setStoredLevel] = useStoredLevel();
  const [toast, setToast] = useState<string | null>(null);
  const previousLevel = useRef(0);

  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });
  const [chosen, setChosen] = useState<GameKind | null>(null);
  const game: GameKind = chosen ?? (compact ? "flappy" : "snake");

  useEffect(() => {
    setCollected([]);
  }, [game]);

  const level = levelForWords(collected.length, WORDS_PER_LEVEL);
  const maxLevel = unlocks.length;
  const unlockedLevel = Math.min(Math.max(storedLevel, level), maxLevel);
  const lastWord = collected[collected.length - 1];

  useEffect(() => {
    if (level > previousLevel.current && level <= maxLevel) {
      const reward = unlocks[level - 1];
      setToast(`Level ${level} unlocked: ${reward.title}!`);
      if (level > storedLevel) setStoredLevel(level);
    }
    previousLevel.current = level;
  }, [level, maxLevel, storedLevel, setStoredLevel]);

  const handleProgress = (progress: GameProgress) => {
    setCollected(progress.collected);
  };

  const nextTarget = (Math.min(level, maxLevel) + 1) * WORDS_PER_LEVEL;
  const allUnlocked = unlockedLevel >= maxLevel;
  const progressToNext =
    level >= maxLevel
      ? 100
      : ((collected.length - level * WORDS_PER_LEVEL) / WORDS_PER_LEVEL) * 100;

  return (
    <section className="rounded-2xl bg-glass p-4 sm:p-6">
      <Typography variant="h4" component="h1">
        Collect my details
      </Typography>
      <Typography className="max-w-prose pb-4" color="text.secondary">
        {game === "flappy"
          ? "Tap to flap the bird through the gaps and touch the words."
          : "Steer the snake to eat the words."}{" "}
        Every {WORDS_PER_LEVEL} words you collect is a new level, and each level unlocks a way to get in touch.
        The words are all details about me. Everything is also reachable from
        the top bar if you'd rather skip the game.
      </Typography>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex min-w-0 flex-col gap-3">
            <ToggleButtonGroup
              exclusive
              size="small"
              value={game}
              onChange={(_event, next: GameKind | null) => {
                if (next) setChosen(next); // clicking the active game does nothing
              }}
              aria-label="Choose a game"
            >
              <ToggleButton value="snake">Snake</ToggleButton>
              <ToggleButton value="flappy">Flappy bird</ToggleButton>
            </ToggleButtonGroup>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <Typography component="p" fontWeight={600}>
                Words: {collected.length}
              </Typography>
              <Typography component="p" fontWeight={600}>
                Level: {level}
              </Typography>
              <Typography component="p" variant="body2" color="text.secondary">
                {allUnlocked && level >= maxLevel
                  ? "Everything unlocked!"
                  : `Next unlock at ${nextTarget} words`}
              </Typography>
            </div>
            <LinearProgress
              variant="determinate"
              value={Math.min(100, Math.max(0, progressToNext))}
              aria-label="Progress to the next level"
            />
            {game === "flappy" ? (
              <FlappyGame
                key="flappy"
                words={gameWords}
                wordsPerLevel={WORDS_PER_LEVEL}
                onProgress={handleProgress}
              />
            ) : (
              <SnakeGame
                key="snake"
                words={gameWords}
                wordsPerLevel={WORDS_PER_LEVEL}
                onProgress={handleProgress}
              />
            )}
          </div>
          <div>
            <Typography variant="h5" component="h2" className="pb-2">
              Unlocks
            </Typography>
            <UnlockList
              unlocks={unlocks}
              unlockedLevel={unlockedLevel}
              wordsPerLevel={WORDS_PER_LEVEL}
            />
            {storedLevel > 0 && (
              <Button
                size="small"
                className="!mt-2"
                onClick={() => setStoredLevel(0)}
              >
                Lock everything again
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <Typography variant="h5" component="h2" className="pb-2">
              Collected words ({collected.length})
            </Typography>
            {collected.length === 0 ? (
              <Typography color="text.secondary">
                Nothing yet. Go collect something!
              </Typography>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {collected.map((word, index) => (
                  <li key={`${word}-${index}`}>
                    <ChipElement label={word} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* screen-reader announcements for each word */}
      <p className="sr-only" aria-live="polite">
        {lastWord ? `Collected ${lastWord}. ${collected.length} words.` : ""}
      </p>

      <Snackbar
        open={toast !== null}
        autoHideDuration={4000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setToast(null)}
        >
          {toast}
        </Alert>
      </Snackbar>
    </section>
  );
}
