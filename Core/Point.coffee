# ----------------------------------------------------------------
#
# 	X > Point
# 
# ----------------------------------------------------------------
define 'X.Point', ['X.Element'], (Element) ->

	class Point extends Element

		defaults:
			type: 'point'
			x: 0
			y: 0
			r: 5
			fill: '#000'
			stroke: 0
			color: '#000'

	class Points extends Element.Collection

		model: Point

	Point.Collection = Points

	return Point