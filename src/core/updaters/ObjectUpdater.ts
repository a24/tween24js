import Tween24 from "../../Tween24";
import Updater from "./Updater";

export class ObjectUpdater implements Updater {

	private _target:any;
	private _param:{[key:string]:number};
	private _startParam:{[key:string]:number};
	private _deltaParam:{[key:string]:number};
	private _key:string[];
	private _tweenKey:string[]|null;

	constructor(target:any) {
		this._target = target;
		this._param = {};
		this._startParam = {};
		this._deltaParam = {};
		this._key = [];
		this._tweenKey = null;
	}

	addProp(key:string, value:number) {
		let k:string = key;
		this._param[k] = value;
		this._key.push(k);
	}

	init() {
		this._tweenKey = this._key.concat();
		for (const k of this._tweenKey) {
			this._startParam[k] = this._target[k];
			this._deltaParam[k] = this._param[k] - this._target[k];
		}
	}

	update(progress:number) {
		if (this._tweenKey) {
			for (const k of this._tweenKey) {
				this._target[k] = this._startParam[k] + this._deltaParam[k] * progress;
			}
		}
	}

	overwrite(updater:ObjectUpdater):void {
		if (this._target == updater._target) {
			const targetKey:string[]|null = updater._tweenKey;
			if (this._tweenKey && targetKey) {
				for (const k of targetKey) {
					const i = this._tweenKey.indexOf(k);
					if (i > -1) this._tweenKey.splice(i, 1);
				}
			}
		}
	}

	complete() {
		
	}
}

export default ObjectUpdater;