import { ArrayUtil } from "./ArrayUtil";
import { ClassUtil } from "./ClassUtil";

export class HTMLUtil {
    private static readonly _ATTR:string = "data-tween24";
    private static _numTweenElement:number = 0;
    private static _tweenStyle:Map<string, CSSStyleDeclaration> = new Map<string, CSSStyleDeclaration>();

    static getHTMLElement(classOrNameOrID:string):HTMLElement[] {
        let result:HTMLElement[] = [];
        switch (classOrNameOrID.charAt(0)) {
            case "#":
                const elt = document.getElementById(classOrNameOrID.substring(1));
                if (elt) result.push(elt);
                break;
            case ".":
                Array.prototype.forEach.call(document.getElementsByClassName(classOrNameOrID.substring(1)), function(elt) {
                    result.push(elt);
                });
                break;
            default:
                Array.prototype.forEach.call(document.getElementsByName(classOrNameOrID), function(elt) {
                    result.push(elt);
                });
                break;
        }
        return result;
    }

    static querySelectorAll(query:string):never[] {
        return Array.from(document.querySelectorAll(query.split("::")[0]));
    }

    static querySelectorAllWithBase(base:HTMLElement, query:string):never[] {
        return Array.from(base.querySelectorAll(query.split("::")[0]));
    }

    static isPseudoQuery(query:string):boolean {
        return query.match(/::/) ? true : false;
    }

    static getPseudoQuery(query:string):string|null {
        const pseudo = query.match(/::.*/g);
        return pseudo ? pseudo[0] : null;
    }

    static setStyleProp(element:HTMLElement, prop:string, value:string|number) {
        element.style.setProperty(prop, value as string);
    }

    static addWillChange(style:CSSStyleDeclaration, key:string[]) {
        if (style.willChange.length)
            style.willChange = style.willChange.split(",").concat(key).join(",");
        else
            style.willChange = key.join(",");
    }

    static removeWillChange(style:CSSStyleDeclaration, key:string[]) {
        const willChange = style.willChange.split(",");
        for (let i = 0; i < willChange.length; i++) {
            willChange[i] = willChange[i].trim();
        }
        for (const k of key) {
            ArrayUtil.removeItemFromArray(willChange, k);
        }
        style.willChange = willChange.join(",");
    }

    static getComputedStyle(element:HTMLElement, pseudo:string|null = null):CSSStyleDeclaration {
        return window.getComputedStyle(element, pseudo);
    }

    static getTransformMatrix(element:HTMLElement, pseudo:string|null = null):string {
        let t:string;
        if (pseudo) 
            t = HTMLUtil.getComputedStyle(element, pseudo).transform;
        else 
            t = HTMLUtil.getComputedStyle(element).transform;
        return t != "none" ? t : "matrix(1, 0, 0, 1, 0, 0)";
    }

    static setTweenElementQuery(target:HTMLElement|HTMLElement[], query:string) {
        const queryList:string[] = query.split("::");
        const pseudo:string = queryList[1] ? "::" + queryList[1] : "";

        if (Array.isArray(target)) {
            for (const t of target) {
                excute(t);
            }
        }
        else {
            excute(target);
        }

        function excute(t:HTMLElement) {
            const attr:string|null = t.getAttribute(HTMLUtil._ATTR);
            if (!attr) {
                HTMLUtil._numTweenElement ++;
                t.setAttribute(HTMLUtil._ATTR, HTMLUtil._numTweenElement.toString());
            }
            if (!HTMLUtil.getAddedStyleByElement(t, pseudo)) {
                const elementQuery = HTMLUtil.getTweenElementQuery(attr || HTMLUtil._numTweenElement, pseudo);
                const styleSheet:CSSStyleSheet = document.styleSheets[0];
                const index:number = styleSheet.insertRule(elementQuery + "{}", styleSheet.rules.length);
                HTMLUtil._tweenStyle.set(elementQuery, (styleSheet.cssRules[index] as CSSStyleRule).style);
            }
        }
    }
    
    static getAddedStyleByElement(element:HTMLElement, pseudo:string):CSSStyleDeclaration|undefined {
        const attr:string|null = element.getAttribute(HTMLUtil._ATTR);
        if (attr) {
            return HTMLUtil._tweenStyle.get(HTMLUtil.getTweenElementQuery(attr, pseudo));
        }
        else {
            return undefined;
        }
    }

    static getTweenElementQuery(elementOrID:string|number|HTMLElement, pseudo:string):string {
        let attr:string|null = null;
        if (elementOrID instanceof HTMLElement) {
            attr = elementOrID.getAttribute(HTMLUtil._ATTR);
            if (attr)
                return `[${HTMLUtil._ATTR}="${attr}"]${pseudo}`;
            else 
            return "";
        }
        return `[${HTMLUtil._ATTR}="${elementOrID}"]${pseudo}`;
    }
}