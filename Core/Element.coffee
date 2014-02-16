# ----------------------------------------------------------------
#
# 	X > Element
# 
# ----------------------------------------------------------------
define 'X.Element', ['X.Model', 'X.Collection', 'X.Animate'], (Model, Collection, Animate) ->

	class Element extends Model

		defaults: 
			type: undefined

		initialize: ->
			@elements = new Collection

		created: ->
			if !@isCreated 
				@isCreated = true
				return false
			else return true

		canvas: (canvas) ->
			@_canvas = canvas
			return @

		render: -> return @

		# -------------------------------------------------------
		# 	Children
		# -------------------------------------------------------
		add: (models) ->
			models = [models] if typeof models isnt 'object' and !models.length
			for model in models
				model.canvas(@_canvas).trigger 'create'
			@elements.add models
			return @

		remove: (models) ->
			@elements.remove models
			return @

		select: (type) ->
			collection = new Collection
			collection.add @elements.where type: type

		last: -> @elements.last()

		empty: -> 
			@elements.reset()
			return @

		# -------------------------------------------------------
		# 	Animation
		# -------------------------------------------------------
		animate: (options, duration, easing, callback) ->
			duration = duration || 400
			for start, end of options
				@_canvas.animate()
				@_animation = Animate @get(start), end, duration, easing, (c) =>
					o = {}
					o[start] = c
					@set o 
				, =>
					@_canvas.animated()
					delete @_animation
			return @

		stop: ->
			if @_animation? then @_animation.stop()
			delete @_animation
			return @


	class Elements extends Collection

		model: Element

	Element.Collection = Elements

	return Element


