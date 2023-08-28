import { generateOutput } from "./generateOutput.js";

test("generateOutput function", () => {
  const result = generateOutput(50);
  const expectedResult =
    "1,2,Frontend,4,Backend,Frontend,7,8,Frontend,Backend,11,Frontend,13,14,Frontend Backend,16,17,Frontend,19,Backend,Frontend,22,23,Frontend,Backend,26,Frontend,28,29,Frontend Backend,31,32,Frontend,34,Backend,Frontend,37,38,Frontend,Backend,41,Frontend,43,44,Frontend Backend,46,47,Frontend,49,Backend";

  expect(result).toEqual(expectedResult);
});
