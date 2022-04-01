export declare class StringUtil {
    static readonly UNIT_REG: RegExp;
    static toCamel: (value: string) => string;
    static toSnake: (value: string) => string;
    static toKebab: (value: string) => string;
    static addUnit: (value: number | string, unit?: string) => string;
    static getUnit: (value: string) => string;
}
