import { Tween24 } from "./../Tween24";

export class Event24Core {
    private _target       :any;
    private _playEventType:string;
    private _stopEventType:string[]|null;
    private _tween        :Tween24|null;
    private _callback     :Function|null;

    constructor (target:any, query:string|null, playEventType:string, tween:Tween24|null, callback:Function|null) {
        this._target        = target;
        this._playEventType = playEventType;
        this._stopEventType = null;
        this._tween         = null;
        this._callback      = callback;

        if (tween)
            this._tween = (target instanceof HTMLElement) ? tween.__clone(target, query) : tween;
    }

    setEventListener() {
        if (this._stopEventType) {
            for (const type of this._stopEventType) {
                this._target.addEventListener(type, this._stopHandler, false);
            }
        }
        this._target.addEventListener(this._playEventType, this._playHandler, false);
    }

    removeEventListener() {
        if (this._stopEventType) {
            for (const type of this._stopEventType) {
                this._target.removeEventListener(type, this._stopHandler, false);
            }
        }
        this._target.removeEventListener(this._playEventType, this._playHandler, false);
    }

    addStopEvent(stopEventType:string|string[]) {
        this._stopEventType = Array.isArray(stopEventType) ? stopEventType : [stopEventType];
        if (this._stopEventType) {
            for (const type of this._stopEventType) {
                this._target.addEventListener(type, this._stopHandler, false);
            }
        }
    }

    willChange(use:boolean) {
        this._tween?.willChange(use);
        return this;
    }

    private _playHandler = (event:Event) => {
        if (this._callback) this._callback();
        this._tween?.play();
    }

    private _stopHandler = (event:Event) => {
        this._tween?.stop();
    }
}