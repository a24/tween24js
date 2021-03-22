export class ParamUpdater {
	key   : string;
	target: number;
	start : number;
	delta : number;
	value : number;

	constructor(key:string, value:number) {
		this.key    = key;
		this.target = value;
		this.start  = 0;
		this.delta  = 0;
		this.value  = 0;
	}

	init(start:number) {
		this.start  = start;
		this.delta  = this.target - start;
		this.value  = this.start;
	}

	update(progress:number):number {
		this.value = this.start + this.delta * progress;
		return this.value;
	}	
}

export default ParamUpdater;