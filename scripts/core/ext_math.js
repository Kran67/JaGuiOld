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
    Math.intCeiling = (value, precision) => {
        precision = precision || 1;
        return core.tools.isNumber(value)
            ? Math.ceil(value / precision) * precision
            : value;
    };
}
if (!Math.intFloor) {
    /**
     * Returns the greatest integer less than or equal to its numeric argument.
     * @param       {Number}        value           Value to floor.
     * @param       {Number}        precision       Result precision.
     * @returns     {Number}        the int result
     */
    Math.intFloor = (value, precision) => {
        precision = precision || 1;
        return core.tools.isNumber(value)
            ? Math.floor(value / precision) * precision
            : value;
    };
}
if (!Math.intRound) {
    /**
     * Returns a supplied numeric expression rounded to the nearest integer.
     * @param       {Number}        value           Value to round.
     * @param       {Number}        precision       Result precision.
     * @returns     {Number}        the int result
     */
    Math.intRound = (value, precision) => {
        precision = precision || 1;
        return core.tools.isNumber(value)
            ? Math.round(value / precision) * precision
            : value;
    };
}
if (!Math.sqr) {
    /**
     * Returns the square root of a number in absolute value.
     * @param       {Number}        value       Value to sqr
     * @returns     {Number}        the result in absolute value
     */
    Math.sqr = (value) => {
        return core.tools.isNumber(value)
            ? Math.abs2(value) * Math.abs(value)
            : value;
    };
}
if (!Math.frac) {
    /**
     * Return the fractional part of a number.
     * @param       {Number}        value       Value to get frac part
     * @returns     {Number}        the fractional part
     */
    Math.frac = (value) => {
        return core.tools.isNumber(value)
            ? +value - ~~value
            : value;
    };
}
if (!Math.RSqrt) {
    /**
     * Return the inverse of the sqrt
     * @param       {Number}        value value to evaluate
     * @return {Number} the inverse of the sqrt
     */
    Math.RSqrt = (value) => {
        if (core.tools.isNumber(value)) {
            const r = Math.abs2(value);
            return r > 0 && (1 / Math.sqrt(r));
        }
        return value;
    };
}
if (!Math.mod) {
    Math.mod = (value, value1) => {
        return core.tools.isNumber(value) || core.tools.isNumber(value1)
            ? value & value1 - 1
            : 0;
    };
}
if (!Math.maxFloat) {
    Math.maxFloat = (value, value1) => {
        return core.tools.isNumber(value) && core.tools.isNumber(value1)
            ? value > value1
                ? value
                : value1
            : 0;
    };
}
if (!Math.sinCos) {
    Math.sinCos = (value) => {
        return core.tools.isNumber(value)
            ? { sin: Math.sin(value), cos: Math.cos(value) }
            : 0;
    };
}
if (!Math.mulDiv) {
    Math.mulDiv = (number, numerator, denominator) => {
        return ~~(number * numerator / denominator);
    };
}
if (!Math.isZero) {
    Math.isZero = (value, epsilon) => {
        epsilon === undefined && (epsilon = 1E-19 * 1000);
        return Math.abs2(value) <= epsilon;
    };
}
if (!Math.isUndefined) {
    Math.isUndefined = (obj) => {
        return obj === undefined;
    };
}
if (!Math.decimalPart) {
    Math.decimalPart = (value) => {
        return ~~value - value;
    };
}
if (!Math.isNumber) {
    Math.isNumber = (num) => { return !Array.isArray(num) && num - parseFloat(num) + 1 >= 0; };
}
if (!Math.abs2) {
    Math.abs2 = (value) => {
        return (value ^ value >> 31) - (value >> 31);
    };
}
if (!Math.getDigit) {
    Math.getDigit = (number, n) => {
        return number.toString().length < n
            ? null
            : Math.floor((number / Math.pow(10, n - 1)) % 10);
    }
}