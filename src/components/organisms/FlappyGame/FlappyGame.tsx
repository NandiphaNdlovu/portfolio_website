import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import tokens from "../../../theme/tokens.js";
import { GameControls } from "../GameControls/GameControls.tsx";
import {
  BIRD_RADIUS,
  BIRD_X,
  createFlappy,
  flap,
  FlappyState,
  GAP_HEIGHT,
  HEIGHT,
  PILL_HEIGHT,
  PIPE_WIDTH,
  setFlappyStatus,
  step,
  WIDTH,
  wordWidth,
} from "../../pages/GamePage/flappyEngine.ts";
import { GameProgress, GameStatus } from "../../pages/GamePage/wordDeck.ts";

const MAX_SIZE = 360;
const FRAME_MS = 1000 / 60;
const FLAP_KEYS = new Set([" ", "ArrowUp", "w"]);

interface FlappyGameProps {
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
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawGame(ctx: CanvasRenderingContext2D, state: FlappyState) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Pipes
  ctx.fillStyle = tokens.accent;
  ctx.strokeStyle = tokens.accentStrong;
  ctx.lineWidth = 2;
  for (const pipe of state.pipes) {
    const gapTop = pipe.gapY - GAP_HEIGHT / 2;
    const gapBottom = pipe.gapY + GAP_HEIGHT / 2;
    roundedRect(ctx, pipe.x, -10, PIPE_WIDTH, gapTop + 10, 6);
    ctx.fill();
    ctx.stroke();
    roundedRect(ctx, pipe.x, gapBottom, PIPE_WIDTH, HEIGHT - gapBottom + 10, 6);
    ctx.fill();
    ctx.stroke();
  }

  // Ground line.
  ctx.fillStyle = tokens.accentShadow;
  ctx.fillRect(0, HEIGHT - 4, WIDTH, 4);

  // Words still waiting to be collected.
  ctx.font = "600 12px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const pipe of state.pipes) {
    if (pipe.taken) continue;
    const width = wordWidth(pipe.word);
    const x = pipe.x + PIPE_WIDTH / 2;
    ctx.fillStyle = "rgba(255, 255, 255, 0.96)";
    ctx.strokeStyle = tokens.accentStrong;
    ctx.lineWidth = 1.5;
    roundedRect(ctx, x - width / 2, pipe.wordY - PILL_HEIGHT / 2, width, PILL_HEIGHT, PILL_HEIGHT / 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#111827";
    ctx.fillText(pipe.word, x, pipe.wordY + 0.5);
  }


  const { y, vy } = state.bird;
  ctx.save();
  ctx.translate(BIRD_X, y);
  ctx.rotate(Math.max(-0.5, Math.min(1, vy * 0.08)));
  ctx.fillStyle = "#f59e0b";
  ctx.strokeStyle = "#b45309";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, BIRD_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#fde68a"; // wing
  ctx.beginPath();
  ctx.ellipse(-3, 3, 6, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fb923c"; // beak
  ctx.beginPath();
  ctx.moveTo(BIRD_RADIUS - 2, -1);
  ctx.lineTo(BIRD_RADIUS + 8, 2);
  ctx.lineTo(BIRD_RADIUS - 2, 5);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#fff"; // eye
  ctx.beginPath();
  ctx.arc(4, -4, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#111827";
  ctx.beginPath();
  ctx.arc(5, -4, 1.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function FlappyGame({ words, wordsPerLevel, onProgress }: FlappyGameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const gameRef = useRef<FlappyState>();
  if (!gameRef.current) gameRef.current = createFlappy(words);

  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  const [status, setStatusState] = useState<GameStatus>("ready");
  const [width, setWidth] = useState(MAX_SIZE);
  const widthRef = useRef(width);
  widthRef.current = width;
  const height = Math.round((width * HEIGHT) / WIDTH);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !gameRef.current) return;

    const dpr = window.devicePixelRatio || 1;
    const scale = (widthRef.current / WIDTH) * dpr;
    const pixelWidth = Math.round(WIDTH * scale);
    const pixelHeight = Math.round(HEIGHT * scale);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    drawGame(ctx, gameRef.current);
  }, []);

  const commit = useCallback(
    (next: FlappyState) => {
      const prev = gameRef.current as FlappyState;
      gameRef.current = next;
      draw();

      const wordsChanged = next.collected.length !== prev.collected.length;
      const statusChanged = next.status !== prev.status;
      if (statusChanged) setStatusState(next.status);
      if (wordsChanged || statusChanged) {
        onProgressRef.current({
          collected: next.collected,
          status: next.status,
        });
      }
    },
    [draw],
  );

  const doFlap = useCallback(() => {
    commit(flap(gameRef.current as FlappyState));
  }, [commit]);

  const start = useCallback(() => {
    const game = gameRef.current as FlappyState;
    if (game.status === "over" || game.status === "won") {
      commit(flap(createFlappy(words)));
    } else if (game.status === "paused") {
      commit(setFlappyStatus(game, "running"));
    } else {
      commit(flap(game));
    }
    boardRef.current?.focus();
  }, [commit, words]);

  const pause = useCallback(() => {
    const game = gameRef.current as FlappyState;
    if (game.status === "running") commit(setFlappyStatus(game, "paused"));
  }, [commit]);

  // one fixed-size physics step per frame.
  useEffect(() => {
    if (status !== "running") return;
    const id = window.setInterval(() => {
      commit(step(gameRef.current as FlappyState, wordsPerLevel));
    }, FRAME_MS);
    return () => window.clearInterval(id);
  }, [status, wordsPerLevel, commit]);

  // only captured while playing or while the board has focus.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const game = gameRef.current as FlappyState;
      const focused = boardRef.current?.contains(document.activeElement);
      if (game.status !== "running" && !focused) return;

      if (event.target instanceof Element && event.target.closest("button")) return;

      if (FLAP_KEYS.has(event.key)) {
        event.preventDefault();
        if (!event.repeat) doFlap();
      } else if (event.key === "p" && game.status === "running") {
        event.preventDefault();
        pause();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [doFlap, pause]);

  // pause when the tab is hidden
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [pause]);

  // fit the board to its container.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      const fit = Math.floor(Math.min(entry.contentRect.width, MAX_SIZE));
      if (fit > 0) setWidth(fit);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(draw, [draw, width]);

  // for tapping the board flaps 
  const onPointerDown = (event: React.PointerEvent) => {
    const game = gameRef.current as FlappyState;
    if (game.status !== "ready" && game.status !== "running") return;
    event.preventDefault();
    doFlap();
  };

  return (
    <div ref={containerRef} className="flex w-full max-w-[360px] flex-col gap-3">
      <div
        ref={boardRef}
        tabIndex={0}
        role="group"
        aria-label="Flappy bird game board. Tap, click, or press Space or the up arrow to flap. Pause with P."
        onPointerDown={onPointerDown}
        className="relative mx-auto select-none overflow-hidden rounded-2xl bg-white/60 shadow-inner outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-strong"
        style={{ width, height, touchAction: "none" }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{ width, height, display: "block" }}
        />

        {status !== "running" && (
          <div className="absolute inset-0 flex flex-col items-center justify-start gap-2 bg-white/70 p-4 pt-8 text-center font-semibold">
            {status === "ready" && (
              <p>
                Tap to flap! Fly through the gaps and touch the words to
                collect them.
              </p>
            )}
            {status === "paused" && <p>Paused</p>}
            {status === "over" && <p>Game over!</p>}
          </div>
        )}
      </div>

      <GameControls status={status} onStart={start} onPause={pause}>
        <Button
          variant="contained"
          onClick={doFlap}
          sx={{ touchAction: "manipulation" }}
        >
          Flap
        </Button>
      </GameControls>
    </div>
  );
}
