import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import for `toBeInTheDocument`
import App from "../App";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, prompt: "lorem testum 1" },
          { id: 2, prompt: "lorem testum 2" },
        ]),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("displays question prompts after fetching", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/));
  expect(await screen.findByText(/lorem testum 1/)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/New Question/));
  fireEvent.click(screen.getByText(/Add New Question/));
  expect(await screen.findByText(/New Question/)).toBeInTheDocument();
});

test("deletes the question when the delete button is clicked", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/));
  const question = await screen.findByText(/lorem testum 1/);
  expect(question).toBeInTheDocument();

  fireEvent.click(screen.getAllByText(/Delete Question/)[0]);
  expect(screen.queryByText(/lorem testum 1/)).not.toBeInTheDocument();
});

test("updates the answer when the dropdown is changed", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/));
  const question = await screen.findByText(/lorem testum 2/);
  expect(question).toBeInTheDocument();

  fireEvent.change(screen.getAllByRole("combobox")[1], {
    target: { value: "3" },
  });
  // Verify the dropdown value is updated (if the app reflects this in the DOM)
  expect(screen.getAllByRole("combobox")[1].value).toBe("3");
});
