export declare class StyleFilterUpdater {
    private _target;
    private _key;
    private _blur;
    private _brightness;
    private _contrast;
    private _grayscale;
    private _hue;
    private _invert;
    private _opacity;
    private _saturate;
    private _sepia;
    private _shadow;
    constructor(target: HTMLElement);
    init: (start: string) => void;
    addPropStr: (key: string, value: string) => void;
    private _getUpdater;
    update: (progress: number) => string;
    overwrite: (updater: StyleFilterUpdater) => void;
    getDelta: () => number;
    clone: (target: HTMLElement) => StyleFilterUpdater;
    toString: () => string;
    get key(): string;
}
