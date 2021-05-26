import { Event24Core } from "./core/Event24Core";
import { Tween24   }   from "./Tween24";
import { ClassUtil }   from "./utils/ClassUtil";
import { HTMLUtil  }   from "./utils/HTMLUtil";

export class Event24 {
    
    // Etc Events
    static readonly CANCEL       :string = "cancel";
    static readonly ERROR        :string = "error";
    static readonly SCROLL       :string = "scroll";
    static readonly SELECT       :string = "select";
    static readonly SHOW         :string = "show";
    static readonly WHEEL        :string = "wheel";

    // Connection Events
    static readonly OFFLINE      :string = "offline";
    static readonly ONLINE       :string = "online";

    // Key Events
    static readonly KEY_DOWN     :string = "keydown";
    static readonly KEY_UP       :string = "keyup";

    // Focus Events
    static readonly FOCUS_BLUR   :string = "blur";
    static readonly FOCUS        :string = "focus";
    static readonly FOCUS_IN     :string = "focusin";
    static readonly FOCUS_OUT    :string = "focusout";

    // Drag Events
    static readonly DRAG         :string = "drag";
    static readonly DRAG_END     :string = "dragend";
    static readonly DRAG_EXIT    :string = "dragexit";
    static readonly DRAG_LEAVE   :string = "dragleave";
    static readonly DRAG_OVER    :string = "dragover";
    static readonly DRAG_START   :string = "dragstart";
    static readonly DROP         :string = "drop";

    // History Events
    static readonly HASH_CHANGE  :string = "hashchange";
    static readonly PAGE_HIDE    :string = "pagehide";
    static readonly PAGE_SHOW    :string = "pageshow";
    static readonly POP_STATE    :string = "popstate";

    // Mouse Events
    static readonly MOUSE_OVER   :string = "mouseover";
    static readonly MOUSE_OUT    :string = "mouseout";
    static readonly MOUSE_ENTER  :string = "mouseenter";
    static readonly MOUSE_LEAVE  :string = "mouseleave";
    static readonly MOUSE_MOVE   :string = "mousemove";
    static readonly MOUSE_UP     :string = "mouseleave";
    static readonly MOUSE_DOWN   :string = "mouseleave";

    // Click Events
    static readonly CLICK        :string = "click";
    static readonly AUX_CLICK    :string = "auxclick";
    static readonly DOUBLE_CLICK :string = "dblclick";

    // Touch Events
    static readonly TOUCH_START  :string = "touchstart";
    static readonly TOUCH_END    :string = "touchend";
    static readonly TOUCH_MOVE   :string = "touchmove";
    static readonly TOUCH_CANCEL :string = "touchcancel";

    // Print Events
    static readonly AFTER_PRINT  :string = "afterprint";
    static readonly BEFORE_PRINT :string = "beforeprint";

    // Messaging Events
    static readonly MESSAGE               :string = "message";
    static readonly MESSAGE_ERROR         :string = "messageerror";

    // Clipboard Events
    static readonly CLIPBOARD_COPY        :string = "copy";
    static readonly CLIPBOARD_CUT         :string = "cut";
    static readonly CLIPBOARD_PASTE       :string = "paste";

    // Fullscreen Events
    static readonly FULLSCREEN_CHANGE     :string = "fullscreenchange";
    static readonly FULLSCREEN_ERROR      :string = "fullscreenerror";

    // Load, Unload Events
    static readonly BEFOREUN_LOAD         :string = "beforeunload";
    static readonly DOM_CONTENT_LOADED    :string = "DOMContentLoaded";
    static readonly LOAD                  :string = "load";
    static readonly UNLOAD                :string = "unload";

    // Window Events
    static readonly LANGUAGE_CHANGE       :string = "languagechange";
    static readonly ORIENTATION_CHANGE    :string = "orientationchange";
    static readonly DEVICE_MOTION         :string = "devicemotion";
    static readonly DEVICE_ORIENTATION    :string = "deviceorientation";
    static readonly RESIZE                :string = "resize";
    static readonly STORAGE               :string = "storage";

    // Pointer Events
    static readonly POINTER_OVER          :string = "pointerover";
    static readonly POINTER_ENTER         :string = "pointerenter";
    static readonly POINTER_DOWN          :string = "pointerdown";
    static readonly POINTER_MOVE          :string = "pointermove";
    static readonly POINTER_UP            :string = "pointerup";
    static readonly POINTER_CANCEL        :string = "pointercancel";
    static readonly POINTER_OUT           :string = "pointerout";
    static readonly POINTER_LEAVE         :string = "pointerleave";
    static readonly GOT_POINTERCAPTURE    :string = "gotpointercapture";
    static readonly LOST_POINTERCAPTURE   :string = "lostpointercapture";

    // Animation, Transition Events
    static readonly ANIMATION_CANCEL      :string = "animationcancel";
    static readonly ANIMATION_END         :string = "animationend";
    static readonly ANIMATION_ITERATION   :string = "animationiteration";
    static readonly ANIMATION_START       :string = "animationstart";
    static readonly TRANSITION_CANCEL     :string = "transitioncancel";
    static readonly TRANSITION_END        :string = "transitionend";
    static readonly TRANSITION_RUN        :string = "transitionrun";
    static readonly TRANSITION_START      :string = "transitionstart";

    // Promise Rejection Events
    static readonly REJECTION_HANDLED     :string = "rejectionhandled";
    static readonly UNHANDLED_REJECTION   :string = "unhandledrejection";

    // Gamepad Events
    static readonly GAMEPAD_CONNECTED     :string = "gamepadconnected";
    static readonly GAMEPAD_DISCONNECTED  :string = "gamepaddisconnected";

    // Manifest Events
    static readonly APP_INSTALLED         :string = "appinstalled";
    static readonly BEFORE_INSTALL_PROMPT :string = "beforeinstallprompt";

    // Mouse Force Events
    static readonly WEBKIT_MOUSE_FORCE_CHANGED      :string = "webkitmouseforcechanged";
    static readonly WEBKIT_MOUSE_FORCE_DOWN         :string = "webkitmouseforcedown";
    static readonly WEBKIT_MOUSE_FORCE_WILLBEGIN    :string = "webkitmouseforcewillbegin";
    static readonly WEBKIT_MOUSE_FORCE_UP           :string = "webkitmouseforceup";

    // Web VR Events
    static readonly VR_DISPLAY_ACTIVATE             :string = "vrdisplayactivate";
    static readonly VR_DISPLAY_BLUR                 :string = "vrdisplayblur";
    static readonly VR_DISPLAY_CONNECT              :string = "vrdisplayconnect";
    static readonly VR_DISPLAY_DEACTIVATE           :string = "vrdisplaydeactivate";
    static readonly VR_DISPLAY_DISCONNECT           :string = "vrdisplaydisconnect";
    static readonly VR_DISPLAY_FOCUS                :string = "vrdisplayfocus";
    static readonly VR_DISPLAY_PRESENT_CHANGE       :string = "vrdisplaypresentchange";
    static readonly VR_DISPLAY_POINTER_RESTRICTED   :string = "vrdisplaypointerrestricted";
    static readonly VR_DISPLAY_POINTER_UNRESTRICTED :string = "vrdisplaypointerunrestricted";

    private static _allEvents:Map<any, {[key:string]:Event24Core[]}> = new Map<any, {[key:string]:Event24Core[]}>();

    private _eventCores:Event24Core[];

    constructor () {
        this._eventCores = [];
    }

    private _addEventCore(core:Event24Core) {
        this._eventCores.push(core);
    }

    /**
     * イベントリスナーを設定します。
     * @memberof Event24
     */
    setEventListener() {
        for (const eventCore of this._eventCores) {
            eventCore.setEventListener();
        }
    }

    /**
     * イベントリスナーを解除します。
     * @memberof Event24
     */
    removeEventListener() {
        for (const eventCore of this._eventCores) {
            eventCore.removeEventListener();
        }
    }

    /**
     * 設定したトゥイーンを停止させるイベントを設定します。
     * @param {(string|string[])} eventType トゥイーンを停止するイベントタイプ
     * @memberof Event24
     */
    addStopEvent(eventType:string|string[]):Event24 {
        for (const eventCore of this._eventCores) {
            eventCore.addStopEvent(eventType);
        }
        return this;
    }

    willChange(use:boolean):Event24 {
        for (const eventCore of this._eventCores) {
            eventCore.willChange(use);
        }
        return this;
    }



    // ------------------------------------------
    //
    // Static Method
    //
    // ------------------------------------------

    /**
     * イベントに合わせて再生されるトゥイーンを設定します。
     * @static
     * @param {(any|any[])} target イベントの対象
     * @param {(string|string[])} eventType トゥイーンを再生するイベントタイプ
     * @param {Tween24} tween イベントに合わせて再生されるトゥイーン
     * @memberof Event24
     */
    public static add(target:any|any[], eventType:string|string[], tween:Tween24):Event24 {
        
        const event:Event24 = new Event24();
        const eventTypes = Array.isArray(eventType) ? eventType : [eventType];

        if (ClassUtil.isString(target)) {
            target = String(target).split(",");
        }

        for (const type of eventTypes) {
            if (Array.isArray(target)) {
                if (ClassUtil.isString(target[0])) {
                    for (const query of target) {
                        for (const eventTarget of HTMLUtil.querySelectorAll(query)) {
                            event._addEventCore(Event24._create(eventTarget, query, type, tween));
                        }
                    }
                }
                else {
                    for (const eventTarget of target) {
                        event._addEventCore(Event24._create(eventTarget, null, type, tween));
                    }
                }
            }
            else {
                event._addEventCore(Event24._create(target, null, type, tween));
            }
        }

        return event;
    }

    private static _create(target:HTMLElement|any, query:string|null, eventType:string, tween:Tween24):Event24Core {

        let events = Event24._allEvents.get(target);
        if (!events) {
            events = {};
            Event24._allEvents?.set(target, events);
        }
        const core = new Event24Core(target, query, eventType, tween);
        core.setEventListener();

        let cores = events[eventType];
        if (!cores) cores = events[eventType] = [];
        cores.push(core);
        return core;
    }

    /**
     * 対象に設定されたイベントを解除します。
     * @static
     * @param {(any|any[])} target イベントの対象
     * @param {(string|string[])} eventType トゥイーンを再生するイベントタイプ
     * @memberof Event24
     */
    public static remove(target:any|any[], eventType:string|string[]):void {
        const eventTypes = Array.isArray(eventType) ? eventType : [eventType];

        for (const t of Event24._getEventTarget(target)) {
            let events = Event24._allEvents.get(t);
            if (events) {
                for (const type of eventTypes) {
                    let cores = events[type];
                    if (cores) {
                        for (const core of cores) {
                            core.removeEventListener();
                        }
                        delete events[type];
                    }
                }
            }
        }
    }

    /**
     * 対象のイベントをすべて解除します。
     * @static
     * @param {(any|any[])} target イベントの対象
     * @memberof Event24
     */
    public static removeAllByTarget(target:any|any[]):void {
        for (const t of Event24._getEventTarget(target)) {
            let events = Event24._allEvents.get(t);
            if (events) {
                for (const type in events) {
                    for (const core of events[type]) {
                        core.removeEventListener();
                    }
                    delete events[type];
                }
            }
            Event24._allEvents.delete(t);
        }
    }

    /**
     * 設定したすべてのイベントを解除します。
     * @static
     * @memberof Event24
     */
    public static removeAll():void {
        Event24._allEvents.forEach(function(events, target) {
            for (const type in events) {
                for (const core of events[type]) {
                    core.removeEventListener();
                }
                delete events[type];
            }
            Event24._allEvents.delete(target);
        });
    }

    private static _getEventTarget(target:any):any[] {
        let eventTarget:any[] = [];
        if (ClassUtil.isString(target)) {
            target = String(target).split(",");
        }
        if (Array.isArray(target)) {
            if (ClassUtil.isString(target[0])) {
                for (const t of target) {
                    eventTarget = eventTarget.concat(HTMLUtil.querySelectorAll(t));
                }
            }
            else {
                eventTarget = target;
            }
        }
        else {
            eventTarget.push(target);
        }
        return eventTarget;
    }
}