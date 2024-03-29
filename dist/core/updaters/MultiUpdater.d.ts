import { Updater } from "./Updater";
export declare class MultiUpdater implements Updater {
    static type: string;
    private _targets;
    private _query;
    private _updaters;
    private _updaterType;
    constructor(targets: any[], query: string | null);
    setupByType(updaterType: string): MultiUpdater;
    setupByUpdater(updater: Updater): MultiUpdater;
    private _getUpdaterInstance;
    addProp(key: string, value: number, option?: string | null): void;
    addPropStr(key: string, value: string, option?: string | null): void;
    setBezier(bezierX: number, bezierY: number): void;
    init(useWillChange: boolean): void;
    update(progress: number): void;
    overwrite(updater: Updater): void;
    overwriteTo(target: Updater): void;
    overwriteMultiTo(multiUpdater: MultiUpdater): void;
    complete(): void;
    getMaxAbsDelta(): number;
    clone(target?: any, query?: string | null): Updater;
    toString(): string;
}
