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
import { StringUtil }       from "./utils/StringUtil";
import { Sort24 }           from "./index";
import { Text24 }           from "./utils/Text24";
import { Event24 }          from "./Event24";
import { ParamUpdater } from "./core/updaters/ParamUpdater";

export class Tween24 {

    // Static
    static readonly VERSION:string = "1.0.1";

    private static readonly _TYPE_TWEEN              :string = "tween";
    private static readonly _TYPE_TWEEN_VELOCITY     :string = "tween_velocity";
    private static readonly _TYPE_TWEEN_TEXT         :string = "tween_text";
    private static readonly _TYPE_TWEEN_TEXT_VELOCITY:string = "tween_text_velocity";
    private static readonly _TYPE_PROP               :string = "prop";
    private static readonly _TYPE_PROP_TEXT          :string = "prop_text";
    private static readonly _TYPE_WAIT               :string = "wait";
    private static readonly _TYPE_WAIT_EVENT         :string = "wait_event";
    private static readonly _TYPE_WAIT_EVENT_AND_FUNC:string = "wait_event_and_func";
    private static readonly _TYPE_SERIAL             :string = "serial";
    private static readonly _TYPE_PARALLEL           :string = "parallel";
    private static readonly _TYPE_LAG                :string = "lag";
    private static readonly _TYPE_LOOP               :string = "loop";
    private static readonly _TYPE_FUNC               :string = "func";
    private static readonly _TYPE_IF_CASE            :string = "if_case";
    private static readonly _TYPE_IF_CASE_BY_FUNC    :string = "if_case_by_func";

    static ticker:Ticker24;
    static ease  :Ease24;

    private static _playingTweens        :Tween24[];
    private static _manualPlayingTweens  :Tween24[];
    private static _playingTweensByTarget:Map<any, Tween24[]>;

    private static _tweensById     :Map<string, Tween24>;
    private static _tweensByGroupId:Map<string, Tween24[]>;

    private static _defaultEasing  :Function = Ease24._Linear;
    private static _debugMode      :boolean  = false;
    private static _numCreateTween :number   = 0;
    private static _globalTimeScale:number   = 1;

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

    private _timeScale          :number  = 1;
    private _delayTimeScale     :number  = 1;
    private _totalTimeScale     :number  = 1;
    private _totalDelayTimeScale:number  = 1;

    private _debugMode    :boolean     = false;
    private _numLayers    :number      = 0;
    private _serialNumber :number      = 0;
    private _tweenId      :string      = "";
    private _tweenGroupId :string      = "";
    private _targetString :string      = "";
    private _targetQuery  :string|null = null;
    private _useWillChange:boolean     = false;

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
    private _isDOM    :boolean = false;
    private _isRoot   :boolean = false;
    private _isManual :boolean = false;
    private _isTrigger:boolean = false;
    private _inited   :boolean = false;
    private _played   :boolean = false;
    private _paused   :boolean = false;
    private _skiped   :boolean = false;
    private _eventWaiting       :boolean = false;
    private _firstUpdated       :boolean = false;
    private _isContainerTween   :boolean = false;
    private _createdBasicUpdater:boolean = false;

    // Action & Callback
    private _functionExecuters:{[key:string]:FunctionExecuter}|null = null;

    // Container Tween
    private _firstTween        :Tween24  |null = null;
    private _childTween        :Tween24[]|null = null;
    private _playingChildTween :Tween24[]|null = null;
    private _originalChildTween:Tween24[]|null = null;

    private _numChildren        :number  = 0;
    private _numCompleteChildren:number  = 0;

    // Lag
    private _lagTime     :number = NaN;
    private _totalLagTime:number = NaN;
    private _lagSort     :Function|null = null;
    private _lagEasing   :Function|null = null;

    // Loop
    private _numLoops    :number = NaN;
    private _currentLoops:number = NaN;

    // If Case
    private _ifFunc    :Function|null = null;
    private _trueTween :Tween24 |null = null;
    private _falseTween:Tween24 |null = null;

    // Dispatch event
    private _dispatchEventTarget:any;
    private _dispatchEventType  :string|null = null;

    // Trigger & Jump
    private _triggered :boolean = false;
    private _jumped    :boolean = false;
    private _jumpProg  :number = NaN;
    
    // Tween FPS
    __fps:number = 0;
    __beforeTime:number = 0;

    constructor() {
        Tween24.ease   ||= new Ease24();
        Tween24.ticker ||= new Ticker24();

        Tween24._playingTweens         ||= [];
        Tween24._playingTweensByTarget ||= new Map<any, Tween24[]>();
    }


    // ------------------------------------------
    //
    // Tween control
    //
    // ------------------------------------------

    /**
     * トゥイーンを再生します。
     * @memberof Tween24
     */
    play = () => {
        this._commonRootPlay();
    }

    /**
     * トゥイーンを手動アップデート式で再生します。
     * 関数 manualUpdate() を実行すると更新されます。
     * @memberof Tween24
     */
    manualPlay = () => {
        Tween24._manualPlayingTweens ||= [];
        this._isManual = true;
        this._commonRootPlay();
    }

    private _commonRootPlay() {
        if (!this._paused) {
            if (!this._played) {
                this._root   = this;
                this._isRoot = true;
                this._inited = false;
                this._firstUpdated = false;
                this._play();
                if (!this._isManual) Tween24.ticker.add(this);
                else Tween24._manualPlayingTweens.push(this);
                this._functionExecute(Tween24Event.PLAY);
            }
        }
        else {
            this._resume();
            this._paused = false;
            if (!this._isManual) Tween24.ticker.add(this);
            else Tween24._manualPlayingTweens.push(this);
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

        // Time scale
        if (this._parent) {
            this._totalTimeScale      = this._timeScale      * this._parent._totalTimeScale;
            this._totalDelayTimeScale = this._delayTimeScale * this._parent._totalDelayTimeScale;
        }
        else {
            this._totalTimeScale      = this._timeScale * Tween24._globalTimeScale;
            this._totalDelayTimeScale = this._delayTimeScale;
        }

        // Start time
        this._startTime = Ticker24.getTime() + this._delayTime * this._totalDelayTimeScale * this._totalTimeScale * 1000;

        // Velocity
        if (this._type == Tween24._TYPE_TWEEN_VELOCITY || this._type == Tween24._TYPE_TWEEN_TEXT_VELOCITY) {
            const deltas:number[] = [0];
            if (this._allUpdaters?.length) {
                for (const updater of this._allUpdaters) {
                    updater.init(false);
                    deltas.push(updater.getMaxAbsDelta());
                }
            }
            this._time = Math.max(...deltas) / this._velocity;
        }
        
        Tween24._playingTweens.push(this);
        
        // Skip
        if (this._root?._skiped || this._parent?._skiped) this._skip();
        
        this._debugLog("play");
    }

    private _resume() {
        this._played = true;

        const nowTime:number = Ticker24.getTime();
        
        if (this._progress > 0) this._startTime = nowTime - this._time      * this._progress * this._totalTimeScale * 1000;
        else                    this._startTime = nowTime - this._delayTime * this._progress * this._totalTimeScale * this._totalDelayTimeScale * 1000;
        
        if (this._playingChildTween) {
            for (const tween of this._playingChildTween) {
                if (tween._playingChildTween) tween._resume();
                else {
                    if (tween._progress > 0) tween._startTime = nowTime - tween._time      * tween._progress * tween._totalTimeScale * 1000;
                    else                     tween._startTime = nowTime - tween._delayTime * tween._progress * tween._totalTimeScale * tween._totalDelayTimeScale * 1000;
                }
            }
        }
        Tween24._playingTweens.push(this);
    }

    /**
     * トゥイーンを一時停止します。
     * @memberof Tween24
     */
    pause = () => {
        if (this._isRoot) {
            this._played = false;
            this._paused = true;
            if (this._isManual) ArrayUtil.removeItemFromArray(Tween24._manualPlayingTweens, this);
            else Tween24.ticker.remove(this);
            ArrayUtil.removeItemFromArray(Tween24._playingTweens, this);
            this._functionExecute(Tween24Event.PAUSE);
        }
    }
    /**
     * トゥイーンを終点までスキップします。
     * @memberof Tween24
     */
    skip = () => {
        this._skip();
    }

    private _skip() {
        this._skiped = true;
        if (this._playingChildTween) {
            for (const tween of this._playingChildTween.concat()) {
                tween._skip();
            }
        }
        this.__update(0);
    }

    /**
     * トゥイーンを停止します。
     * @memberof Tween24
     */
    stop = () => {
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
        // Pseudo element setting
        if (this._isDOM && this._targetQuery && HTMLUtil.isPseudoQuery(this._targetQuery))
            HTMLUtil.setTweenElementQuery(this._singleTarget || this._multiTarget, this._targetQuery);

        // Updater init
        if (this._allUpdaters?.length) {
            for (const updater of this._allUpdaters) {
                updater.init(this._root?._useWillChange || this._parent?._useWillChange || this._useWillChange);
            }
        }
        
        // Overwrite
        if (this._singleTarget)
            this._overwrite(this._singleTarget);
        else if (this._multiTarget) {
            for (const target of this._multiTarget) {
                this._overwrite(target);
            }
        }
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

    private _setIfCaseTween(flag:boolean) {
        if (this._childTween) this._childTween.length = 0;
        else this._childTween = [];

        if (flag && this._trueTween)
            this._childTween = [this._trueTween];
        else if (this._falseTween)
            this._childTween = [this._falseTween];
        else
            this._childTween = [];
        
        this._numChildren = this._childTween.length;
    }

    manualUpdate = () => {
        this.__update(Ticker24.getTime());
    }

    public __update(nowTime:number) {
        this._updateProgress(this._time * this._totalTimeScale, this._startTime, nowTime);
        
        // Delay
        if (this._progress < 0) return;

        // Init
        if (!this._inited) {
            this._inited = true;
            this._initParam();
            this._functionExecute(Tween24Event.INIT);
        }

        // Container Tween
        if (this._isContainerTween) {
            if (this._firstUpdated == false) {
                this._firstUpdated = true;

                // If case
                if (this._type == Tween24._TYPE_IF_CASE_BY_FUNC) {
                    this._setIfCaseTween(this._ifFunc ? Boolean(this._ifFunc()) : false);
                }

                switch (this._type) {
                    case Tween24._TYPE_SERIAL:
                        if (this._firstTween) {
                            this._playingChildTween?.push(this._firstTween);
                            this._firstTween._play();
                        }
                        break;
                    case Tween24._TYPE_PARALLEL:
                    case Tween24._TYPE_LAG     :
                    case Tween24._TYPE_LOOP    :
                    case Tween24._TYPE_IF_CASE :
                    case Tween24._TYPE_IF_CASE_BY_FUNC :
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
                    tween.__update(nowTime);
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

            // Jump
            if (!Number.isNaN(this._jumpProg) && !this._jumped && this._progress >= this._jumpProg) {
                this._jumped = true;
                this._parent?._playNextTween(this);
            }

            // Complete
            if (this._progress >= 1) {
                // Wait event
                if ((this._type == Tween24._TYPE_WAIT_EVENT || this._type == Tween24._TYPE_WAIT_EVENT_AND_FUNC) && this._dispatchEventTarget && this._dispatchEventType) {
                    if (this._eventWaiting == false) {
                        this._eventWaiting = true;
                        
                        const waitHandler = () => {
                            this._eventWaiting = false;
                            if (this._dispatchEventType) Event24.remove(this._dispatchEventTarget, this._dispatchEventType);
    
                            // End
                            this._complete();
                        }
                        Event24.__addCallback(this._dispatchEventTarget, this._dispatchEventType, waitHandler);
                        
                        if (this._type == Tween24._TYPE_WAIT_EVENT_AND_FUNC)
                            this._functionExecute(Tween24._TYPE_WAIT_EVENT_AND_FUNC);
                    }
                }
                else {
                    // Func
                    if (this._type == Tween24._TYPE_FUNC) {
                        this._functionExecute(Tween24._TYPE_FUNC);
                    }
    
                    // End
                    this._complete();
                }
            }
        }
    }

    private _complete() {
        this._debugLog("complete");

        if (this._type == Tween24._TYPE_LOOP) {
            this._currentLoops ++;
            if (this._numLoops == 0 || this._numLoops > this._currentLoops) {
                this._numCompleteChildren = 0;
                this._play();
                return;
            }
        }

        if (this._parent) this._parent._completeChildTween(this);
        this._functionExecute(Tween24Event.COMPLATE);
        this._tweenStop();
    }

    private _tweenStop() {
        if (this._isRoot) Tween24.ticker.remove(this);
        if (this._playingChildTween) this._playingChildTween.length = 0;
        this._numCompleteChildren = 0;
        this._currentLoops = 0;
        this._played = false;
        this._inited = false;
        this._jumped = false;
        this._skiped = false;
        this._triggered = false;
        this._firstUpdated = false;
        
        ArrayUtil.removeItemFromArray(Tween24._playingTweensByTarget.get(this._singleTarget), this);
        ArrayUtil.removeItemFromArray(Tween24._playingTweens, this);

        if (this._isManual) ArrayUtil.removeItemFromArray(Tween24._manualPlayingTweens, this);
    }

    private _completeChildTween(tween:Tween24) {
        // this._debugLog("completeChildTween");
        this._numCompleteChildren ++;
        
        if (!this._triggered && tween._isTrigger) {
            if (this._parent) {
                this._triggered = true;
                this._parent._playNextTween(this);
            }
        }

        if (this._numChildren == this._numCompleteChildren) {
            this._complete();
        }
        else if (this._playingChildTween) {
            ArrayUtil.removeItemFromArray(this._playingChildTween, tween);
            if (!tween._triggered && !tween._jumped) {
                this._playNextTween(tween);
            }
        }
    }

    private _playNextTween(childTween:Tween24) {
        var next:Tween24|null = childTween._next;
        if (this._playingChildTween && next) {
            this._playingChildTween.push(next);
            next._play();
        }
    }

    private _updateProgress(time:number, startTime:number, nowTime:number): number {
        if (this._skiped) this._progress = 1;
        // else if (nowTime < startTime) this._progress = -1;
        else if (nowTime < startTime) this._progress = (nowTime - startTime) / (this._delayTime * 1000);
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
     * また、パーセント値で指定された場合は、囲みボックスの寸法に対する相対値が設定されます。
     * @param {number|string} value X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    x (value:number|string): Tween24 { return ClassUtil.isNumber(value) ? this._setPropety("x", parseFloat(value as string)) : this._setPropetyStr("x", value as string); }

    /**
     * 目標とするX座標を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    x$ (value:number): Tween24 { return this._setPropety("x", value, ParamUpdater.RELATIVE_AT_SETTING); }

    /**
     * 目標とするX座標を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    x$$ (value:number): Tween24 { return this._setPropety("x", value, ParamUpdater.RELATIVE_AT_RUNNING); }
    
    /**
     * 目標とするY座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * また、パーセント値で指定された場合は、囲みボックスの寸法に対する相対値が設定されます。
     * @param {number|string} value Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    y (value:number|string): Tween24 { return ClassUtil.isNumber(value) ? this._setPropety("y", parseFloat(value as string)) : this._setPropetyStr("y", value as string); }

    /**
     * 目標とするX座標を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    y$ (value:number): Tween24 { return this._set$Propety("y", value); }

    /**
     * 目標とするX座標を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    y$$ (value:number): Tween24 { return this._set$Propety("y", value); }

    /**
     * 目標とするXとY座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * また、パーセント値で指定された場合は、囲みボックスの寸法に対する相対値が設定されます。
     * @param {number|string} x X座標
     * @param {number|string} y Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    xy (x:number|string, y:number|string): Tween24 { return this.x(x).y(y); }

    /**
     * 目標とするXとY座標を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} x X座標
     * @param {number} y Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    xy$ (x:number, y:number): Tween24 { return this.x$(x).y$(y); }

    /**
     * 目標とするXとY座標を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} x X座標
     * @param {number} y Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    xy$$ (x:number, y:number): Tween24 { return this.x$$(x).y$$(y); }

    /**
     * 座標のトゥイーンにベジェ曲線を適応し、アンカーポイントを追加します。
     * @param {number} bezierX X座標のアンカーポイント
     * @param {number} bezierY Y座標のアンカーポイント
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    bezier(bezierX:number, bezierY:number): Tween24 {
        this._transformUpdater     ?.setBezier(bezierX, bezierY);
        this._transformMultiUpdater?.setBezier(bezierX, bezierY);
        this._objectUpdater        ?.setBezier(bezierX, bezierY);
        this._objectMultiUpdater   ?.setBezier(bezierX, bezierY);
        return this;
    }

    /**
     * 目標とする透明度を設定します。
     * 対象が HTMLElement の場合は、CSS:opacity が適用されます。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    alpha (value:number): Tween24 { return this._isDOM ? this._setStyle("opacity", value) : this._setPropety("alpha", value); }
    
    /**
     * 目標とする透明度を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:opacity が適用されます。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    alpha$ (value:number): Tween24 { return this._isDOM ? this._set$Style("opacity", value) : this._set$Propety("alpha", value); }
    
    /**
     * 目標とする透明度を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:opacity が適用されます。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    alpha$$ (value:number): Tween24 { return this._isDOM ? this._set$$Style("opacity", value) : this._set$$Propety("alpha", value); }
    
    /**
     * 目標とする透明度を設定します。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    opacity (value:number): Tween24 { return this._isDOM ? this._setStyle("opacity", value) : this._setPropety("opacity", value); }
    
    /**
     * 目標とする透明度を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    opacity$ (value:number): Tween24 { return this._isDOM ? this._set$Style("opacity", value) : this._set$Propety("opacity", value); }
    
    /**
     * 目標とする透明度を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    opacity$$ (value:number): Tween24 { return this._isDOM ? this._set$$Style("opacity", value) : this._set$$Propety("opacity", value); }

    /**
     * 目標とする水平スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleX (value:number): Tween24 { return this._setPropety("scaleX", value); }

    /**
     * 目標とする水平スケール、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleX$ (value:number): Tween24 { return this._set$Propety("scaleX", value); }
    
    /**
     * 目標とする水平スケール、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleX$$ (value:number): Tween24 { return this._set$$Propety("scaleX", value); }
    
    /**
     * 目標とする垂直スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleY (value:number): Tween24 { return this._setPropety("scaleY", value); }

    /**
     * 目標とする垂直スケールを、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleY$ (value:number): Tween24 { return this._set$Propety("scaleY", value); }

     /**
      * 目標とする垂直スケールを、トゥイーンが実行される直前の値の相対値で設定します。
      * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
      * @param {number} value 垂直方向のスケール
      * @return {Tween24} Tween24インスタンス
      * @memberof Tween24
      */
    scaleY$$ (value:number): Tween24 { return this._set$$Propety("scaleY", value); }
    
    /**
     * 目標とするスケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平＆垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scale (value:number): Tween24 { return this._setPropety("scaleX", value)._setPropety("scaleY", value); }
    
    /**
     * 目標とするスケールを、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平＆垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scale$ (value:number): Tween24 { return this._set$Propety("scaleX", value)._set$Propety("scaleY", value); }
    
    /**
     * 目標とするスケールを、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平＆垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scale$$ (value:number): Tween24 { return this._set$$Propety("scaleX", value)._set$$Propety("scaleY", value); }
    
    /**
     * 目標とする水平・垂直スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} scaleX 水平方向のスケール
     * @param {number} scaleY 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleXY (scaleX:number, scaleY:number): Tween24 { return this._setPropety("scaleX", scaleX)._setPropety("scaleY", scaleY); }
    
    /**
     * 目標とする水平・垂直スケールを、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} scaleX 水平方向のスケール
     * @param {number} scaleY 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleXY$ (scaleX:number, scaleY:number): Tween24 { return this._set$Propety("scaleX", scaleX)._set$Propety("scaleY", scaleY); }
    
    /**
     * 目標とする水平・垂直スケールを、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} scaleX 水平方向のスケール
     * @param {number} scaleY 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleXY$$ (scaleX:number, scaleY:number): Tween24 { return this._set$$Propety("scaleX", scaleX)._set$$Propety("scaleY", scaleY); }
    
    /**
     * 目標とする水平傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewX (value:number): Tween24 { return this._setPropety("skewX", value); }
    
    /**
     * 目標とする水平傾斜を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewX$ (value:number): Tween24 { return this._set$Propety("skewX", value); }
    
    /**
     * 目標とする水平傾斜を設定、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewX$$ (value:number): Tween24 { return this._set$$Propety("skewX", value); }
    
    /**
     * 目標とする垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewY (value:number): Tween24 { return this._setPropety("skewY", value); }
    
    /**
     * 目標とする垂直傾斜を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewY$ (value:number): Tween24 { return this._set$Propety("skewY", value); }
    
    /**
     * 目標とする垂直傾斜を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewY$$ (value:number): Tween24 { return this._set$$Propety("skewY", value); }
    
    /**
     * 目標とする水平＆垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平＆垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skew (value:number): Tween24 { return this._setPropety("skewX", value)._setPropety("skewY", value); }
    
    /**
     * 目標とする水平＆垂直傾斜を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平＆垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skew$ (value:number): Tween24 { return this._set$Propety("skewX", value)._set$Propety("skewY", value); }
    
    /**
     * 目標とする水平＆垂直傾斜を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平＆垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skew$$ (value:number): Tween24 { return this._set$$Propety("skewX", value)._set$$Propety("skewY", value); }
    
    /**
     * 目標とする水平・垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} skewX 水平方向の傾斜
     * @param {number} skewY 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewXY (skewX:number, skewY:number): Tween24 { return this._setPropety("skewX", skewX)._setPropety("skewY", skewY); }
    
    /**
     * 目標とする水平・垂直傾斜を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} skewX 水平方向の傾斜
     * @param {number} skewY 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewXY$ (skewX:number, skewY:number): Tween24 { return this._set$Propety("skewX", skewX)._set$Propety("skewY", skewY); }
    
    /**
     * 目標とする水平・垂直傾斜を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} skewX 水平方向の傾斜
     * @param {number} skewY 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewXY$$ (skewX:number, skewY:number): Tween24 { return this._set$$Propety("skewX", skewX)._set$$Propety("skewY", skewY); }
    
    /**
     * 目標とする回転角度を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 回転角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    rotation (value:number): Tween24 { return this._setPropety("rotation", value); }
    
    /**
     * 目標とする回転角度を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 回転角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    rotation$ (value:number): Tween24 { return this._set$Propety("rotation", value); }
    
    /**
     * 目標とする回転角度を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 回転角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    rotation$$ (value:number): Tween24 { return this._set$$Propety("rotation", value); }
    
    /**
     * CSS:Transform の基準点を設定します。
     * @param {number} x X方向の基準点
     * @param {number} y Y方向の基準点
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    transformOrigin (x:number|string, y:number|string): Tween24 { return this._setStyle("transform-origin", StringUtil.addUnit(x) + " " + StringUtil.addUnit(y)); }
    
    /**
     * 目標とする角度を設定します。
     * @param {number} value 角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    angle (value:number): Tween24 { return this._isDOM ? this._setStyle("rotation", value) : this._setPropety("angle", value); }
    
    /**
     * 目標とする角度を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number} value 角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    angle$ (value:number): Tween24 { return this._isDOM ? this._set$Style("rotation", value) : this._set$Propety("angle", value); }
    
    /**
     * 目標とする角度を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number} value 角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    angle$$ (value:number): Tween24 { return this._isDOM ? this._set$$Style("rotation", value) : this._set$$Propety("angle", value); }
    
    /**
     * CSS:top を設定します。
     * @param {number|string} 上からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    top (value:number|string): Tween24 { return this._setStyle("top", StringUtil.addUnit(value)); }
    
    /**
     * CSS:top を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number|string} 上からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    top$ (value:number|string): Tween24 { return this._set$Style("top", StringUtil.addUnit(value)); }
    
    /**
     * CSS:top を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number|string} 上からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    top$$ (value:number|string): Tween24 { return this._set$$Style("top", StringUtil.addUnit(value)); }
    
    /**
     * CSS:right を設定します。
     * @param {number|string} 右からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    right (value:number|string): Tween24 { return this._setStyle("right", StringUtil.addUnit(value)); }
    
    /**
     * CSS:right を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number|string} 右からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    right$ (value:number|string): Tween24 { return this._set$Style("right", StringUtil.addUnit(value)); }
    
    /**
     * CSS:right を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number|string} 右からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    right$$ (value:number|string): Tween24 { return this._set$$Style("right", StringUtil.addUnit(value)); }
    
    /**
     * CSS:bottom を設定します。
     * @param {number|string} value 下からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    bottom (value:number|string): Tween24 { return this._setStyle("bottom", StringUtil.addUnit(value)); }
    
    /**
     * CSS:bottom を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number|string} value 下からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    bottom$ (value:number|string): Tween24 { return this._set$Style("bottom", StringUtil.addUnit(value)); }
    
    /**
     * CSS:bottom を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number|string} value 下からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    bottom$$ (value:number|string): Tween24 { return this._set$$Style("bottom", StringUtil.addUnit(value)); }

    /**
     * CSS:left を設定します。
     * @param {number|string} value 左からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    left (value:number|string): Tween24 { return this._setStyle("left", StringUtil.addUnit(value)); }

    /**
     * CSS:left を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number|string} value 左からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    left$ (value:number|string): Tween24 { return this._set$Style("left", StringUtil.addUnit(value)); }

    /**
     * CSS:left を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number|string} value 左からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    left$$ (value:number|string): Tween24 { return this._set$$Style("left", StringUtil.addUnit(value)); }

    /**
     * 目標とする幅を設定します。
     * 対象が HTMLElement の場合は、CSS:width が適用されます。
     * @param {number|string} value 要素の幅
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    width (value:number|string): Tween24 { return this._isDOM ? this._setStyle("width", StringUtil.addUnit(value)) : this._setPropety("width", parseFloat(value as string)); }

    /**
     * 目標とする幅を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:width が適用されます。
     * @param {number|string} value 要素の幅
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    width$ (value:number|string): Tween24 { return this._isDOM ? this._set$Style("width", StringUtil.addUnit(value)) : this._set$Propety("width", parseFloat(value as string)); }

    /**
     * 目標とする幅を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:width が適用されます。
     * @param {number|string} value 要素の幅
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    width$$ (value:number|string): Tween24 { return this._isDOM ? this._set$$Style("width", StringUtil.addUnit(value)) : this._set$$Propety("width", parseFloat(value as string)); }

    /**
     * 目標とする高さを設定します。
     * 対象が HTMLElement の場合は、CSS:height が適用されます。
     * @param {number|string} value 要素の高さ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    height (value:number|string): Tween24 { return this._isDOM ? this._setStyle("height", StringUtil.addUnit(value)) : this._setPropety("height", parseFloat(value as string)); }

    /**
     * 目標とする高さを、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:height が適用されます。
     * @param {number|string} value 要素の高さ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    height$ (value:number|string): Tween24 { return this._isDOM ? this._set$Style("height", StringUtil.addUnit(value)) : this._set$Propety("height", parseFloat(value as string)); }

    /**
     * 目標とする高さを、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:height が適用されます。
     * @param {number|string} value 要素の高さ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    height$$ (value:number|string): Tween24 { return this._isDOM ? this._set$$Style("height", StringUtil.addUnit(value)) : this._set$$Propety("height", parseFloat(value as string)); }
    
    /**
     * CSS:color を設定します。
     * @param {string} colorCode 「#」「rgb()」フォーマットのカラー値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    color (colorCode:string): Tween24 { return this._setStyle("color", colorCode); }
    
    /**
     * CSS:background-color（背景色）を設定します。
     * @param {string} colorCode 「#」「rgb()」フォーマットのカラー値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundColor (colorCode:string): Tween24 { return this._setStyle("background-color", colorCode); }

    /**
     * CSS:background-position-x（背景X座標）を設定します。
     * @param {string} x 背景X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPositionX (x:number|string): Tween24 { return this._setStyle("background-position-x", StringUtil.addUnit(x)); }

    /**
     * CSS:background-position-x（背景X座標）を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {string} x 背景X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPositionX$ (x:number|string): Tween24 { return this._set$Style("background-position-x", StringUtil.addUnit(x)); }

    /**
     * CSS:background-position-x（背景X座標）を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {string} x 背景X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPositionX$$ (x:number|string): Tween24 { return this._set$$Style("background-position-x", StringUtil.addUnit(x)); }

    /**
     * CSS:background-position-y（背景Y座標）を設定します。
     * @param {string} y 背景Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPositionY (y:number|string): Tween24 { return this._setStyle("background-position-y", StringUtil.addUnit(y)); }

    /**
     * CSS:background-position-y（背景Y座標）を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {string} y 背景Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPositionY$ (y:number|string): Tween24 { return this._set$Style("background-position-y", StringUtil.addUnit(y)); }

    /**
     * CSS:background-position-y（背景Y座標）を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {string} y 背景Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPositionY$$ (y:number|string): Tween24 { return this._set$$Style("background-position-y", StringUtil.addUnit(y)); }

    /**
     * CSS:background-position（背景座標）を設定します。
     * @param {string} x 背景X座標
     * @param {string} y 背景Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPosition (x:number|string, y:number|string): Tween24 { return this.backgroundPositionX(x).backgroundPositionY(y); }

    /**
     * CSS:background-position（背景座標）を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {string} x 背景X座標
     * @param {string} y 背景Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPosition$ (x:number|string, y:number|string): Tween24 { return this.backgroundPositionX$(x).backgroundPositionY$(y); }

    /**
     * CSS:background-position（背景座標）を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {string} x 背景X座標
     * @param {string} y 背景Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPosition$$ (x:number|string, y:number|string): Tween24 { return this.backgroundPositionX$$(x).backgroundPositionY$$(y); }

    /**
     * CSS:border-width（枠の太さ）を設定します。
     * @param {number|string} value 枠の太さ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderWidth (value:number|string): Tween24 { return this._setStyle("border-width", StringUtil.addUnit(value)); }

    /**
     * CSS:border-width（枠の太さ）を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number|string} value 枠の太さ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderWidth$ (value:number|string): Tween24 { return this._set$Style("border-width", StringUtil.addUnit(value)); }

    /**
     * CSS:border-width（枠の太さ）を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number|string} value 枠の太さ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderWidth$$ (value:number|string): Tween24 { return this._set$$Style("border-width", StringUtil.addUnit(value)); }

    /**
     * CSS:border-color（枠の色）を設定します。
     * @param {number} colorCode 「#」「rgb()」フォーマットのカラー値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderColor (colorCode:string): Tween24 { return this._setStyle("border-color", colorCode); }

    /**
     * CSS:border-radius（角丸）を設定します。
     * @param {number|string} value 角丸の値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderRadius (value:number|string): Tween24 { return this._setStyle("border-radius", StringUtil.addUnit(value)); }

    /**
     * CSS:border-radius（角丸）を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number|string} value 角丸の値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderRadius$ (value:number|string): Tween24 { return this._set$Style("border-radius", StringUtil.addUnit(value)); }

    /**
     * CSS:border-radius（角丸）を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number|string} value 角丸の値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderRadius$$ (value:number|string): Tween24 { return this._set$$Style("border-radius", StringUtil.addUnit(value)); }

    /**
     * CSS:letter-spacing（字間）を設定します。
     * @param {number|string} value 字間
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    letterSpacing (value:number|string): Tween24 { return this._setStyle("letter-spacing", StringUtil.addUnit(value)); }

    /**
     * CSS:letter-spacing（字間）を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number|string} value 字間
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    letterSpacing$ (value:number|string): Tween24 { return this._set$Style("letter-spacing", StringUtil.addUnit(value)); }

    /**
     * CSS:letter-spacing（字間）を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number|string} value 字間
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    letterSpacing$$ (value:number|string): Tween24 { return this._set$$Style("letter-spacing", StringUtil.addUnit(value)); }

    /**
     * トゥイーンの遅延時間を設定します。
     * @param {number} value 遅延時間（秒数）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    delay (value:number): Tween24 { this._delayTime += value; return this; }


    /**
     * トゥイーンの時間（delayの遅延時間を含む）の尺度を設定します。
     * @param {number} value 時間の尺度（割合）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    timeScale (value:number): Tween24 { this._timeScale = value; return this; }


    /**
     * トゥイーンの遅延時間の尺度を設定します。
     * @param {number} value 遅延時間の尺度（割合）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    delayScale (value:number): Tween24 { this._delayTimeScale = value; return this; }

    /**
     * 目標とするスタイルシートの値を設定します。
     * 対象が HTMLElement の場合にのみ適用されます。
     * @param {string} name プロパティ名
     * @param {(number|string)} value 目標の値（数値指定の場合は、基本的にpx単位で計算されます）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    style (name:string, value: number|string): Tween24 { return this._setStyle(name, value); }

    /**
     * 目標とするスタイルシートの値を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合にのみ適用されます。
     * @param {string} name プロパティ名
     * @param {(number|string)} value 目標の値（数値指定の場合は、基本的にpx単位で計算されます）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    style$ (name:string, value: number|string): Tween24 { return this._set$Style(name, value); }

    /**
     * 目標とするスタイルシートの値を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合にのみ適用されます。
     * @param {string} name プロパティ名
     * @param {(number|string)} value 目標の値（数値指定の場合は、基本的にpx単位で計算されます）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    style$$ (name:string, value: number|string): Tween24 { return this._set$$Style(name, value); }

    /**
     * トゥイーン実行時に willChange を有効にするか設定します。
     * 有効にすると強力な最適化をブラウザーが行い、アニメーションが滑らかになります。
     * 対象が HTMLElement の場合にのみ適用されます。
     * @param {boolean} [use=true] willChange を有効にするか
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    willChange (use:boolean = true): Tween24 { this._useWillChange = use; return this; }

    /**
     * ポインターイベントの有効・無効を設定します。
     * true の場合は"auto", false の場合は "none" が設定されます。
     * @param {boolean} enable ポインターイベントを有効にするか
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    pointerEvents (enable:boolean): Tween24 { return this._setStyle("pointer-events", enable ? "auto" : "none"); }

    /**
     * 子トゥイーンの完了トリガーに設定します。
     * 設定したトゥイーンが完了したら、親トゥイーンが次のトゥイーンへ移行します。
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    trigger():Tween24  { this._isTrigger = true; return this; }

    /**
     * トゥイーンの途中で、次のトゥイーンへ移行します。
     * @param {number} progress 移行させる進捗率
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    jump(progress:number):Tween24  { this._jumpProg = progress; return this; }

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

    private _setPropety(key:string, value:number, option:string|null = null):Tween24 {
        this.createBasicUpdater();

        if (this._singleTarget) {
            if      (this._objectUpdater   ) this._objectUpdater   .addProp(key, value, option);
            else if (this._transformUpdater) this._transformUpdater.addProp(key, value, option);
        }
        else if (this._multiTarget) {
            if      (this._objectMultiUpdater   ) this._objectMultiUpdater   .addProp(key, value, option);
            else if (this._transformMultiUpdater) this._transformMultiUpdater.addProp(key, value, option);
        }
        return this;
    }

    private _set$Propety(key:string, value:number):Tween24 {
        return this._setPropety(key, value, ParamUpdater.RELATIVE_AT_SETTING);
    }

    private _set$$Propety(key:string, value:number):Tween24 {
        return this._setPropety(key, value, ParamUpdater.RELATIVE_AT_RUNNING);
    }

    private _setPropetyStr(key:string, value:string):Tween24 {
        this.createBasicUpdater();

        if (this._singleTarget) {
            if (this._transformUpdater) this._transformUpdater.addPropStr(key, value);
        }
        else if (this._multiTarget) {
            if (this._transformMultiUpdater) this._transformMultiUpdater.addPropStr(key, value);
        }
        return this;
    }

    private _setStyle(name: string, value: number|string, option:string|null = null):Tween24 {
        name = StringUtil.toKebab(name);

        if (this._singleTarget) {
            if (!this._styleUpdater) {
                this._styleUpdater = new StyleUpdater(this._singleTarget, this._targetQuery);
                this._allUpdaters?.push(this._styleUpdater);
            }
            this._styleUpdater.addPropStr(name, value as string, option);
        }
        else if (this._multiTarget) {
            if (!this._styleMultiUpdater) {
                this._styleMultiUpdater = new MultiUpdater(this._multiTarget, this._targetQuery).setupByType(StyleUpdater.className);
                this._allUpdaters?.push(this._styleMultiUpdater);
            }
            this._styleMultiUpdater.addPropStr(name, value as string, option);
        }
        return this;
    }

    private _set$Style(name: string, value: number|string):Tween24 {
        return this._setStyle(name, value, ParamUpdater.RELATIVE_AT_SETTING);
    }

    private _set$$Style(name: string, value: number|string):Tween24 {
        return this._setStyle(name, value, ParamUpdater.RELATIVE_AT_RUNNING);
    }
    
    private createBasicUpdater() {
        if (this._createdBasicUpdater) return;
        this._createdBasicUpdater = true;

        let updater:Updater|null = null;
        if (this._isDOM) {
            if      (this._singleTarget) updater = this._transformUpdater      ||=  new TransformUpdater(this._singleTarget, this._targetQuery);
            else if (this._multiTarget ) updater = this._transformMultiUpdater ||=  new MultiUpdater    (this._multiTarget , this._targetQuery).setupByType(TransformUpdater.className);
        }
        else {
            if      (this._singleTarget) updater = this._objectUpdater      ||=  new ObjectUpdater(this._singleTarget);
            else if (this._multiTarget ) updater = this._objectMultiUpdater ||=  new MultiUpdater (this._multiTarget, this._targetQuery).setupByType(ObjectUpdater.className);
        }
        if (updater) this._allUpdaters?.push(updater);
    }

    // ------------------------------------------
    //
    // Tween Callback
    //
    // ------------------------------------------

    /**
     * トゥイーン再生時に、実行する関数を設定します。
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onPlay (func:Function, ...args:any[]): Tween24 { return this._setFunctionExecute(Tween24Event.PLAY, func, func, args); }
    
    /**
     * トゥイーン開始時に、実行する関数を設定します。
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onInit (func:Function, ...args:any[]): Tween24 { return this._setFunctionExecute(Tween24Event.INIT, func, func, args); }
    
    /**
     * トゥイーン実行中に、実行する関数を設定します。
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onUpdate (func:Function, ...args:any[]): Tween24 { return this._setFunctionExecute(Tween24Event.UPDATE, func, func, args); }
    
    /**
     * トゥイーンが一時停止した時に、実行する関数を設定します。
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onPause (func:Function, ...args:any[]): Tween24 { return this._setFunctionExecute(Tween24Event.PAUSE, func, func, args); }

    /**
     * トゥイーンが一時停止中から、再開した時に実行する関数を設定します。
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onResume (func:Function, ...args:any[]): Tween24 { return this._setFunctionExecute(Tween24Event.RESUME, func, func, args); }

    /**
     * トゥイーンが停止された時に、実行する関数を設定します。
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onStop (func:Function, ...args:any[]): Tween24 { return this._setFunctionExecute(Tween24Event.STOP, func, func, args); }
    
    /**
     * トゥイーンが完了した時に、実行する関数を設定します。
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onComplete (func:Function, ...args:any[]): Tween24 { return this._setFunctionExecute(Tween24Event.COMPLATE, func, func, args); }

    private _setFunctionExecute(key:string, scope:any, func:Function, args:any[]|null):Tween24 {
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
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static propText(targetQuery:string): Tween24 {
        return Tween24._tweenText(Tween24._TYPE_PROP_TEXT, targetQuery, 0, null);
    }

    /**
     * クエリで指定した要素直下のテキストを1文字ずつに分解し、それぞれにトゥイーンを設定します。
     * @static
     * @param {string} targetQuery 対象要素を指定するクエリ
     * @param {number} time 時間（秒）
     * @param {(Function|null)} [easing=null] イージング関数（デフォルト値：Ease24._Linear）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static tweenText(targetQuery:string, time:number, easing:Function|null = null): Tween24 {
        return Tween24._tweenText(Tween24._TYPE_TWEEN_TEXT, targetQuery, time, easing);
    }
    
    /**
     * 1文字ずつに分解したテキストを、元に戻します。
     * @static
     * @param {string} targetQuery 対象要素を指定するクエリ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static resetText(targetQuery:string): Tween24 {
        return Tween24.func(Text24.removeByTarget, targetQuery);
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
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static tweenTextVelocity(targetQuery:string, velocity:number, easing:Function|null = null): Tween24 {
        return Tween24._tweenText(Tween24._TYPE_TWEEN_VELOCITY, targetQuery, velocity, easing);
    }

    private static _tweenText(type:string, targetQuery:string, timeOrVelocity:number, easing:Function|null = null):Tween24 {
        const targets:HTMLElement[] = HTMLUtil.querySelectorAll(targetQuery);
        const textElements:any[] = [];
        for (const target of targets) {
            const text:Text24|undefined = Text24.getInstance(target);
            if (text) {
                textElements.push(...text.targets);
            }
            else {
                const text:Text24 = new Text24(target, target.textContent?.trim() || "", false, false);
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
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static func(func: Function, ...args: any[]): Tween24 {
        return new Tween24()._createActionTween(Tween24._TYPE_FUNC)._setFunctionExecute(Tween24._TYPE_FUNC, func, func, args);
    }

    /**
     * イベントを受け取るまで、待機します。
     * @static
     * @param {*} target イベントを受け取る対象
     * @param {string} type 受け取るイベントタイプ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static waitEvent(target:any, type:string): Tween24 {
        return new Tween24()._createActionTween(Tween24._TYPE_WAIT_EVENT)._setWaitEvent(target, type);
    }

    /**
     * 指定した関数を実行し、イベントを受け取るまで待機します。
     * @static
     * @param {*} target イベントを受け取る対象
     * @param {string} type 受け取るイベントタイプ
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static waitEventAndFunc(target:any, type:string, func:Function, ...args:any[]): Tween24 {
        return new Tween24()._createActionTween(Tween24._TYPE_WAIT_EVENT_AND_FUNC)._setWaitEvent(target, type)._setFunctionExecute(Tween24._TYPE_WAIT_EVENT_AND_FUNC, func, func, args);
    }

    private _setWaitEvent(target:any, type:string):Tween24 {
        this._dispatchEventTarget = target;
        this._dispatchEventType   = type;
        return this;
    }
    
    /**
     * console.log() を実行します。
     * @static
     * @param {...any[]} message コンソールに出力する内容
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static log(...message:any[]): Tween24 {
        return new Tween24()._createActionTween(Tween24._TYPE_FUNC)._setFunctionExecute(Tween24._TYPE_FUNC, window, window.console.log, message);
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
                    const t = targets[i];
                    tweens.push(tween.__clone(t, tween._targetQuery).delay(lagTime * i));
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

    /**
     * 繰り返し再生させるトゥイーンを設定します。
     * ループ回数に「0」を指定すると、無制限に繰り返します。
     * @static
     * @param {number} numLoops ループさせる回数
     * @param {Tween24} tween ループさせるトゥイーン
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static loop(numLoops:number, tween:Tween24):Tween24 {
        const loopTween:Tween24 = new Tween24()._createContainerTween(Tween24._TYPE_LOOP, [tween]);
        loopTween._numLoops = numLoops;
        loopTween._currentLoops = 0;
        return loopTween;
    }

    /**
     * フラグに応じて再生するトゥイーンを設定します。
     * フラグにboolean値を渡した場合はトゥイーン作成時に判定し、boolean値を返す関数を渡した場合はトゥイーン実行毎に判定します。
     * @static
     * @param {boolean|(()=>boolean)} flag boolean値か、boolean値を返す関数
     * @param {Tween24} trueTween フラグが true の時に再生するトゥイーン
     * @param {(Tween24|null)} [falseTween=null] フラグが false の時に再生するトゥイーン
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static ifCase(flag:boolean|(()=>boolean), trueTween:Tween24, falseTween:Tween24|null = null):Tween24 {
        let tween;
        if (typeof(flag) == "function") {
            tween = new Tween24()._createContainerTween(Tween24._TYPE_IF_CASE_BY_FUNC, falseTween ? [trueTween, falseTween] : [trueTween]);
            tween._ifFunc = flag;
        }
        else {
            tween = new Tween24()._createContainerTween(Tween24._TYPE_IF_CASE, flag ? [trueTween]: falseTween ? [falseTween]: []);
        }
        tween._trueTween  = trueTween;
        tween._falseTween = falseTween;
        return tween;
    }

    /**
     * トゥイーン実行時に boolean 値を返す関数を実行し、再生するトゥイーンを設定します。
     * @static
     * @param {()=>boolean} func boolean値を返す関数
     * @param {Tween24} trueTween フラグが true の時に再生するトゥイーン
     * @param {(Tween24|null)} [falseTween=null] フラグが false の時に再生するトゥイーン
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    // static ifCaseByFunc(func:()=>boolean, trueTween:Tween24, falseTween:Tween24|null = null):Tween24 {
    //     const childTween  = falseTween ? [trueTween, falseTween] : [trueTween]; 
    //     const tween       = new Tween24()._createContainerTween(Tween24._TYPE_IF_CASE_BY_FUNC, childTween);
    //     tween._ifFunc     = func;
    //     tween._trueTween  = trueTween;
    //     tween._falseTween = falseTween;
    //     return tween;
    // }
    
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

        this._commonProcess();

        if (Array.isArray(target)) {
            if (ClassUtil.isString(target[0])) {
                this._targetString = `[${target.toString()}]`;
                this._warningLog("Does not support array type queries.");
            }
            else if (target[0] instanceof HTMLElement) {
                this._isDOM = true;
                this._targetString = `[HTMLElements]`;
                this._multiTarget = target;
            }
            else {
                this._multiTarget = target;
            }
        }
        else if (ClassUtil.isString(target)) {
            this._isDOM = true;
            this._targetString = `${target}`;
            this._targetQuery = target;
            const t = HTMLUtil.querySelectorAll(target);
            if (t.length <= 1) {
                this._singleTarget = t[0];
            }
            else {
                this._multiTarget = t;
            }
        }
        else if (target instanceof HTMLElement) {
            this._isDOM = true;
            this._singleTarget = target;
        }
        else {
            this._singleTarget = target;
        }

        if (params) {
            for (const key in params) {
                // count $ length
                const key2 = key.replace(/[$]{1,2}$/, "");
                switch(key.length - key2.length) {
                    case 0: this._setPropety  (key2, params[key]); break;
                    case 1: this._set$Propety (key2, params[key]); break;
                    case 2: this._set$$Propety(key2, params[key]); break;
                }
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

        this._commonProcess();

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

    private _createActionTween(type:string) {
        this._type      = type;
        this._time      = 0;
        this._delayTime = 0;
        this._startTime = 0;
        this._isContainerTween = false;
        this._commonProcess();
        return this;
    }

    private _commonProcess() {
        this._serialNumber = ++ Tween24._numCreateTween;
    }
    


    // ------------------------------------------
    //
    // Tween control by ID and Group
    //
    // ------------------------------------------

    /**
     * トゥイーンのIDを設定します。
     * @param {string} id トゥイーンのID
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    id (id:string): Tween24 { return this._setTweenId(id); }

    /**
     * 指定したIDのトゥイーンの play() を実行します。
     * @static
     * @param {string} id トゥイーンのID
     * @memberof Tween24
     */
    static playById = (id:string) => { Tween24._controlTweens(Tween24._getTweensById(id), Tween24Event.PLAY); }

    /**
     * 指定したIDのトゥイーンの manualPlay() を実行します。
     * @static
     * @param {string} id トゥイーンのID
     * @memberof Tween24
     */
    static manualPlayById = (id:string) => { Tween24._controlTweens(Tween24._getTweensById(id), Tween24Event.MANUAL_PLAY); }
    
    /**
     * 指定したIDのトゥイーンの pause() を実行します。
     * @static
     * @param {string} id トゥイーンのID
     * @memberof Tween24
     */
    static pauseById = (id:string) => { Tween24._controlTweens(Tween24._getTweensById(id), Tween24Event.PAUSE); }
    
    /**
     * 指定したIDのトゥイーンの skip() を実行します。
     * @static
     * @param {string} id トゥイーンのID
     * @memberof Tween24
     */
    static skipById = (id:string) => { Tween24._controlTweens(Tween24._getTweensById(id), Tween24Event.SKIP); }
    
    /**
     * 指定したIDのトゥイーンの stop() を実行します。
     * @static
     * @param {string} id トゥイーンのID
     * @memberof Tween24
     */
    static stopById = (id:string) => { Tween24._controlTweens(Tween24._getTweensById(id), Tween24Event.STOP); }
    
    /**
     * トゥイーンのグループIDを設定します。
     * @param {string} groupId トゥイーンのグループID
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    groupId (groupId:string): Tween24 { return this._setTweenGroupId(groupId); }

    /**
     * 指定したグループIDのトゥイーンの play() を実行します。
     * @static
     * @param {string} groupId トゥイーンのID
     * @memberof Tween24
     */
    static playByGroupId = (groupId:string) => { Tween24._controlTweens(Tween24._getTweensByGroupId(groupId), Tween24Event.PLAY); }

    /**
     * 指定したグループIDのトゥイーンの manualPlay() を実行します。
     * @static
     * @param {string} groupId トゥイーンのID
     * @memberof Tween24
     */
    static manualPlayByGroupId = (groupId:string) => { Tween24._controlTweens(Tween24._getTweensByGroupId(groupId), Tween24Event.MANUAL_PLAY); }

    /**
     * 指定したグループIDのトゥイーンの pause() を実行します。
     * @static
     * @param {string} groupId トゥイーンのID
     * @memberof Tween24
     */
    static pauseByGroupId = (groupId:string) => { Tween24._controlTweens(Tween24._getTweensByGroupId(groupId), Tween24Event.PAUSE); }

    /**
     * 指定したグループIDのトゥイーンの skip() を実行します。
     * @static
     * @param {string} groupId トゥイーンのID
     * @memberof Tween24
     */
    static skipByGroupId = (groupId:string) => { Tween24._controlTweens(Tween24._getTweensByGroupId(groupId), Tween24Event.SKIP); }

    /**
     * 指定したグループIDのトゥイーンの stop() を実行します。
     * @static
     * @param {string} groupId トゥイーンのID
     * @memberof Tween24
     */
    static stopByGroupId = (groupId:string) => { Tween24._controlTweens(Tween24._getTweensByGroupId(groupId), Tween24Event.STOP); }

    private _setTweenId(id:string): Tween24 {
        this._tweenId = id;
        Tween24._tweensById ||= new Map<string, Tween24>();
        Tween24._tweensById.set(id, this);
        return this;
    }

    private _setTweenGroupId(groupId:string): Tween24 {
        this._tweenGroupId = groupId;
        Tween24._tweensByGroupId ||= new Map<string, Tween24[]>();
        const groupTweens = Tween24._tweensByGroupId.get(groupId) || [];
        groupTweens.push(this);
        Tween24._tweensByGroupId.set(groupId, groupTweens);
        return this;
    }

    private static _getTweensById(id:string): Tween24[]|undefined { const tween = Tween24._tweensById?.get(id); return tween ? [tween] : undefined; }

    private static _getTweensByGroupId(groupId:string): Tween24[]|undefined { return Tween24._tweensByGroupId?.get(groupId); }

    private static _controlTweens(tweens:Tween24[]|undefined, event:string) {
        if (tweens) {
            switch (event) {
                case Tween24Event.PLAY        : tweens.forEach((tween) => { tween.play();       }); break;
                case Tween24Event.MANUAL_PLAY : tweens.forEach((tween) => { tween.manualPlay(); }); break;
                case Tween24Event.PAUSE       : tweens.forEach((tween) => { tween.pause();      }); break;
                case Tween24Event.SKIP        : tweens.forEach((tween) => { tween.skip();       }); break;
                case Tween24Event.STOP        : tweens.forEach((tween) => { tween.stop();       }); break;
            }
        }
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
    static setFPS = (fps:number = 0) => {
        Tween24.ticker.fps = fps;
    }

    /**
     * デフォルトのイージングを設定します。
     * @static
     * @param {Function} [easing=Ease24._Linear] デフォルトのイージング
     * @memberof Tween24
     */
    static setDefaultEasing = (easing:Function = Ease24._Linear) => {
        Tween24._defaultEasing = easing;
    }

    /**
     * トゥイーン全体のデバッグモードを設定します。
     * デバッグモードをONにすると、トゥイーンの動作状況がコンソールに表示されます。
     * @static
     * @param {boolean} flag デバッグモードを使用するか
     * @memberof Tween24
     */
    static debugMode = (flag:boolean) => {
        Tween24._debugMode = flag;
    }

    /**
     * すべてのトゥイーンの、時間（delayの遅延時間を含む）の尺度（割合）を設定します。
     * @static
     * @param {number} timeScale 時間の尺度
     * @memberof Tween24
     */
    static setGlobalTimeScale = (timeScale:number) => {
        Tween24._globalTimeScale = timeScale;
    }

    /**
     * manualPlay() されているトゥイーンを、すべてアップデートします。
     * @static
     * @memberof Tween24
     */
    static manualAllUpdate = () => {
        const nowTime = Ticker24.getTime();
        for (const tween of Tween24._manualPlayingTweens) {
            tween.__update(nowTime);
        }
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
                copy._targetQuery = this._targetQuery;
                if (this._allUpdaters?.length) {
                    if (this._singleTarget && copy._multiTarget) {
                        for (const updater of this._allUpdaters) {
                            copy._allUpdaters?.push(new MultiUpdater(copy._multiTarget, this._targetQuery).setupByUpdater(updater));
                        }
                    }
                    else {
                        for (const updater of this._allUpdaters) {
                            copy._allUpdaters?.push(updater.clone(copy._singleTarget || copy._multiTarget, this._targetQuery));
                        }
                    }
                }
                break;
            case Tween24._TYPE_WAIT :
                copy._createChildTween(this._type, target, this._time, this._easing, null);
                break;
            case Tween24._TYPE_SERIAL   :
            case Tween24._TYPE_PARALLEL :
            case Tween24._TYPE_LOOP     :
                const tweens:Tween24[] = [];
                if (this._childTween) {
                    for (const tween of this._childTween) {
                        tweens.push(tween.__clone(base, baseQuery));
                    }
                }
                copy._createContainerTween(this._type, tweens);
                copy._numLoops = this._numLoops;
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
        copy.willChange(this._useWillChange);
        copy.delay(this._delayTime).fps(this.__fps).debug(this._debugMode).timeScale(this._timeScale).delayScale(this._delayTimeScale);
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

    private _warningLog(message:string):void {
        console.log(`Tween24 Warning: ${message}\n - ${this.toString()}`);
    }

    private getTweenTypeString():string {
        let type:string = "";
        type += this._parent ? `${this._parent._type}/` : "";
        type += this._type;
        return `[${type}]`;
    }

    private getTweenParamString():string {
        let param:string = "";
        param += this._targetString ? `target:${this._targetString} ` : (`id:${this._tweenId || this._serialNumber} `);
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
        if (this._delayTimeScale != 1) {
            param += " delayScale:" + this._delayTimeScale + " ";
        }
        if (this._timeScale != 1) {
            param += " timeScale:" + this._timeScale + " ";
        }
        if (this._allUpdaters) {
            for (const updater of this._allUpdaters) {
                param += updater.toString() + " ";
            }
        }
        return `{${param.replace(/\s+/g," ").trim()}}`;
    }

    get isPaused():boolean {
        return this._paused;
    }
}