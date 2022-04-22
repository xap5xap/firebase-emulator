import React from "react";
import { render, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

jest.setTimeout(100000);

export const wait = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

describe("prueba", () => {
  it("should show new items", async () => {
    const user = userEvent.setup();
    const { findAllByTestId, getByRole, getAllByTestId, queryByTestId } =
      render(<App />);

    expect(queryByTestId("item")).toBeNull();
    await user.click(getByRole("button", { name: "Add item to list" }));
    expect((await findAllByTestId("item")).length).toBe(1);

    console.log("Adding one done");
    await user.click(getByRole("button", { name: "Add item to list" }));

    await waitFor(
      () => {
        expect(getAllByTestId("item").length).toBe(2);
      },
      { timeout: 3000 }
    );
  });
});
