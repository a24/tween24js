import ParamUpdater from "./ParamUpdater";
import HTMLUtil from "../../utils/HTMLUtil";
var StyleUpdater = /** @class */ (function () {
    function StyleUpdater(target) {
        this._target = target;
        this._param = null;
        this._key = null;
        this._unit = null;
        this._tweenKey = null;
        this._onceParam = null;
        this._isUpdatedOnce = false;
    }
    StyleUpdater.prototype.addPropStr = function (key, value) {
        var val = String(value).match(StyleUpdater.PARAM_REG);
        var unit = String(value).match(StyleUpdater.UNIT_REG);
        if (val) {
            this._param || (this._param = {});
            this._key || (this._key = []);
            this._unit || (this._unit = {});
            this._param[key] = new ParamUpdater(key, Number(val));
            this._unit[key] = unit ? unit[0] : "";
            this._key.push(key);
        }
        else {
            this._onceParam || (this._onceParam = {});
            this._onceParam[key] = value;
        }
    };
    StyleUpdater.prototype.init = function () {
        var _a;
        this._isUpdatedOnce = false;
        if (this._key && this._param && this._unit) {
            this._tweenKey = this._key.concat();
            for (var _i = 0, _b = this._tweenKey; _i < _b.length; _i++) {
                var key = _b[_i];
                var value = HTMLUtil.getStyle(this._target).getPropertyValue(key);
                var val = value.match(StyleUpdater.PARAM_REG);
                var unit = value.match(StyleUpdater.UNIT_REG);
                (_a = this._unit)[key] || (_a[key] = unit ? unit[0] : "");
                if (val)
                    this._param[key].init(Number(val));
            }
        }
    };
    StyleUpdater.prototype.update = function (progress) {
        if (!this._isUpdatedOnce) {
            for (var key in this._onceParam) {
                HTMLUtil.setStyleProp(this._target, key, this._onceParam[key]);
            }
            this._isUpdatedOnce = true;
        }
        if (this._tweenKey && this._param && this._unit) {
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
    StyleUpdater.prototype.toString = function () {
        var str = "";
        if (this._param && this._key)
            for (var _i = 0, _a = this._key; _i < _a.length; _i++) {
                var key = _a[_i];
                str += this._param[key].toString() + " ";
            }
        for (var key in this._onceParam)
            str += key + ":" + this._onceParam[key].toString() + " ";
        return str.trim();
    };
    StyleUpdater.prototype.addProp = function (key, value) {
    };
    StyleUpdater.prototype.complete = function () {
    };
    StyleUpdater.PARAM_REG = new RegExp(/^[0-9.]{1,99}/);
    StyleUpdater.UNIT_REG = new RegExp(/[^0-9.]./);
    return StyleUpdater;
}());
export { StyleUpdater };
export default StyleUpdater;
