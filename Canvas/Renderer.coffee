# ----------------------------------------------------------------
#
# 	X > Canvas > Renderer
# 
# ----------------------------------------------------------------
define 'X.Canvas.Renderer', ['X.View'], (View) ->

	class CanvasView extends View

		template: _.template '<canvas height="<%= height %>" width="<%= width %>"></canvas>'

		initialize: ->
			@model.on 'create', @create, @
			@model.on 'render', @render, @
			@model.on 'change:opacity', @opacity, @
			@model.on 'change:strokeColor', @strokeColor, @
			@model.on 'change:strokeWidth', @strokeWidth, @
			@model.on 'change:strokeCap', @strokeCap, @
			@model.on 'beginPath', @beginPath, @
			@model.on 'moveTo', @moveTo, @
			@model.on 'lineTo', @lineTo, @
			@model.on 'arc', @arc, @
			@model.on 'closePath', @closePath, @
			@model.on 'fill', @fill, @
			@model.on 'stroke', @stroke, @

		create: (container) ->
			container.html @template @model.attributes
			@$el = container.find('canvas').last()
			@x = @$el[0].getContext('2d')
			@delegateEvents()

		render: -> @x.clearRect 0, 0, @model.get('width'), @model.get('height')

		opacity: (a, b) -> @x.globalAlpha = b

		strokeColor: (a, b) -> @x.strokeStyle = b

		strokeWidth: (a, b) -> @x.lineWidth = b

		strokeCap: (a, b) -> @x.lineCap = b

		beginPath: -> @x.beginPath()

		moveTo: (x, y) -> @x.moveTo x, y

		lineTo: (x, y) -> @x.lineTo x, y
			
		arc: (x, y, r, a) -> @x.arc x, y, r, 0, a, false

		closePath: -> @x.closePath()

		fill: -> @x.fill()

		stroke: -> @x.stroke()

		events: 
			'click': (e) ->
				e.preventDefault()
				@model.trigger('click')




