import { StringUtil } from "../../utils/StringUtil";
import { ParamUpdater } from "./ParamUpdater";

export class MultiParamUpdater {
    private static _chache:Map<HTMLElement, Map<string, StyleParam4>>;

    private _target    :HTMLElement;
    private _key       :string;
    private _type      :string;
    private _params    :StyleParam4;
    private _updater   :ParamUpdater4|null;
    private _numParams :number;
    private _chache    :Map<string, StyleParam4>;

    private _separator :string|null;
    private _numParams2:number;
    private _params2   :StyleParam4|null;
    private _updater2  :ParamUpdater4|null;

    constructor(target:HTMLElement, key:string, type:string, numParam:number, separator:string|null = null, numParam2:number = NaN) {
        this._key        = key;
        this._target     = target
        this._type       = type;
        this._numParams  = numParam;
        this._params     = new StyleParam4();
        this._updater    = null;

        this._separator  = separator;
        this._numParams2 = numParam2;
        this._params2    = null;
        this._updater2   = null;

        MultiParamUpdater._chache ||= new Map<HTMLElement, Map<string, StyleParam4>>();
        const chache = MultiParamUpdater._chache.get(this._target);
        if (chache) this._chache = chache;
        else {
            this._chache = new Map<string, StyleParam4>();
            MultiParamUpdater._chache.set(this._target, this._chache);
        }
    }

    init = (start:string) => {
        this._setParams(start);
        this._updater?.init(this._params);
        if (this._params2) this._updater2?.init(this._params2);
    }

    private _setParams = (paramValue:string) => {
        let p1 = "";
        let p2 = undefined;
        const match = paramValue.match(String.raw`(?<=${this._type}\().*?(?=\))`);
        if (match) {
            const matchValue = match[0];
            if (this._separator && matchValue.indexOf(this._separator) > -1) {
                const matchList = matchValue.split(this._separator);
                p1 = matchList[0];
                p2 = matchList[1];
            }
            else {
                p1 = matchValue;
            }
        }

        this._params.init(p1, this._numParams);

        if (this._updater2 || p2) {
            this._params2 ||= new StyleParam4();
            this._params2.init(p2 || "", this._numParams2);
        }
    }

    addPropStr = (index:number, value:string) => {
        this._updater ||= new ParamUpdater4(this._numParams);
        this._updater.setUpdater(index, value);
    }

    addPropStr2 = (index:number, value:string) => {
        this._updater2 ||= new ParamUpdater4(this._numParams2);
        this._updater2.setUpdater(index, value);
    }

    update = (progress:number):string => {
        const chache1 = this._chache.get(this._type);
        const chache2 = this._chache.get(this._type + this._separator);
        if (!chache1 || (this._updater2 && !chache2)) {
            this._setParams(getComputedStyle(this._target).getPropertyValue(this._key));
        }
        else {
            this._params.copy(chache1);
            if (chache2) {
                if (this._params2) this._params2.copy(chache2);
                else this._params2 = chache2.clone();
            }
        }

        // Param1
        let result = this._type + "(";
        this._updater?.update(this._params, progress);
        result += this._params.param;

        // Chache
        if (progress != 1) this._chache.set(this._type, this._params);
        else this._chache.delete(this._type);

        // Param2
        if (this._params2) {
            if (this._updater2) {
                this._updater2.update(this._params2, progress);
            }
            result += ` ${this._separator} ${this._params2.param}`;
            
            // Chache
            if (progress != 1) this._chache.set(this._type + this._separator, this._params2);
            else this._chache.delete(this._type + this._separator);
        }
        result += ")";
        // console.log(result);
        return result;
    }

    overwrite = (updater:MultiParamUpdater) => {
        if (updater._target == this._target) {
            if (updater._type == this._type) {
                if (updater._updater ) this._updater ?.overwrite(updater._updater );
                if (updater._updater2) this._updater2?.overwrite(updater._updater2);
            }
        }
    }

    getDelta = ():number => {
        const d0:number = this._updater ?.getDelta() || 1;
        const d1:number = this._updater2?.getDelta() || 1;
        return Math.max(Math.sqrt(d0 * d0 + d1 * d1));
    }

    clone = (target:HTMLElement):MultiParamUpdater => {
        const mpu = new MultiParamUpdater(target, this._key, this._type, this._numParams, this._separator, this._numParams2);
        if (this._updater ) mpu._updater  = this._updater .clone();
        if (this._updater2) mpu._updater2 = this._updater2.clone();
        return mpu;
    }
    
    toString = ():string => {
        let result = `${this._type}(${this._updater?.toString() || "none"}`;
        if (this._updater2) result += ` ${this._separator} ${this._updater2.toString()}`;
        result += `)`;
        return result;
    }

    get key():string {
        return this._key;
    }
}

class StyleParam4 {
    value0:number = NaN;
    value1:number = NaN;
    value2:number = NaN;
    value3:number = NaN;

    unit0 :string = "";
    unit1 :string = "";
    unit2 :string = "";
    unit3 :string = "";

    constructor() {}

    init = (param:string, numParams:number) => {
        let p0, p1, p2, p3;
        const params = param.trim().split(" ");

        p0 = params[0] || "0";
        this.value0 = parseFloat(p0);
        this.unit0 = StringUtil.getUnit(p0);
        
        console.log("init", param, numParams)
        
        if (numParams > 1) {
            p1 = params[1] || p0;
            this.value1 = parseFloat(p1);
            this.unit1 = StringUtil.getUnit(p1);

            if (numParams > 2) {
                p2 = params[2] || p0;
                this.value2 = parseFloat(p2);
                this.unit2 = StringUtil.getUnit(p2);

                if (numParams > 3) {
                    p3 = params[3] || p1;
                    this.value3 = parseFloat(p3);
                    this.unit3 = StringUtil.getUnit(p3);
                }
            }
        }
    }

    toString = ():string => {
        let result = "";
        if (isNaN(this.value0)) result = "none";
        else {
            result += this.value0 + this.unit0 + " ";
            result += isNaN(this.value1) ? "none " : this.value1 + this.unit1 + " ";
            result += isNaN(this.value2) ? "none " : this.value2 + this.unit2 + " ";
            result += isNaN(this.value3) ? "none"  : this.value3 + this.unit3;
        }
        return result;
    }

    copy = (from:StyleParam4) => {
        this.value0 = from.value0;
        this.value1 = from.value1;
        this.value2 = from.value2;
        this.value3 = from.value3;
        this.unit0  = from.unit0;
        this.unit1  = from.unit1;
        this.unit2  = from.unit2;
        this.unit3  = from.unit3;
        return this;
    }

    clone = ():StyleParam4 => {
        return new StyleParam4().copy(this);
    }

    get param():string {
        let result = this.value0 + this.unit0 + " ";
        if (!isNaN(this.value1)) result += this.value1 + this.unit1 + " ";
        if (!isNaN(this.value2)) result += this.value2 + this.unit2 + " ";
        if (!isNaN(this.value3)) result += this.value3 + this.unit3;
        return result.trim();
    }
}

class ParamUpdater4 {
    private _u0:ParamUpdater|null;
    private _u1:ParamUpdater|null;
    private _u2:ParamUpdater|null;
    private _u3:ParamUpdater|null;
    private _numParams:number;

    constructor(numParams:number) {
        this._u0 = null;
        this._u1 = null;
        this._u2 = null;
        this._u3 = null;
        this._numParams = numParams;
    }

    setUpdater = (index:number, value:string) => { 
        const u = new ParamUpdater("", parseFloat(value), value);
        u.setUnit(StringUtil.getUnit(value));
        switch (index) {
            case 0 : this._u0 = u; break;
            case 1 : this._u1 = u; break;
            case 2 : this._u2 = u; break;
            case 3 : this._u3 = u; break;
        }
    }

    init = (param4:StyleParam4) => {
        this._init(this._u0, param4.value0, param4.unit0);
        this._init(this._u1, param4.value1, param4.unit1);
        this._init(this._u2, param4.value2, param4.unit2);
        this._init(this._u3, param4.value3, param4.unit3);
    }

    private _init = (u:ParamUpdater|null, v:number, ut:string) => {
        if (u) {
            u.init(v);
            if (u.unit.length == 0) u.setUnit(ut);
        }
    }

    update = (param4:StyleParam4, progress:number) => {
        if (this._u0) { param4.value0 = this._u0.update(progress); param4.unit0 = this._u0.unit; }
        if (this._u1) { param4.value1 = this._u1.update(progress); param4.unit1 = this._u1.unit; }
        if (this._u2) { param4.value2 = this._u2.update(progress); param4.unit2 = this._u2.unit; }
        if (this._u3) { param4.value3 = this._u3.update(progress); param4.unit3 = this._u3.unit; }
    }

    overwrite = (updater:ParamUpdater4) => {
        if (updater._u0) this._u0?.unActive();
        if (updater._u1) this._u1?.unActive();
        if (updater._u2) this._u2?.unActive();
        if (updater._u3) this._u3?.unActive();
    }

    getDelta = ():number => {
        const d0:number = this._u0?.getDelta() || 1;
        const d1:number = this._u1?.getDelta() || 1;
        const d2:number = this._u2?.getDelta() || 1;
        const d3:number = this._u3?.getDelta() || 1;
        return Math.max(Math.sqrt(d0 * d0 + d1 * d1 + d2 * d2 + d3 * d3));
    }

    clone = ():ParamUpdater4 => {
        const updater = new ParamUpdater4(this._numParams);
        if (this._u0) updater._u0 = this._u0.clone();
        if (this._u1) updater._u1 = this._u1.clone();
        if (this._u2) updater._u2 = this._u2.clone();
        if (this._u3) updater._u3 = this._u3.clone();
        return updater;
    }

    toString = ():string => {
        let result = this._u0 ? this._u0.targetParam + " " : "none ";
        if (this._numParams > 1) result += this._u1 ? this._u1.targetParam + " " : "none ";
        if (this._numParams > 2) result += this._u2 ? this._u2.targetParam + " " : "none ";
        if (this._numParams > 3) result += this._u3 ? this._u3.targetParam : "none";
        return result.trim();
    }
}