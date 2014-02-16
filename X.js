// Generated by CoffeeScript 1.6.3
(function() {
    var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
        function ctor() {
            this.constructor = child;
        }
        for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
    };
    define("X.Animate", function() {
        var animate;
        animate = function(start, end, duration, easing, callback, complete) {
            var animationRequestId, current, difference, easingFunc, lastTime, overclocked, pause, pauseStart, paused, resume, startTime, startValue, step, stop;
            duration == null && (duration = 0);
            easingFunc = animate.easing[easing] || animate.easing.swing;
            startValue = start;
            difference = end - start;
            current = start;
            startTime = Date.now();
            pauseStart = startTime;
            paused = !0;
            animationRequestId = void 0;
            lastTime = Date.now();
            pause = function() {
                if (paused) return;
                paused = !0;
                cancelAnimationFrame(animationRequestId);
                return pauseStart = Date.now();
            };
            stop = function() {
                return pause();
            };
            resume = function() {
                if (!paused) return;
                paused = !1;
                startTime += Date.now() - pauseStart;
                return animationRequestId = requestAnimationFrame(step);
            };
            overclocked = function() {
                return !1;
            };
            step = function() {
                var currentTime, x;
                currentTime = Date.now() - startTime;
                x = 1 - (duration - currentTime) / duration;
                if (currentTime < duration && !paused) {
                    if (!overclocked()) {
                        current = easingFunc(x, currentTime, start, difference, duration);
                        callback && callback(current);
                        lastTime = Date.now();
                    }
                    return animationRequestId = requestAnimationFrame(step);
                }
                current = easingFunc(x, duration, start, difference, duration);
                callback && callback(end);
                return complete && complete();
            };
            resume();
            return {
                resume: resume,
                pause: pause,
                stop: stop
            };
        };
        animate.easing = {
            linear: function(x, t, b, c, d) {
                return b + x * c;
            },
            swing: function(x, t, b, c, d) {
                return b + (.5 - Math.cos(x * Math.PI) / 2) * c;
            },
            easeInQuad: function(x, t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOutQuad: function(x, t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOutQuad: function(x, t, b, c, d) {
                return (t /= d / 2) < 1 ? c / 2 * t * t + b : -c / 2 * (--t * (t - 2) - 1) + b;
            },
            easeInCubic: function(x, t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOutCubic: function(x, t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOutCubic: function(x, t, b, c, d) {
                return (t /= d / 2) < 1 ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b;
            },
            easeInQuart: function(x, t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOutQuart: function(x, t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOutQuart: function(x, t, b, c, d) {
                return (t /= d / 2) < 1 ? c / 2 * t * t * t * t + b : -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            },
            easeInQuint: function(x, t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOutQuint: function(x, t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOutQuint: function(x, t, b, c, d) {
                return (t /= d / 2) < 1 ? c / 2 * t * t * t * t * t + b : c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            },
            easeInSine: function(x, t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOutSine: function(x, t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOutSine: function(x, t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            },
            easeInExpo: function(x, t, b, c, d) {
                var _ref;
                return (_ref = t === 0) != null ? _ref : {
                    b: c * Math.pow(2, 10 * (t / d - 1)) + b
                };
            },
            easeOutExpo: function(x, t, b, c, d) {
                var _ref;
                return (_ref = t === d) != null ? _ref : b + {
                    c: c * (-Math.pow(2, -10 * t / d) + 1) + b
                };
            },
            easeInOutExpo: function(x, t, b, c, d) {
                return t === 0 ? b : t === d ? b + c : (t /= d / 2) < 1 ? c / 2 * Math.pow(2, 10 * (t - 1)) + b : c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            },
            easeInCirc: function(x, t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOutCirc: function(x, t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOutCirc: function(x, t, b, c, d) {
                return (t /= d / 2) < 1 ? -c / 2 * (Math.sqrt(1 - t * t) - 1) + b : c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            },
            easeInElastic: function(x, t, b, c, d) {
                var a, p, s;
                s = 1.70158;
                p = 0;
                a = c;
                if (t === 0) return b;
                if ((t /= d) === 1) return b + c;
                p || (p = d * .3);
                if (a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p)) + b;
            },
            easeOutElastic: function(x, t, b, c, d) {
                var a, p, s;
                s = 1.70158;
                p = 0;
                a = c;
                if (t === 0) return b;
                if ((t /= d) === 1) return b + c;
                p || (p = d * .3);
                if (a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else s = p / (2 * Math.PI) * Math.asin(c / a);
                return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * 2 * Math.PI / p) + c + b;
            },
            easeInOutElastic: function(x, t, b, c, d) {
                var a, p, s;
                s = 1.70158;
                p = 0;
                a = c;
                if (t === 0) return b;
                if ((t /= d / 2) === 2) return b + c;
                p || (p = d * .3 * 1.5);
                if (a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else s = p / (2 * Math.PI) * Math.asin(c / a);
                return t < 1 ? -0.5 * a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p) + b : a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p) * .5 + c + b;
            },
            easeInBack: function(x, t, b, c, d, s) {
                s == null && (s = 1.70158);
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOutBack: function(x, t, b, c, d, s) {
                s == null && (s = 1.70158);
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOutBack: function(x, t, b, c, d, s) {
                s == null && (s = 1.70158);
                return (t /= d / 2) < 1 ? c / 2 * t * t * (((s *= 1.525) + 1) * t - s) + b : c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
            },
            easeInBounce: function(x, t, b, c, d) {
                return c - animate.easing.easeOutBounce(x, d - t, 0, c, d) + b;
            },
            easeOutBounce: function(x, t, b, c, d) {
                return (t /= d) < 1 / 2.75 ? c * 7.5625 * t * t + b : t < 2 / 2.75 ? c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b : t < 2.5 / 2.75 ? c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b : c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
            },
            easeInOutBounce: function(x, t, b, c, d) {
                return t < d / 2 ? animate.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b : animate.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        };
        return animate;
    });
    define("X.Canvas", [ "X.Model", "X.Collection" ], function(Model, Collection) {
        var Canvas, _ref;
        return Canvas = function(_super) {
            function Canvas() {
                _ref = Canvas.__super__.constructor.apply(this, arguments);
                return _ref;
            }
            __extends(Canvas, _super);
            Canvas.prototype.defaults = {
                type: "canvas",
                width: void 0,
                height: void 0
            };
            Canvas.prototype.initialize = function() {
                this.elements = new Collection;
                return this.on("create", this.create);
            };
            Canvas.prototype.add = function(models) {
                var model, _i, _len;
                typeof models != "object" && !models.length && (models = [ models ]);
                for (_i = 0, _len = models.length; _i < _len; _i++) {
                    model = models[_i];
                    model.canvas(this).trigger("create");
                }
                this.elements.add(models);
                return this;
            };
            Canvas.prototype.create = function(container) {
                return this;
            };
            Canvas.prototype.animate = function() {
                return this;
            };
            Canvas.prototype.animated = function() {
                return this;
            };
            return Canvas;
        }(Model);
    });
    define("X.Element", [ "X.Model", "X.Collection", "X.Animate" ], function(Model, Collection, Animate) {
        var Element, Elements, _ref, _ref1;
        Element = function(_super) {
            function Element() {
                _ref = Element.__super__.constructor.apply(this, arguments);
                return _ref;
            }
            __extends(Element, _super);
            Element.prototype.defaults = {
                type: void 0
            };
            Element.prototype.initialize = function() {
                return this.elements = new Collection;
            };
            Element.prototype.created = function() {
                if (!this.isCreated) {
                    this.isCreated = !0;
                    return !1;
                }
                return !0;
            };
            Element.prototype.canvas = function(canvas) {
                this._canvas = canvas;
                return this;
            };
            Element.prototype.render = function() {
                return this;
            };
            Element.prototype.add = function(models) {
                var model, _i, _len;
                typeof models != "object" && !models.length && (models = [ models ]);
                for (_i = 0, _len = models.length; _i < _len; _i++) {
                    model = models[_i];
                    model.canvas(this._canvas).trigger("create");
                }
                this.elements.add(models);
                return this;
            };
            Element.prototype.remove = function(models) {
                this.elements.remove(models);
                return this;
            };
            Element.prototype.select = function(type) {
                var collection;
                collection = new Collection;
                return collection.add(this.elements.where({
                    type: type
                }));
            };
            Element.prototype.last = function() {
                return this.elements.last();
            };
            Element.prototype.empty = function() {
                this.elements.reset();
                return this;
            };
            Element.prototype.animate = function(options, duration, easing, callback) {
                var end, start, _this = this;
                duration = duration || 400;
                for (start in options) {
                    end = options[start];
                    this._canvas.animate();
                    this._animation = Animate(this.get(start), end, duration, easing, function(c) {
                        var o;
                        o = {};
                        o[start] = c;
                        return _this.set(o);
                    }, function() {
                        _this._canvas.animated();
                        return delete _this._animation;
                    });
                }
                return this;
            };
            Element.prototype.stop = function() {
                this._animation != null && this._animation.stop();
                delete this._animation;
                return this;
            };
            return Element;
        }(Model);
        Elements = function(_super) {
            function Elements() {
                _ref1 = Elements.__super__.constructor.apply(this, arguments);
                return _ref1;
            }
            __extends(Elements, _super);
            Elements.prototype.model = Element;
            return Elements;
        }(Collection);
        Element.Collection = Elements;
        return Element;
    });
    define("X.Overlay", [ "X.Element" ], function(Element) {
        var Overlay, Overlays, _ref, _ref1;
        Overlay = function(_super) {
            function Overlay() {
                _ref = Overlay.__super__.constructor.apply(this, arguments);
                return _ref;
            }
            __extends(Overlay, _super);
            Overlay.prototype.defaults = {
                type: "overlay",
                x: 0,
                y: 0,
                height: void 0,
                width: void 0,
                src: void 0,
                opacity: 1,
                scale: 1
            };
            return Overlay;
        }(Element);
        Overlays = function(_super) {
            function Overlays() {
                _ref1 = Overlays.__super__.constructor.apply(this, arguments);
                return _ref1;
            }
            __extends(Overlays, _super);
            Overlays.prototype.model = Overlay;
            return Overlays;
        }(Element.Collection);
        Overlay.Collection = Overlays;
        return Overlay;
    });
    define("X.Point", [ "X.Element" ], function(Element) {
        var Point, Points, _ref, _ref1;
        Point = function(_super) {
            function Point() {
                _ref = Point.__super__.constructor.apply(this, arguments);
                return _ref;
            }
            __extends(Point, _super);
            Point.prototype.defaults = {
                type: "point",
                x: 0,
                y: 0,
                r: 5,
                fill: "#000",
                stroke: 0,
                color: "#000"
            };
            return Point;
        }(Element);
        Points = function(_super) {
            function Points() {
                _ref1 = Points.__super__.constructor.apply(this, arguments);
                return _ref1;
            }
            __extends(Points, _super);
            Points.prototype.model = Point;
            return Points;
        }(Element.Collection);
        Point.Collection = Points;
        return Point;
    });
    define("X.Shape", [ "X.Element" ], function(Element) {
        var Shape, Shapes, _ref, _ref1;
        Shape = function(_super) {
            function Shape() {
                _ref = Shape.__super__.constructor.apply(this, arguments);
                return _ref;
            }
            __extends(Shape, _super);
            Shape.prototype.defaults = {
                type: "shape",
                connect: !0,
                opacity: 1,
                fill: "#000",
                color: "#000",
                stroke: .25
            };
            return Shape;
        }(Element);
        Shapes = function(_super) {
            function Shapes() {
                _ref1 = Shapes.__super__.constructor.apply(this, arguments);
                return _ref1;
            }
            __extends(Shapes, _super);
            Shapes.prototype.model = Shape;
            return Shapes;
        }(Element.Collection);
        Shape.Collection = Shapes;
        return Shape;
    });
    define("X", [ "X.Animate", "X.Canvas", "X.Element", "X.Overlay", "X.Point", "X.Shape" ], function(Animate, Canvas, Element, Overlay, Point, Shape) {
        return {
            Animate: Animate,
            Canvas: Canvas,
            Element: Element,
            Overlay: Overlay,
            Point: Point,
            Shape: Shape
        };
    });
}).call(this);