export declare class ParamUpdater {
    private _key;
    private _target;
    private _start;
    private _delta;
    private _value;
    constructor(key: string, value: number);
    init(start: number): void;
    update(progress: number): number;
    toString(): string;
}
