module.exports = {
  collectCoverage: true,
  moduleFileExtensions: ["ts", "js", "json", "vue"],
  preset: "ts-jest",
  setupTestFrameworkScriptFile: "./src/set-up-tests.ts",
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: ["<rootDir>/src/**/__tests__/*.ts"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub"
  }
};
