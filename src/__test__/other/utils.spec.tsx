import { generateNumberFromText } from "../../utils";
describe("Functions in utils", () => {
  it("returns a number whenever passed a string", () => {
    const randomString = Math.random().toString(36).substring(2);
    const digit = generateNumberFromText(randomString);
    expect(typeof digit).toBe("number");
  });
  it("is deterministic, It return the same number for the same input string", () => {
    const randomString = Math.random().toString(36).substring(2);
    const digit = generateNumberFromText(randomString)
    const digitList = Array(20).fill(generateNumberFromText(randomString));
    for (let i =0; i< digitList.length; i++) {
        expect(digitList[i]).toBe(digit)
    }
  });
});
