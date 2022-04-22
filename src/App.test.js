import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

jest.setTimeout(100000);

export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const wait = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

describe("prueba", () => {
  it("should show new items", async () => {
    const user = userEvent.setup();
    const { findAllByTestId, getByRole, queryByTestId } = render(<App />);

    expect(queryByTestId("item")).toBeNull();
    await user.click(getByRole("button", { name: "Add item to list" }));
    expect((await findAllByTestId("item")).length).toBe(1);

    console.log("Adding one done");
    await user.click(getByRole("button", { name: "Add item to list" }));
    await sleep(3000);

    expect((await findAllByTestId("item")).length).toBe(2);
  });
});
