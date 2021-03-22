class Ease24 {

	/*
	 * ===============================================================================================
	 *
	 * LINER EASING
	 *
	 * -----------------------------------------------------------------------------------------------
	 */
	static _Linear(t:number, b:number, c:number, d:number) {
		return c * t / d + b;
	}

	/*
	 * ===============================================================================================
	 *
	 * SINE EASING
	 *
	 * -----------------------------------------------------------------------------------------------
	 */
	static _1_SineIn(t:number, b:number, c:number, d:number) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	}

	static _1_SineOut(t:number, b:number, c:number, d:number) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	}

	static _1_SineInOut(t:number, b:number, c:number, d:number) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	}

	static _1_SineOutIn(t:number, b:number, c:number, d:number) {
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
	static _2_QuadIn(t:number, b:number, c:number, d:number) {
		return c * (t /= d) * t + b;
	}

	static _2_QuadOut(t:number, b:number, c:number, d:number) {
		return -c * (t /= d) * (t - 2) + b;
	}

	static _2_QuadInOut(t:number, b:number, c:number, d:number) {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	}

	static _2_QuadOutIn(t:number, b:number, c:number, d:number) {
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
	static _3_CubicIn(t:number, b:number, c:number, d:number) {
		return c * (t /= d) * t * t + b;
	}

	static _3_CubicOut(t:number, b:number, c:number, d:number) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	}

	static _3_CubicInOut(t:number, b:number, c:number, d:number) {
		return ((t /= d / 2) < 1) ? c / 2 * t * t * t + b: c / 2 * ((t -= 2) * t * t + 2) + b;
	}

	static _3_CubicOutIn(t:number, b:number, c:number, d:number) {
		return (t < d / 2)? c / 2 * ((t = t * 2 / d - 1) * t * t + 1) + b: c / 2 * (t = (t * 2 - d) / d) * t * t + b + c / 2;
	}

	/*
	 * ===============================================================================================
	 *
	 * QUART EASING
	 *
	 * -----------------------------------------------------------------------------------------------
	 */
	static _4_QuartIn(t:number, b:number, c:number, d:number) {
		return c * (t /= d) * t * t * t + b;
	}

	static _4_QuartOut(t:number, b:number, c:number, d:number) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	}

	static _4_QuartInOut(t:number, b:number, c:number, d:number) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	}

	static _4_QuartOutIn(t:number, b:number, c:number, d:number) {
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
	static _5_QuintIn(t:number, b:number, c:number, d:number) {
		return c * (t /= d) * t * t * t * t + b;
	}

	static _5_QuintOut(t:number, b:number, c:number, d:number) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	}

	static _5_QuintInOut(t:number, b:number, c:number, d:number) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	}

	static _5_QuintOutIn(t:number, b:number, c:number, d:number) {
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
	static _6_ExpoIn(t:number, b:number, c:number, d:number) {
		return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	}

	static _6_ExpoOut(t:number, b:number, c:number, d:number) {
		return t == d ? b + c : c * (1 - Math.pow(2, -10 * t / d)) + b;
	}

	static _6_ExpoInOut(t:number, b:number, c:number, d:number) {
		if (t == 0) return b;
		if (t == d) return b + c;
		if ((t /= d / 2.0) < 1.0) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (2 - Math.pow(2, -10 * --t)) + b;
	}

	static _6_ExpoOutIn(t:number, b:number, c:number, d:number) {
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
	static _7_CircIn(t:number, b:number, c:number, d:number) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	}

	static _7_CircOut(t:number, b:number, c:number, d:number) {
		return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	}

	static _7_CircInOut(t:number, b:number, c:number, d:number) {
		if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	}

	static _7_CircOutIn(t:number, b:number, c:number, d:number) {
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
	static _BackInWith(overshoot:number) {
		return function (t:number, b:number, c:number, d:number) {
			return c * (t /= d) * t * ((overshoot + 1) * t - overshoot) + b;
		}
	}

	static _BackOutWith(overshoot:number) {
		return function (t:number, b:number, c:number, d:number) {
			return c * ((t = t / d - 1) * t * ((overshoot + 1) * t + overshoot) + 1) + b;
		}
	}

	static _BackInOutWith(overshoot:number) {
		return function (t:number, b:number, c:number, d:number) {
			if ((t /= d / 2) < 1) return c / 2 * (t * t * (((overshoot * 1.525) + 1) * t - overshoot * 1.525)) + b;
			return c / 2 * ((t -= 2) * t * (((overshoot * 1.525) + 1) * t + overshoot * 1.525) + 2) + b;
		}
	}

	static _BackOutInWith(overshoot:number) {
		return function (t:number, b:number, c:number, d:number) {
			if (t < d / 2) return (c / 2) * ((t = (t * 2) / d - 1) * t * ((overshoot + 1) * t + overshoot) + 1) + b;
			return (c / 2) * (t = (t * 2 - d) / d) * t * ((overshoot + 1) * t - overshoot) + (b + c / 2);
		}
	}

	static _BackIn    = Ease24._BackInWith   (1.70158);
	static _BackOut   = Ease24._BackOutWith  (1.70158);
	static _BackInOut = Ease24._BackInOutWith(1.70158);
	static _BackOutIn = Ease24._BackOutInWith(1.70158);

	/*
	 * ===============================================================================================
	 *
	 * BOUNCE EASING
	 *
	 * -----------------------------------------------------------------------------------------------
	 */
	static _BounceIn(t:number, b:number, c:number, d:number) {
		if ((t = (d - t) / d) < (1 / 2.75)) return c - (c * (7.5625 * t * t)) + b;
		if (t < (2 / 2.75))                 return c - (c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)) + b;
		if (t < (2.5 / 2.75))               return c - (c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)) + b;
		return c - (c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)) + b;
	}

	static _BounceOut(t:number, b:number, c:number, d:number) {
		if ((t /= d) < (1 / 2.75)) return c * (7.5625 * t * t) + b;
		if (t < (2 / 2.75))        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
		if (t < (2.5 / 2.75))      return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
		return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
	}

	static _BounceInOut(t:number, b:number, c:number, d:number) {
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

	static _BounceOutIn(t:number, b:number, c:number, d:number) {
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
	static _ElasticInWith(amplitude:number, period:number) {
		return function (t:number, b:number, c:number, d:number) {
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

	static _ElasticOutWith(amplitude:number, period:number) {
		return function (t:number, b:number, c:number, d:number) {
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

	static _ElasticInOutWith(amplitude:number, period:number) {
		return function (t:number, b:number, c:number, d:number) {
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

	static _ElasticOutInWith(amplitude:number, period:number) {
		return function (t:number, b:number, c:number, d:number) {
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

	static _ElasticIn    = Ease24._ElasticInWith   (0, 0);
	static _ElasticOut   = Ease24._ElasticOutWith  (0, 0);
	static _ElasticInOut = Ease24._ElasticInOutWith(0, 0);
	static _ElasticOutIn = Ease24._ElasticOutInWith(0, 0);

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
	static _Blend(easeA:Function, easeB:Function, mixing:Function, start:number, end:number) {
		return function (t:number, b:number, c:number, d:number) {
			var v1  = easeA (t, b, c, d);
			var v2  = easeB (t, b, c, d);
			var v3  = mixing(t, b, c, d);
			var rate = end - start;
			return v1 + (v2 - v1) * (v3 * rate + start);
		}
	}

//	static _Linear = this.linear;
//
//	static _1_SineIn = sineIn;
//	static _1_SineOut = sineOut;
//	static _1_SineInOut = sineInOut;
//	static _1_SineOutIn = sineOutIn;
//
//	static _2_QuadIn = quadIn;
//	static _2_QuadOut = quadOut;
//	static _2_QuadInOut = quadInOut;
//	static _2_QuadOutIn = quadOutIn;
//
//	static _3_CubicIn = cubicIn;
//	static _3_CubicOut  = cubicOut;
//	static _3_CubicInOut = cubicInOut;
//	static _3_CubicOutIn = cubicOutIn;
//
//	static _4_QuartIn = quartIn;
//	static _4_QuartOut  = quartOut;
//	static _4_QuartInOut = quartInOut;
//	static _4_QuartOutIn = quartOutIn;
//
//	static _5_QuintIn = quintIn;
//	static _5_QuintOut  = quintOut;
//	static _5_QuintInOut = quintInOut;
//	static _5_QuintOutIn = quintOutIn;
//
//	static _6_ExpoIn = expoIn;
//	static _6_ExpoOut = expoOut;
//	static _6_ExpoInOut = expoInOut;
//	static _6_ExpoOutIn = expoOutIn;
//
//	static _7_CircIn = circIn;
//	static _7_CircOut = circOut;
//	static _7_CircInOut = circInOut;
//	static _7_CircOutIn = circOutIn;
//
//	static _BackIn   = _BackInWith(1.70158);
//	static _BackOut  = _BackOutWith(1.70158);
//	static _BackInOut = _BackInOutWith(1.70158);
//	static _BackOutIn = _BackOutInWith(1.70158);
//
//	static _BounceIn = bounceIn;
//	static _BounceOut = bounceOut;
//	static _BounceInOut = bounceInOut;
//	static _BounceOutIn = bounceOutIn;
//
//	static _ElasticIn = _ElasticInWith();
//	static _ElasticOut  = _ElasticOutWith();
//	static _ElasticInOut = _ElasticInOutWith();
//	static _ElasticOutIn = _ElasticOutInWith();

	constructor() {
	}
}

export default Ease24;