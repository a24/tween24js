import Ticker24 from "./core/Ticker24";
import Ease24 from "./Ease24";
import Tween24Event from "./core/Tween24Event";
import ObjectUpdater from "./core/updaters/ObjectUpdater";
import TransformUpdater from "./core/updaters/TransformUpdater";
import FunctionExecuter from "./core/FunctionExecuter";
import StyleUpdater from "./core/updaters/StyleUpdater";
import MultiUpdater from "./core/updaters/MultiUpdater";
import ArrayUtil from "./utils/ArrayUtil";
import ClassUtil from "./utils/ClassUtil";
import HTMLUtil from "./utils/HTMLUtil";
var Tween24 = /** @class */ (function () {
    function Tween24() {
        // Common
        this._singleTarget = null;
        this._multiTarget = null;
        this._easing = null;
        this._type = "";
        this._time = NaN;
        this._delayTime = NaN;
        this._startTime = NaN;
        this._progress = 0;
        // Updater
        this._objectUpdater = null;
        this._objectMultiUpdater = null;
        this._transformUpdater = null;
        this._transformMultiUpdater = null;
        this._styleUpdater = null;
        this._styleMultiUpdater = null;
        this._allUpdaters = null;
        // Refer
        this._root = null;
        this._parent = null;
        this._next = null;
        // Status
        this._inited = false;
        this._isRoot = false;
        this._isPaused = false;
        this._isContainerTween = false;
        // Action & Callback
        this._functionExecuters = null;
        // Container Tween
        this._firstTween = null;
        this._childTween = null;
        this._playingChildTween = null;
        this._numChildren = 0;
        this._numCompleteChildren = 0;
        // Tween FPS
        this.__fps = 0;
        this.__beforeTime = 0;
        Tween24.ease || (Tween24.ease = new Ease24());
        Tween24.ticker || (Tween24.ticker = new Ticker24());
        Tween24._playingTweens || (Tween24._playingTweens = []);
        Tween24._playingTweensByTarget || (Tween24._playingTweensByTarget = new Map());
    }
    // ------------------------------------------
    //
    // Tween control
    //
    // ------------------------------------------
    Tween24.prototype.play = function () {
        if (!this._isPaused) {
            this._root = this;
            this._isRoot = true;
            this._inited = false;
            this._play();
            Tween24.ticker.add(this);
            this._functionExecute(Tween24Event.PLAY);
        }
        else {
            this._resume();
            this._isPaused = false;
            Tween24.ticker.add(this);
            this._functionExecute(Tween24Event.RESUME);
        }
    };
    Tween24.prototype._play = function () {
        var _a;
        this.debugLog(this._type + " play");
        if (!this._isRoot)
            this._root = ((_a = this._parent) === null || _a === void 0 ? void 0 : _a._root) || this._parent;
        this._startTime = Ticker24.getTime() + this._delayTime * 1000;
    };
    Tween24.prototype._resume = function () {
        var nowTime = Ticker24.getTime();
        this._startTime = nowTime - this._time * 1000 * this._progress;
        if (this._playingChildTween) {
            for (var _i = 0, _a = this._playingChildTween; _i < _a.length; _i++) {
                var tween = _a[_i];
                if (tween._playingChildTween)
                    tween._resume();
                else
                    tween._startTime = nowTime - tween._time * 1000 * tween._progress;
            }
        }
    };
    Tween24.prototype.pause = function () {
        if (this._isRoot) {
            this._isPaused = true;
            Tween24.ticker.remove(this);
            this._functionExecute(Tween24Event.PAUSE);
        }
    };
    Tween24.prototype.stop = function () {
        this._stop();
        this._functionExecute(Tween24Event.STOP);
    };
    Tween24.prototype._stop = function () {
        this._tweenStop();
        if (this._childTween) {
            for (var _i = 0, _a = this._childTween; _i < _a.length; _i++) {
                var tween = _a[_i];
                if (tween._childTween)
                    tween._stop();
                else
                    tween._tweenStop();
            }
        }
    };
    // ------------------------------------------
    //
    // Tween work
    //
    // ------------------------------------------
    Tween24.prototype._initParam = function () {
        var _a;
        if ((_a = this._allUpdaters) === null || _a === void 0 ? void 0 : _a.length) {
            for (var _i = 0, _b = this._allUpdaters; _i < _b.length; _i++) {
                var updater = _b[_i];
                updater.init();
            }
        }
        // Overwrite
        if (this._singleTarget)
            this._overwrite(this._singleTarget);
        else if (this._multiTarget) {
            for (var _c = 0, _d = this._multiTarget; _c < _d.length; _c++) {
                var target = _d[_c];
                this._overwrite(target);
            }
        }
        Tween24._playingTweens.push(this);
    };
    Tween24.prototype._overwrite = function (target) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var tweens = Tween24._playingTweensByTarget.get(target);
        if (tweens) {
            for (var _i = 0, tweens_1 = tweens; _i < tweens_1.length; _i++) {
                var tween = tweens_1[_i];
                if (this !== tween) {
                    if (this._singleTarget) {
                        if (this._objectUpdater)
                            (_a = (tween._objectMultiUpdater || tween._objectUpdater)) === null || _a === void 0 ? void 0 : _a.overwrite(this._objectUpdater);
                        if (this._transformUpdater)
                            (_b = (tween._transformMultiUpdater || tween._transformUpdater)) === null || _b === void 0 ? void 0 : _b.overwrite(this._transformUpdater);
                        if (this._styleUpdater)
                            (_c = (tween._styleMultiUpdater || tween._styleUpdater)) === null || _c === void 0 ? void 0 : _c.overwrite(this._styleUpdater);
                    }
                    else if (this._multiTarget) {
                        if (tween._objectMultiUpdater)
                            (_d = this._objectMultiUpdater) === null || _d === void 0 ? void 0 : _d.overwriteMultiTo(tween._objectMultiUpdater);
                        else if (tween._objectUpdater)
                            (_e = this._objectMultiUpdater) === null || _e === void 0 ? void 0 : _e.overwriteTo(tween._objectUpdater);
                        if (tween._transformMultiUpdater)
                            (_f = this._transformMultiUpdater) === null || _f === void 0 ? void 0 : _f.overwriteMultiTo(tween._transformMultiUpdater);
                        else if (tween._transformUpdater)
                            (_g = this._transformMultiUpdater) === null || _g === void 0 ? void 0 : _g.overwriteTo(tween._transformUpdater);
                        if (tween._styleMultiUpdater)
                            (_h = this._styleMultiUpdater) === null || _h === void 0 ? void 0 : _h.overwriteMultiTo(tween._styleMultiUpdater);
                        else if (tween._styleUpdater)
                            (_j = this._styleMultiUpdater) === null || _j === void 0 ? void 0 : _j.overwriteTo(tween._styleUpdater);
                    }
                }
            }
            tweens.push(this);
        }
        else {
            Tween24._playingTweensByTarget.set(target, [this]);
        }
    };
    Tween24.prototype._update = function (nowTime) {
        var _a, _b, _c;
        this._updateProgress(this._time, this._startTime, nowTime);
        // Delay
        if (this._progress < 0)
            return;
        // Container Tween
        if (this._isContainerTween) {
            if (this._inited == false) {
                this._inited = true;
                switch (this._type) {
                    case Tween24.TYPE_SERIAL:
                        if (this._firstTween) {
                            (_a = this._playingChildTween) === null || _a === void 0 ? void 0 : _a.push(this._firstTween);
                            this._firstTween._play();
                        }
                        break;
                    case Tween24.TYPE_PARALLEL:
                        if (this._childTween) {
                            for (var _i = 0, _d = this._childTween; _i < _d.length; _i++) {
                                var tween = _d[_i];
                                (_b = this._playingChildTween) === null || _b === void 0 ? void 0 : _b.push(tween);
                                tween._play();
                            }
                        }
                        break;
                }
                this._functionExecute(Tween24Event.INIT);
            }
            // Update
            if (this._playingChildTween) {
                for (var _e = 0, _f = this._playingChildTween; _e < _f.length; _e++) {
                    var tween = _f[_e];
                    tween._update(nowTime);
                }
            }
            this._functionExecute(Tween24Event.UPDATE);
            if (this._numChildren == this._numCompleteChildren)
                this._complete();
        }
        // Child Tween
        else {
            if (this._singleTarget || this._multiTarget) {
                // Init
                if (!this._inited) {
                    this._inited = true;
                    this._initParam();
                    this._functionExecute(Tween24Event.INIT);
                }
                // Update propety
                var prog = this._easing ? this._easing(this._progress, 0, 1, 1) : this._progress;
                if ((_c = this._allUpdaters) === null || _c === void 0 ? void 0 : _c.length) {
                    for (var _g = 0, _h = this._allUpdaters; _g < _h.length; _g++) {
                        var updater = _h[_g];
                        updater.update(prog);
                    }
                }
                this._functionExecute(Tween24Event.UPDATE);
            }
            else {
                // Init
                if (!this._inited) {
                    this._inited = true;
                    this._functionExecute(Tween24Event.INIT);
                }
                this._functionExecute(Tween24Event.UPDATE);
            }
            // Complete
            if (this._progress >= 1) {
                // Func
                if (this._type == Tween24.TYPE_FUNC) {
                    this._functionExecute(Tween24.TYPE_FUNC);
                }
                // End
                this._complete();
            }
        }
    };
    Tween24.prototype._complete = function () {
        this.debugLog(this._type + " complete");
        this._tweenStop();
        if (this._parent)
            this._parent._completeChildTween(this);
        this._functionExecute(Tween24Event.COMPLATE);
    };
    Tween24.prototype._tweenStop = function () {
        if (this._isRoot)
            Tween24.ticker.remove(this);
        if (this._playingChildTween)
            this._playingChildTween.length = 0;
        this._numCompleteChildren = 0;
        this._inited = false;
        ArrayUtil.removeItemFromArray(Tween24._playingTweensByTarget.get(this._singleTarget), this);
        ArrayUtil.removeItemFromArray(Tween24._playingTweens, this);
    };
    Tween24.prototype._completeChildTween = function (tween) {
        this.debugLog(this._type + " completeChildTween");
        this._numCompleteChildren++;
        if (this._numChildren == this._numCompleteChildren) {
            this._complete();
        }
        else if (this._playingChildTween) {
            ArrayUtil.removeItemFromArray(this._playingChildTween, tween);
            var next = tween._next;
            if (next) {
                this._playingChildTween.push(next);
                next._play();
            }
        }
    };
    Tween24.prototype._updateProgress = function (time, startTime, nowTime) {
        if (nowTime < startTime)
            this._progress = -1;
        else if (time == 0)
            this._progress = 1;
        else {
            this._progress = (nowTime - startTime) / (time * 1000);
            this._progress = (this._progress > 1) ? 1 : this._progress;
        }
        return this._progress;
    };
    // ------------------------------------------
    //
    // Tween Propety
    //
    // ------------------------------------------
    /**
     * 目標とするX座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.x = function (value) { return this._setPropety("x", value); };
    /**
     * 目標とするY座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.y = function (value) { return this._setPropety("y", value); };
    /**
     * 目標とするXとY座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} x Y座標
     * @param {number} y Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.xy = function (x, y) { return this._setPropety("x", x)._setPropety("y", y); };
    /**
     * 目標とする透明度を設定します。
     * 対象が HTMLElement の場合は、CSS:opacity が適応されます。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.alpha = function (value) { return this._setPropety("alpha", value); };
    /**
     * 目標とする透明度を設定します。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.opacity = function (value) { return this._setPropety("opacity", value); };
    /**
     * 目標とする水平スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 水平方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.scaleX = function (value) { return this._setPropety("scaleX", value); };
    /**
     * 目標とする垂直スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.scaleY = function (value) { return this._setPropety("scaleY", value); };
    /**
     * 目標とするスケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 水平＆垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.scale = function (value) { return this._setPropety("scaleX", value)._setPropety("scaleY", value); };
    /**
     * 目標とする水平・垂直スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} scaleX 水平方向のスケール
     * @param {number} scaleY 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.scaleXY = function (scaleX, scaleY) { return this._setPropety("scaleX", scaleX)._setPropety("scaleY", scaleY); };
    /**
     * 目標とする水平傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 水平方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.skewX = function (value) { return this._setPropety("skewX", value); };
    /**
     * 目標とする垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.skewY = function (value) { return this._setPropety("skewY", value); };
    /**
     * 目標とする水平＆垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 水平＆垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.skew = function (value) { return this._setPropety("skewX", value)._setPropety("skewY", value); };
    /**
     * 目標とする水平・垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} skewX 水平方向の傾斜
     * @param {number} skewY 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.skewXY = function (skewX, skewY) { return this._setPropety("skewX", skewX)._setPropety("skewY", skewY); };
    /**
     * 目標とする回転角度を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 回転角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.rotation = function (value) { return this._setPropety("rotation", value); };
    /**
     * トゥイーンの遅延時間を設定します。
     * @param {number} value 遅延時間（秒数）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.delay = function (value) { this._delayTime += value; return this; };
    /**
     * 目標とするスタイルシートの値を設定します。
     * 対象が HTMLElement の場合にのみ適応されます。
     * @param {string} name プロパティ名
     * @param {(number|string)} value 目標の値（数値指定の場合は、基本的にpx単位で計算されます）
     * @memberof Tween24
     */
    Tween24.prototype.style = function (name, value) { return this._setStyle(name, value); };
    /**
     * トゥイーン単体のFPSを設定します。
     * デフォルトでは0が設定され、ブラウザのリフレッシュレートに合わせて描画更新されます。
     * @param {number} fps FPSの値
     * @return {Tween24}
     * @memberof Tween24
     */
    Tween24.prototype.fps = function (fps) { this.__fps = fps; return this; };
    // ------------------------------------------
    //
    // Tween Callback
    //
    // ------------------------------------------
    /**
     * トゥイーン再生時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.onPlay = function (scope, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return this._setFunctionExecute(Tween24Event.PLAY, scope, func, args);
    };
    /**
     * トゥイーン開始時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.onInit = function (scope, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return this._setFunctionExecute(Tween24Event.INIT, scope, func, args);
    };
    /**
     * トゥイーン実行中に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.onUpdate = function (scope, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return this._setFunctionExecute(Tween24Event.UPDATE, scope, func, args);
    };
    /**
     * トゥイーンが一時停止した時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.onPause = function (scope, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return this._setFunctionExecute(Tween24Event.PAUSE, scope, func, args);
    };
    /**
     * トゥイーンが一時停止中から、再開した時に実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.onResume = function (scope, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return this._setFunctionExecute(Tween24Event.RESUME, scope, func, args);
    };
    /**
     * トゥイーンが停止された時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.onStop = function (scope, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return this._setFunctionExecute(Tween24Event.STOP, scope, func, args);
    };
    /**
     * トゥイーンが完了した時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.onComplate = function (scope, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return this._setFunctionExecute(Tween24Event.COMPLATE, scope, func, args);
    };
    Tween24.prototype._setPropety = function (key, value) {
        if (this._singleTarget) {
            if (this._objectUpdater)
                this._objectUpdater.addProp(key, value);
            else if (this._transformUpdater)
                this._transformUpdater.addProp(key, value);
        }
        else if (this._multiTarget) {
            if (this._objectMultiUpdater)
                this._objectMultiUpdater.addProp(key, value);
            else if (this._transformMultiUpdater)
                this._transformMultiUpdater.addProp(key, value);
        }
        return this;
    };
    Tween24.prototype._setStyle = function (name, value) {
        var _a, _b;
        if (this._singleTarget) {
            if (!this._styleUpdater) {
                this._styleUpdater = new StyleUpdater(this._singleTarget);
                (_a = this._allUpdaters) === null || _a === void 0 ? void 0 : _a.push(this._styleUpdater);
            }
            this._styleUpdater.addPropStr(name, value);
        }
        else if (this._multiTarget) {
            if (!this._styleMultiUpdater) {
                this._styleMultiUpdater = new MultiUpdater(this._multiTarget, StyleUpdater.name);
                (_b = this._allUpdaters) === null || _b === void 0 ? void 0 : _b.push(this._styleMultiUpdater);
            }
            this._styleMultiUpdater.addPropStr(name, value);
        }
        return this;
    };
    Tween24.prototype._setFunctionExecute = function (key, scope, func, args) {
        this._functionExecuters || (this._functionExecuters = {});
        this._functionExecuters[key] = new FunctionExecuter(scope, func, args);
        return this;
    };
    Tween24.prototype._functionExecute = function (key) {
        var _a;
        if (this._functionExecuters) {
            (_a = this._functionExecuters[key]) === null || _a === void 0 ? void 0 : _a.execute();
        }
    };
    // ------------------------------------------
    //
    // Tween create
    //
    // ------------------------------------------
    /**
     * トゥイーンを設定します。
     * @static
     * @param {*} target 対象オブジェクト
     * @param {number} time 時間（秒）
     * @param {(Function|null)} [easing=null] イージング関数（デフォルト値：Ease24._Linear）
     * @param {({[key:string]:number}|null)} [params=null] トゥイーンさせるパラメータ（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.tween = function (target, time, easing, params) {
        if (easing === void 0) { easing = null; }
        if (params === void 0) { params = null; }
        return new Tween24()._createChildTween(Tween24.TYPE_TWEEN, target, time, easing, params);
    };
    /**
     * プロパティを設定します。
     * @static
     * @param {*} target 対象オブジェクト
     * @param {({[key:string]:number}|null)} [params=null] 設定するパラメータ（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
    */
    Tween24.prop = function (target, params) {
        if (params === void 0) { params = null; }
        return new Tween24()._createChildTween(Tween24.TYPE_PROP, target, 0, null, params);
    };
    /**
     * トゥイーンを待機します。
     * @static
     * @param {number} time 待機時間（秒）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.wait = function (time) {
        return new Tween24()._createChildTween(Tween24.TYPE_WAIT, null, time, null, null);
    };
    /**
     * 関数を実行します。
     * @static
     * @param {*} scope 関数が定義されているオブジェクト
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.func = function (scope, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return new Tween24()._createActionTween(Tween24.TYPE_FUNC, scope, func, args);
    };
    /**
     * 順番に実行するトゥイーンを設定します。
     * @static
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.serial = function () {
        var childTween = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            childTween[_i] = arguments[_i];
        }
        return new Tween24()._createContainerTween(Tween24.TYPE_SERIAL, childTween);
    };
    /**
     * 並列に実行するトゥイーンを設定します。
     * @static
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.parallel = function () {
        var childTween = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            childTween[_i] = arguments[_i];
        }
        return new Tween24()._createContainerTween(Tween24.TYPE_PARALLEL, childTween);
    };
    Tween24.prototype._createChildTween = function (type, target, time, easing, params) {
        this._type = type;
        this._easing = easing || Tween24._defaultEasing;
        this._time = time;
        this._delayTime = 0;
        this._startTime = 0;
        this._inited = false;
        this._allUpdaters = [];
        this._isContainerTween = false;
        if (Array.isArray(target)) {
            if (ClassUtil.isString(target[0])) {
                this._multiTarget = [];
                for (var _i = 0, target_1 = target; _i < target_1.length; _i++) {
                    var t = target_1[_i];
                    this._multiTarget = this._multiTarget.concat(HTMLUtil.getHTMLElement(t));
                }
                this._transformMultiUpdater = new MultiUpdater(this._multiTarget, TransformUpdater.name);
                this._allUpdaters.push(this._transformMultiUpdater);
            }
            else if (target[0] instanceof HTMLElement) {
                this._multiTarget = target;
                this._transformMultiUpdater = new MultiUpdater(this._multiTarget, TransformUpdater.name);
                this._allUpdaters.push(this._transformMultiUpdater);
            }
            else {
                this._multiTarget = target;
                this._objectMultiUpdater = new MultiUpdater(this._multiTarget, ObjectUpdater.name);
                this._allUpdaters.push(this._objectMultiUpdater);
            }
        }
        else if (ClassUtil.isString(target)) {
            var t = HTMLUtil.getHTMLElement(target);
            if (t.length == 1) {
                this._singleTarget = t[0];
                this._transformUpdater = new TransformUpdater(this._singleTarget);
                this._allUpdaters.push(this._transformUpdater);
            }
            else {
                this._multiTarget = t;
                this._transformMultiUpdater = new MultiUpdater(this._multiTarget, TransformUpdater.name);
                this._allUpdaters.push(this._transformMultiUpdater);
            }
        }
        else {
            this._singleTarget = target;
            this._objectUpdater = new ObjectUpdater(target);
            this._allUpdaters.push(this._objectUpdater);
        }
        if (params) {
            for (var key in params) {
                this._setPropety(key, params[key]);
            }
        }
        return this;
    };
    Tween24.prototype._createContainerTween = function (type, childTween) {
        this._type = type;
        this._time = 0;
        this._delayTime = 0;
        this._childTween = childTween;
        this._firstTween = this._childTween[0];
        this._playingChildTween = [];
        this._numChildren = childTween.length;
        this._numCompleteChildren = 0;
        this._isContainerTween = true;
        var prev = this._firstTween;
        var next;
        if (type == Tween24.TYPE_SERIAL) {
            for (var i = 0; i < this._numChildren; i++) {
                next = this._childTween[i + 1];
                prev._next = next;
                prev._parent = this;
                prev = next;
            }
        }
        else {
            for (var _i = 0, _a = this._childTween; _i < _a.length; _i++) {
                var tween = _a[_i];
                tween._parent = this;
            }
        }
        return this;
    };
    Tween24.prototype._createActionTween = function (type, scope, func, args) {
        this._type = type;
        this._time = 0;
        this._delayTime = 0;
        this._startTime = 0;
        this._inited = false;
        this._isContainerTween = false;
        switch (this._type) {
            case Tween24.TYPE_FUNC: this._setFunctionExecute(Tween24.TYPE_FUNC, scope, func, args);
        }
        return this;
    };
    // ------------------------------------------
    //
    // Util
    //
    // ------------------------------------------
    /**
     * トゥイーン全体のFPSを設定します。
     * デフォルトでは0が設定され、ブラウザのリフレッシュレートに合わせて描画更新されます。
     * @static
     * @param {number} [fps=0] FPSの値
     * @memberof Tween24
     */
    Tween24.setFPS = function (fps) {
        if (fps === void 0) { fps = 0; }
        Tween24.ticker.fps = fps;
    };
    /**
     * デフォルトのイージングを設定します。
     * @static
     * @param {Function} [easing=Ease24._Linear] デフォルトのイージング
     * @memberof Tween24
     */
    Tween24.setDefaultEasing = function (easing) {
        if (easing === void 0) { easing = Ease24._Linear; }
        Tween24._defaultEasing = easing;
    };
    Tween24.prototype.trace = function (value) {
        console.log(value);
    };
    Tween24.prototype.debugLog = function (message) {
        this.trace("[Tween24 " + message + "]");
    };
    // Static
    Tween24.VERSION = "0.3.0";
    Tween24.TYPE_TWEEN = "tween";
    Tween24.TYPE_PROP = "prop";
    Tween24.TYPE_WAIT = "wait";
    Tween24.TYPE_SERIAL = "serial";
    Tween24.TYPE_PARALLEL = "parallel";
    Tween24.TYPE_FUNC = "func";
    Tween24._defaultEasing = Ease24._Linear;
    return Tween24;
}());
export default Tween24;
