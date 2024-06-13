module.exports = {
	plugins: ['prettier-plugin-tailwindcss'],
	importSort: {
		'.js,.jsx,.ts,.tsx': {
			style: 'module',
			parser: 'typescript',
		},
	},
	useTabs: true,
	tabWidth: 2,
	semi: false,
	singleQuote: true,
	jsxSingleQuote: true,
}
