import { Tween24 } from "./../Tween24";

export class Event24Core {
    private _target       :any;
    private _playEventType:string;
    private _stopEventType:string[]|null;
    private _playHandler  :Function;
    private _stopHandler  :Function|null;
    private _tween        :Tween24;

    constructor (target:any, query:string|null, playEventType:string, tween:Tween24) {
        this._target        = target;
        this._playEventType = playEventType;
        this._stopEventType = null;

        this._tween = (target instanceof HTMLElement) ? tween.__clone(target, query) : tween;
        this._playHandler = this._play.bind(this);
        this._stopHandler = this._stop.bind(this);
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

    private _play(event:Event):void {
        this._tween.play();
    }

    private _stop(event:Event):void {
        this._tween.stop();
    }
}