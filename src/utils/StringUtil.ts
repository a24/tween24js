export class StringUtil {
    static toCamel(value:string):string {
        value = value.charAt(0).toLowerCase() + value.slice(1);
        return value.replace(/[-_](.)/g, function (match, p) {
            return p.toUpperCase();
        });
    }

    static toSnake(value:string) {
        const camel = StringUtil.toCamel(value);
        return camel.replace(/[A-Z]/g, function (match) {
            return "_" + match.charAt(0).toLowerCase();
        });
    }

    static toKebab(value:string) {
        const camel = StringUtil.toCamel(value);
        return camel.replace(/[A-Z]/g, function (match) {
            return "-" + match.charAt(0).toLowerCase();
        });
    }
}