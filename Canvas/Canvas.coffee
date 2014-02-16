# ----------------------------------------------------------------
#
# 	X > Canvas
# 
# ----------------------------------------------------------------
define 'X.Canvas', ['X.Element', 'X.Canvas.Renderer'], (Element, Renderer) ->

	class Canvas extends Element

		defaults: 
			width: undefined
			height: undefined
			animating: 0
			opacity: 1
			# ----------------------------------------------------
			# 	Element Attributes
			# ----------------------------------------------------
			fillColor: 'transparent'
			fillOpacity: 1
			strokeColor: 'transparent'
			strokeWidth: 0
			strokeCap: 'round'
			strokeOpacity: 1

		initialize: ->
			super
			new Renderer model: @
			@on 'render', @render
			@on 'change:animating', @animating

		animate: -> @set animating: @get('animating') + 1

		animated: -> @set animating: @get('animating') - 1

		animating: ->
			if @get('animating') and !@previous('animating') then @trigger 'render'

		render: ->
			@elements.each (m) =>
				@set m.attributes
				m.trigger 'render', @
			if @get 'animating' then requestAnimationFrame => @trigger 'render'

		refresh: -> @animate().animated()
