var ClassUtil = /** @class */ (function () {
    function ClassUtil() {
    }
    ClassUtil.isString = function (value) {
        return typeof value === "string";
    };
    ClassUtil.isNumber = function (value) {
        return Number.isFinite(value);
    };
    return ClassUtil;
}());
export { ClassUtil };
export default ClassUtil;
