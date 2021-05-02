import { Updater }          from "./Updater";
import { ObjectUpdater }    from "./ObjectUpdater";
import { StyleUpdater }     from "./StyleUpdater";
import { TransformUpdater } from "./TransformUpdater";

export class MultiUpdater implements Updater {
    static type:string = "MultiUpdater";

    private _updaters:Updater[];
    private _updaterType:string|null;
    private _targets:any[];

    constructor(targets:any[], updaterType:string|null, updater:Updater|null) {
        this._targets = targets;
        this._updaterType = updaterType;
        this._updaters = [];

        if (updaterType) {
            for (const t of this._targets) {
                this._updaters.push(this._getUpdaterInstance(t, this._updaterType));
            }
        }
        else if (updater) {
            for (const t of targets) {
                this._updaters.push(updater.clone(t));
            }
        }
    }

    private _getUpdaterInstance(target:any, UpdaterType:string|null):Updater {
        let updater:Updater;
        switch (UpdaterType) {
            case TransformUpdater.className : updater = new TransformUpdater(target); break;
            case StyleUpdater    .className : updater = new StyleUpdater    (target); break;
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

    init() {
        for (const updater of this._updaters) {
            updater.init();
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

    clone(target:any = this._targets):Updater {
        if (Array.isArray(target)) {
            const copy:MultiUpdater = new MultiUpdater(target, this._updaterType, null);
            for (const updater of this._updaters) {
                for (const t of copy._targets) {
                    copy._updaters.push(updater.clone(t));
                }
            }
            return copy;
        }
        else {
            return this._updaters[0].clone(target);
        }
    }

    toString():string {
        const updater:Updater = this._updaters[0];
        return updater ? updater.toString() : "";
    }
}