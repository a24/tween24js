import Updater      from "./Updater";
import ParamUpdater from "./ParamUpdater";
import HTMLUtil     from "../../utils/HTMLUtil";

export class StyleUpdater implements Updater {

	static readonly PARAM_REG:RegExp = new RegExp(/^[0-9.]{1,99}/);
	static readonly UNIT_REG :RegExp = new RegExp(/[^0-9.]./);

	private _target  : HTMLElement;
	private _param   : {[key:string]:ParamUpdater};
	private _key     : string[];
	private _unit    : {[key:string]:string};
	private _tweenKey: string[]|null;

	constructor(target:any) {
		this._target   = target;
		this._param    = {};
		this._key      = [];
		this._unit     = {}
		this._tweenKey = null;
	}

	addProp(key:string, value:number) {
	}
	
	addPropStr(key:string, value:string) {
		let v:RegExpMatchArray|null = String(value).match(StyleUpdater.PARAM_REG);
		let u:RegExpMatchArray|null = String(value).match(StyleUpdater.UNIT_REG);
		if (v) {
			this._param[key] = new ParamUpdater(key, Number(v));
			this._unit [key] = u ? u[0] : "";
			this._key.push(key);
		}
	}

	init() {
		var style = HTMLUtil.getStyle(this._target);
		this._tweenKey = this._key.concat();
		for (const key of this._tweenKey) {
			const value:string = HTMLUtil.getStyle(this._target).getPropertyValue(key);
			let v:RegExpMatchArray|null = value.match(StyleUpdater.PARAM_REG);
			let u:RegExpMatchArray|null = value.match(StyleUpdater.UNIT_REG);
			this._unit[key] ||= u ? u[0] : "";
			if (v) this._param[key].init(Number(v));
		}
	}

	update(progress:number) {
		if (this._tweenKey) {
			for (const key of this._tweenKey) {
				HTMLUtil.setStyleProp(this._target, key, this._param[key].update(progress) + this._unit[key]);
			}
		}
	}

	overwrite(updater:StyleUpdater):void {
		if (this._target == updater._target) {
			const targetKey:string[]|null = updater._tweenKey;
			if (this._tweenKey && targetKey) {
				for (const key of targetKey) {
					const i = this._tweenKey.indexOf(key);
					if (i > -1) this._tweenKey.splice(i, 1);
				}
			}
		}
	}

	complete() {
	}
}

export default StyleUpdater;