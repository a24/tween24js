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
        this.easing = null;
        this.type = "";
        this.time = NaN;
        this.delayTime = NaN;
        this.startTime = NaN;
        // Updater
        this.objectUpdater = null;
        this.objectMultiUpdater = null;
        this.transformUpdater = null;
        this.transformMultiUpdater = null;
        this.styleUpdater = null;
        this.styleMultiUpdater = null;
        this.allUpdaters = null;
        // Refer
        this.root = null;
        this.parent = null;
        this.next = null;
        // Flag
        this.inited = false;
        this.isRoot = false;
        this.isContainerTween = false;
        // Action & Callback
        this.functionExecuters = null;
        // Container Tween
        this.childTween = null;
        this.firstTween = null;
        this.playingChildTween = null;
        this.numChildren = 0;
        this.numCompleteChildren = 0;
        Tween24.ease || (Tween24.ease = new Ease24());
        Tween24.ticker || (Tween24.ticker = new Ticker24());
        Tween24._playingTweens || (Tween24._playingTweens = []);
        Tween24._playingTweensByTarget || (Tween24._playingTweensByTarget = new Map());
    }
    Tween24.prototype.play = function () {
        this.root = this;
        this.isRoot = true;
        this.inited = false;
        Tween24.ticker.add(this);
        this.__play();
    };
    Tween24.prototype.__play = function () {
        var _a;
        this.debugLog(this.type + " play");
        if (!this.isRoot) {
            this.root = ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.root) || this.parent;
        }
        this.startTime = this.getTime() + this.delayTime * 1000;
        this.functionExecute(Tween24Event.PLAY);
    };
    Tween24.prototype.stop = function () {
        this.__tweenStop();
        this.functionExecute(Tween24Event.STOP);
    };
    // pause() {
    // }
    Tween24.prototype.__initParam = function () {
        var _a;
        if ((_a = this.allUpdaters) === null || _a === void 0 ? void 0 : _a.length) {
            for (var _i = 0, _b = this.allUpdaters; _i < _b.length; _i++) {
                var updater = _b[_i];
                updater.init();
            }
        }
        // Overwrite
        if (this._singleTarget)
            this.overwrite(this._singleTarget);
        else if (this._multiTarget) {
            for (var _c = 0, _d = this._multiTarget; _c < _d.length; _c++) {
                var target = _d[_c];
                this.overwrite(target);
            }
        }
        Tween24._playingTweens.push(this);
    };
    Tween24.prototype.overwrite = function (target) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var tweens = Tween24._playingTweensByTarget.get(target);
        if (tweens) {
            for (var _i = 0, tweens_1 = tweens; _i < tweens_1.length; _i++) {
                var tween = tweens_1[_i];
                if (this !== tween) {
                    if (this._singleTarget) {
                        if (this.objectUpdater)
                            (_a = (tween.objectMultiUpdater || tween.objectUpdater)) === null || _a === void 0 ? void 0 : _a.overwrite(this.objectUpdater);
                        if (this.transformUpdater)
                            (_b = (tween.transformMultiUpdater || tween.transformUpdater)) === null || _b === void 0 ? void 0 : _b.overwrite(this.transformUpdater);
                        if (this.styleUpdater)
                            (_c = (tween.styleMultiUpdater || tween.styleUpdater)) === null || _c === void 0 ? void 0 : _c.overwrite(this.styleUpdater);
                    }
                    else if (this._multiTarget) {
                        if (tween.objectMultiUpdater)
                            (_d = this.objectMultiUpdater) === null || _d === void 0 ? void 0 : _d.overwriteMultiTo(tween.objectMultiUpdater);
                        else if (tween.objectUpdater)
                            (_e = this.objectMultiUpdater) === null || _e === void 0 ? void 0 : _e.overwriteTo(tween.objectUpdater);
                        if (tween.transformMultiUpdater)
                            (_f = this.transformMultiUpdater) === null || _f === void 0 ? void 0 : _f.overwriteMultiTo(tween.transformMultiUpdater);
                        else if (tween.transformUpdater)
                            (_g = this.transformMultiUpdater) === null || _g === void 0 ? void 0 : _g.overwriteTo(tween.transformUpdater);
                        if (tween.styleMultiUpdater)
                            (_h = this.styleMultiUpdater) === null || _h === void 0 ? void 0 : _h.overwriteMultiTo(tween.styleMultiUpdater);
                        else if (tween.styleUpdater)
                            (_j = this.styleMultiUpdater) === null || _j === void 0 ? void 0 : _j.overwriteTo(tween.styleUpdater);
                    }
                }
            }
            tweens.push(this);
        }
        else {
            Tween24._playingTweensByTarget.set(target, [this]);
        }
    };
    Tween24.prototype.__update = function () {
        var _a;
        var progress = this.getProgress(this.time, this.startTime);
        // Delay
        if (progress < 0)
            return;
        // Container Tween
        if (this.isContainerTween) {
            if (this.inited == false) {
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
                this.functionExecute(Tween24Event.INIT);
            }
            // Update
            if (this.playingChildTween) {
                for (var i = 0; i < this.playingChildTween.length; i++) {
                    this.playingChildTween[i].__update();
                }
            }
            this.functionExecute(Tween24Event.UPDATE);
            if (this.numChildren == this.numCompleteChildren)
                this.__complete();
        }
        // Child Tween
        else {
            if (this._singleTarget || this._multiTarget) {
                // Init
                if (!this.inited) {
                    this.inited = true;
                    this.__initParam();
                    this.functionExecute(Tween24Event.INIT);
                }
                // Update propety
                var prog = this.easing ? this.easing(progress, 0, 1, 1) : progress;
                if ((_a = this.allUpdaters) === null || _a === void 0 ? void 0 : _a.length) {
                    for (var _i = 0, _b = this.allUpdaters; _i < _b.length; _i++) {
                        var updater = _b[_i];
                        updater.update(prog);
                    }
                }
                this.functionExecute(Tween24Event.UPDATE);
            }
            else {
                // Init
                if (!this.inited) {
                    this.inited = true;
                    this.functionExecute(Tween24Event.INIT);
                }
                this.functionExecute(Tween24Event.UPDATE);
            }
            // Complete
            if (progress >= 1) {
                // Func
                if (this.type == Tween24.TYPE_FUNC) {
                    this.functionExecute(Tween24.TYPE_FUNC);
                }
                // End
                this.__complete();
            }
        }
    };
    Tween24.prototype.__complete = function () {
        this.debugLog(this.type + " complete");
        this.__tweenStop();
        if (this.parent)
            this.parent.__completeChildTween(this);
        this.functionExecute(Tween24Event.COMPLATE);
    };
    Tween24.prototype.__tweenStop = function () {
        if (this.isRoot)
            Tween24.ticker.remove(this);
        ArrayUtil.removeItemFromArray(Tween24._playingTweensByTarget.get(this._singleTarget), this);
        ArrayUtil.removeItemFromArray(Tween24._playingTweens, this);
    };
    Tween24.prototype.__completeChildTween = function (tween) {
        this.debugLog(this.type + " completeChildTween");
        this.numCompleteChildren++;
        if (this.playingChildTween) {
            ArrayUtil.removeItemFromArray(this.playingChildTween, tween);
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
    Tween24.prototype.__initChildTween = function (type, target, time, easing, params) {
        this.type = type;
        this.easing = easing || Ease24._Linear;
        this.time = time;
        this.delayTime = 0;
        this.startTime = 0;
        this.inited = false;
        this.allUpdaters = [];
        this.isContainerTween = false;
        if (Array.isArray(target)) {
            if (ClassUtil.isString(target[0])) {
                this._multiTarget = [];
                for (var _i = 0, target_1 = target; _i < target_1.length; _i++) {
                    var t = target_1[_i];
                    this._multiTarget = this._multiTarget.concat(HTMLUtil.getHTMLElement(t));
                }
                this.transformMultiUpdater = new MultiUpdater(this._multiTarget, TransformUpdater.name);
                this.allUpdaters.push(this.transformMultiUpdater);
            }
            else if (target[0] instanceof HTMLElement) {
                this._multiTarget = target;
                this.transformMultiUpdater = new MultiUpdater(this._multiTarget, TransformUpdater.name);
                this.allUpdaters.push(this.transformMultiUpdater);
            }
            else {
                this._multiTarget = target;
                this.objectMultiUpdater = new MultiUpdater(this._multiTarget, ObjectUpdater.name);
                this.allUpdaters.push(this.objectMultiUpdater);
            }
        }
        else if (ClassUtil.isString(target)) {
            var t = HTMLUtil.getHTMLElement(target);
            if (t.length == 1) {
                this._singleTarget = t[0];
                this.transformUpdater = new TransformUpdater(this._singleTarget);
                this.allUpdaters.push(this.transformUpdater);
            }
            else {
                this._multiTarget = t;
                this.transformMultiUpdater = new MultiUpdater(this._multiTarget, TransformUpdater.name);
                this.allUpdaters.push(this.transformMultiUpdater);
            }
        }
        else {
            this._singleTarget = target;
            this.objectUpdater = new ObjectUpdater(target);
            this.allUpdaters.push(this.objectUpdater);
        }
        if (params) {
            for (var key in params) {
                this.__setPropety(key, params[key]);
            }
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
        this.time = 0;
        this.delayTime = 0;
        this.startTime = 0;
        this.inited = false;
        this.isContainerTween = false;
        switch (this.type) {
            case Tween24.TYPE_FUNC: this.setFunctionExecute(Tween24.TYPE_FUNC, scope, func, args);
        }
        return this;
    };
    // ------------------------------------------
    //
    // Propety
    //
    // ------------------------------------------
    /**
     * 目標とするX座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.x = function (value) { return this.__setPropety("x", value); };
    /**
     * 目標とするY座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.y = function (value) { return this.__setPropety("y", value); };
    /**
     * 目標とするXとY座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} x Y座標
     * @param {number} y Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.xy = function (x, y) { return this.__setPropety("x", x).__setPropety("y", y); };
    /**
     * 目標とする透明度を設定します。
     * 対象が HTMLElement の場合は、CSS:opacity が適応されます。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.alpha = function (value) { return this.__setPropety("alpha", value); };
    /**
     * 目標とする水平スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 水平方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.scaleX = function (value) { return this.__setPropety("scaleX", value); };
    /**
     * 目標とする垂直スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.scaleY = function (value) { return this.__setPropety("scaleY", value); };
    /**
     * 目標とするスケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 水平＆垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.scale = function (value) { return this.__setPropety("scaleX", value).__setPropety("scaleY", value); };
    /**
     * 目標とする水平・垂直スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} scaleX 水平方向のスケール
     * @param {number} scaleY 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.scaleXY = function (scaleX, scaleY) { return this.__setPropety("scaleX", scaleX).__setPropety("scaleY", scaleY); };
    /**
     * 目標とする水平傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 水平方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.skewX = function (value) { return this.__setPropety("skewX", value); };
    /**
     * 目標とする垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.skewY = function (value) { return this.__setPropety("skewY", value); };
    /**
     * 目標とする水平＆垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 水平＆垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.skew = function (value) { return this.__setPropety("skewX", value).__setPropety("skewY", value); };
    /**
     * 目標とする水平・垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} skewX 水平方向の傾斜
     * @param {number} skewY 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.skewXY = function (skewX, skewY) { return this.__setPropety("skewX", skewX).__setPropety("skewY", skewY); };
    /**
     * 目標とする回転角度を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 回転角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.rotation = function (value) { return this.__setPropety("rotation", value); };
    /**
     * トゥイーンの遅延時間を設定します。
     * @param {number} value 遅延時間（秒数）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.delay = function (value) { this.delayTime += value; return this; };
    /**
     * 目標とするスタイルシートの値を設定します。
     * 対象が HTMLElement の場合にのみ適応されます。
     * @param {string} name プロパティ名
     * @param {(number|string)} value 目標の値（数値指定の場合は、基本的にpx単位で計算されます）
     * @memberof Tween24
     */
    Tween24.prototype.style = function (name, value) { return this.__setStyle(name, value); };
    // ------------------------------------------
    //
    // Callback
    //
    // ------------------------------------------
    /**
     * トゥイーン再生時に実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.onPlay = function (scope, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return this.setFunctionExecute(Tween24Event.PLAY, scope, func, args);
    };
    /**
     * トゥイーン開始時に実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.onInit = function (scope, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return this.setFunctionExecute(Tween24Event.INIT, scope, func, args);
    };
    /**
     * トゥイーン実行中に実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.onUpdate = function (scope, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return this.setFunctionExecute(Tween24Event.UPDATE, scope, func, args);
    };
    /**
     * トゥイーンが一時停止した時に実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.onPause = function (scope, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return this.setFunctionExecute(Tween24Event.PAUSE, scope, func, args);
    };
    /**
     * トゥイーンが停止された時に実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.onStop = function (scope, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return this.setFunctionExecute(Tween24Event.STOP, scope, func, args);
    };
    /**
     * トゥイーンが完了した時に実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.prototype.onComplate = function (scope, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return this.setFunctionExecute(Tween24Event.COMPLATE, scope, func, args);
    };
    Tween24.prototype.__setPropety = function (key, value) {
        if (this._singleTarget) {
            if (this.objectUpdater)
                this.objectUpdater.addProp(key, value);
            else if (this.transformUpdater)
                this.transformUpdater.addProp(key, value);
        }
        else if (this._multiTarget) {
            if (this.objectMultiUpdater)
                this.objectMultiUpdater.addProp(key, value);
            else if (this.transformMultiUpdater)
                this.transformMultiUpdater.addProp(key, value);
        }
        return this;
    };
    Tween24.prototype.__setStyle = function (name, value) {
        var _a, _b;
        if (this._singleTarget) {
            if (!this.styleUpdater) {
                this.styleUpdater = new StyleUpdater(this._singleTarget);
                (_a = this.allUpdaters) === null || _a === void 0 ? void 0 : _a.push(this.styleUpdater);
            }
            this.styleUpdater.addPropStr(name, value);
        }
        else if (this._multiTarget) {
            if (!this.styleMultiUpdater) {
                this.styleMultiUpdater = new MultiUpdater(this._multiTarget, StyleUpdater.name);
                (_b = this.allUpdaters) === null || _b === void 0 ? void 0 : _b.push(this.styleMultiUpdater);
            }
            this.styleMultiUpdater.addPropStr(name, value);
        }
        return this;
    };
    Tween24.prototype.setFunctionExecute = function (key, scope, func, args) {
        this.functionExecuters || (this.functionExecuters = {});
        this.functionExecuters[key] = new FunctionExecuter(scope, func, args);
        return this;
    };
    Tween24.prototype.functionExecute = function (key) {
        var _a;
        if (this.functionExecuters) {
            (_a = this.functionExecuters[key]) === null || _a === void 0 ? void 0 : _a.execute();
        }
    };
    // ------------------------------------------
    //
    // Tween
    //
    // ------------------------------------------
    /**
     * トゥイーンを設定します。
     * @static
     * @param {*} target 対象オブジェクト
     * @param {number} time 時間（秒）
     * @param {Function} [easing=Ease24._Linear] イージング関数
     * @param {({[key:string]:number}|null)} [params=null] トゥイーンさせるパラメータ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
    */
    Tween24.tween = function (target, time, easing, params) {
        if (easing === void 0) { easing = Ease24._Linear; }
        if (params === void 0) { params = null; }
        return new Tween24().__initChildTween(Tween24.TYPE_TWEEN, target, time, easing, params);
    };
    /**
     * プロパティを設定します。
     * @static
     * @param {*} target 対象オブジェクト
     * @param {({[key:string]:number}|null)} [params=null] 設定するパラメータ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
    */
    Tween24.prop = function (target, params) {
        if (params === void 0) { params = null; }
        return new Tween24().__initChildTween(Tween24.TYPE_PROP, target, 0, null, params);
    };
    /**
     * トゥイーンを待機します。
     * @static
     * @param {number} time 待機時間（秒）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.wait = function (time) {
        return new Tween24().__initChildTween(Tween24.TYPE_WAIT, null, time, null, null);
    };
    /**
     * 関数を実行します。
     * @static
     * @param {*} scope 関数が定義されているオブジェクト
     * @param {Function} func 実行する関数
     * @param {...any[]} args 実行する関数の引数
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    Tween24.func = function (scope, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return new Tween24().__initActionTween(Tween24.TYPE_FUNC, scope, func, args);
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
        return new Tween24().__initContainerTween(Tween24.TYPE_SERIAL, childTween);
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
    return Tween24;
}());
export default Tween24;
