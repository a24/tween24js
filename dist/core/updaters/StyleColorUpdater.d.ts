export declare class StyleColorUpdater {
    private _key;
    private _color;
    private _r;
    private _g;
    private _b;
    constructor(key: string, colorCode: string);
    init(start: string): void;
    update(progress: number): string;
    getDelta(): number;
    clone(): StyleColorUpdater;
    toString(): string;
}
