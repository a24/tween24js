var Ease24 = /** @class */ (function () {
    //    static _Linear = this.linear;
    //
    //    static _1_SineIn = sineIn;
    //    static _1_SineOut = sineOut;
    //    static _1_SineInOut = sineInOut;
    //    static _1_SineOutIn = sineOutIn;
    //
    //    static _2_QuadIn = quadIn;
    //    static _2_QuadOut = quadOut;
    //    static _2_QuadInOut = quadInOut;
    //    static _2_QuadOutIn = quadOutIn;
    //
    //    static _3_CubicIn = cubicIn;
    //    static _3_CubicOut  = cubicOut;
    //    static _3_CubicInOut = cubicInOut;
    //    static _3_CubicOutIn = cubicOutIn;
    //
    //    static _4_QuartIn = quartIn;
    //    static _4_QuartOut  = quartOut;
    //    static _4_QuartInOut = quartInOut;
    //    static _4_QuartOutIn = quartOutIn;
    //
    //    static _5_QuintIn = quintIn;
    //    static _5_QuintOut  = quintOut;
    //    static _5_QuintInOut = quintInOut;
    //    static _5_QuintOutIn = quintOutIn;
    //
    //    static _6_ExpoIn = expoIn;
    //    static _6_ExpoOut = expoOut;
    //    static _6_ExpoInOut = expoInOut;
    //    static _6_ExpoOutIn = expoOutIn;
    //
    //    static _7_CircIn = circIn;
    //    static _7_CircOut = circOut;
    //    static _7_CircInOut = circInOut;
    //    static _7_CircOutIn = circOutIn;
    //
    //    static _BackIn   = _BackInWith(1.70158);
    //    static _BackOut  = _BackOutWith(1.70158);
    //    static _BackInOut = _BackInOutWith(1.70158);
    //    static _BackOutIn = _BackOutInWith(1.70158);
    //
    //    static _BounceIn = bounceIn;
    //    static _BounceOut = bounceOut;
    //    static _BounceInOut = bounceInOut;
    //    static _BounceOutIn = bounceOutIn;
    //
    //    static _ElasticIn = _ElasticInWith();
    //    static _ElasticOut  = _ElasticOutWith();
    //    static _ElasticInOut = _ElasticInOutWith();
    //    static _ElasticOutIn = _ElasticOutInWith();
    function Ease24() {
    }
    /*
     * ===============================================================================================
     *
     * LINER EASING
     *
     * -----------------------------------------------------------------------------------------------
     */
    Ease24._Linear = function (t, b, c, d) {
        return c * t / d + b;
    };
    /*
     * ===============================================================================================
     *
     * SINE EASING
     *
     * -----------------------------------------------------------------------------------------------
     */
    Ease24._1_SineIn = function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    };
    Ease24._1_SineOut = function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    };
    Ease24._1_SineInOut = function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    };
    Ease24._1_SineOutIn = function (t, b, c, d) {
        if (t < d / 2)
            return (c / 2) * Math.sin((t * 2) / d * (Math.PI / 2)) + b;
        return -(c / 2) * Math.cos((t * 2 - d) / d * (Math.PI / 2)) + (c / 2) + (b + c / 2);
    };
    /*
     * ===============================================================================================
     *
     * QUAD EASING
     *
     * -----------------------------------------------------------------------------------------------
     */
    Ease24._2_QuadIn = function (t, b, c, d) {
        return c * (t /= d) * t + b;
    };
    Ease24._2_QuadOut = function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    };
    Ease24._2_QuadInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };
    Ease24._2_QuadOutIn = function (t, b, c, d) {
        if (t < d / 2)
            return -(c / 2) * (t = (t * 2 / d)) * (t - 2) + b;
        return (c / 2) * (t = (t * 2 - d) / d) * t + (b + c / 2);
    };
    /*
     * ===============================================================================================
     *
     * CUBIC EASING
     *
     * -----------------------------------------------------------------------------------------------
     */
    Ease24._3_CubicIn = function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    };
    Ease24._3_CubicOut = function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    };
    Ease24._3_CubicInOut = function (t, b, c, d) {
        return ((t /= d / 2) < 1) ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b;
    };
    Ease24._3_CubicOutIn = function (t, b, c, d) {
        return (t < d / 2) ? c / 2 * ((t = t * 2 / d - 1) * t * t + 1) + b : c / 2 * (t = (t * 2 - d) / d) * t * t + b + c / 2;
    };
    /*
     * ===============================================================================================
     *
     * QUART EASING
     *
     * -----------------------------------------------------------------------------------------------
     */
    Ease24._4_QuartIn = function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    };
    Ease24._4_QuartOut = function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };
    Ease24._4_QuartInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    };
    Ease24._4_QuartOutIn = function (t, b, c, d) {
        if (t < d / 2)
            return -(c / 2) * ((t = (t * 2) / d - 1) * t * t * t - 1) + b;
        return (c / 2) * (t = (t * 2 - d) / d) * t * t * t + (b + c / 2);
    };
    /*
     * ===============================================================================================
     *
     * QUINT EASING
     *
     * -----------------------------------------------------------------------------------------------
     */
    Ease24._5_QuintIn = function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    };
    Ease24._5_QuintOut = function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };
    Ease24._5_QuintInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    };
    Ease24._5_QuintOutIn = function (t, b, c, d) {
        if (t < d / 2)
            return (c / 2) * ((t = (t * 2) / d - 1) * t * t * t * t + 1) + b;
        return (c / 2) * (t = (t * 2 - d) / d) * t * t * t * t + (b + c / 2);
    };
    /*
     * ===============================================================================================
     *
     * EXPO EASING
     *
     * -----------------------------------------------------------------------------------------------
     */
    Ease24._6_ExpoIn = function (t, b, c, d) {
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    };
    Ease24._6_ExpoOut = function (t, b, c, d) {
        return t == d ? b + c : c * (1 - Math.pow(2, -10 * t / d)) + b;
    };
    Ease24._6_ExpoInOut = function (t, b, c, d) {
        if (t == 0)
            return b;
        if (t == d)
            return b + c;
        if ((t /= d / 2.0) < 1.0)
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (2 - Math.pow(2, -10 * --t)) + b;
    };
    Ease24._6_ExpoOutIn = function (t, b, c, d) {
        if (t < d / 2.0)
            return t * 2.0 == d ? b + c / 2.0 : c / 2.0 * (1 - Math.pow(2, -10 * t * 2.0 / d)) + b;
        return ((t * 2.0 - d) == 0) ? b + c / 2.0 : c / 2.0 * Math.pow(2, 10 * ((t * 2 - d) / d - 1)) + b + c / 2.0;
    };
    /*
     * ===============================================================================================
     *
     * CIRC EASING
     *
     * -----------------------------------------------------------------------------------------------
     */
    Ease24._7_CircIn = function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    };
    Ease24._7_CircOut = function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    };
    Ease24._7_CircInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    };
    Ease24._7_CircOutIn = function (t, b, c, d) {
        if (t < d / 2)
            return (c / 2) * Math.sqrt(1 - (t = (t * 2) / d - 1) * t) + b;
        return -(c / 2) * (Math.sqrt(1 - (t = (t * 2 - d) / d) * t) - 1) + (b + c / 2);
    };
    /*
     * ===============================================================================================
     *
     * BACK EASING
     *
     * -----------------------------------------------------------------------------------------------
     */
    Ease24._BackInWith = function (overshoot) {
        return function (t, b, c, d) {
            return c * (t /= d) * t * ((overshoot + 1) * t - overshoot) + b;
        };
    };
    Ease24._BackOutWith = function (overshoot) {
        return function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * ((overshoot + 1) * t + overshoot) + 1) + b;
        };
    };
    Ease24._BackInOutWith = function (overshoot) {
        return function (t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * (t * t * (((overshoot * 1.525) + 1) * t - overshoot * 1.525)) + b;
            return c / 2 * ((t -= 2) * t * (((overshoot * 1.525) + 1) * t + overshoot * 1.525) + 2) + b;
        };
    };
    Ease24._BackOutInWith = function (overshoot) {
        return function (t, b, c, d) {
            if (t < d / 2)
                return (c / 2) * ((t = (t * 2) / d - 1) * t * ((overshoot + 1) * t + overshoot) + 1) + b;
            return (c / 2) * (t = (t * 2 - d) / d) * t * ((overshoot + 1) * t - overshoot) + (b + c / 2);
        };
    };
    /*
     * ===============================================================================================
     *
     * BOUNCE EASING
     *
     * -----------------------------------------------------------------------------------------------
     */
    Ease24._BounceIn = function (t, b, c, d) {
        if ((t = (d - t) / d) < (1 / 2.75))
            return c - (c * (7.5625 * t * t)) + b;
        if (t < (2 / 2.75))
            return c - (c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)) + b;
        if (t < (2.5 / 2.75))
            return c - (c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)) + b;
        return c - (c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)) + b;
    };
    Ease24._BounceOut = function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75))
            return c * (7.5625 * t * t) + b;
        if (t < (2 / 2.75))
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        if (t < (2.5 / 2.75))
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    };
    Ease24._BounceInOut = function (t, b, c, d) {
        if (t < d / 2) {
            if ((t = (d - t * 2) / d) < (1 / 2.75))
                return (c - (c * (7.5625 * t * t))) * 0.5 + b;
            if (t < (2 / 2.75))
                return (c - (c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75))) * 0.5 + b;
            if (t < (2.5 / 2.75))
                return (c - (c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375))) * 0.5 + b;
            return (c - (c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375))) * 0.5 + b;
        }
        else {
            if ((t = (t * 2 - d) / d) < (1 / 2.75))
                return (c * (7.5625 * t * t)) * 0.5 + c * 0.5 + b;
            if (t < (2 / 2.75))
                return (c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)) * 0.5 + c * 0.5 + b;
            if (t < (2.5 / 2.75))
                return (c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)) * 0.5 + c * 0.5 + b;
            return (c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)) * 0.5 + c * 0.5 + b;
        }
    };
    Ease24._BounceOutIn = function (t, b, c, d) {
        if (t < d / 2) {
            if ((t = (t * 2) / d) < (1 / 2.75))
                return (c / 2) * (7.5625 * t * t) + b;
            if (t < (2 / 2.75))
                return (c / 2) * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
            if (t < (2.5 / 2.75))
                return (c / 2) * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
            return (c / 2) * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
        }
        else {
            if ((t = (d - (t * 2 - d)) / d) < (1 / 2.75))
                return (c / 2) - ((c / 2) * (7.5625 * t * t)) + (b + c / 2);
            if (t < (2 / 2.75))
                return (c / 2) - ((c / 2) * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)) + (b + c / 2);
            if (t < (2.5 / 2.75))
                return (c / 2) - ((c / 2) * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)) + (b + c / 2);
            return (c / 2) - ((c / 2) * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)) + (b + c / 2);
        }
    };
    /*
     * ===============================================================================================
     *
     * ELASTIC EASING
     *
     * -----------------------------------------------------------------------------------------------
     */
    Ease24._ElasticInWith = function (amplitude, period) {
        return function (t, b, c, d) {
            t /= 1000;
            d /= 1000;
            if (t == 0)
                return b;
            if ((t /= d) == 1)
                return b + c;
            if (!period)
                period = d * 0.3;
            var s;
            if (!amplitude || amplitude < Math.abs(c)) {
                amplitude = c;
                s = period / 4;
            }
            else
                s = period / (2 * Math.PI) * Math.asin(c / amplitude);
            return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / period)) + b;
        };
    };
    Ease24._ElasticOutWith = function (amplitude, period) {
        return function (t, b, c, d) {
            t /= 1000;
            d /= 1000;
            if (t == 0)
                return b;
            if ((t /= d) == 1)
                return b + c;
            if (!period)
                period = d * 0.3;
            var s;
            if (!amplitude || amplitude < Math.abs(c)) {
                amplitude = c;
                s = period / 4;
            }
            else
                s = period / (2 * Math.PI) * Math.asin(c / amplitude);
            return amplitude * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / period) + c + b;
        };
    };
    Ease24._ElasticInOutWith = function (amplitude, period) {
        return function (t, b, c, d) {
            t /= 1000;
            d /= 1000;
            if (t == 0)
                return b;
            if ((t /= d / 2) == 2)
                return b + c;
            if (!period)
                period = d * (0.3 * 1.5);
            var s;
            if (!amplitude || amplitude < Math.abs(c)) {
                amplitude = c;
                s = period / 4;
            }
            else
                s = period / (2 * Math.PI) * Math.asin(c / amplitude);
            if (t < 1)
                return -0.5 * (amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / period)) + b;
            return amplitude * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / period) * 0.5 + c + b;
        };
    };
    Ease24._ElasticOutInWith = function (amplitude, period) {
        return function (t, b, c, d) {
            t /= 1000;
            d /= 1000;
            var s;
            c /= 2;
            if (t < d / 2) {
                if ((t *= 2) == 0)
                    return b;
                if ((t /= d) == 1)
                    return b + c;
                if (!period)
                    period = d * 0.3;
                if (!amplitude || amplitude < Math.abs(c)) {
                    amplitude = c;
                    s = period / 4;
                }
                else
                    s = period / (2 * Math.PI) * Math.asin(c / amplitude);
                return amplitude * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / period) + c + b;
            }
            else {
                if ((t = t * 2 - d) == 0)
                    return (b + c);
                if ((t /= d) == 1)
                    return (b + c) + c;
                if (!period)
                    period = d * 0.3;
                if (!amplitude || amplitude < Math.abs(c)) {
                    amplitude = c;
                    s = period / 4;
                }
                else
                    s = period / (2 * Math.PI) * Math.asin(c / amplitude);
                return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / period)) + (b + c);
            }
        };
    };
    /*
     * ===============================================================================================
     *
     * BLEND EASING
     *
     * -----------------------------------------------------------------------------------------------
     */
    /**
     * 複数のイージングを組み合わせて、新しいイージングを生成します。
     * @param easeA 元になるイージング
     * @param easeB 混合されるイージング
     * @param mixing 混合率を指定するイージング
     * @param start 開始時の混合率
     * @param end 終点時の混合率
     * @return
     */
    Ease24._Blend = function (easeA, easeB, mixing, start, end) {
        return function (t, b, c, d) {
            var v1 = easeA(t, b, c, d);
            var v2 = easeB(t, b, c, d);
            var v3 = mixing(t, b, c, d);
            var rate = end - start;
            return v1 + (v2 - v1) * (v3 * rate + start);
        };
    };
    Ease24._BackIn = Ease24._BackInWith(1.70158);
    Ease24._BackOut = Ease24._BackOutWith(1.70158);
    Ease24._BackInOut = Ease24._BackInOutWith(1.70158);
    Ease24._BackOutIn = Ease24._BackOutInWith(1.70158);
    Ease24._ElasticIn = Ease24._ElasticInWith(0, 0);
    Ease24._ElasticOut = Ease24._ElasticOutWith(0, 0);
    Ease24._ElasticInOut = Ease24._ElasticInOutWith(0, 0);
    Ease24._ElasticOutIn = Ease24._ElasticOutInWith(0, 0);
    return Ease24;
}());
export default Ease24;
