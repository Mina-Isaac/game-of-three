import { initializeGame } from "../../store/gameSlice";

describe("actions", () => {
  it("should create an action with the passed payload", () => {
    const sampleNumber = 1234;
    const action = initializeGame(sampleNumber);
    expect(action.payload).toEqual(sampleNumber);
    expect(typeof action.payload).toBe("number");
  });
});
