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
    private static readonly _TYPE_SERIAL;
    private static readonly _TYPE_PARALLEL;
    private static readonly _TYPE_LAG;
    private static readonly _TYPE_LOOP;
    private static readonly _TYPE_FUNC;
    static ticker: Ticker24;
    static ease: Ease24;
    private static _playingTweens;
    private static _playingTweensByTarget;
    private static _defaultEasing;
    private static _debugMode;
    private static _numCreateTween;
    private static _useWillChange;
    private _singleTarget;
    private _multiTarget;
    private _easing;
    private _type;
    private _time;
    private _velocity;
    private _delayTime;
    private _startTime;
    private _progress;
    private _debugMode;
    private _numLayers;
    private _serialNumber;
    private _tweenId;
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
    private _inited;
    private _played;
    private _paused;
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
    __fps: number;
    __beforeTime: number;
    constructor();
    play: () => void;
    private _play;
    private _resume;
    pause: () => void;
    stop: () => void;
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
     * また、パーセント値で指定された場合は、囲みボックスの寸法に対する相対値が設定されます。
     * @param {number|string} value X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    x(value: number | string): Tween24;
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
     * 目標とする角度を設定します。
     * @param {number} value 角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    angle(value: number): Tween24;
    /**
     * CSS:top を設定します。
     * @param {number|string} 上からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    top(value: number | string): Tween24;
    /**
     * CSS:right を設定します。
     * @param {number|string} 右からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    right(value: number | string): Tween24;
    /**
     * CSS:bottom を設定します。
     * @param {number|string} value 下からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    bottom(value: number | string): Tween24;
    /**
     * CSS:left を設定します。
     * @param {number|string} value 左からの配置位置（距離）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    left(value: number | string): Tween24;
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
     * CSS:letter-spacing（字間）を設定します。
     * @param {number} value 字間（px）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    letterSpacing(value: number): Tween24;
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
     * トゥイーン実行時に willChange を有効にするか設定します。
     * 有効にすると強力な最適化をブラウザーが行い、アニメーションが滑らかになります。
     * 対象が HTMLElement の場合にのみ適用されます。
     * @param {boolean} [use=true]
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    willChange(use?: boolean): Tween24;
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
    /**
     * トゥイーンのIDを設定します。
     * @param {string} id トゥイーンのID
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    id(id: string): Tween24;
    private _setPropety;
    private _setPropetyStr;
    private _setStyle;
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
    private _createChildTween;
    private _createContainerTween;
    private _createActionTween;
    private _commonProcess;
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
    __clone(base: any, baseQuery: string | null): Tween24;
    toString(): string;
    private _debugLog;
    private _warningLog;
    private getTweenTypeString;
    private getTweenParamString;
}
