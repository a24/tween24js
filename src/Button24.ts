import { Tween24  } from "./Tween24";
import { Ease24   } from "./index";
import { Sort24   } from "./index";
import { Event24  } from "./Event24";
import { Text24   } from "./utils/Text24";
import { HTMLUtil } from "./utils/HTMLUtil";
import { ButtonTween24 } from "./ButtonTween24";

export class Button24 {
    private static _DEFAULT_IN_EVENT :string = Event24.MOUSE_ENTER;
    private static _DEFAULT_OUT_EVENT:string = Event24.MOUSE_LEAVE;

    private _targetQuery   :string;
    private _inEventType   :string;
    private _outEventType  :string;
    private _templates     :ButtonTween24[];

    private _inTweens      :Tween24[];
    private _outTweens     :Tween24[];
    private _stopInTweens  :Tween24[];
    private _stopOutTweens :Tween24[];

    private _inEvent       :Event24|null;
    private _outEvent      :Event24|null;
    private _stopInEvent   :Event24|null;
    private _stopOutEvent  :Event24|null;

    private _onResizeBinded:any;

    constructor(targetQuery:string, inEventType:string, outEventType:string, templates:ButtonTween24[]) {
        
        this._targetQuery   = targetQuery;
        this._templates     = templates;
        this._inEventType   = inEventType;
        this._outEventType  = outEventType;
        
        this._inTweens      = [];
        this._outTweens     = [];
        this._stopInTweens  = [];
        this._stopOutTweens = [];

        this._inEvent       = null;
        this._outEvent      = null;
        this._stopInEvent   = null;
        this._stopOutEvent  = null;
        
        this._onResizeBinded = this._onResize.bind(this);

        let needResizse:boolean = false;
        for (const template of templates) {
            if (template.inTween     ) this._inTweens     .push(template.inTween);
            if (template.outTween    ) this._outTweens    .push(template.outTween);
            if (template.stopInTween ) this._stopInTweens .push(template.stopInTween);
            if (template.stopOutTween) this._stopOutTweens.push(template.stopOutTween);
            needResizse ||= template.needResize;
        }
        if (needResizse) this.resizeAndReset();

        this._addEvent();
    }

    private _addEvent() {
        if (this._inTweens .length) this._inEvent  = Event24.add(this._targetQuery, this._inEventType , Tween24.parallel(...this._inTweens));
        if (this._outTweens.length) this._outEvent = Event24.add(this._targetQuery, this._outEventType, Tween24.parallel(...this._outTweens));

        if (this._stopInTweens .length) this._stopInEvent  = Event24.add(this._targetQuery, this._inEventType , Tween24.parallel(...this._stopInTweens )).addStopEvent(this._outEventType);
        if (this._stopOutTweens.length) this._stopOutEvent = Event24.add(this._targetQuery, this._outEventType, Tween24.parallel(...this._stopOutTweens)).addStopEvent(this._inEventType);
    }

    private _onResize(event:Event) {
        this.reset();
    }

    private _onResizeTemplate() {
        for (const template of this._templates) {
            template.onResize();
        }
    }

    reset() {
        Tween24.serial(
            Tween24.func(Event24.removeAllByTarget, this._targetQuery),
            Tween24.func(this._onResizeTemplate.bind(this)),
            Tween24.wait(0.01),
            Tween24.func(this._addEvent.bind(this))
        ).play();
    }

    resizeAndReset():Button24 {
        window.addEventListener("resize", this._onResizeBinded, false);
        return this;
    }

    removeResize():Button24 {
        window.removeEventListener("resize", this._onResizeBinded, false);
        return this;
    }

    willChange(use:boolean = true):Button24 {
        this._inEvent     ?.willChange(use);
        this._outEvent    ?.willChange(use);
        this._stopInEvent ?.willChange(use);
        this._stopOutEvent?.willChange(use);
        return this;
    }

    

    // ------------------------------------------
    //
    // Static method
    //
    // ------------------------------------------

    static set(targetQuery:string, ...templates:ButtonTween24[]):Button24 {
        const btn:Button24 = new Button24(targetQuery, Button24._DEFAULT_IN_EVENT, Button24._DEFAULT_OUT_EVENT, templates);
        return btn;
    }

    static _ColorChange(targetQuery:string, color:string):ButtonTween24 {
        const template:ButtonTween24 = new ButtonTween24();
        const targets:HTMLElement[] = HTMLUtil.querySelectorAll(targetQuery);
        template.setStopInTween (Tween24.tween(targetQuery, 0.3, Ease24._4_QuartOut).color(color));
        template.setStopOutTween(
            Tween24.serial(
                Tween24.prop(targetQuery).color(color),
                Tween24.tween(targetQuery, 0.6, Ease24._4_QuartOut).color(window.getComputedStyle(targets[0]).color)
            )
        );
        return template;
    }

    static _TextRollUp(targetQuery:string, velocity:number = 40, sort:Function = Sort24._Normal, textSpacing:number = 0, lineHeight:string = "1.5"):ButtonTween24 {
        const template:ButtonTween24 = new ButtonTween24();
        const targets:HTMLElement[] = HTMLUtil.querySelectorAll(targetQuery);
        const createText:Function = function() {
            for (const target of targets) {
                const text:Text24 = Text24.getInstance(target) || new Text24(target, target.textContent?.trim() || "", true, true, lineHeight);
                text.spacing = textSpacing;
            }
        }
        createText();
        template.setInTween(
            Tween24.serial(
                Tween24.propText(targetQuery).y(0),
                Tween24.lagTotalSort(0.2, sort,
                    Tween24.tweenTextVelocity(targetQuery, velocity, Ease24._6_ExpoOut).y("-100%")
                )
            )
        );
        template.setResizeFunc(function():void {
            Text24.removeByTarget(targetQuery);
            createText();
        });
        template.needResize = true;
        return template;
    }

    static _TextRollUpDown(targetQuery:string, sort:Function = Sort24._Normal, textSpacing:number = 0, lineHeight:string = "1.5"):ButtonTween24 {
        const template:ButtonTween24 = new ButtonTween24();
        const targets:HTMLElement[] = HTMLUtil.querySelectorAll(targetQuery);
        const createText:Function = function() {
            for (const target of targets) {
                const text:Text24 = Text24.getInstance(target) || new Text24(target, target.textContent?.trim() || "", true, true, lineHeight);
                text.spacing = textSpacing;
            }
        }
        createText();
        template.setStopInTween(
            Tween24.serial(
                Tween24.propText(targetQuery).y(0),
                Tween24.lagTotalSort(0.2, sort,
                    Tween24.tweenTextVelocity(targetQuery, 40, Ease24._6_ExpoOut).y("-100%")
                )
            )
        );
        template.setStopOutTween(
            Tween24.lagTotalSort(0.2, sort,
                Tween24.tweenTextVelocity(targetQuery, 40, Ease24._6_ExpoOut).y(0)
            )
        );
        template.setResizeFunc(function():void {
            Text24.removeByTarget(targetQuery);
            createText();
        });
        template.needResize = true;
        return template;
    }

    static _FadeInOutArrow(targetQuery:string, startX:number|string = "-80%"):ButtonTween24 {
        const template:ButtonTween24 = new ButtonTween24();
        template.setStopInTween(
            Tween24.serial(
                Tween24.prop(targetQuery).x(startX).opacity(0),
                Tween24.tween(targetQuery, 0.4, Ease24._4_QuartOut).x(0).opacity(1)
            )
        );
        template.setStopOutTween(
            Tween24.parallel(
                Tween24.tween(targetQuery, 0.12, Ease24._Linear).opacity(0),
                Tween24.tween(targetQuery, 0.6, Ease24._4_QuartOut).x(startX)
            )
        );
        Tween24.prop(targetQuery).x(startX).opacity(0).play();
        template.needResize = true;
        return template;
    }

    /**
     * ボタンのテキストを、1文字ずつロールアップさせるアニメーションを設定します。
     * @static
     * @param {string} buttonQuery ボタンの対象になるクエリ
     * @param {string} textQuery アニメーションさせるテキストを持っている対象のクエリ
     * @param {number} velocity ロールアップの速度（1秒間の移動ピクセル）
     * @param {number} overTotalLagTime マウスオーバー時のトータル時差（秒）
     * @param {number} outTotalLagTime マウスアウト時のトータル時差（秒）
     * @param {Function} easing ロールアップのイージング
     * @param {Function} sort テキストの再生順をソートする関数
     * @param {number} textSpacing 文字間の調整（px）
     * @param {boolean} [resizeAndReset=false] ウィンドウのリサイズ時に、
     * @memberof Button24
     */
    static setRollUpTextCharacterAnimation(buttonQuery:string, textQuery:string, velocity:number, overTotalLagTime:number, outTotalLagTime:number, easing:Function|null, sort:Function, textSpacing:number, resizeAndReset:boolean = false, lineHeight:string = "1.5") {
        const createButton:Function = function() {
            const targets:HTMLElement[] = HTMLUtil.querySelectorAll(textQuery);
            let text:Text24;
            for (const target of targets) {
                text = new Text24(target, target.textContent?.trim() || "", true, true, lineHeight);
                text.spacing = textSpacing;
            }
            const setEvent:Function = function() {
                Event24.add(buttonQuery, Event24.MOUSE_ENTER, 
                    Tween24.lagTotalSort(overTotalLagTime, sort,
                        Tween24.tweenTextVelocity(textQuery, velocity, easing).y("-100%")
                    )
                ).addStopEvent(Event24.MOUSE_LEAVE);
                Event24.add(buttonQuery, Event24.MOUSE_LEAVE, 
                    Tween24.lagTotalSort(outTotalLagTime, sort,
                        Tween24.tweenTextVelocity(textQuery, velocity, easing).y(0)
                    )
                ).addStopEvent(Event24.MOUSE_ENTER);
            }
            setEvent();
        }
        if (resizeAndReset) {
            Event24.add(window, "resize", 
                Tween24.serial(
                    Tween24.func(Event24.removeAllByTarget, buttonQuery),
                    Tween24.func(Text24.removeByTarget, textQuery),
                    Tween24.wait(0.01),
                    Tween24.func(createButton)
                )
            );
        }
        createButton();
    }
}