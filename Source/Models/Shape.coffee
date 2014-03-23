# ----------------------------------------------------------------
#
# 	Shape
# 
# ----------------------------------------------------------------
define 'Shape', ['Element'], (Element) ->

	class Shape extends Element

		defaults: extend
			type: 'shape'
		, Element.prototype.defaults