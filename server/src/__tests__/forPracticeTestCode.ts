// source code for practice

import { bi } from "../forPracticeCode";

describe("practice test", () => {
  it.skip("test 1.", () => {
    expect(1 + 2).toBe(3);
  });

  it("test 2.", () => {
    const testData = 3;
    const actual = bi(testData);
    expect(actual).toBe(testData * 2);
  });

  it.only("test 3.", () => {
    const testData = 3;
    const actual = bi(testData);
    expect(actual).toBe(testData * 2);
  });
});
