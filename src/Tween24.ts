import Ticker24         from "./core/Ticker24";
import Ease24           from "./Ease24";
import Tween24Event     from "./core/Tween24Event";
import Updater          from "./core/updaters/Updater";
import ObjectUpdater    from "./core/updaters/ObjectUpdater";
import TransformUpdater from "./core/updaters/TransformUpdater";
import FunctionExecuter from "./core/FunctionExecuter";
import StyleUpdater     from "./core/updaters/StyleUpdater";
import MultiUpdater     from "./core/updaters/MultiUpdater";
import ArrayUtil        from "./utils/ArrayUtil";
import ClassUtil        from "./utils/ClassUtil";
import HTMLUtil         from "./utils/HTMLUtil";

class Tween24 {

	// Static
	static readonly VERSION      :string = "0.3.0";
	static readonly TYPE_TWEEN   :string = "tween";
	static readonly TYPE_PROP    :string = "prop";
	static readonly TYPE_WAIT    :string = "wait";
	static readonly TYPE_SERIAL  :string = "serial";
	static readonly TYPE_PARALLEL:string = "parallel";
	static readonly TYPE_FUNC    :string = "func";

	static ticker:Ticker24;
	static ease  :Ease24;

	private static _playingTweens:Tween24[];
	private static _playingTweensByTarget:Map<any, Tween24[]>;

	// Common
	private _singleTarget:any     |null = null;
	private _multiTarget :any[]   |null = null;
	private easing       :Function|null = null;
	private type         :string        = "";

	private time     :number = NaN;
	private delayTime:number = NaN;
	private startTime:number = NaN;
    private progress :number = 0;

	// Updater
	private objectUpdater        :ObjectUpdater   |null = null;
	private objectMultiUpdater   :MultiUpdater    |null = null;
	private transformUpdater     :TransformUpdater|null = null;
	private transformMultiUpdater:MultiUpdater    |null = null;
	private styleUpdater         :StyleUpdater    |null = null;
	private styleMultiUpdater    :MultiUpdater    |null = null;
	private allUpdaters          :Updater[]       |null = null;

	// Refer
	private root  :Tween24|null = null;
	private parent:Tween24|null = null;
	private next  :Tween24|null = null;

    // Status
	private inited  :boolean = false;
	private isRoot  :boolean = false;
    private isPaused:boolean = false;
	private isContainerTween:boolean = false;

	// Action & Callback
	private functionExecuters:{[key:string]:FunctionExecuter}|null = null;

	// Container Tween
	private childTween       :Tween24[]|null = null;
	private firstTween       :Tween24|null = null;
	private playingChildTween:Tween24[]|null = null;

	private numChildren        :number = 0;
	private numCompleteChildren:number = 0;
    
    // Tween FPS
    __fps:number = 0;
    __beforeTime:number = 0;

	constructor() {
		Tween24.ease ||= new Ease24();
		Tween24.ticker ||= new Ticker24();
		Tween24._playingTweens ||= [];
		Tween24._playingTweensByTarget ||= new Map<any, Tween24[]>();
	}

	play() {
        if (!this.isPaused) {
            this.root   = this;
            this.isRoot = true;
            this.inited = false;
            this.__play();
            Tween24.ticker.add(this);
            this.functionExecute(Tween24Event.PLAY);
        }
        else {
            this.__resume();
            this.isPaused = false;
            Tween24.ticker.add(this);
            this.functionExecute(Tween24Event.RESUME);
        }
	}

	private __play() {
		this.debugLog(this.type + " play");

        if (!this.isRoot) this.root = this.parent?.root || this.parent;
        this.startTime = Ticker24.getTime() + this.delayTime * 1000;
	}

    private __resume() {
        const nowTime:number = Ticker24.getTime();
        this.startTime = nowTime - this.time * 1000 * this.progress;
        
        if (this.playingChildTween) {
            for (const tween of this.playingChildTween) {
                if (tween.playingChildTween) tween.__resume();
                else tween.startTime = nowTime - tween.time * 1000 * tween.progress;
            }
        }
    }

	pause() {
		if (this.isRoot) {
            this.isPaused = true;
            Tween24.ticker.remove(this);
		    this.functionExecute(Tween24Event.PAUSE);
        }
	}

	stop() {
        this.__stop();
		this.functionExecute(Tween24Event.STOP);
	}

    private __stop() {
		this.tweenStop();
        if (this.childTween) {
            for (const tween of this.childTween) {
                if (tween.childTween) tween.__stop();
                else tween.tweenStop();
            }
        }
    }

	private __initParam() {
		if (this.allUpdaters?.length) {
			for (const updater of this.allUpdaters) {
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
						if (this.objectUpdater   ) (tween.objectMultiUpdater   ||tween.objectUpdater   )?.overwrite(this.objectUpdater);
						if (this.transformUpdater) (tween.transformMultiUpdater||tween.transformUpdater)?.overwrite(this.transformUpdater);
						if (this.styleUpdater    ) (tween.styleMultiUpdater    ||tween.styleUpdater    )?.overwrite(this.styleUpdater);
					}
					else if (this._multiTarget) {
						if      (tween.objectMultiUpdater   ) this.objectMultiUpdater   ?.overwriteMultiTo(tween.objectMultiUpdater);
						else if (tween.objectUpdater        ) this.objectMultiUpdater   ?.overwriteTo     (tween.objectUpdater);
						if      (tween.transformMultiUpdater) this.transformMultiUpdater?.overwriteMultiTo(tween.transformMultiUpdater);
						else if (tween.transformUpdater     ) this.transformMultiUpdater?.overwriteTo     (tween.transformUpdater);
						if      (tween.styleMultiUpdater    ) this.styleMultiUpdater    ?.overwriteMultiTo(tween.styleMultiUpdater);
						else if (tween.styleUpdater         ) this.styleMultiUpdater    ?.overwriteTo     (tween.styleUpdater);
					}
				}
			}
			tweens.push(this);
		}
		else {
			Tween24._playingTweensByTarget.set(target, [this]);
		}
	}

	public __update(nowTime:number) {
		this.updateProgress(this.time, this.startTime, nowTime);

		// Delay
		if (this.progress < 0) return;

		// Container Tween
		if (this.isContainerTween) {
			if (this.inited == false) {
				this.inited = true;
				switch (this.type) {
					case Tween24.TYPE_SERIAL:
						if (this.firstTween) {
							this.playingChildTween?.push(this.firstTween);
							this.firstTween.__play();
						}
						break;
					case Tween24.TYPE_PARALLEL:
                        if (this.childTween) {
                            for (const tween of this.childTween) {
								this.playingChildTween?.push(tween);
								tween.__play();
                            }
                        }
						break;
				}
				this.functionExecute(Tween24Event.INIT);
			}
			// Update
			if (this.playingChildTween) {
                for (const tween of this.playingChildTween) {
					tween.__update(nowTime);
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
				var prog = this.easing ? this.easing(this.progress, 0, 1, 1) : this.progress;
				if (this.allUpdaters?.length) {
					for (const updater of this.allUpdaters) {
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
			if (this.progress >= 1) {
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
		this.tweenStop();
		if (this.parent) this.parent.__completeChildTween(this);
		this.functionExecute(Tween24Event.COMPLATE);
	}

	private tweenStop() {
		if (this.isRoot) Tween24.ticker.remove(this);
        if (this.playingChildTween) this.playingChildTween.length = 0;
        this.numCompleteChildren = 0;
        this.inited = false;

		ArrayUtil.removeItemFromArray(Tween24._playingTweensByTarget.get(this._singleTarget), this);
		ArrayUtil.removeItemFromArray(Tween24._playingTweens, this);
	}

	private __completeChildTween(tween:Tween24) {
		this.debugLog(this.type + " completeChildTween");
		this.numCompleteChildren ++;
        if (this.numChildren == this.numCompleteChildren) {
            this.__complete();
		}
        else if (this.playingChildTween) {
			ArrayUtil.removeItemFromArray(this.playingChildTween, tween);
			var next:Tween24|null = tween.next;
			if (next) {
				this.playingChildTween.push(next);
				next.__play();
			}
		}
	}

	private updateProgress(time:number, startTime:number, nowTime:number): number {
		if (nowTime < startTime) this.progress = -1;
		else if (time == 0) this.progress = 1;
		else {
			this.progress = (nowTime - startTime) / (time * 1000);
			this.progress = (this.progress > 1) ? 1 : this.progress;
		}
        return this.progress;
	}


	// ------------------------------------------
	//
	// Init
	//
	// ------------------------------------------

	private __initChildTween(type:string, target:any, time:number, easing:Function|null, params:{[key:string]:number}|null): Tween24 {
		this.type        = type;
		this.easing      = easing || Ease24._Linear;
		this.time        = time;
		this.delayTime   = 0;
		this.startTime   = 0;
		this.inited      = false;
		this.allUpdaters = [];
		this.isContainerTween = false;

		if (Array.isArray(target)) {
			if (ClassUtil.isString(target[0])) {
				this._multiTarget = [];
				for (const t of target)
					this._multiTarget = this._multiTarget.concat(HTMLUtil.getHTMLElement(t));
				this.transformMultiUpdater = new MultiUpdater(this._multiTarget, TransformUpdater.name);
				this.allUpdaters.push(this.transformMultiUpdater);
			}
			else if (target[0] instanceof HTMLElement) {
				this._multiTarget = target;
				this.transformMultiUpdater = new MultiUpdater(this._multiTarget, TransformUpdater.name);
				this.allUpdaters.push(this.transformMultiUpdater);
			}
			else {
				this._multiTarget = target;
				this.objectMultiUpdater = new MultiUpdater(this._multiTarget, ObjectUpdater.name);
				this.allUpdaters.push(this.objectMultiUpdater);
			}
		}
		else if (ClassUtil.isString(target)) {
			const t:HTMLElement[] = HTMLUtil.getHTMLElement(target);
			if (t.length == 1) {
				this._singleTarget = t[0];
				this.transformUpdater = new TransformUpdater(this._singleTarget);
				this.allUpdaters.push(this.transformUpdater);
			}
			else {
				this._multiTarget = t;
				this.transformMultiUpdater = new MultiUpdater(this._multiTarget, TransformUpdater.name);
				this.allUpdaters.push(this.transformMultiUpdater);
			}
		}
		else {
			this._singleTarget = target;
			this.objectUpdater = new ObjectUpdater(target);
			this.allUpdaters.push(this.objectUpdater);
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
            for (const tween of this.childTween) {
				tween.parent = this;
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

    /**
     * 目標とするX座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value X座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    x (value: number): Tween24 { return this.__setPropety("x", value); }
    
    /**
     * 目標とするY座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	y (value: number): Tween24 { return this.__setPropety("y", value); }
    
    /**
     * 目標とするXとY座標を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} x Y座標
     * @param {number} y Y座標
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	xy (x: number, y: number): Tween24 { return this.__setPropety("x", x).__setPropety("y", y); }
    
    /**
     * 目標とする透明度を設定します。
     * 対象が HTMLElement の場合は、CSS:opacity が適応されます。
     * @param {number} value 透明度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	alpha (value: number): Tween24 { return this.__setPropety("alpha", value); }
    
    /**
     * 目標とする水平スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 水平方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	scaleX (value: number): Tween24 { return this.__setPropety("scaleX", value); }
    
    /**
     * 目標とする垂直スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	scaleY (value: number): Tween24 { return this.__setPropety("scaleY", value); }
    
    /**
     * 目標とするスケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 水平＆垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	scale (value: number): Tween24 { return this.__setPropety("scaleX", value).__setPropety("scaleY", value); }
    
    /**
     * 目標とする水平・垂直スケールを設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} scaleX 水平方向のスケール
     * @param {number} scaleY 垂直方向のスケール
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	scaleXY (scaleX: number, scaleY: number): Tween24 { return this.__setPropety("scaleX", scaleX).__setPropety("scaleY", scaleY); }
    
    /**
     * 目標とする水平傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 水平方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	skewX (value: number): Tween24 { return this.__setPropety("skewX", value); }
    
    /**
     * 目標とする垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	skewY (value: number): Tween24 { return this.__setPropety("skewY", value); }
    
    /**
     * 目標とする水平＆垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 水平＆垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	skew (value: number): Tween24 { return this.__setPropety("skewX", value).__setPropety("skewY", value); }
    
    /**
     * 目標とする水平・垂直傾斜を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} skewX 水平方向の傾斜
     * @param {number} skewY 垂直方向の傾斜
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	skewXY (skewX: number, skewY: number): Tween24 { return this.__setPropety("skewX", skewX).__setPropety("skewY", skewY); }
    
    /**
     * 目標とする回転角度を設定します。
     * 対象が HTMLElement の場合は、CSS:Transform が適応されます。
     * @param {number} value 回転角度
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	rotation (value: number): Tween24 { return this.__setPropety("rotation", value); }
    
    /**
     * トゥイーンの遅延時間を設定します。
     * @param {number} value 遅延時間（秒数）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	delay (value: number): Tween24 { this.delayTime += value; return this; }

    /**
     * 目標とするスタイルシートの値を設定します。
     * 対象が HTMLElement の場合にのみ適応されます。
     * @param {string} name プロパティ名
     * @param {(number|string)} value 目標の値（数値指定の場合は、基本的にpx単位で計算されます）
     * @memberof Tween24
     */
    style (name: string, value: number|string): Tween24 { return this.__setStyle(name, value); }

    /**
     * トゥイーン単体のFPSを設定します。
     * デフォルトでは0が設定され、ブラウザのリフレッシュレートに合わせて描画更新されます。
     * @param {number} fps FPSの値  
     * @return {Tween24}
     * @memberof Tween24
     */
    fps (fps:number): Tween24 { this.__fps = fps; return this; }


	// ------------------------------------------
	//
	// Callback
	//
	// ------------------------------------------

    /**
     * トゥイーン再生時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    onPlay (scope:any, func:Function, ...args:any[]): Tween24 { return this.setFunctionExecute(Tween24Event.PLAY, scope, func, args); }
    
    /**
     * トゥイーン開始時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	onInit (scope:any, func:Function, ...args:any[]): Tween24 { return this.setFunctionExecute(Tween24Event.INIT, scope, func, args); }
    
    /**
     * トゥイーン実行中に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	onUpdate (scope:any, func:Function, ...args:any[]): Tween24 { return this.setFunctionExecute(Tween24Event.UPDATE, scope, func, args); }
    
    /**
     * トゥイーンが一時停止した時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	onPause (scope:any, func:Function, ...args:any[]): Tween24 { return this.setFunctionExecute(Tween24Event.PAUSE, scope, func, args); }

    /**
     * トゥイーンが一時停止中から、再開した時に実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	onResume (scope:any, func:Function, ...args:any[]): Tween24 { return this.setFunctionExecute(Tween24Event.RESUME, scope, func, args); }

    /**
     * トゥイーンが停止された時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	onStop (scope:any, func:Function, ...args:any[]): Tween24 { return this.setFunctionExecute(Tween24Event.STOP, scope, func, args); }
    
    /**
     * トゥイーンが完了した時に、実行する関数を設定します。
     * @param {*} scope 実行する関数のスコープ（関数の定義場所）
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	onComplate (scope:any, func:Function, ...args:any[]): Tween24 { return this.setFunctionExecute(Tween24Event.COMPLATE, scope, func, args); }

	private __setPropety(key:string, value:number):Tween24 {
		if (this._singleTarget) {
			if      (this.objectUpdater   ) this.objectUpdater   .addProp(key, value);
			else if (this.transformUpdater) this.transformUpdater.addProp(key, value);
		}
		else if (this._multiTarget) {
			if      (this.objectMultiUpdater   ) this.objectMultiUpdater   .addProp(key, value);
			else if (this.transformMultiUpdater) this.transformMultiUpdater.addProp(key, value);
		}
		return this;
	}

	private __setStyle(name: string, value: number|string):Tween24 {
		if (this._singleTarget) {
			if (!this.styleUpdater) {
				this.styleUpdater = new StyleUpdater(this._singleTarget);
				this.allUpdaters?.push(this.styleUpdater);
			}
			this.styleUpdater.addPropStr(name, value as string);
		}
		else if (this._multiTarget) {
			if (!this.styleMultiUpdater) {
				this.styleMultiUpdater = new MultiUpdater(this._multiTarget, StyleUpdater.name);
				this.allUpdaters?.push(this.styleMultiUpdater);
			}
			this.styleMultiUpdater.addPropStr(name, value as string);
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

    /**
     * トゥイーンを設定します。
     * @static
     * @param {*} target 対象オブジェクト
     * @param {number} time 時間（秒）
     * @param {Function} [easing=Ease24._Linear] イージング関数（デフォルト値：Ease24._Linear）
     * @param {({[key:string]:number}|null)} [params=null] トゥイーンさせるパラメータ（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
    */
    static tween(target:any, time:number, easing:Function = Ease24._Linear, params:{[key:string]:number}|null = null): Tween24 {
		return new Tween24().__initChildTween(Tween24.TYPE_TWEEN, target, time, easing, params);
	}

    /**
     * プロパティを設定します。
     * @static
     * @param {*} target 対象オブジェクト
     * @param {({[key:string]:number}|null)} [params=null] 設定するパラメータ（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
    */
	static prop(target:any, params:{[key:string]:number}|null = null): Tween24 {
		return new Tween24().__initChildTween(Tween24.TYPE_PROP, target, 0, null, params);
	}
    /**
     * トゥイーンを待機します。
     * @static
     * @param {number} time 待機時間（秒）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static wait(time:number): Tween24 {
		return new Tween24().__initChildTween(Tween24.TYPE_WAIT, null, time, null ,null);
	}

    /**
     * 関数を実行します。
     * @static
     * @param {*} scope 関数が定義されているオブジェクト
     * @param {Function} func 実行する関数
     * @param {...any[]} args 引数（省略可）
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static func(scope:any, func:Function, ...args:any[]): Tween24 {
		return new Tween24().__initActionTween(Tween24.TYPE_FUNC, scope, func, args);
	}

    /**
     * 順番に実行するトゥイーンを設定します。
     * @static
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
    static serial(...childTween:Tween24[]): Tween24 {
		return new Tween24().__initContainerTween(Tween24.TYPE_SERIAL, childTween);
	}
    
    /**
     * 並列に実行するトゥイーンを設定します。
     * @static
     * @param {...Tween24[]} childTween 実行するトゥイーンたち
     * @return {Tween24} Tween24インスタンス
     * @memberof Tween24
     */
	static parallel(...childTween:Tween24[]): Tween24 {
		return new Tween24().__initContainerTween(Tween24.TYPE_PARALLEL, childTween);
	}


	// ------------------------------------------
	//
	// Util
	//
	// ------------------------------------------

    /**
     * トゥイーン全体のFPSを設定します。
     * デフォルトでは0が設定され、ブラウザのリフレッシュレートに合わせて描画更新されます。
     * @static
     * @param {number} [fps=0] FPSの値
     * @memberof Tween24
     */
    static setFPS(fps:number = 0) {
        Tween24.ticker.fps = fps;
    }

	trace(value:any) {
		console.log(value);
	}

	debugLog(message:any) {
		this.trace("[Tween24 " + message + "]")
	}
}

export default Tween24;