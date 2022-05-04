/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleDirectories: [
        'src',
        'node_modules',
    ],
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
        '\\.(png|svg)$': '<rootDir>/mocks/resourceMock.js',
    },
};
