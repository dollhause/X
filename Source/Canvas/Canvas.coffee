# ----------------------------------------------------------------
#
# 	X > Canvas
# 
# ----------------------------------------------------------------
define 'Canvas', ['Element', 'Canvas.Renderer'], (Element, Renderer) ->

	array = (val) -> if isArray(val) then return val else return [val]

	add = (models) ->
		models = array models
		for model in models
			clone = new (model.constructor)(model.attributes, true)
			view = Renderer.prototype.views[model.get('type')]
			new view().model clone
			clone.on('remove', @remove, @).on('animate', @animate, @).on('animated', @animated, @).on('add', @view, @)
			add.call clone, child for child in model.children
			@children.push clone

	class Canvas extends Element

		defaults: extend
			width: undefined
			height: undefined
			animating: 0
			opacity: 1
		, Element.prototype.defaults

		constructor: ->
			super
			new Renderer().model @
			@on 'change:animating', @animates
			@on 'animating', @animating
			@on 'render', @render

		set: (attrs) -> 
			for key, current of attrs
				prev = @attributes[key]
				@attributes[key] = current
				if current isnt prev then @trigger 'change:' + key + ' change', current, prev
			return @

		# 
		# 	Animation Loop
		# 
		animate: -> @set animating: @get('animating') + 1

		animated: -> @set animating: @get('animating') - 1

		animates: (animating, previous) -> if animating and previous is 0 then @trigger 'animating'

		animating: -> if @get 'animating' then requestAnimationFrame => @trigger 'render animating', @, 0, 0		

		# 
		# 	Render Loop
		# 
		refresh: -> @trigger 'render', @, 0, 0

		render: (model, x, y) ->
			x = x + model.get 'x'
			y = y + model.get 'y'
			for child in model.children
				@set child.attributes
				child.trigger 'render', @, x, y
				@render child, x, y
		# 
		# 	Adding children
		# 
		add: (models) ->
			add.call @, models
			return @
