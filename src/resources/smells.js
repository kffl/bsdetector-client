const Smells = [
	{
		name: 'LINE_TOO_LONG',
		title: 'Line too long',
		description: 'The maximum recommended number of chars per line is: 140.',
		slug: 'line-too-long',
	},
	{
		name: 'EXCESSIVELY_LONG_ID',
		title: 'Identifier is excessively long',
		description:
			'The maximum recommended number of chars for identifiers is: 30.',
		slug: 'excessively-long-id',
	},
	{
		name: 'EXCESSIVELY_SHORT_ID',
		title: 'Identifier is excessively short',
		description:
			'The minimum recommended number of chars for identifiers is: 3.',
		slug: 'excessively-short-id',
	},
	{
		name: 'CHAIN_DOT_FUNC',
		title: 'Too long chaining of functions with the dot operator',
		description:
			'Maximum recommended number of function for chain with dot operator is: 6.',
		slug: 'chain-dot-func',
	},
	{
		name: 'LONG_METHOD',
		title: 'Too long method',
		description:
			'The maximum recommended number of lines per method is: 40.',
		slug: 'long-method',
	},
	{
		name: 'LONG_SCOPE_CHAINING',
		title: 'Too many levels of multiply-nested functions',
		description:
			'The maximum recommended level of nested functions is: 3.',
		slug: 'long-scope-chaining',
	},
	{
		name: 'SMALL_SWITCH_STATEMENT',
		title: 'Not enough case clauses in switch statement',
		description:
			'The minimum recommended number of case clauses in the switch statement is: 3.',
		slug: 'small-switch-statement',
	},
	{
		name: 'TOO_MANY_PARAMS_FUNCTION',
		title: 'Too many parameters for a function declaration',
		description:
			'The maximum recommended number of parameters for an arrow function is: 4.',
		slug: 'too-many-parameters-function',
	},
	{
		name: 'TOO_MANY_PARAMS_ARROW',
		title: 'Too many parameters for an arrow function',
		description:
			'The maximum recommended number of parameters for an arrow function is: 5.',
		slug: 'too-many-parameters-arrow-function',
	},
];

export default Smells;
