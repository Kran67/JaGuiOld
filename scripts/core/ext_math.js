//#region Imports
import { Tools } from '/scripts/core/tools.js';
//#endregion Imports
/***********************/
/*                     */
/* date.js extend Date */
/*                     */
/***********************/
if (!Math.intCeiling) {
    /**
     * Returns the smallest integer greater than or equal to its numeric argument.
     * @param       {Number}        value           Value to ceiling.
     * @param       {Number}        precision       Result precision.
     * @returns     {Number}        the int result
     */
    Math.intCeiling = function (value, precision) {
        if (Tools.isNumber(value)) {
            precision = precision || 1;
            return Math.ceil(value / precision) * precision;
        } else {
            return value;
        }
    };
}
if (!Math.intFloor) {
    /**
     * Returns the greatest integer less than or equal to its numeric argument.
     * @param       {Number}        value           Value to floor.
     * @param       {Number}        precision       Result precision.
     * @returns     {Number}        the int result
     */
    Math.intFloor = function (value, precision) {
        if (Tools.isNumber(value)) {
            precision = precision || 1;
            return Math.floor(value / precision) * precision;
        } else {
            return value;
        }
    };
}
if (!Math.intRound) {
    /**
     * Returns a supplied numeric expression rounded to the nearest integer.
     * @param       {Number}        value           Value to round.
     * @param       {Number}        precision       Result precision.
     * @returns     {Number}        the int result
     */
    Math.intRound = function (value, precision) {
        if (Tools.isNumber(value)) {
            precision = precision || 1;
            return Math.round(value / precision) * precision;
        } else {
            return value;
        }
    };
}
if (!Math.sqr) {
    /**
     * Returns the square root of a number in absolute value.
     * @param       {Number}        value       Value to sqr
     * @returns     {Number}        the result in absolute value
     */
    Math.sqr = function (value) {
        if (Tools.isNumber(value)) {
            return Math.abs2(value) * Math.abs(value);
        }
        return value;
    };
}
if (!Math.frac) {
    /**
     * Return the fractional part of a number.
     * @param       {Number}        value       Value to get frac part
     * @returns     {Number}        the fractional part
     */
    Math.frac = function (value) {
        if (Tools.isNumber(value)) {
            return +value - ~~value;
        }
        return value;
    };
}
if (!Math.RSqrt) {
    /**
     * Return the inverse of the sqrt
     * @param       {Number}        value value to evaluate
     * @return {Number} the inverse of the sqrt
     */
    Math.RSqrt = function (value) {
        if (Tools.isNumber(value)) {
            const r = Math.abs2(value);
            if (r > 0) {
                return 1 / Math.sqrt(r);
            } else {
                return 1;
            }
        }
        return value;
    };
}
if (!Math.mod) {
    Math.mod = function (value, value1) {
        if (Tools.isNumber(value) || Tools.isNumber(value1)) {
            return value & value1 - 1;
        }
        return 0;
    };
}
if (!Math.maxFloat) {
    Math.maxFloat = function (value, value1) {
        if (Tools.isNumber(value) && Tools.isNumber(value1)) {
            if (value > value1) {
                return value;
            } else {
                return value1;
            }
        }
        return 0;
    };
}
if (!Math.sinCos) {
    Math.sinCos = function (value) {
        if (Tools.isNumber(value)) {
            const s = Math.sin(value), c = Math.cos(value);
            return { sin: s, cos: c };
        }
        return 0;
    };
}
if (!Math.mulDiv) {
    Math.mulDiv = function (number, numerator, denominator) {
        return ~~(number * numerator / denominator);
    };
}
if (!Math.isZero) {
    Math.isZero = function (value, epsilon) {
        if (epsilon === undefined) {
            epsilon = 1E-19 * 1000;
        }
        return Math.abs2(value) <= epsilon;
    };
}
if (!Math.isUndefined) {
    Math.isUndefined = function (obj) {
        return obj === undefined;
    };
}
if (!Math.decimalPart) {
    Math.decimalPart = function (value) {
        return ~~value - value;
    };
}
if (!Math.isNumber) {
    Math.isNumber = function (num) { return !Array.isArray(num) && num - parseFloat(num) + 1 >= 0; };
}
if (!Math.abs2) {
    Math.abs2 = function (value) {
        return (value ^ value >> 31) - (value >> 31);
    };
}
if (!Math.getDigit) {
    Math.getDigit = function(number, n) {
        if (number.toString().length<n)
        {
            return null;
        }
        return Math.floor((number / Math.pow(10, n - 1)) % 10);
    }
}