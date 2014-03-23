# ----------------------------------------------------------------
#
# 	Shape
# 
# ----------------------------------------------------------------
define 'Canvas.Shape', ['Element'], (Element) ->

	class Shape extends Element

		model: (@model) ->
			@model.on 'render', @render, @

		render: (canvas, x, y) ->
			points = @model.find 'point'
			length = points.length - 1
			x += @model.get 'x'
			y += @model.get 'y'
			for point, i in points
				if i is 0
					canvas.trigger 'moveTo', point.get('x') + x, point.get('y') + y
				else if i isnt length
					prev = points[i - 1].find 'point'
					next = point.find 'point'
					if prev.length is 2 and next.length is 2
						canvas.trigger 'bezierCurveTo', points[i - 1].get('x') + prev[1].get('x') + x, points[i - 1].get('y') + prev[1].get('y') + y, point.get('x') + next[0].get('x') + x, point.get('y') + next[0].get('y') + y, point.get('x') + x, point.get('y') + y
					else if prev.length is 2
						canvas.trigger 'bezierCurveTo', points[i - 1].get('x') + prev[1].get('x') + x, points[i - 1].get('y') + prev[1].get('y') + y, point.get('x') + x, point.get('y') + y, point.get('x') + x, point.get('y') + y
					else if next.length is 2
						canvas.trigger 'bezierCurveTo', points[i - 1].get('x') + x, points[i - 1].get('y') + y, point.get('x') + next[0].get('x') + x, point.get('y') + next[0].get('y') + y, point.get('x') + x, point.get('y') + y 
					else 
						canvas.trigger 'lineTo', point.get('x') + x, point.get('y') + y
				else 
					canvas.trigger 'lineTo', point.get('x') + x, point.get('y') + y
					canvas.trigger 'lineTo', points[0].get('x') + x, points[0].get('y') + y
			canvas.trigger 'fill closePath'