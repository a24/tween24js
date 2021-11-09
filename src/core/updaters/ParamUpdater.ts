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

    constructor(key:string, target:number) {
        this._key      = key;
        this._target   = target;
        this._start    = NaN;
        this._delta    = NaN;
        this._value    = NaN;
        this._$value   = NaN;
        this._$$value  = NaN;
    }

    init(start:number) {
        if (!isNaN(this._$$value)) {
            this._target = start + this._$$value;
        }
        this._start  = start;
        this._delta  = this._target - start + (this._$value||0);
        this._value  = this._start;
    }

    update(progress:number):number {
        this._value = this._start + this._delta * progress;
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

    clone():ParamUpdater {
        return new ParamUpdater(this._key, this._target);
    }
    
    toString():string {
        if (!isNaN(this._$value)) 
            return `$${this._key}:${this._$value}`;
        else if (!isNaN(this._$$value)) 
            return `$$${this._key}:${this._$$value}`;
        else 
            return `${this._key}:${this._target}`;
    }

    get target():number {
        return this._target;
    }
}