import { useCallback, useEffect, useRef, useState } from "react";
import tokens from "../../../theme/tokens.js";
import { Icon } from "../../atoms/Icon/Icon.tsx";
import { IconSize, IconType } from "../../atoms/Icon/icon.ts";
import { GameControls } from "../GameControls/GameControls.tsx";
import { IconButtonElement } from "../../atoms/Button/IconButton/IconButton.tsx";
import {
  createGame,
  Direction,
  GameState,
  setStatus,
  tick,
  tickDelayForLevel,
  turn,
} from "../../pages/GamePage/snakeEngine.ts";
import {
  GameProgress,
  GameStatus,
  levelForWords,
} from "../../pages/GamePage/wordDeck.ts";

const COLS = 16;
const ROWS = 16;
const MAX_SIZE = 480;
const MIN_SWIPE = 24;

const KEY_DIRECTIONS: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
};

interface SnakeGameProps {
  words: string[];
  wordsPerLevel: number;
  
  onProgress: (progress: GameProgress) => void;
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawGame(ctx: CanvasRenderingContext2D, state: GameState, cell: number) {
  const width = state.cols * cell;
  const height = state.rows * cell;
  ctx.clearRect(0, 0, width, height);

  // checkerboard
  ctx.fillStyle = "rgba(168, 85, 247, 0.07)";
  for (let y = 0; y < state.rows; y++) {
    for (let x = 0; x < state.cols; x++) {
      if ((x + y) % 2 === 0) ctx.fillRect(x * cell, y * cell, cell, cell);
    }
  }

  state.snake.forEach((part, index) => {
    ctx.fillStyle = index === 0 ? tokens.accentStrong : tokens.accent;
    roundedRect(ctx, part.x * cell + 1, part.y * cell + 1, cell - 2, cell - 2, cell * 0.3);
    ctx.fill();
  });

  // food with labels
  const cx = state.food.x * cell + cell / 2;
  const cy = state.food.y * cell + cell / 2;
  ctx.fillStyle = tokens.accentShadow;
  ctx.beginPath();
  ctx.arc(cx, cy, cell * 0.36, 0, Math.PI * 2);
  ctx.fill();

  const fontSize = Math.max(10, Math.min(14, cell * 0.5));
  ctx.font = `600 ${fontSize}px system-ui, sans-serif`;
  ctx.textBaseline = "middle";
  const labelWidth = ctx.measureText(state.word).width + 14;
  const labelHeight = fontSize + 8;
  const labelX = Math.min(Math.max(cx - labelWidth / 2, 2), width - labelWidth - 2);
  const above = cy - cell * 0.5 - labelHeight - 2;
  const labelY = above >= 0 ? above : cy + cell * 0.5 + 2;

  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.strokeStyle = tokens.accentStrong;
  ctx.lineWidth = 1.5;
  roundedRect(ctx, labelX, labelY, labelWidth, labelHeight, labelHeight / 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#111827";
  ctx.fillText(state.word, labelX + 7, labelY + labelHeight / 2 + 0.5);
}

/* keyboard / swipe / on-screen pad to steer. */
export function SnakeGame({ words, wordsPerLevel, onProgress }: SnakeGameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const gameRef = useRef<GameState>();
  if (!gameRef.current) gameRef.current = createGame(COLS, ROWS, words);

  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  const [status, setStatusState] = useState<GameStatus>("ready");
  const [level, setLevel] = useState(0);
  const [size, setSize] = useState(MAX_SIZE);
  const sizeRef = useRef(size);
  sizeRef.current = size;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !gameRef.current) return;

    const dpr = window.devicePixelRatio || 1;
    const pixels = Math.round(sizeRef.current * dpr);
    if (canvas.width !== pixels) {
      canvas.width = pixels;
      canvas.height = pixels;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawGame(ctx, gameRef.current, sizeRef.current / COLS);
  }, []);

  const commit = useCallback(
    (next: GameState) => {
      const prev = gameRef.current as GameState;
      gameRef.current = next;
      draw();

      const wordsChanged = next.collected.length !== prev.collected.length;
      const statusChanged = next.status !== prev.status;
      if (statusChanged) setStatusState(next.status);
      if (wordsChanged) {
        setLevel(levelForWords(next.collected.length, wordsPerLevel));
      }
      if (wordsChanged || statusChanged) {
        onProgressRef.current({
          collected: next.collected,
          status: next.status,
        });
      }
    },
    [draw, wordsPerLevel],
  );

  const steer = useCallback(
    (direction: Direction) => {
      let game = gameRef.current as GameState;
      if (game.status === "over" || game.status === "won") return;
      if (game.status !== "running") game = setStatus(game, "running");
      commit(turn(game, direction));
    },
    [commit],
  );

  const start = useCallback(() => {
    const game = gameRef.current as GameState;
    if (game.status === "over" || game.status === "won") {
      commit(setStatus(createGame(COLS, ROWS, words), "running"));
    } else {
      commit(setStatus(game, "running"));
    }
    boardRef.current?.focus();
  }, [commit, words]);

  const pause = useCallback(() => {
    const game = gameRef.current as GameState;
    if (game.status === "running") commit(setStatus(game, "paused"));
  }, [commit]);

  // speed increase
  useEffect(() => {
    if (status !== "running") return;
    const id = window.setInterval(() => {
      commit(tick(gameRef.current as GameState));
    }, tickDelayForLevel(level));
    return () => window.clearInterval(id);
  }, [status, level, commit]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const game = gameRef.current as GameState;
      const focused = boardRef.current?.contains(document.activeElement);
      const active = game.status === "running" || focused;
      if (!active) return;

      const direction = KEY_DIRECTIONS[event.key];
      if (direction) {
        event.preventDefault();
        steer(direction);
      } else if (
        (event.key === "p" || event.key === " ") &&
        game.status === "running"
      ) {
        if (event.target instanceof Element && event.target.closest("button")) return;
        event.preventDefault();
        pause();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [steer, pause]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [pause]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      const fit = Math.floor(Math.min(entry.contentRect.width, MAX_SIZE) / COLS) * COLS;
      if (fit > 0) setSize(fit);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(draw, [draw, size]);

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const from = touchStart.current;
    touchStart.current = null;
    if (!from) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - from.x;
    const dy = touch.clientY - from.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < MIN_SWIPE) return;
    steer(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : dy > 0 ? "down" : "up");
  };

  return (
    <div ref={containerRef} className="flex w-full max-w-[480px] flex-col gap-3">
      <div
        ref={boardRef}
        tabIndex={0}
        role="group"
        aria-label="Snake game board. Steer with the arrow keys or WASD, pause with P or space."
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative mx-auto overflow-hidden rounded-2xl bg-white/60 shadow-inner outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-strong"
        style={{ width: size, height: size, touchAction: "none" }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{ width: size, height: size, display: "block" }}
        />

        {status !== "running" && (
          <div className="absolute inset-0 flex flex-col items-center justify-start gap-2 bg-white/70 p-4 pt-6 text-center font-semibold">
            {status === "ready" && (
              <p>Steer the snake to eat the words and collect my details.</p>
            )}
            {status === "paused" && <p>Paused</p>}
            {status === "over" && <p>Game over!</p>}
            {status === "won" && <p>You filled the whole board. Amazing!</p>}
          </div>
        )}
      </div>

      <GameControls status={status} onStart={start} onPause={pause} />

      {/* on-screen pad */}
      <div className="mx-auto hidden w-44 grid-cols-3 place-items-center gap-1 [@media(pointer:coarse)]:grid">
        <span />
        <IconButtonElement
          ariaLabel="Up"
          onClick={() => steer("up")}
          icon={<Icon iconName={IconType.ArrowUpIcon} size={IconSize.Md} />}
        />
        <span />
        <IconButtonElement
          ariaLabel="Left"
          onClick={() => steer("left")}
          icon={<Icon iconName={IconType.ArrowLeftIcon} size={IconSize.Md} />}
        />
        <IconButtonElement
          ariaLabel="Down"
          onClick={() => steer("down")}
          icon={<Icon iconName={IconType.ArrowDownIcon} size={IconSize.Md} />}
        />
        <IconButtonElement
          ariaLabel="Right"
          onClick={() => steer("right")}
          icon={<Icon iconName={IconType.ArrowRightIcon} size={IconSize.Md} />}
        />
      </div>
    </div>
  );
}
