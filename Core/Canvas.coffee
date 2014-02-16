# ----------------------------------------------------------------
#
# 	X > Canvas
# 
# ----------------------------------------------------------------
define 'X.Canvas', ['X.Model', 'X.Collection'], (Model, Collection) ->

	class Canvas extends Model

		defaults:
			type: 'canvas'
			width: undefined
			height: undefined

		initialize: ->
			@elements = new Collection
			@on 'create', @create

		add: (models) ->
			models = [models] if typeof models isnt 'object' and !models.length
			for model in models
				model.canvas(@).trigger 'create'
			@elements.add models
			return @

		create: (container) -> return @

		animate: -> return @

		animated: -> return @





