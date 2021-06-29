export default {
  preset: "ts-jest",
  rootDir: ".",
  roots: ["<rootDir>/src/"],
  testEnvironment: "node",
  testRegex: ".spec.ts$",
  transform: { "^.+\\.(ts|tsx)$": "ts-jest" },
};
