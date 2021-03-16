import Matrix from "../../geom/Matrix";
import HTMLUtil from "../../utils/HTMLUtil";
import ParamUpdater from "./ParamUpdater";
var TransformUpdater = /** @class */ (function () {
    function TransformUpdater(target) {
        if (!TransformUpdater._chache)
            TransformUpdater._chache = new Map();
        this._target = target;
        this._matrix = new Matrix();
        this._x = null;
        this._y = null;
        this._scaleX = null;
        this._scaleY = null;
        this._skewX = null;
        this._skewY = null;
        this._rotation = null;
        this._updateX = false;
        this._updateY = false;
        this._updateScaleX = false;
        this._updateScaleY = false;
        this._updateSkewX = false;
        this._updateSkewY = false;
        this._updateRotation = false;
    }
    TransformUpdater.prototype.init = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var chache = TransformUpdater._chache.get(this._target);
        if (chache)
            this._matrix = Matrix.copy(this._matrix, chache);
        else
            this._matrix.setMatrixByCSSTransform(HTMLUtil.getTransformMatrix(this._target));
        this._updateX = this._x ? true : false;
        this._updateY = this._y ? true : false;
        this._updateScaleX = this._scaleX ? true : false;
        this._updateScaleY = this._scaleY ? true : false;
        this._updateSkewX = this._skewX ? true : false;
        this._updateSkewY = this._skewY ? true : false;
        this._updateRotation = this._rotation ? true : false;
        (_a = this._x) === null || _a === void 0 ? void 0 : _a.init(this._matrix.x);
        (_b = this._y) === null || _b === void 0 ? void 0 : _b.init(this._matrix.y);
        (_c = this._scaleX) === null || _c === void 0 ? void 0 : _c.init(this._matrix.scaleX);
        (_d = this._scaleY) === null || _d === void 0 ? void 0 : _d.init(this._matrix.scaleY);
        (_e = this._skewX) === null || _e === void 0 ? void 0 : _e.init(this._matrix.skewX);
        (_f = this._skewY) === null || _f === void 0 ? void 0 : _f.init(this._matrix.skewY);
        (_g = this._rotation) === null || _g === void 0 ? void 0 : _g.init(this._matrix.rotation);
    };
    TransformUpdater.prototype.addProp = function (key, value) {
        var p = null;
        switch (key) {
            case "x":
                p = this._x = new ParamUpdater(key, value);
                break;
            case "y":
                p = this._y = new ParamUpdater(key, value);
                break;
            case "scaleX":
                p = this._scaleX = new ParamUpdater(key, value);
                break;
            case "scaleY":
                p = this._scaleY = new ParamUpdater(key, value);
                break;
            case "skewX":
                p = this._skewX = new ParamUpdater(key, value);
                break;
            case "skewY":
                p = this._skewY = new ParamUpdater(key, value);
                break;
            case "rotation":
                p = this._rotation = new ParamUpdater(key, value);
                break;
        }
    };
    TransformUpdater.prototype.update = function (progress) {
        var chache = TransformUpdater._chache.get(this._target);
        if (chache && chache != this._matrix)
            this._matrix = Matrix.copy(this._matrix, chache);
        if (this._updateX && this._x)
            this._matrix.x = this._x.update(progress);
        if (this._updateY && this._y)
            this._matrix.y = this._y.update(progress);
        if (this._updateScaleX && this._scaleX)
            this._matrix.scaleX = this._scaleX.update(progress);
        if (this._updateScaleY && this._scaleY)
            this._matrix.scaleY = this._scaleY.update(progress);
        if (this._updateSkewX && this._skewX)
            this._matrix.skewX = this._skewX.update(progress);
        if (this._updateSkewY && this._skewY)
            this._matrix.skewY = this._skewY.update(progress);
        if (this._updateRotation && this._rotation)
            this._matrix.rotation = this._rotation.update(progress);
        this._matrix.updateMatrix();
        HTMLUtil.setTransformMatrix(this._target, this._matrix.toString());
        TransformUpdater._chache.set(this._target, this._matrix);
    };
    TransformUpdater.prototype.overwrite = function (updater) {
        if (this._target == updater._target) {
            if (updater._updateX)
                this._updateX = false;
            if (updater._updateY)
                this._updateY = false;
            if (updater._updateScaleX)
                this._updateScaleX = false;
            if (updater._updateScaleY)
                this._updateScaleY = false;
            if (updater._updateSkewX)
                this._updateSkewX = false;
            if (updater._updateSkewY)
                this._updateSkewY = false;
            if (updater._updateRotation)
                this._updateRotation = false;
        }
    };
    TransformUpdater.prototype.complete = function () {
        TransformUpdater._chache.delete(this._target);
    };
    return TransformUpdater;
}());
export { TransformUpdater };
export default TransformUpdater;
