module.exports = {
	moduleFileExtensions: ['ts', 'js'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	testEnvironment: "node",
	testMatch: ['<rootDir>/**/__tests__/*.ts'],
};
