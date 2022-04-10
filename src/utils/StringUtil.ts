import { ClassUtil } from "./ClassUtil";

export class StringUtil {
    static readonly UNIT_REG :RegExp = new RegExp(/[^-0-9.].*/);

    static toCamel = (value:string):string => {
        value = value.charAt(0).toLowerCase() + value.slice(1);
        return value.replace(/[-_](.)/g, function (match, p) {
            return p.toUpperCase();
        });
    }

    static toSnake = (value:string) => {
        const camel = StringUtil.toCamel(value);
        return camel.replace(/[A-Z]/g, function (match) {
            return "_" + match.charAt(0).toLowerCase();
        });
    }

    static toKebab = (value:string) => {
        const camel = StringUtil.toCamel(value);
        return camel.replace(/[A-Z]/g, function (match) {
            return "-" + match.charAt(0).toLowerCase();
        });
    }

    static addUnit = (value:number|string, unit:string = "px"):string => {
        return ClassUtil.isString(value) ? String(value) : value + unit;
    }

    static getUnit = (value:string):string => {
        const unit = value.trim().match(StringUtil.UNIT_REG);
        return unit ? unit[0] : "";
    }
}