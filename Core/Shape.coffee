# ----------------------------------------------------------------
#
# 	X > Shape
# 
# ----------------------------------------------------------------
define 'X.Shape', ['X.Element'], (Element) ->

	class Shape extends Element

		defaults:
			type: 'shape'
			connect: true
			opacity: 1
			fill: '#000'
			color: '#000'
			stroke: 0.25

	class Shapes extends Element.Collection

		model: Shape

	Shape.Collection = Shapes

	return Shape