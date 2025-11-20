module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    // This tells Jest to use ts-jest for ts/tsx files
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.app.json',
    }],
  },
  // Optional: Setup file to extend jest matchers globally
  // setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};