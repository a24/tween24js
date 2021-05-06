import { Ticker24 }         from "./core/Ticker24";
import { Ease24 }           from "./Ease24";
import { Tween24Event }     from "./core/Tween24Event";
import { Updater }          from "./core/updaters/Updater";
import { ObjectUpdater }    from "./core/updaters/ObjectUpdater";
import { TransformUpdater } from "./core/updaters/TransformUpdater";
import { FunctionExecuter } from "./core/FunctionExecuter";
import { StyleUpdater }     from "./core/updaters/StyleUpdater";
import { MultiUpdater }     from "./core/updaters/MultiUpdater";
import { ArrayUtil }        from "./utils/ArrayUtil";
import { ClassUtil }        from "./utils/ClassUtil";
import { HTMLUtil }         from "./utils/HTMLUtil";
import { Sort24 }           from "./index";
import { Text24 }           from "./utils/Text24";

export class Tween24 {

    // Static
    static readonly VERSION:string = "0.8.1";

    private static readonly _TYPE_TWEEN              :string = "tween";
    private static readonly _TYPE_TWEEN_VELOCITY     :string = "tween_velocity";
    private static readonly _TYPE_TWEEN_TEXT         :string = "tween_text";
    private static readonly _TYPE_TWEEN_TEXT_VELOCITY:string = "tween_text_velocity";
    private static readonly _TYPE_PROP               :string = "prop";
    private static readonly _TYPE_PROP_TEXT          :string = "prop_text";
    private static readonly _TYPE_WAIT               :string = "wait";
    private static readonly _TYPE_SERIAL             :string = "serial";
    private static readonly _TYPE_PARALLEL           :string = "parallel";
    private static readonly _TYPE_LAG                :string = "lag";
    private static readonly _TYPE_FUNC               :string = "func";

    static ticker:Ticker24;
    static ease  :Ease24;

    private static _playingTweens:Tween24[];
    private static _playingTweensByTarget:Map<any, Tween24[]>;

    private static _defaultEasing:Function = Ease24._Linear;
    private static _debugMode:boolean = false;
    private static _numCreateTween:number = 0;

    // Tween param
    private _singleTarget:any      |null = null;
    private _multiTarget :any[]    |null = null;
    private _easing      :Function |null = null;
    private _type        :string         = "";

    private _time     :number  = NaN;
    private _velocity :number  = NaN;
    private _delayTime:number  = NaN;
    private _startTime:number  = NaN;
    private _progress :number  = 0;

    private _debugMode   :boolean = false;
    private _numLayers   :number  = 0;
    private _serialNumber:number  = 0;
    private _tweenId     :string  = "";
    private _targetString:string  = "";
    private _targetQuery  :string|null  = null;

    // Updater
    private _objectUpdater        :ObjectUpdater   |null = null;
    private _objectMultiUpdater   :MultiUpdater    |null = null;
    private _transformUpdater     :TransformUpdater|null = null;
    private _transformMultiUpdater:MultiUpdater    |null = null;
    private _styleUpdater         :StyleUpdater    |null = null;
    private _styleMultiUpdater    :MultiUpdater    |null = null;
    private _allUpdaters          :Updater[]       |null = null;

    // Refer
    private _root  :Tween24|null = null;
    private _parent:Tween24|null = null;
    private _next  :Tween24|null = null;

    // Status
    private _useStyle:boolean = false;
    private _inited  :boolean = false;
    private _played  :boolean = false;
    private _paused  :boolean = false;
    private _isRoot  :boolean = false;
    private _firstUpdated    :boolean = false;
    private _isContainerTween:boolean = false;

    // Action & Callback
    private _functionExecuters:{[key:string]:FunctionExecuter}|null = null;

    // Container Tween
    private _firstTween        :Tween24  |null = null;
    private _childTween        :Tween24[]|null = null;
    private _playingChildTween :Tween24[]|null = null;
    private _originalChildTween:Tween24[]|null = null;

    private _numChildren        :number = 0;
    private _numCompleteChildren:number = 0;

    // Lag
    private _lagTime     :number = NaN;
    private _totalLagTime:number = NaN;
    private _lagSort     :Function|null = null;
    private _lagEasing   :Function|null = null;
    
    // Tween FPS
    __fps:number = 0;
    __beforeTime:number = 0;

    constructor() {
        Tween24.ease ||= new Ease24();
        Tween24.ticker ||= new Ticker24();
        Tween24._playingTweens ||= [];
        Tween24._playingTweensByTarget ||= new Map<any, Tween24[]>();
    }


    // ------------------------------------------
    //
    // Tween control
    //
    // ------------------------------------------

    play() {
        if (!this._paused) {
            if (!this._played) {
                this._root   = this;
                this._isRoot = true;
                this._inited = false;
                this._firstUpdated = false;
                this._play();
                Tween24.ticker.add(this);
                this._functionExecute(Tween24Event.PLAY);
            }
        }
        else {
            this._resume();
            this._paused = false;
            Tween24.ticker.add(this);
            this._functionExecute(Tween24Event.RESUME);
        }
    }

    private _play() {
        if (this._isRoot) {
            this._numLayers = 0;
        }
        else {
            this._root = this._parent?._root || this._parent;
            this._numLayers = this._parent ? this._parent._numLayers + 1 : 1;
        }
        this._played = true;
        this._startTime = Ticker24.getTime() + this._delayTime * 1000;
        this._debugLog("play");
    }

    private _resume() {
        this._played = true;

        const nowTime:number = Ticker24.getTime();
        this._startTime = nowTime - this._time * 1000 * this._progress;
        
        if (this._playingChildTween) {
            for (const tween of this._playingChildTween) {
                if (tween._playingChildTween) tween._resume();
                else tween._startTime = nowTime - tween._time * 1000 * tween._progress;
            }
        }
    }

    pause() {
        if (this._isRoot) {
            this._played = false;
            this._paused = true;
            Tween24.ticker.remove(this);
            this._functionExecute(Tween24Event.PAUSE);
        }
    }

    stop() {
        this._stop();
        this._functionExecute(Tween24Event.STOP);
    }

    private _stop() {
        this._tweenStop();
        if (this._childTween) {
            for (const tween of this._childTween) {
                if (tween._childTween) tween._stop();
                else tween._tweenStop();
            }
        }
    }


    // ------------------------------------------
    //
    // Tween work
    //
    // ------------------------------------------

    private _initParam() {
        if (this._allUpdaters?.length) {
            for (const updater of this._allUpdaters) {
                updater.init();
            }
        }

        // Velocity
        if (this._type == Tween24._TYPE_TWEEN_VELOCITY || this._type == Tween24._TYPE_TWEEN_TEXT_VELOCITY) {
            const deltas:number[] = [0];
            if (this._allUpdaters?.length) {
                for (const updater of this._allUpdaters) {
                    deltas.push(updater.getMaxAbsDelta());
                }
            }
            this._time = Math.max(...deltas) / this._velocity;
        }
        
        // Overwrite
        if (this._singleTarget)
            this._overwrite(this._singleTarget);
        else if (this._multiTarget) {
            for (const target of this._multiTarget) {
                this._overwrite(target);
            }
        }
        Tween24._playingTweens.push(this);
    }

    private _overwrite(target:any) {
        let tweens:Tween24[]|undefined = Tween24._playingTweensByTarget.get(target);
        if (tweens) {
            for (const tween of tweens) {
                if (this !== tween) {
                    if (this._singleTarget) {
                        if (this._objectUpdater   ) (tween._objectMultiUpdater   ||tween._objectUpdater   )?.overwrite(this._objectUpdater);
                        if (this._transformUpdater) (tween._transformMultiUpdater||tween._transformUpdater)?.overwrite(this._transformUpdater);
                        if (this._styleUpdater    ) (tween._styleMultiUpdater    ||tween._styleUpdater    )?.overwrite(this._styleUpdater);
                    }
                    else if (this._multiTarget) {
                        if      (tween._objectMultiUpdater   ) this._objectMultiUpdater   ?.overwriteMultiTo(tween._objectMultiUpdater);
                        else if (tween._objectUpdater        ) this._objectMultiUpdater   ?.overwriteTo     (tween._objectUpdater);
                        if      (tween._transformMultiUpdater) this._transformMultiUpdater?.overwriteMultiTo(tween._transformMultiUpdater);
                        else if (tween._transformUpdater     ) this._transformMultiUpdater?.overwriteTo     (tween._transformUpdater);
                        if      (tween._styleMultiUpdater    ) this._styleMultiUpdater    ?.overwriteMultiTo(tween._styleMultiUpdater);
                        else if (tween._styleUpdater         ) this._styleMultiUpdater    ?.overwriteTo     (tween._styleUpdater);
                    }
                }
            }
            tweens.push(this);
        }
        else {
            Tween24._playingTweensByTarget.set(target, [this]);
        }
    }

    public _update(nowTime:number) {
        // Init
        if (!this._inited) {
            this._inited = true;
            this._initParam();
            this._functionExecute(Tween24Event.INIT);
        }

        this._updateProgress(this._time, this._startTime, nowTime);

        // Delay
        if (this._progress < 0) return;

        // Container Tween
        if (this._isContainerTween) {
            if (this._firstUpdated == false) {
                this._firstUpdated = true;
                switch (this._type) {
                    case Tween24._TYPE_SERIAL:
                        if (this._firstTween) {
                            this._playingChildTween?.push(this._firstTween);
                            this._firstTween._play();
                        }
                        break;
                    case Tween24._TYPE_PARALLEL:
                    case Tween24._TYPE_LAG     :
                        if (this._childTween) {
                            for (const tween of this._childTween) {
                                this._playingChildTween?.push(tween);
                                tween._play();
                            }
                        }
                        break;
                }
            }
            // Update
            if (this._playingChildTween) {
                for (const tween of this._playingChildTween) {
                    tween._update(nowTime);
                }
            }
            this._functionExecute(Tween24Event.UPDATE);
            if (this._numChildren == this._numCompleteChildren) this._complete();
        }

        // Child Tween
        else {
            this._firstUpdated = true;
            if (this._singleTarget || this._multiTarget) {
                // Update propety
                var prog = this._easing ? this._easing(this._progress, 0, 1, 1) : this._progress;
                if (this._allUpdaters?.length) {
                    for (const updater of this._allUpdaters) {
                        updater.update(prog);
                    }
                }
                this._functionExecute(Tween24Event.UPDATE);
            }
            else {
                this._functionExecute(Tween24Event.UPDATE);
            }

            // Complete
            if (this._progress >= 1) {
                // Func
                if (this._type == Tween24._TYPE_FUNC) {
                    this._functionExecute(Tween24._TYPE_FUNC);
                }

                // End
                this._complete();
            }
        }
    }

    private _complete() {
        this._debugLog("complete");
        this._tweenStop();
        if (this._parent) this._parent._completeChildTween(this);
        this._functionExecute(Tween24Event.COMPLATE);
    }

    private _tweenStop() {
        if (this._isRoot) Tween24.ticker.remove(this);
        if (this._playingChildTween) this._playingChildTween.length = 0;
        this._numCompleteChildren = 0;
        this._played = false;
        this._inited = false;
        this._firstUpdated = false;

        ArrayUtil.removeItemFromArray(Tween24._playingTweensByTarget.get(this._singleTarget), this);
        ArrayUtil.removeItemFromArray(Tween24._playingTweens, this);
    }

    private _completeChildTween(tween:Tween24) {
        // this._debugLog("completeChildTween");
        this._numCompleteChildren ++;
        if (this._numChildren == this._numCompleteChildren) {
            this._complete();
        }
        else if (this._playingChildTween) {
            ArrayUtil.removeItemFromArray(this._playingChildTween, tween);
            var next:Tween24|null = tween._next;
            if (next) {
                this._playingChildTween.push(next);
                next._play();
            }
        }
    }

    private _updateProgress(time:number, startTime:number, nowTime:number): number {
        if (nowTime < startTime) this._progress = -1;
        else if (time == 0) this._progress = 1;
        else {
            this._progress = (nowTime - startTime) / (time * 1000);
            this._progress = (this._progress > 1) ? 1 : this._progress;
        }
        return this._progress;
    }


    // ------------------------------------------
    //
    // Tween Propety
    //
    // ------------------------------------------

    /**
     * 目標とするX座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    x (value: number): Tween24 { return this._setPropety("x", value); }
    
    /**
     * 目標とするY座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    y (value: number): Tween24 { return this._setPropety("y", value); }
    
    /**
     * 目標とするXとY座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} x Y座標
     * @param {number} y Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    xy (x: number, y: number): Tween24 { return this._setPropety("x", x)._setPropety("y", y); }
    
    /**
     * 目標とする透明度を設定します。
     * 対象が HTMLElement の場合は、CSS:opacity が適用されます。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    alpha (value: number): Tween24 { return this._useStyle ? this._setStyle("opacity", value) : this._setPropety("alpha", value); }
    
    /**
     * 目標とする透明度を設定します。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    opacity (value: number): Tween24 { return this._useStyle ? this._setStyle("opacity", value) : this._setPropety("opacity", value); }

    /**
     * 目標とする水平スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleX (value: number): Tween24 { return this._setPropety("scaleX", value); }
    
    /**
     * 目標とする垂直スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleY (value: number): Tween24 { return this._setPropety("scaleY", value); }
    
    /**
     * 目標とするスケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平＆垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scale (value: number): Tween24 { return this._setPropety("scaleX", value)._setPropety("scaleY", value); }
    
    /**
     * 目標とする水平・垂直スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} scaleX 水平方向のスケール
     * @param {number} scaleY 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleXY (scaleX: number, scaleY: number): Tween24 { return this._setPropety("scaleX", scaleX)._setPropety("scaleY", scaleY); }
    
    /**
     * 目標とする水平傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewX (value: number): Tween24 { return this._setPropety("skewX", value); }
    
    /**
     * 目標とする垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewY (value: number): Tween24 { return this._setPropety("skewY", value); }
    
    /**
     * 目標とする水平＆垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平＆垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skew (value: number): Tween24 { return this._setPropety("skewX", value)._setPropety("skewY", value); }
    
    /**
     * 目標とする水平・垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} skewX 水平方向の傾斜
     * @param {number} skewY 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewXY (skewX: number, skewY: number): Tween24 { return this._setPropety("skewX", skewX)._setPropety("skewY", skewY); }
    
    /**
     * 目標とする回転角度を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 回転角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    rotation (value: number): Tween24 { return this._setPropety("rotation", value); }
    
    /**
     * CSS:top を設定します。
     * @param {number} 上からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    top (value: number): Tween24 { return this._setStyle("top", value); }
    
    /**
     * CSS:right を設定します。
     * @param {number} 右からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    right (value: number): Tween24 { return this._setStyle("right", value); }
    
    /**
     * CSS:bottom を設定します。
     * @param {number} value 下からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    bottom (value: number): Tween24 { return this._setStyle("bottom", value); }

    /**
     * CSS:left を設定します。
     * @param {number} value 左からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    left (value: number): Tween24 { return this._setStyle("left", value); }

    /**
     * 目標とする幅を設定します。
     * 対象が HTMLElement の場合は、CSS:width が適用されます。
     * @param {number} value 要素の幅
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    width (value: number): Tween24 { return this._useStyle ? this._setStyle("width", value) : this._setPropety("width", value); }

    /**
     * 目標とする高さを設定します。
     * 対象が HTMLElement の場合は、CSS:height が適用されます。
     * @param {number} value 要素の高さ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    height (value: number): Tween24 { return this._useStyle ? this._setStyle("height", value) : this._setPropety("height", value); }
    
    /**
     * CSS:color を設定します。
     * @param {string} colorCode 「#」から始まるカラー値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    color (colorCode: string): Tween24 { return this._setStyle("color", colorCode); }
    
    /**
     * CSS:background-color（背景色）を設定します。
     * @param {string} colorCode 「#」から始まるカラー値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundColor (colorCode: string): Tween24 { return this._setStyle("background-color", colorCode); }

    /**
     * CSS:border-width（枠の太さ）を設定します。
     * @param {number} value 枠の太さ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderWidth (value: number): Tween24 { return this._setStyle("border-width", value); }

    /**
     * CSS:border-color（枠の色）を設定します。
     * @param {number} value 「#」から始まるカラー値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderColor (value: number): Tween24 { return this._setStyle("border-color", value); }

    /**
     * CSS:border-radius（角丸）を設定します。
     * @param {number} value 角丸の値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderRadius (value: number): Tween24 { return this._setStyle("border-radius", value); }

    /**
     * トゥイーンの遅延時間を設定します。
     * @param {number} value 遅延時間（秒数）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    delay (value: number): Tween24 { this._delayTime += value; return this; }

    /**
     * 目標とするスタイルシートの値を設定します。
     * 対象が HTMLElement の場合にのみ適用されます。
     * @param {string} name プロパティ名
     * @param {(number|string)} value 目標の値（数値指定の場合は、基本的にpx単位で計算されます）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    style (name: string, value: number|string): Tween24 { return this._setStyle(name, value); }

    /**
     * トゥイーン毎のFPS（1秒間の更新回数）を設定します。
     * デフォルトでは0が設定され、ブラウザのリフレッシュレートに合わせて描画更新されます。
     * （※ 子以下のトゥイーンには設定できません。）
     * @param {number} fps FPSの値  
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    fps (fps:number): Tween24 { this.__fps = fps; return this; }

    /**
     * トゥイーンのデバッグモードを設定します。
     * デバッグモードをONにすると、トゥイーンの動作状況がコンソールに表示されます。
     * @param {boolean} flag デバッグモードを使用するか
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    debug (flag:boolean = true): Tween24 { this._debugMode = flag; return this; }

    /**
     * トゥイーンのIDを設定します。
     * @param {string} id トゥイーンのID
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    id (id:string): Tween24 { this._tweenId = id; return this; }

    private _setPropety(key:string, value:number):Tween24 {
        if (this._singleTarget) {
            if      (this._objectUpdater   ) this._objectUpdater   .addProp(key, value);
            else if (this._transformUpdater) this._transformUpdater.addProp(key, value);
        }
        else if (this._multiTarget) {
            if      (this._objectMultiUpdater   ) this._objectMultiUpdater   .addProp(key, value);
            else if (this._transformMultiUpdater) this._transformMultiUpdater.addProp(key, value);
        }
        return this;
    }

    private _setStyle(name: string, value: number|string):Tween24 {
        if (this._singleTarget) {
            if (!this._styleUpdater) {
                this._styleUpdater = new StyleUpdater(this._singleTarget);
                this._allUpdaters?.push(this._styleUpdater);
            }
            this._styleUpdater.addPropStr(name, value as string);
        }
        else if (this._multiTarget) {
            if (!this._styleMultiUpdater) {
                this._styleMultiUpdater = new MultiUpdater(this._multiTarget, StyleUpdater.className, null);
                this._allUpdaters?.push(this._styleMultiUpdater);
            }
            this._styleMultiUpdater.addPropStr(name, value as string);
        }
        return this;
    }

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
    onPlay (scope:any, func:Function, ...args:any[]): Tween24 { return this._setFunctionExecute(Tween24Event.PLAY, scope, func, args); }
    
    /**
     * トゥイーン開始時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onInit (scope:any, func:Function, ...args:any[]): Tween24 { return this._setFunctionExecute(Tween24Event.INIT, scope, func, args); }
    
    /**
     * トゥイーン実行中に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onUpdate (scope:any, func:Function, ...args:any[]): Tween24 { return this._setFunctionExecute(Tween24Event.UPDATE, scope, func, args); }
    
    /**
     * トゥイーンが一時停止した時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onPause (scope:any, func:Function, ...args:any[]): Tween24 { return this._setFunctionExecute(Tween24Event.PAUSE, scope, func, args); }

    /**
     * トゥイーンが一時停止中から、再開した時に実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onResume (scope:any, func:Function, ...args:any[]): Tween24 { return this._setFunctionExecute(Tween24Event.RESUME, scope, func, args); }

    /**
     * トゥイーンが停止された時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onStop (scope:any, func:Function, ...args:any[]): Tween24 { return this._setFunctionExecute(Tween24Event.STOP, scope, func, args); }
    
    /**
     * トゥイーンが完了した時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onComplete (scope:any, func:Function, ...args:any[]): Tween24 { return this._setFunctionExecute(Tween24Event.COMPLATE, scope, func, args); }

    private _setFunctionExecute(key:string, scope:any, func:Function, args:any[]):Tween24 {
        this._functionExecuters ||= {};
        this._functionExecuters[key] = new FunctionExecuter(scope, func, args);
        return this;
    }

    private _functionExecute(key:string) {
        if (this._functionExecuters) {
            this._functionExecuters[key]?.execute();
        }
    }


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
    static tween(target: any, time: number, easing: Function|null = null, params: { [key: string]: number } | null = null): Tween24 {
        return new Tween24()._createChildTween(Tween24._TYPE_TWEEN, target, time, easing, params);
    }

    /**
     * 速度を指定するトゥイーンを設定します。
     * 
     * このトゥイーンは、指定された速度とパラメータの変化量から時間を自動設定します。
     * 複数パラメータを変化させる場合、変化量の一番大きい値を基準にします。
     * x,y の座標系パラメータは、計算後の距離を変化量とします。
     * @static
     * @param {*} target 対象オブジェクト
     * @param {number} velocity 1秒間の変化量（速度）
     * @param {(Function|null)} [easing=null] イージング関数（デフォルト値：Ease24._Linear）
     * @param {({ [key: string]: number } | null)} [params=null] トゥイーンさせるパラメータ（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static tweenVelocity(target: any, velocity: number, easing: Function|null = null, params: { [key: string]: number } | null = null): Tween24 {
        return new Tween24()._createChildTween(Tween24._TYPE_TWEEN_VELOCITY, target, velocity, easing, params);
    }

    /**
     * プロパティを設定します。
     * @static
     * @param {*} target 対象オブジェクト
     * @param {({[key:string]:number}|null)} [params=null] 設定するパラメータ（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
    */
    static prop(target: any, params: { [key: string]: number } | null = null): Tween24 {
        return new Tween24()._createChildTween(Tween24._TYPE_PROP, target, 0, null, params);
    }

    /**
     * クエリで指定した要素直下のテキストを1文字ずつに分解し、それぞれにプロパティを設定します。
     * @static
     * @param {string} targetQuery 対象要素を指定するクエリ
     * @param {number} spacing 文字間の調整（px）
     * @param {boolean} [overflowHidden=false] overflow:hidden を設定するか
     * @param {boolean} [double=false] テキストを下側に複製するか
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static propText(targetQuery:string, spacing:number): Tween24 {
        return Tween24._tweenText(Tween24._TYPE_PROP_TEXT, targetQuery, 0, null, spacing);
    }

    /**
     * クエリで指定した要素直下のテキストを1文字ずつに分解し、それぞれにトゥイーンを設定します。
     * @static
     * @param {string} targetQuery 対象要素を指定するクエリ
     * @param {number} time 時間（秒）
     * @param {(Function|null)} [easing=null] イージング関数（デフォルト値：Ease24._Linear）
     * @param {number} spacing 文字間の調整（px）
     * @param {boolean} [overflowHidden=false] overflow:hidden を設定するか
     * @param {boolean} [double=false] テキストを下側に複製するか
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static tweenText(targetQuery:string, time:number, easing:Function|null = null, spacing:number = 0): Tween24 {
        return Tween24._tweenText(Tween24._TYPE_TWEEN_TEXT, targetQuery, time, easing, spacing);
    }

    /**
     * クエリで指定した要素直下のテキストを1文字ずつに分解し、それぞれに速度を指定するトゥイーンを設定します。
     * 
     * このトゥイーンは、指定された速度とパラメータの変化量から時間を自動設定します。
     * 複数パラメータを変化させる場合、変化量の一番大きい値を基準にします。
     * x,y の座標系パラメータは、計算後の距離を変化量とします。
     * @static
     * @param {string} targetQuery 対象要素を指定するクエリ
     * @param {number} velocity 1秒間の変化量（速度）
     * @param {(Function|null)} [easing=null] イージング関数（デフォルト値：Ease24._Linear）
     * @param {number} spacing 文字間の調整（px）
     * @param {boolean} [overflowHidden=false] overflow:hidden を設定するか
     * @param {boolean} [double=false] テキストを下側に複製するか
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static tweenTextVelocity(targetQuery:string, velocity:number, easing:Function|null = null, spacing:number = 0): Tween24 {
        return Tween24._tweenText(Tween24._TYPE_TWEEN_VELOCITY, targetQuery, velocity, easing, spacing);
    }

    private static _tweenText(type:string, targetQuery:string, timeOrVelocity:number, easing:Function|null = null, spacing:number):Tween24 {
        const targets:HTMLElement[] = HTMLUtil.querySelectorAll(targetQuery);
        const textElements:any[] = [];
        for (const target of targets) {
            const text:Text24|undefined = Text24.getInstance(target);
            if (text) {
                textElements.push(...text.targets);
            }
            else {
                const text:Text24 = new Text24(target, target.textContent || "", false, false);
                text.spacing = spacing;
                textElements.push(...text.targets);
            }
        }
        const tween:Tween24 = new Tween24()._createChildTween(type, textElements, timeOrVelocity, easing, null);
        tween._targetQuery = targetQuery + " span";
        return tween;
    }

    /**
     * トゥイーンを待機します。
     * @static
     * @param {number} time 待機時間（秒）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static wait(time: number): Tween24 {
        return new Tween24()._createChildTween(Tween24._TYPE_WAIT, null, time, null, null);
    }

    /**
     * 関数を実行します。
     * @static
     * @param {*} scope 関数が定義されているオブジェクト
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static func(scope: any, func: Function, ...args: any[]): Tween24 {
        return new Tween24()._createActionTween(Tween24._TYPE_FUNC, scope, func, args);
    }
    
    /**
     * console.log() を実行します。
     * @static
     * @param {...any[]} message コンソールに出力する内容
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static log(...message:any[]): Tween24 {
        return new Tween24()._createActionTween(Tween24._TYPE_FUNC, window, window.console.log, message);
    }

    /**
     * 順番に実行するトゥイーンを設定します。
     * @static
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static serial(...childTween: Tween24[]): Tween24 {
        return new Tween24()._createContainerTween(Tween24._TYPE_SERIAL, childTween);
    }

    /**
     * 並列に実行するトゥイーンを設定します。
     * @static
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static parallel(...childTween: Tween24[]): Tween24 {
        return new Tween24()._createContainerTween(Tween24._TYPE_PARALLEL, childTween);
    }

    /**
     * 子トゥイーンの対象が複数指定されていた場合、時差を設定します。
     * @static
     * @param {number} lagTime 対象毎の時差（秒数）
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static lag(lagTime:number, ...childTween: Tween24[]): Tween24 {
        return Tween24.lagSort(lagTime, Sort24._Normal, ...childTween);
    }

    /**
     * 子トゥイーンの対象が複数指定されていた場合、再生順をソートして時差を設定します。
     * @static
     * @param {number} lagTime 対象毎の時差（秒数）
     * @param {Function} sort 再生順をソートする関数
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static lagSort(lagTime:number, sort:Function, ...childTween: Tween24[]): Tween24 {
        const tweens:Tween24[] = [];
        for (const tween of childTween) {
            if (tween._multiTarget) {
                const targets:any[] = sort == Sort24._Normal ? tween._multiTarget : sort(tween._multiTarget);
                for (let i = 0; i < targets.length; i++) {
                    tweens.push(tween.__clone(targets[i], tween._targetQuery).delay(lagTime * i));
                }
            }
            else {
                tweens.push(tween);
            }
        }
        const tween:Tween24 = new Tween24()._createContainerTween(Tween24._TYPE_LAG, tweens);
        tween._lagTime = lagTime;
        tween._lagSort = sort;
        tween._originalChildTween = childTween;
        return tween;
    }

    /**
     * 子トゥイーンの対象が複数指定されていた場合、トータル時間を元に時差を設定します。
     * @static
     * @param {number} totalLagTime 時差のトータル時間（秒数）
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static lagTotal(totalLagTime:number, ...childTween: Tween24[]): Tween24 {
        return Tween24.lagTotalSortEase(totalLagTime, Sort24._Normal, Ease24._Linear, ...childTween);
    }

    /**
     * 子トゥイーンの対象が複数指定されていた場合、トータル時間を元にイージングをかけながら時差を設定します。
     * @static
     * @param {number} totalLagTime 時差のトータル時間（秒数）
     * @param {Function} easing 時差の時間量のイージング
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static lagTotalEase(totalLagTime:number, easing:Function, ...childTween: Tween24[]): Tween24 {
        return Tween24.lagTotalSortEase(totalLagTime, Sort24._Normal, easing, ...childTween);
    }

    /**
     * 子トゥイーンの対象が複数指定されていた場合、再生順をソートして、トータル時間を元に時差を設定します。
     * @static
     * @param {number} totalLagTime 時差のトータル時間（秒数）
     * @param {Function} sort 再生順をソートする関数
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static lagTotalSort(totalLagTime:number, sort:Function, ...childTween: Tween24[]): Tween24 {
        return Tween24.lagTotalSortEase(totalLagTime, sort, Ease24._Linear, ...childTween);
    }

    /**
     * 子トゥイーンの対象が複数指定されていた場合、再生順をソートして、トータル時間を元にイージングをかけながら時差を設定します。
     * @static
     * @param {number} totalLagTime 時差のトータル時間（秒数）
     * @param {Function} sort 再生順をソートする関数
     * @param {Function} easing 時差の時間量のイージング
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static lagTotalSortEase(totalLagTime:number, sort:Function, easing:Function, ...childTween: Tween24[]): Tween24 {
        const tweens:Tween24[] = [];
        for (const tween of childTween) {
            if (tween._multiTarget) {
                const targets:any[] = sort == Sort24._Normal ? tween._multiTarget : sort(tween._multiTarget);
                const numTarget:number = targets.length;
                for (let i = 0; i < numTarget; i++) {
                    const delay:number = easing((i + 1) / numTarget, 0, totalLagTime, 1);
                    tweens.push(tween.__clone(targets[i], tween._targetQuery).delay(delay));
                }
            }
            else {
                tweens.push(tween);
            }
        }
        const tween:Tween24 = new Tween24()._createContainerTween(Tween24._TYPE_LAG, tweens);
        tween._totalLagTime = totalLagTime;
        tween._lagSort = sort;
        tween._lagEasing = easing;
        tween._originalChildTween = childTween;
        return tween;
    }
    
    private _createChildTween(type:string, target:any, timeOrVelocity:number, easing:Function|null, params:{[key:string]:number}|null): Tween24 {
        this._type        = type;
        this._easing      = easing || Tween24._defaultEasing;
        this._delayTime   = 0;
        this._startTime   = 0;
        this._allUpdaters = [];
        this._isContainerTween = false;

        if (type == Tween24._TYPE_TWEEN_VELOCITY || type == Tween24._TYPE_TWEEN_TEXT_VELOCITY) {
            this._time = 0;
            this._velocity = timeOrVelocity;
        }
        else {
            this._time = timeOrVelocity;
        }

        this._createCommon();

        if (Array.isArray(target)) {
            if (ClassUtil.isString(target[0])) {
                this._useStyle = true;
                this._targetString = `[${target.toString()}]`;
                this._targetQuery = target.toString();
                this._multiTarget = [];
                for (const t of target)
                    this._multiTarget = this._multiTarget.concat(HTMLUtil.querySelectorAll(t));
                this._transformMultiUpdater = new MultiUpdater(this._multiTarget, TransformUpdater.className, null);
                this._allUpdaters.push(this._transformMultiUpdater);
            }
            else if (target[0] instanceof HTMLElement) {
                this._useStyle = true;
                this._targetString = `[HTMLElements]`;
                this._multiTarget = target;
                this._transformMultiUpdater = new MultiUpdater(this._multiTarget, TransformUpdater.className, null);
                this._allUpdaters.push(this._transformMultiUpdater);
            }
            else {
                this._multiTarget = target;
                this._objectMultiUpdater = new MultiUpdater(this._multiTarget, ObjectUpdater.className, null);
                this._allUpdaters.push(this._objectMultiUpdater);
            }
        }
        else if (ClassUtil.isString(target)) {
            this._targetQuery = target;
            const t = HTMLUtil.querySelectorAll(target);
            if (t.length <= 1) {
                this._singleTarget = t[0];
                this._transformUpdater = new TransformUpdater(this._singleTarget);
                this._allUpdaters.push(this._transformUpdater);
            }
            else {
                this._multiTarget = t;
                this._transformMultiUpdater = new MultiUpdater(this._multiTarget, TransformUpdater.className, null);
                this._allUpdaters.push(this._transformMultiUpdater);
            }
            this._useStyle = true;
            this._targetString = `${target}`;
        }
        else if (target instanceof HTMLElement) {
            this._useStyle = true;
            this._singleTarget = target;
            this._transformUpdater = new TransformUpdater(this._singleTarget);
            this._allUpdaters.push(this._transformUpdater);
        }
        else {
            this._singleTarget = target;
            this._objectUpdater = new ObjectUpdater(target);
            this._allUpdaters.push(this._objectUpdater);
        }

        if (params) {
            for (const key in params) {
                this._setPropety(key, params[key]);
            }
        }

        return this;
    }

    private _createContainerTween(type:string, childTween:Tween24[]): Tween24 {
        this._type       = type;
        this._time       = 0;
        this._delayTime  = 0;
        this._childTween = childTween;
        this._firstTween = this._childTween[0];
        this._playingChildTween   = [];
        this._numChildren         = childTween.length;
        this._numCompleteChildren = 0;
        this._isContainerTween    = true;

        this._createCommon();

        var prev = this._firstTween;
        var next;
        if (type == Tween24._TYPE_SERIAL) {
            for (var i = 0; i < this._numChildren; i++) {
                next = this._childTween[i + 1];
                prev._next = next;
                prev._parent = this;
                prev = next;
            }
        }
        else {
            for (const tween of this._childTween) {
                tween._parent = this;
            }
        }
        return this;
    }

    private _createActionTween(type:string, scope:any, func:Function, args:any[]) {
        this._type      = type;
        this._time      = 0;
        this._delayTime = 0;
        this._startTime = 0;
        this._isContainerTween = false;

        this._createCommon();

        switch (this._type) {
            case Tween24._TYPE_FUNC: this._setFunctionExecute(Tween24._TYPE_FUNC, scope, func, args);
        }
        return this;
    }

    private _createCommon() {
        this._serialNumber = ++ Tween24._numCreateTween;
    }


    // ------------------------------------------
    //
    // Util
    //
    // ------------------------------------------

    /**
     * トゥイーン全体のFPS（1秒間の更新回数）を設定します。
     * デフォルトでは0が設定され、ブラウザのリフレッシュレートに合わせて描画更新されます。
     * @static
     * @param {number} [fps=0] FPSの値
     * @memberof Tween24
     */
    static setFPS(fps:number = 0) {
        Tween24.ticker.fps = fps;
    }

    /**
     * デフォルトのイージングを設定します。
     * @static
     * @param {Function} [easing=Ease24._Linear] デフォルトのイージング
     * @memberof Tween24
     */
    static setDefaultEasing(easing:Function = Ease24._Linear) {
        Tween24._defaultEasing = easing;
    }

    /**
     * トゥイーン全体のデバッグモードを設定します。
     * デバッグモードをONにすると、トゥイーンの動作状況がコンソールに表示されます。
     * @static
     * @param {boolean} flag デバッグモードを使用するか
     * @memberof Tween24
     */
    static debugMode(flag:boolean) {
        Tween24._debugMode = flag;
    }

    __clone(base:any, baseQuery:string|null):Tween24 {
        let copy:Tween24 = new Tween24();
        let target:any;
        if (this._targetQuery && baseQuery) {
            for (const query of this._targetQuery.split(",")) {
                if (query == baseQuery) {
                    target = base;
                }
                else {
                    const reg:RegExp = new RegExp("^" + baseQuery + " ")
                    if (reg.test(this._targetQuery)) {
                        target = HTMLUtil.querySelectorAllWithBase(base, this._targetQuery.replace(reg, ""));
                    }
                    else {
                        target = this._singleTarget || this._multiTarget;
                    }
                }
            }
        }
        else {
            target = base;
        }
        switch (this._type) {
            case Tween24._TYPE_TWEEN :
            case Tween24._TYPE_TWEEN_VELOCITY :
            case Tween24._TYPE_TWEEN_TEXT :
            case Tween24._TYPE_TWEEN_TEXT_VELOCITY :
            case Tween24._TYPE_PROP :
            case Tween24._TYPE_PROP_TEXT :
                copy._createChildTween(this._type, target, this._velocity || this._time, this._easing, null);
                if (this._allUpdaters?.length) {
                    if (this._singleTarget && copy._multiTarget) {
                        for (const updater of this._allUpdaters) {
                            copy._allUpdaters?.push(new MultiUpdater(copy._multiTarget, null, updater));
                        }
                    }
                    else {
                        for (const updater of this._allUpdaters) {
                            copy._allUpdaters?.push(updater.clone(copy._singleTarget || copy._multiTarget));
                        }
                    }
                }
                break;
            case Tween24._TYPE_WAIT :
                copy._createChildTween(this._type, target, this._time, this._easing, null);
                break;
            case Tween24._TYPE_SERIAL   :
            case Tween24._TYPE_PARALLEL :
                const tweens:Tween24[] = [];
                if (this._childTween) {
                    for (const tween of this._childTween) {
                        tweens.push(tween.__clone(base, baseQuery));
                    }
                }
                copy._createContainerTween(this._type, tweens);
                break;
            case Tween24._TYPE_LAG:
                const lagTweens:Tween24[] = [];
                if (this._originalChildTween) {
                    for (const tween of this._originalChildTween) {
                        lagTweens.push(tween.__clone(base, baseQuery));
                    }
                }
                if (!isNaN(this._lagTime)) {
                    copy = Tween24.lagSort(this._lagTime, this._lagSort || Sort24._Normal, ...lagTweens);
                }
                else {
                    copy = Tween24.lagTotalSortEase(this._totalLagTime, this._lagSort || Sort24._Normal, this._lagEasing || Ease24._Linear, ...lagTweens);
                }
                break;
            case Tween24._TYPE_FUNC :
                copy._type = this._type;
                copy._time = copy._delayTime = copy._startTime = 0;
                copy._isContainerTween = false;
                break;
        }
        if (this._functionExecuters) {
            copy._functionExecuters = {};
            for (const key in this._functionExecuters) {
                copy._functionExecuters[key] = this._functionExecuters[key].clone();
            }
        }
        copy.delay(this._delayTime).fps(this.__fps).debug(this._debugMode);
        copy._targetQuery = this._targetQuery;
        return copy;
    }

    toString():string {
        return `Tween24 ${this.getTweenTypeString()} ${this.getTweenParamString()}`
    }

    private _debugLog(message:any) {
        if (Tween24._debugMode || this._debugMode || this._root?._debugMode || this._parent?._debugMode) {
            const margin:string = "  ".repeat(this._numLayers);
            console.log(`${margin}${this.getTweenTypeString()} ${message} ${this.getTweenParamString()}`);
        }
    }

    private getTweenTypeString():string {
        let type:string = "";
        type += this._parent ? `${this._parent._type}/` : "";
        type += this._type;
        return `[${type}]`;
    }

    private getTweenParamString():string {
        let param:string = "";
        param += this._targetString ? `target:${this._targetString}` : (`id:${this._tweenId || this._serialNumber}`);
        switch (this._type) {
            case Tween24._TYPE_TWEEN :
            case Tween24._TYPE_WAIT :
            case Tween24._TYPE_TWEEN_TEXT :
                param += " time:" + this._time + " "; break;
            case Tween24._TYPE_TWEEN_VELOCITY :
            case Tween24._TYPE_TWEEN_TEXT_VELOCITY :
                param += " velocity:" + this._velocity + " "; break;
        }
        if (this._delayTime) {
            param += " delay:" + this._delayTime + " ";
        }
        if (this._allUpdaters) {
            for (const updater of this._allUpdaters) {
                param += updater.toString() + " ";
            }
        }
        return `{${param.replace(/\s+/g," ").trim()}}`;
    }
}