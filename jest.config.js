module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    rootDir: '.',
    testRegex: '.*\.spec\.ts$',
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.json',
            },
        ],
    },
};
