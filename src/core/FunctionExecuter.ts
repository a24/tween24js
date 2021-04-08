export class FunctionExecuter {

    private _func :Function;
    private _args :any[]|null;
    private _scope:any;

    constructor(scope:any, func:Function, args:any[]) {
        this._func  = func;
        this._args  = args;
        this._scope = scope;
    }

    execute() {
        this._func.apply(this._scope, this._args);
    }
}