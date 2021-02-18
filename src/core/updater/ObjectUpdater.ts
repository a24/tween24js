import Tween24 from "../../Tween24";
import Updater from "./Updater";

export class ObjectUpdater implements Updater {

	private _target:any;
	private _param:{ [key:string]:number };
	private _startParam:{ [key:string]:number };
	private _deltaParam:{ [key:string]:number };
	private _key:string[];

	constructor(target:any) {
		this._target = target;
		this._param = {};
		this._startParam = {};
		this._deltaParam = {};
		this._key = [];
	}

	addProp(key:string, value:number) {
		let k:string = key;
		this._param[k] = value;
		this._key.push(k);
	}

	init() {
		for (const k of this._key) {
			this._startParam[k] = this._target[k];
			this._deltaParam[k] = this._param[k] - this._target[k];
		}
	}

	update(progress:number) {
		for (const k of this._key) {
			this._target[k] = this._startParam[k] + this._deltaParam[k] * progress;
		}
	}

	complete() {
		
	}
}

export default ObjectUpdater;