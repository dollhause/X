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
			fillColor: 'transparent'
			fillOpacity: 1
			strokeColor: 'transparent'
			strokeWidth: 0
			strokeCap: 'round'
			strokeOpacity: 1