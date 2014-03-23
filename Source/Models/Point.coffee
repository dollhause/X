# ----------------------------------------------------------------
#
# 	Point
# 
# ----------------------------------------------------------------
define 'Point', ['Element'], (Element) ->

	class Point extends Element

		defaults: extend
			type: 'point'
			x: 0
			y: 0
			r: 5
		, Element.prototype.defaults
			