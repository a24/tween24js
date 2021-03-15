export class Matrix {

    private static _PI: number = Math.PI;
    private static _RAD_TO_DEG = 180 / Math.PI;
	private static _DEG_TO_RAD = Math.PI / 180;

    private _skewX: number;
    private _skewY: number;
    private _scaleX: number;
    private _scaleY: number;
    private _rotation: number;

    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;

    constructor() {
        this._skewX    = 0;
        this._skewY    = 0;
        this._scaleX   = 0;
        this._scaleY   = 0;
        this._rotation = 0;

        this.a  = 1;
        this.b  = 0;
        this.c  = 0;
        this.d  = 1;
        this.tx = 0;
        this.ty = 0;
    }

    setMatrixByCSSTransform(matrix: string) {
        var t: RegExpMatchArray | null = matrix.match(/matrix\((.*)\)/);
        if (t) {
            let m:string[] = t[1].replace(/ /g, "").split(",");
            this.a  = parseFloat(m[0]);
            this.b  = parseFloat(m[1]);
            this.c  = parseFloat(m[2]);
            this.d  = parseFloat(m[3]);
            this.tx = parseFloat(m[4]);
            this.ty = parseFloat(m[5]);

            this._scaleX   = Math.sqrt(this.a * this.a + this.b * this.b);
            this._scaleY   = Math.sqrt(this.d * this.d + this.c * this.c);
            this._rotation = (this.a || this.b) ? Math.atan2(this.b, this.a) : 0;
            this._skewX    = (this.c || this.d) ? Math.atan2(this.c, this.d) + this._rotation : 0;
            this._skewY    = 0;

            if (this._skewX) {
                this._scaleY *= Math.cos(this._skewX);
            }
        }
    }

    updateMatrix() {
        const sky = this._skewY;
        const skx = this._skewX + sky;
        const r   = this._rotation + sky;

        this.a = Math.cos(r) *  this._scaleX;
        this.b = Math.sin(r) *  this._scaleX;
        this.c = Math.sin(r - skx) * -this._scaleY;
        this.d = Math.cos(r - skx) *  this._scaleY;

        let temp:number;
        if (skx) {
            temp = Math.tan(skx - sky);
            temp = Math.sqrt(1 + temp * temp);
            this.c *= temp;
            this.d *= temp;
            if (sky) {
                temp = Math.tan(sky);
                temp = Math.sqrt(1 + temp * temp);
                this.a *= temp;
                this.b *= temp;
            }
        }
    }

    toString(): string {
        return `matrix(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.tx}, ${this.ty})`
    }

    set x(value:number) { this.tx = value; }
    get x(): number { return this.tx; }

    set y(value:number) { this.ty = value; }
    get y(): number { return this.ty; }

    set skewX(value:number) { this._skewX = value * Matrix._DEG_TO_RAD; }
    get skewX(): number { return this._skewX * Matrix._RAD_TO_DEG; }

    set skewY(value:number) { this._skewY = value * Matrix._DEG_TO_RAD; }
    get skewY(): number { return this._skewY * Matrix._RAD_TO_DEG; }

    set rotation(value:number) { this._rotation = value * Matrix._DEG_TO_RAD; }
    get rotation(): number { return this._rotation * Matrix._RAD_TO_DEG; }

    set scaleX(value:number) { this._scaleX = value; }
    get scaleX(): number { return this._scaleX; }

    set scaleY(value:number) { this._scaleY = value; }
    get scaleY(): number { return this._scaleY; }

    static copy(to:Matrix, from:Matrix): Matrix {
        to._skewX    = from._skewX;
        to._skewY    = from._skewY;
        to._scaleX   = from._scaleX;
        to._scaleY   = from._scaleY;
        to._rotation = from._rotation;

        to.a  = from.a;
        to.b  = from.b;
        to.c  = from.c;
        to.d  = from.d;
        to.tx = from.tx;
        to.ty = from.ty;
        return to;
    }
}

export default Matrix;