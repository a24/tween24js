var ObjectUpdater = /** @class */ (function () {
    function ObjectUpdater(target) {
        this._target = target;
        this._param = {};
        this._startParam = {};
        this._deltaParam = {};
        this._key = [];
    }
    ObjectUpdater.prototype.addProp = function (key, value) {
        var k = key;
        this._param[k] = value;
        this._key.push(k);
    };
    ObjectUpdater.prototype.init = function () {
        for (var _i = 0, _a = this._key; _i < _a.length; _i++) {
            var k = _a[_i];
            this._startParam[k] = this._target[k];
            this._deltaParam[k] = this._param[k] - this._target[k];
        }
    };
    ObjectUpdater.prototype.update = function (progress) {
        for (var _i = 0, _a = this._key; _i < _a.length; _i++) {
            var k = _a[_i];
            this._target[k] = this._startParam[k] + this._deltaParam[k] * progress;
        }
    };
    ObjectUpdater.prototype.complete = function () {
    };
    return ObjectUpdater;
}());
export { ObjectUpdater };
export default ObjectUpdater;
