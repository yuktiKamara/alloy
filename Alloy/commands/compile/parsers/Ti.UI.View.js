var CU = require('../compilerUtils');

exports.parse = function(node, state) {
	var args = CU.getParserArgs(node, state),
		code = '';

	// We only need special handling if there's a req attribute
	if (!args.req) {
		return require('./default').parse(node, state);
	} 

	// Generate runtime code
	var commonjs = "alloy/components/" + args.req;
	code += args.symbol + " = (require('" + commonjs + "')).create();\n";
	if (args.parent.symbol) {
		code += args.symbol + '.setParent(' + args.parent.symbol + ');\n';
	} 

	// Update the parsing state
	return {
		parent: {
			node: node,
			symbol: args.symbol,
			required: true 
		},
		styles: state.styles,
		code: code
	}
};