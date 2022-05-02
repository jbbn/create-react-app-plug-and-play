import fs from "fs";
import path from "path";
import { createFileContent } from "./genRoutes";

describe("== genRoutes ==", () => {
  describe("createFileContent()", () => {
    it("fixture1", () => {
      const input = path.resolve(
        __dirname,
        "..",
        "__tests__/fixtures/fixture1/app/pages"
      );
      const fixturePagesPath = path.resolve(
        __dirname,
        "..",
        "__tests__/fixtures/fixture1/app/$pages.ts"
      );
      const output = fs.readFileSync(fixturePagesPath, "utf-8");

      expect(createFileContent(input)).toEqual(output);
    });
  });
});
