export class FunctionExecuter {

	func :Function;
	args :any[]|null;
	scope:any;

	constructor(scope:any, func:Function, args:any[]) {
		this.func  = func;
		this.args  = args;
		this.scope = scope;
	}

	execute() {
		this.func.apply(this.scope, this.args);
	}
}

export default FunctionExecuter;