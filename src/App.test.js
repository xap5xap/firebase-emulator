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

const projectId = "friendlychat-88adc";

describe("prueba", () => {
  //THIS IS ACTUALLY NOT NEEDED
  // beforeAll(async () => {
  //   console.log("=========== beforeAll - begin");

  //   const rootEnvironment = await initializeTestEnvironment({
  //     projectId,
  //     firestore: {
  //       rules: readFileSync("firestore.rules", "utf8"),
  //       host: "localhost",
  //       port: firebaseEmulatorConfig.emulators.firestore.port,
  //     },
  //   });
  //   console.log("=========== beforeAll - end");
  // });

  beforeEach(async () => {
    //clear the emulator firestore before each test
    await fetch(
      `http://localhost:${firebaseEmulatorConfig.emulators.firestore.port}/emulator/v1/projects/${projectId}/databases/(default)/documents`,
      { method: "DELETE" }
    );
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

  it("should show new items 2", async () => {
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
