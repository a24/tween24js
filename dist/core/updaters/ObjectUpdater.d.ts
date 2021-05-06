import { Updater } from "./Updater";
export declare class ObjectUpdater implements Updater {
    static className: string;
    private _target;
    private _key;
    private _tweenKey;
    private _param;
    private _startParam;
    private _deltaParam;
    constructor(target: any);
    addProp(key: string, value: number): void;
    addPropStr(key: string, value: string): void;
    init(): void;
    update(progress: number): void;
    overwrite(updater: ObjectUpdater): void;
    getMaxAbsDelta(): number;
    clone(target?: any): ObjectUpdater;
    toString(): string;
    complete(): void;
}
