import React from "react";
import App from "./App";
import { getTotalCount, allNodes } from "./Animals";

test("getTotalCount should return 33", () => {
  const totalCount = getTotalCount(allNodes);
  expect(totalCount).toBe(33);
});
