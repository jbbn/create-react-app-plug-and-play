import nth from "lodash/fp/nth";

interface RequireEntry {
  route: string;
  path: string;
  requireStr: string;
}

/**
 * From an array of file paths, creates array of route + require call
 * @param dirEntries flat array with full path directories and files
 * @returns array of strings, which map a route to a file require call
 */
const mapDirToRequireEntries = (dirEntries: string[]) => {
  const requireEntries = dirEntries.reduce((acc: RequireEntry[], curr: string) => {
    const [, path = ""] = curr.match(/.+\/(pages.+)\.\w{2,3}$/) || [];
    const route = path
      .replace(/\/index$/, "") // remove trailing /index
      .replace(/pages\/?/, "") // remove leading pages/
      .replace(/\[(\w+)\]/g, ":$1"); // change [param] to :param
    const requireStr = `'${route === "" ? "" : `/${route}`}': require('./${path}').default,`;
    const routeExists = acc.find((entry) => entry.route === route);

    if (routeExists) throw new Error(`Duplicated route: "${route}"`);

    return [...acc, { route, path, requireStr }];
  }, []);
  return requireEntries.map(({ requireStr }) => requireStr);
};

export default mapDirToRequireEntries;
