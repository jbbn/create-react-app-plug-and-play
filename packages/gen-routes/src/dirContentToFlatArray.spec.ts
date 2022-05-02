import fs from "fs";
import path from "path";
import dirContentToFlatArray from "./dirContentToFlatArray";

describe("dirContentToFlatArray()", () => {
  it("fixture1", () => {
    const input = path.resolve(__dirname, "..", "__tests__/fixtures/fixture1");
    const expectedFiles = [
      "app/pages/index.tsx",
      "app/pages/ignore.md",
      "app/pages/about/index.tsx",
    ];
    const output = expectedFiles.map((file) => path.resolve(input, file));

    expect(dirContentToFlatArray(input)).toEqual(expect.arrayContaining(output));
  });
});
