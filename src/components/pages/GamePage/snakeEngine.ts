// The board is a cols x rows grid; the snake is an array of cells, head first.

import { drawWord, GameStatus, Random } from "./wordDeck.ts";

export { levelForWords, shuffle } from "./wordDeck.ts";
export type { GameStatus, Random } from "./wordDeck.ts";

export type Direction = "up" | "down" | "left" | "right";

export interface Point {
  x: number;
  y: number;
}

export interface GameState {
  cols: number;
  rows: number;
  snake: Point[];

  direction: Direction;

  nextDirection: Direction;
  food: Point;
  
  word: string;
  
  deck: string[];
  words: string[];
  collected: string[];
  status: GameStatus;
}

const DELTAS: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITES: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

const samePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

/* random cell not covered by the snake, or null when the board is full. */
export function randomFreeCell(
  cols: number,
  rows: number,
  snake: Point[],
  random: Random = Math.random,
): Point | null {
  const free: Point[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (!snake.some((part) => part.x === x && part.y === y)) {
        free.push({ x, y });
      }
    }
  }
  return free.length > 0 ? free[Math.floor(random() * free.length)] : null;
}

export function createGame(
  cols: number,
  rows: number,
  words: string[],
  random: Random = Math.random,
): GameState {
  const y = Math.floor(rows / 2);
  const startX = Math.floor(cols / 3);
  const snake = [
    { x: startX, y },
    { x: startX - 1, y },
    { x: startX - 2, y },
  ];
  const food = randomFreeCell(cols, rows, snake, random) as Point;
  const { word, deck } = drawWord([], words, random);

  return {
    cols,
    rows,
    snake,
    direction: "right",
    nextDirection: "right",
    food,
    word,
    deck,
    words,
    collected: [],
    status: "ready",
  };
}

export function setStatus(state: GameState, status: GameStatus): GameState {
  return { ...state, status };
}

/** queues a turn. A 180° reversal into the snake's own neck is ignored. */
export function turn(state: GameState, direction: Direction): GameState {
  if (direction === OPPOSITES[state.direction]) return state;
  return { ...state, nextDirection: direction };
}

/** advances the game one step. Does nothing unless the game is running. */
export function tick(state: GameState, random: Random = Math.random): GameState {
  if (state.status !== "running") return state;

  const direction = state.nextDirection;
  const delta = DELTAS[direction];
  const head = state.snake[0];
  const newHead = { x: head.x + delta.x, y: head.y + delta.y };

  const hitsWall =
    newHead.x < 0 ||
    newHead.y < 0 ||
    newHead.x >= state.cols ||
    newHead.y >= state.rows;
  if (hitsWall) return { ...state, direction, status: "over" };

  const eats = samePoint(newHead, state.food);
  // tail cell is vacated on a normal move, so moving into it is allowed.
  const body = eats ? state.snake : state.snake.slice(0, -1);
  if (body.some((part) => samePoint(part, newHead))) {
    return { ...state, direction, status: "over" };
  }

  const snake = [newHead, ...body];
  if (!eats) return { ...state, direction, snake };

  const collected = [...state.collected, state.word];
  const food = randomFreeCell(state.cols, state.rows, snake, random);
  if (!food) return { ...state, direction, snake, collected, status: "won" };

  const next = drawWord(state.deck, state.words, random);
  return {
    ...state,
    direction,
    snake,
    collected,
    food,
    word: next.word,
    deck: next.deck,
  };
}

/*snake speed*/
export function tickDelayForLevel(level: number): number {
  return Math.max(70, 160 - level * 15);
}
