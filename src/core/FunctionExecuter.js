var FunctionExecuter = /** @class */ (function () {
    function FunctionExecuter(scope, func, args) {
        this.func = func;
        this.args = args;
        this.scope = scope;
    }
    FunctionExecuter.prototype.execute = function () {
        this.func.apply(this.scope, this.args);
    };
    return FunctionExecuter;
}());
export { FunctionExecuter };
export default FunctionExecuter;
