var ParamUpdater = /** @class */ (function () {
    function ParamUpdater(key, value) {
        this._key = key;
        this._target = value;
        this._start = 0;
        this._delta = 0;
        this._value = 0;
    }
    ParamUpdater.prototype.init = function (start) {
        this._start = start;
        this._delta = this._target - start;
        this._value = this._start;
    };
    ParamUpdater.prototype.update = function (progress) {
        this._value = this._start + this._delta * progress;
        return this._value;
    };
    ParamUpdater.prototype.toString = function () {
        return this._key + ":" + this._target;
    };
    return ParamUpdater;
}());
export { ParamUpdater };
