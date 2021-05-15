import { ColorUtil } from "../../utils/ColorUtil";
import { ParamUpdater } from "./ParamUpdater";

export class StyleColorUpdater {

    private _key  : string;
    private _color: string;
    private _r    : ParamUpdater;
    private _g    : ParamUpdater;
    private _b    : ParamUpdater;

    constructor(key:string, colorCode:string) {
        this._key   = key;
        this._color = colorCode;

        const rgb:number[] = ColorUtil.getRGBList(colorCode);
        this._r = new ParamUpdater("r", rgb[0]);
        this._g = new ParamUpdater("g", rgb[1]);
        this._b = new ParamUpdater("b", rgb[2]);
    }

    init(start:string) {
        const rgb:number[] = ColorUtil.getRGBList(start);
        this._r.init(Number(rgb[0]));
        this._g.init(Number(rgb[1]));
        this._b.init(Number(rgb[2]));
    }

    update(progress:number):string {
        return `rgb(${this._r.update(progress)},${this._g.update(progress)},${this._b.update(progress)})`;
    }

    getDelta():number {
        const dr:number = this._r.getDelta();
        const dg:number = this._g.getDelta();
        const db:number = this._b.getDelta();
        return Math.max(Math.sqrt(dr * dr + dg * dg + db * db));
    }

    clone():StyleColorUpdater {
        return new StyleColorUpdater(this._key, this._color);
    }
    
    toString():string {
        return `${this._key}:${this._color}`
    }
}