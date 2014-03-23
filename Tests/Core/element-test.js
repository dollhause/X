var buster = require('buster');
var assert = buster.referee.assert;

buster.testCase('element: ', {

	'require an Element': function () {
		using(['Element'], function(Element) {
			assert.defined(Element);
		});
	},

	'instantiate an Element': function () {
		using(['Element'], function(Element) {
			var element = new Element()
			assert.defined(element);
		});
	},

	'instantiate an Element': function () {
		using(['Element'], function(Element) {
			var element = new Element();
			assert.defined(element);
		});
	},

	'instantiate an Element without attributes': function () {
		using(['Element'], function(Element) {
			var element = new Element();
			assert.defined(element.attributes.fillColor, 'transparent');
		});
	},

	'instantiate an Element with attributes': function () {
		using(['Element'], function(Element) {
			var element = new Element({ fillColor: 'blue' });
			assert.equals(element.attributes.fillColor, 'blue');
		});
	},

	'instantiate an Element as a clone': function () {
		using(['Element'], function(Element) {
			var o = { fillColor: 'blue' };
			var element = new Element(o, true);
			o.fillColor = 'red';
			assert.equals(element.attributes.fillColor, 'red');
		});
	},

	'set and element property': function () {
		using(['Element'], function(Element) {
			var element = new Element();
			element.set({ name: 'joe' });
			assert.equals(element.attributes.name, 'joe');
		});
	},

	'set and get an element property': function () {
		using(['Element'], function(Element) {
			var element = new Element();
			element.set({ name: 'joe' });
			assert.equals(element.get('name'), 'joe');
		});
	},

	'set and get many element properties of different types': function () {
		using(['Element'], function(Element) {
			var element = new Element();
			element.set({ a: 'joe', b: 0, c: ['c'], d: { name: 'd' }, e: function() { return 'e'; } });
			assert(!!(
				element.get('a') === 'joe' &&
				element.get('b') === 0 &&
				element.get('c')[0] === 'c' &&
				element.get('d').name === 'd' && 
				element.get('e')() === 'e'
			));
		});
	},

	'an element is itself': function () {
		using(['Element'], function(Element) {
			var element = new Element();
			assert(element.is(element));
		});
	},

	'add an element to an element': function () {
		using(['Element'], function(Element) {
			var e0 = new Element();
			var e1 = new Element();
			e0.add(e1);
			assert.equals(e0.children.length, 1);
		});
	},

	'model sticks when adding the same element multiple times': function () {
		using(['Element'], function(Element) {
			var e0 = new Element();
			var e1 = new Element({ name: 'joe' });
			e0.add([e1, e1, e1]);
			e1.set({ name: 'bob' });
			assert(!!(
				e0.children[0].get('name') === 'bob' && 
				e0.children[1].get('name') === 'bob' &&
				e0.children[2].get('name') === 'bob'
			));	
		});
	},

	'model sticks when elements add themselves': function () {
		using(['Element'], function(Element) {
			var e0 = new Element();
			e0.add(e0).set({ name: 'tom' });
			assert(!!(e0.children[0].get('name') === 'tom'));	
		});
	},

	'element has an added element': function () {
		using(['Element'], function(Element) {
			var e0 = new Element();
			var e1 = new Element();
			e0.add(e1);
			assert(e0.has(e1));	
		});
	},

	'add a full element tree to an element': function () {
		using(['Element'], function(Element) {
			
			var e0 = new Element({ name: 'joe' }),
				e1 = new Element(),
				e3 = new Element(),
				e4 = new Element();

			e4.add(e0);

			e1.add([e3, e4]);

			e0.add(e1);

			assert.equals(e0.children[0].children[1].children[0].get('name'), 'joe');

		});
	},

	'the tree, when added, creates new trees': function () {
		using(['Element'], function(Element) {
			
			var e0 = new Element({ name: 'joe' }),
				e1 = new Element(),
				e3 = new Element(),
				e4 = new Element();

			e4.add(e0);

			e1.add([e3, e4]);

			e0.add(e1);

			assert.equals(e0.children[0].children[1].children[0].children.length, 0);

		});
	}


/*-------------------------------------------
	
	e0 >
		e1 >
			e3 
			e4 >
				e0 

---------------------------------------------*/


});