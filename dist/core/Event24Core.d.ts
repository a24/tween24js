import { Tween24 } from "./../Tween24";
export declare class Event24Core {
    private _target;
    private _playEventType;
    private _stopEventType;
    private _playHandler;
    private _stopHandler;
    private _tween;
    constructor(target: any, query: string | null, playEventType: string, tween: Tween24);
    setEventListener(): void;
    removeEventListener(): void;
    addStopEvent(stopEventType: string | string[]): void;
    private _play;
    private _stop;
}
