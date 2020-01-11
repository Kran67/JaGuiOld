//#region Imports
import { Color, Colors } from "/scripts/core/color.js";
import { Convert } from "/scripts/core/convert.js";
import { Tools } from "/scripts/core/tools.js";
import { Animation } from "/scripts/core/animation.js";
//#endregion
class Interpolation {
    //#region INTERPOLATIONTYPES
    /**
     * @type    {Object}
     */
    static get INTERPOLATIONTYPES() {
        return {
            BACK: "back",
            BOUNCE: "bounce",
            CIRCULAR: "circular",
            CUBIC: "cubic",
            ELASTIC: "elastic",
            EXPONENTIAL: "exponential",
            LINEAR: "linear",
            QUADRATIC: "quadratic",
            QUARTIC: "quartic",
            QUINTIC: "quintic",
            SINUSOIDAL: "sinusoidal"
        };
    }
    //#endregion
    //#region Interpolation functions
    /**
     * Single interpolation function
     * @param  {Number}     s   first value to interpolate
     * @param  {Number}     s1  the second value to interpolate
     * @param  {Number}     t   the time
     * @return {Number}         the single interpolation result
     */
    static single(s, s1, t) {
        const NUMBER = Types.CONSTANTS.NUMBER;
        if (typeof s === NUMBER && typeof s1 === NUMBER && typeof t === NUMBER) {
            return s + (s1 - s) * t;
        }
        return s;
    }
    /**
     * Rotation interpolation function
     * @param   {Number}    s   the first value to interpolate
     * @param   {Number}    s1  the second value to interpolate
     * @param   {Number}    t   the time
     * @return  {Number}        the rotation interpolation result
     */
    static rotation(s, s1, t) {
        s = s | 0;
        s1 = s1 | 0;
        t = t | 0;
        return Interpolation.interpolateSingle(s, s1, t);
    }
    /**
     * Color interpolation function
     * @param   {Color}     c   first color to interpolate
     * @param   {Color}     c1  the second color to interpolate
     * @param   {Number}    t   the time
     * @return  {Color}         the color interpolation
     */
    static color(c, c1, t) {
        if (c instanceof Core.classes.Color && c1 instanceof Core.classes.Color) {
            //t = t | 0;
            const result = new Core.classes.Color;
            result.beginUpdate();
            result.alpha = c.alpha + (c1.alpha - c.alpha) * t;
            result.red = Convert.toByte(c.red + Math.trunc((c1.red - c.red) * t));
            result.green = Convert.toByte(c.green + Math.trunc((c1.green - c.green) * t));
            result.blue = Convert.toByte(c.blue + Math.trunc((c1.blue - c.blue) * t));
            result.endUpdate();
            return result;
        }
        return new Core.classes.Color(Colors.TRANSPARENT);
    }
    /**
     * Linear interpolation function
     * @param   {Number}    t   the time
     * @param   {Number}    b   the first value to interpolate
     * @param   {Number}    c   the second value to interpolate
     * @param   {Number}    d   the third value to interpolate
     * @return  {Number}        the linear interpolation result
     */
    static linear(t, b, c, d) {
        //let NUMBER = Types.CONSTANTS.NUMBER;
        //t = t | 0;
        //b = b | 0;
        //c = c | 0;
        //d = d | 1;
        return c * t / d + b;
    }
    /**
     * Sinusoidal interpolation function
     * @param   {Object}    params
     * @param   {Number}    params.t   the time
     * @param   {Number}    params.b   the first value to interpolate
     * @param   {Number}    params.c   the second value to interpolate
     * @param   {Number}    params.d   the third value to interpolate
     * @param   {String}    params.a   the type of the animation of the interpolation
     * @return  {Number}        the sinusoidal interpolation result
     */
    static sine(params) {
        const ANIMATIONTYPES = Animation.ANIMATIONTYPES;
        //params.t = params.t | 0;
        //params.b = params.b | 0;
        //params.c = params.c | 0;
        //params.d = params.d | 0;
        //if (typeof a!==_const.NUMBER) a=_animt.IN;
        if (!Tools.valueInSet(params.a, ANIMATIONTYPES)) {
            params.a = ANIMATIONTYPES.IN;
        }
        if (params.a === ANIMATIONTYPES.IN) {
            return -params.c * Math.cos(params.t / params.d * (Math.PI * 0.5)) + params.c + params.b;
        } else if (params.a === ANIMATIONTYPES.OUT) {
            return params.c * Math.sin(params.t / params.d * (Math.PI * 0.5)) + params.b;
        } else if (params.a === ANIMATIONTYPES.INOUT) {
            return -params.c / 2 * (Math.cos(Math.PI * params.t / params.d) - 1) + params.b;
        }
    }
    /**
     * Quint interpolation function
     * @param   {Object}    params
     * @param   {Number}    params.t   the time
     * @param   {Number}    params.b   the first value to interpolate
     * @param   {Number}    params.c   the second value to interpolate
     * @param   {Number}    params.d   the third value to interpolate
     * @param   {String}    params.a   the type of the animation of the interpolation
     * @return  {Number}        the quint interpolation result
     */
    static quint(params) {
        const ANIMATIONTYPES = Animation.ANIMATIONTYPES;
        //params.t = params.t | 0;
        //params.b = params.b | 0;
        //params.c = params.c | 0;
        //params.d = params.d | 0;
        //if (typeof a!==_const.NUMBER) a=_animt.IN;
        if (!Tools.valueInSet(params.a, ANIMATIONTYPES)) {
            params.a = ANIMATIONTYPES.IN;
        }
        if (params.a === ANIMATIONTYPES.IN) {
            params.t = params.t / params.d;
            return params.c * params.t * params.t * params.t * params.t * params.t + params.b;
        } else if (params.a === ANIMATIONTYPES.OUT) {
            params.t = params.t / params.d - 1;
            return params.c * (params.t * params.t * params.t * params.t * params.t + 1) + params.b;
        } else if (params.a === ANIMATIONTYPES.INOUT) {
            params.t = params.t / (params.d * 0.5);
            if (params.t < 1) {
                return params.c / 2 * params.t * params.t * params.t * params.t * params.t + params.b;
            } else {
                params.t = params.t - 2;
                return params.c / 2 * (params.t * params.t * params.t * params.t * params.t + 2) + params.b;
            }
        }
    }
    /**
     * Quartezain interpolation function
     * @param   {Object}    params
     * @param   {Number}    params.t   the time
     * @param   {Number}    params.b   the first value to interpolate
     * @param   {Number}    params.c   the second value to interpolate
     * @param   {Number}    params.d   the third value to interpolate
     * @param   {String}    params.a   the type of the animation of the interpolation
     * @return  {Number}        the quartezain interpolation result
     */
    static quart(params) {
        const ANIMATIONTYPES = Animation.ANIMATIONTYPES;
        //params.t = params.t | 0;
        //params.b = params.b | 0;
        //params.c = params.c | 0;
        //params.d = params.d | 0;
        //if (typeof a!==_const.NUMBER) a=_animt.IN;
        if (!Tools.valueInSet(params.a, ANIMATIONTYPES)) {
            params.a = ANIMATIONTYPES.IN;
        }
        if (params.a === ANIMATIONTYPES.IN) {
            params.t = params.t / params.d;
            return params.c * params.t * params.t * params.t * params.t + params.b;
        } else if (params.a === ANIMATIONTYPES.OUT) {
            params.t = params.t / params.d - 1;
            return -params.c * (params.t * params.t * params.t * params.t - 1) + params.b;
        } else if (params.a === ANIMATIONTYPES.INOUT) {
            params.t = params.t / (params.d * 0.5);
            if (params.t < 1) {
                return params.c / 2 * params.t * params.t * params.t * params.t + params.b;
            } else {
                params.t = params.t - 2;
                return -params.c / 2 * (params.t * params.t * params.t * params.t - 2) + params.b;
            }
        }
    }
    /**
     * Quadratic interpolation function
     * @param   {Object}    params
     * @param   {Number}    params.t   the time
     * @param   {Number}    params.b   the first value to interpolate
     * @param   {Number}    params.c   the second value to interpolate
     * @param   {Number}    params.d   the third value to interpolate
     * @param   {String}    params.a   the type of the animation of the interpolation
     * @return  {Number}        thue quadratic interpolation result
     */
    static quad(params) {
        const ANIMATIONTYPES = Animation.ANIMATIONTYPES;
        //params.t = params.t | 0;
        //params.b = params.b | 0;
        //params.c = params.c | 0;
        //params.d = params.d | 0;
        //if (typeof a!==_const.NUMBER) a=_animt.IN;
        if (!Tools.valueInSet(params.a, ANIMATIONTYPES)) {
            params.a = ANIMATIONTYPES.IN;
        }
        if (params.a === ANIMATIONTYPES.IN) {
            params.t = params.t / params.d;
            return params.c * params.t * params.t + params.b;
        } else if (params.a === ANIMATIONTYPES.OUT) {
            params.t = params.t / params.d;
            return -params.c * params.t * (params.t - 2) + params.b;
        } else if (params.a === ANIMATIONTYPES.INOUT) {
            params.t = params.t / (params.d * 0.5);
            if (params.t < 1) {
                return params.c / 2 * params.t * params.t + params.b;
            } else {
                params.t = params.t - 1;
                return -params.c / 2 * (params.t * (params.t - 2) - 1) + params.b;
            }
        }
    }
    /**
     * Exponential interpolation function
     * @param   {Object}    params
     * @param   {Number}    params.t   the time
     * @param   {Number}    params.b   the first value to interpolate
     * @param   {Number}    params.c   the second value to interpolate
     * @param   {Number}    params.d   the third value to interpolate
     * @param   {String}    params.a   the type of the animation of the interpolation
     * @return  {Number}        the exponential interpolation result
     */
    static expo(params) {
        const ANIMATIONTYPES = Animation.ANIMATIONTYPES;
        //params.t = params.t | 0;
        //params.b = params.b | 0;
        //params.c = params.c | 0;
        //params.d = params.d | 0;
        //if (typeof a!==_const.NUMBER) a=_animt.IN;
        if (!Tools.valueInSet(params.a, ANIMATIONTYPES)) {
            params.a = ANIMATIONTYPES.IN;
        }
        if (params.a === ANIMATIONTYPES.IN) {
            if (params.t === 0) {
                return params.b;
            }
            else {
                return params.c * Math.pow(2, 10 * (params.t / params.d - 1)) + params.b;
            }
        } else if (params.a === ANIMATIONTYPES.OUT) {
            if (params.t === params.d) {
                return params.b + params.c;
            } else {
                return params.c * (-Math.pow(2, -10 * params.t / params.d) + 1) + params.b;
            }
        } else if (params.a === ANIMATIONTYPES.INOUT) {
            if (params.t === 0) {
                return params.b;
            }
            if (params.t === params.d) {
                return params.b + params.c;
            }
            params.t = params.t / (params.d * 0.5);
            if (params.t < 1) {
                return params.c / 2 * Math.pow(2, 10 * (params.t - 1)) + params.b;
            } else {
                params.t = params.t - 1;
                return params.c / 2 * (-Math.pow(2, -10 * params.t) + 2) + params.b;
            }
        }
    }
    /**
     * Elastic interpolation function
     * @param   {Object}    params
     * @param   {Number}    params.t   the time
     * @param   {Number}    params.b   the first value to interpolate
     * @param   {Number}    params.c   the second value to interpolate
     * @param   {Number}    params.d   the third value to interpolate
     * @param   {Number}    params.a1  the fourth value to interpolate
     * @param   {Number}    params.p   the fifth value to interpolate
     * @param   {String}    params.a   the type of the animation of the interpolation
     * @return  {Number}        the elastic interpolation result
     */
    static elastic(params) {
        let s = null;
        const ANIMATIONTYPES = Animation.ANIMATIONTYPES;
        //params.t = params.t | 0;
        //params.b = params.b | 0;
        //params.c = params.c | 0;
        //params.d = params.d | 0;
        //params.a1 = params.a1 | 0;
        //params.p = params.p | 0;
        //if (typeof a!==_const.NUMBER) a=_animt.IN;
        if (!Tools.valueInSet(params.a, ANIMATIONTYPES)) {
            params.a = ANIMATIONTYPES.IN;
        }
        if (params.a === ANIMATIONTYPES.IN) {
            if (params.t === 0) {
                return params.b;
            }
            params.t = params.t / params.d;
            if (params.t === 1) {
                return params.b + params.c;
            }
            if (params.p === 0) {
                params.p = params.d * 0.3;
            }
            if (params.a1 === 0 || params.a1 < Math.abs(params.c)) {
                params.a1 = params.c;
                s = params.p * 0.25;
            } else {
                s = params.p / (2 * Math.PI) * Math.asin(params.c / params.a1);
            }
            params.t = params.t - 1;
            return -(params.a1 * Math.pow(2, 10 * params.t) * Math.sin((params.t * params.d - s) * (2 * Math.PI) / params.p)) + params.b;
        } else if (params.a === ANIMATIONTYPES.OUT) {
            if (params.t === 0) {
                return params.b;
            }
            params.t = params.t / params.d;
            if (params.t === 1) {
                return params.b + params.c;
            }
            if (params.p === 0) {
                params.p = params.d * 0.3;
            }
            if (params.a1 === 0 || params.a1 < Math.abs(params.c)) {
                params.a1 = params.c;
                s = params.p * 0.25;
            } else {
                s = params.p / (2 * Math.PI) * Math.asin(params.c / params.a1);
            }
            return params.a1 * Math.pow(2, -10 * params.t) * Math.sin((params.t * params.d - s) * (2 * Math.PI) / params.p) + params.c + params.b;
        } else if (params.a === ANIMATIONTYPES.INOUT) {
            if (params.t === 0) {
                return params.b;
            }
            params.t = params.t / (params.d * 0.5);
            if (params.t === 2) {
                return params.b + params.c;
            }
            if (params.p === 0) params.p = params.d * (0.3 * 1.5);
            if (params.a1 === 0 || params.a1 < Math.abs(params.c)) {
                params.a1 = params.c;
                s = params.p * 0.25;
            }
            else {
                s = params.p / (2 * Math.PI) * Math.asin(params.c / params.a1);
            }
            if (params.t < 1) {
                params.t = params.t - 1;
                return -0.5 * (params.a1 * Math.pow(2, 10 * params.t) * Math.sin((params.t * params.d - s) * (2 * Math.PI) / params.p)) + params.b;
            } else {
                params.t = params.t - 1;
                return params.a1 * Math.pow(2, -10 * params.t) * Math.sin((params.t * params.d - s) * (2 * Math.PI) / params.p) * 0.5 + params.c + params.b;
            }
        }
    }
    /**
     * Cubic interpolation function
     * @param   {Object}    params
     * @param   {Number}    params.t   the time
     * @param   {Number}    params.b   the first value to interpolate
     * @param   {Number}    params.c   the second value to interpolate
     * @param   {Number}    params.d   the third value to interpolate
     * @param   {String}    params.a   the type of the animation of the interpolation
     * @return  {Number}        the cubic interpolation result
     */
    static cubic(params) {
        const ANIMATIONTYPES = Animation.ANIMATIONTYPES;
        //params.t = params.t | 0;
        //params.b = params.b | 0;
        //params.c = params.c | 0;
        //params.d = params.d | 0;
        //if (typeof a!==_const.NUMBER) a=_animt.IN;
        if (!Tools.valueInSet(params.a, ANIMATIONTYPES)) {
            params.a = ANIMATIONTYPES.IN;
        }
        if (params.a === ANIMATIONTYPES.IN) {
            params.t = params.t / params.d;
            return params.c * params.t * params.t * params.t + params.b;
        } else if (params.a === ANIMATIONTYPES.OUT) {
            params.t = params.t / params.d - 1;
            return params.c * (params.t * params.t * params.t + 1) + params.b;
        } else if (params.a === ANIMATIONTYPES.INOUT) {
            params.t = params.t / (params.d * 0.5);
            if (params.t < 1) {
                return params.c / 2 * params.t * params.t * params.t + params.b;
            } else {
                params.t = params.t - 2;
                return params.c / 2 * (params.t * params.t * params.t + 2) + params.b;
            }
        }
    }
    /**
     * Circular interpolation function
     * @param   {Object}    params
     * @param   {Number}    params.t   the time
     * @param   {Number}    params.b   the first value to interpolate
     * @param   {Number}    params.c   the second value to interpolate
     * @param   {Number}    params.d   the third value to interpolate
     * @param   {String}    params.a   the type of the animation of the interpolation
     * @return  {Number}        the circular interpolation result
     */
    static circ(params) {
        const ANIMATIONTYPES = Animation.ANIMATIONTYPES;
        //params.t = params.t | 0;
        //params.b = params.b | 0;
        //params.c = params.c | 0;
        //params.d = params.d | 0;
        //if (typeof a!==_const.NUMBER) a=_animt.IN;
        if (!Tools.valueInSet(params.a, ANIMATIONTYPES)) {
            params.a = ANIMATIONTYPES.IN;
        }
        if (params.a === ANIMATIONTYPES.IN) {
            params.t = params.t / params.d;
            return -params.c * (Math.sqrt(1 - params.t * params.t) - 1) + params.b;
        } else if (params.a === ANIMATIONTYPES.OUT) {
            params.t = params.t / params.d - 1;
            return params.c * Math.sqrt(1 - params.t * params.t) + params.b;
        } else if (params.a === ANIMATIONTYPES.INOUT) {
            params.t = params.t / (params.d * 0.5);
            if (params.t < 1) {
                return -params.c / 2 * (Math.sqrt(1 - params.t * params.t) - 1) + params.b;
            } else {
                params.t = params.t - 2;
                return params.c / 2 * (Math.sqrt(1 - params.t * params.t) + 1) + params.b;
            }
        }
    }
    /**
     * Bouncing interpolation function
     * @param   {Object}    params
     * @param   {Number}    params.t   the time
     * @param   {Number}    params.b   the first value to interpolate
     * @param   {Number}    params.c   the second value to interpolate
     * @param   {Number}    params.d   the third value to interpolate
     * @param   {String}    params.a   the type of the animation interpolation
     * @return  {Number}        the bouncing interpolation result
     */
    static bounce(params) {
        const ANIMATIONTYPES = Animation.ANIMATIONTYPES;
        //params.t = params.t | 0;
        //params.b = params.b | 0;
        //params.c = params.c | 0;
        //params.d = params.d | 0;
        //if (typeof a!==_const.NUMBER) a=_animt.IN;
        if (!Tools.valueInSet(params.a, ANIMATIONTYPES)) {
            params.a = ANIMATIONTYPES.IN;
        }
        const _easeOut = (t1, b1, c1, d1) => {
            //if (!t1 || !b1 || !c1 || !d1) return 0;
            t1 = t1 | 0;
            b1 = b1 | 0;
            c1 = c1 | 0;
            d1 = d1 | 0;
            t1 = t1 / d1;
            if (t1 < 0.3636363636363636) {
                return c1 * (7.5625 * t1 * t1) + b1;
            } else if (t1 < 0.7272727272727273) {
                t1 = t1 - 0.5454545454545455;
                return c1 * (7.5625 * t1 * t1 + 0.75) + b1;
            } else if (t1 < 0.9090909090909091) {
                t1 = t1 - 0.8181818181818182;
                return c1 * (7.5625 * t1 * t1 + 0.9375) + b1;
            } else {
                t1 = t1 - 0.9545454545454545;
                return c1 * (7.5625 * t1 * t1 + 0.984375) + b1;
            }
        }
        const _easeIn = (t1, b1, c1, d1) => {
            //t1 = t1 | 0;
            //b1 = b1 | 0;
            //c1 = c1 | 0;
            //d1 = d1 | 0;
            return c - _easeOut(d1 - t1, 0, c1, d1) + b1;
        }
        if (params.a === ANIMATIONTYPES.IN) {
            return _easeIn(params.t, params.b, params.c, params.d);
        } else if (params.a === ANIMATIONTYPES.OUT) {
            return _easeOut(params.t, params.b, params.c, params.d);
        } else if (params.a === ANIMATIONTYPES.INOUT) {
            if (params.t < params.d * 0.5) {
                return _easeIn(params.t * 2, 0, params.c, params.d) * 0.5 + params.b;
            } else {
                return _easeOut(params.t * 2 - params.d, 0, params.c, params.d) * 0.5 + params.c * 0.5 + params.b;
            }
        }
    }
    /**
     * Backing interpolation function
     * @param   {Object}    params
     * @param   {Number}    params.t   the time
     * @param   {Number}    params.b   the first value to interpolate
     * @param   {Number}    params.c   the second value to interpolate
     * @param   {Number}    params.d   the third value to interpolate
     * @param   {Number}    params.s   the fourth value to interpolate
     * @param   {String}    params.a   the type of the animation interpolation
     * @return  {Number}    the backing interpolation result
     */
    static back(params) {
        const ANIMATIONTYPES = Animation.ANIMATIONTYPES;
        //params.t = params.t | 0;
        //params.b = params.b | 0;
        //params.c = params.c | 0;
        //params.d = params.d | 0;
        //params.s = params.s | 0;
        //if (typeof a!==_const.NUMBER) a=_animt.IN;
        if (!Tools.valueInSet(params.a, ANIMATIONTYPES)) {
            params.a = ANIMATIONTYPES.IN;
        }
        if (params.a === ANIMATIONTYPES.IN) {
            if (params.s === 0) params.s = 1.70158;
            params.t = params.t / params.d;
            return params.c * params.t * params.t * ((params.s + 1) * params.t - params.s) + params.b;
        } else if (params.a === ANIMATIONTYPES.OUT) {
            if (params.s === 0) params.s = 1.70158;
            params.t = params.t / params.d - 1;
            return params.c * (params.t * params.t * ((params.s + 1) * params.t + params.s) + 1) + params.b;
        } else if (params.a === ANIMATIONTYPES.INOUT) {
            if (params.s === 0) params.s = 1.70158;
            params.t = params.t / (params.d * 0.5);
            if (params.t < 1) {
                params.s = params.s * 1.525;
                return params.c / 2 * (params.t * params.t * ((params.s + 1) * params.t - params.s)) + params.b;
            } else {
                params.t = params.t - 2;
                params.s = params.s * 1.525;
                return params.c / 2 * (params.t * params.t * ((params.s + 1) * params.t + params.s) + 2) + params.b;
            }
        }
    }
    /**
     * Cholesky decomposition function
     * @param   {Number}    b   the first value for cholesky decomposition
     * @param   {Number}    c   the second value for cholesky decomposition
     * @return  {Array}         the cholesky decomposition result
     */
    static choleskyDecomposition(b, c) {
        const result = [];
        const d = 0;
        const f = c - 1;
        const m1 = new Array(f + 1);
        const m2 = new Array(f);
        m1[d] = Math.sqrt(2);
        m2[d] = 1.0 / m1[d];
        for (let k = d + 1; k < f; k++) {
            m1[k] = Math.sqrt(4 - m2[k - 1] * m2[k - 1]);
            m2[k] = 1.0 / m1[k];
        }
        m1[f] = Math.sqrt(2 - m2[f - 1] * m2[f - 1]);
        const y = new Array(c);
        y[d] = b[d] / m1[d];
        for (let i = d + 1; i <= f; i++) {
            y[i] = (b[i] - y[i - 1] * m2[i - 1]) / m1[i];
        }
        result[f] = y[f] / m1[f];
        for (let i = f - 1; i >= d; i--) {
            result[i] = (y[i] - result[i + 1] * m2[i]) / m1[i];
        }
        return result;
    }
    /**
     * Hermit interpolation function
     * @param   {Number}    s   the first value for the hermit interpolation
     * @param   {Number}    x   the second value for the hermit interpolation
     * @param   {Number}    c   the third value for the hermit interpolation
     * @return  {Number}        the hermit interpolation result
     */
    static hermitInterpolate(s, x, c) {
        if (s.length > 0) {
            let i = 0;
            if (x <= 0) {
                i = 0;
            } else if (x > c - 1) {
                i = c - 1;
            } else i = Math.trunc(x);
            if (i === c - 1) {
                i--;
            }
            return ((s[i][0] * x + s[i][1]) * x + s[i][2]) * x + s[i][3];
        } else {
            return 0;
        }
    }
    /**
     * Calculate the hermite factors
     * @param   {Array}     v   the vector
     * @return  {Array}         the hermite calculation factors result
     */
    static calcHermiteFactors(v) {
        if (v.length > 0) {
            const n = v.length - 1;
            const m1 = new Array(n + 1);
            m1[0] = 3 * (v[1] - v[0]);
            m1[n] = 3 * (v[n] - v[n - 1]);
            for (let i = 1; i < n; i++) {
                m1[i] = 3 * (v[i + 1] - v[i - 1]);
            }
            let m2 = new Array(n + 1);
            m2 = Interpolation.choleskyDecomposition(m1, n + 1);
            const spline = [];
            for (let i = 0; i < n; i++) {
                spline[i] = new Array(3);
            }
            for (let i = 0; i < n; i++) {
                //calc koeef
                const a = v[i];
                const b = m2[i];
                const c = 3 * (v[i + 1] - v[i]) - 2 * m2[i] - m2[i + 1];
                const d = -2 * (v[i + 1] - v[i]) + m2[i] + m2[i + 1];
                //calc spline
                spline[i][3] = a + i * (i * (c - i * d) - b);
                spline[i][2] = b + i * (3 * i * d - 2 * c);
                spline[i][1] = c - 3 * i * d;
                spline[i][0] = d;
            }
        }
        return spline;
    }
}
export { Interpolation };