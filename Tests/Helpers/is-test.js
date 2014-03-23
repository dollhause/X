var buster = require('buster');
var assert = buster.referee.assert;

buster.testCase('is: ', {
   
    'a string is a string': function () {
        assert(isString('string'));
    },

    'a function isnt a string': function () {
        assert(!isString(function() {}));
    },

    'an object isnt a string': function () {
        assert(!isString({}));
    },

    'an array isnt a string': function () {
        assert(!isString([]));
    },

    'a number isnt a string': function () {
        assert(!isString(1));
    },

    'a string isnt a function': function () {
        assert(!isFunction('string'));
    },

    'a function is a function': function () {
        assert(isFunction(function() {}));
    },

    'an object isnt a function': function () {
        assert(!isFunction({}));
    },

    'an array isnt a function': function () {
        assert(!isFunction([]));
    },

    'a number isnt a function': function () {
        assert(!isFunction(1));
    },

    'a string isnt an object': function () {
        assert(!isObject('string'));
    },

    'a function isnt an object': function () {
        assert(!isObject(function() {}));
    },

    'an object is an object': function () {
        assert(isObject({}));
    },

    'an array isnt an object': function () {
        assert(!isObject([]));
    },

    'a number isnt an object': function () {
        assert(!isObject(1));
    },

    'a string isnt an array': function () {
        assert(!isArray('string'));
    },

    'a function isnt an array': function () {
        assert(!isArray(function() {}));
    },

    'an object isnt an array': function () {
        assert(!isArray({}));
    },

    'an array is an array': function () {
        assert(isArray([]));
    },

    'a number isnt an array': function () {
        assert(!isArray(1));
    },

    'a string isnt a number': function () {
        assert(!isNumber('string'));
    },

    'a function isnt a number': function () {
        assert(!isNumber(function() {}));
    },

    'an object isnt a number': function () {
        assert(!isNumber({}));
    },

    'an array isnt a number': function () {
        assert(!isNumber([]));
    },

    'a number is a number': function () {
        assert(isNumber(1));
    }

});
