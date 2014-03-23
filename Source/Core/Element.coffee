# ----------------------------------------------------------------
#
# 	X > Element Elemental/Elementary
# 
# ----------------------------------------------------------------
define 'Element', ->

	id = 0

	array = (val) -> if isArray(val) then return val else return [val]

	class Element extends Observer

		defaults:
			x: 0
			y: 0
			fillColor: 'transparent'
			fillOpacity: 1
			strokeColor: 'transparent'
			strokeWidth: 0
			strokeCap: 'round'
			strokeOpacity: 1

		constructor: (attributes, isClone) ->
			super
			@children = []
			if isClone then @attributes = attributes
			else 
				@attributes = extend clone(@defaults), attributes, id: id++

		get: (attr) -> @attributes[attr]

		set: (attrs) -> 
			extend @attributes, attrs
			return @

		is: (model) -> return @attributes.id is model.attributes.id

		add: (models) ->
			models = array models
			for model in models
				clone = new (model.constructor)(model.attributes, true)
				clone.on 'remove', @remove, @
				clone.add child for child in model.children
				@children.push clone
			return @

		has: (model) -> 
			has = false
			for child in @children
				if child.is(model) 
					has = true
					break
			return has

		find: (type) ->
			result = []
			for child in @children
				if child.get('type') is type then result.push child
			return result


		# remove: (model) ->
		# 	for child, i in @children
		# 		if child.is model then @children.splice i, 0
