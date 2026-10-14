import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UnlockList } from "./UnlockList.tsx";
import { unlocks, WORDS_PER_LEVEL } from "../../../data/game.ts";

const renderList = (unlockedLevel) =>
  render(
    <MemoryRouter>
      <UnlockList
        unlocks={unlocks}
        unlockedLevel={unlockedLevel}
        wordsPerLevel={WORDS_PER_LEVEL}
      />
    </MemoryRouter>,
  );

test("the first reward is the email address and the second is the CV", () => {
  expect(unlocks[0].id).toBe("email");
  expect(unlocks[1].id).toBe("cv");
  expect(WORDS_PER_LEVEL).toBe(10);
});

test("nothing is revealed before level 1", () => {
  renderList(0);

  expect(screen.queryByRole("link", { name: /@/ })).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /cv/i })).not.toBeInTheDocument();
  expect(screen.getByText(/collect 10 words/i)).toBeInTheDocument();
  expect(screen.getByText(/collect 20 words/i)).toBeInTheDocument();
});

test("level 1 reveals the email address but keeps the CV locked", () => {
  renderList(1);

  expect(screen.getByRole("link", { name: unlocks[0].label })).toHaveAttribute(
    "href",
    unlocks[0].href,
  );
  expect(screen.queryByRole("link", { name: /cv/i })).not.toBeInTheDocument();
  expect(screen.getByText(/collect 20 words/i)).toBeInTheDocument();
});

test("level 2 also reveals the CV download", () => {
  renderList(2);

  const cv = screen.getByRole("link", { name: /download my cv/i });
  expect(cv).toHaveAttribute("download");
});

test("every reward is shown once all levels are unlocked", () => {
  renderList(unlocks.length);

  expect(screen.queryByText(/locked/i)).not.toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(unlocks.length);
});
