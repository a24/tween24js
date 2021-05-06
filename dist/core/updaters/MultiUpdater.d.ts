import { Updater } from "./Updater";
export declare class MultiUpdater implements Updater {
    static type: string;
    private _updaters;
    private _updaterType;
    private _targets;
    constructor(targets: any[], updaterType: string | null, updater: Updater | null);
    private _getUpdaterInstance;
    addProp(key: string, value: number): void;
    addPropStr(key: string, value: string): void;
    init(): void;
    update(progress: number): void;
    overwrite(updater: Updater): void;
    overwriteTo(target: Updater): void;
    overwriteMultiTo(multiUpdater: MultiUpdater): void;
    complete(): void;
    getMaxAbsDelta(): number;
    clone(target?: any): Updater;
    toString(): string;
}
