import ParamUpdater from "./ParamUpdater";
import HTMLUtil from "../../utils/HTMLUtil";
var StyleUpdater = /** @class */ (function () {
    function StyleUpdater(target) {
        this._target = target;
        this._param = {};
        this._key = [];
        this._unit = {};
        this._tweenKey = null;
    }
    StyleUpdater.prototype.addProp = function (key, value) {
    };
    StyleUpdater.prototype.addPropStr = function (key, value) {
        var v = String(value).match(StyleUpdater.PARAM_REG);
        var u = String(value).match(StyleUpdater.UNIT_REG);
        if (v) {
            this._param[key] = new ParamUpdater(key, Number(v));
            this._unit[key] = u ? u[0] : "";
            this._key.push(key);
        }
    };
    StyleUpdater.prototype.init = function () {
        var _a;
        var style = HTMLUtil.getStyle(this._target);
        this._tweenKey = this._key.concat();
        for (var _i = 0, _b = this._tweenKey; _i < _b.length; _i++) {
            var key = _b[_i];
            var value = HTMLUtil.getStyle(this._target).getPropertyValue(key);
            var v = value.match(StyleUpdater.PARAM_REG);
            var u = value.match(StyleUpdater.UNIT_REG);
            (_a = this._unit)[key] || (_a[key] = u ? u[0] : "");
            if (v)
                this._param[key].init(Number(v));
        }
    };
    StyleUpdater.prototype.update = function (progress) {
        if (this._tweenKey) {
            for (var _i = 0, _a = this._tweenKey; _i < _a.length; _i++) {
                var key = _a[_i];
                HTMLUtil.setStyleProp(this._target, key, this._param[key].update(progress) + this._unit[key]);
            }
        }
    };
    StyleUpdater.prototype.overwrite = function (updater) {
        if (this._target == updater._target) {
            var targetKey = updater._tweenKey;
            if (this._tweenKey && targetKey) {
                for (var _i = 0, targetKey_1 = targetKey; _i < targetKey_1.length; _i++) {
                    var key = targetKey_1[_i];
                    var i = this._tweenKey.indexOf(key);
                    if (i > -1)
                        this._tweenKey.splice(i, 1);
                }
            }
        }
    };
    StyleUpdater.prototype.complete = function () {
    };
    StyleUpdater.prototype.toString = function () {
        var str = "";
        for (var _i = 0, _a = this._key; _i < _a.length; _i++) {
            var key = _a[_i];
            str += this._param[key].toString() + " ";
        }
        return str.trim();
    };
    StyleUpdater.PARAM_REG = new RegExp(/^[0-9.]{1,99}/);
    StyleUpdater.UNIT_REG = new RegExp(/[^0-9.]./);
    return StyleUpdater;
}());
export { StyleUpdater };
export default StyleUpdater;
