var buster = require('buster');
var assert = buster.referee.assert;

buster.testCase('require/define: ', {
   
    'define a module without dependencies': function () {
        define('A', function() {
        	return { yar: 'jar' };
        });
        assert(true);
    },

    'define a module with dependencies': function () {
        define('A', ['B', 'C'], function() {
        	return { yar: 'jar' };
        });
        assert(true);
    },

    'require a defined module without dependencies': function () {
        define('A', function() {
        	return { yar: 'jar' };
        });
        using(['A'], function(A) {
        	assert(A && A.yar === 'jar');	
        });
    },

    'require a defined module with dependencies': function () {
        define('B', function() {
        	return { yar: 'jar' };
        });
        define('C', function() {
        	return { yar: 'jar' };
        });
        define('A', ['B', 'C'], function(B, C) {
        	return { yar: 'jar' };
        });
        using(['A'], function(A) {
        	assert(A && A.yar === 'jar');	
        });
    }

});