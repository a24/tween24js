import { Tween24 }   from "../Tween24";

export class Ticker24 {
    private _fps         :number;
    private _timer       :number;
    private _beforeTime  :number;
    private _running     :boolean;
    private _firstTween  :Tween24|null;
    private _lastTween   :Tween24|null;
    private _lastPlayTime:number;

    constructor() {
        this._fps          = 0;
        this._timer        = 0;
        this._beforeTime   = 0;
        this._lastPlayTime = 0;
        this._running      = false;
        this._firstTween   = null;
        this._lastTween    = null;
    }

    start() {
        this._running = true;
        this._timer = window.requestAnimationFrame(() => { this.update() });
    }

    stop() {
        this._running = false;
        window.cancelAnimationFrame(this._timer);
    }

    add(tween:Tween24) {
        if (this._lastTween) {
            tween.__prev = this._lastTween;
            this._lastTween.__next = tween;
        }
        else {
            this._firstTween = tween;

        }
        this._lastTween = tween;

        if (!this._running) this.start();
    }

    remove(tween:Tween24) {
        if (tween.__prev) tween.__prev.__next = tween.__next;
        if (tween.__next) tween.__next.__prev = tween.__prev;

        if (this._firstTween == tween) {
            this._firstTween = tween.__next;
        }
        if (this._lastTween == tween) {
            this._lastTween = tween.__prev;
        }

        tween.__prev = tween.__next = null;

        if (!this._firstTween) this.stop();
    }

    update = () => {
        const nowTime = Ticker24.getTime();

        let tickerCheck = true;
        if (this._fps) {
            tickerCheck = this._checkInterval(this._fps, this._beforeTime, nowTime);
            this._beforeTime = nowTime;
        }

        let tween = this._firstTween;
        while (tween) {
            const next = tween.__next;
            if (!tween.__fps) {
                if (tickerCheck) {
                    tween.__update(nowTime);
                }
            }
            else if (this._checkInterval(tween.__fps, tween.__beforeTime, nowTime)) {
                tween.__update(nowTime);
                tween.__beforeTime = nowTime;
            }
            tween = next;
        }

        if (this._running) {
            this._timer = window.requestAnimationFrame(this.update);
        }
    }

    setPlayTIme():number {
        this._lastPlayTime = Ticker24.getTime();
        return this._lastPlayTime;
    }

    getLastPLayTime = ():number => {
        return this._lastPlayTime;
    }

    set fps(value:number) {
        this._fps = value;
    }

    private _checkInterval(fps:number, beforeTime:number, nowTime:number):boolean {
        const interval:number = 1000 / fps;
        if (nowTime - beforeTime >= interval) return true;
        else return false;
    }
    
    static getTime():number {
        return Date.now() || new Date().getTime();
    }
}