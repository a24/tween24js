var HTMLUtil = /** @class */ (function () {
    function HTMLUtil() {
    }
    HTMLUtil.getHTMLElement = function (classOrNameOrID) {
        var result = [];
        switch (classOrNameOrID.charAt(0)) {
            case "#":
                var elt = document.getElementById(classOrNameOrID.substring(1));
                if (elt)
                    result.push(elt);
                break;
            case ".":
                Array.prototype.forEach.call(document.getElementsByClassName(classOrNameOrID.substring(1)), function (elt) {
                    result.push(elt);
                });
                break;
            default:
                Array.prototype.forEach.call(document.getElementsByName(classOrNameOrID), function (elt) {
                    result.push(elt);
                });
                break;
        }
        return result;
    };
    HTMLUtil.setStyleProp = function (element, prop, value) {
        element.style.setProperty(prop, value);
    };
    HTMLUtil.setStylePropToMultiTarget = function (target, prop, value) {
        for (var _i = 0, target_1 = target; _i < target_1.length; _i++) {
            var elt = target_1[_i];
            elt.style.setProperty(prop, value);
        }
        return target;
    };
    HTMLUtil.setTransformMatrix = function (element, transform) {
        HTMLUtil.setStyleProp(element, "transform", transform);
    };
    HTMLUtil.getTransformMatrix = function (element) {
        var t = window.getComputedStyle(element).transform;
        return t != "none" ? t : "matrix(1, 0, 0, 1, 0, 0)";
    };
    return HTMLUtil;
}());
export { HTMLUtil };
export default HTMLUtil;
