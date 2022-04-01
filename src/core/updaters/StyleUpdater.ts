import { Updater }           from "./Updater";
import { ParamUpdater }      from "./ParamUpdater";
import { HTMLUtil }          from "../../utils/HTMLUtil";
import { StyleColorUpdater } from "./StyleColorUpdater";
import { ColorUtil }         from "../../utils/ColorUtil";
import { MultiParamUpdater } from "./MultiParamUpdater";

export class StyleUpdater implements Updater {
    static className:string = "StyleUpdater";

    static readonly PARAM_REG:RegExp = new RegExp(/^[0-9.]*/);
    static readonly UNIT_REG :RegExp = new RegExp(/[^-0-9.].*/);

    private _target       :HTMLElement;
    private _query        :string|null;
    private _param        :{[key:string]:ParamUpdater|StyleColorUpdater};
    private _key          :string[];
    private _unit         :{[key:string]:string};
    private _tweenKey     :string[]|null;

    private _clipUpdater  :MultiParamUpdater|null;

    private _onceParam    :{[key:string]:string}|null;
    private _isUpdatedOnce:boolean;

    private _pseudo       :string|null;
    private _style        :CSSStyleDeclaration|undefined;
    private _useWillChange: boolean;

    constructor(target:HTMLElement, query:string|null) {
        this._target        = target;
        this._query         = query;
        this._param       ||= {};
        this._key         ||= [];
        this._unit        ||= {};
        this._tweenKey      = null;
        this._clipUpdater   = null;
        this._onceParam     = null;
        this._isUpdatedOnce = false;
        this._pseudo        = this._query ? HTMLUtil.getPseudoQuery(this._query) : null;
        this._useWillChange = false;
    }
    
    addPropStr(key:string, value:string, option:string|null = null) {
        if (key.indexOf("clip::") > -1) {
            const clip = HTMLUtil.getComputedStyle(this._target).clipPath;
            if      (key.indexOf("inset"  ) > -1) this._clipUpdater ||= new MultiParamUpdater(this._target, "clip-path", "inset"  , 4, "round", 4);
            else if (key.indexOf("circle" ) > -1) this._clipUpdater ||= new MultiParamUpdater(this._target, "clip-path", "circle" , 1, "at"   , 2);
            else if (key.indexOf("ellipse") > -1) this._clipUpdater ||= new MultiParamUpdater(this._target, "clip-path", "ellipse", 2, "at"   , 2);
            
            const index = parseFloat(key.slice(-1));
            if (key.indexOf("round") > -1 || key.indexOf("at") > -1) this._clipUpdater?.addPropStr2(index, value);
            else this._clipUpdater?.addPropStr(index, value);
        }
        else {
            const val :RegExpMatchArray|null = String(value).match(StyleUpdater.PARAM_REG);
            const unit:RegExpMatchArray|null = String(value).match(StyleUpdater.UNIT_REG);
            
            if (ColorUtil.isColorCode(value)) {
                this._param[key] = new StyleColorUpdater(key, value);
                this._key.push(key);
            }
            // 数値を持っているスタイルの場合
            else if (val && val[0]?.length) {
                const original = this._target.style.getPropertyValue(key);
                this._target.style.setProperty(key, value);
                const targetValue = HTMLUtil.getComputedStyle(this._target).getPropertyValue(key);
                this._target.style.setProperty(key, original);
                const targetUnit = targetValue.match(StyleUpdater.UNIT_REG);
    
                let updater:ParamUpdater;
                // 相対値の場合
                if (option) {
                    updater = new ParamUpdater(key, parseFloat(original), value);
                    switch (option) {
                        case ParamUpdater.RELATIVE_AT_SETTING :
                            updater.set$value(parseFloat(value));
                            break;
                        case ParamUpdater.RELATIVE_AT_RUNNING :
                            updater.set$$value(parseFloat(value));
                            break;
                    }
                }
                // 絶対値の場合
                else {
                    updater = new ParamUpdater(key, parseFloat(targetValue), value);
                }
                this._param[key] = updater;
                this._unit [key] = targetUnit ? targetUnit[0] : "";
                this._key.push(key);
            }
            // 文字列を設定するスタイルの場合
            else {
                this._onceParam ||= {};
                this._onceParam[key] = value;
            }
        }
    }

    init(useWillChange:boolean) {
        this._useWillChange = useWillChange;

        if (!this._style && this._pseudo && this._query) {
            this._style = HTMLUtil.getAddedStyleByElement(this._target, this._pseudo);
        }

        this._isUpdatedOnce = false;
        this._tweenKey = this._key.concat();
        for (const key of this._tweenKey) {
            const value:string = HTMLUtil.getComputedStyle(this._target, this._pseudo).getPropertyValue(key);
            if (ColorUtil.isColorCode(value)) {
                (this._param[key] as StyleColorUpdater).init(value);
                this._unit[key] ||= "";
            }
            else {
                const val :RegExpMatchArray|null = value.match(StyleUpdater.PARAM_REG);
                const unit:RegExpMatchArray|null = value.match(StyleUpdater.UNIT_REG);
                
                this._unit[key] ||= unit && val && val[0].length ? unit[0] : "";
                (this._param[key] as ParamUpdater).init(Number(val ? val : 0));
            }
        }
        if (this._useWillChange) {
            HTMLUtil.addWillChange(this._style || this._target.style, this._key);
        }

        if (this._clipUpdater) {
            this._clipUpdater.init(this._target.style.clipPath);
            
            if (this._useWillChange) {
                HTMLUtil.addWillChange(this._style || this._target.style, [this._clipUpdater.key]);
            }
        }
    }

    update(progress:number) {
        if (!this._isUpdatedOnce) {
            for (const key in this._onceParam) {
                const value:string = this._onceParam[key];
                if (this._style) this._style.setProperty(key, value);
                else HTMLUtil.setStyleProp(this._target, key, value);
            }
            this._isUpdatedOnce = true;
        }
        if (this._tweenKey) {
            for (const key of this._tweenKey) {
                const value:string = this._param[key].update(progress) + this._unit[key];
                if (this._style) this._style.setProperty(key, value);
                else HTMLUtil.setStyleProp(this._target, key, value);
            }
        }
        if (this._clipUpdater) {
            const value:string = this._clipUpdater.update(progress);
            if (this._style) this._style.setProperty(this._clipUpdater.key, value);
            else HTMLUtil.setStyleProp(this._target, this._clipUpdater.key, value);
        }
        if (progress == 1) this.complete();
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
            if (this._clipUpdater && updater._clipUpdater) {
                this._clipUpdater.overwrite(updater._clipUpdater);
            }
        }
    }

    getMaxAbsDelta():number {
        const deltas:number[] = [];
        if (this._param) {
            for (const key in this._param) 
                deltas.push(Math.abs(this._param[key].getDelta()));
        }
        if (this._clipUpdater)
            deltas.push(this._clipUpdater.getDelta());
        return Math.max(...deltas);
    }

    clone(target:any = this._target, query:string|null = this._query):StyleUpdater {
        const copy:StyleUpdater = new StyleUpdater(target, query);
        if (this._param) {
            copy._param = {};
            for (const key in this._param) {
                const value = this._param[key].originalValue;
                const unit = String(value).match(StyleUpdater.UNIT_REG);
                let targetValue = NaN;
                if (unit && unit[0] == "%") {
                    const original = target.style.getPropertyValue(key);
                    target.style.setProperty(key, value);
                    targetValue = parseFloat(HTMLUtil.getComputedStyle(target).getPropertyValue(key));
                    target.style.setProperty(key, original);
                }
                copy._param[key] = this._param[key].clone(targetValue);
            }
        }
        if (this._key        ) copy._key         = [ ...this._key ];
        if (this._unit       ) copy._unit        = { ...this._unit };
        if (this._onceParam  ) copy._onceParam   = { ...this._onceParam };
        if (this._clipUpdater) copy._clipUpdater = this._clipUpdater.clone(target);
        return copy;
    }

    toString():string {
        let str:string = "";
        if (this._param && this._key)
            for (const key of this._key)
                str += this._param[key]?.toString() + (this._unit[key]?.toString() || "") + " ";
        if (this._clipUpdater) 
            str += this._clipUpdater.key + ":" + this._clipUpdater.toString() + " ";
        for (const key in this._onceParam)
            str += key + ":" + this._onceParam[key].toString() + " ";
        return str.trim();
    }

    addProp(key:string, value:number) {
    }

    setBezier(bezierX:number, bezierY:number) {
    }

    complete() {
        if (this._useWillChange) {
            HTMLUtil.removeWillChange(this._style || this._target.style, this._key);
            
            if (this._clipUpdater) {
                HTMLUtil.removeWillChange(this._style || this._target.style, [this._clipUpdater.key]);
            }
        }
    }
}