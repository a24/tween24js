import { Tween24 } from "../Tween24";
export declare class Ticker24 {
    private _fps;
    private _timer;
    private _beforeTime;
    private _running;
    private _firstTween;
    private _lastTween;
    private _lastPlayTime;
    constructor();
    start(): void;
    stop(): void;
    add(tween: Tween24): void;
    remove(tween: Tween24): void;
    update: () => void;
    setPlayTIme(): number;
    getLastPLayTime: () => number;
    set fps(value: number);
    private _checkInterval;
    static getTime(): number;
}
