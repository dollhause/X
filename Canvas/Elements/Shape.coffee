# ----------------------------------------------------------------
#
# 	X > Canvas > Shape > View
# 
# ----------------------------------------------------------------
define 'X.Canvas.Shape', ['X.View'], (View) ->

	class ShapeView extends View

		initialize: ->
			@model.on 'render', @render, @

		render: (canvas) ->
			points = @model.elements.select 'point'
			length = points.length - 1
			canvas.trigger 'beginPath'
			for point, i in points
				if i is 0
					canvas.trigger 'moveTo', point.get('x'), point.get('y')
				else if i isnt length
					canvas.trigger 'lineTo', point.get('x'), point.get('y')
				else 
					canvas.trigger 'lineTo', point.get('x'), point.get('y')
					canvas.trigger 'lineTo', points[0].get('x'), points[0].get('y')
			canvas.trigger 'fill closePath'