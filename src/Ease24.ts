export class Ease24 {

    /*
     * ===============================================================================================
     *
     * LINER EASING
     *
     * -----------------------------------------------------------------------------------------------
    */

    /**
     * Linear easing.
     * @static
     * @memberof Ease24
     */
    static _Linear(t:number, b:number, c:number, d:number): number {
        return c * t / d + b;
    }

    /*
     * ===============================================================================================
     *
     * SINE EASING
     *
     * -----------------------------------------------------------------------------------------------
     */

    /**
     * Sine easing-in.
     * @static
     * @memberof Ease24
     */
    static _1_SineIn(t:number, b:number, c:number, d:number): number {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    }

    /**
     * Sine easing-out.
     * @static
     * @memberof Ease24
     */
    static _1_SineOut(t:number, b:number, c:number, d:number): number {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }

    /**
     * Sine easing-in-out.
     * @static
     * @memberof Ease24
     */
    static _1_SineInOut(t:number, b:number, c:number, d:number): number {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }

    /**
     * Sine easing-out-in.
     * @static
     * @memberof Ease24
     */
    static _1_SineOutIn(t:number, b:number, c:number, d:number): number {
        if (t < d / 2) return (c / 2) * Math.sin((t * 2) / d * (Math.PI / 2)) + b;
        return -(c / 2) * Math.cos((t * 2 - d) / d * (Math.PI / 2)) + (c / 2) + (b + c / 2);
    }

    /*
     * ===============================================================================================
     *
     * QUAD EASING
     *
     * -----------------------------------------------------------------------------------------------
     */

    /**
     * Quad easing-in.
     * @static
     * @memberof Ease24
     */
    static _2_QuadIn(t:number, b:number, c:number, d:number): number {
        return c * (t /= d) * t + b;
    }

    /**
     * Quad easing-out.
     * @static
     * @memberof Ease24
     */
    static _2_QuadOut(t:number, b:number, c:number, d:number): number {
        return -c * (t /= d) * (t - 2) + b;
    }

    /**
     * Quad easing-in-out.
     * @static
     * @memberof Ease24
     */
    static _2_QuadInOut(t:number, b:number, c:number, d:number): number {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }

    /**
     * Quad easing-out-in.
     * @static
     * @memberof Ease24
     */
    static _2_QuadOutIn(t:number, b:number, c:number, d:number): number {
        if (t < d / 2) return -(c / 2) * (t = (t * 2 / d)) * (t - 2) + b;
        return (c / 2) * (t = (t * 2 - d) / d) * t + (b + c / 2);
    }

    /*
     * ===============================================================================================
     *
     * CUBIC EASING
     *
     * -----------------------------------------------------------------------------------------------
     */
    
    /**
     * Cubic easing-in.
     * @static
     * @memberof Ease24
     */
    static _3_CubicIn(t:number, b:number, c:number, d:number): number {
        return c * (t /= d) * t * t + b;
    }

    /**
     * Cubic easing-out.
     * @static
     * @memberof Ease24
     */
    static _3_CubicOut(t:number, b:number, c:number, d:number): number {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }

    /**
     * Cubic easing-in-out.
     * @static
     * @memberof Ease24
     */
    static _3_CubicInOut(t:number, b:number, c:number, d:number): number {
        return ((t /= d / 2) < 1) ? c / 2 * t * t * t + b: c / 2 * ((t -= 2) * t * t + 2) + b;
    }

    /**
     * Cubic easing-out-in.
     * @static
     * @memberof Ease24
     */
    static _3_CubicOutIn(t:number, b:number, c:number, d:number): number {
        return (t < d / 2)? c / 2 * ((t = t * 2 / d - 1) * t * t + 1) + b: c / 2 * (t = (t * 2 - d) / d) * t * t + b + c / 2;
    }

    /*
     * ===============================================================================================
     *
     * QUART EASING
     *
     * -----------------------------------------------------------------------------------------------
     */
    
    /**
     * Quart easing-in.
     * @static
     * @memberof Ease24
     */
    static _4_QuartIn(t:number, b:number, c:number, d:number): number {
        return c * (t /= d) * t * t * t + b;
    }

    /**
     * Quart easing-out.
     * @static
     * @memberof Ease24
     */
    static _4_QuartOut(t:number, b:number, c:number, d:number): number {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    }

    /**
     * Quart easing-in-out.
     * @static
     * @memberof Ease24
     */
    static _4_QuartInOut(t:number, b:number, c:number, d:number): number {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }

    /**
     * Quart easing-out-in.
     * @static
     * @memberof Ease24
     */
    static _4_QuartOutIn(t:number, b:number, c:number, d:number): number {
        if (t < d / 2) return -(c / 2) * ((t = (t * 2) / d - 1) * t * t * t - 1) + b;
        return (c / 2) * (t = (t * 2 - d) / d) * t * t * t + (b + c / 2);
    }

    /*
     * ===============================================================================================
     *
     * QUINT EASING
     *
     * -----------------------------------------------------------------------------------------------
     */
    
    /**
     * Quint easing-in.
     * @static
     * @memberof Ease24
     */
    static _5_QuintIn(t:number, b:number, c:number, d:number): number {
        return c * (t /= d) * t * t * t * t + b;
    }

    /**
     * Quint easing-out.
     * @static
     * @memberof Ease24
     */
    static _5_QuintOut(t:number, b:number, c:number, d:number): number {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    }

    /**
     * Quint easing-in-out.
     * @static
     * @memberof Ease24
     */
    static _5_QuintInOut(t:number, b:number, c:number, d:number): number {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }

    /**
     * Quint easing-out-in.
     * @static
     * @memberof Ease24
     */
    static _5_QuintOutIn(t:number, b:number, c:number, d:number): number {
        if (t < d / 2) return (c / 2) * ((t = (t * 2) / d - 1) * t * t * t * t + 1) + b;
        return (c / 2) * (t = (t * 2 - d) / d) * t * t * t * t + (b + c / 2);
    }

    /*
     * ===============================================================================================
     *
     * EXPO EASING
     *
     * -----------------------------------------------------------------------------------------------
     */

    /**
     * Expo easing-in.
     * @static
     * @memberof Ease24
     */
    static _6_ExpoIn(t:number, b:number, c:number, d:number): number {
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    }

    /**
     * Expo easing-out.
     * @static
     * @memberof Ease24
     */
    static _6_ExpoOut(t:number, b:number, c:number, d:number): number {
        return t == d ? b + c : c * (1 - Math.pow(2, -10 * t / d)) + b;
    }

    /**
     * Expo easing-in-out.
     * @static
     * @memberof Ease24
     */
    static _6_ExpoInOut(t:number, b:number, c:number, d:number): number {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2.0) < 1.0) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (2 - Math.pow(2, -10 * --t)) + b;
    }

    /**
     * Expo easing-out-in.
     * @static
     * @memberof Ease24
     */
    static _6_ExpoOutIn(t:number, b:number, c:number, d:number): number {
        if (t < d / 2.0) return t * 2.0 == d ? b + c / 2.0 : c / 2.0 * (1 - Math.pow(2, -10 * t * 2.0 / d)) + b;
        return ((t * 2.0 - d) == 0)? b + c / 2.0 : c / 2.0 * Math.pow(2, 10 * ((t * 2 - d) / d - 1)) + b + c / 2.0;
    }

    /*
     * ===============================================================================================
     *
     * CIRC EASING
     *
     * -----------------------------------------------------------------------------------------------
     */
    
    /**
     * Circ easing-in.
     * @static
     * @memberof Ease24
     */
    static _7_CircIn(t:number, b:number, c:number, d:number): number {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    }

    /**
     * Circ easing-out.
     * @static
     * @memberof Ease24
     */
    static _7_CircOut(t:number, b:number, c:number, d:number): number {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    }

    /**
     * Circ easing-in-out.
     * @static
     * @memberof Ease24
     */
    static _7_CircInOut(t:number, b:number, c:number, d:number): number {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }

    /**
     * Circ easing-out-in.
     * @static
     * @memberof Ease24
     */
    static _7_CircOutIn(t:number, b:number, c:number, d:number): number {
        if (t < d / 2) return (c / 2) * Math.sqrt(1 - (t = (t * 2) / d - 1) * t) + b;
        return -(c / 2) * (Math.sqrt(1 - (t = (t * 2 - d) / d) * t) - 1) + (b + c / 2);
    }

    /*
     * ===============================================================================================
     *
     * BACK EASING
     *
     * -----------------------------------------------------------------------------------------------
     */

    /**
     * Back easing-in with overshoot.
     * @static
     * @param {number} [overshoot=1.70158] オーバー値（デフォルト値：1.70158）
     * @memberof Ease24
     */
    static _BackInWith(overshoot:number = 1.70158): Function {
        return function (t:number, b:number, c:number, d:number): number {
            return c * (t /= d) * t * ((overshoot + 1) * t - overshoot) + b;
        }
    }

    /**
     * Back easing-out with overshoot.
     * @static
     * @param {number} [overshoot=1.70158] オーバー値（デフォルト値：1.70158）
     * @memberof Ease24
     */
    static _BackOutWith(overshoot:number = 1.70158): Function {
        return function (t:number, b:number, c:number, d:number): number {
            return c * ((t = t / d - 1) * t * ((overshoot + 1) * t + overshoot) + 1) + b;
        }
    }

    /**
     * Back easing-in-out with overshoot.
     * @static
     * @param {number} [overshoot=1.70158] オーバー値（デフォルト値：1.70158）
     * @memberof Ease24
     */
    static _BackInOutWith(overshoot:number = 1.70158): Function {
        return function (t:number, b:number, c:number, d:number): number {
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((overshoot * 1.525) + 1) * t - overshoot * 1.525)) + b;
            return c / 2 * ((t -= 2) * t * (((overshoot * 1.525) + 1) * t + overshoot * 1.525) + 2) + b;
        }
    }

    /**
     * Back easing-out-in with overshoot.
     * @static
     * @param {number} [overshoot=1.70158] オーバー値（デフォルト値：1.70158）
     * @memberof Ease24
     */
    static _BackOutInWith(overshoot:number = 1.70158): Function {
        return function (t:number, b:number, c:number, d:number): number {
            if (t < d / 2) return (c / 2) * ((t = (t * 2) / d - 1) * t * ((overshoot + 1) * t + overshoot) + 1) + b;
            return (c / 2) * (t = (t * 2 - d) / d) * t * ((overshoot + 1) * t - overshoot) + (b + c / 2);
        }
    }

    /**
     * Back easing-in.
     * @static
     * @memberof Ease24
     */
    static _BackIn   : Function = Ease24._BackInWith();

    /**
     * Back easing-out.
     * @static
     * @memberof Ease24
     */
    static _BackOut  : Function = Ease24._BackOutWith();

    /**
     * Back easing-in-out.
     * @static
     * @memberof Ease24
     */
    static _BackInOut: Function = Ease24._BackInOutWith();

    /**
     * Back easing-out-in.
     * @static
     * @memberof Ease24
     */
    static _BackOutIn: Function = Ease24._BackOutInWith();

    /*
     * ===============================================================================================
     *
     * BOUNCE EASING
     *
     * -----------------------------------------------------------------------------------------------
     */

    /**
     * Bounce easing-in.
     * @static
     * @memberof Ease24
     */
    static _BounceIn(t:number, b:number, c:number, d:number): number {
        if ((t = (d - t) / d) < (1 / 2.75)) return c - (c * (7.5625 * t * t)) + b;
        if (t < (2 / 2.75))                 return c - (c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)) + b;
        if (t < (2.5 / 2.75))               return c - (c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)) + b;
        return c - (c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)) + b;
    }

    /**
     * Bounce easing-out.
     * @static
     * @memberof Ease24
     */
    static _BounceOut(t:number, b:number, c:number, d:number): number {
        if ((t /= d) < (1 / 2.75)) return c * (7.5625 * t * t) + b;
        if (t < (2 / 2.75))        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        if (t < (2.5 / 2.75))      return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    }

    /**
     * Bounce easing-in-out.
     * @static
     * @memberof Ease24
     */
    static _BounceInOut(t:number, b:number, c:number, d:number): number {
        if (t < d / 2)
        {
            if ((t = (d - t * 2) / d) < (1 / 2.75)) return (c - (c * (7.5625 * t * t))) * 0.5 + b;
            if (t < (2 / 2.75))                     return (c - (c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75))) * 0.5 + b;
            if (t < (2.5 / 2.75))                   return (c - (c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375))) * 0.5 + b;
            return (c - (c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375))) * 0.5 + b;
        }
        else
        {
            if ((t = (t * 2 - d) / d) < (1 / 2.75)) return (c * (7.5625 * t * t)) * 0.5 + c * 0.5 + b;
            if (t < (2 / 2.75))                     return (c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)) * 0.5 + c * 0.5 + b;
            if (t < (2.5 / 2.75))                   return (c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)) * 0.5 + c * 0.5 + b;
            return (c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)) * 0.5 + c * 0.5 + b;
        }
    }

    /**
     * Bounce easing-out-in.
     * @static
     * @memberof Ease24
     */
    static _BounceOutIn(t:number, b:number, c:number, d:number): number {
        if (t < d / 2) {
            if ((t = (t * 2) / d) < (1 / 2.75)) return (c / 2) * (7.5625 * t * t) + b;
            if (t < (2 / 2.75))                 return (c / 2) * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
            if (t < (2.5 / 2.75))               return (c / 2) * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
            return (c / 2) * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
        }
        else
        {
            if ((t = (d - (t * 2 - d)) / d) < (1 / 2.75)) return (c / 2) - ((c / 2) * (7.5625 * t * t)) + (b + c / 2);
            if (t < (2 / 2.75))                           return (c / 2) - ((c / 2) * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)) + (b + c / 2);
            if (t < (2.5 / 2.75))                         return (c / 2) - ((c / 2) * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)) + (b + c / 2);
            return (c / 2) - ((c / 2) * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)) + (b + c / 2);
        }
    }

    /*
     * ===============================================================================================
     *
     * ELASTIC EASING
     *
     * -----------------------------------------------------------------------------------------------
     */

    /**
     * Elastic easing-in with amplitude & period.
     * @static
     * @param {number} amplitude 振幅の大きさ（デフォルト値：0）
     * @param {number} period 振幅の周期（デフォルト値：0）
     * @memberof Ease24
     */
    static _ElasticInWith(amplitude:number = 0, period:number = 0): Function {
        return function (t:number, b:number, c:number, d:number): number {
            t /= 1000;
            d /= 1000;

            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!period) period = d * 0.3;

            var s;
            if (!amplitude || amplitude < Math.abs(c)) { amplitude = c; s = period / 4; }
            else s = period / (2 * Math.PI) * Math.asin(c / amplitude);
            return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / period)) + b;
        }
    }

    /**
     * Elastic easing-out with amplitude & period.
     * @static
     * @param {number} amplitude 振幅の大きさ（デフォルト値：0）
     * @param {number} period 振幅の周期（デフォルト値：0）
     * @memberof Ease24
     */
    static _ElasticOutWith(amplitude:number = 0, period:number = 0): Function {
        return function (t:number, b:number, c:number, d:number): number {
            t /= 1000;
            d /= 1000;

            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!period) period = d * 0.3;

            var s;
            if (!amplitude || amplitude < Math.abs(c)) { amplitude = c; s = period / 4; }
            else s = period / (2 * Math.PI) * Math.asin(c / amplitude);
            return amplitude * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / period) + c + b;
        }
    }

    /**
     * Elastic easing-in-out with amplitude & period.
     * @static
     * @param {number} amplitude 振幅の大きさ（デフォルト値：0）
     * @param {number} period 振幅の周期（デフォルト値：0）
     * @memberof Ease24
     */
    static _ElasticInOutWith(amplitude:number = 0, period:number = 0): Function {
        return function (t:number, b:number, c:number, d:number): number {
            t /= 1000;
            d /= 1000;

            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!period) period = d * (0.3 * 1.5);

            var s;
            if (!amplitude || amplitude < Math.abs(c)) { amplitude = c; s = period / 4; }
            else s = period / (2 * Math.PI) * Math.asin(c / amplitude);
            if (t < 1) return -0.5 * (amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / period)) + b;
            return amplitude * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / period) * 0.5 + c + b;
        }
    }

    /**
     * Elastic easing-out-in with amplitude & period.
     * @static
     * @param {number} amplitude 振幅の大きさ（デフォルト値：0）
     * @param {number} period 振幅の周期（デフォルト値：0）
     * @memberof Ease24
     */
    static _ElasticOutInWith(amplitude:number = 0, period:number = 0): Function {
        return function (t:number, b:number, c:number, d:number): number {
            t /= 1000;
            d /= 1000;

            var s;
            c /= 2;

            if (t < d / 2) {
                if ((t *= 2) == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!period) period = d * 0.3;
                if (!amplitude || amplitude < Math.abs(c)) { amplitude = c; s = period / 4; }
                else s = period / (2 * Math.PI) * Math.asin(c / amplitude);
                return amplitude * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / period) + c + b;
            }
            else
            {
                if ((t = t * 2 - d) == 0) return (b + c);
                if ((t /= d) == 1) return (b + c) + c;
                if (!period) period = d * 0.3;
                if (!amplitude || amplitude < Math.abs(c)) { amplitude = c; s = period / 4; }
                else s = period / (2 * Math.PI) * Math.asin(c / amplitude);
                return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / period)) + (b + c);
            }
        }
    }

    /**
     * Elastic easing-in.
     * @static
     * @memberof Ease24
     */
    static _ElasticIn   : Function = Ease24._ElasticInWith();

    /**
     * Elastic easing-out.
     * @static
     * @memberof Ease24
     */
    static _ElasticOut  : Function = Ease24._ElasticOutWith();

    /**
     * Elastic easing-in-out.
     * @static
     * @memberof Ease24
     */
    static _ElasticInOut: Function = Ease24._ElasticInOutWith();

    /**
     * Elastic easing-out-in.
     * @static
     * @memberof Ease24
     */
    static _ElasticOutIn: Function = Ease24._ElasticOutInWith();

    /*
     * ===============================================================================================
     *
     * BLEND EASING
     *
     * -----------------------------------------------------------------------------------------------
     */

    /**
     * 2つのイージングをミックスして、新しいイージングを生成します。
     * ※この関数は blend() に移行しました。将来的に削除される可能性があります。
     * @static
     * @param {Function} easeA 元になるイージング
     * @param {Function} easeB 混合されるイージング
     * @param {Function} mixing 混合率を指定するイージング
     * @param {number} start 開始時の混合率
     * @param {number} end 終点時の混合率
     * @memberof Ease24
     */
    static _Blend(easeA:Function, easeB:Function, mixing:Function, start:number = 0, end:number = 1): Function {
        return function (t:number, b:number, c:number, d:number): number {
            let v1  = easeA (t, b, c, d);
            let v2  = easeB (t, b, c, d);
            let v3  = mixing(t, b, c, d);
            let rate = end - start;
            return v1 + (v2 - v1) * (v3 * rate + start);
        }
    }

    /**
     * 2つのイージングをミックスして、新しいイージングを生成します。
     * @static
     * @param {Function} easeA 元になるイージング
     * @param {Function} easeB 混合されるイージング
     * @param {Function} mixing 混合率を指定するイージング
     * @param {number} start 開始時の混合率
     * @param {number} end 終点時の混合率
     * @memberof Ease24
     */
    static blend(easeA:Function, easeB:Function, mixing:Function, start:number = 0, end:number = 1): Function {
        return function (t:number, b:number, c:number, d:number): number {
            let v1  = easeA (t, b, c, d);
            let v2  = easeB (t, b, c, d);
            let v3  = mixing(t, b, c, d);
            let rate = end - start;
            return v1 + (v2 - v1) * (v3 * rate + start);
        }
    }

    
    
    /*
     * ===============================================================================================
     *
     * CUSTOM EASING
     *
     * -----------------------------------------------------------------------------------------------
     */
    
    private static _customEasingById: Map<string, Function>;

    private static _set = (id:string, easing:Function) => {
        Ease24._customEasingById ||= new Map<string, Function>();
        Ease24._customEasingById.set(id, easing);
    }

    /**
     * 登録したカスタムイージングを取得します。
     * @static
     * @param {string} id カスタムイージングのID
     * @memberof Ease24
     */
    static get = (id:string): Function|undefined => {
        return Ease24._customEasingById?.get(id);
    }
    
    /**
     * 登録したカスタムイージングをクリアします。
     * @static
     * @param {string} id カスタムイージングのID
     * @memberof Ease24
     */
    static clear = (id:string) => {
        Ease24._customEasingById?.delete(id);
    }

    /**
     * カスタムイージングを作成します。
     * 作成時にIDを指定すると、get()関数でイージングを呼び出せるようになります。
     * 指定するパラメータのフォーマットは GreenSockの Ease Visualizer に準じています。
     * Ease Visualizer: https://greensock.com/ease-visualizer/
     * @static
     * @param {(string|null)} id 登録するカスタムイージングのID。登録しない場合は null を指定します
     * @param {string} svgPathData カスタムイージングのSVGパスデータ
     * @memberof Ease24
     */
    static create = (id:string|null, svgPathData:string): Function => {
        svgPathData = "0,0," + svgPathData.trim() + ",1,1";
        const pathList = svgPathData.replace(/[CM]/g, "").replace(/ /g, ",").split(",");
        let points = [];
        if (pathList.length % 3 != 0) {
            console.log(`Tween24 Warning: Incorrect parameter format for custom easing.`);
            return Ease24._Linear;
        }
        for (let i = 0; i < pathList.length; i += 6) {
            points.push({
                pre  :[pathList[i    ], pathList[i + 1]],
                point:[pathList[i + 2], pathList[i + 3]],
                post :[pathList[i + 4], pathList[i + 5]]
            });
        }
        const easing = Ease24._custom(points);
        if (id) Ease24._set(id, easing);
        return easing;
    }
    
    private static _custom = (points:any[]): Function => {
        return (t:number, b:number, c:number, d:number):number => {
            for (let i = 0; i < points.length - 1; i++) {
                if (t / d >= points[i].point[0] && t / d <= points[i + 1].point[0]) {
                    return c * Ease24._getYForX(t / d,
                        new Point(points[i    ].point[0], points[i    ].point[1]),
                        new Point(points[i    ].post [0], points[i    ].post[1] ),
                        new Point(points[i + 1].pre  [0], points[i + 1].pre[1]  ),
                        new Point(points[i + 1].point[0], points[i + 1].point[1])) + b;
                }
            }
            return NaN;
        };
    }

    

    /*
    * ===============================================================================================
    * 
    * Ported from fl.motion.BezierSegment.as
    * Copyright © 2007. Adobe Systems Incorporated. All Rights Reserved.
    * 
    * -----------------------------------------------------------------------------------------------
    */
    
    private static _getYForX = (x:number, a:Point, b:Point, c:Point, d:Point): number => {
        if (a.x < d.x) { 
            if (x <= a.x + 0.0000000000000001) return a.y;
            if (x >= d.x - 0.0000000000000001) return d.y;
        }
        else {
            if (x >= a.x + 0.0000000000000001) return a.y;
            if (x <= d.x - 0.0000000000000001) return d.y;
        }
        
        let coefficients = Ease24._getCubicCoefficients(a.x, b.x, c.x, d.x);
        
        // x(t) = a*t^3 + b*t^2 + c*t + d
        let roots = Ease24._getCubicRoots(coefficients[0], coefficients[1], coefficients[2], coefficients[3] - x);
        let time:number = NaN;
        if (roots.length == 0) time = 0;
        else if (roots.length == 1) time = roots[0];
        else {
            for (const root of roots) {
                if (0 <= root && root <= 1) {
                    time = root;
                    break;
                }
            }
        }
        
        if (isNaN(time)) return NaN;
        
        let y = Ease24._getSingleValue(time, a.y, b.y, c.y, d.y);
        return y;
    }
    
    /**
     * @param a The first value of the Bezier equation.
     * @param b The second value of the Bezier equation.
     * @param c The third value of the Bezier equation.
     * @param d The fourth value of the Bezier equation.
     * @return An array containing four number values,
     */
     private static _getCubicCoefficients = (a:number, b:number, c:number, d:number): number[] => {
        return [ -a + 3 * b - 3 * c + d,
                3 * a - 6 * b + 3 * c,
                -3 * a + 3 * b,
                a];
    } 
    
    /**
     * @param a The first coefficient of the cubic equation, which is multiplied by the cubed variable (t^3).
     * @param b The second coefficient of the cubic equation, which is multiplied by the squared variable (t^2).
     * @param c The third coefficient of the cubic equation, which is multiplied by the linear variable (t).
     * @param d The fourth coefficient of the cubic equation, which is the constant.
     * @return An array of number values, indicating the real roots of the equation. 
     */
     private static _getCubicRoots = (a:number = 0, b:number = 0, c:number = 0, d:number = 0): number[] => {
        if (!a) return Ease24._getQuadraticRoots(b, c, d);
        
        if (a != 1) {
            b /= a;
            c /= a;
            d /= a;
        }
        
        let q = (b * b - 3 * c) / 9;
        let qCubed = q * q * q;
        let r = (2 * b * b * b - 9 * b * c + 27 * d) / 54;
        
        let diff   = qCubed - r * r;
        if (diff >= 0) {
            if (!q) return [0];
            let theta = Math.acos(r / Math.sqrt(qCubed));
            let qSqrt = Math.sqrt(q);
            
            let root1 = -2 * qSqrt * Math.cos(theta / 3) - b / 3;
            let root2 = -2 * qSqrt * Math.cos((theta + 2 * Math.PI) / 3) - b / 3;
            let root3 = -2 * qSqrt * Math.cos((theta + 4 * Math.PI) / 3) - b / 3;
            
            return [root1, root2, root3];
        }
        else {
            let tmp = Math.pow( Math.sqrt(-diff) + Math.abs(r), 1/3);
            let rSign = (r > 0) ?  1 : r < 0  ? -1 : 0;
            let root = -rSign * (tmp + q / tmp) - b / 3;
            return [root];
        }
    }
    
    /**
     * @param a The first value of the Bezier equation.
     * @param b The second value of the Bezier equation.
     * @param c The third value of the Bezier equation.
     * @param d The fourth value of the Bezier equation.
     * @return The value of the Bezier equation at the specified time. 
     */
     private static _getSingleValue = (t:number, a:number = 0, b:number = 0, c:number = 0, d:number=0): number => {
        return (t * t * (d - a) + 3 * (1 - t) * (t * (c - a) + (1 - t) * (b - a))) * t + a;
    }
    
    /**
     * @param a The first coefficient of the quadratic equation, which is multiplied by the squared variable (t^2).
     * @param b The second coefficient of the quadratic equation, which is multiplied by the linear variable (t).
     * @param c The third coefficient of the quadratic equation, which is the constant.
     * @return An array of number values, indicating the real roots of the equation.
     */
     private static _getQuadraticRoots(a:number, b:number, c:number): number[]
    {
        var roots = [];
        if (!a) {
            if (!b) return [];
            roots[0] = -c / b;
            return roots;
        }
        
        var q = b*b - 4*a*c;
        var signQ = (q > 0)?  1: q < 0  ? -1: 0;
        
        if (signQ < 0) return [];
        else if (!signQ) roots[0] = -b / (2 * a);
        else {
            roots[0] = roots[1] = -b / (2 * a);
            let tmp = Math.sqrt(q) / (2 * a);
            roots[0] -= tmp;
            roots[1] += tmp;
        }
        return roots;
    }
}

class Point {
    
    private _x:number;
    private _y:number;
    
    constructor(x:number = 0, y:number = 0) {
        this._x = Number(x);
        this._y = Number(y);
    }

    get x():number { return this._x; }
    get y():number { return this._y; }
}