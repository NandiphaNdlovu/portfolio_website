// everything in fixed (WIDTH x HEIGHT); the canvas just scales it.
// One `step` is one 60Hz frame.

import { drawWord, GameStatus, levelForWords, Random } from "./wordDeck.ts";

export const WIDTH = 320;
export const HEIGHT = 480;

export const BIRD_X = 80;
export const BIRD_RADIUS = 12;

export const PIPE_WIDTH = 52;
export const GAP_HEIGHT = 140;
export const PIPE_SPACING = 170;

const GAP_MARGIN = 40;
/**
 * most a gap may sit higher or lower than the previous one. The bird can only
 * climb about 4px per frame, so bigger jumps would be impossible to clear.
 */
export const MAX_GAP_SHIFT = 100;

export const PILL_HEIGHT = 22;

const GRAVITY = 0.32;
const FLAP_VELOCITY = -5.6;
const MAX_FALL = 8;

export interface Pipe {
  /** left edge. */
  x: number;
  /** vertical centre of the gap. */
  gapY: number;
  
  word: string;
  wordY: number;
  taken: boolean;
}

export interface FlappyState {
  bird: { y: number; vy: number };
  pipes: Pipe[];
  deck: string[];
  words: string[];
  collected: string[];
  status: GameStatus;
}

/** width of the pill drawn around a word (the canvas uses the same estimate). */
export function wordWidth(word: string): number {
  return Math.round(word.length * 7 + 16);
}

export function createFlappy(words: string[]): FlappyState {
  return {
    bird: { y: HEIGHT / 2, vy: 0 },
    pipes: [],
    deck: [],
    words,
    collected: [],
    status: "ready",
  };
}

export function setFlappyStatus(
  state: FlappyState,
  status: GameStatus,
): FlappyState {
  return { ...state, status };
}

/** flap upwards. first flap starts the game; flaps are ignored once it is over. */
export function flap(state: FlappyState): FlappyState {
  if (state.status !== "ready" && state.status !== "running") return state;
  return {
    ...state,
    status: "running",
    bird: { ...state.bird, vy: FLAP_VELOCITY },
  };
}

/** pipes scroll faster each level, up to a cap. */
export function pipeSpeedForLevel(level: number): number {
  return Math.min(3.2, 2 + level * 0.2);
}

function circleHitsRect(
  cx: number,
  cy: number,
  r: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number,
) {
  const nearestX = Math.min(Math.max(cx, rx), rx + rw);
  const nearestY = Math.min(Math.max(cy, ry), ry + rh);
  const dx = cx - nearestX;
  const dy = cy - nearestY;
  return dx * dx + dy * dy < r * r;
}

function hitsPipe(birdY: number, pipe: Pipe) {
  const top = pipe.gapY - GAP_HEIGHT / 2;
  const bottom = pipe.gapY + GAP_HEIGHT / 2;
  return (
    circleHitsRect(BIRD_X, birdY, BIRD_RADIUS, pipe.x, 0, PIPE_WIDTH, top) ||
    circleHitsRect(BIRD_X, birdY, BIRD_RADIUS, pipe.x, bottom, PIPE_WIDTH, HEIGHT - bottom)
  );
}

function hitsWord(birdY: number, pipe: Pipe) {
  const width = wordWidth(pipe.word);
  return circleHitsRect(
    BIRD_X,
    birdY,
    BIRD_RADIUS,
    pipe.x + PIPE_WIDTH / 2 - width / 2,
    pipe.wordY - PILL_HEIGHT / 2,
    width,
    PILL_HEIGHT,
  );
}

function spawnPipe(
  deck: string[],
  words: string[],
  random: Random,
  previousGapY?: number,
): { pipe: Pipe; deck: string[] } {
  let minY = GAP_HEIGHT / 2 + GAP_MARGIN;
  let maxY = HEIGHT - GAP_HEIGHT / 2 - GAP_MARGIN;
  if (previousGapY !== undefined) {
    minY = Math.max(minY, previousGapY - MAX_GAP_SHIFT);
    maxY = Math.min(maxY, previousGapY + MAX_GAP_SHIFT);
  }
  const gapY = minY + random() * (maxY - minY);
  const next = drawWord(deck, words, random);
  // anywhere in the gap that keeps the whole pill inside it.
  const wordY = gapY + (random() - 0.5) * (GAP_HEIGHT - PILL_HEIGHT * 2);
  return {
    pipe: { x: WIDTH, gapY, word: next.word, wordY, taken: false },
    deck: next.deck,
  };
}

/** advances one frame. Does nothing unless the game is running. */
export function step(
  state: FlappyState,
  wordsPerLevel: number,
  random: Random = Math.random,
): FlappyState {
  if (state.status !== "running") return state;

  const speed = pipeSpeedForLevel(
    levelForWords(state.collected.length, wordsPerLevel),
  );

  let vy = Math.min(state.bird.vy + GRAVITY, MAX_FALL);
  let y = state.bird.y + vy;
  if (y - BIRD_RADIUS < 0) {
    y = BIRD_RADIUS; // bumping the ceiling is harmless
    vy = 0;
  }

  let deck = state.deck;
  let pipes = state.pipes
    .map((pipe) => ({ ...pipe, x: pipe.x - speed }))
    .filter((pipe) => pipe.x + PIPE_WIDTH > 0);

  const last = pipes[pipes.length - 1];
  if (!last || last.x <= WIDTH - PIPE_SPACING) {
    const spawned = spawnPipe(deck, state.words, random, last?.gapY);
    pipes = [...pipes, spawned.pipe];
    deck = spawned.deck;
  }

  const bird = { y, vy };
  if (y + BIRD_RADIUS >= HEIGHT || pipes.some((pipe) => hitsPipe(y, pipe))) {
    return { ...state, bird, pipes, deck, status: "over" };
  }

  const collected = [...state.collected];
  pipes = pipes.map((pipe) => {
    if (pipe.taken || !hitsWord(y, pipe)) return pipe;
    collected.push(pipe.word);
    return { ...pipe, taken: true };
  });

  return { ...state, bird, pipes, deck, collected };
}
