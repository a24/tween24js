import Ticker24 from "./Ticker24";
import Ease24 from "./Ease24";

/*
 TODO: 相対値
 TODO: 直前相対値
 TODO: 関数トゥイーン
 TODO: イベントハンドラ
 TODO: 停止、一時停止
 TODO: 回転、幅、高さ
 TODO: スキップ
 TODO: ループ
 TODO: 複数オブジェクト指定
 */
class Tween24 {

	// Static
    static readonly VERSION:string = "0.2.0";
	static readonly TYPE_TWEEN:string = "tween";
	static readonly TYPE_PROP:string = "prop";
	static readonly TYPE_WAIT:string = "wait";
	static readonly TYPE_SERIAL:string = "serial";
	static readonly TYPE_PARALLEL:string = "parallel";
    static readonly TYPE_FUNC:string = "func";

	static ticker:Ticker24;
    static ease:Ease24;

	// Common
	private target:any;
	private easing:Function|null = null;
	private type:string = "";

	private time:number = NaN;
	private delayTime:number = NaN;
	private startTime:number = NaN;
	private startParam:any;
	private targetParam:any;
	private diffParam:any;

	private root:Tween24|null = null;
	private parent:Tween24|null = null;
	private next:Tween24|null = null;

	private inited:boolean = false;
	private isRoot:boolean = false;
	private isContainerTween:boolean = false;

    // Callback
    // private onPlayFunc:Function;
    // private onPlayArgs:Function;
    // private onPauseFunc:Function;
    // private onPauseArgs:Function;
    // private onStopFunc:Function;
    // private onStopArgs:Function;
    // private onCompleteFunc:Function;
    // private onCompleteArgs:Function;

	// Container Tween    
	private childTween:Tween24[]|null = null;
	private firstTween:Tween24|null = null;
	private playingChildTween:Tween24[]|null = null;
	private numChildren:number = 0;
	private numCompleteChildren:number = 0;

    // Action Tween
    private scope:any;
    private func:Function|null = null;
    private args:any[]|null = null;

	constructor() {
        if (!Tween24.ease) Tween24.ease = new Ease24();
		if (!Tween24.ticker) Tween24.ticker = new Ticker24();
	}

	play() {
		this.root = this;
		this.isRoot = true;
		Tween24.ticker.add(this);
		this.__play();
	}
	private __play() {
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


	private __initParam() {
		var target = this.target;
		var startParam = this.startParam;
		var targetParam = this.targetParam;
		var diffParam = this.diffParam;

		for (var p in targetParam) {
			startParam[p] = target[p];
			diffParam[p] = targetParam[p] - startParam[p];
		}
	}

    public __update() {
        var progress = this.getProgress(this.time, this.startTime);

        // Delay
        if (progress < 0) return;

		// Container
		if (this.isContainerTween) {
            if (!this.inited) {
                this.inited = true;
                switch (this.type) {
                    case Tween24.TYPE_SERIAL:
                        if(this.playingChildTween && this.firstTween) {
                            this.playingChildTween.push(this.firstTween);
                            this.firstTween.__play();
                        }
                        break;
                    case Tween24.TYPE_PARALLEL:
                        for (var i = 0; i < this.numChildren; i++) {
                            if (this.playingChildTween && this.childTween) {
                                var tween = this.childTween[i];
                                this.playingChildTween.push(tween);
                                tween.__play();
                            }
                        }
                        break;
                }
            }
            if (this.playingChildTween) {
                for (var i = 0; i < this.playingChildTween.length; i++) {
                    this.playingChildTween[i].__update();
                }
            }
			if (this.numChildren == this.numCompleteChildren) this.__complete();
		}

		// Child
		else {
			var target = this.target;
			if (target) {
				// Init
				if (!this.inited) {
                    this.inited = true;
                    this.__initParam();
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
                    if (this.func) {
                        var func = this.func;
                        var args = this.args;
                        if (args) func.apply(this.scope, args);
                        else func.apply(this.scope);
                    }
                }

                // End
                this.__complete();
            }
		}
	}

    private __complete() {
		this.debugLog(this.type + " complete");
		if (this.isRoot) Tween24.ticker.remove(this);
		if (this.parent) this.parent.__completeChildTween(this);
	}

	private __completeChildTween(tween:Tween24) {
		this.debugLog(this.type + " completeChildTween");
		this.numCompleteChildren++;
        if (this.playingChildTween) {
            this.removeItemFromArray(this.playingChildTween, tween);
            var next = tween.next;
            if (next) {
                this.playingChildTween.push(next);
                next.play();
            }
        }
	}


    // ------------------------------------------
    //
    // Init
    //
    // ------------------------------------------

    private __initChildTween(type:string, target:any, time:number, easing:(Function|null)): Tween24 {
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

    private __initContainerTween(type:string, childTween:Tween24[]): Tween24 {
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

    private __initActionTween(type:string, scope:any, func:Function, args:any[]): Tween24 {
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

    static tween(target:any, time:number, easing:(Function|null) = null): Tween24 {
    	return new Tween24().__initChildTween(Tween24.TYPE_TWEEN, target, time, easing);
    }
    static prop(target:any): Tween24 {
    	return new Tween24().__initChildTween(Tween24.TYPE_PROP, target, 0, null);
	}
	static wait(time:number): Tween24 {
    	return new Tween24().__initChildTween(Tween24.TYPE_WAIT, null, time, null);
    }
    static func = function (scope:any, func:Function, ...args:any[]) {
        return new Tween24().__initActionTween(Tween24.TYPE_FUNC, scope, func, args);
    };
    static serial(...childTween:any[]): Tween24 {
    	return new Tween24().__initContainerTween(Tween24.TYPE_SERIAL, childTween);
    }
	static parallel(...childTween:any[]): Tween24 {
    	return new Tween24().__initContainerTween(Tween24.TYPE_PARALLEL, childTween);
    }


    // ------------------------------------------
    //
    // Util
    //
    // ------------------------------------------

    getTime(): number { return Date.now() || new Date().getTime(); }

    getProgress(time:number, startTime:number): number {
    	var nowTime = this.getTime();
    	if (nowTime < startTime) return -1;
    	else if (time == 0) return 1;
    	else {
    		var progress = (nowTime - startTime) / (time * 1000);
    		return (progress > 1) ? 1 : progress;
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

    trace(value:any) {
        console.log(value);
    }

    debugLog(message:any) {
    	this.trace("[Tween24 " + message + "]")
    }
}

export default Tween24;