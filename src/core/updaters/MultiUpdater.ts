import { Updater }          from "./Updater";
import { ObjectUpdater }    from "./ObjectUpdater";
import { StyleUpdater }     from "./StyleUpdater";
import { TransformUpdater } from "./TransformUpdater";

export class MultiUpdater implements Updater {
    static type:string = "MultiUpdater";

    private _targets    :any[];
    private _query      :string|null;
    private _updaters   :Updater[];
    private _updaterType:string|null;

    constructor(targets:any[], query:string|null) {
        this._targets     = targets;
        this._query       = query;
        this._updaterType = null;
        this._updaters    = [];
    }

    setupByType(updaterType:string):MultiUpdater {
        this._updaterType = updaterType;
        for (const t of this._targets)
            this._updaters.push(this._getUpdaterInstance(t, this._updaterType));
        return this;
    }

    setupByUpdater(updater:Updater):MultiUpdater {
        for (const t of this._targets)
            this._updaters.push(updater.clone(t, this._query));
        return this;
    }

    private _getUpdaterInstance(target:any, UpdaterType:string|null):Updater {
        let updater:Updater;
        switch (UpdaterType) {
            case TransformUpdater.className : updater = new TransformUpdater(target, this._query); break;
            case StyleUpdater    .className : updater = new StyleUpdater    (target, this._query); break;
            default                         : updater = new ObjectUpdater   (target);
        }
        return updater;
    }

    addProp(key:string, value:number) {
        for (const updater of this._updaters) {
            updater.addProp(key, value);
        }
    }
    
    addPropStr(key:string, value:string) {
        for (const updater of this._updaters) {
            updater.addPropStr(key, value);
        }
    }

    init(useWillChange:boolean) {
        for (const updater of this._updaters) {
            updater.init(useWillChange);
        }
    }

    update(progress:number) {
        for (const updater of this._updaters) {
            updater.update(progress);
        }
    }

    overwrite(updater:Updater):void {
        for (const target of this._updaters) {
            target.overwrite(updater);
        }
    }
    overwriteTo(target:Updater):void {
        for (const updater of this._updaters) {
            target.overwrite(updater);
        }
    }

    overwriteMultiTo(multiUpdater:MultiUpdater):void {
        for (const target of multiUpdater._updaters) {
            this.overwriteTo(target);
        }
    }

    complete() {
        for (const updater of this._updaters) {
            updater.complete();
        }
    }

    getMaxAbsDelta():number {
        const deltas:number[] = [];
        for (const updater of this._updaters)
            deltas.push(updater.getMaxAbsDelta());
        return Math.max(...deltas);
    }

    clone(target:any = this._targets, query:string|null = this._query):Updater {
        const updater = this._updaters[0];
        if (Array.isArray(target)) {
            const copy:MultiUpdater = new MultiUpdater(target, query);
            copy._updaterType = this._updaterType;
            for (const t of copy._targets) {
                copy._updaters.push(updater.clone(t, query));
            }
            return copy;
        }
        else {
            return updater.clone(target, query);
        }
    }

    toString():string {
        const updater:Updater = this._updaters[0];
        return updater ? updater.toString() : "";
    }
}