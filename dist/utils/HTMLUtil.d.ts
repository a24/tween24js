export declare class HTMLUtil {
    private static readonly _ATTR;
    private static _numTweenElement;
    private static _tweenStyle;
    static getHTMLElement(classOrNameOrID: string): HTMLElement[];
    static querySelectorAll(query: string): never[];
    static querySelectorAllWithBase(base: HTMLElement, query: string): never[];
    static isPseudoQuery(query: string): boolean;
    static getPseudoQuery(query: string): string | null;
    static setStyleProp(element: HTMLElement, prop: string, value: string | number): void;
    static getComputedStyle(element: HTMLElement, pseudo?: string | null): CSSStyleDeclaration;
    static getTransformMatrix(element: HTMLElement, pseudo?: string | null): string;
    static setTweenElementQuery(target: HTMLElement | HTMLElement[], query: string): void;
    static getAddedStyleByElement(element: HTMLElement, pseudo: string): CSSStyleDeclaration | undefined;
    static getTweenElementQuery(elementOrID: string | number | HTMLElement, pseudo: string): string;
}
