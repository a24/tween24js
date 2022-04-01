export declare class ParamUpdater {
    static readonly RELATIVE_AT_SETTING: string;
    static readonly RELATIVE_AT_RUNNING: string;
    private _key;
    private _target;
    private _start;
    private _delta;
    private _value;
    private _$value;
    private _$$value;
    private _bezier;
    private _originalValue;
    private _unit;
    private _isActive;
    constructor(key: string, target: number, originalValue: number | string);
    setUnit: (unit: string) => void;
    unActive: () => void;
    init(start: number): void;
    update(progress: number): number;
    getDelta(): number;
    set$value($value: number): void;
    set$$value($$value: number): void;
    setBezier(bezier: number): void;
    clone(target?: number): ParamUpdater;
    toString(): string;
    /**
     * ベジェ曲線上にある値を取得します。
     * @param b	begin
     * @param e	end
     * @param t	time(0-1)
     * @param p	bezier params
     * @return	number
     */
    getBezier(b: number, e: number, t: number, p: number[]): number;
    get target(): number;
    get unit(): string;
    get bezier(): number[] | null;
    get originalValue(): number | string;
    get isActive(): boolean;
    get param(): string;
    get targetParam(): string;
}
