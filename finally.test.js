// finally.test.js
import * as finallyEx from "./finallyEx";

test("import datasetSupporter and use function", () => {
  const actual = finallyEx.add(1, 2);

  expect(actual).toBe(3);
});
