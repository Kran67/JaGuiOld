/******************************************************************************/
/*                                                                            */
/* math.js cette partie définit les fonctions supplémentaires de l'objet Math */
/*                                                                            */
/******************************************************************************/
define(['core'], function (Core) {
    Core.intCeiling = function (value, precision) {
        var Const = require("types").CONSTANTS;
        if (typeof value !== Const.NUMBER) value = 0;
        if (typeof precision !== Const.NUMBER) precision = 1;
        return $j.Core(value / precision) * precision;
    };
    Core.intFloor = function (value, precision) {
        var Const = require("types").CONSTANTS;
        if (typeof value !== Const.NUMBER) value = 0;
        if (typeof precision !== Const.NUMBER) precision = 1;
        return Core.floor(value / precision) * precision;
    };
    Core.intRound = function (value, precision) {
        var Const = require("types").CONSTANTS;
        if (typeof value !== Const.NUMBER) value = 0;
        if (typeof precision !== Const.NUMBER) precision = 1;
        return Core.round(value / precision) * precision;
    };
    Core.sqr = function (value) {
        var Const = require("types").CONSTANTS;
        if (typeof value !== Const.NUMBER) return;
        return Core.abs(value) * Math.abs(value);
    };
    Core.trunc = function (value) {
        var Const = require("types").CONSTANTS;
        if (typeof value !== Const.NUMBER) return;
        return value | 0;
    };
    Core.frac = function (value) {
        var Const = require("types").CONSTANTS;
        if (typeof value !== Const.NUMBER) return;
        return (+(value) - (~~value));
    };
    Core.RSqrt = function (value) {
        var Const = require("types").CONSTANTS;
        if (typeof value !== Const.NUMBER) return;
        var r = Core.abs(value);
        if (r > 0) return 1 / Core.sqrt(r);
        else return 1;
    };
    Core.round = function (value, decimal) {
        var Const = require("types").CONSTANTS;
        var d;
        if (typeof value !== Const.NUMBER) return;
        if (typeof decimal !== Const.NUMBER) d = 0;
        if (decimal !== undefined)
        {
            d = Core.pow(10, decimal);
            return Core.round(value * d) / d;
        } else return value = ~~(0.5 + value);
    };
    Core.floor = function (value) {
        var Const = require("types").CONSTANTS;
        if (typeof value !== Const.NUMBER) return;
        return value << 0;
    };
    Core.mod = function (value, value1) {
        var Const = require("types").CONSTANTS;
        if (typeof value !== Const.NUMBER) return;
        if (typeof value1 !== Const.NUMBER) return;
        return value & (value1 - 1);
    };
    Core.maxFloat = function (value, value1) {
        var Const = require("types").CONSTANTS;
        if (typeof value !== Const.NUMBER) return;
        if (typeof value1 !== Const.NUMBER) return;
        if (value > value1) return value;
        else return value1;
    };
    Core.sinCos = function (value) {
        var Const = require("types").CONSTANTS;
        if (typeof value !== Const.NUMBER) return;
        var s = Core.sin(value), c = Core.cos(value);
        return { sin: s, cos: c };
    };
    Core.mulDiv = function (number, numerator, denominator) {
        return ~~((number * numerator) / denominator);
    };
    Core.isZero = function (value, epsilon) {
        if (epsilon === undefined) epsilon = 1E-19 * 1000;
        return Core.abs(value) <= epsilon;
    };
    Core.isUndefined = function (obj) {
        return obj === undefined;
    };
    Core.decimalPart = function (value) {
        return ~~value - value;
    };
    Core.isNumber = function (num) { return !Array.isArray(num) && (num - parseFloat(num) + 1) >= 0; };
    Core.abs = function (value) {
        return (value ^ (value >> 31)) - (value >> 31);
    }
    //aliases
    Core.pow = Math.pow;
    Core.cos = Math.cos;
    Core.ceil = Math.ceil;
    Core.max = Math.max;
    Core.min = Math.min;
    Core.random = Math.random;
    Core.sqrt = Math.sqrt;
    Core.E = Math.E;
    Core.exp = Math.exp;
    Core.LN2 = Math.LN2;
    Core.LN10 = Math.LN10;
    Core.log = Math.log;
    Core.LOG2E = Math.LOG2E;
    Core.SQRT_2 = Math.SQRT1_2;
    Core.SQRT2 = Math.SQRT2;
    Core.sin = Math.sin;
    Core.asin = Math.asin;
    Core.cos = Math.cos;
    Core.acos = Math.acos;
    Core.tan = Math.tan;
    Core.atan = Math.atan;
    Core.atan2 = Math.atan2;
    Core.abs = Math.abs;
    Core.floor = Math.floor;
});