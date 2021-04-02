class Ease24 {

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
			var v1  = easeA (t, b, c, d);
			var v2  = easeB (t, b, c, d);
			var v3  = mixing(t, b, c, d);
			var rate = end - start;
			return v1 + (v2 - v1) * (v3 * rate + start);
		}
	}
}

export default Ease24;