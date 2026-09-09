import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20
    }
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'js'],
  preset: 'ts-jest',
  reporters: ['default', 'jest-junit'],
  resolver: 'ts-jest-resolver',
  roots: ['<rootDir>/src/', '<rootDir>/__tests__/'],
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: ['/dist/', '/megalinter-reports/', '/node_modules/'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.eslint.json',
        useESM: true
      }
    ]
  },
  verbose: true
}

export default jestConfig
