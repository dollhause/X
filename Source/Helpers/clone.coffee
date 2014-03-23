# ----------------------------------------------------------------
#
# 	clone
# 
# ----------------------------------------------------------------
(->

	this.clone = (obj) -> 
		if isntObject(obj) then return obj
		if isArray(obj) then return obj.slice() else return extend {}, obj

)(this)