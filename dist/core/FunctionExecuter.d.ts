export declare class FunctionExecuter {
    private _func;
    private _args;
    private _scope;
    constructor(scope: any, func: Function, args: any[] | null);
    execute(): void;
    clone(): FunctionExecuter;
}
