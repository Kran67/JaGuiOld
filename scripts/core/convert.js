//#region Imports
import { Rect, Point, Vector, Matrix } from '/scripts/core/geometry.js';
//import { Gradient, GradientPoint } from '/scripts/core/gradient.js';
//import { Browser } from './browser.js';
import { Color } from '/scripts/core/color.js';
import { Text } from '/scripts/core/text.js';
//#endregion Imports
//#region Convert
class Convert {
    /**
     * Convert a enum to a string
     * @param   {Enum}      e       the enum to convert
     * @param   {}          v
     * @returns     {}
     */
    static enum2Str(e, v) {
        for (let prop in e) {
            if (e.hasOwnProperty(prop) && e[prop] === v) {
                return prop;
            }
        }
    }
    /**
     * Convert a rect to string
     * @param       {Rect}          r       a rect to convert
     * @returns     {String}        the result
     */
    static rect2Str(r) {
        return r instanceof Rect
            ? `left:${r.left} top:${r.top} right:${r.right} bottom:${r.bottom} width:${r.width} height:${r.height}`
            : String.EMPTY;
    }
    /**
     * Convert a string to a rect
     * @param       {String}        s       the string to convert
     * @returns     {Rect}          the new rect instance from the string
     */
    static str2Rect(s) {
        if (core.tools.isString(s) && s.indexOf(',') > -1) {
            const a = s.split(',');
            const l = a[0] * 1;
            const t = a[1] * 1;
            const r = a[2] * 1;
            const b = a[3] * 1;
            return new Rect(l, t, r, b);
        }
        return null;
    }
    /**
     * Convert a string to bound
     * @param       {String}        s       the string to convert
     * @param       {Component}     o       the owner component
     * @returns     {Bounds}        the new bounds instance
     */
    static str2Bound(s, o) {
        if (core.tools.isString(s) && s.indexOf(',') > -1) {
            const a = s.split(',');
            const l = a[0] * 1;
            const t = a[1] * 1;
            const r = a[2] * 1;
            const b = a[3] * 1;
            return new core.classes.Bounds(new Rect(l, t, r, b), o);
        }
        return null;
    }
    /**
     * Convert a point to a string
     * @param       {Point}         p       the point to convert
     * @returns     {String}        the result
     */
    static point2Str(p) {
        return p instanceof Point ? `X:${p.x} Y:${p.y}` : String.EMPTY;
    }
    /**
     * Convert a string to a point
     * @param       {String}        s       the string to convert
     * @returns     {Point}         the new point instance
     */
    static str2Point(s) {
        if (core.tools.isString(s) && s.indexOf(',') > -1) {
            const a = s.split(',');
            const x = a[0] * 1;
            const y = a[1] * 1;
            return new Point(x, y);
        }
        return null;
    }
    /**
     * Convert a vector to a string
     * @param       {Vector}        a       the vector to convert
     * @returns     {String}        the result
     */
    static vector2Str(a) {
        return a instanceof Vector ? `X:${a.x} Y:${a.y} Z:${a.z}` : String.EMPTY;
    }
    /**
     * Convert a matrix to a string
     * @param       {Matrix}        a       the matrix to convert
     * @returns     {String}        the result
     */
    static matrix2Str(a) {
        return a instanceof Matrix
            ? `m11:${a.m11} m12:${a.m12} m13:${a.m13}\n
                m21:${a.m21} m22:${a.m22} m23:${a.m23}\n
                m31:${a.m31} m32:${a.m32} m33:${a.m33}`
            : String.EMPTY;
    }
    /**
     * Convert a integer number to a string
     * @param       {Number}        a       the integer to convert
     * @returns     {String}        the result
     */
    static intToStr(a) {
        return core.tools.isNumber(a) ? String(~~a) : String.EMPTY;
    }
    /**
     * Convert a float number to a string
     * @param       {Number}        a       the float to convert
     * @returns     {String}        the result
     */
    static floatToStr(a) {
        return core.tools.isNumber(a) ? String(a) : String.EMPTY;
    }
    /**
     * Convert a float number to a string
     * @param       {Number}        a       the float to convert
     * @returns     {Integer}        the result
     */
    static floatToInt(a) {
        return core.tools.isNumber(a) ? ~~a : 0;
    }
    /**
     * Convert a boolean to a string
     * @param       {Boolean}        a       the boolean to convert
     * @returns     {String}        the result
     */
    static boolToStr(a) {
        return core.tools.isBool(a)
            ? a
                ? 'true'
                : 'false'
            : 'false';
    }
    /**
     * Convert a string to a integer
     * @param       {String}        a       the string to convert
     * @returns     {Integer}       the result
     */
    static strToInt(a) {
        return ~~a;
    }
    /**
     * Convert a string to a float
     * @param       {String}        a       the string to convert
     * @returns     {Number}        the result
     */
    static strToFloat(a) {
        return a * 1;
    }
    /**
     * Convert a string to a boolean
     * @param       {String}        a       the string to convert
     * @returns     {Boolean}       the result
     */
    static strToBool(a) {
        if (core.tools.isString(a) && (a.toLowerCase() === 'true' || a.toLowerCase() === 'false')) {
            return a.toLowerCase() === 'true'
                ? !0
                    ? a.toLowerCase() === 'false'
                    : !1
                : !1;
        }
        return !1;
    }
    /**
     * Convert a integer to a boolean
     * @param       {String}        a       the integer to convert
     * @returns     {Boolean}       the result
     */
    static intToBool(a) {
        core.tools.isNumber(a) ? a = a | 0 : 1;
        a = Math.min(a, 1);
        return a === 1;
    }
    /**
     * Convert a degres to a radian
     * @param       {Number}        a       the degres to convert
     * @returns     {Number}        the result
     */
    static deg2Rad(a) {
        return core.tools.isNumber(a) ? a * Math.PI / 180 : a;
    }
    /**
     * Convert a radian to a degres
     * @param       {Number}        a       the radian to convert
     * @returns     {Number}        the result
     */
    static rad2Deg(a) {
        return core.tools.isNumber(a) ? a * 180 / Math.PI : a;
    }
    /**
     * Convert a decimal to a binary
     * @param       {Number}        a       the decimal to convert
     * @returns     {Number}        the result
     */
    static dec2Bin(a) {
        return ~~a.toString(2);
    }
    /**
     * Convert a decimal to an hexadecimal
     * @param       {Number}        a       the decimal to convert
     * @returns     {Number}        the result
     */
    static dec2Hex(a) {
        return ~~a.toString(16);
    }
    /**
     * Convert a decimal to an octal
     * @param       {Number}        a       the decimal to convert
     * @returns     {Number}        the result
     */
    static dec2Oct(a) {
        return ~~a.toString(8);
    }
    /**
     * Convert a binary to an hexadecimal
     * @param       {Number}        a       the binary to convert
     * @returns     {Number}        the result
     */
    static bin2Hex(a) {
        return core.tools.isString(a) ? dec2Hex(parseInt(a, 2)) : String.EMPTY;
    }
    /**
     * Convert a binary to a decimal
     * @param       {Number}        a       the binary to convert
     * @returns     {Number}        the result
     */
    static bin2Dec(a) {
        return core.tools.isString(a) ? parseInt(a, 2) : String.EMPTY;
    }
    /**
     * Convert a binary to an octal
     * @param       {Number}        a       the binary to convert
     * @returns     {Number}        the result
     */
    static bin2Oct(a) {
        return core.tools.isString(a) ? parseInt(a, 2).toString(8) : String.EMPTY;
    }
    /**
     * Convert an hexadecimal to a binary
     * @param       {Number}        a       the hexadecimal to convert
     * @returns     {Number}        the result
     */
    static hex2Bin(a) {
        return core.tools.isString(a) ? parseInt(a, 16).toString(2) : String.EMPTY;
    }
    /**
     * Convert an hexadecimal to a decimal
     * @param       {Number}        a       the hexadecimal to convert
     * @returns     {Number}        the result
     */
    static hex2Dec(a) {
        return core.tools.isString(a) ? parseInt(a, 16) : String.EMPTY;
    }
    /**
     * Convert an hexadecimal to an octal
     * @param       {Number}        a       the hexadecimal to convert
     * @returns     {Number}        the result
     */
    static hex2Oct(a) {
        return core.tools.isString(a) ? parseInt(a, 16).toString(8) : String.EMPTY;
    }
    /**
     * Convert an octal to a decimal
     * @param       {Number}        a       the octal to convert
     * @returns     {Number}        the result
     */
    static oct2Dec(a) {
        return core.tools.isString(a) ? parseInt(a.toString(), 8) : String.EMPTY;
    }
    /**
     * Convert an octal to a binary
     * @param       {Number}        a       the octal to convert
     * @returns     {Number}        the result
     */
    static oct2Bin(a) {
        return core.tools.isString(a) ? parseInt(a.toString(), 8).toString(2) : String.EMPTY;
    }
    /**
     * Convert an octal to an hexadecimal
     * @param       {Number}        a       the octal to convert
     * @returns     {Number}        the result
     */
    static oct2Hex(a) {
        return core.tools.isString(a) ? parseInt(a.toString(), 8).toString(16) : String.EMPTY;
    }
    /**
     * Convert a number to a byte
     * @param       {Number}        value       the number to convert
     * @returns     {Number}        the result
     */
    static toByte(value) {
        return value & 0xFF;
    }
    /**
     * Convert a number to a word
     * @param       {Number}        value       the number to convert
     * @returns     {Number}        the result
     */
    static toWord(value) {
        return value & 0xFFFF;
    }
    /**
     * Convert a number to a long word
     * @param       {Number}        value       the number to convert
     * @returns     {Number}        the result
     */
    static toLongWord(value) {
        return value & 0xFFFFFFFF;
    }
    /**
     * Convert a number to a integer 64
     * @param       {Number}        value       the number to convert
     * @returns     {Number}        the result
     */
    static toInt64(value) {
        return value & 0xFFFFFFFFFFFFFFFF;
    }
    /**
     * Convert a number to another unit
     * @param       {Object}        params             Parameters
     * @param       {Number}        params.value       the number to convert
     * @param       {String}        params.from        base unit
     * @param       {String}        params.to          convert unit
     * @param       {Number}        params.base        decimal base
     * @param       {Number}        params.dpi         dot per image
     * @param       {Number}        params.decimals    number of decimal
     * @returns     {String}        the result
     */
    static cssUnit(params/*value, from, to, base, dpi, decimals*/) {
        //1em == 16px == 0.17in == 12pt == 1pc == 4.2mm == 0.42cm
        core.tools.isNumber(params.value) ? params.value = 1 : 1;
        isNaN(params.params.base) ? params.base = 10 : 1;
        isNaN(params.dpi) ? params.dpi = 72 : 1;
        params.decimals = params.decimals | 0;
        const units = `${params.from}-${params.to}`;
        const formulas = {
            'cm-em': params.value / 0.42175176,
            'cm-in': params.value * 0.39,
            'cm-mm': params.value * 10,
            'cm-pc': params.value / 0.42175176,
            'cm-pt': params.value * 28.3464566929,
            'cm-%': params.value / params.base * 100 / 2.54 * params.dpi,
            'cm-px': params.value / 2.54 * params.dpi,
            'cm-rem': params.value / 0.42175176,

            'em-cm': params.value * 0.42175176,
            'em-in': params.value * 0.166044,
            'em-mm': params.value / 0.237106301584,
            'em-pc': params.value,
            'em-pt': params.value * 11.955168,
            'em-%': params.value * 100,
            'em-px': params.value * params.base,
            'em-rem': params.value,

            'in-cm': params.value * 2.54,
            'in-em': params.value / 0.166044,
            'in-mm': params.value * 2.54 * 10,
            'in-pc': params.value / 0.166044,
            'in-pt': params.value / 0.014842519685,
            'in-%': params.value / params.base * 100 * params.dpi,
            'in-px': params.value * params.dpi,
            'in-rem': params.value / 0.166044,

            'mm-cm': params.value / 10,
            'mm-em': params.value * 0.237106301584,
            'mm-in': params.value * 0.39 / 10,
            'mm-pc': params.value / 4.42175176,
            'mm-pt': params.value / 0.352777777778,
            'mm-%': params.value / params.base * 100 / 2.54 * params.dpi / 10,
            'mm-px': params.value / 2.54 * params.dpi / 10,
            'mm-rem': params.value * 0.237106301584,

            'pc-cm': params.value * 0.42175176,
            'pc-em': params.value,
            'pc-in': params.value * 0.166044,
            'pc-mm': params.value * 4.42175176,
            'pc-pt': params.value / 0.0836458341698,
            'pc-%': params.value * 100,
            'pc-px': params.value * params.base,
            'pc-rem': params.value,

            'pt-cm': params.value / 28.3464566929,
            'pt-em': params.value / 11.955168,
            'pt-in': params.value * 0.014842519685,
            'pt-mm': params.value * 0.352777777778,
            'pt-pc': params.value * 0.0836458341698,
            'pt-%': params.value / (params.base - 4) * 100,
            'pt-px': params.value * 96 / 72,
            'pt-rem': params.value / 11.955168,

            '%-cm': params.value * params.base / 100 * 2.54 / params.dpi,
            '%-em': params.value / 100,
            '%-in': params.value * params.base / 100 / params.dpi,
            '%-mm': params.value * params.base / 100 * 2.54 / params.dpi * 10,
            '%-pc': params.value / 100,
            '%-pt': params.value * (params.base - 4) / 100,
            '%-px': params.value * params.base / 100,
            '%-rem': params.value / 100,

            'px-cm': params.value * 2.54 / params.dpi,
            'px-em': params.value / params.base,
            'px-in': params.value / params.dpi,
            'px-mm': params.value * 2.54 / params.dpi * 10,
            'px-pc': params.value / params.base,
            'px-pt': params.value * 72 / 96,
            'px-%': params.value / params.base * 100,
            'px-rem': params.value / params.base,

            'rem-cm': params.value * 0.42175176,
            'rem-em': params.value,
            'rem-in': params.value * 0.166044,
            'rem-mm': params.value / 0.237106301584,
            'rem-pc': params.value,
            'rem-pt': params.value * 11.955168,
            'rem-%': params.value * 100,
            'rem-px': params.value * params.base
        };
        const result = formulas[units] || !1;
        return isNaN(result) ? 'N/A' : Math.round(result, params.decimals) + params.to;
    }
    /**
     * Convert a component property to a css property
     * @param       {Object}        animationObj        Object that contains properties
     * @param       {Boolean}       endValue            indicate using stopValue or startValue
     * @returns     {String}        the css property
     */
    static propertyToCssProperty(animationObj, endValue) {
        //#region Variables déclaration
        let result = String.EMPTY;
        //#endregion Variables déclaration
        !endValue ? endValue = !1 : 1;
        switch (animationObj.propertyName) {
            case 'width':
            case 'height':
            case 'left':
            case 'top':
            case 'right':
            case 'bottom':
                result = `${core.browser.getVendorPrefix(animationObj.propertyName)}${animationObj.propertyName}:${(endValue ? animationObj.stopValue : animationObj.startValue)}${core.types.CSSUNITS.PX};`;
                break;
            case 'opacity':
                result = `${core.browser.getVendorPrefix(animationObj.propertyName)}${animationObj.propertyName}:${(endValue ? animationObj.stopValue : animationObj.startValue)};`;
                break;
            case 'rotateAngle':
                result = `${core.browser.getVendorPrefix('transform')}transform:rotate(${(endValue ? animationObj.stopValue : animationObj.startValue)}deg);`;
                break;
            case 'background.color':
                result = `${core.browser.getVendorPrefix('background-color')}background-color:${(endValue ? animationObj.stopValue.toARGBString() : animationObj.startValue.toARGBString())};`;
                break;
            case 'bitmap':
                result = `opacity:${(endValue ? 1 : 0)};`;
                break;
            case 'rotateCenter':
                //result = String;
                break;
            case 'scale.x':
                result = 'transform:scaleX';
                break;
            case 'scale.y':
                result = 'transform:scaleY';
                break;
            case 'borderWidth':
                //return '';
                break;
            case 'bordersRadius':
                //return '';
                break;
            case 'shadowColor':
                //return '';
                break;
            case 'shadowOffsetX':
                //return '';
                break;
            case 'shadowOffsetY':
                //return '';
                break;
            case 'shadowBlur':
                //return '';
                break;
            case 'borderDash':
                //return '';
                break;
            case 'outline':
                //return '';
                break;
            case 'margin':
                //return '';
                break;
            case 'padding':
                //return '';
                break;
        }
        return result;
    }
    /**
     * Convert a css gredient to a gradient instance
     * @param       {String}        cssGradient         css gradient
     * @returns     {Gradient}      the gradient instance
     */
    static cssGradient2Gradient(cssGradient) {
        //#region Variables déclaration
        const gradient = new core.classes.Gradient(window);
        const PO = core.types.CSSUNITS.PO;
        //#endregion Variables déclaration
        if (cssGradient.indexOf('gradient') !== -1) {
            cssGradient = cssGradient.replace('-o-', String.EMPTY);
            cssGradient = cssGradient.replace('-moz-', String.EMPTY);
            cssGradient = cssGradient.replace('-ms-', String.EMPTY);
            cssGradient = cssGradient.replace('-webkit-', String.EMPTY);
            if (cssGradient.indexOf('linear') !== -1) { // linear gradient
                gradient.style = core.types.GRADIENTSTYLES.LINEAR;
                cssGradient = cssGradient.replace('linear-gradient(', String.EMPTY);
                cssGradient = cssGradient.replace('%)', PO);
                cssGradient = Text.replace(cssGradient, 'transparent', 'rgba(0,0,0,0)');
                cssGradient = Text.replace(cssGradient, ', rgb', '|rgb');
                const gradValues = cssGradient.split('|');
                gradient.startPosition.assign(new core.classes.Point());
                gradValues[0].indexOf('top') !== -1
                    ? gradient.stopPosition = new core.classes.Point(0, 1)
                        ? gradValues[0].indexOf('left') !== -1
                        : gradient.stopPosition.assign(new core.classes.Point(1, 0))
                    : 1;
                gradient.items.clear();
                gradValues.forEach(grad => {
                    const colorOffset = grad.replace(') ', ')|');
                    const color = colorOffset.split('|')[0];
                    const offset = +colorOffset.split('|')[1].replace(PO, String.EMPTY);
                    gradient.items.push(new core.classes.GradientPoint(offset / 100, Color.parse(color)));
                });
            }
        }
        return gradient;
    }
    /**
     * Convert seconds in minutes
     * @param       {Number}        seconds     the number of seconds
     * @returns     {String}        the result
     */
    static sec2min(seconds) {
        //#region Variables déclaration
        const mins = ~~(seconds % 3600 / 60);
        const secs = seconds % 60;
        //#endregion Variables déclaration
        return `${mins} minute(s) ${secs} seconde(s)`;
    }
    /**
     * Convert seconds in hours
     * @param       {Number}        seconds     the number of seconds
     * @returns     {String}        the result
     */
    static sec2hrs(seconds) {
        //#region Variables déclaration
        const hrs = ~~(seconds / 3600);
        const mins = ~~(seconds % 3600 / 60);
        //#endregion Variables déclaration
        const secs = seconds % 60;
        return `${hrs} heure(s) ${mins} minute(s) ${secs} seconde(s)`;
    }
    /**
     * Convert seconds in days
     * @param       {Number}        seconds     the number of seconds
     * @returns     {String}        the result
     */
    static sec2day(seconds) {
    }
    /**
     * Convert seconds in weeks
     * @param       {Number}        seconds     the number of seconds
     * @returns     {String}        the result
     */
    static sec2week(seconds) {
    }
    /**
     * Convert seconds in years
     * @param       {Number}        seconds     the number of seconds
     * @returns     {String}        the result
     */
    static sec2year(seconds) {
    }
    /**
     * Convert a nodeList to an Array
     * @param       {NodeList}  nodeList      The nodeList to convert
     * @returns     {Array}         The new array
     */
    static nodeListToArray(nodeList) {
        return Array.from(nodeList);
    }
    // Optimisation
    /*for (let i=0;i<10000;i++) -> let i=10000; while(i--) ...

    x=x*2; -> x=x << 1;
    x=x*64; -> x=x << 6;

    x=x / 2; -> x=x >> 1;
    x=x / 64; -> x=x >> 6;

    x=int(1.232) -> x=1.232 >> 0;

    i++ -> i=-~i;
    i-- -> i=~-i;

    i=-i; -> i=~i+1;

    x=131 % 4; -> x=131 & (4 - 1);

    (i % 2)==0; -> (i & 1)
    */
}
//#region Convert
export { Convert };