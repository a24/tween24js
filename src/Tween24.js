import Ticker24 from "./core/Ticker24";
import ObjectUpdater from "./core/updater/ObjectUpdater";
import Ease24 from "./Ease24";
/*
 TODO: 相対値
 TODO: 直前相対値
 TODO: 関数トゥイーン
 TODO: イベントハンドラ
 TODO: 停止、一時停止
 TODO: 回転、幅、高さ
 TODO: スキップ
 TODO: ループ
 TODO: 複数オブジェクト指定
 */
var Tween24 = /** @class */ (function () {
    function Tween24() {
        this.easing = null;
        this.type = "";
        this.time = NaN;
        this.delayTime = NaN;
        this.startTime = NaN;
        // Updater
        this.objectUpdater = null;
        // Refer
        this.root = null;
        this.parent = null;
        this.next = null;
        // Flag
        this.inited = false;
        this.isRoot = false;
        this.isContainerTween = false;
        // Callback
        // private onPlayFunc:Function;
        // private onPlayArgs:Function;
        // private onPauseFunc:Function;
        // private onPauseArgs:Function;
        // private onStopFunc:Function;
        // private onStopArgs:Function;
        // private onCompleteFunc:Function;
        // private onCompleteArgs:Function;
        // Container Tween    
        this.childTween = null;
        this.firstTween = null;
        this.playingChildTween = null;
        this.numChildren = 0;
        this.numCompleteChildren = 0;
        this.func = null;
        this.args = null;
        if (!Tween24.ease)
            Tween24.ease = new Ease24();
        if (!Tween24.ticker)
            Tween24.ticker = new Ticker24();
        if (!Tween24._playingTweensByTarget)
            Tween24._playingTweensByTarget = new Map();
        if (!Tween24._playingTweens)
            Tween24._playingTweens = [];
        this.updaters = [];
    }
    Tween24.prototype.play = function () {
        this.root = this;
        this.isRoot = true;
        Tween24.ticker.add(this);
        this.__play();
    };
    Tween24.prototype.__play = function () {
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
    Tween24.prototype.__initParam = function () {
        if (this.updaters.length) {
            for (var _i = 0, _a = this.updaters; _i < _a.length; _i++) {
                var updater = _a[_i];
                updater.init();
            }
        }
        // Overwrite
        var tweens = Tween24._playingTweensByTarget.get(this.target);
        if (tweens) {
            for (var _b = 0, tweens_1 = tweens; _b < tweens_1.length; _b++) {
                var tween = tweens_1[_b];
                if (this !== tween) {
                    if (this.objectUpdater && tween.objectUpdater)
                        tween.objectUpdater.overwrite(this.objectUpdater);
                }
            }
            tweens.push(this);
        }
        else {
            Tween24._playingTweensByTarget.set(this.target, [this]);
        }
        Tween24._playingTweens.push(this);
    };
    Tween24.prototype.__update = function () {
        var progress = this.getProgress(this.time, this.startTime);
        // Delay
        if (progress < 0)
            return;
        // Container
        if (this.isContainerTween) {
            if (!this.inited) {
                this.inited = true;
                switch (this.type) {
                    case Tween24.TYPE_SERIAL:
                        if (this.playingChildTween && this.firstTween) {
                            this.playingChildTween.push(this.firstTween);
                            this.firstTween.__play();
                        }
                        break;
                    case Tween24.TYPE_PARALLEL:
                        for (var i = 0; i < this.numChildren; i++) {
                            if (this.playingChildTween && this.childTween) {
                                var tween = this.childTween[i];
                                this.playingChildTween.push(tween);
                                tween.__play();
                            }
                        }
                        break;
                }
            }
            if (this.playingChildTween) {
                for (var i = 0; i < this.playingChildTween.length; i++) {
                    this.playingChildTween[i].__update();
                }
            }
            if (this.numChildren == this.numCompleteChildren)
                this.__complete();
        }
        // Child
        else {
            var target = this.target;
            if (target) {
                // Init
                if (!this.inited) {
                    this.inited = true;
                    this.__initParam();
                }
                // Update propety
                var prog = this.easing ? this.easing(progress, 0, 1, 1) : progress;
                if (this.updaters.length) {
                    for (var _i = 0, _a = this.updaters; _i < _a.length; _i++) {
                        var updater = _a[_i];
                        updater.update(prog);
                    }
                }
            }
            // Complete
            if (progress >= 1) {
                // Func
                if (this.type == Tween24.TYPE_FUNC) {
                    if (this.func) {
                        var func = this.func;
                        var args = this.args;
                        if (args)
                            func.apply(this.scope, args);
                        else
                            func.apply(this.scope);
                    }
                }
                // End
                this.__complete();
            }
        }
    };
    Tween24.prototype.__complete = function () {
        this.debugLog(this.type + " complete");
        if (this.isRoot)
            Tween24.ticker.remove(this);
        if (this.parent)
            this.parent.__completeChildTween(this);
        this.removeItemFromArray(Tween24._playingTweens, this);
    };
    Tween24.prototype.__completeChildTween = function (tween) {
        this.debugLog(this.type + " completeChildTween");
        this.numCompleteChildren++;
        if (this.playingChildTween) {
            this.removeItemFromArray(this.playingChildTween, tween);
            var next = tween.next;
            if (next) {
                this.playingChildTween.push(next);
                next.play();
            }
        }
    };
    // ------------------------------------------
    //
    // Init
    //
    // ------------------------------------------
    Tween24.prototype.__initChildTween = function (type, target, time, easing) {
        this.type = type;
        this.target = target;
        this.easing = easing || Ease24._Linear;
        this.time = time;
        this.delayTime = 0;
        this.startTime = 0;
        this.inited = false;
        this.isContainerTween = false;
        if (target instanceof HTMLElement) {
        }
        else {
            this.objectUpdater = new ObjectUpdater(target);
            this.updaters.push(this.objectUpdater);
        }
        return this;
    };
    Tween24.prototype.__initContainerTween = function (type, childTween) {
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
        }
        else {
            for (var i = 0; i < this.numChildren; i++) {
                this.childTween[i].parent = this;
            }
        }
        return this;
    };
    Tween24.prototype.__initActionTween = function (type, scope, func, args) {
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
    // ------------------------------------------
    //
    // Propety
    //
    // ------------------------------------------
    Tween24.prototype.x = function (value) { return this.__setPropety("x", value); };
    Tween24.prototype.y = function (value) { return this.__setPropety("y", value); };
    Tween24.prototype.xy = function (x, y) { return this.__setPropety("x", x).__setPropety("y", y); };
    Tween24.prototype.alpha = function (value) { return this.__setPropety("alpha", value); };
    Tween24.prototype.delay = function (value) { this.delayTime += value; return this; };
    Tween24.prototype.__setPropety = function (key, value) {
        if (this.objectUpdater) {
            this.objectUpdater.addProp(key, value);
        }
        return this;
    };
    // ------------------------------------------
    //
    // Tween
    //
    // ------------------------------------------
    Tween24.tween = function (target, time, easing) {
        if (easing === void 0) { easing = null; }
        return new Tween24().__initChildTween(Tween24.TYPE_TWEEN, target, time, easing);
    };
    Tween24.prop = function (target) {
        return new Tween24().__initChildTween(Tween24.TYPE_PROP, target, 0, null);
    };
    Tween24.wait = function (time) {
        return new Tween24().__initChildTween(Tween24.TYPE_WAIT, null, time, null);
    };
    Tween24.serial = function () {
        var childTween = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            childTween[_i] = arguments[_i];
        }
        return new Tween24().__initContainerTween(Tween24.TYPE_SERIAL, childTween);
    };
    Tween24.parallel = function () {
        var childTween = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            childTween[_i] = arguments[_i];
        }
        return new Tween24().__initContainerTween(Tween24.TYPE_PARALLEL, childTween);
    };
    // ------------------------------------------
    //
    // Util
    //
    // ------------------------------------------
    Tween24.prototype.getTime = function () { return Date.now() || new Date().getTime(); };
    Tween24.prototype.getProgress = function (time, startTime) {
        var nowTime = this.getTime();
        if (nowTime < startTime)
            return -1;
        else if (time == 0)
            return 1;
        else {
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
    // Static
    Tween24.VERSION = "0.2.3";
    Tween24.TYPE_TWEEN = "tween";
    Tween24.TYPE_PROP = "prop";
    Tween24.TYPE_WAIT = "wait";
    Tween24.TYPE_SERIAL = "serial";
    Tween24.TYPE_PARALLEL = "parallel";
    Tween24.TYPE_FUNC = "func";
    Tween24.func = function (scope, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return new Tween24().__initActionTween(Tween24.TYPE_FUNC, scope, func, args);
    };
    return Tween24;
}());
export default Tween24;
