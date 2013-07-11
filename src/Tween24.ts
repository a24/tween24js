/// <reference path="Ticker24.ts"/>
/// <reference path="/Ease24.ts"/>

class Tween24 {

	// Static
    static VERSION: string = "0.2.0";
	static TYPE_TWEEN: string = "tween";
	static TYPE_PROP: string = "prop";
	static TYPE_WAIT: string = "wait";
	static TYPE_SERIAL: string = "serial";
	static TYPE_PARALLEL: string = "parallel";
    static TYPE_FUNC: string = "func";

	static ticker: tween24.core.Ticker24;
    static ease: Ease24;

	// Common
	private target: any;
	private easing: Function;
	private type: string;

	private time: number;
	private delayTime: number;
	private startTime: number;
	private startParam: any;
	private targetParam: any;
	private diffParam: any;

	private root = null;
	private parent = null;
	private next = null;
	private nextTween = null;

	private inited: bool;
	private isRoot: bool;
	private isContainerTween: bool;

	// Container Tween
	private childTween;
	private firstTween;
	private playingChildTween;
	private numChildren;
	private numCompleteChildren;

    // Action Tween
    private scope:any;
    private func:Function;
    private args:any[];

	constructor() {
        if (!Tween24.ease) Tween24.ease = new Ease24();
		if (!Tween24.ticker) Tween24.ticker = new tween24.core.Ticker24();
	}

	play() {
		this.root = this;
		this.isRoot = true;
		Tween24.ticker.add(this);
		this._play();
	}
	private _play() {
		this.debugLog(this.type + " play");

		if (!this.isRoot) {
			if (this.parent) this.root = this.parent.root || this.parent;
		}

        this.startTime = this.getTime() + this.delayTime * 1000;
	}
	stop() {
		if (this.isRoot) Tween24.ticker.remove(this);
	}
	pause() {
	}


	private init() {
		var target = this.target;
		var startParam = this.startParam;
		var targetParam = this.targetParam;
		var diffParam = this.diffParam;

		for (var p in targetParam) {
			startParam[p] = target[p];
			diffParam[p] = targetParam[p] - startParam[p];
		}
	}

    private update() {
        var progress = this.getProgress(this.time, this.startTime);

        // Delay
        if (progress < 0) return;

		// Container
		if (this.isContainerTween) {
            if (!this.inited) {
                this.inited = true;
                switch (this.type) {
                    case Tween24.TYPE_SERIAL:
                        this.playingChildTween.push(this.firstTween);
                        this.firstTween._play();
                        break;
                    case Tween24.TYPE_PARALLEL:
                        for (var i = 0; i < this.numChildren; i++) {
                            var tween = this.childTween[i];
                            this.playingChildTween.push(tween);
                            tween._play();
                        }
                        break;
                }
            }
			for (var i = 0; i < this.playingChildTween.length; i++) {
				this.playingChildTween[i].update();
			}
			if (this.numChildren == this.numCompleteChildren) this.complete();
		}

		// Child
		else {
			var target = this.target;
			if (target) {
				// Init
				if (!this.inited) {
                    this.inited = true;
                    this.init();
				}

				// Update propety
				var startParam = this.startParam;
				var diffParam = this.diffParam;
				var prog = this.easing ? this.easing(progress, 0, 1, 1) : progress;

				for (var pn in startParam) {
					target[pn] = startParam[pn] + (diffParam[pn] * prog);
				}
			}

			// Complete
			if (progress >= 1) {
                // Func
                if (this.type == Tween24.TYPE_FUNC) {
                    var func = this.func;
                    var args = this.args;
                    if (args) func.apply(this.scope, args);
                    else func.apply(this.scope);
                }

                // End
                this.complete();
            }
		}
	}

    private complete() {
		this.debugLog(this.type + " complete");
		if (this.isRoot) Tween24.ticker.remove(this);
		if (this.parent) this.parent.completeChildTween(this);
	}

	private completeChildTween(tween) {
		this.debugLog(this.type + " completeChildTween");
		this.numCompleteChildren++;
		this.removeItemFromArray(this.playingChildTween, tween);
		var next = tween.next;
		if (next) {
			this.playingChildTween.push(next);
			next.play();
		}
	}


    // ------------------------------------------
    //
    // Init
    //
    // ------------------------------------------

    private initChildTween(type: string, target: any, time: number, easing: Function): Tween24 {
        this.type = type;
        this.target = target;
        this.easing = easing || Ease24._Linear;
        this.time = time;
        this.delayTime = 0;
        this.startTime = 0;
        this.startParam = {};
        this.targetParam = {};
        this.diffParam = {};
        this.inited = false;
        this.isContainerTween = false;
        return this;
    }

    private initContainerTween(type, childTween): Tween24 {
        this.type = type;
        this.time = 0;
        this.delayTime = 0;
        this.childTween = childTween;
        this.firstTween = this.childTween[0];
        this.playingChildTween = [];

        this.numChildren = childTween.length;
        this.numCompleteChildren = 0;
        this.isContainerTween = true;

        var prev = this.firstTween;
        var next;
        if (type == Tween24.TYPE_SERIAL) {
            for (var i = 0; i < this.numChildren; i++) {
                next = this.childTween[i + 1];
                prev.next = next;
                prev.parent = this;
                prev = next;
            }
        }
        else {
            for (var i = 0; i < this.numChildren; i++) {
                this.childTween[i].parent = this;
            }
        }
        return this;
    }

    private initActionTween(type:string, scope, func, args): Tween24 {
        this.type = type;
        this.scope = scope;
        this.func = func;
        this.args = args;
        this.time = 0;
        this.delayTime = 0;
        this.startTime = 0;
        this.inited = false;
        this.isContainerTween = false;
        return this;
    }


    // ------------------------------------------
    //
    // Propety
    //
    // ------------------------------------------
	
    x(value: number): Tween24 { this.targetParam.x = value; return this; }
	y(value: number): Tween24 { this.targetParam.y = value; return this; }
	xy(x: number, y: number): Tween24 { this.targetParam.x = x; this.targetParam.y = y; return this; }
	alpha(value: number): Tween24 { this.targetParam.alpha = value; return this; }
	delay(value: number): Tween24 { this.delayTime += value; return this; }


	// ------------------------------------------
	//
	// Tween
	//
	// ------------------------------------------

    static tween(target:any, time:number, easing:Function = null): Tween24 {
    	return new Tween24().initChildTween(Tween24.TYPE_TWEEN, target, time, easing);
    }
    static prop(target:any): Tween24 {
    	return new Tween24().initChildTween(Tween24.TYPE_PROP, target, 0, null);
	}
	static wait(time:number): Tween24 {
    	return new Tween24().initChildTween(Tween24.TYPE_WAIT, null, time, null);
    }
    static func = function (scope, func, ...args:any[]) {
        return new Tween24().initActionTween(Tween24.TYPE_FUNC, scope, func, args);
    };
    static serial(...childTween:any[]): Tween24 {
    	return new Tween24().initContainerTween(Tween24.TYPE_SERIAL, childTween);
    }
	static parallel(...childTween:any[]): Tween24 {
    	return new Tween24().initContainerTween(Tween24.TYPE_PARALLEL, childTween);
    }


    // ------------------------------------------
    //
    // Util
    //
    // ------------------------------------------

    getTime(): number { return Date.now() || new Date().getTime(); }

    getProgress(time, startTime): number {
    	var nowTime = this.getTime();
    	if (nowTime < startTime) return -1;
    	else if (time == 0) return 1;
    	else {
    		var progress = (nowTime - startTime) / (time * 1000);
    		return (progress > 1) ? 1 : progress;
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

    trace(value) {
        console.log(value);
    }

    debugLog(message) {
    	this.trace("[Tween24 " + message + "]")
    }
}