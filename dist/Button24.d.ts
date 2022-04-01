import { ButtonTween24 } from "./ButtonTween24";
export declare class Button24 {
    private static _DEFAULT_IN_EVENT;
    private static _DEFAULT_OUT_EVENT;
    private _targetQuery;
    private _inEventType;
    private _outEventType;
    private _templates;
    private _inTweens;
    private _outTweens;
    private _stopInTweens;
    private _stopOutTweens;
    private _inEvent;
    private _outEvent;
    private _stopInEvent;
    private _stopOutEvent;
    constructor(targetQuery: string, inEventType: string, outEventType: string, templates: ButtonTween24[]);
    private _addEvent;
    private _onResize;
    private _onResizeTemplate;
    /**
     * アニメーションを設定し直します。
     * @memberof Button24
     */
    reset: () => void;
    /**
     * ウィンドウのりサイズ時に、アニメーションを設定し直します。
     * @memberof Button24
     */
    resizeAndReset: () => Button24;
    /**
     * ウィンドウのりサイズ時に、アニメーションを設定し直す設定を解除します。
     * @memberof Button24
     */
    removeResize: () => Button24;
    /**
     * アニメーションの willChange を有効にするか設定します。
     * 有効にすると強力な最適化をブラウザーが行い、アニメーションが滑らかになります。
     * @param {boolean} [use=true] willChange を有効にするか
     * @memberof Button24
     */
    willChange: (use?: boolean) => Button24;
    /**
     * テンプレートを指定して、ボタンアニメーションを設定します。
     * @static
     * @param {string} targetQuery
     * @param {...ButtonTween24[]} templates
     * @return {Button24}  {Button24}
     * @memberof Button24
     */
    static set(targetQuery: string, ...templates: ButtonTween24[]): Button24;
    /**
     * ボタンのテキストに、色を変えるアニメーションを設定します。
     * @static
     * @param {string} targetQuery アニメーションの対象を指定するクエリ
     * @param {string} colorCode 変更後の色のカラーコード
     * @return {ButtonTween24}  {ButtonTween24}
     * @memberof Button24
     */
    static _ColorChange(targetQuery: string, colorCode: string): ButtonTween24;
    /**
     * ボタンのテキストに、1文字ずつロールアップするアニメーションを設定します。
     * @static
     * @param {string} targetQuery アニメーションの対象を指定するクエリ
     * @param {number} [lagTotalTime=0.2] 遅延再生のトータル遅延時間
     * @param {Function} [sort=Sort24._Normal] 再生順を指定するソート関数
     * @return {ButtonTween24}  {ButtonTween24}
     * @memberof Button24
     */
    static _TextRollUp(targetQuery: string, lagTotalTime?: number, sort?: Function): ButtonTween24;
    /**
     * ボタンのテキストに、1文字ずつロールアップして戻るアニメーションを設定します。
     * @static
     * @param {string} targetQuery アニメーションの対象を指定するクエリ
     * @param {number} [lagTotalTime=0.2] 遅延再生のトータル遅延時間
     * @param {Function} [sort=Sort24._Normal] 再生順を指定するソート関数
     * @return {ButtonTween24}  {ButtonTween24}
     * @memberof Button24
     */
    static _TextRollUpDown(targetQuery: string, lagTotalTime?: number, sort?: Function): ButtonTween24;
    /**
     * ボタンの矢印に、フェードしながらスライドインして戻るアニメーションを設定します。
     * @static
     * @param {string} targetQuery アニメーションの対象を指定するクエリ
     * @param {(number|string)} [startX="-80%"] 矢印のアニメーションの開始X座標
     * @return {ButtonTween24}  {ButtonTween24}
     * @memberof Button24
     */
    static _FadeAndBackArrow(targetQuery: string, startX?: number | string): ButtonTween24;
    static _UnderlinedAndBack(targetQuery: string, borderWidth?: number, borderStyle?: string, borderColor?: string): ButtonTween24;
}
