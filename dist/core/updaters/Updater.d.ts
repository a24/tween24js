import { MultiUpdater } from "./MultiUpdater";
export interface Updater {
    constructor: Function;
    init(useWillChange: boolean): void;
    complete(): void;
    toString(): string;
    clone(target: any, query: string | null): Updater;
    update(progress: number): void;
    addProp(key: string, value: number): void;
    addPropStr(key: string, value: string): void;
    overwrite(updater: Updater | MultiUpdater): void;
    getMaxAbsDelta(): number;
}
