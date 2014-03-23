var buster = require('buster');
var assert = buster.referee.assert;

buster.testCase('observer: ', {
   
    'instantiate an observer': function () {
        var o = new Observer();
        assert(!!o);
    },

    'bind a listener and trigger an event': function () {
        var o = new Observer();
        o.on('click', function() { 
        	assert(true);
        });
        o.trigger('click');
    },

    'bind on and trigger multiple events': function () {
        var i = 0, 
        	o = new Observer(),
        	test = function() {
        		i++;
        		if (i === 3) assert(true);
        	};
        o.on('click', test);
        o.trigger('click click click');
    },

    'pass parameters through a trigger': function () {
       	var o = new Observer();
        o.on('click', function(a,b,c,d,e,f) { 
        	assert(function() { return a === 0 && b === 1 && c === 2 && d === 3 && e === 4  && f === 5; });
        });
        o.trigger('click', 0, 1, 2, 3, 4, 5);
    }

});