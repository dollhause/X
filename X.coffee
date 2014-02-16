# ----------------------------------------------------------------
#
# 	X
# 
# ----------------------------------------------------------------
# @codekit-prepend "Core/Animate.coffee"
# @codekit-prepend "Core/Element.coffee"
# @codekit-prepend "Core/Elements/Point.coffee"
# @codekit-prepend "Core/Elements/Shape.coffee"
# @codekit-prepend "Canvas/Canvas.coffee"
# @codekit-prepend "Canvas/Renderer.coffee"
# @codekit-prepend "Canvas/Elements/Point.coffee"
# @codekit-prepend "Canvas/Elements/Shape.coffee"
# ----------------------------------------------------------------
define 'X', ['X.Animate', 'X.Element', 'X.Point', 'X.Shape', 'X.Canvas'], (Animate, Element, Point, Shape, Canvas) ->

	return { 
		Animate: Animate
		Element: Element
		Point: Point
		Shape: Shape
		Canvas: Canvas
	}