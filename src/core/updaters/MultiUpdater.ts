import Tween24 from "../../Tween24";
import ObjectUpdater from "./ObjectUpdater";
import TransformUpdater from "./TransformUpdater";
import Updater from "./Updater";

export class MultiUpdater implements Updater {

	private _updaters:Updater[];
	private _updatersByTarget:Map<any, Updater>;

	constructor(targets:any[], UpdaterType:string) {
		this._updaters = [];
		this._updatersByTarget = new Map<any, Updater>();

		let updater:Updater;
		for (const t of targets) {
			updater = this.getUpdaterInstance(t, UpdaterType);
			this._updaters.push(updater);
			this._updatersByTarget.set(t, updater);
		}
	}

	private getUpdaterInstance(target:any, UpdaterType:string):Updater {
		let updater:Updater;
		switch (UpdaterType) {
			case TransformUpdater.name : updater = new TransformUpdater(target); break;
			default                    : updater = new ObjectUpdater(target);
		}
		return updater;
	}

	addProp(key:string, value:number) {
		for (const updater of this._updaters) {
			updater.addProp(key, value);
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
}

export default MultiUpdater;