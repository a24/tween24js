export class ParamUpdater {

    static readonly RELATIVE_AT_SETTING:string = "relative_at_setting";
    static readonly RELATIVE_AT_RUNNING:string = "relative_at_running";

    private _key    :string;
    private _target :number;
    private _start  :number;
    private _delta  :number;
    private _value  :number;

    private _$value :number;
    private _$$value:number;

    private _bezier:number[]|null;
    private _originalValue:number|string;
    private _unit:string;
    private _isActive:boolean;

    constructor(key:string, target:number, originalValue:number|string) {
        this._key     = key;
        this._target  = target;
        this._start   = NaN;
        this._delta   = NaN;
        this._value   = NaN;
        this._unit    = "";

        this._$value  = NaN;
        this._$$value = NaN;

        this._bezier  = null;
        this._originalValue = originalValue;
        this._isActive = false;
    }

    setUnit = (unit:string) => {
        this._unit = unit;
    }

    unActive = () => {
        this._isActive = false;
    }

    init(start:number) {
        this._isActive = true;

        if (!isNaN(this._$$value)) {
            this._target = start + this._$$value;
        }
        this._start  = start;
        this._delta  = this._target - start + (this._$value||0);
        this._value  = this._start;
    }

    update(progress:number):number {
        if (this._bezier) {
            this._value = this.getBezier(this._start, this._target, progress, this._bezier);
        }
        else this._value = this._start + this._delta * progress;
        this._value = Math.round(this._value * 100000) / 100000;
        return this._value;
    }

    getDelta() {
        return this._delta;
    }

    set$value($value:number) {
        this._$value = $value;
    }

    set$$value($$value:number) {
        this._$$value  = $$value;
    }

    setBezier(bezier:number) {
        this._bezier ||= [];
        this._bezier.push(bezier);
    }

    clone(target:number = NaN):ParamUpdater {
        const updater = new ParamUpdater(this._key, target || this._target, this._originalValue);
        updater.setUnit(this.unit);
        return updater;
    }
    
    toString():string {
        if (!isNaN(this._$value)) 
            return `$${this._key}:${this._$value}${this._unit}`;
        else if (!isNaN(this._$$value)) 
            return `$$${this._key}:${this._$$value}${this._unit}`;
        else 
            return `${this._key}:${this._target}${this._unit}`;
    }

    /**
     * ベジェ曲線上にある値を取得します。
     * @param b	begin
     * @param e	end
     * @param t	time(0-1)
     * @param p	bezier params
     * @return	number
     */
    getBezier(b:number, e:number, t: number, p:number[]): number {
        if (t == 1) return e;
        if (p.length == 1) return b + t * (2 * (1 - t) * (p[0] - b) + t * (e - b));
        else {
            var ip: number = Math.floor(t * p.length);
            var it: number = (t - (ip * (1 / p.length))) * p.length;
            var p1: number;
            var p2: number;

            if (ip == 0) {
                p1 = b;
                p2 = (p[0] + p[1]) / 2;
            }
            else if (ip == p.length - 1) {
                p1 = (p[ip - 1] + p[ip]) / 2;
                p2 = e;
            }
            else {
                p1 = (p[ip - 1] + p[ip]) / 2;
                p2 = (p[ip] + p[ip + 1]) / 2;
            }
            return p1 + it * (2 * (1 - it) * (p[ip] - p1) + it * (p2 - p1));
        }
    }

    get key():string {
        return this._key;
    }

    get target():number {
        return this._target;
    }

    get unit():string {
        return this._unit;
    }

    get bezier():number[]|null {
        return this._bezier;
    }

    get originalValue():number|string {
        return this._originalValue;
    }

    get isActive():boolean {
        return this._isActive;
    }

    get param():string {
        return this._value + this.unit;
    }

    get targetParam():string {
        return this._target + this.unit;
    }
}