import { Tween24 } from "./index";
export declare class ButtonTemplate24 {
    private _inTween;
    private _outTween;
    constructor();
    setInTween(tween: Tween24): void;
    setOutTween(tween: Tween24): void;
    delay(inDelay: number, outDelay?: number): ButtonTemplate24;
    get inTween(): Tween24 | null;
    get outTween(): Tween24 | null;
}
