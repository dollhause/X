# ----------------------------------------------------------------
#
# 	extend
# 
# ----------------------------------------------------------------
(->

	slice = Array.prototype.slice

	this.extend = (obj) -> 
		set = (prop, val) -> obj[prop] = val
		for source in slice.call arguments, 1
			if (source)
				set prop, val for prop, val of source
		return obj

)(this)