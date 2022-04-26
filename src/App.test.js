import { render, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import firebaseEmulatorConfig from "../firebase.json";
import { readFileSync } from "fs";

jest.setTimeout(100000);

export const wait = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

describe("prueba", () => {
  beforeAll(async () => {
    const rootEnvironment = await initializeTestEnvironment({
      projectId: "demo-project",
      firestore: {
        rules: readFileSync("firestore.rules", "utf8"),
        host: "localhost",
        port: firebaseEmulatorConfig.emulators.firestore.port,
      },
    });
  });

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
