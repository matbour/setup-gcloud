module.exports = {
  rootDir: '.',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': [
      '@swc-node/jest',
      {
        target: 'es2020',
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        keepClassNames: true,
      },
    ],
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts'],
  coverageReporters: ['lcov', 'text-summary'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
