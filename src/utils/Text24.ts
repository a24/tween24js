import { HTMLUtil } from "./HTMLUtil";

export class Text24 {
    private static _allTexts:Map<HTMLElement, Text24> = new Map<HTMLElement, Text24>();

    private _target:HTMLElement;
    private _text:string;
    private _height:number;
    private _spacing:number;
    private _originalOverflow:string;
    private _spans:HTMLSpanElement[];

    constructor (target:HTMLElement, text:string, overflowHidden:boolean, double:boolean) {
        this._target  = target;
        this._text    = text;
        this._spacing = NaN;
        this._originalOverflow = target.style.overflow;
        
        const lineHeight = target.style.lineHeight;
        this._height = parseFloat(window.getComputedStyle(target).height);
        target.style.height = this._height + "px";
        target.innerText    = "";

        const spans:HTMLSpanElement[] = this._spans = [];

        text.split("").map(function (word:string):void {
            word = word === " " ? "&nbsp;" : word;
            const span = document.createElement("span");
            span.style.display = "inline-block";
            span.style.lineHeight = lineHeight;
            span.innerHTML = word;
            spans.push(span);
            target.appendChild(span);
        });

        this.overflowHidden  = overflowHidden;
        this.double = double;
        
        Text24._allTexts.set(target, this);
    }

    reset() {
        this._target.innerHTML    = "";
        this._target.innerText    = this._text;
        this._target.style.width  = "auto";
        this._target.style.height = "auto";
        Text24._allTexts.delete(this._target);
    }

    set spacing(spacing:number) {
        this._spacing = spacing;
        for (const span of this._spans)
            span.style.width = span.clientWidth + this._spacing + "px";
    }

    set overflowHidden(flag:boolean) {
        if (flag) this._target.style.overflow = "hidden";
        else      this._target.style.overflow = this._originalOverflow;
    }

    set double(flag:boolean) {
        for (const span of this._spans) {
            span.style.textShadow = flag ? `0 -${this._height}px`: "none";
        }
    }

    get targets():HTMLSpanElement[] {
        return this._spans;
    }

    get height():number {
        return this._height;
    }

    static getInstance(target:HTMLElement):Text24|undefined {
        return Text24._allTexts.get(target);
    }

    static removeByTarget(targetQuery:string) {
        for (const target of HTMLUtil.querySelectorAll(targetQuery))
            Text24._allTexts.get(target)?.reset();
    }

    static removeAll() {
        Text24._allTexts.forEach(function(text:Text24):void {
            text.reset();
        });
    }
}