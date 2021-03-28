import Tween24   from "../Tween24";
import ArrayUtil from "../utils/ArrayUtil";

export class Ticker24 {
	fps       :number;
	timer     :number;
	beforeTime:number;
	running   :boolean;
	allTweens :Tween24[];

	constructor() {
		this.fps        = 0;
		this.timer      = 0;
		this.beforeTime = 0;
		this.running    = false;
		this.allTweens  = [];
	}

	start() {
		this.running = true;
		var self = this;
		this.timer = window.requestAnimationFrame(function () { self.update() });
	}

	stop() {
		this.running = false;
		window.cancelAnimationFrame(this.timer);
	}

	add(tween:Tween24) {
		this.allTweens.push(tween);
		if (!this.running) this.start();
	}

	remove(tween:Tween24) {
		ArrayUtil.removeItemFromArray(this.allTweens, tween);
		if (this.allTweens.length == 0) {
			this.stop();
		}
	}

	update() {
		const nowTime:number = Ticker24.getTime();
		const tickerCheck:boolean = this.fps ? this.checkInterval(this.fps, this.beforeTime, nowTime) : true;
		for (const tween of this.allTweens) {
			if (tween.__fps) {
				if (this.checkInterval(tween.__fps, tween.__beforeTime, nowTime)) {
					tween.__update(nowTime);
					tween.__beforeTime = nowTime;
				}
			}
			else if (tickerCheck) {
				tween.__update(nowTime);
			}
		}
		if (tickerCheck) {
			this.beforeTime = nowTime;
		}
		if (this.running) {
			var self = this;
			this.timer = window.requestAnimationFrame(function () { self.update() });
		}
	}

	private checkInterval(fps:number, beforeTime:number, nowTime:number):boolean {
		const interval:number = 1000 / fps;
		if (nowTime - beforeTime >= interval) return true;
		else return false;
	}
	
	static getTime(): number {
		return Date.now() || new Date().getTime();
	}
}

export default Ticker24;