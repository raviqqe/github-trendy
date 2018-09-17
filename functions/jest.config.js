module.exports = {
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testEnvironment: "node",
  testMatch: ["<rootDir>/**/__tests__/*.ts"]
};
