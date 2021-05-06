import { Tween24 } from "./Tween24";
import { ClassUtil } from "./utils/ClassUtil";
import { HTMLUtil } from "./utils/HTMLUtil";

export class Event24 {
    static readonly MOUSE_OVER  :string = "mouseover";
    static readonly MOUSE_OUT   :string = "mouseout";
    static readonly MOUSE_ENTER :string = "mouseenter";
    static readonly MOUSE_LEAVE :string = "mouseleave";
    static readonly MOUSE_MOVE  :string = "mousemove";
    static readonly MOUSE_UP    :string = "mouseleave";
    static readonly MOUSE_DOWN  :string = "mouseleave";
    static readonly CLICK       :string = "click";
    static readonly DOUBLE_CLICK:string = "dblclick";

    static readonly TOUCH_START :string = "touchstart";
    static readonly TOUCH_END   :string = "touchend";
    static readonly TOUCH_MOVE  :string = "touchmove";
    static readonly TOUCH_CANCEL:string = "touchcancel";

    private static _allEvents:Map<any, {[key:string]:Event24}> = new Map<any, {[key:string]:Event24}>();
    
    private _target       :any;
    private _playEventType:string;
    private _stopEventType:string[]|null;
    private _playHandler  :Function;
    private _stopHandler  :Function|null;
    private _tween        :Tween24;

    constructor (target:any, query:string, playEventType:string, stopEventType:string[]|null, tween:Tween24) {
        this._target        = target;
        this._playEventType = playEventType;
        this._stopEventType = stopEventType;

        this._tween = (target instanceof HTMLElement) ? tween.__clone(target, query) : tween;
        this._playHandler   = this._play.bind(this);
        this._stopHandler   = this._stop.bind(this);
    }

    public setEventListener() {
        if (this._stopEventType) {
            for (const type of this._stopEventType) {
                this._target.addEventListener(type, this._stopHandler, false);
            }
        }
        this._target.addEventListener(this._playEventType, this._playHandler, false);
    }

    public removeEventListener() {
        if (this._stopEventType) {
            for (const type of this._stopEventType) {
                this._target.removeEventListener(type, this._stopHandler, false);
            }
        }
        this._target.removeEventListener(this._playEventType, this._playHandler, false);
    }

    private _play(event:Event):void {
        this._tween.play();
    }

    private _stop(event:Event):void {
        this._tween.stop();
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
     * @param {(string|string[])} playEventType トゥイーンを再生するイベントタイプ
     * @param {Tween24} tween イベントに合わせて再生されるトゥイーン
     * @memberof Event24
     */
    public static add(target:any|any[], playEventType:string|string[], tween:Tween24):void {
        Event24.addWithStopEvent(target, playEventType, null, tween);
    }

    /**
     * イベントに合わせて再生、停止されるトゥイーンを設定します。
     * @static
     * @param {(any|any[])} target イベントの対象
     * @param {(string|string[])} playEventType トゥイーンを再生するイベントタイプ
     * @param {(string|string[]|null)} stopEventType トゥイーンを停止するイベントタイプ
     * @param {Tween24} tween イベントに合わせて再生されるトゥイーン
     * @memberof Event24
     */
    public static addWithStopEvent(target:any|any[], playEventType:string|string[], stopEventType:string|string[]|null, tween:Tween24):void {

        const playEventTypes = Array.isArray(playEventType) ? playEventType : [playEventType];
        const stopEventTypes = stopEventType ? (Array.isArray(stopEventType) ? stopEventType : [stopEventType]) : null;

        if (ClassUtil.isString(target)) {
            target = target.split(",");
        }

        if (Array.isArray(target) && ClassUtil.isString(target[0])) {
            for (const query of target) {
                Event24._add(query, query, playEventTypes, stopEventTypes, tween);
            }
        }
        else {
            Event24._add(target, "", playEventTypes, stopEventTypes, tween);
        }
    }

    private static _add(target:any, query:string, playEventTypes:string[], stopEventTypes:string[]|null, tween:Tween24):void {
        for (const t of Event24._getEventTarget(target)) {
            let events = Event24._allEvents.get(t);
            if (!events) {
                events = {};
                Event24._allEvents?.set(t, events);
            }
            for (const type of playEventTypes) {
                const event = new Event24(t, query, type, stopEventTypes, tween);
                event.setEventListener();
                events[type] = event;
            }
        }
    }

    /**
     * 対象に設定されたイベントを解除します。
     * @static
     * @param {(any|any[])} target イベントの対象
     * @param {(string|string[])} playEventType トゥイーンを再生するイベントタイプ
     * @memberof Event24
     */
    public static remove(target:any|any[], playEventType:string|string[]):void {

        const eventTypes = Array.isArray(playEventType) ? playEventType : [playEventType];

        for (const t of Event24._getEventTarget(target)) {
            let events = Event24._allEvents.get(t);
            if (events) {
                for (const type of eventTypes) {
                    events[type]?.removeEventListener();
                    delete events[type];
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
                    events[type]?.removeEventListener();
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
                events[type]?.removeEventListener();
            }
            Event24._allEvents.delete(target);
        });
    }

    private static _getEventTarget(target:any):any[] {
        let eventTarget:any[] = [];
        if (Array.isArray(target)) {
            if (ClassUtil.isString(target[0])) {
                for (const t of target)
                    eventTarget.concat(HTMLUtil.querySelectorAll(t));
            }
            else {
                eventTarget = target;
            }
        }
        else if (ClassUtil.isString(target)) {
            eventTarget = HTMLUtil.querySelectorAll(target);
        }
        else {
            eventTarget.push(target);
        }
        return eventTarget;
    }
}