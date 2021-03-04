/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
/* eslint-env commonjs */

module.exports = {
	preset: 'ts-jest',
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	globals: {
		'ts-jest': {
			diagnostics: true,
		},
	},
};
