# ----------------------------------------------------------------
#
# 	is
# 
# ----------------------------------------------------------------
(->

	this.isString = (value) -> return typeof value is 'string'

	this.isFunction = (value) -> return typeof value is 'function'

	this.isObject = (value) -> return typeof value is 'object' and isNaN(value.length)

	this.isArray = (value) -> return typeof value is 'object' and !isNaN(value.length)

	this.isNumber = (value) -> return !isNaN(parseInt(value))

	this.isntString = (value) -> return !isString(value)

	this.isntFunction = (value) -> return !isFunction(value)

	this.isntObject = (value) -> return !isObject(value)

	this.isntArray = (value) -> return !isArray(value)

	this.isntNumber = (value) -> return !isNumber(value)
	

)(this)