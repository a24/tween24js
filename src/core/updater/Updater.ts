export interface Updater {
	init():void;
	update(progress:number):void;
	overwrite(updater:Updater):void;
	complete():void;
}

export default Updater;