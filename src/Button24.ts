import { Tween24  } from "./Tween24";
import { Event24  } from "./Event24";
import { Text24   } from "./utils/Text24";
import { HTMLUtil } from "./utils/HTMLUtil";

export class Button24 {

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
                text = new Text24(target, target.textContent || "", true, true, lineHeight);
                text.spacing = textSpacing;
            }
            const setEvent:Function = function() {
                Event24.addWithStopEvent(buttonQuery, "mouseover", "mouseout", 
                    Tween24.lagTotalSort(overTotalLagTime, sort,
                        Tween24.tweenTextVelocity(textQuery, velocity, easing).y("-100%")
                    )
                );
                Event24.addWithStopEvent(buttonQuery, "mouseout", "mouseover", 
                    Tween24.lagTotalSort(outTotalLagTime, sort,
                        Tween24.tweenTextVelocity(textQuery, velocity, easing).y(0)
                    )
                );
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