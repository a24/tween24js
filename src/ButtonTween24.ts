import { Tween24 } from "./index";

export class ButtonTween24 {

    private _inTween     :Tween24|null;
    private _stopInTween :Tween24|null;
    private _outTween    :Tween24|null;
    private _stopOutTween:Tween24|null;
    private _resizeFunc  :Function|null;
    private _resizeArgs  :any[]|null;
    private _needResize  :boolean;

    constructor() {
        this._inTween      = null;
        this._stopInTween  = null;
        this._outTween     = null;
        this._stopOutTween = null;
        this._resizeFunc   = null;
        this._resizeArgs   = null;
        this._needResize   = false;
    }

    setInTween(tween:Tween24) {
        this._inTween = tween;
    }

    setStopInTween(tween:Tween24) {
        this._stopInTween = tween;
    }

    setOutTween(tween:Tween24) {
        this._outTween = tween;
    }

    setStopOutTween(tween:Tween24) {
        this._stopOutTween = tween;
    }

    setResizeFunc(func:Function, ...args:any[]) {
        this._resizeFunc = func;
        this._resizeArgs = args;
    }

    onResize() {
        this._resizeFunc?.apply(this._resizeFunc, this._resizeArgs);
    }

    delay(inDelay:number, outDelay:number = 0):ButtonTween24 {
        this._inTween     ?.delay(inDelay);
        this._stopInTween ?.delay(inDelay);
        this._outTween    ?.delay(outDelay);
        this._stopOutTween?.delay(outDelay);
        return this;
    }

    get inTween     ():Tween24|null { return this._inTween; }
    get outTween    ():Tween24|null { return this._outTween; }
    get stopInTween ():Tween24|null { return this._stopInTween; }
    get stopOutTween():Tween24|null { return this._stopOutTween; }

    get needResize()   :boolean  { return this._needResize; }
    set needResize(flag:boolean) { this._needResize = flag; }
}