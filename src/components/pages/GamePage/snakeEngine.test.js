import {
  createGame,
  levelForWords,
  setStatus,
  shuffle,
  tick,
  tickDelayForLevel,
  turn,
} from "./snakeEngine.ts";

const WORDS = ["React", "C#", "Hiking", "Crochet"];
const first = () => 0;

const running = (overrides = {}) => ({
  ...setStatus(createGame(10, 10, WORDS, first), "running"),
  ...overrides,
});

test("a new game starts ready with a 3-long snake and a word on the food", () => {
  const game = createGame(10, 10, WORDS, first);

  expect(game.status).toBe("ready");
  expect(game.snake).toHaveLength(3);
  expect(WORDS).toContain(game.word);
  expect(game.snake.some((p) => p.x === game.food.x && p.y === game.food.y)).toBe(false);
});

test("tick does nothing unless the game is running", () => {
  const game = createGame(10, 10, WORDS, first);
  expect(tick(game, first)).toBe(game);
});

test("the snake moves one cell in its heading", () => {
  const game = running({ food: { x: 0, y: 0 } });
  const head = game.snake[0];

  const next = tick(game, first);

  expect(next.snake[0]).toEqual({ x: head.x + 1, y: head.y });
  expect(next.snake).toHaveLength(3);
});

test("turning 180 degrees into itself is ignored, other turns apply", () => {
  const game = running();

  expect(turn(game, "left").nextDirection).toBe("right");
  expect(turn(game, "up").nextDirection).toBe("up");
});

test("eating the food grows the snake and collects its word", () => {
  const base = running();
  const head = base.snake[0];
  const game = { ...base, food: { x: head.x + 1, y: head.y }, word: "React" };

  const next = tick(game, first);

  expect(next.snake).toHaveLength(4);
  expect(next.collected).toEqual(["React"]);
  expect(next.food).not.toEqual(game.food);
});

test("hitting a wall ends the game", () => {
  const game = running({
    snake: [{ x: 9, y: 5 }, { x: 8, y: 5 }, { x: 7, y: 5 }],
    food: { x: 0, y: 0 },
  });

  expect(tick(game, first).status).toBe("over");
});

test("running into its own body ends the game", () => {
  // A hook shape: heading up, the next turn left runs into the body.
  const game = running({
    direction: "up",
    nextDirection: "left",
    snake: [
      { x: 5, y: 5 },
      { x: 5, y: 6 },
      { x: 4, y: 6 },
      { x: 4, y: 5 },
      { x: 4, y: 4 },
    ],
    food: { x: 0, y: 0 },
  });

  expect(tick(game, first).status).toBe("over");
});

test("moving into the cell the tail is leaving is allowed", () => {
  const game = running({
    direction: "up",
    nextDirection: "left",
    snake: [
      { x: 5, y: 5 },
      { x: 5, y: 6 },
      { x: 4, y: 6 },
      { x: 4, y: 5 },
    ],
    food: { x: 0, y: 0 },
  });

  expect(tick(game, first).status).toBe("running");
});

test("every word is served once before the list repeats", () => {
  const game = createGame(10, 10, WORDS, first);

  // The word on the food plus the remaining deck cover the whole list exactly once.
  expect([game.word, ...game.deck].sort()).toEqual([...WORDS].sort());
});

test("the deck refills from the full list when it runs out", () => {
  const base = running({ deck: [] });
  const head = base.snake[0];
  const game = { ...base, food: { x: head.x + 1, y: head.y } };

  const next = tick(game, first);

  expect(WORDS).toContain(next.word);
  expect(next.deck).toHaveLength(WORDS.length - 1);
});

test("shuffle keeps every item", () => {
  expect(shuffle([1, 2, 3, 4], () => 0.3).sort()).toEqual([1, 2, 3, 4]);
});

test("levels advance every N words and the game speeds up to a floor", () => {
  expect(levelForWords(0, 10)).toBe(0);
  expect(levelForWords(9, 10)).toBe(0);
  expect(levelForWords(10, 10)).toBe(1);
  expect(levelForWords(25, 10)).toBe(2);

  expect(tickDelayForLevel(1)).toBeLessThan(tickDelayForLevel(0));
  expect(tickDelayForLevel(100)).toBe(70);
});
