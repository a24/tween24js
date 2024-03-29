import { Updater } from "./Updater";
export declare class TransformUpdater implements Updater {
    static className: string;
    private static _chache;
    private static _pseudoChache;
    private _target;
    private _query;
    private _pseudo;
    private _style;
    private _tweenQuery;
    private _useWillChange;
    private _matrix;
    private _x;
    private _y;
    private _scaleX;
    private _scaleY;
    private _skewX;
    private _skewY;
    private _rotation;
    private _percentX;
    private _percentY;
    constructor(target: HTMLElement, query: string | null);
    init(useWillChange: boolean): void;
    addProp(key: string, value: number, option?: string | null): void;
    addPropStr(key: string, value: string): void;
    setBezier(bezierX: number, bezierY: number): void;
    update(progress: number): void;
    private _getChache;
    private _setChache;
    private _deleteChache;
    overwrite(updater: TransformUpdater): void;
    complete(): void;
    getMaxAbsDelta(): number;
    clone(target?: HTMLElement, query?: string | null): TransformUpdater;
    toString(): string;
}
