import fs from "fs";
import path from "path";

/**
 * Recursively read a dir to create a one-level array of fullpaths
 * @param dirPath directory full path
 * @param filepaths array of full file paths
 * @returns array of filepaths
 */
const dirContentToFlatArray = (dirPath: string, filepaths: string[] = []): string[] => {
  const files = fs.readdirSync(dirPath);

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      filepaths = dirContentToFlatArray(dirPath + "/" + file, filepaths);
    } else {
      filepaths.push(path.join(dirPath, "/", file));
    }
  });

  return filepaths;
};

export default dirContentToFlatArray;
