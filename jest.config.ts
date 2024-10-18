export default {
    preset: 'ts-jest',            // Use ts-jest preset to handle TypeScript files
    testEnvironment: 'node',       // Set up the environment (e.g., browser or Node.js)
    roots: ['<rootDir>/tests'],    // Specify where the test files are located
    moduleFileExtensions: ['ts', 'js'],  // Extensions to look for when importing modules
    transform: {
      '^.+\\.ts$': 'ts-jest',      // Transform TypeScript files using ts-jest
    },
    testMatch: [
      '**/tests/*.test.ts',     // Regex pattern to find test files
    ],
}