import { Tween24 } from "./Tween24";
export declare class Event24 {
    static readonly MOUSE_OVER: string;
    static readonly MOUSE_OUT: string;
    static readonly MOUSE_ENTER: string;
    static readonly MOUSE_LEAVE: string;
    static readonly MOUSE_MOVE: string;
    static readonly MOUSE_UP: string;
    static readonly MOUSE_DOWN: string;
    static readonly CLICK: string;
    static readonly DOUBLE_CLICK: string;
    static readonly TOUCH_START: string;
    static readonly TOUCH_END: string;
    static readonly TOUCH_MOVE: string;
    static readonly TOUCH_CANCEL: string;
    private static _allEvents;
    private _target;
    private _playEventType;
    private _stopEventType;
    private _playHandler;
    private _stopHandler;
    private _tween;
    constructor(target: any, query: string, playEventType: string, stopEventType: string[] | null, tween: Tween24);
    setEventListener(): void;
    removeEventListener(): void;
    private _play;
    private _stop;
    /**
     * イベントに合わせて再生されるトゥイーンを設定します。
     * @static
     * @param {(any|any[])} target イベントの対象
     * @param {(string|string[])} playEventType トゥイーンを再生するイベントタイプ
     * @param {Tween24} tween イベントに合わせて再生されるトゥイーン
     * @memberof Event24
     */
    static add(target: any | any[], playEventType: string | string[], tween: Tween24): void;
    /**
     * イベントに合わせて再生、停止されるトゥイーンを設定します。
     * @static
     * @param {(any|any[])} target イベントの対象
     * @param {(string|string[])} playEventType トゥイーンを再生するイベントタイプ
     * @param {(string|string[]|null)} stopEventType トゥイーンを停止するイベントタイプ
     * @param {Tween24} tween イベントに合わせて再生されるトゥイーン
     * @memberof Event24
     */
    static addWithStopEvent(target: any | any[], playEventType: string | string[], stopEventType: string | string[] | null, tween: Tween24): void;
    private static _add;
    /**
     * 対象に設定されたイベントを解除します。
     * @static
     * @param {(any|any[])} target イベントの対象
     * @param {(string|string[])} playEventType トゥイーンを再生するイベントタイプ
     * @memberof Event24
     */
    static remove(target: any | any[], playEventType: string | string[]): void;
    /**
     * 対象のイベントをすべて解除します。
     * @static
     * @param {(any|any[])} target イベントの対象
     * @memberof Event24
     */
    static removeAllByTarget(target: any | any[]): void;
    /**
     * 設定したすべてのイベントを解除します。
     * @static
     * @memberof Event24
     */
    static removeAll(): void;
    private static _getEventTarget;
}
