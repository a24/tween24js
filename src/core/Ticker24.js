import ArrayUtil from "../utils/ArrayUtil";
var Ticker24 = /** @class */ (function () {
    function Ticker24() {
        this._fps = 0;
        this._timer = 0;
        this._beforeTime = 0;
        this._running = false;
        this._allTweens = [];
    }
    Ticker24.prototype.start = function () {
        this._running = true;
        var self = this;
        this._timer = window.requestAnimationFrame(function () { self.update(); });
    };
    Ticker24.prototype.stop = function () {
        this._running = false;
        window.cancelAnimationFrame(this._timer);
    };
    Ticker24.prototype.add = function (tween) {
        this._allTweens.push(tween);
        if (!this._running)
            this.start();
    };
    Ticker24.prototype.remove = function (tween) {
        ArrayUtil.removeItemFromArray(this._allTweens, tween);
        if (this._allTweens.length == 0) {
            this.stop();
        }
    };
    Ticker24.prototype.update = function () {
        var nowTime = Ticker24.getTime();
        var tickerCheck = this._fps ? this._checkInterval(this._fps, this._beforeTime, nowTime) : true;
        for (var _i = 0, _a = this._allTweens; _i < _a.length; _i++) {
            var tween = _a[_i];
            if (tween.__fps) {
                if (this._checkInterval(tween.__fps, tween.__beforeTime, nowTime)) {
                    tween._update(nowTime);
                    tween.__beforeTime = nowTime;
                }
            }
            else if (tickerCheck) {
                tween._update(nowTime);
            }
        }
        if (tickerCheck) {
            this._beforeTime = nowTime;
        }
        if (this._running) {
            var self = this;
            this._timer = window.requestAnimationFrame(function () { self.update(); });
        }
    };
    Object.defineProperty(Ticker24.prototype, "fps", {
        set: function (value) {
            this._fps = value;
        },
        enumerable: false,
        configurable: true
    });
    Ticker24.prototype._checkInterval = function (fps, beforeTime, nowTime) {
        var interval = 1000 / fps;
        if (nowTime - beforeTime >= interval)
            return true;
        else
            return false;
    };
    Ticker24.getTime = function () {
        return Date.now() || new Date().getTime();
    };
    return Ticker24;
}());
export { Ticker24 };
export default Ticker24;
