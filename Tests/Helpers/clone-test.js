var buster = require('buster');
var assert = buster.referee.assert;

buster.testCase('clone: ', {

	'clone an object': function () {
		var obj = { scoop: 'doop' };
		var cln = clone(obj);
		assert.equals(cln.scoop, 'doop');
	},

	'update a cloned object and the original doesn\'t change': function () {
		var obj = { scoop: 'doop' };
		var cln = clone(obj);
		cln.scoop = 'newdoop';
		assert.equals(obj.scoop, 'doop');
	},

	'update the original object and the clone doesn\'t change': function () {
		var obj = { scoop: 'doop' };
		var cln = clone(obj);
		obj.scoop = 'newdoop';
		assert.equals(cln.scoop, 'doop');
	}

});