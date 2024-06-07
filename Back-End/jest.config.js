module.exports = {
    preset: 'ts-jest',  // Use ts-jest for TypeScript support
    testEnvironment: 'node', // Use Node.js environment for testing
    transform: {
        '^.+\\.(t|j)s?$': 'ts-jest', // Transform TypeScript and JavaScript files
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$', // Define the test file pattern
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // File extensions to be recognized as modules
};