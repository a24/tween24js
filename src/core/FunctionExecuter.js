var FunctionExecuter = /** @class */ (function () {
    function FunctionExecuter(scope, func, args) {
        this._func = func;
        this._args = args;
        this._scope = scope;
    }
    FunctionExecuter.prototype.execute = function () {
        this._func.apply(this._scope, this._args);
    };
    return FunctionExecuter;
}());
export { FunctionExecuter };
export default FunctionExecuter;
