# ----------------------------------------------------------------
#
# 	Renderer
# 
# ----------------------------------------------------------------
define 'Canvas.Renderer', ['Element', 'Canvas.Point', 'Canvas.Shape'], (Element, Point, Shape) ->

	template = ->

	class Renderer extends Element

		views:
			point: Point
			shape: Shape

		model: (@model) ->
			@model.on 'create', @create, @
			@model.on 'render', @render, @
			@model.on 'change:opacity', @opacity, @
			@model.on 'change:fillColor', @fillColor, @
			@model.on 'change:strokeColor', @strokeColor, @
			@model.on 'change:strokeWidth', @strokeWidth, @
			@model.on 'change:strokeCap', @strokeCap, @
			@model.on 'beginPath', @beginPath, @
			@model.on 'moveTo', @moveTo, @
			@model.on 'lineTo', @lineTo, @
			@model.on 'arc', @arc, @
			@model.on 'bezierCurveTo', @bezierCurveTo, @
			@model.on 'closePath', @closePath, @
			@model.on 'fill', @fill, @
			@model.on 'stroke', @stroke, @

		create: (container) ->
			@el = document.createElement("canvas");
			@el.height = @model.get('height');
			@el.width = @model.get('width');
			container.appendChild(@el); 
			@x = @el.getContext('2d')

		render: -> @x.clearRect 0, 0, @model.get('width'), @model.get('height')

		opacity: (a, b) -> @x.globalAlpha = b

		fillColor: (a) -> @x.fillStyle = a

		strokeColor: (a, b) -> @x.strokeStyle = b

		strokeWidth: (a, b) -> @x.lineWidth = b

		strokeCap: (a, b) -> @x.lineCap = b

		beginPath: -> @x.beginPath()

		moveTo: (x, y) -> @x.moveTo x, y

		lineTo: (x, y) -> @x.lineTo x, y
			
		arc: (x, y, r, a) -> @x.arc x, y, r, 0, a, false

		bezierCurveTo: (cx1, cy1, cx2, cy2, x2, y2) -> @x.bezierCurveTo cx1, cy1, cx2, cy2, x2, y2

		closePath: -> @x.closePath()

		fill: -> @x.fill()

		stroke: -> @x.stroke()
