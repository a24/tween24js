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
            /*
            this._skewX = Math.atan(-this.c / this.d);
            this._skewY = Math.atan(this.b / this.a);

            if (isNaN(this._skewX)) this._skewX = 0;
            if (isNaN(this._skewY)) this._skewY = 0;

            this._scaleY = (-Matrix._PI_Q < this._skewX && this._skewX < Matrix._PI_Q) ?
                this.d / Math.cos(this._skewX) : -this.c / Math.sin(this._skewX);
            this._scaleX = (-Matrix._PI_Q < this._skewY&& this._skewY < Matrix._PI_Q) ?
                this.a / Math.cos(this._skewY) : this.b / Math.sin(this._skewY);
            */
            // const epsilon:number = 0.0001;
            // let r:number = this._skewX;
            // if ((this._skewX - epsilon < this._skewY) && (this._skewX + epsilon > this._skewY)) {
            //     this._rotation = r;
            //     this._skewX = this._skewY = 0;
            // }
            // else {
            //     this._rotation = 0;
            // }
            this._scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
            this._scaleY = Math.sqrt(this.d * this.d + this.c * this.c);
            this._skewX = (this.a || this.b) ? Math.atan2(this.b, this.a) : 0;
            this._skewY = this._skewX;
            this._rotation = Math.atan2(this.b, this.a);
            // console.log("INIT.rotation: " + this._skewX * (180 / Matrix._PI) )
            // console.log("INIT._skewX: " + this._skewX )
            // console.log("INIT._skewY: " + this._skewY )
            // console.log("INIT._scaleX: " + this._scaleX)
            // console.log("INIT.a: " + this.a )
            // console.log("INIT.b: " + this.b )
            // console.log("INIT.c: " + this.c )
            // console.log("INIT.d: " + this.d )
            // console.log("INIT======")
        }
    };
    Matrix.prototype.updateMatrix = function () {
        var r = this._rotation;
        var cos = Math.cos(r);
        var sin = Math.sin(r);
        this.a = cos * this._scaleX;
        this.b = sin * this._scaleX;
        this.c = sin * -this._scaleY;
        this.d = cos * this._scaleY;
        // this._skewX = this._skewY = 0;
        // this.a = this._scaleX *  cos;
        // this.b = this._scaleX *  sin;
        // this.c = this._scaleY * -sin;
        // this.d = this._scaleY *  cos;
        // this._scaleY = (-Matrix._PI_Q < r && r < Matrix._PI_Q) ?
        // this.d / Math.cos(r) : -this.c / Math.sin(r);
        // this._scaleX = (-Matrix._PI_Q < r && r < Matrix._PI_Q) ?
        // this.a / Math.cos(r) : this.b / Math.sin(r);
        // console.log("updateRotation.sin: " + sin )
        // console.log("updateRotation.cos: " + cos )
        // console.log("-------- " )
        // console.log("updateRotation._rotation: " + this._rotation  * (180 / Matrix._PI))
        // console.log("updateRotation._scaleX: " + this._scaleX )
        // console.log("updateRotation.a: " + this.a )
        // console.log("updateRotation.b: " + this.b )
        // console.log("updateRotation.c: " + this.c )
        // console.log("updateRotation.d: " + this.d )
        // console.log("======================= " )
    };
    Matrix.prototype.toString = function () {
        return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
    };
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
    Object.defineProperty(Matrix.prototype, "x", {
        get: function () { return this.tx; },
        set: function (value) { this.tx = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "y", {
        get: function () {
            return this.ty;
        },
        set: function (value) { this.ty = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "skewX", {
        get: function () {
            return this._skewX * (180 / Matrix._PI);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "skewY", {
        get: function () {
            return this._skewY * (180 / Matrix._PI);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "rotation", {
        get: function () {
            return this._rotation * (180 / Matrix._PI);
        },
        set: function (value) {
            this._rotation = value * Matrix._PI / 180;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "scaleX", {
        get: function () {
            return this._scaleX;
        },
        set: function (value) {
            this._scaleX = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "scaleY", {
        get: function () {
            return this._scaleY;
        },
        set: function (value) {
            this._scaleY = value;
        },
        enumerable: false,
        configurable: true
    });
    Matrix._PI = Math.PI;
    Matrix._PI_Q = Math.PI / 4;
    return Matrix;
}());
export { Matrix };
export default Matrix;
