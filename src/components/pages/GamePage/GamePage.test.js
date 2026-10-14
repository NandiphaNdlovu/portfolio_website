import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GamePage from "./GamePage.tsx";
import { gameWords } from "../../../data/game.ts";
import { createFlappy, flap, step } from "./flappyEngine.ts";

// One word per level so a single meal unlocks the first reward.
jest.mock("../../../data/game.ts", () => ({
  ...jest.requireActual("../../../data/game.ts"),
  WORDS_PER_LEVEL: 1,
}));

const TICK = 160; // level 0 step time

const press = (key) => fireEvent.keyDown(window, { key });
const advance = (steps) =>
  act(() => {
    jest.advanceTimersByTime(TICK * steps);
  });

beforeEach(() => {
  window.localStorage.clear();
  // With random() = 0 the first food lands in the top-left corner (0,0)
  // and the snake starts at (5,8) heading right.
  jest.spyOn(Math, "random").mockReturnValue(0);
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

test("eating a word collects it, levels up, unlocks the email and saves progress", () => {
  render(
    <MemoryRouter>
      <GamePage />
    </MemoryRouter>,
  );
  expect(screen.getByText("Words: 0")).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /@/ })).not.toBeInTheDocument();

  jest.useFakeTimers();
  fireEvent.click(screen.getByRole("button", { name: /start/i }));

  press("ArrowUp");
  advance(8); // (5,8) -> (5,0)
  press("ArrowLeft");
  advance(5); // (5,0) -> (0,0): eat

  expect(screen.getByText("Words: 1")).toBeInTheDocument();
  expect(screen.getByText("Level: 1")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /collected words \(1\)/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /@/ })).toBeInTheDocument();
  expect(screen.getByText(/level 1 unlocked/i)).toBeInTheDocument();
  expect(window.localStorage.getItem("portfolio:game:level")).toBe("1");
});

test("running into a wall ends the game and offers another go", () => {
  render(
    <MemoryRouter>
      <GamePage />
    </MemoryRouter>,
  );

  jest.useFakeTimers();
  fireEvent.click(screen.getByRole("button", { name: /start/i }));
  advance(20); // straight into the right-hand wall

  expect(screen.getByText("Game over!")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /play again/i })).toBeInTheDocument();
});

test("pausing stops the snake", () => {
  render(
    <MemoryRouter>
      <GamePage />
    </MemoryRouter>,
  );

  jest.useFakeTimers();
  fireEvent.click(screen.getByRole("button", { name: /start/i }));
  fireEvent.click(screen.getByRole("button", { name: /pause/i }));
  advance(20);

  expect(screen.getByText("Paused")).toBeInTheDocument();
  expect(screen.queryByText("Game over!")).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: /resume/i })).toBeInTheDocument();
});

// --- Small screens get the flappy-bird game -------------------------------------------

describe("on a small screen", () => {
  const mockSmallScreen = (matches) => {
    window.matchMedia = (query) => ({
      matches,
      media: query,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
    });
  };

  afterEach(() => {
    delete window.matchMedia;
  });

  const renderPage = () =>
    render(
      <MemoryRouter>
        <GamePage />
      </MemoryRouter>,
    );

  test("the flappy-bird game replaces the snake game", () => {
    mockSmallScreen(true);
    renderPage();

    expect(screen.getByRole("group", { name: /flappy bird game board/i })).toBeInTheDocument();
    expect(screen.queryByRole("group", { name: /snake game board/i })).not.toBeInTheDocument();
    expect(screen.getByText(/fly through the gaps/i)).toBeInTheDocument(); // the board overlay
  });

  test("large screens still get the snake game", () => {
    mockSmallScreen(false);
    renderPage();

    expect(screen.getByRole("group", { name: /snake game board/i })).toBeInTheDocument();
    expect(screen.queryByRole("group", { name: /flappy bird game board/i })).not.toBeInTheDocument();
  });

  test("starting makes the bird fall until the game is over", () => {
    mockSmallScreen(true);
    renderPage();

    jest.useFakeTimers();
    fireEvent.click(screen.getByRole("button", { name: /start/i }));
    act(() => {
      jest.advanceTimersByTime(3000); // never flapped again: it hits the ground
    });

    expect(screen.getByText("Game over!")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /play again/i })).toBeInTheDocument();
  });

  test("touching a word collects it, levels up and unlocks the email", () => {
    mockSmallScreen(true);

    // Work out when to flap using the pure engine with the same random numbers
    // (Math.random is mocked to 0), then replay those key presses in the page.
    // The bot flaps whenever the bird sinks below y=105, which keeps it inside the gap.
    const random = () => 0;
    let sim = flap(createFlappy(gameWords));
    const flapFrames = [];
    let frames = 0;
    while (sim.collected.length === 0 && sim.status === "running" && frames < 600) {
      if (sim.bird.y > 105) {
        sim = flap(sim);
        flapFrames.push(frames);
      }
      sim = step(sim, 1, random);
      frames++;
    }
    expect(sim.collected).toHaveLength(1); // the plan itself works

    renderPage();
    jest.useFakeTimers();
    fireEvent.click(screen.getByRole("button", { name: /start/i }));
    for (let frame = 0; frame < frames; frame++) {
      if (flapFrames.includes(frame)) fireEvent.keyDown(window, { key: " " });
      act(() => {
        jest.advanceTimersToNextTimer(); // exactly one game frame
      });
    }

    expect(screen.getByText("Words: 1")).toBeInTheDocument();
    expect(screen.getByText("Level: 1")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /@/ })).toBeInTheDocument();
    expect(window.localStorage.getItem("portfolio:game:level")).toBe("1");
  });
});

// --- Switching games with the toggle ----------------------------------------------------

describe("the game toggle", () => {
  const setScreen = (small) => {
    window.matchMedia = (query) => ({
      matches: small,
      media: query,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
    });
  };

  afterEach(() => {
    delete window.matchMedia;
  });

  const renderPage = () =>
    render(
      <MemoryRouter>
        <GamePage />
      </MemoryRouter>,
    );

  test("the active game is highlighted and the other can be picked on a large screen", () => {
    setScreen(false);
    renderPage();

    expect(screen.getByRole("button", { name: "Snake" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Flappy bird" })).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(screen.getByRole("button", { name: "Flappy bird" }));

    expect(screen.getByRole("group", { name: /flappy bird game board/i })).toBeInTheDocument();
    expect(screen.queryByRole("group", { name: /snake game board/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Flappy bird" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/tap to flap the bird/i)).toBeInTheDocument();
  });

  test("a small screen can switch to the snake and back", () => {
    setScreen(true);
    renderPage();
    expect(screen.getByRole("group", { name: /flappy bird game board/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Snake" }));
    expect(screen.getByRole("group", { name: /snake game board/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Flappy bird" }));
    expect(screen.getByRole("group", { name: /flappy bird game board/i })).toBeInTheDocument();
  });

  test("clicking the game that is already showing keeps it", () => {
    setScreen(false);
    renderPage();

    fireEvent.click(screen.getByRole("button", { name: "Snake" }));

    expect(screen.getByRole("group", { name: /snake game board/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Snake" })).toHaveAttribute("aria-pressed", "true");
  });

  test("switching games restarts the word count but keeps unlocked rewards", () => {
    setScreen(false);
    renderPage();

    // Eat one word with the snake (see the first test for the route).
    jest.useFakeTimers();
    fireEvent.click(screen.getByRole("button", { name: /^start$/i }));
    press("ArrowUp");
    advance(8);
    press("ArrowLeft");
    advance(5);
    expect(screen.getByText("Words: 1")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /@/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Flappy bird" }));

    expect(screen.getByText("Words: 0")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /collected words \(0\)/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /@/ })).toBeInTheDocument(); // still unlocked
  });
});
