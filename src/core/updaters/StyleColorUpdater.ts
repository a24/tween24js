import ParamUpdater from "./ParamUpdater";

export class StyleColorUpdater {

	private _key  : string;
	private _color: string;
	private _r: ParamUpdater;
	private _g: ParamUpdater;
	private _b: ParamUpdater;

	constructor(key:string, colorCode:string) {
		this._key   = key;
		this._color = colorCode;

		colorCode = colorCode.substring(1);

		if(colorCode.length === 3) {
			colorCode = colorCode.substr(0, 1).repeat(2) + colorCode.substr(1, 1).repeat(2) + colorCode.substr(2, 1).repeat(2);
		}
		
		const c:number = parseInt(colorCode, 16);
		this._r = new ParamUpdater("r", c >> 16 & 0xFF);
		this._g = new ParamUpdater("g", c >>  8 & 0xFF);
		this._b = new ParamUpdater("b", c       & 0xFF);
	}

	init(start:string) {
		const rgb :RegExpMatchArray|null = start.match(/\d+/g);
		if (rgb) {
			this._r.init(Number(rgb[0]));
			this._g.init(Number(rgb[1]));
			this._b.init(Number(rgb[2]));
		}
	}

	update(progress:number):string {
		return `rgb(${this._r.update(progress)},${this._g.update(progress)},${this._b.update(progress)})`;
	}
	
	toString():string {
		return `${this._key}:${this._color}`
	}
}

export default StyleColorUpdater;