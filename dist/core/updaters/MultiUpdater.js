import { ObjectUpdater } from "./ObjectUpdater";
import { StyleUpdater } from "./StyleUpdater";
import { TransformUpdater } from "./TransformUpdater";
var MultiUpdater = /** @class */ (function () {
    function MultiUpdater(targets, UpdaterType) {
        this._updaters = [];
        this._updatersByTarget = new Map();
        var updater;
        for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
            var t = targets_1[_i];
            updater = this.getUpdaterInstance(t, UpdaterType);
            this._updaters.push(updater);
            this._updatersByTarget.set(t, updater);
        }
    }
    MultiUpdater.prototype.getUpdaterInstance = function (target, UpdaterType) {
        var updater;
        switch (UpdaterType) {
            case TransformUpdater.className:
                updater = new TransformUpdater(target);
                break;
            case StyleUpdater.className:
                updater = new StyleUpdater(target);
                break;
            default: updater = new ObjectUpdater(target);
        }
        return updater;
    };
    MultiUpdater.prototype.addProp = function (key, value) {
        for (var _i = 0, _a = this._updaters; _i < _a.length; _i++) {
            var updater = _a[_i];
            updater.addProp(key, value);
        }
    };
    MultiUpdater.prototype.addPropStr = function (key, value) {
        for (var _i = 0, _a = this._updaters; _i < _a.length; _i++) {
            var updater = _a[_i];
            updater.addPropStr(key, value);
        }
    };
    MultiUpdater.prototype.init = function () {
        for (var _i = 0, _a = this._updaters; _i < _a.length; _i++) {
            var updater = _a[_i];
            updater.init();
        }
    };
    MultiUpdater.prototype.update = function (progress) {
        for (var _i = 0, _a = this._updaters; _i < _a.length; _i++) {
            var updater = _a[_i];
            updater.update(progress);
        }
    };
    MultiUpdater.prototype.overwrite = function (updater) {
        for (var _i = 0, _a = this._updaters; _i < _a.length; _i++) {
            var target = _a[_i];
            target.overwrite(updater);
        }
    };
    MultiUpdater.prototype.overwriteTo = function (target) {
        for (var _i = 0, _a = this._updaters; _i < _a.length; _i++) {
            var updater = _a[_i];
            target.overwrite(updater);
        }
    };
    MultiUpdater.prototype.overwriteMultiTo = function (multiUpdater) {
        for (var _i = 0, _a = multiUpdater._updaters; _i < _a.length; _i++) {
            var target = _a[_i];
            this.overwriteTo(target);
        }
    };
    MultiUpdater.prototype.complete = function () {
        for (var _i = 0, _a = this._updaters; _i < _a.length; _i++) {
            var updater = _a[_i];
            updater.complete();
        }
    };
    MultiUpdater.prototype.toString = function () {
        var updater = this._updaters[0];
        return updater ? updater.toString() : "";
    };
    MultiUpdater.type = "MultiUpdater";
    return MultiUpdater;
}());
export { MultiUpdater };
