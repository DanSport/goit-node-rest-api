module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/test\\.js$",
  ],
};
