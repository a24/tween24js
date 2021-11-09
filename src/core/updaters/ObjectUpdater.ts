import { ParamUpdater } from "./ParamUpdater";
import { Updater } from "./Updater";

export class ObjectUpdater implements Updater {
    static className:string = "ObjectUpdater";

    private _target   :any;
    private _keys     :string[];
    private _tweenKeys:string[]|null;
    private _paramUpdaters:{[key:string]:ParamUpdater};

    constructor(target:any) {
        this._target     = target;
        this._keys        = [];
        this._tweenKeys   = null;
        this._paramUpdaters   = {};
    }

    addProp(key:string, value:number, option:string|null = null) {
        let updater;
        if (option) {
            updater = new ParamUpdater(key, this._target[key]);
            switch (option) {
                case ParamUpdater.RELATIVE_AT_SETTING :
                    updater.set$value(value);
                    break;
                case ParamUpdater.RELATIVE_AT_RUNNING :
                    updater.set$$value(value);
                    break;
            }
        }
        else {
            updater = new ParamUpdater(key, value); 
        }
        this._paramUpdaters[key] = updater;
        this._keys.push(key);
    }
    
    addPropStr(key:string, value:string) {
    }

    init(useWillChange:boolean) {
        this._tweenKeys = this._keys.concat();
        for (const key of this._tweenKeys) {
            this._paramUpdaters[key].init(this._target[key]);
        }
    }

    update(progress:number) {
        if (this._tweenKeys) {
            for (const key of this._tweenKeys) {
                this._target[key] = this._paramUpdaters[key].update(progress);
            }
        }
    }

    overwrite(updater:ObjectUpdater):void {
        if (this._target == updater._target) {
            const targetKey:string[]|null = updater._tweenKeys;
            if (this._tweenKeys && targetKey) {
                for (const key of targetKey) {
                    const i = this._tweenKeys.indexOf(key);
                    if (i > -1) this._tweenKeys.splice(i, 1);
                }
            }
        }
    }
    
    getMaxAbsDelta():number {
        const deltas:number[] = [];
        let dx:number = 0;
        let dy:number = 0;
        for (const key in this._paramUpdaters) {
            if      (key == "x") dx = this._paramUpdaters[key].getDelta();
            else if (key == "y") dy = this._paramUpdaters[key].getDelta();
            else 
                deltas.push(Math.abs(this._paramUpdaters[key].getDelta()));
        }
        deltas.push(Math.sqrt(dx * dx + dy * dy));
        return Math.max(...deltas);
    }

    clone(target:any = this._target):ObjectUpdater {
        const copy:ObjectUpdater = new ObjectUpdater(target);
        copy._paramUpdaters = { ...this._paramUpdaters };
        copy._keys = [ ...this._keys ];
        return copy;
    }

    toString():string {
        let str:string = "";
        for (const key of this._keys)
            str += this._paramUpdaters[key].toString() + " ";
        return str.trim();
    }

    complete() {
    }
}