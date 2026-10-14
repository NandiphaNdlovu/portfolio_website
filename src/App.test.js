import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// Pages are lazy-loaded, so the first render needs longer than testing-library's 1s default.
const LOAD = { timeout: 10000 };

beforeEach(() => {
  window.location.hash = "";
});

test("renders the home page with its tabs", async () => {
  render(<App />);

  expect(
    await screen.findByRole(
      "heading",
      { level: 1, name: /software developer/i },
      LOAD,
    ),
  ).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: "About Me" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(screen.getByRole("tab", { name: "Skills" })).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: "Experience" })).toBeInTheDocument();
});

test("switching tabs updates the selection and the URL", async () => {
  render(<App />);

  const skillsTab = await screen.findByRole("tab", { name: "Skills" }, LOAD);
  await act(async () => {
    userEvent.click(skillsTab);
  });

  // Router state updates are wrapped in a transition, so wait for them to land.
  expect(
    await screen.findByRole("tab", { name: "Skills", selected: true }),
  ).toBeInTheDocument();
  expect(window.location.hash).toContain("tab=skills");
});

test("a tab can be opened directly from the URL", async () => {
  window.location.hash = "#/?tab=experience";
  render(<App />);

  expect(
    await screen.findByRole(
      "tab",
      { name: "Experience", selected: true },
      LOAD,
    ),
  ).toBeInTheDocument();
});

test("the projects route renders", async () => {
  window.location.hash = "#/projects";
  render(<App />);

  expect(
    await screen.findByRole("heading", { level: 1, name: "Projects" }, LOAD),
  ).toBeInTheDocument();
});

test("navbar links are accessible and open safely", async () => {
  render(<App />);

  const github = await screen.findByRole("link", { name: "GitHub" }, LOAD);
  expect(github).toHaveAttribute("target", "_blank");
  expect(github).toHaveAttribute("rel", expect.stringContaining("noopener"));
});
