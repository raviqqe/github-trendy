module.exports = {
  collectCoverage: true,
  testURL: 'http://localhost',
  moduleFileExtensions: ['ts', 'js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.ts$': 'ts-jest'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['<rootDir>/(components|domain|pages)/**/__tests__/*.ts']
};
