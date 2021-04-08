import { Ticker24 } from "./core/Ticker24";
import { Ease24 } from "./Ease24";
export declare class Tween24 {
    static readonly VERSION: string;
    private static readonly _TYPE_TWEEN;
    private static readonly _TYPE_PROP;
    private static readonly _TYPE_WAIT;
    private static readonly _TYPE_SERIAL;
    private static readonly _TYPE_PARALLEL;
    private static readonly _TYPE_FUNC;
    static ticker: Ticker24;
    static ease: Ease24;
    private static _playingTweens;
    private static _playingTweensByTarget;
    private static _defaultEasing;
    private static _debugMode;
    private static _numCreateTween;
    private _singleTarget;
    private _multiTarget;
    private _easing;
    private _type;
    private _time;
    private _delayTime;
    private _startTime;
    private _progress;
    private _debugMode;
    private _numLayers;
    private _serialNumber;
    private _tweenId;
    private _targetString;
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
    private _useStyle;
    private _inited;
    private _isRoot;
    private _isPlayed;
    private _isPaused;
    private _isContainerTween;
    private _functionExecuters;
    private _firstTween;
    private _childTween;
    private _playingChildTween;
    private _numChildren;
    private _numCompleteChildren;
    __fps: number;
    __beforeTime: number;
    constructor();
    play(): void;
    private _play;
    private _resume;
    pause(): void;
    stop(): void;
    private _stop;
    private _initParam;
    private _overwrite;
    _update(nowTime: number): void;
    private _complete;
    private _tweenStop;
    private _completeChildTween;
    private _updateProgress;
    /**
     * 目標とするX座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    x(value: number): Tween24;
    /**
     * 目標とするY座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    y(value: number): Tween24;
    /**
     * 目標とするXとY座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} x Y座標
     * @param {number} y Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    xy(x: number, y: number): Tween24;
    /**
     * 目標とする透明度を設定します。
     * 対象が HTMLElement の場合は、CSS:opacity が適用されます。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    alpha(value: number): Tween24;
    /**
     * 目標とする透明度を設定します。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    opacity(value: number): Tween24;
    /**
     * 目標とする水平スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleX(value: number): Tween24;
    /**
     * 目標とする垂直スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scaleY(value: number): Tween24;
    /**
     * 目標とするスケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平＆垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    scale(value: number): Tween24;
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
     * 目標とする水平傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewX(value: number): Tween24;
    /**
     * 目標とする垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skewY(value: number): Tween24;
    /**
     * 目標とする水平＆垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 水平＆垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    skew(value: number): Tween24;
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
     * 目標とする回転角度を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適用されます。
     * @param {number} value 回転角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    rotation(value: number): Tween24;
    /**
     * CSS:top を設定します。
     * @param {number} 上からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    top(value: number): Tween24;
    /**
     * CSS:right を設定します。
     * @param {number} 右からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    right(value: number): Tween24;
    /**
     * CSS:bottom を設定します。
     * @param {number} value 下からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    bottom(value: number): Tween24;
    /**
     * CSS:left を設定します。
     * @param {number} value 左からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    left(value: number): Tween24;
    /**
     * 目標とする幅を設定します。
     * 対象が HTMLElement の場合は、CSS:width が適用されます。
     * @param {number} value 要素の幅
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    width(value: number): Tween24;
    /**
     * 目標とする高さを設定します。
     * 対象が HTMLElement の場合は、CSS:height が適用されます。
     * @param {number} value 要素の高さ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    height(value: number): Tween24;
    /**
     * CSS:color を設定します。
     * @param {string} colorCode 「#」から始まるカラー値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    color(colorCode: string): Tween24;
    /**
     * CSS:background-color（背景色）を設定します。
     * @param {string} colorCode 「#」から始まるカラー値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    backgroundColor(colorCode: string): Tween24;
    /**
     * CSS:border-width（枠の太さ）を設定します。
     * @param {number} value 枠の太さ
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderWidth(value: number): Tween24;
    /**
     * CSS:border-color（枠の色）を設定します。
     * @param {number} value 「#」から始まるカラー値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderColor(value: number): Tween24;
    /**
     * CSS:border-radius（角丸）を設定します。
     * @param {number} value 角丸の値
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    borderRadius(value: number): Tween24;
    /**
     * トゥイーンの遅延時間を設定します。
     * @param {number} value 遅延時間（秒数）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    delay(value: number): Tween24;
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
     * トゥイーン単体のFPS（1秒間の更新回数）を設定します。
     * デフォルトでは0が設定され、ブラウザのリフレッシュレートに合わせて描画更新されます。
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
    /**
     * トゥイーンのIDを設定します。
     * @param {string} id トゥイーンのID
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    id(id: string): Tween24;
    private _setPropety;
    private _setStyle;
    /**
     * トゥイーン再生時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onPlay(scope: any, func: Function, ...args: any[]): Tween24;
    /**
     * トゥイーン開始時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onInit(scope: any, func: Function, ...args: any[]): Tween24;
    /**
     * トゥイーン実行中に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onUpdate(scope: any, func: Function, ...args: any[]): Tween24;
    /**
     * トゥイーンが一時停止した時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onPause(scope: any, func: Function, ...args: any[]): Tween24;
    /**
     * トゥイーンが一時停止中から、再開した時に実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onResume(scope: any, func: Function, ...args: any[]): Tween24;
    /**
     * トゥイーンが停止された時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onStop(scope: any, func: Function, ...args: any[]): Tween24;
    /**
     * トゥイーンが完了した時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onComplete(scope: any, func: Function, ...args: any[]): Tween24;
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
     * @param {*} scope 関数が定義されているオブジェクト
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static func(scope: any, func: Function, ...args: any[]): Tween24;
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
    private _createChildTween;
    private _createContainerTween;
    private _createActionTween;
    private _createCommon;
    /**
     * トゥイーン全体のFPS（1秒間の更新回数）を設定します。
     * デフォルトでは0が設定され、ブラウザのリフレッシュレートに合わせて描画更新されます。
     * @static
     * @param {number} [fps=0] FPSの値
     * @memberof Tween24
     */
    static setFPS(fps?: number): void;
    /**
     * デフォルトのイージングを設定します。
     * @static
     * @param {Function} [easing=Ease24._Linear] デフォルトのイージング
     * @memberof Tween24
     */
    static setDefaultEasing(easing?: Function): void;
    /**
     * トゥイーン全体のデバッグモードを設定します。
     * デバッグモードをONにすると、トゥイーンの動作状況がコンソールに表示されます。
     * @static
     * @param {boolean} flag デバッグモードを使用するか
     * @memberof Tween24
     */
    static debugMode(flag: boolean): void;
    toString(): string;
    private _debugLog;
    private getTweenTypeString;
    private getTweenParamString;
}
export default Tween24;
