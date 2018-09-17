module.exports = {
  collectCoverage: true,
  moduleFileExtensions: ["ts", "js", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.ts$": "ts-jest"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: ["<rootDir>/src/**/__tests__/*.ts"]
};
