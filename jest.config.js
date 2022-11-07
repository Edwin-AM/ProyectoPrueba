module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transformIgnorePatterns: ['<rootDir>/(node_modules|src)/($1|services|store|router|components|data|layout|util)'],
   
}
