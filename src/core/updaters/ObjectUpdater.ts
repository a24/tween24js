import { Updater } from "./Updater";

export class ObjectUpdater implements Updater {
    static className:string = "ObjectUpdater";

    private _target  :any;
    private _key     :string[];
    private _tweenKey:string[]|null;

    private _param     :{[key:string]:number};
    private _startParam:{[key:string]:number};
    private _deltaParam:{[key:string]:number};

    constructor(target:any) {
        this._target     = target;
        this._key        = [];
        this._tweenKey   = null;
        this._param      = {};
        this._startParam = {};
        this._deltaParam = {};
    }

    addProp(key:string, value:number) {
        this._param[key] = value;
        this._key.push(key);
    }
    
    addPropStr(key:string, value:string) {
    }

    init(useWillChange:boolean) {
        this._tweenKey = this._key.concat();
        for (const key of this._tweenKey) {
            this._startParam[key] = this._target[key];
            this._deltaParam[key] = this._param[key] - this._target[key];
        }
    }

    update(progress:number) {
        if (this._tweenKey) {
            for (const key of this._tweenKey) {
                this._target[key] = this._startParam[key] + this._deltaParam[key] * progress;
            }
        }
    }

    overwrite(updater:ObjectUpdater):void {
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
        let dx:number = 0;
        let dy:number = 0;
        for (const key in this._deltaParam) {
            if      (key == "x") dx = this._param[key];
            else if (key == "y") dy = this._param[key];
            else 
                deltas.push(Math.abs(this._param[key]));
        }
        deltas.push(Math.sqrt(dx * dx + dy * dy));
        return Math.max(...deltas);
    }

    clone(target:any = this._target):ObjectUpdater {
        const copy:ObjectUpdater = new ObjectUpdater(target);
        copy._param = { ...this._param };
        copy._key   = [ ...this._key ];
        return copy;
    }

    toString():string {
        let str:string = "";
        for (const key of this._key)
            str += key + ":" + this._param[key] + " ";
        return str.trim();
    }

    complete() {
    }
}