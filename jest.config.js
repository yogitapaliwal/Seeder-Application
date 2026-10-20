export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  moduleNameMapper: {
    '\\.svg\\?react$': '<rootDir>/src/__mocks__/svgrMock.tsx',
    '\\.(svg|gif)$': '<rootDir>/src/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  testMatch: ['**/?(*.)+(spec|test).(ts|tsx)'],

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  collectCoverage: true,

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    // barrel re-export files - some have a stray leading space in the filename
    // (e.g. "CardSkeleton/ index.ts"), hence the leading `*` rather than an exact match.
    '!src/**/*index.{ts,tsx}',
    '!src/**/*.d.ts',
    // Page-level components and route config are integration-test territory
    // (data fetching, routing, multi-step flows) - out of scope for this unit
    // test suite, so they're excluded rather than counted as an uncovered gap.
    '!src/pages/**',
    '!src/App.tsx',
    // Test infrastructure, not application code - setupTests.ts (polyfills
    // for the jsdom environment) and __mocks__/* (svg/gif stand-ins wired up
    // via moduleNameMapper) exist to support tests, not to be tested.
    '!src/setupTests.ts',
    '!src/__mocks__/**',
  ],

  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text', 'clover'],
};
