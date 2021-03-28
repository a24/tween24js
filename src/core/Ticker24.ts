import Tween24   from "../Tween24";
import ArrayUtil from "../utils/ArrayUtil";

export class Ticker24 {
	private _fps       :number;
	private _timer     :number;
	private _beforeTime:number;
	private _running   :boolean;
	private _allTweens :Tween24[];

	constructor() {
		this._fps        = 0;
		this._timer      = 0;
		this._beforeTime = 0;
		this._running    = false;
		this._allTweens  = [];
	}

	start() {
		this._running = true;
		var self = this;
		this._timer = window.requestAnimationFrame(function () { self.update() });
	}

	stop() {
		this._running = false;
		window.cancelAnimationFrame(this._timer);
	}

	add(tween:Tween24) {
		this._allTweens.push(tween);
		if (!this._running) this.start();
	}

	remove(tween:Tween24) {
		ArrayUtil.removeItemFromArray(this._allTweens, tween);
		if (this._allTweens.length == 0) {
			this.stop();
		}
	}

	update() {
		const nowTime:number = Ticker24.getTime();
		const tickerCheck:boolean = this._fps ? this._checkInterval(this._fps, this._beforeTime, nowTime) : true;
		for (const tween of this._allTweens) {
			if (tween.__fps) {
				if (this._checkInterval(tween.__fps, tween.__beforeTime, nowTime)) {
					tween._update(nowTime);
					tween.__beforeTime = nowTime;
				}
			}
			else if (tickerCheck) {
				tween._update(nowTime);
			}
		}
		if (tickerCheck) {
			this._beforeTime = nowTime;
		}
		if (this._running) {
			var self = this;
			this._timer = window.requestAnimationFrame(function () { self.update() });
		}
	}

	set fps(value:number) {
		this._fps = value;
	}

	private _checkInterval(fps:number, beforeTime:number, nowTime:number):boolean {
		const interval:number = 1000 / fps;
		if (nowTime - beforeTime >= interval) return true;
		else return false;
	}
	
	static getTime(): number {
		return Date.now() || new Date().getTime();
	}
}

export default Ticker24;