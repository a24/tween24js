import ParamUpdater from "./ParamUpdater";
var StyleColorUpdater = /** @class */ (function () {
    function StyleColorUpdater(key, colorCode) {
        this._key = key;
        this._color = colorCode;
        colorCode = colorCode.substring(1);
        if (colorCode.length === 3) {
            colorCode = colorCode.substr(0, 1).repeat(2) + colorCode.substr(1, 1).repeat(2) + colorCode.substr(2, 1).repeat(2);
        }
        var c = parseInt(colorCode, 16);
        this._r = new ParamUpdater("r", c >> 16 & 0xFF);
        this._g = new ParamUpdater("g", c >> 8 & 0xFF);
        this._b = new ParamUpdater("b", c & 0xFF);
    }
    StyleColorUpdater.prototype.init = function (start) {
        var val = start.match(/\d+/g);
        if (val) {
            this._r.init(Number(val[0]));
            this._g.init(Number(val[1]));
            this._b.init(Number(val[2]));
        }
    };
    StyleColorUpdater.prototype.update = function (progress) {
        return "rgb(" + this._r.update(progress) + "," + this._g.update(progress) + "," + this._b.update(progress) + ")";
    };
    StyleColorUpdater.prototype.toString = function () {
        return this._key + ":" + this._color;
    };
    return StyleColorUpdater;
}());
export { StyleColorUpdater };
export default StyleColorUpdater;
