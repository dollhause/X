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
    (function() {
        this.isString = function(value) {
            return typeof value == "string";
        };
        this.isFunction = function(value) {
            return typeof value == "function";
        };
        this.isObject = function(value) {
            return typeof value == "object" && isNaN(value.length);
        };
        this.isArray = function(value) {
            return typeof value == "object" && !isNaN(value.length);
        };
        this.isNumber = function(value) {
            return !isNaN(parseInt(value));
        };
        this.isntString = function(value) {
            return !isString(value);
        };
        this.isntFunction = function(value) {
            return !isFunction(value);
        };
        this.isntObject = function(value) {
            return !isObject(value);
        };
        this.isntArray = function(value) {
            return !isArray(value);
        };
        return this.isntNumber = function(value) {
            return !isNumber(value);
        };
    })(this);
    (function() {
        var slice;
        slice = Array.prototype.slice;
        return this.extend = function(obj) {
            var prop, set, source, val, _i, _len, _ref;
            set = function(prop, val) {
                return obj[prop] = val;
            };
            _ref = slice.call(arguments, 1);
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                source = _ref[_i];
                if (source) for (prop in source) {
                    val = source[prop];
                    set(prop, val);
                }
            }
            return obj;
        };
    })(this);
    (function() {
        return this.clone = function(obj) {
            return isntObject(obj) ? obj : isArray(obj) ? obj.slice() : extend({}, obj);
        };
    })(this);
    (function() {
        var slice;
        slice = Array.prototype.slice;
        return this.Observer = function() {
            function Observer() {
                this._listeners = {};
            }
            Observer.prototype.on = function(triggers, listener, context) {
                var bind, trigger, _i, _len, _this = this;
                triggers = triggers.split(" ");
                bind = function(trigger) {
                    var _base;
                    if (isntFunction(listener)) return;
                    (_base = _this._listeners)[trigger] == null && (_base[trigger] = []);
                    return _this._listeners[trigger].push([ listener, context ]);
                };
                for (_i = 0, _len = triggers.length; _i < _len; _i++) {
                    trigger = triggers[_i];
                    bind(trigger);
                }
                return this;
            };
            Observer.prototype.trigger = function(triggers) {
                var args, functions, listener, run, trigger, _i, _j, _len, _len1, _this = this;
                triggers = triggers.split(" ");
                for (_i = 0, _len = triggers.length; _i < _len; _i++) {
                    trigger = triggers[_i];
                    functions = this._listeners[trigger];
                    if (functions != null) {
                        args = slice.call(arguments, 1);
                        run = function(listener) {
                            return listener[1] != null ? listener[0].apply(listener[1], args) : listener[0].apply(_this, args);
                        };
                        for (_j = 0, _len1 = functions.length; _j < _len1; _j++) {
                            listener = functions[_j];
                            run(listener);
                        }
                    }
                }
                return this;
            };
            return Observer;
        }();
    })(this);
    (function() {
        var AMD, amd;
        AMD = function(_super) {
            function AMD() {
                AMD.__super__.constructor.apply(this, arguments);
                this.modules = {};
            }
            __extends(AMD, _super);
            AMD.prototype.define = function() {
                var arg, callback, called, o, _i, _len, _this = this;
                o = {
                    dependencies: []
                };
                for (_i = 0, _len = arguments.length; _i < _len; _i++) {
                    arg = arguments[_i];
                    isString(arg) && (o.name = arg);
                    isFunction(arg) && (callback = arg);
                    isArray(arg) && (o.dependencies = arg);
                }
                called = !1;
                o.callback = function(after) {
                    return called ? after(called) : _this.require(o.dependencies, function() {
                        called = callback.apply(null, arguments);
                        return after(called);
                    });
                };
                this.modules[o.name] = o;
                return this.trigger(o.name);
            };
            AMD.prototype.require = function() {
                var arg, attempt, available, o, run, _i, _len, _this = this;
                o = {
                    dependencies: []
                };
                for (_i = 0, _len = arguments.length; _i < _len; _i++) {
                    arg = arguments[_i];
                    isFunction(arg) && (o.callback = arg);
                    isArray(arg) && (o.dependencies = arg);
                }
                available = [];
                run = function() {
                    var a, args, _j, _len1;
                    args = [];
                    available.sort(function(a, b) {
                        return a[1] - b[1];
                    });
                    for (_j = 0, _len1 = available.length; _j < _len1; _j++) {
                        a = available[_j];
                        a[0].callback(function(called) {
                            return args.push(called);
                        });
                    }
                    return o.callback.apply(null, args);
                };
                attempt = function() {
                    var dependency, i, _j, _len1, _ref;
                    available = [];
                    _ref = o.dependencies;
                    for (i = _j = 0, _len1 = _ref.length; _j < _len1; i = ++_j) {
                        dependency = _ref[i];
                        _this.modules[dependency] ? available.push([ _this.modules[dependency], i ]) : _this.on(dependency, attempt);
                    }
                    if (available.length === o.dependencies.length) return run();
                };
                return attempt();
            };
            return AMD;
        }(Observer);
        amd = new AMD;
        this.using = function() {
            return amd.require.apply(amd, arguments);
        };
        return this.define = function() {
            return amd.define.apply(amd, arguments);
        };
    })(this);
    define("Point", [ "Element" ], function(Element) {
        var Point, _ref;
        return Point = function(_super) {
            function Point() {
                _ref = Point.__super__.constructor.apply(this, arguments);
                return _ref;
            }
            __extends(Point, _super);
            Point.prototype.defaults = extend({
                type: "point",
                x: 0,
                y: 0,
                r: 5
            }, Element.prototype.defaults);
            return Point;
        }(Element);
    });
    define("Shape", [ "Element" ], function(Element) {
        var Shape, _ref;
        return Shape = function(_super) {
            function Shape() {
                _ref = Shape.__super__.constructor.apply(this, arguments);
                return _ref;
            }
            __extends(Shape, _super);
            Shape.prototype.defaults = extend({
                type: "shape"
            }, Element.prototype.defaults);
            return Shape;
        }(Element);
    });
    define("Animate", function() {
        var easing, keyframe;
        easing = {
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
                return c - Animate.easing.easeOutBounce(x, d - t, 0, c, d) + b;
            },
            easeOutBounce: function(x, t, b, c, d) {
                return (t /= d) < 1 / 2.75 ? c * 7.5625 * t * t + b : t < 2 / 2.75 ? c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b : t < 2.5 / 2.75 ? c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b : c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
            },
            easeInOutBounce: function(x, t, b, c, d) {
                return t < d / 2 ? Animate.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b : Animate.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        };
        return keyframe = function(x, options) {
            easing;
            var currentTime;
            currentTime = Date.now() - startTime;
            x = 1 - (duration - currentTime) / duration;
            return easingFunc(x, currentTime, start, difference, duration);
        };
    });
    define("Element", function() {
        var Element, array, id;
        id = 0;
        array = function(val) {
            return isArray(val) ? val : [ val ];
        };
        return Element = function(_super) {
            function Element(attributes, isClone) {
                Element.__super__.constructor.apply(this, arguments);
                this.children = [];
                isClone ? this.attributes = attributes : this.attributes = extend(clone(this.defaults), attributes, {
                    id: id++
                });
            }
            __extends(Element, _super);
            Element.prototype.defaults = {
                x: 0,
                y: 0,
                fillColor: "transparent",
                fillOpacity: 1,
                strokeColor: "transparent",
                strokeWidth: 0,
                strokeCap: "round",
                strokeOpacity: 1
            };
            Element.prototype.get = function(attr) {
                return this.attributes[attr];
            };
            Element.prototype.set = function(attrs) {
                extend(this.attributes, attrs);
                return this;
            };
            Element.prototype.is = function(model) {
                return this.attributes.id === model.attributes.id;
            };
            Element.prototype.add = function(models) {
                var child, clone, model, _i, _j, _len, _len1, _ref;
                models = array(models);
                for (_i = 0, _len = models.length; _i < _len; _i++) {
                    model = models[_i];
                    clone = new model.constructor(model.attributes, !0);
                    clone.on("remove", this.remove, this);
                    _ref = model.children;
                    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                        child = _ref[_j];
                        clone.add(child);
                    }
                    this.children.push(clone);
                }
                return this;
            };
            Element.prototype.has = function(model) {
                var child, has, _i, _len, _ref;
                has = !1;
                _ref = this.children;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    child = _ref[_i];
                    if (child.is(model)) {
                        has = !0;
                        break;
                    }
                }
                return has;
            };
            Element.prototype.find = function(type) {
                var child, result, _i, _len, _ref;
                result = [];
                _ref = this.children;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    child = _ref[_i];
                    child.get("type") === type && result.push(child);
                }
                return result;
            };
            return Element;
        }(Observer);
    });
    define("Canvas.Point", [ "Element" ], function(Element) {
        var Point, _ref;
        return Point = function(_super) {
            function Point() {
                _ref = Point.__super__.constructor.apply(this, arguments);
                return _ref;
            }
            __extends(Point, _super);
            Point.prototype.model = function(model) {
                this.model = model;
                return this.model.on("render", this.render, this);
            };
            Point.prototype.render = function(canvas, x, y) {
                return canvas.trigger("beginPath arc fill closePath", this.model.get("x") + x, this.model.get("y") + y, this.model.get("r"), 2 * Math.PI);
            };
            return Point;
        }(Element);
    });
    define("Canvas.Shape", [ "Element" ], function(Element) {
        var Shape, _ref;
        return Shape = function(_super) {
            function Shape() {
                _ref = Shape.__super__.constructor.apply(this, arguments);
                return _ref;
            }
            __extends(Shape, _super);
            Shape.prototype.model = function(model) {
                this.model = model;
                return this.model.on("render", this.render, this);
            };
            Shape.prototype.render = function(canvas, x, y) {
                var i, length, next, point, points, prev, _i, _len;
                points = this.model.find("point");
                length = points.length - 1;
                x += this.model.get("x");
                y += this.model.get("y");
                for (i = _i = 0, _len = points.length; _i < _len; i = ++_i) {
                    point = points[i];
                    if (i === 0) canvas.trigger("moveTo", point.get("x") + x, point.get("y") + y); else if (i !== length) {
                        prev = points[i - 1].find("point");
                        next = point.find("point");
                        prev.length === 2 && next.length === 2 ? canvas.trigger("bezierCurveTo", points[i - 1].get("x") + prev[1].get("x") + x, points[i - 1].get("y") + prev[1].get("y") + y, point.get("x") + next[0].get("x") + x, point.get("y") + next[0].get("y") + y, point.get("x") + x, point.get("y") + y) : prev.length === 2 ? canvas.trigger("bezierCurveTo", points[i - 1].get("x") + prev[1].get("x") + x, points[i - 1].get("y") + prev[1].get("y") + y, point.get("x") + x, point.get("y") + y, point.get("x") + x, point.get("y") + y) : next.length === 2 ? canvas.trigger("bezierCurveTo", points[i - 1].get("x") + x, points[i - 1].get("y") + y, point.get("x") + next[0].get("x") + x, point.get("y") + next[0].get("y") + y, point.get("x") + x, point.get("y") + y) : canvas.trigger("lineTo", point.get("x") + x, point.get("y") + y);
                    } else {
                        canvas.trigger("lineTo", point.get("x") + x, point.get("y") + y);
                        canvas.trigger("lineTo", points[0].get("x") + x, points[0].get("y") + y);
                    }
                }
                return canvas.trigger("fill closePath");
            };
            return Shape;
        }(Element);
    });
    define("Canvas.Renderer", [ "Element", "Canvas.Point", "Canvas.Shape" ], function(Element, Point, Shape) {
        var Renderer, template, _ref;
        template = function() {};
        return Renderer = function(_super) {
            function Renderer() {
                _ref = Renderer.__super__.constructor.apply(this, arguments);
                return _ref;
            }
            __extends(Renderer, _super);
            Renderer.prototype.views = {
                point: Point,
                shape: Shape
            };
            Renderer.prototype.model = function(model) {
                this.model = model;
                this.model.on("create", this.create, this);
                this.model.on("render", this.render, this);
                this.model.on("change:opacity", this.opacity, this);
                this.model.on("change:fillColor", this.fillColor, this);
                this.model.on("change:strokeColor", this.strokeColor, this);
                this.model.on("change:strokeWidth", this.strokeWidth, this);
                this.model.on("change:strokeCap", this.strokeCap, this);
                this.model.on("beginPath", this.beginPath, this);
                this.model.on("moveTo", this.moveTo, this);
                this.model.on("lineTo", this.lineTo, this);
                this.model.on("arc", this.arc, this);
                this.model.on("bezierCurveTo", this.bezierCurveTo, this);
                this.model.on("closePath", this.closePath, this);
                this.model.on("fill", this.fill, this);
                return this.model.on("stroke", this.stroke, this);
            };
            Renderer.prototype.create = function(container) {
                this.el = document.createElement("canvas");
                this.el.height = this.model.get("height");
                this.el.width = this.model.get("width");
                container.appendChild(this.el);
                return this.x = this.el.getContext("2d");
            };
            Renderer.prototype.render = function() {
                return this.x.clearRect(0, 0, this.model.get("width"), this.model.get("height"));
            };
            Renderer.prototype.opacity = function(a, b) {
                return this.x.globalAlpha = b;
            };
            Renderer.prototype.fillColor = function(a) {
                return this.x.fillStyle = a;
            };
            Renderer.prototype.strokeColor = function(a, b) {
                return this.x.strokeStyle = b;
            };
            Renderer.prototype.strokeWidth = function(a, b) {
                return this.x.lineWidth = b;
            };
            Renderer.prototype.strokeCap = function(a, b) {
                return this.x.lineCap = b;
            };
            Renderer.prototype.beginPath = function() {
                return this.x.beginPath();
            };
            Renderer.prototype.moveTo = function(x, y) {
                return this.x.moveTo(x, y);
            };
            Renderer.prototype.lineTo = function(x, y) {
                return this.x.lineTo(x, y);
            };
            Renderer.prototype.arc = function(x, y, r, a) {
                return this.x.arc(x, y, r, 0, a, !1);
            };
            Renderer.prototype.bezierCurveTo = function(cx1, cy1, cx2, cy2, x2, y2) {
                return this.x.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
            };
            Renderer.prototype.closePath = function() {
                return this.x.closePath();
            };
            Renderer.prototype.fill = function() {
                return this.x.fill();
            };
            Renderer.prototype.stroke = function() {
                return this.x.stroke();
            };
            return Renderer;
        }(Element);
    });
    define("Canvas", [ "Element", "Canvas.Renderer" ], function(Element, Renderer) {
        var Canvas, add, array;
        array = function(val) {
            return isArray(val) ? val : [ val ];
        };
        add = function(models) {
            var child, clone, model, view, _i, _j, _len, _len1, _ref, _results;
            models = array(models);
            _results = [];
            for (_i = 0, _len = models.length; _i < _len; _i++) {
                model = models[_i];
                clone = new model.constructor(model.attributes, !0);
                view = Renderer.prototype.views[model.get("type")];
                (new view).model(clone);
                clone.on("remove", this.remove, this).on("animate", this.animate, this).on("animated", this.animated, this).on("add", this.view, this);
                _ref = model.children;
                for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                    child = _ref[_j];
                    add.call(clone, child);
                }
                _results.push(this.children.push(clone));
            }
            return _results;
        };
        return Canvas = function(_super) {
            function Canvas() {
                Canvas.__super__.constructor.apply(this, arguments);
                (new Renderer).model(this);
                this.on("change:animating", this.animates);
                this.on("animating", this.animating);
                this.on("render", this.render);
            }
            __extends(Canvas, _super);
            Canvas.prototype.defaults = extend({
                width: void 0,
                height: void 0,
                animating: 0,
                opacity: 1
            }, Element.prototype.defaults);
            Canvas.prototype.set = function(attrs) {
                var current, key, prev;
                for (key in attrs) {
                    current = attrs[key];
                    prev = this.attributes[key];
                    this.attributes[key] = current;
                    current !== prev && this.trigger("change:" + key + " change", current, prev);
                }
                return this;
            };
            Canvas.prototype.animate = function() {
                return this.set({
                    animating: this.get("animating") + 1
                });
            };
            Canvas.prototype.animated = function() {
                return this.set({
                    animating: this.get("animating") - 1
                });
            };
            Canvas.prototype.animates = function(animating, previous) {
                if (animating && previous === 0) return this.trigger("animating");
            };
            Canvas.prototype.animating = function() {
                var _this = this;
                if (this.get("animating")) return requestAnimationFrame(function() {
                    return _this.trigger("render animating", _this, 0, 0);
                });
            };
            Canvas.prototype.refresh = function() {
                return this.trigger("render", this, 0, 0);
            };
            Canvas.prototype.render = function(model, x, y) {
                var child, _i, _len, _ref, _results;
                x += model.get("x");
                y += model.get("y");
                _ref = model.children;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    child = _ref[_i];
                    this.set(child.attributes);
                    child.trigger("render", this, x, y);
                    _results.push(this.render(child, x, y));
                }
                return _results;
            };
            Canvas.prototype.add = function(models) {
                add.call(this, models);
                return this;
            };
            return Canvas;
        }(Element);
    });
    define("X", [ "Canvas", "Point", "Shape" ], function(Canvas, Point, Shape) {
        return {
            Canvas: Canvas,
            Point: Point,
            Shape: Shape
        };
    });
}).call(this);