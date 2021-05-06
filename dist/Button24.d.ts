export declare class Button24 {
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
    static setRollUpTextCharacterAnimation(buttonQuery: string, textQuery: string, velocity: number, overTotalLagTime: number, outTotalLagTime: number, easing: Function | null, sort: Function, textSpacing: number, resizeAndReset?: boolean): void;
}
