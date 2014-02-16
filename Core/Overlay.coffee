# ----------------------------------------------------------------
#
# 	X > Overlay
# 
# ----------------------------------------------------------------
define 'X.Overlay', ['X.Element'], (Element) ->

	class Overlay extends Element

		defaults:
			type: 'overlay'
			x: 0
			y: 0
			height: undefined
			width: undefined
			src: undefined
			opacity: 1
			scale: 1

	class Overlays extends Element.Collection

		model: Overlay

	Overlay.Collection = Overlays

	return Overlay