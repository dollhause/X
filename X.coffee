# ----------------------------------------------------------------
#
# 	X
# 
# ----------------------------------------------------------------
# @codekit-prepend "Core/Animate.coffee"
# @codekit-prepend "Core/Canvas.coffee"
# @codekit-prepend "Core/Element.coffee"
# @codekit-prepend "Core/Overlay.coffee"
# @codekit-prepend "Core/Point.coffee"
# @codekit-prepend "Core/Shape.coffee"
# ----------------------------------------------------------------
define 'X', ['X.Animate', 'X.Canvas', 'X.Element', 'X.Overlay', 'X.Point', 'X.Shape'], (Animate, Canvas, Element, Overlay, Point, Shape) ->

	return { 
		Animate: Animate
		Canvas: Canvas
		Element: Element
		Overlay: Overlay
		Point: Point
		Shape: Shape
	}