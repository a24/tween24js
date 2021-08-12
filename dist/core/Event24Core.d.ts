import { Tween24 } from "./../Tween24";
export declare class Event24Core {
    private _target;
    private _playEventType;
    private _stopEventType;
    private _tween;
    private _callback;
    constructor(target: any, query: string | null, playEventType: string, tween: Tween24 | null, callback: Function | null);
    setEventListener(): void;
    removeEventListener(): void;
    addStopEvent(stopEventType: string | string[]): void;
    willChange(use: boolean): this;
    private _playHandler;
    private _stopHandler;
}
