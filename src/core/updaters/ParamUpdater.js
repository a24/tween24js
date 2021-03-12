var ParamUpdater = /** @class */ (function () {
    function ParamUpdater(key, value) {
        this.key = key;
        this.target = value;
        this.start = 0;
        this.delta = 0;
        this.value = 0;
    }
    ParamUpdater.prototype.init = function (start) {
        this.start = start;
        this.delta = this.target - start;
        this.value = this.start;
    };
    ParamUpdater.prototype.update = function (progress) {
        this.value = this.start + this.delta * progress;
        return this.value;
    };
    return ParamUpdater;
}());
export { ParamUpdater };
export default ParamUpdater;
