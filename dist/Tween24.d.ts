import { Ticker24 } from "./core/Ticker24";
import { Ease24 } from "./Ease24";
export declare class Tween24 {
    static readonly VERSION: string;
    private static readonly _TYPE_TWEEN;
    private static readonly _TYPE_TWEEN_VELOCITY;
    private static readonly _TYPE_TWEEN_TEXT;
    private static readonly _TYPE_TWEEN_TEXT_VELOCITY;
    private static readonly _TYPE_PROP;
    private static readonly _TYPE_PROP_TEXT;
    private static readonly _TYPE_WAIT;
    private static readonly _TYPE_WAIT_EVENT;
    private static readonly _TYPE_WAIT_EVENT_AND_FUNC;
    private static readonly _TYPE_SERIAL;
    private static readonly _TYPE_PARALLEL;
    private static readonly _TYPE_LAG;
    private static readonly _TYPE_LOOP;
    private static readonly _TYPE_FUNC;
    private static readonly _TYPE_IF_CASE;
    private static readonly _TYPE_IF_CASE_BY_FUNC;
    static ticker: Ticker24;
    static ease: Ease24;
    private static _playingTweens;
    private static _manualPlayingTweens;
    private static _playingTweensByTarget;
    private static _tweensById;
    private static _tweensByGroupId;
    private static _defaultEasing;
    private static _debugMode;
    private static _numCreateTween;
    private static _globalTimeScale;
    private _singleTarget;
    private _multiTarget;
    private _easing;
    private _type;
    private _time;
    private _velocity;
    private _delayTime;
    private _startTime;
    private _progress;
    private _timeScale;
    private _delayTimeScale;
    private _totalTimeScale;
    private _totalDelayTimeScale;
    private _debugMode;
    private _numLayers;
    private _serialNumber;
    private _tweenId;
    private _tweenGroupId;
    private _targetString;
    private _targetQuery;
    private _useWillChange;
    private _objectUpdater;
    private _objectMultiUpdater;
    private _transformUpdater;
    private _transformMultiUpdater;
    private _styleUpdater;
    private _styleMultiUpdater;
    private _allUpdaters;
    private _root;
    private _parent;
    private _next;
    private _isDOM;
    private _isRoot;
    private _isManual;
    private _isTrigger;
    private _inited;
    private _played;
    private _paused;
    private _skiped;
    private _eventWaiting;
    private _firstUpdated;
    private _isContainerTween;
    private _createdBasicUpdater;
    private _functionExecuters;
    private _firstTween;
    private _childTween;
    private _playingChildTween;
    private _originalChildTween;
    private _numChildren;
    private _numCompleteChildren;
    private _lagTime;
    private _totalLagTime;
    private _lagSort;
    private _lagEasing;
    private _numLoops;
    private _currentLoops;
    private _ifFunc;
    private _trueTween;
    private _falseTween;
    private _dispatchEventTarget;
    private _dispatchEventType;
    private _triggered;
    private _jumped;
    private _jumpProg;
    __fps: number;
    __beforeTime: number;
    constructor();
    /**
     * トゥイーンを再生します。
     * @memberof Tween24
     */
    play: () => void;
    /**
     * トゥイーンを手動アップデート式で再生します。
     * 関数 manualUpdate() を実行すると更新されます。
     * @memberof Tween24
     */
    manualPlay: () => void;
    private _commonRootPlay;
    private _play;
    private _resume;
    /**
     * トゥイーンを一時停止します。
     * @memberof Tween24
     */
    pause: () => void;
    /**
     * トゥイーンを終点までスキップします。
     * @memberof Tween24
     */
    skip: () => void;
    private _skip;
    /**
     * トゥイーンを停止します。
     * @memberof Tween24
     */
    stop: () => void;
    private _stop;
    private _initParam;
    private _overwrite;
    private _setIfCaseTween;
    manualUpdate: () => void;
    __update(nowTime: number): void;
    private _complete;
    private _tweenStop;
    private _completeChildTween;
    private _playNextTween;
    private _updateProgress;
    /**
     * 目標とするX座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * また、パーセント値で指定された場合は、囲みボックスの寸法に対する相対値が設定されます。
     * @param {number|string} value X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    x(value: number | string): Tween24;
    /**
     * 目標とするX座標を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    x$(value: number): Tween24;
    /**
     * 目標とするX座標を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    x$$(value: number): Tween24;
    /**
     * 目標とするY座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * また、パーセント値で指定された場合は、囲みボックスの寸法に対する相対値が設定されます。
     * @param {number|string} value Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    y(value: number | string): Tween24;
    /**
     * 目標とするX座標を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    y$(value: number): Tween24;
    /**
     * 目標とするX座標を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    y$$(value: number): Tween24;
    /**
     * 目標とするXとY座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * また、パーセント値で指定された場合は、囲みボックスの寸法に対する相対値が設定されます。
     * @param {number|string} x X座標
     * @param {number|string} y Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    xy(x: number | string, y: number | string): Tween24;
    /**
     * 目標とするXとY座標を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} x X座標
     * @param {number} y Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    xy$(x: number, y: number): Tween24;
    /**
     * 目標とするXとY座標を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} x X座標
     * @param {number} y Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    xy$$(x: number, y: number): Tween24;
    /**
     * 座標のトゥイーンにベジェ曲線を適応し、アンカーポイントを追加します。
     * @param {number} bezierX X座標のアンカーポイント
     * @param {number} bezierY Y座標のアンカーポイント
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    bezier(bezierX: number, bezierY: number): Tween24;
    /**
     * 目標とする透明度を設定します。
     * 対象が HTMLElement の場合は、CSS:opacity が適用されます。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    alpha(value: number): Tween24;
    /**
     * 目標とする透明度を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:opacity が適用されます。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    alpha$(value: number): Tween24;
    /**
     * 目標とする透明度を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:opacity が適用されます。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    alpha$$(value: number): Tween24;
    /**
     * 目標とする透明度を設定します。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    opacity(value: number): Tween24;
    /**
     * 目標とする透明度を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    opacity$(value: number): Tween24;
    /**
     * 目標とする透明度を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    opacity$$(value: number): Tween24;
    /**
     * 目標とする水平スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleX(value: number): Tween24;
    /**
     * 目標とする水平スケール、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleX$(value: number): Tween24;
    /**
     * 目標とする水平スケール、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleX$$(value: number): Tween24;
    /**
     * 目標とする垂直スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleY(value: number): Tween24;
    /**
     * 目標とする垂直スケールを、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleY$(value: number): Tween24;
    /**
     * 目標とする垂直スケールを、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleY$$(value: number): Tween24;
    /**
     * 目標とするスケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平＆垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scale(value: number): Tween24;
    /**
     * 目標とするスケールを、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平＆垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scale$(value: number): Tween24;
    /**
     * 目標とするスケールを、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平＆垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scale$$(value: number): Tween24;
    /**
     * 目標とする水平・垂直スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} scaleX 水平方向のスケール
     * @param {number} scaleY 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleXY(scaleX: number, scaleY: number): Tween24;
    /**
     * 目標とする水平・垂直スケールを、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} scaleX 水平方向のスケール
     * @param {number} scaleY 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleXY$(scaleX: number, scaleY: number): Tween24;
    /**
     * 目標とする水平・垂直スケールを、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} scaleX 水平方向のスケール
     * @param {number} scaleY 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleXY$$(scaleX: number, scaleY: number): Tween24;
    /**
     * 目標とする水平傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewX(value: number): Tween24;
    /**
     * 目標とする水平傾斜を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewX$(value: number): Tween24;
    /**
     * 目標とする水平傾斜を設定、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewX$$(value: number): Tween24;
    /**
     * 目標とする垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewY(value: number): Tween24;
    /**
     * 目標とする垂直傾斜を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewY$(value: number): Tween24;
    /**
     * 目標とする垂直傾斜を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewY$$(value: number): Tween24;
    /**
     * 目標とする水平＆垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平＆垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skew(value: number): Tween24;
    /**
     * 目標とする水平＆垂直傾斜を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平＆垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skew$(value: number): Tween24;
    /**
     * 目標とする水平＆垂直傾斜を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平＆垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skew$$(value: number): Tween24;
    /**
     * 目標とする水平・垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} skewX 水平方向の傾斜
     * @param {number} skewY 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewXY(skewX: number, skewY: number): Tween24;
    /**
     * 目標とする水平・垂直傾斜を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} skewX 水平方向の傾斜
     * @param {number} skewY 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewXY$(skewX: number, skewY: number): Tween24;
    /**
     * 目標とする水平・垂直傾斜を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} skewX 水平方向の傾斜
     * @param {number} skewY 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewXY$$(skewX: number, skewY: number): Tween24;
    /**
     * 目標とする回転角度を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 回転角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    rotation(value: number): Tween24;
    /**
     * 目標とする回転角度を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 回転角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    rotation$(value: number): Tween24;
    /**
     * 目標とする回転角度を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 回転角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    rotation$$(value: number): Tween24;
    /**
     * CSS:Transform の基準点を設定します。
     * @param {number} x X方向の基準点
     * @param {number} y Y方向の基準点
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    transformOrigin(x: number | string, y: number | string): Tween24;
    /**
     * 目標とする角度を設定します。
     * @param {number} value 角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    angle(value: number): Tween24;
    /**
     * 目標とする角度を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number} value 角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    angle$(value: number): Tween24;
    /**
     * 目標とする角度を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number} value 角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    angle$$(value: number): Tween24;
    /**
     * CSS:top を設定します。
     * @param {number|string} 上からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    top(value: number | string): Tween24;
    /**
     * CSS:top を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number|string} 上からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    top$(value: number | string): Tween24;
    /**
     * CSS:top を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number|string} 上からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    top$$(value: number | string): Tween24;
    /**
     * CSS:right を設定します。
     * @param {number|string} 右からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    right(value: number | string): Tween24;
    /**
     * CSS:right を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number|string} 右からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    right$(value: number | string): Tween24;
    /**
     * CSS:right を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number|string} 右からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    right$$(value: number | string): Tween24;
    /**
     * CSS:bottom を設定します。
     * @param {number|string} value 下からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    bottom(value: number | string): Tween24;
    /**
     * CSS:bottom を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number|string} value 下からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    bottom$(value: number | string): Tween24;
    /**
     * CSS:bottom を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number|string} value 下からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    bottom$$(value: number | string): Tween24;
    /**
     * CSS:left を設定します。
     * @param {number|string} value 左からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    left(value: number | string): Tween24;
    /**
     * CSS:left を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number|string} value 左からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    left$(value: number | string): Tween24;
    /**
     * CSS:left を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number|string} value 左からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    left$$(value: number | string): Tween24;
    /**
     * 目標とする幅を設定します。
     * 対象が HTMLElement の場合は、CSS:width が適用されます。
     * @param {number|string} value 要素の幅
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    width(value: number | string): Tween24;
    /**
     * 目標とする幅を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:width が適用されます。
     * @param {number|string} value 要素の幅
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    width$(value: number | string): Tween24;
    /**
     * 目標とする幅を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:width が適用されます。
     * @param {number|string} value 要素の幅
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    width$$(value: number | string): Tween24;
    /**
     * 目標とする高さを設定します。
     * 対象が HTMLElement の場合は、CSS:height が適用されます。
     * @param {number|string} value 要素の高さ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    height(value: number | string): Tween24;
    /**
     * 目標とする高さを、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:height が適用されます。
     * @param {number|string} value 要素の高さ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    height$(value: number | string): Tween24;
    /**
     * 目標とする高さを、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合は、CSS:height が適用されます。
     * @param {number|string} value 要素の高さ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    height$$(value: number | string): Tween24;
    /**
     * CSS:color を設定します。
     * @param {string} colorCode 「#」「rgb()」フォーマットのカラー値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    color(colorCode: string): Tween24;
    /**
     * CSS:background-color（背景色）を設定します。
     * @param {string} colorCode 「#」「rgb()」フォーマットのカラー値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundColor(colorCode: string): Tween24;
    /**
     * CSS:background-position-x（背景X座標）を設定します。
     * @param {string} x 背景X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPositionX(x: number | string): Tween24;
    /**
     * CSS:background-position-x（背景X座標）を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {string} x 背景X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPositionX$(x: number | string): Tween24;
    /**
     * CSS:background-position-x（背景X座標）を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {string} x 背景X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPositionX$$(x: number | string): Tween24;
    /**
     * CSS:background-position-y（背景Y座標）を設定します。
     * @param {string} y 背景Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPositionY(y: number | string): Tween24;
    /**
     * CSS:background-position-y（背景Y座標）を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {string} y 背景Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPositionY$(y: number | string): Tween24;
    /**
     * CSS:background-position-y（背景Y座標）を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {string} y 背景Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPositionY$$(y: number | string): Tween24;
    /**
     * CSS:background-position（背景座標）を設定します。
     * @param {string} x 背景X座標
     * @param {string} y 背景Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPosition(x: number | string, y: number | string): Tween24;
    /**
     * CSS:background-position（背景座標）を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {string} x 背景X座標
     * @param {string} y 背景Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPosition$(x: number | string, y: number | string): Tween24;
    /**
     * CSS:background-position（背景座標）を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {string} x 背景X座標
     * @param {string} y 背景Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundPosition$$(x: number | string, y: number | string): Tween24;
    /**
     * CSS:border-width（枠の太さ）を設定します。
     * @param {number|string} value 枠の太さ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderWidth(value: number | string): Tween24;
    /**
     * CSS:border-width（枠の太さ）を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number|string} value 枠の太さ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderWidth$(value: number | string): Tween24;
    /**
     * CSS:border-width（枠の太さ）を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number|string} value 枠の太さ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderWidth$$(value: number | string): Tween24;
    /**
     * CSS:border-color（枠の色）を設定します。
     * @param {number} colorCode 「#」「rgb()」フォーマットのカラー値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderColor(colorCode: string): Tween24;
    /**
     * CSS:border-radius（角丸）を設定します。
     * @param {number|string} value 角丸の値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderRadius(value: number | string): Tween24;
    /**
     * CSS:border-radius（角丸）を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number|string} value 角丸の値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderRadius$(value: number | string): Tween24;
    /**
     * CSS:border-radius（角丸）を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number|string} value 角丸の値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderRadius$$(value: number | string): Tween24;
    /**
     * CSS:letter-spacing（字間）を設定します。
     * @param {number|string} value 字間
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    letterSpacing(value: number | string): Tween24;
    /**
     * CSS:letter-spacing（字間）を、トゥイーンを作成した時の値の相対値で設定します。
     * @param {number|string} value 字間
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    letterSpacing$(value: number | string): Tween24;
    /**
     * CSS:letter-spacing（字間）を、トゥイーンが実行される直前の値の相対値で設定します。
     * @param {number|string} value 字間
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    letterSpacing$$(value: number | string): Tween24;
    /**
     * トゥイーンの遅延時間を設定します。
     * @param {number} value 遅延時間（秒数）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    delay(value: number): Tween24;
    /**
     * トゥイーンの時間（delayの遅延時間を含む）の尺度を設定します。
     * @param {number} value 時間の尺度（割合）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    timeScale(value: number): Tween24;
    /**
     * トゥイーンの遅延時間の尺度を設定します。
     * @param {number} value 遅延時間の尺度（割合）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    delayScale(value: number): Tween24;
    /**
     * 目標とするスタイルシートの値を設定します。
     * 対象が HTMLElement の場合にのみ適用されます。
     * @param {string} name プロパティ名
     * @param {(number|string)} value 目標の値（数値指定の場合は、基本的にpx単位で計算されます）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    style(name: string, value: number | string): Tween24;
    /**
     * 目標とするスタイルシートの値を、トゥイーンを作成した時の値の相対値で設定します。
     * 対象が HTMLElement の場合にのみ適用されます。
     * @param {string} name プロパティ名
     * @param {(number|string)} value 目標の値（数値指定の場合は、基本的にpx単位で計算されます）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    style$(name: string, value: number | string): Tween24;
    /**
     * 目標とするスタイルシートの値を、トゥイーンが実行される直前の値の相対値で設定します。
     * 対象が HTMLElement の場合にのみ適用されます。
     * @param {string} name プロパティ名
     * @param {(number|string)} value 目標の値（数値指定の場合は、基本的にpx単位で計算されます）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    style$$(name: string, value: number | string): Tween24;
    /**
     * トゥイーン実行時に willChange を有効にするか設定します。
     * 有効にすると強力な最適化をブラウザーが行い、アニメーションが滑らかになります。
     * 対象が HTMLElement の場合にのみ適用されます。
     * @param {boolean} [use=true] willChange を有効にするか
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    willChange(use?: boolean): Tween24;
    /**
     * ポインターイベントの有効・無効を設定します。
     * true の場合は"auto", false の場合は "none" が設定されます。
     * @param {boolean} enable ポインターイベントを有効にするか
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    pointerEvents(enable: boolean): Tween24;
    /**
     * 子トゥイーンの完了トリガーに設定します。
     * 設定したトゥイーンが完了したら、親トゥイーンが次のトゥイーンへ移行します。
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    trigger(): Tween24;
    /**
     * トゥイーンの途中で、次のトゥイーンへ移行します。
     * @param {number} progress 移行させる進捗率
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    jump(progress: number): Tween24;
    /**
     * トゥイーン毎のFPS（1秒間の更新回数）を設定します。
     * デフォルトでは0が設定され、ブラウザのリフレッシュレートに合わせて描画更新されます。
     * （※ 子以下のトゥイーンには設定できません。）
     * @param {number} fps FPSの値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    fps(fps: number): Tween24;
    /**
     * トゥイーンのデバッグモードを設定します。
     * デバッグモードをONにすると、トゥイーンの動作状況がコンソールに表示されます。
     * @param {boolean} flag デバッグモードを使用するか
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    debug(flag?: boolean): Tween24;
    private _setPropety;
    private _set$Propety;
    private _set$$Propety;
    private _setPropetyStr;
    private _setStyle;
    private _set$Style;
    private _set$$Style;
    private createBasicUpdater;
    /**
     * トゥイーン再生時に、実行する関数を設定します。
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onPlay(func: Function, ...args: any[]): Tween24;
    /**
     * トゥイーン開始時に、実行する関数を設定します。
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onInit(func: Function, ...args: any[]): Tween24;
    /**
     * トゥイーン実行中に、実行する関数を設定します。
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onUpdate(func: Function, ...args: any[]): Tween24;
    /**
     * トゥイーンが一時停止した時に、実行する関数を設定します。
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onPause(func: Function, ...args: any[]): Tween24;
    /**
     * トゥイーンが一時停止中から、再開した時に実行する関数を設定します。
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onResume(func: Function, ...args: any[]): Tween24;
    /**
     * トゥイーンが停止された時に、実行する関数を設定します。
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onStop(func: Function, ...args: any[]): Tween24;
    /**
     * トゥイーンが完了した時に、実行する関数を設定します。
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onComplete(func: Function, ...args: any[]): Tween24;
    private _setFunctionExecute;
    private _functionExecute;
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
    static tween(target: any, time: number, easing?: Function | null, params?: {
        [key: string]: number;
    } | null): Tween24;
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
    static tweenVelocity(target: any, velocity: number, easing?: Function | null, params?: {
        [key: string]: number;
    } | null): Tween24;
    /**
     * プロパティを設定します。
     * @static
     * @param {*} target 対象オブジェクト
     * @param {({[key:string]:number}|null)} [params=null] 設定するパラメータ（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
    */
    static prop(target: any, params?: {
        [key: string]: number;
    } | null): Tween24;
    /**
     * クエリで指定した要素直下のテキストを1文字ずつに分解し、それぞれにプロパティを設定します。
     * @static
     * @param {string} targetQuery 対象要素を指定するクエリ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static propText(targetQuery: string): Tween24;
    /**
     * クエリで指定した要素直下のテキストを1文字ずつに分解し、それぞれにトゥイーンを設定します。
     * @static
     * @param {string} targetQuery 対象要素を指定するクエリ
     * @param {number} time 時間（秒）
     * @param {(Function|null)} [easing=null] イージング関数（デフォルト値：Ease24._Linear）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static tweenText(targetQuery: string, time: number, easing?: Function | null): Tween24;
    /**
     * 1文字ずつに分解したテキストを、元に戻します。
     * @static
     * @param {string} targetQuery 対象要素を指定するクエリ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static resetText(targetQuery: string): Tween24;
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
    static tweenTextVelocity(targetQuery: string, velocity: number, easing?: Function | null): Tween24;
    private static _tweenText;
    /**
     * トゥイーンを待機します。
     * @static
     * @param {number} time 待機時間（秒）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static wait(time: number): Tween24;
    /**
     * 関数を実行します。
     * @static
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static func(func: Function, ...args: any[]): Tween24;
    /**
     * イベントを受け取るまで、待機します。
     * @static
     * @param {*} target イベントを受け取る対象
     * @param {string} type 受け取るイベントタイプ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static waitEvent(target: any, type: string): Tween24;
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
    static waitEventAndFunc(target: any, type: string, func: Function, ...args: any[]): Tween24;
    private _setWaitEvent;
    /**
     * console.log() を実行します。
     * @static
     * @param {...any[]} message コンソールに出力する内容
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static log(...message: any[]): Tween24;
    /**
     * 順番に実行するトゥイーンを設定します。
     * @static
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static serial(...childTween: Tween24[]): Tween24;
    /**
     * 並列に実行するトゥイーンを設定します。
     * @static
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static parallel(...childTween: Tween24[]): Tween24;
    /**
     * 子トゥイーンの対象が複数指定されていた場合、時差を設定します。
     * @static
     * @param {number} lagTime 対象毎の時差（秒数）
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static lag(lagTime: number, ...childTween: Tween24[]): Tween24;
    /**
     * 子トゥイーンの対象が複数指定されていた場合、再生順をソートして時差を設定します。
     * @static
     * @param {number} lagTime 対象毎の時差（秒数）
     * @param {Function} sort 再生順をソートする関数
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static lagSort(lagTime: number, sort: Function, ...childTween: Tween24[]): Tween24;
    /**
     * 子トゥイーンの対象が複数指定されていた場合、トータル時間を元に時差を設定します。
     * @static
     * @param {number} totalLagTime 時差のトータル時間（秒数）
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static lagTotal(totalLagTime: number, ...childTween: Tween24[]): Tween24;
    /**
     * 子トゥイーンの対象が複数指定されていた場合、トータル時間を元にイージングをかけながら時差を設定します。
     * @static
     * @param {number} totalLagTime 時差のトータル時間（秒数）
     * @param {Function} easing 時差の時間量のイージング
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static lagTotalEase(totalLagTime: number, easing: Function, ...childTween: Tween24[]): Tween24;
    /**
     * 子トゥイーンの対象が複数指定されていた場合、再生順をソートして、トータル時間を元に時差を設定します。
     * @static
     * @param {number} totalLagTime 時差のトータル時間（秒数）
     * @param {Function} sort 再生順をソートする関数
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static lagTotalSort(totalLagTime: number, sort: Function, ...childTween: Tween24[]): Tween24;
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
    static lagTotalSortEase(totalLagTime: number, sort: Function, easing: Function, ...childTween: Tween24[]): Tween24;
    /**
     * 繰り返し再生させるトゥイーンを設定します。
     * ループ回数に「0」を指定すると、無制限に繰り返します。
     * @static
     * @param {number} numLoops ループさせる回数
     * @param {Tween24} tween ループさせるトゥイーン
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static loop(numLoops: number, tween: Tween24): Tween24;
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
    static ifCase(flag: boolean | (() => boolean), trueTween: Tween24, falseTween?: Tween24 | null): Tween24;
    /**
     * トゥイーン実行時に boolean 値を返す関数を実行し、再生するトゥイーンを設定します。
     * @static
     * @param {()=>boolean} func boolean値を返す関数
     * @param {Tween24} trueTween フラグが true の時に再生するトゥイーン
     * @param {(Tween24|null)} [falseTween=null] フラグが false の時に再生するトゥイーン
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    private _createChildTween;
    private _createContainerTween;
    private _createActionTween;
    private _commonProcess;
    /**
     * トゥイーンのIDを設定します。
     * @param {string} id トゥイーンのID
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    id(id: string): Tween24;
    /**
     * 指定したIDのトゥイーンの play() を実行します。
     * @static
     * @param {string} id トゥイーンのID
     * @memberof Tween24
     */
    static playById: (id: string) => void;
    /**
     * 指定したIDのトゥイーンの manualPlay() を実行します。
     * @static
     * @param {string} id トゥイーンのID
     * @memberof Tween24
     */
    static manualPlayById: (id: string) => void;
    /**
     * 指定したIDのトゥイーンの pause() を実行します。
     * @static
     * @param {string} id トゥイーンのID
     * @memberof Tween24
     */
    static pauseById: (id: string) => void;
    /**
     * 指定したIDのトゥイーンの skip() を実行します。
     * @static
     * @param {string} id トゥイーンのID
     * @memberof Tween24
     */
    static skipById: (id: string) => void;
    /**
     * 指定したIDのトゥイーンの stop() を実行します。
     * @static
     * @param {string} id トゥイーンのID
     * @memberof Tween24
     */
    static stopById: (id: string) => void;
    /**
     * トゥイーンのグループIDを設定します。
     * @param {string} groupId トゥイーンのグループID
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    groupId(groupId: string): Tween24;
    /**
     * 指定したグループIDのトゥイーンの play() を実行します。
     * @static
     * @param {string} groupId トゥイーンのID
     * @memberof Tween24
     */
    static playByGroupId: (groupId: string) => void;
    /**
     * 指定したグループIDのトゥイーンの manualPlay() を実行します。
     * @static
     * @param {string} groupId トゥイーンのID
     * @memberof Tween24
     */
    static manualPlayByGroupId: (groupId: string) => void;
    /**
     * 指定したグループIDのトゥイーンの pause() を実行します。
     * @static
     * @param {string} groupId トゥイーンのID
     * @memberof Tween24
     */
    static pauseByGroupId: (groupId: string) => void;
    /**
     * 指定したグループIDのトゥイーンの skip() を実行します。
     * @static
     * @param {string} groupId トゥイーンのID
     * @memberof Tween24
     */
    static skipByGroupId: (groupId: string) => void;
    /**
     * 指定したグループIDのトゥイーンの stop() を実行します。
     * @static
     * @param {string} groupId トゥイーンのID
     * @memberof Tween24
     */
    static stopByGroupId: (groupId: string) => void;
    private _setTweenId;
    private _setTweenGroupId;
    private static _getTweensById;
    private static _getTweensByGroupId;
    private static _controlTweens;
    /**
     * トゥイーン全体のFPS（1秒間の更新回数）を設定します。
     * デフォルトでは0が設定され、ブラウザのリフレッシュレートに合わせて描画更新されます。
     * @static
     * @param {number} [fps=0] FPSの値
     * @memberof Tween24
     */
    static setFPS: (fps?: number) => void;
    /**
     * デフォルトのイージングを設定します。
     * @static
     * @param {Function} [easing=Ease24._Linear] デフォルトのイージング
     * @memberof Tween24
     */
    static setDefaultEasing: (easing?: Function) => void;
    /**
     * トゥイーン全体のデバッグモードを設定します。
     * デバッグモードをONにすると、トゥイーンの動作状況がコンソールに表示されます。
     * @static
     * @param {boolean} flag デバッグモードを使用するか
     * @memberof Tween24
     */
    static debugMode: (flag: boolean) => void;
    /**
     * すべてのトゥイーンの、時間（delayの遅延時間を含む）の尺度（割合）を設定します。
     * @static
     * @param {number} timeScale 時間の尺度
     * @memberof Tween24
     */
    static setGlobalTimeScale: (timeScale: number) => void;
    /**
     * manualPlay() されているトゥイーンを、すべてアップデートします。
     * @static
     * @memberof Tween24
     */
    static manualAllUpdate: () => void;
    __clone(base: any, baseQuery: string | null): Tween24;
    toString(): string;
    private _debugLog;
    private _warningLog;
    private getTweenTypeString;
    private getTweenParamString;
    get isPlaying(): boolean;
    get isPausing(): boolean;
}
