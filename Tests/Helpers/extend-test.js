var buster = require('buster');
var assert = buster.referee.assert;

buster.testCase('extend: ', {

	'extend an object': function () {
		var obj = { yar: 'nar' };
		var extension = { star: 'jar' };
		extend(obj, extension);
		assert.equals(obj.star, 'jar');
	}

});