import ArrayUtil from "../utils/ArrayUtil";
var Ticker24 = /** @class */ (function () {
    function Ticker24() {
        this.fps = 0;
        this.timer = 0;
        this.beforeTime = 0;
        this.running = false;
        this.allTweens = [];
    }
    Ticker24.prototype.start = function () {
        this.running = true;
        var self = this;
        this.timer = window.requestAnimationFrame(function () { self.update(); });
    };
    Ticker24.prototype.stop = function () {
        this.running = false;
        window.cancelAnimationFrame(this.timer);
    };
    Ticker24.prototype.add = function (tween) {
        this.allTweens.push(tween);
        if (!this.running)
            this.start();
    };
    Ticker24.prototype.remove = function (tween) {
        var allTweens = this.allTweens;
        ArrayUtil.removeItemFromArray(allTweens, tween);
        if (allTweens.length == 0) {
            this.stop();
        }
    };
    Ticker24.prototype.update = function () {
        var nowTime = Ticker24.getTime();
        var tickerCheck = this.fps ? this.checkInterval(this.fps, this.beforeTime, nowTime) : true;
        for (var _i = 0, _a = this.allTweens; _i < _a.length; _i++) {
            var tween = _a[_i];
            if (tween.__fps) {
                if (this.checkInterval(tween.__fps, tween.__beforeTime, nowTime)) {
                    tween.__update(nowTime);
                    tween.__beforeTime = nowTime;
                }
            }
            else if (tickerCheck) {
                tween.__update(nowTime);
            }
        }
        if (tickerCheck) {
            this.beforeTime = nowTime;
        }
        if (this.running) {
            var self = this;
            this.timer = window.requestAnimationFrame(function () { self.update(); });
        }
    };
    Ticker24.prototype.checkInterval = function (fps, beforeTime, nowTime) {
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
