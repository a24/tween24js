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

    constructor(key:string, target:number) {
        this._key      = key;
        this._target   = target;
        this._start    = NaN;
        this._delta    = NaN;
        this._value    = NaN;

        this._$value  = NaN;
        this._$$value = NaN;

        this._bezier = null;
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
        if (this._bezier) this._value = this.getBezier(this._start, this._delta, progress, this._bezier);
        else this._value = this._start + this._delta * progress;
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

    get target():number {
        return this._target;
    }

    get bezier():number[]|null {
        return this._bezier;
    }
}