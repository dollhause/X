# ----------------------------------------------------------------
#
# 	Point
# 
# ----------------------------------------------------------------
define 'Canvas.Point', ['Element'], (Element) ->

	class Point extends Element

		model: (@model) ->
			@model.on 'render', @render, @

		render: (canvas, x, y) ->
			canvas.trigger 'beginPath arc fill closePath', @model.get('x') + x, @model.get('y') + y, @model.get('r'), 2 * Math.PI
