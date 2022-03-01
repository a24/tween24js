import { Updater } from "./Updater";
export declare class ObjectUpdater implements Updater {
    static className: string;
    private _target;
    private _keys;
    private _tweenKeys;
    private _paramUpdaters;
    constructor(target: any);
    addProp(key: string, value: number, option?: string | null): void;
    addPropStr(key: string, value: string): void;
    setBezier(bezierX: number, bezierY: number): void;
    init(useWillChange: boolean): void;
    update(progress: number): void;
    overwrite(updater: ObjectUpdater): void;
    getMaxAbsDelta(): number;
    clone(target?: any): ObjectUpdater;
    toString(): string;
    complete(): void;
}
