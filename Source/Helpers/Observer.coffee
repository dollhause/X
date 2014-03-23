# ----------------------------------------------------------------
#
# 	Observer
# 
# ----------------------------------------------------------------
(->

	slice = Array.prototype.slice

	class this.Observer

		constructor: () ->
			@_listeners = {}

		on: (triggers, listener, context) ->
			triggers = triggers.split ' '
			bind = (trigger) =>
				if isntFunction listener then return
				@_listeners[trigger] ?= []
				@_listeners[trigger].push [listener, context]
			bind trigger for trigger in triggers
			return @

		trigger: (triggers) ->
			triggers = triggers.split(' ')
			for trigger in triggers
				functions = @_listeners[trigger]
				if functions?
					args = slice.call arguments, 1
					run = (listener) => 
						if listener[1]?
							listener[0].apply listener[1], args
						else 
							listener[0].apply @, args
					run listener for listener in functions
			return @

	

)(this)