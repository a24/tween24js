export class ClassUtil {
    static isString(value:any):boolean {
        return typeof value === "string";
    }
    static isNumber(value:any):boolean {
        return Number.isFinite(value);
    }
}

export default ClassUtil;