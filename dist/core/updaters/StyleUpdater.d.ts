import { Updater } from "./Updater";
export declare class StyleUpdater implements Updater {
    static className: string;
    static readonly PARAM_REG: RegExp;
    static readonly UNIT_REG: RegExp;
    private _target;
    private _param;
    private _key;
    private _unit;
    private _tweenKey;
    private _onceParam;
    private _isUpdatedOnce;
    constructor(target: any);
    addPropStr(key: string, value: string): void;
    init(): void;
    update(progress: number): void;
    overwrite(updater: StyleUpdater): void;
    getMaxAbsDelta(): number;
    clone(target?: any): StyleUpdater;
    toString(): string;
    addProp(key: string, value: number): void;
    complete(): void;
}
