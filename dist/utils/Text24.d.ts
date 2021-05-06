export declare class Text24 {
    private static _allTexts;
    private _target;
    private _height;
    private _spacing;
    private _originalOverflow;
    private _originalWidth;
    private _spans;
    private _singleHtml;
    private _doubleHtml;
    constructor(target: HTMLElement, text: string, overflowHidden: boolean, double: boolean);
    set spacing(spacing: number);
    set overflowHidden(flag: boolean);
    set double(flag: boolean);
    get targets(): HTMLSpanElement[];
    get height(): number;
    static getInstance(target: HTMLElement): Text24 | undefined;
}
