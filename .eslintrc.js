module.exports = {
	extends: 'airbnb',
	plugins: ['react', 'jsx-a11y', 'import'],
	env: {
		browser: true,
		node: true,
		es6: true
	},
	rules: {
		indent: [2, 'tab'],
		'no-tabs': 0,
		'consistent-return': 0,
		strict: 0,
		'linebreak-style': 0,
		'no-console': 0,
		'no-underscore-dangle': 0,
		'global-require': 0,
		'import/no-extraneous-dependencies': 0,
		'no-param-reassign': 0,
		'no-mixed-operators': 0,
		'no-bitwise': ['error', { allow: ['~'] }],
		'comma-dangle': ['error', { functions: 'ignore' }],
		'new-cap': 0
	},
	globals: {
		game: true,
		me: true
	}
};
