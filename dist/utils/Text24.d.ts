export declare class Text24 {
    private static _allTexts;
    private _target;
    private _text;
    private _height;
    private _spacing;
    private _originalOverflow;
    private _spans;
    constructor(target: HTMLElement, text: string, overflowHidden: boolean, double: boolean);
    reset(): void;
    set spacing(spacing: number);
    set overflowHidden(flag: boolean);
    set double(flag: boolean);
    get targets(): HTMLSpanElement[];
    get height(): number;
    static getInstance(target: HTMLElement): Text24 | undefined;
    static removeByTarget(targetQuery: string): void;
    static removeAll(): void;
}
