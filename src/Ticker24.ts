import Tween24 from "./Tween24";

export class Ticker24 {
	fps:number;
	allTweens:Tween24[];
	timer:NodeJS.Timeout|null;
	running:boolean;

	constructor() {
		this.fps = 60;
		this.allTweens = [];
		this.timer = null;
		this.running = false;
	}

	start() {
		this.running = true;
		var self = this;
		this.timer = setInterval(function () { self.update(); }, 1000 / this.fps);
	}
	stop() {
		this.running = false;
		if (this.timer) clearInterval(this.timer);
	}
	add(tween:Tween24) {
		this.allTweens.push(tween);
		if (!this.running) this.start();
	}
	remove(tween:Tween24) {
		var allTweens = this.allTweens;
		this.removeItemFromArray(allTweens, tween);
		if (!allTweens.length) {
			this.stop();
			//trace("[Ticker stop]");
		}
	}
	update() {
		for (var i = 0; i < this.allTweens.length; i++) {
			this.allTweens[i].__update();
		}
	}

	removeItemFromArray(array:any[], item:any) {
		for (var i = 0; i < array.length; i++) {
			var it = array[i];
			if (item == it) {
				array.splice(i, 1);
			}
		}
	}
}

export default Ticker24;