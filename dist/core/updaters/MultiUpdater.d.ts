import { Updater } from "./Updater";
export declare class MultiUpdater implements Updater {
    static type: string;
    private _updaters;
    private _updatersByTarget;
    constructor(targets: any[], UpdaterType: string);
    private getUpdaterInstance;
    addProp(key: string, value: number): void;
    addPropStr(key: string, value: string): void;
    init(): void;
    update(progress: number): void;
    overwrite(updater: Updater): void;
    overwriteTo(target: Updater): void;
    overwriteMultiTo(multiUpdater: MultiUpdater): void;
    complete(): void;
    toString(): string;
}
