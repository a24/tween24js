var tween24;
(function (tween24) {
    (function (core) {
        var Ticker24 = (function () {
            function Ticker24() {
                this.fps = 60;
                this.allTweens = [];
                this.timer = null;
                this.running = false;
            }
            Ticker24.prototype.start = function () {
                this.running = true;
                var self = this;
                this.timer = setInterval(function () {
                    self.update();
                }, 1000 / this.fps);
            };
            Ticker24.prototype.stop = function () {
                this.running = false;
                clearInterval(this.timer);
            };
            Ticker24.prototype.add = function (tween) {
                this.allTweens.push(tween);
                if (!this.running)
                    this.start();
            };
            Ticker24.prototype.remove = function (tween) {
                var allTweens = this.allTweens;
                this.removeItemFromArray(allTweens, tween);
                if (!allTweens.length) {
                    this.stop();
                }
            };
            Ticker24.prototype.update = function () {
                for (var i = 0; i < this.allTweens.length; i++) {
                    this.allTweens[i].update();
                }
            };

            Ticker24.prototype.removeItemFromArray = function (array, item) {
                for (var i = 0; i < array.length; i++) {
                    var it = array[i];
                    if (item == it) {
                        array.splice(i, 1);
                    }
                }
            };
            return Ticker24;
        })();
        core.Ticker24 = Ticker24;
    })(tween24.core || (tween24.core = {}));
    var core = tween24.core;
})(tween24 || (tween24 = {}));
var Ease24 = (function () {
    function Ease24() {
    }
    Ease24._Linear = function (t, b, c, d) {
        return c * t / d + b;
    };

    Ease24._1_SineIn = function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    };

    Ease24._1_SineOut = function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    };

    Ease24._1_SineInOut = function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    };

    Ease24._1_SineOutIn = function (t, b, c, d) {
        if (t < d / 2)
            return (c / 2) * Math.sin((t * 2) / d * (Math.PI / 2)) + b;
        return -(c / 2) * Math.cos((t * 2 - d) / d * (Math.PI / 2)) + (c / 2) + (b + c / 2);
    };

    Ease24._2_QuadIn = function (t, b, c, d) {
        return c * (t /= d) * t + b;
    };

    Ease24._2_QuadOut = function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    };

    Ease24._2_QuadInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };

    Ease24._2_QuadOutIn = function (t, b, c, d) {
        if (t < d / 2)
            return -(c / 2) * (t = (t * 2 / d)) * (t - 2) + b;
        return (c / 2) * (t = (t * 2 - d) / d) * t + (b + c / 2);
    };

    Ease24._3_CubicIn = function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    };

    Ease24._3_CubicOut = function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    };

    Ease24._3_CubicInOut = function (t, b, c, d) {
        return ((t /= d / 2) < 1) ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b;
    };

    Ease24._3_CubicOutIn = function (t, b, c, d) {
        return (t < d / 2) ? c / 2 * ((t = t * 2 / d - 1) * t * t + 1) + b : c / 2 * (t = (t * 2 - d) / d) * t * t + b + c / 2;
    };

    Ease24._4_QuartIn = function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    };

    Ease24._4_QuartOut = function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };

    Ease24._4_QuartInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    };

    Ease24._4_QuartOutIn = function (t, b, c, d) {
        if (t < d / 2)
            return -(c / 2) * ((t = (t * 2) / d - 1) * t * t * t - 1) + b;
        return (c / 2) * (t = (t * 2 - d) / d) * t * t * t + (b + c / 2);
    };

    Ease24._5_QuintIn = function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    };

    Ease24._5_QuintOut = function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };

    Ease24._5_QuintInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    };

    Ease24._5_QuintOutIn = function (t, b, c, d) {
        if (t < d / 2)
            return (c / 2) * ((t = (t * 2) / d - 1) * t * t * t * t + 1) + b;
        return (c / 2) * (t = (t * 2 - d) / d) * t * t * t * t + (b + c / 2);
    };

    Ease24._6_ExpoIn = function (t, b, c, d) {
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    };

    Ease24._6_ExpoOut = function (t, b, c, d) {
        return t == d ? b + c : c * (1 - Math.pow(2, -10 * t / d)) + b;
    };

    Ease24._6_ExpoInOut = function (t, b, c, d) {
        if (t == 0)
            return b;
        if (t == d)
            return b + c;
        if ((t /= d / 2.0) < 1.0)
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (2 - Math.pow(2, -10 * --t)) + b;
    };

    Ease24._6_ExpoOutIn = function (t, b, c, d) {
        if (t < d / 2.0)
            return t * 2.0 == d ? b + c / 2.0 : c / 2.0 * (1 - Math.pow(2, -10 * t * 2.0 / d)) + b;
        return ((t * 2.0 - d) == 0) ? b + c / 2.0 : c / 2.0 * Math.pow(2, 10 * ((t * 2 - d) / d - 1)) + b + c / 2.0;
    };

    Ease24._7_CircIn = function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    };

    Ease24._7_CircOut = function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    };

    Ease24._7_CircInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    };

    Ease24._7_CircOutIn = function (t, b, c, d) {
        if (t < d / 2)
            return (c / 2) * Math.sqrt(1 - (t = (t * 2) / d - 1) * t) + b;
        return -(c / 2) * (Math.sqrt(1 - (t = (t * 2 - d) / d) * t) - 1) + (b + c / 2);
    };

    Ease24._BackInWith = function (overshoot) {
        return function (t, b, c, d) {
            return c * (t /= d) * t * ((overshoot + 1) * t - overshoot) + b;
        };
    };

    Ease24._BackOutWith = function (overshoot) {
        return function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * ((overshoot + 1) * t + overshoot) + 1) + b;
        };
    };

    Ease24._BackInOutWith = function (overshoot) {
        return function (t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * (t * t * (((overshoot * 1.525) + 1) * t - overshoot * 1.525)) + b;
            return c / 2 * ((t -= 2) * t * (((overshoot * 1.525) + 1) * t + overshoot * 1.525) + 2) + b;
        };
    };

    Ease24._BackOutInWith = function (overshoot) {
        return function (t, b, c, d) {
            if (t < d / 2)
                return (c / 2) * ((t = (t * 2) / d - 1) * t * ((overshoot + 1) * t + overshoot) + 1) + b;
            return (c / 2) * (t = (t * 2 - d) / d) * t * ((overshoot + 1) * t - overshoot) + (b + c / 2);
        };
    };

    Ease24._BounceIn = function (t, b, c, d) {
        if ((t = (d - t) / d) < (1 / 2.75))
            return c - (c * (7.5625 * t * t)) + b;
        if (t < (2 / 2.75))
            return c - (c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)) + b;
        if (t < (2.5 / 2.75))
            return c - (c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)) + b;
        return c - (c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)) + b;
    };

    Ease24._BounceOut = function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75))
            return c * (7.5625 * t * t) + b;
        if (t < (2 / 2.75))
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        if (t < (2.5 / 2.75))
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    };

    Ease24._BounceInOut = function (t, b, c, d) {
        if (t < d / 2) {
            if ((t = (d - t * 2) / d) < (1 / 2.75))
                return (c - (c * (7.5625 * t * t))) * 0.5 + b;
            if (t < (2 / 2.75))
                return (c - (c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75))) * 0.5 + b;
            if (t < (2.5 / 2.75))
                return (c - (c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375))) * 0.5 + b;
            return (c - (c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375))) * 0.5 + b;
        } else {
            if ((t = (t * 2 - d) / d) < (1 / 2.75))
                return (c * (7.5625 * t * t)) * 0.5 + c * 0.5 + b;
            if (t < (2 / 2.75))
                return (c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)) * 0.5 + c * 0.5 + b;
            if (t < (2.5 / 2.75))
                return (c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)) * 0.5 + c * 0.5 + b;
            return (c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)) * 0.5 + c * 0.5 + b;
        }
    };

    Ease24._BounceOutIn = function (t, b, c, d) {
        if (t < d / 2) {
            if ((t = (t * 2) / d) < (1 / 2.75))
                return (c / 2) * (7.5625 * t * t) + b;
            if (t < (2 / 2.75))
                return (c / 2) * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
            if (t < (2.5 / 2.75))
                return (c / 2) * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
            return (c / 2) * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
        } else {
            if ((t = (d - (t * 2 - d)) / d) < (1 / 2.75))
                return (c / 2) - ((c / 2) * (7.5625 * t * t)) + (b + c / 2);
            if (t < (2 / 2.75))
                return (c / 2) - ((c / 2) * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)) + (b + c / 2);
            if (t < (2.5 / 2.75))
                return (c / 2) - ((c / 2) * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)) + (b + c / 2);
            return (c / 2) - ((c / 2) * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)) + (b + c / 2);
        }
    };

    Ease24._ElasticInWith = function (amplitude, period) {
        return function (t, b, c, d) {
            t /= 1000;
            d /= 1000;

            if (t == 0)
                return b;
            if ((t /= d) == 1)
                return b + c;
            if (!period)
                period = d * 0.3;

            var s;
            if (!amplitude || amplitude < Math.abs(c)) {
                amplitude = c;
                s = period / 4;
            } else
                s = period / (2 * Math.PI) * Math.asin(c / amplitude);
            return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / period)) + b;
        };
    };

    Ease24._ElasticOutWith = function (amplitude, period) {
        return function (t, b, c, d) {
            t /= 1000;
            d /= 1000;

            if (t == 0)
                return b;
            if ((t /= d) == 1)
                return b + c;
            if (!period)
                period = d * 0.3;

            var s;
            if (!amplitude || amplitude < Math.abs(c)) {
                amplitude = c;
                s = period / 4;
            } else
                s = period / (2 * Math.PI) * Math.asin(c / amplitude);
            return amplitude * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / period) + c + b;
        };
    };

    Ease24._ElasticInOutWith = function (amplitude, period) {
        return function (t, b, c, d) {
            t /= 1000;
            d /= 1000;

            if (t == 0)
                return b;
            if ((t /= d / 2) == 2)
                return b + c;
            if (!period)
                period = d * (0.3 * 1.5);

            var s;
            if (!amplitude || amplitude < Math.abs(c)) {
                amplitude = c;
                s = period / 4;
            } else
                s = period / (2 * Math.PI) * Math.asin(c / amplitude);
            if (t < 1)
                return -0.5 * (amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / period)) + b;
            return amplitude * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / period) * 0.5 + c + b;
        };
    };

    Ease24._ElasticOutInWith = function (amplitude, period) {
        return function (t, b, c, d) {
            t /= 1000;
            d /= 1000;

            var s;
            c /= 2;

            if (t < d / 2) {
                if ((t *= 2) == 0)
                    return b;
                if ((t /= d) == 1)
                    return b + c;
                if (!period)
                    period = d * 0.3;
                if (!amplitude || amplitude < Math.abs(c)) {
                    amplitude = c;
                    s = period / 4;
                } else
                    s = period / (2 * Math.PI) * Math.asin(c / amplitude);
                return amplitude * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / period) + c + b;
            } else {
                if ((t = t * 2 - d) == 0)
                    return (b + c);
                if ((t /= d) == 1)
                    return (b + c) + c;
                if (!period)
                    period = d * 0.3;
                if (!amplitude || amplitude < Math.abs(c)) {
                    amplitude = c;
                    s = period / 4;
                } else
                    s = period / (2 * Math.PI) * Math.asin(c / amplitude);
                return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / period)) + (b + c);
            }
        };
    };

    Ease24._Blend = function (easeA, easeB, mixing, start, end) {
        return function (t, b, c, d) {
            var v1 = easeA(t, b, c, d);
            var v2 = easeB(t, b, c, d);
            var v3 = mixing(t, b, c, d);
            var rate = end - start;
            return v1 + (v2 - v1) * (v3 * rate + start);
        };
    };
    Ease24._BackIn = Ease24._BackInWith(1.70158);
    Ease24._BackOut = Ease24._BackOutWith(1.70158);
    Ease24._BackInOut = Ease24._BackInOutWith(1.70158);
    Ease24._BackOutIn = Ease24._BackOutInWith(1.70158);

    Ease24._ElasticIn = Ease24._ElasticInWith(0, 0);
    Ease24._ElasticOut = Ease24._ElasticOutWith(0, 0);
    Ease24._ElasticInOut = Ease24._ElasticInOutWith(0, 0);
    Ease24._ElasticOutIn = Ease24._ElasticOutInWith(0, 0);
    return Ease24;
})();
var Tween24 = (function () {
    function Tween24() {
        this.root = null;
        this.parent = null;
        this.next = null;
        this.nextTween = null;
        if (!Tween24.ease)
            Tween24.ease = new Ease24();
        if (!Tween24.ticker)
            Tween24.ticker = new tween24.core.Ticker24();
    }
    Tween24.prototype.play = function () {
        this.root = this;
        this.isRoot = true;
        Tween24.ticker.add(this);
        this._play();
    };
    Tween24.prototype._play = function () {
        this.debugLog(this.type + " play");

        if (!this.isRoot) {
            if (this.parent)
                this.root = this.parent.root || this.parent;
        }

        this.startTime = this.getTime() + this.delayTime * 1000;
    };
    Tween24.prototype.stop = function () {
        if (this.isRoot)
            Tween24.ticker.remove(this);
    };
    Tween24.prototype.pause = function () {
    };

    Tween24.prototype.init = function () {
        var target = this.target;
        var startParam = this.startParam;
        var targetParam = this.targetParam;
        var diffParam = this.diffParam;

        for (var p in targetParam) {
            startParam[p] = target[p];
            diffParam[p] = targetParam[p] - startParam[p];
        }
    };

    Tween24.prototype.update = function () {
        var progress = this.getProgress(this.time, this.startTime);

        if (progress < 0)
            return;

        if (this.isContainerTween) {
            if (!this.inited) {
                this.inited = true;
                switch (this.type) {
                    case Tween24.TYPE_SERIAL:
                        this.playingChildTween.push(this.firstTween);
                        this.firstTween._play();
                        break;
                    case Tween24.TYPE_PARALLEL:
                        for (var i = 0; i < this.numChildren; i++) {
                            var tween = this.childTween[i];
                            this.playingChildTween.push(tween);
                            tween._play();
                        }
                        break;
                }
            }
            for (var i = 0; i < this.playingChildTween.length; i++) {
                this.playingChildTween[i].update();
            }
            if (this.numChildren == this.numCompleteChildren)
                this.complete();
        } else {
            var target = this.target;
            if (target) {
                if (!this.inited) {
                    this.inited = true;
                    this.init();
                }

                var startParam = this.startParam;
                var diffParam = this.diffParam;
                var prog = this.easing ? this.easing(progress, 0, 1, 1) : progress;

                for (var pn in startParam) {
                    target[pn] = startParam[pn] + (diffParam[pn] * prog);
                }
            }

            if (progress >= 1) {
                if (this.type == Tween24.TYPE_FUNC) {
                    var func = this.func;
                    var args = this.args;
                    if (args)
                        func.apply(this.scope, args); else
                        func.apply(this.scope);
                }

                this.complete();
            }
        }
    };

    Tween24.prototype.complete = function () {
        this.debugLog(this.type + " complete");
        if (this.isRoot)
            Tween24.ticker.remove(this);
        if (this.parent)
            this.parent.completeChildTween(this);
    };

    Tween24.prototype.completeChildTween = function (tween) {
        this.debugLog(this.type + " completeChildTween");
        this.numCompleteChildren++;
        this.removeItemFromArray(this.playingChildTween, tween);
        var next = tween.next;
        if (next) {
            this.playingChildTween.push(next);
            next.play();
        }
    };

    Tween24.prototype.initChildTween = function (type, target, time, easing) {
        this.type = type;
        this.target = target;
        this.easing = easing || Ease24._Linear;
        this.time = time;
        this.delayTime = 0;
        this.startTime = 0;
        this.startParam = {};
        this.targetParam = {};
        this.diffParam = {};
        this.inited = false;
        this.isContainerTween = false;
        return this;
    };

    Tween24.prototype.initContainerTween = function (type, childTween) {
        this.type = type;
        this.time = 0;
        this.delayTime = 0;
        this.childTween = childTween;
        this.firstTween = this.childTween[0];
        this.playingChildTween = [];

        this.numChildren = childTween.length;
        this.numCompleteChildren = 0;
        this.isContainerTween = true;

        var prev = this.firstTween;
        var next;
        if (type == Tween24.TYPE_SERIAL) {
            for (var i = 0; i < this.numChildren; i++) {
                next = this.childTween[i + 1];
                prev.next = next;
                prev.parent = this;
                prev = next;
            }
        } else {
            for (var i = 0; i < this.numChildren; i++) {
                this.childTween[i].parent = this;
            }
        }
        return this;
    };

    Tween24.prototype.initActionTween = function (type, scope, func, args) {
        this.type = type;
        this.scope = scope;
        this.func = func;
        this.args = args;
        this.time = 0;
        this.delayTime = 0;
        this.startTime = 0;
        this.inited = false;
        this.isContainerTween = false;
        return this;
    };

    Tween24.prototype.x = function (value) {
        this.targetParam.x = value;
        return this;
    };
    Tween24.prototype.y = function (value) {
        this.targetParam.y = value;
        return this;
    };
    Tween24.prototype.xy = function (x, y) {
        this.targetParam.x = x;
        this.targetParam.y = y;
        return this;
    };
    Tween24.prototype.alpha = function (value) {
        this.targetParam.alpha = value;
        return this;
    };
    Tween24.prototype.delay = function (value) {
        this.delayTime += value;
        return this;
    };

    Tween24.tween = function (target, time, easing) {
        if (typeof easing === "undefined") { easing = null; }
        return new Tween24().initChildTween(Tween24.TYPE_TWEEN, target, time, easing);
    };
    Tween24.prop = function (target) {
        return new Tween24().initChildTween(Tween24.TYPE_PROP, target, 0, null);
    };
    Tween24.wait = function (time) {
        return new Tween24().initChildTween(Tween24.TYPE_WAIT, null, time, null);
    };

    Tween24.serial = function () {
        var childTween = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            childTween[_i] = arguments[_i + 0];
        }
        return new Tween24().initContainerTween(Tween24.TYPE_SERIAL, childTween);
    };
    Tween24.parallel = function () {
        var childTween = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            childTween[_i] = arguments[_i + 0];
        }
        return new Tween24().initContainerTween(Tween24.TYPE_PARALLEL, childTween);
    };

    Tween24.prototype.getTime = function () {
        return Date.now() || new Date().getTime();
    };

    Tween24.prototype.getProgress = function (time, startTime) {
        var nowTime = this.getTime();
        if (nowTime < startTime)
            return -1; else if (time == 0)
            return 1; else {
            var progress = (nowTime - startTime) / (time * 1000);
            return (progress > 1) ? 1 : progress;
        }
    };

    Tween24.prototype.removeItemFromArray = function (array, item) {
        for (var i = 0; i < array.length; i++) {
            var it = array[i];
            if (item == it) {
                array.splice(i, 1);
            }
        }
    };

    Tween24.prototype.trace = function (value) {
        console.log(value);
    };

    Tween24.prototype.debugLog = function (message) {
        this.trace("[Tween24 " + message + "]");
    };
    Tween24.VERSION = "0.2.0";
    Tween24.TYPE_TWEEN = "tween";
    Tween24.TYPE_PROP = "prop";
    Tween24.TYPE_WAIT = "wait";
    Tween24.TYPE_SERIAL = "serial";
    Tween24.TYPE_PARALLEL = "parallel";
    Tween24.TYPE_FUNC = "func";

    Tween24.func = function (scope, func) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 2); _i++) {
            args[_i] = arguments[_i + 2];
        }
        return new Tween24().initActionTween(Tween24.TYPE_FUNC, scope, func, args);
    };
    return Tween24;
})();
