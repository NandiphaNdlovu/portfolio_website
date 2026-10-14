import {
  BIRD_RADIUS,
  BIRD_X,
  createFlappy,
  flap,
  GAP_HEIGHT,
  HEIGHT,
  MAX_GAP_SHIFT,
  pipeSpeedForLevel,
  PIPE_SPACING,
  PIPE_WIDTH,
  setFlappyStatus,
  step,
  WIDTH,
  wordWidth,
} from "./flappyEngine.ts";

const WORDS = ["React", "C#", "Hiking"];
const first = () => 0;
const PER_LEVEL = 10;

const running = (overrides = {}) => ({
  ...setFlappyStatus(createFlappy(WORDS), "running"),
  ...overrides,
});

/** A pipe whose gap is centred on `gapY`, with its word at the same height. */
const pipeAt = (x, gapY = 240, word = "React") => ({
  x,
  gapY,
  word,
  wordY: gapY,
  taken: false,
});

const runFrames = (state, frames) => {
  let next = state;
  for (let i = 0; i < frames; i++) next = step(next, PER_LEVEL, first);
  return next;
};

test("a new game is ready and nothing moves until the first flap", () => {
  const game = createFlappy(WORDS);

  expect(game.status).toBe("ready");
  expect(step(game, PER_LEVEL, first)).toBe(game);
});

test("the first flap starts the game with an upward push", () => {
  const game = flap(createFlappy(WORDS));

  expect(game.status).toBe("running");
  expect(game.bird.vy).toBeLessThan(0);
});

test("gravity pulls the bird down and a flap lifts it again", () => {
  const start = running();

  const falling = runFrames(start, 5);
  expect(falling.bird.y).toBeGreaterThan(start.bird.y);

  const lifted = runFrames(flap(falling), 3);
  expect(lifted.bird.vy).toBeLessThan(falling.bird.vy);
});

test("flaps are ignored once the game is over or paused", () => {
  const over = setFlappyStatus(createFlappy(WORDS), "over");
  const paused = setFlappyStatus(createFlappy(WORDS), "paused");

  expect(flap(over)).toBe(over);
  expect(flap(paused)).toBe(paused);
});

test("hitting the ground ends the game", () => {
  const game = running({ bird: { y: HEIGHT - BIRD_RADIUS - 1, vy: 6 } });

  expect(step(game, PER_LEVEL, first).status).toBe("over");
});

test("bumping the ceiling is harmless", () => {
  const game = running({ bird: { y: BIRD_RADIUS, vy: -6 } });
  const next = step(game, PER_LEVEL, first);

  expect(next.status).toBe("running");
  expect(next.bird.y).toBe(BIRD_RADIUS);
});

test("flying into a pipe ends the game", () => {
  // Gap is far below the bird, so the bird hits the top pipe.
  const game = running({
    bird: { y: 100, vy: 0 },
    pipes: [pipeAt(BIRD_X - 10, 380)],
  });

  expect(step(game, PER_LEVEL, first).status).toBe("over");
});

test("flying through the gap is safe", () => {
  const game = running({
    bird: { y: 240, vy: -0.32 }, // cancels gravity this frame
    pipes: [pipeAt(BIRD_X - 10, 240)],
  });

  expect(step(game, PER_LEVEL, first).status).toBe("running");
});

test("touching a word collects it once", () => {
  const game = running({
    bird: { y: 240, vy: -0.32 },
    pipes: [pipeAt(BIRD_X - PIPE_WIDTH / 2, 240, "Hiking")],
  });

  const next = step(game, PER_LEVEL, first);
  expect(next.collected).toEqual(["Hiking"]);
  expect(next.pipes[0].taken).toBe(true);

  // Still overlapping a frame later, but it must not be collected again.
  const again = step({ ...next, bird: { y: 240, vy: -0.32 } }, PER_LEVEL, first);
  expect(again.collected).toEqual(["Hiking"]);
});

test("passing a word without touching it does not collect it", () => {
  const game = running({
    bird: { y: 240 - 50, vy: -0.32 }, // above the word, still inside the gap
    pipes: [pipeAt(BIRD_X - PIPE_WIDTH / 2, 240, "Hiking")],
  });

  expect(step(game, PER_LEVEL, first).collected).toEqual([]);
});

test("pipes scroll left, spawn at the right edge and are dropped once off screen", () => {
  let game = running({ bird: { y: 240, vy: 0 } });

  game = step(game, PER_LEVEL, first);
  expect(game.pipes).toHaveLength(1);
  expect(game.pipes[0].x).toBe(WIDTH); // spawned exactly at the right edge

  game = step({ ...game, bird: { y: 240, vy: -0.32 } }, PER_LEVEL, first);
  expect(game.pipes[0].x).toBeLessThan(WIDTH); // and scrolls from the next frame

  // Next pipe appears one spacing later.
  const farPipe = pipeAt(WIDTH - PIPE_SPACING + 1);
  const spaced = step({ ...game, bird: { y: 240, vy: -0.32 }, pipes: [farPipe] }, PER_LEVEL, first);
  expect(spaced.pipes).toHaveLength(2);

  const gone = step(
    { ...game, bird: { y: 240, vy: -0.32 }, pipes: [pipeAt(-PIPE_WIDTH - 5), pipeAt(WIDTH - 10)] },
    PER_LEVEL,
    first,
  );
  expect(gone.pipes.every((p) => p.x + PIPE_WIDTH > 0)).toBe(true);
});

test("spawned words come from the word list and stay inside the gap", () => {
  const game = step(running({ bird: { y: 240, vy: 0 } }), PER_LEVEL, () => 0.99);
  const [pipe] = game.pipes;

  expect(WORDS).toContain(pipe.word);
  expect(pipe.wordY - 11).toBeGreaterThanOrEqual(pipe.gapY - GAP_HEIGHT / 2);
  expect(pipe.wordY + 11).toBeLessThanOrEqual(pipe.gapY + GAP_HEIGHT / 2);
});

test("longer words get wider pills and pipes speed up per level with a cap", () => {
  expect(wordWidth("Belgium Campus")).toBeGreaterThan(wordWidth("C#"));
  expect(pipeSpeedForLevel(1)).toBeGreaterThan(pipeSpeedForLevel(0));
  expect(pipeSpeedForLevel(100)).toBe(3.2);
});

test("consecutive gaps never differ by more than the bird can climb", () => {
  let seed = 7;
  const random = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
  let game = running({ bird: { y: 240, vy: 0 } });
  const gaps = [];

  for (let frame = 0; frame < 4000 && gaps.length < 40; frame++) {
    // Keep the bird alive and hovering so only the pipe generation is under test.
    game = step({ ...game, bird: { y: 240, vy: -0.32 }, status: "running" }, PER_LEVEL, random);
    const newest = game.pipes[game.pipes.length - 1];
    if (newest && gaps[gaps.length - 1] !== newest.gapY) gaps.push(newest.gapY);
  }

  expect(gaps.length).toBeGreaterThan(10);
  for (let i = 1; i < gaps.length; i++) {
    expect(Math.abs(gaps[i] - gaps[i - 1])).toBeLessThanOrEqual(MAX_GAP_SHIFT + 1e-9);
  }
  // ...and every gap stays on the board with a margin.
  expect(Math.min(...gaps)).toBeGreaterThanOrEqual(GAP_HEIGHT / 2);
  expect(Math.max(...gaps)).toBeLessThanOrEqual(HEIGHT - GAP_HEIGHT / 2);
});
