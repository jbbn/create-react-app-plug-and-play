import mapDirToRequireEntries from "./mapDirToRequireEntries";

describe("mapDirToRequireEntries()", () => {
  it("should map home page", () => {
    const input = ["/home/tester/projects/app/src/pages/index.tsx"];
    const output = ["'': require('./pages/index').default,"];

    expect(mapDirToRequireEntries(input)).toEqual(output);
  });

  it("should map 2 pages", () => {
    const input = [
      "/home/tester/projects/app/src/pages/index.tsx",
      "/home/tester/projects/app/src/pages/users.tsx",
    ];
    const output = [
      "'': require('./pages/index').default,",
      "'/users': require('./pages/users').default,",
    ];

    expect(mapDirToRequireEntries(input)).toEqual(output);
  });

  it("should map pages with dynamic params", () => {
    const input = [
      "/home/tester/projects/app/src/pages/index.tsx",
      "/home/tester/projects/app/src/pages/user/[name].tsx",
    ];
    const output = [
      "'': require('./pages/index').default,",
      "'/user/:name': require('./pages/user/[name]').default,",
    ];

    expect(mapDirToRequireEntries(input)).toEqual(output);
  });

  it("should map a main file and subpages", () => {
    const input = [
      "/home/tester/projects/app/src/pages/index.tsx",
      "/home/tester/projects/app/src/pages/team.tsx",
      "/home/tester/projects/app/src/pages/team/details.tsx",
    ];
    const output = [
      "'': require('./pages/index').default,",
      "'/team': require('./pages/team').default,",
      "'/team/details': require('./pages/team/details').default,",
    ];

    expect(mapDirToRequireEntries(input)).toEqual(output);
  });

  it("should map a main file and subpages (with params)", () => {
    const input = [
      "/home/tester/projects/app/src/pages/index.tsx",
      "/home/tester/projects/app/src/pages/team.tsx",
      "/home/tester/projects/app/src/pages/team/[name].tsx",
    ];
    const output = [
      "'': require('./pages/index').default,",
      "'/team': require('./pages/team').default,",
      "'/team/:name': require('./pages/team/[name]').default,",
    ];

    expect(mapDirToRequireEntries(input)).toEqual(output);
  });

  it("should map a main file and subpages (with params - index)", () => {
    const input = [
      "/home/tester/projects/app/src/pages/index.tsx",
      "/home/tester/projects/app/src/pages/team/index.tsx",
      "/home/tester/projects/app/src/pages/team/[name].tsx",
    ];
    const output = [
      "'': require('./pages/index').default,",
      "'/team': require('./pages/team/index').default,",
      "'/team/:name': require('./pages/team/[name]').default,",
    ];

    expect(mapDirToRequireEntries(input)).toEqual(output);
  });

  it("should throw an error when having duplication", () => {
    const input = [
      "/home/tester/projects/app/src/pages/team.tsx",
      "/home/tester/projects/app/src/pages/team/index.tsx",
    ];

    expect(() => mapDirToRequireEntries(input)).toThrow();
  });

  it("should map even without a home page (index)", () => {
    const input = ["/home/tester/projects/app/src/pages/user/[name].tsx"];
    const output = ["'/user/:name': require('./pages/user/[name]').default,"];

    expect(mapDirToRequireEntries(input)).toEqual(output);
  });
});
