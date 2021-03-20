import MultiUpdater from "./MultiUpdater";

export interface Updater {
	constructor:Function;
	init():void;
	addProp(key:string, value:number):void;
	addPropStr(key:string, value:string):void;
	update(progress:number):void;
	overwrite(updater:Updater|MultiUpdater):void;
	complete():void;
}

export default Updater;