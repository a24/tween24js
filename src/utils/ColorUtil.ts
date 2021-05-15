export class ColorUtil {
    /**
     * カラーコードからRGBの配列を返します。
     * @static
     * @param {string} colorCode
     * @memberof ColorUtil
     */
    static getRGBList(colorCode:string):number[] {
        if (colorCode.substr(0, 1) == "#") {
            colorCode = colorCode.substring(1);
    
            if(colorCode.length === 3) {
                colorCode = colorCode.substr(0, 1).repeat(2) + colorCode.substr(1, 1).repeat(2) + colorCode.substr(2, 1).repeat(2);
            }
            const c:number = parseInt(colorCode, 16);
            return [c >> 16 & 0xFF, c >> 8 & 0xFF, c & 0xFF];
        }
        else if (colorCode.substr(0, 4) == "rgb(") {
            const rgb :RegExpMatchArray|null = colorCode.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
                return [Number(rgb[0]), Number(rgb[1]), Number(rgb[2])];
            }
            return [0, 0, 0];
        }
        else
            return [0, 0, 0];
    }
}