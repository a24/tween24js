import { Updater }           from "./Updater";
import { ParamUpdater }      from "./ParamUpdater";
import { HTMLUtil }          from "../../utils/HTMLUtil";
import { StyleColorUpdater } from "./StyleColorUpdater";

export class StyleUpdater implements Updater {
    static className:string = "StyleUpdater";

    static readonly PARAM_REG:RegExp = new RegExp(/^[0-9]*/);
    static readonly UNIT_REG :RegExp = new RegExp(/[^0-9].*/);

    private _target       : HTMLElement;
    private _param        : {[key:string]:ParamUpdater|StyleColorUpdater}|null;
    private _key          : string[]|null;
    private _unit         : {[key:string]:string}|null;
    private _tweenKey     : string[]|null|null;
    private _onceParam    : {[key:string]:string}|null;
    private _isUpdatedOnce: boolean;

    constructor(target:any) {
        this._target        = target;
        this._param         = null;
        this._key           = null;
        this._unit          = null;
        this._tweenKey      = null;
        this._onceParam     = null;
        this._isUpdatedOnce = false;
    }
    
    addPropStr(key:string, value:string) {
        const val :RegExpMatchArray|null = String(value).match(StyleUpdater.PARAM_REG);
        const unit:RegExpMatchArray|null = String(value).match(StyleUpdater.UNIT_REG);
        if (val) {
            this._param ||= {};
            this._key   ||= [];
            this._unit  ||= {};

            this._param[key] = new ParamUpdater(key, Number(val));
            this._unit [key] = unit ? unit[0] : "";
            this._key.push(key);
        }
        else if (value.substr(0, 1) == "#") {
            this._param ||= {};
            this._key   ||= [];
            this._unit  ||= {};

            this._param[key] = new StyleColorUpdater(key, value);
            this._key.push(key);
        }
        else {
            this._onceParam ||= {};
            this._onceParam[key] = value;
        }
    }

    init() {
        this._isUpdatedOnce = false;

        if (this._key && this._param && this._unit) {
            this._tweenKey = this._key.concat();
            for (const key of this._tweenKey) {
                const value:string = HTMLUtil.getStyle(this._target).getPropertyValue(key);
                if (value.substr(0, 3) == "rgb") {
                    (this._param[key] as StyleColorUpdater).init(value);
                    this._unit[key] ||= "";
                }
                else {
                    const val :RegExpMatchArray|null = value.match(StyleUpdater.PARAM_REG);
                    const unit:RegExpMatchArray|null = value.match(StyleUpdater.UNIT_REG);
                    this._unit[key] ||= unit ? unit[0] : "";
                    (this._param[key] as ParamUpdater).init(Number(val ? val : 0));
                }
            }
        }
    }

    update(progress:number) {
        if (!this._isUpdatedOnce) {
            for (const key in this._onceParam) {
                HTMLUtil.setStyleProp(this._target, key, this._onceParam[key]);
            }
            this._isUpdatedOnce = true;
        }
        if (this._tweenKey && this._param && this._unit) {
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

    getMaxAbsDelta():number {
        const deltas:number[] = [];
        if (this._param) {
            for (const key in this._param) 
                deltas.push(Math.abs(this._param[key].getDelta()));
        }
        return Math.max(...deltas);
    }

    clone(target:any = this._target):StyleUpdater {
        const copy:StyleUpdater = new StyleUpdater(target);
        if (this._param) {
            copy._param = {};
            for (const key in this._param) 
                copy._param[key] = this._param[key].clone();
        }

        if (this._key      ) copy._key        = [ ...this._key ];
        if (this._unit     ) copy._unit       = { ...this._unit };
        if (this._onceParam) copy._onceParam  = { ...this._onceParam };
        return copy;
    }

    toString():string {
        let str:string = "";
        if (this._param && this._key)
            for (const key of this._key)
                str += this._param[key].toString() + " ";
        for (const key in this._onceParam)
            str += key + ":" + this._onceParam[key].toString() + " ";
        return str.trim();
    }

    addProp(key:string, value:number) {
    }

    complete() {
    }
}