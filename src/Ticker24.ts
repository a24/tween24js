module tween24.core {
	export class Ticker24 {
		fps: number;
		allTweens;
		timer: number;
		running: bool;

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
			clearInterval(this.timer);
		}
		add(tween) {
			this.allTweens.push(tween);
			if (!this.running) this.start();
		}
		remove(tween) {
			var allTweens = this.allTweens;
			this.removeItemFromArray(allTweens, tween);
			if (!allTweens.length) {
				this.stop();
				//trace("[Ticker stop]");
			}
		}
		update() {
			for (var i = 0; i < this.allTweens.length; i++) {
				this.allTweens[i].update();
			}
		}

		removeItemFromArray(array, item) {
			for (var i = 0; i < array.length; i++) {
				var it = array[i];
				if (item == it) {
					array.splice(i, 1);
				}
			}
		}
	}
}