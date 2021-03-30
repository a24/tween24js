export class ParamUpdater {

	private _key   : string;
	private _target: number;
	private _start : number;
	private _delta : number;
	private _value : number;

	constructor(key:string, value:number) {
		this._key    = key;
		this._target = value;
		this._start  = 0;
		this._delta  = 0;
		this._value  = 0;
	}

	init(start:number) {
		this._start  = start;
		this._delta  = this._target - start;
		this._value  = this._start;
	}

	update(progress:number):number {
		this._value = this._start + this._delta * progress;
		return this._value;
	}
	
	toString():string {
		return `${this._key}:${this._target}`
	}
}

export default ParamUpdater;