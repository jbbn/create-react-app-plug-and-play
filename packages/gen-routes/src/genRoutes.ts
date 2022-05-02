#!/usr/bin/env node

import shell from "shelljs";
import path from "path";
import fs from "fs";
import pipe from "lodash/fp/pipe";
import dirContentToFlatArray from "./dirContentToFlatArray";
import mapDirToRequireEntries from "./mapDirToRequireEntries";

export const createFileString = (requireEntries: string[]) => `/**
 * This is a generated file.
 */
export interface IPages extends React.FC {
  Layout: JSX.Element
}

type Pages = {
  [key: string]: IPages
}

const pages: Pages = {
  ${requireEntries.join("\n  ")}
}

// TODO: add this only if the file exists
export const LayoutDefault = require('./layouts/default').default

export default pages
`;

const filterByExt = (exts: string[]) => (filepaths: string[]) =>
  filepaths.filter((filepath) =>
    exts.map((ext) => `.${ext}`).includes(path.extname(filepath))
  );

export const createFileContent = pipe(
  dirContentToFlatArray,
  filterByExt(["tsx"]),
  mapDirToRequireEntries,
  createFileString
);

setTimeout(() => {
  const directoryPath = path.resolve(path.join(process.cwd(), "src/pages"));
  const $pages = path.resolve(process.cwd(), "./src/$pages.ts");

  // make sure the file exists
  shell.touch($pages);

  const content = createFileContent(directoryPath);
  fs.writeFileSync($pages, content);

  // feedback process ended
  console.log("Pages mapped");
}, 1000);
