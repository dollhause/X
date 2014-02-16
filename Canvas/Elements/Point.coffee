# ----------------------------------------------------------------
#
# 	X > Canvas > Point
# 
# ----------------------------------------------------------------
define 'X.Canvas.Point', ['X.View'], (View) ->

	class PointView extends View

		initialize: ->
			@on 'render', @render, @

		render: (canvas) ->
			canvas.trigger 'beginPath arc fill closePath', @model.get('x'), @model.get('y'), @model.get('r'), 2 * Math.PI
