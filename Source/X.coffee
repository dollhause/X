# ----------------------------------------------------------------
#
# 	X
# 
# ----------------------------------------------------------------
# @codekit-prepend "Helpers/is.coffee"
# @codekit-prepend "Helpers/extend.coffee"
# @codekit-prepend "Helpers/clone.coffee"
# @codekit-prepend "Helpers/Observer.coffee"
# @codekit-prepend "Helpers/require.coffee"
# @codekit-prepend "Models/Point.coffee"
# @codekit-prepend "Models/Shape.coffee"
# @codekit-prepend "Core/Animate.coffee"
# @codekit-prepend "Core/Element.coffee"
# @codekit-prepend "Canvas/Views/Point.coffee"
# @codekit-prepend "Canvas/Views/Shape.coffee"
# @codekit-prepend "Canvas/Renderer.coffee"
# @codekit-prepend "Canvas/Canvas.coffee"
# ----------------------------------------------------------------
define 'X', ['Canvas', 'Point', 'Shape'], (Canvas, Point, Shape) ->

	return {
		Canvas: Canvas
		Point: Point
		Shape: Shape
	}
