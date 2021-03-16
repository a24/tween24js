var ObjectUpdater = /** @class */ (function () {
    function ObjectUpdater(target) {
        this._target = target;
        this._param = {};
        this._startParam = {};
        this._deltaParam = {};
        this._key = [];
        this._tweenKey = null;
    }
    ObjectUpdater.prototype.addProp = function (key, value) {
        var k = key;
        this._param[k] = value;
        this._key.push(k);
    };
    ObjectUpdater.prototype.init = function () {
        this._tweenKey = this._key.concat();
        for (var _i = 0, _a = this._tweenKey; _i < _a.length; _i++) {
            var k = _a[_i];
            this._startParam[k] = this._target[k];
            this._deltaParam[k] = this._param[k] - this._target[k];
        }
    };
    ObjectUpdater.prototype.update = function (progress) {
        if (this._tweenKey) {
            for (var _i = 0, _a = this._tweenKey; _i < _a.length; _i++) {
                var k = _a[_i];
                this._target[k] = this._startParam[k] + this._deltaParam[k] * progress;
            }
        }
    };
    ObjectUpdater.prototype.overwrite = function (updater) {
        if (this._target == updater._target) {
            var targetKey = updater._tweenKey;
            if (this._tweenKey && targetKey) {
                for (var _i = 0, targetKey_1 = targetKey; _i < targetKey_1.length; _i++) {
                    var k = targetKey_1[_i];
                    var i = this._tweenKey.indexOf(k);
                    if (i > -1)
                        this._tweenKey.splice(i, 1);
                }
            }
        }
    };
    ObjectUpdater.prototype.complete = function () {
    };
    return ObjectUpdater;
}());
export { ObjectUpdater };
export default ObjectUpdater;
