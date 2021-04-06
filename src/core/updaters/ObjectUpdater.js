var ObjectUpdater = /** @class */ (function () {
    function ObjectUpdater(target) {
        this._target = target;
        this._key = [];
        this._tweenKey = null;
        this._param = {};
        this._startParam = {};
        this._deltaParam = {};
    }
    ObjectUpdater.prototype.addProp = function (key, value) {
        this._param[key] = value;
        this._key.push(key);
    };
    ObjectUpdater.prototype.addPropStr = function (key, value) {
    };
    ObjectUpdater.prototype.init = function () {
        this._tweenKey = this._key.concat();
        for (var _i = 0, _a = this._tweenKey; _i < _a.length; _i++) {
            var key = _a[_i];
            this._startParam[key] = this._target[key];
            this._deltaParam[key] = this._param[key] - this._target[key];
        }
    };
    ObjectUpdater.prototype.update = function (progress) {
        if (this._tweenKey) {
            for (var _i = 0, _a = this._tweenKey; _i < _a.length; _i++) {
                var key = _a[_i];
                this._target[key] = this._startParam[key] + this._deltaParam[key] * progress;
            }
        }
    };
    ObjectUpdater.prototype.overwrite = function (updater) {
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
    ObjectUpdater.prototype.complete = function () {
    };
    ObjectUpdater.prototype.toString = function () {
        var str = "";
        for (var _i = 0, _a = this._key; _i < _a.length; _i++) {
            var key = _a[_i];
            str += key + ":" + this._param[key] + " ";
        }
        return str.trim();
    };
    ObjectUpdater.className = "ObjectUpdater";
    return ObjectUpdater;
}());
export { ObjectUpdater };
export default ObjectUpdater;
