module.exports = {
	moduleFileExtensions: ['ts', 'js'],
	"modulePathIgnorePatterns": ["<rootDir>/dist"],
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	testEnvironment: "node",
	testMatch: ['<rootDir>/**/__tests__/*.ts'],
};
