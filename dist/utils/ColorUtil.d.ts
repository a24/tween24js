export declare class ColorUtil {
    /**
     * カラーコードからRGBの配列を返します。
     * @static
     * @param {string} colorCode
     * @memberof ColorUtil
     */
    static getRGBList(colorCode: string): number[];
    private static _regColor;
    private static _regRGB;
    static isColorCode(value: string): boolean;
}
