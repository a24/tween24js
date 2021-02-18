export interface Updater {
	init():void;
	update(progress:number):void;
	complete():void;
}

export default Updater;