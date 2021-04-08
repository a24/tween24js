export declare class HTMLUtil {
    static getHTMLElement(classOrNameOrID: string): HTMLElement[];
    static querySelectorAll(query: string): never[];
    static setStyleProp(element: HTMLElement, prop: string, value: string | number): void;
    static setStylePropToMultiTarget(target: HTMLElement[], prop: string, value: string | number): HTMLElement[];
    static setTransformMatrix(element: HTMLElement, transform: string): void;
    static getStyle(element: HTMLElement): CSSStyleDeclaration;
    static getTransformMatrix(element: HTMLElement): string;
}
