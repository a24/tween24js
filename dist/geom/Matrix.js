var Matrix = /** @class */ (function () {
    function Matrix() {
        this._skewX = 0;
        this._skewY = 0;
        this._scaleX = 0;
        this._scaleY = 0;
        this._rotation = 0;
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.ty = 0;
    }
    Matrix.prototype.setMatrixByCSSTransform = function (matrix) {
        var t = matrix.match(/matrix\((.*)\)/);
        if (t) {
            var m = t[1].replace(/ /g, "").split(",");
            this.a = parseFloat(m[0]);
            this.b = parseFloat(m[1]);
            this.c = parseFloat(m[2]);
            this.d = parseFloat(m[3]);
            this.tx = parseFloat(m[4]);
            this.ty = parseFloat(m[5]);
            this._scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
            this._scaleY = Math.sqrt(this.d * this.d + this.c * this.c);
            this._rotation = (this.a || this.b) ? Math.atan2(this.b, this.a) : 0;
            this._skewX = (this.c || this.d) ? Math.atan2(this.c, this.d) + this._rotation : 0;
            this._skewY = 0;
            if (this._skewX) {
                this._scaleY *= Math.cos(this._skewX);
            }
        }
    };
    Matrix.prototype.updateMatrix = function () {
        var sky = this._skewY;
        var skx = this._skewX + sky;
        var r = this._rotation + sky;
        this.a = Math.cos(r) * this._scaleX;
        this.b = Math.sin(r) * this._scaleX;
        this.c = Math.sin(r - skx) * -this._scaleY;
        this.d = Math.cos(r - skx) * this._scaleY;
        var temp;
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
    };
    Matrix.prototype.toString = function () {
        return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
    };
    Object.defineProperty(Matrix.prototype, "x", {
        get: function () { return this.tx; },
        set: function (value) { this.tx = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "y", {
        get: function () { return this.ty; },
        set: function (value) { this.ty = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "skewX", {
        get: function () { return this._skewX * Matrix._RAD_TO_DEG; },
        set: function (value) { this._skewX = value * Matrix._DEG_TO_RAD; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "skewY", {
        get: function () { return this._skewY * Matrix._RAD_TO_DEG; },
        set: function (value) { this._skewY = value * Matrix._DEG_TO_RAD; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "rotation", {
        get: function () { return this._rotation * Matrix._RAD_TO_DEG; },
        set: function (value) { this._rotation = value * Matrix._DEG_TO_RAD; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "scaleX", {
        get: function () { return this._scaleX; },
        set: function (value) { this._scaleX = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "scaleY", {
        get: function () { return this._scaleY; },
        set: function (value) { this._scaleY = value; },
        enumerable: false,
        configurable: true
    });
    Matrix.copy = function (to, from) {
        to._skewX = from._skewX;
        to._skewY = from._skewY;
        to._scaleX = from._scaleX;
        to._scaleY = from._scaleY;
        to._rotation = from._rotation;
        to.a = from.a;
        to.b = from.b;
        to.c = from.c;
        to.d = from.d;
        to.tx = from.tx;
        to.ty = from.ty;
        return to;
    };
    Matrix._PI = Math.PI;
    Matrix._RAD_TO_DEG = 180 / Math.PI;
    Matrix._DEG_TO_RAD = Math.PI / 180;
    return Matrix;
}());
export { Matrix };
