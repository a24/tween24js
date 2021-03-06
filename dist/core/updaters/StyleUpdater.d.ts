import { Updater } from "./Updater";
export declare class StyleUpdater implements Updater {
    static className: string;
    static readonly PARAM_REG: RegExp;
    static readonly UNIT_REG: RegExp;
    private _target;
    private _query;
    private _param;
    private _key;
    private _unit;
    private _tweenKey;
    private _onceParam;
    private _isUpdatedOnce;
    private _pseudo;
    private _style;
    private _useWillChange;
    constructor(target: HTMLElement, query: string | null);
    addPropStr(key: string, value: string): void;
    init(useWillChange: boolean): void;
    update(progress: number): void;
    overwrite(updater: StyleUpdater): void;
    getMaxAbsDelta(): number;
    clone(target?: any, query?: string | null): StyleUpdater;
    toString(): string;
    addProp(key: string, value: number): void;
    complete(): void;
}
