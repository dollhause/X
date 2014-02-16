# ----------------------------------------------------------------
#
# 	X > Shape
# 
# ----------------------------------------------------------------
define 'X.Shape', ['X.Element'], (Element) ->

	class Shape extends Element

		defaults:
			type: 'shape'
			fillColor: 'transparent'
			fillOpacity: 1
			strokeColor: 'transparent'
			strokeWidth: 0
			strokeCap: 'round'
			strokeOpacity: 1