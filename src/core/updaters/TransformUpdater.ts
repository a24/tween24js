import { Matrix }       from "../../geom/Matrix";
import { Updater }      from "./Updater";
import { ParamUpdater } from "./ParamUpdater";
import { HTMLUtil }     from "../../utils/HTMLUtil";

export class TransformUpdater implements Updater {
    static className:string = "TransformUpdater";
    
    private static _chache      :Map<HTMLElement, Matrix> = new Map<HTMLElement, Matrix>();
    private static _pseudoChache:Map<string     , Matrix> = new Map<string     , Matrix>();

    private _target    :HTMLElement;
    private _query     :string|null;
    private _pseudo    :string|null;
    private _style     :CSSStyleDeclaration;
    private _tweenQuery:string|null;

    private _useWillChange:boolean;

    private _matrix  :Matrix;
    private _x       :ParamUpdater|null;
    private _y       :ParamUpdater|null;
    private _scaleX  :ParamUpdater|null;
    private _scaleY  :ParamUpdater|null;
    private _skewX   :ParamUpdater|null;
    private _skewY   :ParamUpdater|null;
    private _rotation:ParamUpdater|null;

    private _percentX:string|null;
    private _percentY:string|null;

    constructor(target:HTMLElement, query:string|null) {
        this._target = target;
        this._query  = query;
        this._style  = target.style;
        this._matrix = new Matrix();

        this._x        = null;
        this._y        = null;
        this._scaleX   = null;
        this._scaleY   = null;
        this._skewX    = null;
        this._skewY    = null;
        this._rotation = null;

        this._percentX = null;
        this._percentY = null;
        
        this._pseudo     = this._query ? HTMLUtil.getPseudoQuery(this._query) : null;
        this._tweenQuery = null;

        this._useWillChange = false;
    }

    init(useWillChange:boolean) {
        this._useWillChange = useWillChange;

        // Setting style
        if (this._pseudo && this._query) {
            const sty = HTMLUtil.getAddedStyleByElement(this._target, this._pseudo);
            if (sty) {
                this._style = sty;
                if (HTMLUtil.getComputedStyle(this._target, this._pseudo).display == "inline") {
                    this._style.setProperty("display", "inline-block");
                }
            }
            this._tweenQuery = HTMLUtil.getTweenElementQuery(this._target, this._pseudo);
        }

        // Setting chahe
        const chache = this._getChache();
        if (chache)
            this._matrix = Matrix.copy(this._matrix, chache);
        else
            this._matrix.setMatrixByCSSTransform(HTMLUtil.getTransformMatrix(this._target, this._pseudo));

        // Set will-change
        if (this._useWillChange) {
            HTMLUtil.addWillChange(this._style, ["transform"]);
        }
        
        // Setting param
        if (this._percentX || this._percentY) {
            if (this._pseudo) {
                const sty = HTMLUtil.getComputedStyle(this._target, this._pseudo);
                if (this._percentX) {
                    if (!this._style.width) this._style.setProperty("width", "auto");
                    this._x = new ParamUpdater("x", parseFloat(sty.width) * parseFloat(this._percentX) / 100, this._percentX);
                }
                if (this._percentY) {
                    if (!this._style.height) this._style.setProperty("height", "auto");
                    this._y = new ParamUpdater("y", parseFloat(sty.height) * parseFloat(this._percentY) / 100, this._percentY);
                }
            }
            else {
                if (this._percentX) this._x = new ParamUpdater("x", this._target.offsetWidth  * parseFloat(this._percentX) / 100, this._percentX);
                if (this._percentY) this._y = new ParamUpdater("y", this._target.offsetHeight * parseFloat(this._percentY) / 100, this._percentY);
            }
        }

        this._x       ?.init(this._matrix.x);
        this._y       ?.init(this._matrix.y);
        this._scaleX  ?.init(this._matrix.scaleX);
        this._scaleY  ?.init(this._matrix.scaleY);
        this._skewX   ?.init(this._matrix.skewX);
        this._skewY   ?.init(this._matrix.skewY);
        this._rotation?.init(this._matrix.rotation);
    }

    addProp(key:string, value:number, option:string|null = null) {
        let updater:ParamUpdater;

        if (option) {
            this._matrix.setMatrixByCSSTransform(HTMLUtil.getTransformMatrix(this._target, this._pseudo));
            updater = new ParamUpdater(key, this._matrix.getProp(key), value);
            switch (option) {
                case ParamUpdater.RELATIVE_AT_SETTING :
                    updater.set$value(value);
                    break;
                case ParamUpdater.RELATIVE_AT_RUNNING :
                    updater.set$$value(value);
                    break;
            }
        }
        else {
            updater = new ParamUpdater(key, value, value); 
        }

        switch (key) {
            case "x"       : this._x        = updater; break;
            case "y"       : this._y        = updater; break;
            case "scaleX"  : this._scaleX   = updater; break;
            case "scaleY"  : this._scaleY   = updater; break;
            case "skewX"   : this._skewX    = updater; break;
            case "skewY"   : this._skewY    = updater; break;
            case "rotation": this._rotation = updater; break;
        }
    }
    
    addPropStr(key:string, value:string) {
        switch (key) {
            case "x" :
                if (value.slice(-1) == "%") this._percentX = value;
                break;
            case "y" :
                if (value.slice(-1) == "%") this._percentY = value;
                break;
        }
    }

    setBezier(bezierX:number, bezierY:number) {
        if (!this._x) {
            this._matrix.setMatrixByCSSTransform(HTMLUtil.getTransformMatrix(this._target, this._pseudo));
            this._x = new ParamUpdater("x", this._matrix.getProp("x"), NaN);
        }
        if (!this._y) {
            this._matrix.setMatrixByCSSTransform(HTMLUtil.getTransformMatrix(this._target, this._pseudo));
            this._y = new ParamUpdater("y", this._matrix.getProp("y"), NaN);
        }
        this._x.setBezier(bezierX);
        this._y.setBezier(bezierY);
    }

    update(progress: number) {
        const chache = this._getChache();
        if (chache && chache != this._matrix)
            this._matrix = Matrix.copy(this._matrix, chache);
        
        if (this._x       ?.isActive) this._matrix.x        = this._x       .update(progress);
        if (this._y       ?.isActive) this._matrix.y        = this._y       .update(progress);
        if (this._scaleX  ?.isActive) this._matrix.scaleX   = this._scaleX  .update(progress);
        if (this._scaleY  ?.isActive) this._matrix.scaleY   = this._scaleY  .update(progress);
        if (this._skewX   ?.isActive) this._matrix.skewX    = this._skewX   .update(progress);
        if (this._skewY   ?.isActive) this._matrix.skewY    = this._skewY   .update(progress);
        if (this._rotation?.isActive) this._matrix.rotation = this._rotation.update(progress);

        this._matrix.updateMatrix();
        this._style.setProperty("transform", this._matrix.toString());
        this._setChache(this._matrix);
        
        if (progress == 1) this.complete();
    }

    private _getChache():Matrix|undefined {
        if (this._pseudo) {
            return (this._tweenQuery) ? TransformUpdater._pseudoChache.get(this._tweenQuery) : undefined;
        }
        else {
            return TransformUpdater._chache.get(this._target);
        }
    }

    private _setChache(matrix:Matrix) {
        if (this._pseudo) {
            if (this._tweenQuery) TransformUpdater._pseudoChache.set(this._tweenQuery, matrix);
        }
        else {
            TransformUpdater._chache.set(this._target, matrix);
        }
    }

    private _deleteChache() {
        if (this._pseudo) {
            if (this._tweenQuery) TransformUpdater._pseudoChache.delete(this._tweenQuery);
        }
        else {
            TransformUpdater._chache.delete(this._target);
        }
    }

    overwrite(updater: TransformUpdater) {
        if (this._target == updater._target && this._pseudo == updater._pseudo) {
            if (updater._x       ) this._x       ?.unActive();
            if (updater._y       ) this._y       ?.unActive();
            if (updater._scaleX  ) this._scaleX  ?.unActive();
            if (updater._scaleY  ) this._scaleY  ?.unActive();
            if (updater._skewX   ) this._skewX   ?.unActive();
            if (updater._skewY   ) this._skewY   ?.unActive();
            if (updater._rotation) this._rotation?.unActive();
        }
    }

    complete() {
        this._deleteChache();

        if (this._style && this._useWillChange) {
            HTMLUtil.removeWillChange(this._style, ["transform"]);
        }
    }

    getMaxAbsDelta():number {
        const deltas:number[] = [];
        const dx = this._x ? this._x.getDelta() : 0;
        const dy = this._y ? this._y.getDelta() : 0;
        deltas.push(Math.sqrt(dx * dx + dy * dy));
        
        if (this._scaleX  ) deltas.push(Math.abs(this._scaleX  .getDelta()));
        if (this._scaleY  ) deltas.push(Math.abs(this._scaleY  .getDelta()));
        if (this._skewX   ) deltas.push(Math.abs(this._skewX   .getDelta()));
        if (this._skewY   ) deltas.push(Math.abs(this._skewY   .getDelta()));
        if (this._rotation) deltas.push(Math.abs(this._rotation.getDelta()));

        return Math.max(...deltas);
    }

    clone(target:HTMLElement = this._target, query:string|null = this._query):TransformUpdater {
        const copy = new TransformUpdater(target, query);

        if (this._percentX) copy.addPropStr("x", this._percentX);
        else if   (this._x) copy._x = this._x.clone();
        if (this._percentY) copy.addPropStr("y", this._percentY);
        else if   (this._y) copy._y = this._y.clone();

        if (this._scaleX  ) copy._scaleX   = this._scaleX  .clone();
        if (this._scaleY  ) copy._scaleY   = this._scaleY  .clone();
        if (this._skewX   ) copy._skewX    = this._skewX   .clone();
        if (this._skewY   ) copy._skewY    = this._skewY   .clone();
        if (this._rotation) copy._rotation = this._rotation.clone();
        return copy;
    }

    toString():string {
        let str:string = "";
        if (this._x) str += this._x.toString() + " ";
        if (this._y) str += this._y.toString() + " ";

        const bx = this._x?.bezier;
        const by = this._y?.bezier;
        if (bx && by) {
            str += `bezier:`;
            for (let i = 0; i < bx.length; i++) {
                str += `(${bx[i]}, ${by[i]})`
            }
            str += ` `;
        }

        if (this._scaleX  ) str += this._scaleX  .toString() + " ";
        if (this._scaleY  ) str += this._scaleY  .toString() + " ";
        if (this._skewX   ) str += this._skewX   .toString() + " ";
        if (this._skewY   ) str += this._skewY   .toString() + " ";
        if (this._rotation) str += this._rotation.toString() + " ";
        return str.trim();
    }
}