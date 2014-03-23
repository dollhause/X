# ----------------------------------------------------------------
#
# 	define/using
# 
# ----------------------------------------------------------------
(->
	
	class AMD extends Observer

		constructor: ->
			super
			@modules = {}

		define: ->
			o = dependencies: []
			for arg in arguments
				if isString(arg) then o.name = arg
				if isFunction(arg) then callback = arg
				if isArray(arg) then o.dependencies = arg
			called = false
			o.callback = (after) =>				
				return after called if called
				@require o.dependencies, ->
					called =  callback.apply null, arguments
					after called
			@modules[o.name] = o
			@trigger o.name

		require: ->
			o = dependencies: []
			for arg in arguments
				if isFunction(arg) then o.callback = arg
				if isArray(arg) then o.dependencies = arg
			available = []
			run = ->
				args = []
				available.sort (a, b) -> a[1] - b[1]
				for a in available
					a[0].callback (called) ->
						args.push called
				o.callback.apply null, args
			attempt = =>
				available = []
				for dependency, i in o.dependencies
					if @modules[dependency] then available.push [@modules[dependency], i] 
					else @on dependency, attempt
				if available.length is o.dependencies.length then run()
			attempt()


	amd = new AMD	
	this.using = -> amd.require.apply amd, arguments
	this.define = -> amd.define.apply amd, arguments


)(this)