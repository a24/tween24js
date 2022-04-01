export declare class MultiParamUpdater {
    private static _chache;
    private _target;
    private _key;
    private _type;
    private _params;
    private _updater;
    private _numParams;
    private _chache;
    private _separator;
    private _numParams2;
    private _params2;
    private _updater2;
    constructor(target: HTMLElement, key: string, type: string, numParam: number, separator?: string | null, numParam2?: number);
    init: (start: string) => void;
    private _setParams;
    addPropStr: (index: number, value: string) => void;
    addPropStr2: (index: number, value: string) => void;
    update: (progress: number) => string;
    overwrite: (updater: MultiParamUpdater) => void;
    getDelta: () => number;
    clone: (target: HTMLElement) => MultiParamUpdater;
    toString: () => string;
    get key(): string;
}
