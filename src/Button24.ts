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

    private _addEvent = () => {
        if (this._inTweens .length) this._inEvent  = Event24.add(this._targetQuery, this._inEventType , Tween24.parallel(...this._inTweens));
        if (this._outTweens.length) this._outEvent = Event24.add(this._targetQuery, this._outEventType, Tween24.parallel(...this._outTweens));

        if (this._stopInTweens .length) this._stopInEvent  = Event24.add(this._targetQuery, this._inEventType , Tween24.parallel(...this._stopInTweens )).addStopEvent(this._outEventType);
        if (this._stopOutTweens.length) this._stopOutEvent = Event24.add(this._targetQuery, this._outEventType, Tween24.parallel(...this._stopOutTweens)).addStopEvent(this._inEventType);
    }

    private _onResize = (event:Event) => {
        this.reset();
    }

    private _onResizeTemplate = () => {
        for (const template of this._templates) {
            template.onResize();
        }
    }

    /**
     * アニメーションを設定し直します。
     * @memberof Button24
     */
    reset = () => {
        Tween24.serial(
            Tween24.func(Event24.removeAllByTarget, this._targetQuery),
            Tween24.func(this._onResizeTemplate),
            Tween24.wait(0.01),
            Tween24.func(this._addEvent)
        ).play();
    }

    /**
     * ウィンドウのりサイズ時に、アニメーションを設定し直します。
     * @memberof Button24
     */
    resizeAndReset = ():Button24 =>  {
        window.addEventListener("resize", this._onResize, false);
        return this;
    }

    /**
     * ウィンドウのりサイズ時に、アニメーションを設定し直す設定を解除します。
     * @memberof Button24
     */
    removeResize = ():Button24 => {
        window.removeEventListener("resize", this._onResize, false);
        return this;
    }

    /**
     * アニメーションの willChange を有効にするか設定します。
     * 有効にすると強力な最適化をブラウザーが行い、アニメーションが滑らかになります。
     * @param {boolean} [use=true] willChange を有効にするか
     * @memberof Button24
     */
    willChange = (use:boolean = true):Button24 => {
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

    /**
     * テンプレートを指定して、ボタンアニメーションを設定します。
     * @static
     * @param {string} targetQuery
     * @param {...ButtonTween24[]} templates
     * @return {Button24}  {Button24}
     * @memberof Button24
     */
    static set(targetQuery:string, ...templates:ButtonTween24[]):Button24 {
        const btn:Button24 = new Button24(targetQuery, Button24._DEFAULT_IN_EVENT, Button24._DEFAULT_OUT_EVENT, templates);
        return btn;
    }

    /**
     * ボタンのテキストに、色を変えるアニメーションを設定します。
     * @static
     * @param {string} targetQuery アニメーションの対象を指定するクエリ
     * @param {string} colorCode 変更後の色のカラーコード
     * @return {ButtonTween24}  {ButtonTween24}
     * @memberof Button24
     */
    static _ColorChange(targetQuery:string, colorCode:string):ButtonTween24 {
        const template:ButtonTween24 = new ButtonTween24();
        const targets:HTMLElement[] = HTMLUtil.querySelectorAll(targetQuery);
        template.setStopInTween (Tween24.tween(targetQuery, 0.3, Ease24._4_QuartOut).color(colorCode));
        template.setStopOutTween(
            Tween24.serial(
                Tween24.prop(targetQuery).color(colorCode),
                Tween24.tween(targetQuery, 0.6, Ease24._4_QuartOut).color(window.getComputedStyle(targets[0]).color)
            )
        );
        return template;
    }

    /**
     * ボタンのテキストに、1文字ずつロールアップするアニメーションを設定します。
     * @static
     * @param {string} targetQuery アニメーションの対象を指定するクエリ
     * @param {number} [lagTotalTime=0.2] 遅延再生のトータル遅延時間
     * @param {Function} [sort=Sort24._Normal] 再生順を指定するソート関数
     * @return {ButtonTween24}  {ButtonTween24}
     * @memberof Button24
     */
    static _TextRollUp(targetQuery:string, lagTotalTime:number = 0.2, sort:Function = Sort24._Normal):ButtonTween24 {
        const template:ButtonTween24 = new ButtonTween24();
        const targets:HTMLElement[] = HTMLUtil.querySelectorAll(targetQuery);
        const createText:Function = function() {
            for (const target of targets) {
                const text:Text24 = Text24.getInstance(target) || new Text24(target, target.textContent?.trim() || "", true, true);
            }
        }
        createText();
        template.setInTween(
            Tween24.serial(
                Tween24.propText(targetQuery).y("100%"),
                Tween24.lagTotalSort(lagTotalTime, sort,
                    Tween24.tweenTextVelocity(targetQuery, 40, Ease24._6_ExpoOut).y(0)
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

    /**
     * ボタンのテキストに、1文字ずつロールアップして戻るアニメーションを設定します。
     * @static
     * @param {string} targetQuery アニメーションの対象を指定するクエリ
     * @param {number} [lagTotalTime=0.2] 遅延再生のトータル遅延時間
     * @param {Function} [sort=Sort24._Normal] 再生順を指定するソート関数
     * @return {ButtonTween24}  {ButtonTween24}
     * @memberof Button24
     */
    static _TextRollUpDown(targetQuery:string, lagTotalTime:number = 0.2, sort:Function = Sort24._Normal):ButtonTween24 {
        const template:ButtonTween24 = new ButtonTween24();
        const targets:HTMLElement[] = HTMLUtil.querySelectorAll(targetQuery);
        const createText:Function = () => {
            for (const target of targets) {
                const text:Text24 = Text24.getInstance(target) || new Text24(target, target.textContent?.trim() || "", true, true);
            }
        }
        createText();
        template.setStopInTween(
            Tween24.serial(
                Tween24.propText(targetQuery).y("100%"),
                Tween24.lagTotalSort(lagTotalTime, sort,
                    Tween24.tweenTextVelocity(targetQuery, 40, Ease24._6_ExpoOut).y(0)
                )
            )
        );
        template.setStopOutTween(
            Tween24.serial(
                Tween24.propText(targetQuery).y(0),
                Tween24.lagTotalSort(lagTotalTime, sort,
                    Tween24.tweenTextVelocity(targetQuery, 40, Ease24._6_ExpoOut).y("100%")
                ),
                Tween24.propText(targetQuery).y(0)
            )
        );
        template.setResizeFunc(() => {
            Text24.removeByTarget(targetQuery);
            createText();
        });
        template.needResize = true;
        return template;
    }

    /**
     * ボタンの矢印に、フェードしながらスライドインして戻るアニメーションを設定します。
     * @static
     * @param {string} targetQuery アニメーションの対象を指定するクエリ
     * @param {(number|string)} [startX="-80%"] 矢印のアニメーションの開始X座標
     * @return {ButtonTween24}  {ButtonTween24}
     * @memberof Button24
     */
    static _FadeBackArrow(targetQuery:string, startX:number|string = "-80%"):ButtonTween24 {
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
}