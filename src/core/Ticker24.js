var Ticker24 = /** @class */ (function () {
    function Ticker24() {
        this.fps = 60;
        this.allTweens = [];
        this.timer = null;
        this.running = false;
    }
    Ticker24.prototype.start = function () {
        this.running = true;
        var self = this;
        this.timer = setInterval(function () { self.update(); }, 1000 / this.fps);
    };
    Ticker24.prototype.stop = function () {
        this.running = false;
        if (this.timer)
            clearInterval(this.timer);
    };
    Ticker24.prototype.add = function (tween) {
        this.allTweens.push(tween);
        if (!this.running)
            this.start();
    };
    Ticker24.prototype.remove = function (tween) {
        var allTweens = this.allTweens;
        this.removeItemFromArray(allTweens, tween);
        if (!allTweens.length) {
            this.stop();
            //trace("[Ticker stop]");
        }
    };
    Ticker24.prototype.update = function () {
        for (var i = 0; i < this.allTweens.length; i++) {
            this.allTweens[i].__update();
        }
    };
    Ticker24.prototype.removeItemFromArray = function (array, item) {
        for (var i = 0; i < array.length; i++) {
            var it = array[i];
            if (item == it) {
                array.splice(i, 1);
            }
        }
    };
    return Ticker24;
}());
export { Ticker24 };
export default Ticker24;
