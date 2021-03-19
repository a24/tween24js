import Ticker24 from "./core/Ticker24";
import Updater from "./core/updaters/Updater";
import ObjectUpdater from "./core/updaters/ObjectUpdater";
import TransformUpdater from "./core/updaters/TransformUpdater";
import Ease24 from "./Ease24";
import ArrayUtil from "./utils/ArrayUtil";
import ClassUtil from "./utils/ClassUtil";
import HTMLUtil from "./utils/HTMLUtil";
import MultiUpdater from "./core/updaters/MultiUpdater";
import FunctionExecuter from "./core/FunctionExecuter";
import Tween24Event from "./core/Tween24Event";

class Tween24 {

	// Static
    static readonly VERSION:string = "0.3.0";
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
	private _singleTarget:any|null;
	private _multiTarget:any[]|null = null;
	private easing:Function|null = null;
	private type:string = "";

	private time:number = NaN;
	private delayTime:number = NaN;
	private startTime:number = NaN;

    // Updater
    private objectUpdater:ObjectUpdater|null = null;
    private objectMultiUpdater:MultiUpdater|null = null;
    private transformUpdater:TransformUpdater|null = null;
    private transformMultiUpdater:MultiUpdater|null = null;
    private updaters:Updater[]|null = null;

    // Refer
	private root:Tween24|null = null;
	private parent:Tween24|null = null;
	private next:Tween24|null = null;

    // Flag
	private inited:boolean = false;
	private isRoot:boolean = false;
	private isContainerTween:boolean = false;

    // Action & Callback
    private functionExecuters:{[key:string]:FunctionExecuter}|null = null;

	// Container Tween    
	private childTween:Tween24[]|null = null;
	private firstTween:Tween24|null = null;
	private playingChildTween:Tween24[]|null = null;
	private numChildren:number = 0;
	private numCompleteChildren:number = 0;

	constructor() {
        Tween24.ease ||= new Ease24();
		Tween24.ticker ||= new Ticker24();
		Tween24._playingTweens ||= [];
		Tween24._playingTweensByTarget ||= new Map<any, Tween24[]>();
	}

	play() {
		this.root = this;
		this.isRoot = true;
        this.inited = false;
		Tween24.ticker.add(this);
		this.__play();
	}

	private __play() {
		this.debugLog(this.type + " play");

		if (!this.isRoot) {
			this.root = this.parent?.root || this.parent;
		}

        this.startTime = this.getTime() + this.delayTime * 1000;
        this.functionExecute(Tween24Event.PLAY);
	}

	stop() {
		this.__tweenStop();
        this.functionExecute(Tween24Event.STOP);
	}

	// pause() {
	// }

	private __initParam() {
        if (this.updaters?.length) {
            for (const updater of this.updaters) {
                updater.init();
            }
        }
        
        // Overwrite
        if (this._singleTarget)
            this.overwrite(this._singleTarget);
        else if (this._multiTarget) {
            for (const target of this._multiTarget) {
                this.overwrite(target);
            }
        }
        Tween24._playingTweens.push(this);
	}

    private overwrite(target:any) {
        let tweens:Tween24[]|undefined = Tween24._playingTweensByTarget.get(target);
        if (tweens) {
            for (const tween of tweens) {
                if (this !== tween) {
                    if (this._singleTarget) {
                        if (this.objectUpdater)    (tween.objectMultiUpdater   ||tween.objectUpdater   )?.overwrite(this.objectUpdater);
                        if (this.transformUpdater) (tween.transformMultiUpdater||tween.transformUpdater)?.overwrite(this.transformUpdater);
                    }
                    else if (this._multiTarget) {
                        if      (tween.objectMultiUpdater)    this.objectMultiUpdater   ?.overwriteMultiTo(tween.objectMultiUpdater);
                        else if (tween.objectUpdater)         this.objectMultiUpdater   ?.overwriteTo     (tween.objectUpdater);
                        if      (tween.transformMultiUpdater) this.transformMultiUpdater?.overwriteMultiTo(tween.transformMultiUpdater);
                        else if (tween.transformUpdater)      this.transformMultiUpdater?.overwriteTo     (tween.transformUpdater);
                    }
                }
            }
            tweens.push(this);
        }
        else {
            Tween24._playingTweensByTarget.set(target, [this]);
        }
    }

    public __update() {
        var progress = this.getProgress(this.time, this.startTime);

        // Delay
        if (progress < 0) return;

		// Container Tween
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
                this.functionExecute(Tween24Event.INIT);
            }
            // Update
            if (this.playingChildTween) {
                for (var i = 0; i < this.playingChildTween.length; i++) {
                    this.playingChildTween[i].__update();
                }
            }
            this.functionExecute(Tween24Event.UPDATE);
			if (this.numChildren == this.numCompleteChildren) this.__complete();
		}

		// Child Tween
		else {
			if (this._singleTarget || this._multiTarget) {
				// Init
				if (!this.inited) {
                    this.inited = true;
                    this.__initParam();
                    this.functionExecute(Tween24Event.INIT);
				}

				// Update propety
				var prog = this.easing ? this.easing(progress, 0, 1, 1) : progress;
                if (this.updaters?.length) {
                    for (const updater of this.updaters) {
                        updater.update(prog);
                    }
                }
                this.functionExecute(Tween24Event.UPDATE);
			}
            else {
				// Init
				if (!this.inited) {
                    this.inited = true;
                    this.functionExecute(Tween24Event.INIT);
				}
                this.functionExecute(Tween24Event.UPDATE);
            }

			// Complete
			if (progress >= 1) {
                // Func
                if (this.type == Tween24.TYPE_FUNC) {
                    this.functionExecute(Tween24.TYPE_FUNC);
                }

                // End
                this.__complete();
            }
		}
	}

    private __complete() {
		this.debugLog(this.type + " complete");
		this.__tweenStop();
		if (this.parent) this.parent.__completeChildTween(this);
        this.functionExecute(Tween24Event.COMPLATE);
	}

    private __tweenStop() {
		if (this.isRoot) Tween24.ticker.remove(this);
        ArrayUtil.removeItemFromArray(Tween24._playingTweensByTarget.get(this._singleTarget), this);
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

    private __initChildTween(type:string, target:any, time:number, easing:Function|null, params:{[key:string]:number}|null): Tween24 {
        this.type      = type;
        this.easing    = easing || Ease24._Linear;
        this.time      = time;
        this.delayTime = 0;
        this.startTime = 0;
        this.inited    = false;
        this.updaters  = [];
        this.isContainerTween = false;

        if (Array.isArray(target)) {
            if (ClassUtil.isString(target[0])) {
                this._multiTarget = [];
                for (const t of target)
                    this._multiTarget = this._multiTarget.concat(HTMLUtil.getHTMLElement(t));
                this.transformMultiUpdater = new MultiUpdater(this._multiTarget, TransformUpdater.name);
                this.updaters.push(this.transformMultiUpdater);
            }
            else if (target[0] instanceof HTMLElement) {
                this._multiTarget = target;
                this.transformMultiUpdater = new MultiUpdater(this._multiTarget, TransformUpdater.name);
                this.updaters.push(this.transformMultiUpdater);
            }
            else {
                this._multiTarget = target;
                this.objectMultiUpdater = new MultiUpdater(this._multiTarget, ObjectUpdater.name);
                this.updaters.push(this.objectMultiUpdater);
            }
        }
        else if (ClassUtil.isString(target)) {
            const t:HTMLElement[] = HTMLUtil.getHTMLElement(target);
            if (t.length == 1) {
                this._singleTarget = t[0];
                this.transformUpdater = new TransformUpdater(this._singleTarget);
                this.updaters.push(this.transformUpdater);
            }
            else {
                this._multiTarget = t;
                this.transformMultiUpdater = new MultiUpdater(this._multiTarget, TransformUpdater.name);
                this.updaters.push(this.transformMultiUpdater);
            }
        }
        else {
            this._singleTarget = target;
            this.objectUpdater = new ObjectUpdater(target);
            this.updaters.push(this.objectUpdater);
        }

        if (params) {
            for (const key in params) {
                this.__setPropety(key, params[key]);
            }
        }

        return this;
    }

    private __initContainerTween(type:string, childTween:Tween24[]): Tween24 {
        this.type       = type;
        this.time       = 0;
        this.delayTime  = 0;
        this.childTween = childTween;
        this.firstTween = this.childTween[0];
        this.playingChildTween   = [];
        this.numChildren         = childTween.length;
        this.numCompleteChildren = 0;
        this.isContainerTween    = true;

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

    private __initActionTween(type:string, scope:any, func:Function, args:any[]) {
        this.type      = type;
        this.time      = 0;
        this.delayTime = 0;
        this.startTime = 0;
        this.inited    = false;
        this.isContainerTween = false;

        switch (this.type) {
            case Tween24.TYPE_FUNC: this.setFunctionExecute(Tween24.TYPE_FUNC, scope, func, args);
        }
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

    onPlay    (scope:any, func:Function, ...args:any[]): Tween24 { return this.setFunctionExecute(Tween24Event.PLAY    , scope, func, args); }
    onInit    (scope:any, func:Function, ...args:any[]): Tween24 { return this.setFunctionExecute(Tween24Event.INIT    , scope, func, args); }
    onUpdate  (scope:any, func:Function, ...args:any[]): Tween24 { return this.setFunctionExecute(Tween24Event.UPDATE  , scope, func, args); }
    onPause   (scope:any, func:Function, ...args:any[]): Tween24 { return this.setFunctionExecute(Tween24Event.PAUSE   , scope, func, args); }
    onStop    (scope:any, func:Function, ...args:any[]): Tween24 { return this.setFunctionExecute(Tween24Event.STOP    , scope, func, args); }
    onComplate(scope:any, func:Function, ...args:any[]): Tween24 { return this.setFunctionExecute(Tween24Event.COMPLATE, scope, func, args); }

    private __setPropety(key:string, value:number):Tween24 {
        if (this._singleTarget) {
            if      (this.objectUpdater)    this.objectUpdater   .addProp(key, value);
            else if (this.transformUpdater) this.transformUpdater.addProp(key, value);
        }
        else if (this._multiTarget) {
            if      (this.objectMultiUpdater)    this.objectMultiUpdater   .addProp(key, value);
            else if (this.transformMultiUpdater) this.transformMultiUpdater.addProp(key, value);
        }
        return this;
    }

    private setFunctionExecute(key:string, scope:any, func:Function, args:any[]):Tween24 {
        this.functionExecuters ||= {};
        this.functionExecuters[key] = new FunctionExecuter(scope, func, args);
        return this;
    }

    private functionExecute(key:string) {
        if (this.functionExecuters) {
            this.functionExecuters[key]?.execute();
        }
    }

	// ------------------------------------------
	//
	// Tween
	//
	// ------------------------------------------

    static tween(target:any, time:number, easing:Function|null = null, params:{[key:string]:number}|null = null): Tween24 {
    	return new Tween24().__initChildTween(Tween24.TYPE_TWEEN, target, time, easing, params);
    }
    static prop(target:any, params:{[key:string]:number}|null = null): Tween24 {
    	return new Tween24().__initChildTween(Tween24.TYPE_PROP, target, 0, null, params);
	}
	static wait(time:number): Tween24 {
    	return new Tween24().__initChildTween(Tween24.TYPE_WAIT, null, time, null ,null);
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