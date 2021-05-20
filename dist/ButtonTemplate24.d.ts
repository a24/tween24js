import { Tween24 } from "./index";
export declare class ButtonTemplate24 {
    private _inTween;
    private _stopInTween;
    private _outTween;
    private _stopOutTween;
    private _resizeFunc;
    private _resizeArgs;
    constructor();
    setInTween(tween: Tween24): void;
    setStopInTween(tween: Tween24): void;
    setOutTween(tween: Tween24): void;
    setStopOutTween(tween: Tween24): void;
    setResizeFunc(func: Function, ...args: any[]): void;
    onResize(): void;
    delay(inDelay: number, outDelay?: number): ButtonTemplate24;
    get inTween(): Tween24 | null;
    get outTween(): Tween24 | null;
    get stopInTween(): Tween24 | null;
    get stopOutTween(): Tween24 | null;
}
