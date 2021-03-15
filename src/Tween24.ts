import Ticker24 from "./core/Ticker24";
import Updater from "./core/updaters/Updater";
import ObjectUpdater from "./core/updaters/ObjectUpdater";
import TransformUpdater from "./core/updaters/TransformUpdater";
import Ease24 from "./Ease24";
import ArrayUtil from "./utils/ArrayUtil";
import TypeUtil from "./utils/TypeUtil";
import HTMLUtil from "./utils/HTMLUtil";

class Tween24 {

	// Static
    static readonly VERSION:string = "0.2.3";
	static readonly TYPE_TWEEN:string = "tween";
	static readonly TYPE_PROP:string = "prop";
	static readonly TYPE_WAIT:string = "wait";
	static readonly TYPE_SERIAL:string = "serial";
	static readonly TYPE_PARALLEL:string = "parallel";
    static readonly TYPE_FUNC:string = "func";

	static ticker:Ticker24;
    static ease:Ease24;
    private static _playingTweens:Tween24[];
    private static _playingTweensByTarget:Map<any, Tween24[]>;

	// Common
	private target:any;
	private easing:Function|null = null;
	private type:string = "";

	private time:number = NaN;
	private delayTime:number = NaN;
	private startTime:number = NaN;

    // Updater
    private objectUpdater:ObjectUpdater|null = null;
    private transformUpdater:TransformUpdater|null = null;
    private updaters:Updater[];

    // Refer
	private root:Tween24|null = null;
	private parent:Tween24|null = null;
	private next:Tween24|null = null;

    // Flag
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
		if (!Tween24._playingTweensByTarget) Tween24._playingTweensByTarget = new Map<any, Tween24[]>();
		if (!Tween24._playingTweens) Tween24._playingTweens = [];
        this.updaters = [];
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
        if (this.updaters.length) {
            for (const updater of this.updaters) {
                updater.init();
            }
        }
        
        // Overwrite
        const tweens:Tween24[]|undefined = Tween24._playingTweensByTarget.get(this.target);
        if (tweens) {
            for (const tween of tweens) {
                if (this !== tween) {
                    if (this.objectUpdater)    tween.objectUpdater?.overwrite(this.objectUpdater);
                    if (this.transformUpdater) tween.transformUpdater?.overwrite(this.transformUpdater);
                }
            }
            tweens.push(this);
        }
        else {
            Tween24._playingTweensByTarget.set(this.target, [this]);
        }
        Tween24._playingTweens.push(this);
	}

    public __update() {
        var progress = this.getProgress(this.time, this.startTime);

        // Delay
        if (progress < 0) return;

		// Container
		if (this.isContainerTween) {
            if (this.inited == false) {
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
				var prog = this.easing ? this.easing(progress, 0, 1, 1) : progress;
                if (this.updaters.length) {
                    for (const updater of this.updaters) {
                        updater.update(prog);
                    }
                }
                this.objectUpdater?.update(prog);
                this.transformUpdater?.update(prog);
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
        ArrayUtil.removeItemFromArray(Tween24._playingTweensByTarget.get(this.target), this);
        ArrayUtil.removeItemFromArray(Tween24._playingTweens, this);
	}

	private __completeChildTween(tween:Tween24) {
		this.debugLog(this.type + " completeChildTween");
		this.numCompleteChildren++;
        if (this.playingChildTween) {
            ArrayUtil.removeItemFromArray(this.playingChildTween, tween);
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
        this.easing = easing || Ease24._Linear;
        this.time = time;
        this.delayTime = 0;
        this.startTime = 0;
        this.inited = false;
        this.isContainerTween = false;

        if (TypeUtil.isString(target)) {
            this.target = HTMLUtil.getHTMLElement(target)[0];
            this.transformUpdater = new TransformUpdater(this.target);
            this.updaters.push(this.transformUpdater);
        }
        else {
            this.target = target;
            this.objectUpdater = new ObjectUpdater(target);
            this.updaters.push(this.objectUpdater);
        }

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
	
    x       (value: number): Tween24 { return this.__setPropety("x", value); }
	y       (value: number): Tween24 { return this.__setPropety("y", value); }
	xy      (x: number, y: number): Tween24 { return this.__setPropety("x", x).__setPropety("y", y); }
	alpha   (value: number): Tween24 { return this.__setPropety("alpha", value); }
	scaleX  (value: number): Tween24 { return this.__setPropety("scaleX", value); }
	scaleY  (value: number): Tween24 { return this.__setPropety("scaleY", value); }
	scale   (scale: number): Tween24 { return this.__setPropety("scaleX", scale).__setPropety("scaleY", scale); }
	scaleXY (scaleX: number, scaleY: number): Tween24 { return this.__setPropety("scaleX", scaleX).__setPropety("scaleY", scaleY); }
	skewX   (value: number): Tween24 { return this.__setPropety("skewX", value); }
	skewY   (value: number): Tween24 { return this.__setPropety("skewY", value); }
	skew    (skew: number): Tween24 { return this.__setPropety("skewX", skew).__setPropety("skewY", skew); }
	skewXY  (skewX: number, skewY: number): Tween24 { return this.__setPropety("skewX", skewX).__setPropety("skewY", skewY); }
	rotation(value: number): Tween24 { return this.__setPropety("rotation", value); }
	delay   (value: number): Tween24 { this.delayTime += value; return this; }

    private __setPropety(key:string, value:number):Tween24 {
        if (this.objectUpdater){
            this.objectUpdater.addProp(key, value);
        }
        else if (this.transformUpdater) {
            this.transformUpdater.addProp(key, value);
        }
        return this;
    }

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

    trace(value:any) {
        console.log(value);
    }

    debugLog(message:any) {
    	this.trace("[Tween24 " + message + "]")
    }
}

export default Tween24;