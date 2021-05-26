import { Tween24 } from "./Tween24";
export declare class Event24 {
    static readonly CANCEL: string;
    static readonly ERROR: string;
    static readonly SCROLL: string;
    static readonly SELECT: string;
    static readonly SHOW: string;
    static readonly WHEEL: string;
    static readonly OFFLINE: string;
    static readonly ONLINE: string;
    static readonly KEY_DOWN: string;
    static readonly KEY_UP: string;
    static readonly FOCUS_BLUR: string;
    static readonly FOCUS: string;
    static readonly FOCUS_IN: string;
    static readonly FOCUS_OUT: string;
    static readonly DRAG: string;
    static readonly DRAG_END: string;
    static readonly DRAG_EXIT: string;
    static readonly DRAG_LEAVE: string;
    static readonly DRAG_OVER: string;
    static readonly DRAG_START: string;
    static readonly DROP: string;
    static readonly HASH_CHANGE: string;
    static readonly PAGE_HIDE: string;
    static readonly PAGE_SHOW: string;
    static readonly POP_STATE: string;
    static readonly MOUSE_OVER: string;
    static readonly MOUSE_OUT: string;
    static readonly MOUSE_ENTER: string;
    static readonly MOUSE_LEAVE: string;
    static readonly MOUSE_MOVE: string;
    static readonly MOUSE_UP: string;
    static readonly MOUSE_DOWN: string;
    static readonly CLICK: string;
    static readonly AUX_CLICK: string;
    static readonly DOUBLE_CLICK: string;
    static readonly TOUCH_START: string;
    static readonly TOUCH_END: string;
    static readonly TOUCH_MOVE: string;
    static readonly TOUCH_CANCEL: string;
    static readonly AFTER_PRINT: string;
    static readonly BEFORE_PRINT: string;
    static readonly MESSAGE: string;
    static readonly MESSAGE_ERROR: string;
    static readonly CLIPBOARD_COPY: string;
    static readonly CLIPBOARD_CUT: string;
    static readonly CLIPBOARD_PASTE: string;
    static readonly FULLSCREEN_CHANGE: string;
    static readonly FULLSCREEN_ERROR: string;
    static readonly BEFOREUN_LOAD: string;
    static readonly DOM_CONTENT_LOADED: string;
    static readonly LOAD: string;
    static readonly UNLOAD: string;
    static readonly LANGUAGE_CHANGE: string;
    static readonly ORIENTATION_CHANGE: string;
    static readonly DEVICE_MOTION: string;
    static readonly DEVICE_ORIENTATION: string;
    static readonly RESIZE: string;
    static readonly STORAGE: string;
    static readonly POINTER_OVER: string;
    static readonly POINTER_ENTER: string;
    static readonly POINTER_DOWN: string;
    static readonly POINTER_MOVE: string;
    static readonly POINTER_UP: string;
    static readonly POINTER_CANCEL: string;
    static readonly POINTER_OUT: string;
    static readonly POINTER_LEAVE: string;
    static readonly GOT_POINTERCAPTURE: string;
    static readonly LOST_POINTERCAPTURE: string;
    static readonly ANIMATION_CANCEL: string;
    static readonly ANIMATION_END: string;
    static readonly ANIMATION_ITERATION: string;
    static readonly ANIMATION_START: string;
    static readonly TRANSITION_CANCEL: string;
    static readonly TRANSITION_END: string;
    static readonly TRANSITION_RUN: string;
    static readonly TRANSITION_START: string;
    static readonly REJECTION_HANDLED: string;
    static readonly UNHANDLED_REJECTION: string;
    static readonly GAMEPAD_CONNECTED: string;
    static readonly GAMEPAD_DISCONNECTED: string;
    static readonly APP_INSTALLED: string;
    static readonly BEFORE_INSTALL_PROMPT: string;
    static readonly WEBKIT_MOUSE_FORCE_CHANGED: string;
    static readonly WEBKIT_MOUSE_FORCE_DOWN: string;
    static readonly WEBKIT_MOUSE_FORCE_WILLBEGIN: string;
    static readonly WEBKIT_MOUSE_FORCE_UP: string;
    static readonly VR_DISPLAY_ACTIVATE: string;
    static readonly VR_DISPLAY_BLUR: string;
    static readonly VR_DISPLAY_CONNECT: string;
    static readonly VR_DISPLAY_DEACTIVATE: string;
    static readonly VR_DISPLAY_DISCONNECT: string;
    static readonly VR_DISPLAY_FOCUS: string;
    static readonly VR_DISPLAY_PRESENT_CHANGE: string;
    static readonly VR_DISPLAY_POINTER_RESTRICTED: string;
    static readonly VR_DISPLAY_POINTER_UNRESTRICTED: string;
    private static _allEvents;
    private _eventCores;
    constructor();
    private _addEventCore;
    /**
     * イベントリスナーを設定します。
     * @memberof Event24
     */
    setEventListener(): void;
    /**
     * イベントリスナーを解除します。
     * @memberof Event24
     */
    removeEventListener(): void;
    /**
     * 設定したトゥイーンを停止させるイベントを設定します。
     * @param {(string|string[])} eventType トゥイーンを停止するイベントタイプ
     * @memberof Event24
     */
    addStopEvent(eventType: string | string[]): Event24;
    willChange(use: boolean): Event24;
    /**
     * イベントに合わせて再生されるトゥイーンを設定します。
     * @static
     * @param {(any|any[])} target イベントの対象
     * @param {(string|string[])} eventType トゥイーンを再生するイベントタイプ
     * @param {Tween24} tween イベントに合わせて再生されるトゥイーン
     * @memberof Event24
     */
    static add(target: any | any[], eventType: string | string[], tween: Tween24): Event24;
    private static _create;
    /**
     * 対象に設定されたイベントを解除します。
     * @static
     * @param {(any|any[])} target イベントの対象
     * @param {(string|string[])} eventType トゥイーンを再生するイベントタイプ
     * @memberof Event24
     */
    static remove(target: any | any[], eventType: string | string[]): void;
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
