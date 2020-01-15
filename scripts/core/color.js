//#region Imports
import { Bindable } from "/scripts/core/bindable.js";
import { Tools } from "/scripts/core/tools.js";
import { Convert } from "/scripts/core/convert.js";
//#endregion Imports
//#region Color
/**
 * Class representing a Color.
 * @extends {Bindable}
 */
const Color = (function () {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    class Color extends Bindable {
        //#region Constructor
        /**
         * Create a new instance of Color.
         */
        constructor() {
            //#region Variables déclaration
            let _owner = null;
            //#endregion Variables déclaration
            super();
            const priv = internal(this);
            priv.red = 0;
            priv.green = 0;
            priv.blue = 0;
            priv.alpha = 0;
            priv.hue = 0;
            priv.saturation = 0;
            priv.value = 0;
            priv.lightness = 0;
            priv.owner = _owner;
            priv.updating = false;
            if (arguments.length > 0) {
                for (let i = 0, l = arguments.length; i < l; i++) {
                    const arg = arguments[i];
                    if (arg instanceof Color) {
                        this.assign(arg);
                    }
                    if (arg instanceof Core.classes.Control) {
                        _owner = arg;
                    }
                }
            }
        }
        //#endregion Constructor
        //#region Private properties
        /**
         * @return  {Number}    the red value of the color
         */
        get red() {
            return internal(this).red;
        }
        /**
         * Set the red property
         * @param   {Number}   newValue    the new value
         */
        set red(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const owner = this.owner;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue !== priv.red) {
                    newValue = newValue & 0xFF;
                    priv.red = newValue;
                    if (!priv.updating) {
                        this.RGBtoHSV();
                        this.RGBtoHSL();
                    }
                    this.propertyChanged("red");
                    if (owner && !owner.loading) {
                        owner.update();
                    }
                }
            }
        }
        /**
         * @return  {Number}    the green value of the color
         */
        get green() {
            return internal(this).green;
        }
        /**
         * Set the green property
         * @param   {Number}   newValue    the new value
         */
        set green(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const owner = this.owner;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue !== priv.green) {
                    newValue = newValue & 0xFF;
                    priv.green = newValue;
                    if (!priv.updating) {
                        this.RGBtoHSV();
                        this.RGBtoHSL();
                    }
                    this.propertyChanged("green");
                    if (owner && !owner.loading) {
                        owner.update();
                    }
                }
            }
        }
        /**
         * @return  {Number}    the blue value of the color
         */
        get blue() {
            return internal(this).blue;
        }
        /**
         * Set the blue property
         * @param   {Number}   newValue    the new value
         */
        set blue(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const owner = this.owner;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue !== priv.blue) {
                    newValue = newValue & 0xFF;
                    priv.blue = newValue;
                    if (!priv.updating) {
                        this.RGBtoHSV();
                        this.RGBtoHSL();
                    }
                    this.propertyChanged("blue");
                    if (owner && !owner.loading) {
                        owner.update();
                    }
                }
            }
        }
        /**
         * @return  {Number}    the alpha value of the color
         */
        get alpha() {
            return internal(this).alpha;
        }
        /**
         * Set the alpha property
         * @param   {Number}   newValue    the new value
         */
        set alpha(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const owner = this.owner;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue !== priv.alpha) {
                    if (newValue > 1) {
                        newValue = 1;
                    }
                    if (newValue < 0) {
                        newValue = 0;
                    }
                    priv.alpha = newValue;
                    this.propertyChanged("alpha");
                    if (owner && !owner.loading) {
                        owner.update();
                    }
                }
            }
        }
        /**
         * @return  {Number}    the hue value of the color
         */
        get hue() {
            return internal(this).hue;
        }
        /**
         * Set the hue property
         * @param   {Number}   newValue    the new value
         */
        set hue(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const owner = this.owner;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue !== priv.hue) {
                    //newValue=newValue%360;
                    if (newValue < 0) {
                        newValue = 0;
                    }
                    if (newValue > 360) {
                        newValue = 360;
                    }
                    priv.hue = newValue;
                    if (!priv.updating) {
                        this.HSVtoRGB();
                    }
                    this.propertyChanged("hue");
                    if (owner && !owner.loading) {
                        owner.update();
                    }
                }
            }
        }
        /**
         * @return  {Number}    the saturation value of the color
         */
        get saturation() {
            return internal(this).saturation;
        }
        /**
         * Set the saturation property
         * @param   {Number}   newValue    the new value
         */
        set saturation(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const owner = this.owner;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue !== priv.saturation) {
                    if (newValue < 0) {
                        newValue = 0;
                    }
                    if (newValue > 100) {
                        newValue = 100;
                    }
                    priv.saturation = newValue;
                    if (!priv.updating) {
                        this.HSVtoRGB();
                    }
                    this.propertyChanged("saturation");
                    if (owner && !owner.loading) {
                        owner.update();
                    }
                }
            }
        }
        /**
         * @return  {Number}    the value of the color
         */
        get value() {
            return internal(this).value;
        }
        /**
         * Set the value property
         * @param   {Number}   newValue    the new value
         */
        set value(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const owner = this.owner;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue !== priv.value) {
                    if (newValue < 0) {
                        newValue = 0;
                    }
                    if (newValue > 100) {
                        newValue = 100;
                    }
                    priv.value = newValue;
                    if (!priv.updating) {
                        this.HSVtoRGB();
                    }
                    this.propertyChanged("value");
                    if (owner && !owner.loading) {
                        owner.update();
                    }
                }
            }
        }
        /**
         * @return  {Number}    the lightness value of the color
         */
        get lightness() {
            return internal(this).lightness;
        }
        /**
         * Set the lightness property
         * @param   {Number}   newValue    the new value
         */
        set lightness(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const owner = this.owner;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue !== priv.lightness) {
                    if (newValue < 0) {
                        newValue = 0;
                    }
                    if (newValue > 100) {
                        newValue = 100;
                    }
                    priv.lightness = newValue;
                    if (!priv.updating) {
                        this.HSLtoRGB();
                    }
                    this.propertyChanged("lightness");
                    if (owner && !owner.loading) {
                        owner.update();
                    }
                }
            }
        }
        get owner() {
            return internal(this).owner;
        }
        set owner(newValue) {
            internal(this).owner = newValue;
        }
        get updating() {
            return internal(this).updating;
        }
        set updating(newValue) {
            internal(this).updating = newValue;
        }
        //#endregion
        //#region Setter
        /**
         * Set the HSV of the color
         * @param   {Number}   hue              the new hue value
         * @param   {Number}   saturation       the new saturation value
         * @param   {Number}   value            the new value
         */
        setHSV(hue, saturation, value) {
            //#region Variables déclaration
            const owner = this.owner;
            //#endregion Variables déclaration
            if (Tools.isNumber(hue) && Tools.isNumber(saturation) && Tools.isNumber(value)) {
                this.hue = hue;
                this.saturation = saturation;
                this.value = value;
                if (!this.updating) {
                    this.HSVtoRGB();
                }
                if (owner && !owner.loading) {
                    owner.update();
                }
            }
        }
        /**
         * Set the HLS of the color
         * @param   {Number}   hue              the new hue value
         * @param   {Number}   saturation       the new saturation value
         * @param   {Number}   lightness        the new lightness value
         */
        setHSL(hue, saturation, lightness) {
            //#region Variables déclaration
            const owner = this.owner;
            //#endregion Variables déclaration
            if (Tools.isNumber(hue) && Tools.isNumber(saturation) && Tools.isNumber(lightness)) {
                this.hue = hue;
                this.saturation = saturation;
                this.lightness = lightness;
                if (!this.updating) {
                    this.HSLtoRGB();
                }
                if (owner && !owner.loading) {
                    owner.update();
                }
            }
        }

        //#region Statics
        /**
         * Create a new color from RGBA values
         * @param   {Number}        red         then red value
         * @param   {Number}        green       then green value
         * @param   {Number}        blue        then blue value
         * @param   {Number}        alpha       then alpha value
         * @returns     {Color}     the new color instance
         */
        static createFromRGBA(red, green, blue, alpha) {
            //#region Variables déclaration
            const c = new Color;
            //#endregion Variables déclaration
            red = red | 0;
            green = green | 0;
            blue = blue | 0;
            alpha = alpha | 0;
            c.beginUpdate();
            red = red & 0xFF;
            green = green & 0xFF;
            blue = blue & 0xFF;
            alpha = alpha > 1 ? 1 : alpha;
            c.red = red;
            c.green = green;
            c.blue = blue;
            c.alpha = alpha;
            c.RGBtoHSL();
            c.RGBtoHSV();
            c.endUpdate();
            return c;
        }
        /**
         * Create a new color from HSL values
         * @param   {Number}        hue             then hue value
         * @param   {Number}        saturation      then saturation value
         * @param   {Number}        lightness       then lightness value
         * @returns     {Color}     the new color instance
         */
        static createFromHSL(hue, saturation, lightness) {
            //#region Variables déclaration
            const c = new Color;
            //#endregion Variables déclaration
            hue = hue | 0;
            saturation = saturation | 0;
            lightness = lightness | 0;
            hue %= 360;
            saturation %= 100;
            lightness %= 100;
            c.beginUpdate();
            c.hue = hue;
            c.sat = saturation;
            c.light = lightness;
            c.HSLtoRGB();
            c.endUpdate();
            return c;
        }
        /**
         * Create a new color from HSV values
         * @param   {Number}        hue             then hue value
         * @param   {Number}        saturation      then saturation value
         * @param   {Number}        value           then value value
         * @returns     {Color}     the new color instance
         */
        static createFromHSV(hue, saturation, value) {
            //#region Variables déclaration
            const c = new Color;
            //#endregion Variables déclaration
            hue = hue | 0;
            saturation = saturation | 0;
            value = value | 0;
            hue %= 360;
            saturation %= 100;
            value %= 100;
            c.beginUpdate();
            c.hue = hue;
            c.sat = saturation;
            c.value = value;
            c.HSVtoRGB();
            c.endUpdate();
            return c;
        }
        /**
         * Create a new color instance
         * @param   {Number}        red         then red value
         * @param   {Number}        green       then green value
         * @param   {Number}        blue        then blue value
         * @param   {Number}        alpha       then alpha value
         * @returns     {Color}     the new color instance
         */
        static newColor(red, green, blue, alpha) {
            return new Color(red, green, blue, alpha);
        }
        /**
         * Parse a string that represent a color (rgb, rgba, hex format)
         * @param   {String}        strColor        the color string
         * @returns     {Color}     the new color instance
         */
        static parse(strColor) {
            //#region Variables déclaration
            const colorDefs = [
                {
                    re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
                    example: ["rgb(123,234,45)", "rgb(255,234,245)"],
                    process: (b) => {
                        return [
                            b[1] | 0,
                            b[2] | 0,
                            b[3] | 0
                        ];
                    }
                },
                {
                    re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/,
                    example: ["rgba(123,234,45,0.5)", "rgba(255,234,245,0.5)"],
                    process: (b) => {
                        return [
                            b[1] | 0,
                            b[2] | 0,
                            b[3] | 0,
                            +b[4]
                        ];
                    }
                },
                {
                    re: /^(\w{2})(\w{2})(\w{2})$/,
                    example: ["#00ff00", "#336699"],
                    process: (b) => {
                        return [
                            parseInt(b[1], 16),
                            parseInt(b[2], 16),
                            parseInt(b[3], 16)
                        ];
                    }
                },
                {
                    re: /^(\w{2})(\w{2})(\w{2})(\w{2})$/,
                    example: ["#0000ff00", "#00336699"],
                    process: (b) => {
                        return [
                            parseInt(b[2], 16),
                            parseInt(b[3], 16),
                            parseInt(b[4], 16),
                            parseInt(b[1], 16) / 0xFF
                        ];
                    }
                },
                {
                    re: /^(\w{1})(\w{1})(\w{1})$/,
                    example: ["#fb0", "#f0f"],
                    process: (b) => {
                        return [
                            parseInt(b[1] + b[1], 16),
                            parseInt(b[2] + b[2], 16),
                            parseInt(b[3] + b[3], 16)
                        ];
                    }
                }
            ];
            //#endregion Variables déclaration
            if (strColor == undefined) {
                return strColor;
            }
            if (!Tools.isString(strColor)) {
                strColor = String.EMPTY;
            }
            if (strColor === String.EMPTY) {
                return Colors.TRANSPARENT;
            }
            let result = new Color;
            result.beginUpdate();
            if (strColor.indexOf("#") === -1 && strColor.indexOf("rgb") === -1) {
                if (Colors[strColor.toUpperCase()]) {
                    result = Colors[strColor.toUpperCase()];
                }
            } else {
                strColor = strColor.replace("#", String.EMPTY);
                // search through the definitions to find a match
                const def = colorDefs.find(color => {
                    return color.re.exec(strColor) !== null ? color : null;
                });
                if (def) {
                    const channels = def.process(def.re.exec(strColor));
                    result.red = channels[0];
                    result.green = channels[1];
                    result.blue = channels[2];
                    result.alpha = !isNaN(channels[3]) ? channels[3] : 1;
                }
            }
            result.RGBtoHSL();
            result.RGBtoHSV();
            result.endUpdate();
            return result;
        }
        /**
         * Change the HSL values of a color and return a new color instance
         * @param       {Color}         c       the color string
         * @param       {Number}        h       the hue value
         * @param       {Number}        s       the saturation value
         * @param       {Number}        l       the lightness value
         * @returns     {Color}     the new color instance
         */
        static changeHSL(c, h, s, l) {
            //#region Variables déclaration
            const a = c.alpha;
            const hsl = c.RGB2HSL();
            const result = new Color;
            //#endregion Variables déclaration
            if (Tools.isNumber(h) && Tools.isNumber(s) && Tools.isNumber(l)) {
                hsl.h = hsl.h + h;
                if (hsl.h < 0) {
                    hsl.h = 0;
                }
                if (hsl.h > 1) {
                    hsl.h = 1;
                }
                hsl.s = hsl.s + s;
                if (s < 0) {
                    hsl.s = 0;
                }
                if (s > 1) {
                    hsl.s = 1;
                }
                hsl.l = hsl.l + l;
                if (hsl.l < 0) {
                    hsl.l = 0;
                }
                if (hsl.l > 1) {
                    hsl.l = 1;
                }
                result.beginUpdate();
                result.HSLRGB(hsl.h, hsl.s, hsl.l);
                result.alpha = a;
                result.endUpdate();
                return result;
            }
            return null;
        }
        /**
         * Return the color name of a color
         * @param       {Color}     color       a color instance
         * @returns     {String}                the name of the color
         */
        static getColorName(color) {
            const colors = Object.keys(this);
            const name = colors.find(c => {
                if (this[c] instanceof Color) {
                    if (this[c].equals(color)) {
                        return c.firstCharUpper();
                    }
                }
            });
            return name ? name : color.toRGBHexString();
        }
        //#endregion
        //#region Methods
        /**
         * Clone a color
         * @returns     {Color}     the cloned color
         */
        clone() {
            return new Color(this);
        }
        /**
         * Return the RGB hexa string format of the color instance
         * @returns     {String}        the string
         */
        toRGBHexString() {
            return `#${Convert.dec2Hex(this.red).padStart(2, "0")}${Convert.dec2Hex(this.green).padStart(2, "0")}${Convert.dec2Hex(this.blue).padStart(2, "0")}`.toUpperCase();
        }
        /**
         * Return the ARGB hexa string format of the color instance
         * @returns     {String}        the string
         */
        toARGBHexString() {
            return `#${Convert.dec2Hex(this.alpha * 0xFF).padStart(2, "0")}${Convert.dec2Hex(this.red).padStart(2, "0")}${Convert.dec2Hex(this.green).padStart(2, "0")}${Convert.dec2Hex(this.blue).padStart(2, "0")}`.toUpperCase();
        }
        /**
         * Return the rgb string format of the color instance
         * @returns     {String}        the string
         */
        toRGBString() {
            return `rgb(${this.red},${this.green},${this.blue})`;
        }
        /**
         * Return the rgba string format of the color instance
         * @returns     {String}        the string
         */
        toRGBAString() {
            return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
        }
        /**
         * Return the hsl string format of the color instance
         * @returns     {String}        the string
         */
        toHSLString() {
            return `hsl(${this.hue},${this.saturation},${this.lightness})`;
        }
        /**
         * Return the hsv string format of the color instance
         * @returns     {String}        the string
         */
        toHSVString() {
            return `hsv(${this.hue},${this.saturation},${this.value})`;
        }
        /**
         * Return the bgr string format of the color instance
         * @returns     {String}        the string
         */
        toBGRString() { return (Convert.dec2Hex(this.blue).padStart(2, "0") + Convert.dec2Hex(this.green).padStart(2, "0") + Convert.dec2Hex(this.red).padStart(2, "0")).toUpperCase(); }
        /**
         * Return the int string format of the color instance
         * @returns     {String}        the string
         */
        toInt() {
            return `0x${this.toBGRString()}`;
        }
        /**
         * Blend a color with the current color
         * @param       {Color}     color       the color to blend with
         * @param       {Number}    alpha       the alpha value
         * @return      {Color}             the new color
         */
        blend(color, alpha) {
            if (color instanceof Color) {
                color = color.toRGB();
                alpha = Math.min(Math.max(alpha, 0), 1);
                const rgb = new Color();
                rgb.red = (rgb.red * (1 - alpha)) + (color.red * alpha);
                rgb.green = (rgb.green * (1 - alpha)) + (color.green * alpha);
                rgb.blue = (rgb.blue * (1 - alpha)) + (color.blue * alpha);
                rgb.alpha = (rgb.alpha * (1 - alpha)) + (color.alpha * alpha);

                return rgb;
            }
            return color;
        }
        /**
         * Rotate RGB chanels to BGR chanels
         * @returns     {Color}             this color instance
         */
        RGBtoBGR() {
            this.red = this.blue;
            this.blue = this.red;
            return this;
        }
        /**
         * Premulty alpha chanel
         * @returns     {Color}             this color instance
         */
        premultyAlpha() {
            const red = this.red;
            const green = this.green;
            const blue = this.blue;
            const alpha = this.alpha;
            if (alpha === 0) {
                this.red = 0;
                this.green = 0;
                this.blue = 0;
            }
            else if (alpha !== 1) {
                this.red = (Math.trunc(red * alpha)) & 0xFF;
                this.green = (Math.trunc(green * alpha)) & 0xFF;
                this.blue = (Math.trunc(blue * alpha)) & 0xFF;
            }
            return this;
        }
        /**
         * Unpremulty alpha chanel
         * @returns     {Color}             this color instance
         */
        unPremultyAlpha() {
            const red = this.red;
            const green = this.green;
            const blue = this.blue;
            const alpha = this.alpha;
            if (alpha === 0) {
                this.red = 0;
                this.green = 0;
                this.blue = 0;
            } else {
                this.red = Math.trunc(red / alpha);
                this.green = Math.trunc(green / alpha);
                this.blue = Math.trunc(blue / alpha);
            }
            return this;
        }
        /**
         * Change the opaticy of the color
         * @param       {Number}        opacity     the new opcity value
         * @returns     {Color}                     this color instance
         */
        opacity(opacity) {
            //#region Variables déclaration
            let alpha = this.alpha;
            //#endregion Variables déclaration
            if (Tools.isNumber(opacity)) {
                if (opacity < 1) {
                    alpha = this.alpha = alpha * 0xFF * opacity / 0xFF;
                }
                if (alpha > 1) {
                    this.alpha = 1;
                } else if (alpha < 0) {
                    this.alpha = 0;
                }
                return this;
            }
            return this;
        }
        /**
         * Check if a color is equal to the current color
         * @param       {Color}        color     the color value
         * @return      {Boolean}       return the current color instance
         */
        equals(color) {
            return this.red === color.red &&
                this.green === color.green &&
                this.blue === color.blue &&
                this.alpha === color.alpha &&
                this.hue === color.hue &&
                this.saturation === color.saturation &&
                this.value === color.value &&
                this.lightness === color.lightness;
        }
        /**
         * Assign properties from source to the current color instance
         * @param       {Color}        source     the color source
         */
        assign(source) {
            //#region Variables déclaration
            const owner = this.owner;
            const priv = internal(this);
            //#endregion Variables déclaration
            if (source instanceof Color) {
                priv.alpha = source.alpha;
                priv.red = source.red;
                priv.green = source.green;
                priv.blue = source.blue;
                priv.hue = source.hue;
                priv.saturation = source.saturation;
                priv.value = source.value;
                priv.lightness = source.lightness;
                if (owner && !owner.loading) {
                    owner.update();
                }
            }
        }
        /**
         * Inverse the color chanels
         */
        inverse() {
            this.red = 255 - this.red;
            this.blue = 255 - this.blue;
            this.green = 255 - this.green;
            if (!this.updating) {
                this.RGBtoHSV();
                this.RGBtoHSL();
            }
        }
        /**
         * Prevent repaints until the operation is complete
         */
        beginUpdate() {
            this.updating = true;
        }
        /**
         * Enables repaints when the operation is complete
         */
        endUpdate() {
            this.updating = false;
        }
        /**
         * Convert HSV to RGB
         */
        HSVtoRGB() {
            //#region Variables déclaration
            const sat = this.saturation / 100;
            const value = this.value / 100;
            let c = sat * value;
            const h = this.hue / 60;
            let x = c * (1 - Math.abs(h % 2 - 1));
            let m = value - c;
            const precision = 255;
            //#endregion Variables déclaration
            c = (c + m) * precision | 0;
            x = (x + m) * precision | 0;
            m = m * precision | 0;
            if (h >= 0 && h < 1) { this.red = c; this.green = x; this.blue = m; return; }
            if (h >= 1 && h < 2) { this.red = x; this.green = c; this.blue = m; return; }
            if (h >= 2 && h < 3) { this.red = m; this.green = c; this.blue = x; return; }
            if (h >= 3 && h < 4) { this.red = m; this.green = x; this.blue = c; return; }
            if (h >= 4 && h < 5) { this.red = x; this.green = m; this.blue = c; return; }
            if (h >= 5 && h < 6) { this.red = c; this.green = m; this.blue = x; return; }
        }
        /**
         * Convert HSL to RGB
         */
        HSLtoRGB() {
            //#region Variables déclaration
            const sat = this.saturation / 100;
            const light = this.lightness / 100;
            let c = sat * (1 - Math.abs(2 * light - 1));
            const h = this.hue / 60;
            let x = c * (1 - Math.abs(h % 2 - 1));
            let m = light - c / 2;
            const precision = 255;
            //#endregion Variables déclaration
            c = (c + m) * precision | 0;
            x = (x + m) * precision | 0;
            m = m * precision | 0;
            if (h >= 0 && h < 1) {
                this.red = c; this.green = x; this.blue = m;
            } else if (h >= 1 && h < 2) {
                this.red = x; this.green = c; this.blue = m;
            } else if (h >= 2 && h < 3) {
                this.red = m; this.green = c; this.blue = x;
            } else if (h >= 3 && h < 4) {
                this.red = m; this.green = x; this.blue = c;
            } else if (h >= 4 && h < 5) {
                this.red = x; this.green = m; this.blue = c;
            } else if (h >= 5 && h < 6) {
                this.red = c; this.green = m; this.blue = x;
            }
        }
        /**
         * Convert RGB to HSV
         */
        RGBtoHSV() {
            //#region Variables déclaration
            const red = this.red / 255,
                green = this.green / 255,
                blue = this.blue / 255,
                cMax = Math.max(red, green, blue),
                cMin = Math.min(red, green, blue),
                delta = cMax - cMin;
            let hue = 0;
            let saturation = 0;
            //#endregion Variables déclaration
            if (delta) {
                if (cMax === red) {
                    hue = green - blue / delta;
                }
                if (cMax === green) {
                    hue = 2 + blue - red / delta;
                }
                if (cMax === blue) {
                    hue = 4 + red - green / delta;
                }
                if (cMax) {
                    saturation = delta / cMax;
                }
            }
            hue = this.hue = 60 * hue | 0;
            if (hue < 0) {
                this.hue += 360;
            }
            this.saturation = saturation * 100 | 0;
            this.value = cMax * 100 | 0;
        }
        /**
         * Convert RGB to HSL
         */
        RGBtoHSL() {
            //#region Variables déclaration
            const red = this.red / 255;
            const green = this.green / 255;
            const blue = this.blue / 255;
            const cMax = Math.max(red, green, blue);
            const cMin = Math.min(red, green, blue);
            const delta = cMax - cMin;
            let hue = 0;
            let saturation = 0;
            const lightness = (cMax + cMin) / 2;
            const x = 1 - Math.abs(2 * lightness - 1);
            //#endregion Variables déclaration
            if (delta) {
                if (cMax === red) {
                    hue = green - blue / delta;
                }
                if (cMax === green) {
                    hue = 2 + blue - red / delta;
                }
                if (cMax === blue) {
                    hue = 4 + red - green / delta;
                }
                if (cMax) {
                    saturation = delta / x;
                }
            }
            hue = this.hue = 60 * hue | 0;
            if (hue < 0) {
                this.hue += 360;
            }
            this.saturation = saturation * 100 | 0;
            this.lightness = lightness * 100 | 0;
        }
        /**
         * Return black or white color for the best viewing fore color
         * @return  {String}        retrun black or white color
         */
        getForeColorHex() {
            if (0.3 * this.red + 0.59 * this.green + 0.11 * this.blue <= 128) {
                return "#FFF";
            } else {
                return "#000";
            }
        }
        //#endregion
    }
    Object.defineProperties(Color, {
        "red": {
            enumerable: true
        },
        "green": {
            enumerable: true
        },
        "blue": {
            enumerable: true
        },
        "alpha": {
            enumerable: true
        },
        "hue": {
            enumerable: true
        },
        "saturation": {
            enumerable: true
        },
        "value": {
            enumerable: true
        },
        "lightness": {
            enumerable: true
        }
    });
    return Color;
})();

//#endregion
//#region Colors
const Colors = Object.freeze({
    /**
     * @return  {Color}    the ALICEBLUE color
     */
    get ALICEBLUE() { return Color.createFromRGBA(240, 248, 255, 1); },
    /**
     * @return  {Color}    the ANTIQUEWHITE color
     */
    get ANTIQUEWHITE() { return Color.createFromRGBA(250, 235, 215, 1); },
    /**
     * @return  {Color}    the AQUA color
     */
    get AQUA() { return Color.createFromRGBA(0, 255, 255, 1); },
    /**
     * @return  {Color}    the AQUAMARINE color
     */
    get AQUAMARINE() { return Color.createFromRGBA(127, 255, 212, 1); },
    /**
     * @return  {Color}    the AZURE color
     */
    get AZURE() { return Color.createFromRGBA(240, 255, 255, 1); },
    /**
     * @return  {Color}    the BEIGE color
     */
    get BEIGE() { return Color.createFromRGBA(245, 245, 220, 1); },
    /**
     * @return  {Color}    the BISQUE color
     */
    get BISQUE() { return Color.createFromRGBA(255, 228, 196, 1); },
    /**
     * @return  {Color}    the BLACK color
     */
    get BLACK() { return Color.createFromRGBA(0, 0, 0, 1); },
    /**
     * @return  {Color}    the BLANCHEDALMOND color
     */
    get BLANCHEDALMOND() { return Color.createFromRGBA(255, 235, 205, 1); },
    /**
     * @return  {Color}    the BLUE color
     */
    get BLUE() { return Color.createFromRGBA(0, 0, 255, 1); },
    /**
     * @return  {Color}    the BLUEVIOLET color
     */
    get BLUEVIOLET() { return Color.createFromRGBA(138, 43, 226, 1); },
    /**
     * @return  {Color}    the BROWN color
     */
    get BROWN() { return Color.createFromRGBA(165, 42, 42, 1); },
    /**
     * @return  {Color}    the BURLYWOOD color
     */
    get BURLYWOOD() { return Color.createFromRGBA(222, 184, 135, 1); },
    /**
     * @return  {Color}    the CADETBLUE color
     */
    get CADETBLUE() { return Color.createFromRGBA(95, 158, 160, 1); },
    /**
     * @return  {Color}    the CHARTREUSE color
     */
    get CHARTREUSE() { return Color.createFromRGBA(127, 255, 0, 1); },
    /**
     * @return  {Color}    the CHOCOLATE color
     */
    get CHOCOLATE() { return Color.createFromRGBA(210, 105, 30, 1); },
    /**
     * @return  {Color}    the CORAL color
     */
    get CORAL() { return Color.createFromRGBA(255, 127, 80, 1); },
    /**
     * @return  {Color}    the CORNFLOWERBLUE color
     */
    get CORNFLOWERBLUE() { return Color.createFromRGBA(100, 149, 237, 1); },
    /**
     * @return  {Color}    the CORNSILK color
     */
    get CORNSILK() { return Color.createFromRGBA(255, 248, 220, 1); },
    /**
     * @return  {Color}    the CRIMSON color
     */
    get CRIMSON() { return Color.createFromRGBA(220, 20, 60, 1); },
    /**
     * @return  {Color}    the CYAN color
     */
    get CYAN() { return Color.createFromRGBA(0, 255, 255, 1); },
    /**
     * @return  {Color}    the DARKBLUE color
     */
    get DARKBLUE() { return Color.createFromRGBA(0, 0, 139, 1); },
    /**
     * @return  {Color}    the DARKCYAN color
     */
    get DARKCYAN() { return Color.createFromRGBA(0, 139, 139, 1); },
    /**
     * @return  {Color}    the DARKGOLDENROD color
     */
    get DARKGOLDENROD() { return Color.createFromRGBA(184, 134, 11, 1); },
    /**
     * @return  {Color}    the DARKGRAY color
     */
    get DARKGRAY() { return Color.createFromRGBA(169, 169, 169, 1); },
    /**
     * @return  {Color}    the DARKGREEN color
     */
    get DARKGREEN() { return Color.createFromRGBA(0, 100, 0, 1); },
    /**
     * @return  {Color}    the DARKGREY color
     */
    get DARKGREY() { return Color.createFromRGBA(169, 169, 169, 1); },
    /**
     * @return  {Color}    the DARKKHAKI color
     */
    get DARKKHAKI() { return Color.createFromRGBA(189, 183, 107, 1); },
    /**
     * @return  {Color}    the DARKMAGENTA color
     */
    get DARKMAGENTA() { return Color.createFromRGBA(139, 0, 139, 1); },
    /**
     * @return  {Color}    the DARKOLIVEGREEN color
     */
    get DARKOLIVEGREEN() { return Color.createFromRGBA(85, 107, 47, 1); },
    /**
     * @return  {Color}    the DARKORANGE color
     */
    get DARKORANGE() { return Color.createFromRGBA(255, 140, 0, 1); },
    /**
     * @return  {Color}    the DARKORCHID color
     */
    get DARKORCHID() { return Color.createFromRGBA(153, 50, 204, 1); },
    /**
     * @return  {Color}    the DARKRED color
     */
    get DARKRED() { return Color.createFromRGBA(139, 0, 0, 1); },
    /**
     * @return  {Color}    the DARKSALMON color
     */
    get DARKSALMON() { return Color.createFromRGBA(233, 150, 122, 1); },
    /**
     * @return  {Color}    the DARKSEAGREEN color
     */
    get DARKSEAGREEN() { return Color.createFromRGBA(143, 188, 143, 1); },
    /**
     * @return  {Color}    the DARKSLATEBLUE color
     */
    get DARKSLATEBLUE() { return Color.createFromRGBA(72, 61, 139, 1); },
    /**
     * @return  {Color}    the DARKSLATEGRAY color
     */
    get DARKSLATEGRAY() { return Color.createFromRGBA(47, 79, 79, 1); },
    /**
     * @return  {Color}    the DARKSLATEGREY color
     */
    get DARKSLATEGREY() { return Color.createFromRGBA(47, 79, 79, 1); },
    /**
     * @return  {Color}    the DARKTURQUOISE color
     */
    get DARKTURQUOISE() { return Color.createFromRGBA(0, 206, 209, 1); },
    /**
     * @return  {Color}    the DARKVIOLET color
     */
    get DARKVIOLET() { return Color.createFromRGBA(148, 0, 211, 1); },
    /**
     * @return  {Color}    the DEEPPINK color
     */
    get DEEPPINK() { return Color.createFromRGBA(255, 20, 147, 1); },
    /**
     * @return  {Color}    the DEEPSKYBLUE color
     */
    get DEEPSKYBLUE() { return Color.createFromRGBA(0, 191, 255, 1); },
    /**
     * @return  {Color}    the DIMGRAY color
     */
    get DIMGRAY() { return Color.createFromRGBA(105, 105, 105, 1); },
    /**
     * @return  {Color}    the DIMGREY color
     */
    get DIMGREY() { return Color.createFromRGBA(105, 105, 105, 1); },
    /**
     * @return  {Color}    the DODGERBLUE color
     */
    get DODGERBLUE() { return Color.createFromRGBA(30, 144, 255, 1); },
    /**
     * @return  {Color}    the FIREBRICK color
     */
    get FIREBRICK() { return Color.createFromRGBA(178, 34, 34, 1); },
    /**
     * @return  {Color}    the FLORALWHITE color
     */
    get FLORALWHITE() { return Color.createFromRGBA(255, 250, 240, 1); },
    /**
     * @return  {Color}    the FORESTGREEN color
     */
    get FORESTGREEN() { return Color.createFromRGBA(34, 139, 34, 1); },
    /**
     * @return  {Color}    the FUCHSIA color
     */
    get FUCHSIA() { return Color.createFromRGBA(255, 0, 255, 1); },
    /**
     * @return  {Color}    the GAINSBORO color
     */
    get GAINSBORO() { return Color.createFromRGBA(220, 220, 220, 1); },
    /**
     * @return  {Color}    the GHOSTWHITE color
     */
    get GHOSTWHITE() { return Color.createFromRGBA(248, 248, 255, 1); },
    /**
     * @return  {Color}    the GOLD color
     */
    get GOLD() { return Color.createFromRGBA(255, 215, 0, 1); },
    /**
     * @return  {Color}    the GOLDENROD color
     */
    get GOLDENROD() { return Color.createFromRGBA(218, 165, 32, 1); },
    /**
     * @return  {Color}    the GRAY color
     */
    get GRAY() { return Color.createFromRGBA(128, 128, 128, 1); },
    /**
     * @return  {Color}    the GREEN color
     */
    get GREEN() { return Color.createFromRGBA(0, 128, 0, 1); },
    /**
     * @return  {Color}    the GREENYELLOW color
     */
    get GREENYELLOW() { return Color.createFromRGBA(173, 255, 47, 1); },
    /**
     * @return  {Color}    the GREY color
     */
    get GREY() { return Color.createFromRGBA(128, 128, 128, 1); },
    /**
     * @return  {Color}    the HONEYDEW color
     */
    get HONEYDEW() { return Color.createFromRGBA(240, 255, 240, 1); },
    /**
     * @return  {Color}    the HOTPINK color
     */
    get HOTPINK() { return Color.createFromRGBA(255, 105, 180, 1); },
    /**
     * @return  {Color}    the INDIANRED color
     */
    get INDIANRED() { return Color.createFromRGBA(205, 92, 92, 1); },
    /**
     * @return  {Color}    the INDIGO color
     */
    get INDIGO() { return Color.createFromRGBA(75, 0, 130, 1); },
    /**
     * @return  {Color}    the IVORY color
     */
    get IVORY() { return Color.createFromRGBA(255, 255, 240, 1); },
    /**
     * @return  {Color}    the KHAKI color
     */
    get KHAKI() { return Color.createFromRGBA(240, 230, 140, 1); },
    /**
     * @return  {Color}    the LAVENDER color
     */
    get LAVENDER() { return Color.createFromRGBA(230, 230, 250, 1); },
    /**
     * @return  {Color}    the LAVENDERBLUSH color
     */
    get LAVENDERBLUSH() { return Color.createFromRGBA(255, 240, 245, 1); },
    /**
     * @return  {Color}    the LAWNGREEN color
     */
    get LAWNGREEN() { return Color.createFromRGBA(124, 252, 0, 1); },
    /**
     * @return  {Color}    the LEMONCHIFFON color
     */
    get LEMONCHIFFON() { return Color.createFromRGBA(255, 250, 205, 1); },
    /**
     * @return  {Color}    the LIGHTBLUE color
     */
    get LIGHTBLUE() { return Color.createFromRGBA(173, 216, 230, 1); },
    /**
     * @return  {Color}    the LIGHTCORAL color
     */
    get LIGHTCORAL() { return Color.createFromRGBA(240, 128, 128, 1); },
    /**
     * @return  {Color}    the LIGHTCYAN color
     */
    get LIGHTCYAN() { return Color.createFromRGBA(224, 255, 255, 1); },
    /**
     * @return  {Color}    the LIGHTGOLDENRODYELLOW color
     */
    get LIGHTGOLDENRODYELLOW() { return Color.createFromRGBA(250, 250, 210, 1); },
    /**
     * @return  {Color}    the LIGHTGRAY color
     */
    get LIGHTGRAY() { return Color.createFromRGBA(211, 211, 211, 1); },
    /**
     * @return  {Color}    the LIGHTGREEN color
     */
    get LIGHTGREEN() { return Color.createFromRGBA(144, 238, 144, 1); },
    /**
     * @return  {Color}    the LIGHTGREY color
     */
    get LIGHTGREY() { return Color.createFromRGBA(211, 211, 211, 1); },
    /**
     * @return  {Color}    the LIGHTPINK color
     */
    get LIGHTPINK() { return Color.createFromRGBA(255, 182, 193, 1); },
    /**
     * @return  {Color}    the LIGHTSALMON color
     */
    get LIGHTSALMON() { return Color.createFromRGBA(255, 160, 122, 1); },
    /**
     * @return  {Color}    the LIGHTSEAGREEN color
     */
    get LIGHTSEAGREEN() { return Color.createFromRGBA(32, 178, 170, 1); },
    /**
     * @return  {Color}    the LIGHTSKYBLUE color
     */
    get LIGHTSKYBLUE() { return Color.createFromRGBA(135, 206, 250, 1); },
    /**
     * @return  {Color}    the LIGHTSLATEGRAY color
     */
    get LIGHTSLATEGRAY() { return Color.createFromRGBA(119, 136, 153, 1); },
    /**
     * @return  {Color}    the LIGHTSLATEGREY color
     */
    get LIGHTSLATEGREY() { return Color.createFromRGBA(119, 136, 153, 1); },
    /**
     * @return  {Color}    the LIGHTSTEELBLUE color
     */
    get LIGHTSTEELBLUE() { return Color.createFromRGBA(176, 196, 222, 1); },
    /**
     * @return  {Color}    the LIGHTYELLOW color
     */
    get LIGHTYELLOW() { return Color.createFromRGBA(255, 255, 224, 1); },
    /**
     * @return  {Color}    the LIME color
     */
    get LIME() { return Color.createFromRGBA(0, 255, 0, 1); },
    /**
     * @return  {Color}    the LIMEGREEN color
     */
    get LIMEGREEN() { return Color.createFromRGBA(50, 205, 50, 1); },
    /**
     * @return  {Color}    the LINEN color
     */
    get LINEN() { return Color.createFromRGBA(250, 240, 230, 1); },
    /**
     * @return  {Color}    the MAGENTA color
     */
    get MAGENTA() { return Color.createFromRGBA(255, 0, 255, 1); },
    /**
     * @return  {Color}    the MAROON color
     */
    get MAROON() { return Color.createFromRGBA(128, 0, 0, 1); },
    /**
     * @return  {Color}    the MEDIUMAQUAMARINE color
     */
    get MEDIUMAQUAMARINE() { return Color.createFromRGBA(102, 205, 170, 1); },
    /**
     * @return  {Color}    the MEDIUMBLUE color
     */
    get MEDIUMBLUE() { return Color.createFromRGBA(0, 0, 205, 1); },
    /**
     * @return  {Color}    the MEDIUMORCHID color
     */
    get MEDIUMORCHID() { return Color.createFromRGBA(186, 85, 211, 1); },
    /**
     * @return  {Color}    the MEDIUMPURPLE color
     */
    get MEDIUMPURPLE() { return Color.createFromRGBA(147, 112, 219, 1); },
    /**
     * @return  {Color}    the MEDIUMSEAGREEN color
     */
    get MEDIUMSEAGREEN() { return Color.createFromRGBA(60, 179, 113, 1); },
    /**
     * @return  {Color}    the MEDIUMSLATEBLUE color
     */
    get MEDIUMSLATEBLUE() { return Color.createFromRGBA(123, 104, 238, 1); },
    /**
     * @return  {Color}    the MEDIUMSPRINGGREEN color
     */
    get MEDIUMSPRINGGREEN() { return Color.createFromRGBA(0, 250, 154, 1); },
    /**
     * @return  {Color}    the MEDIUMTURQUOISE color
     */
    get MEDIUMTURQUOISE() { return Color.createFromRGBA(72, 209, 204, 1); },
    /**
     * @return  {Color}    the MEDIUMVIOLETRED color
     */
    get MEDIUMVIOLETRED() { return Color.createFromRGBA(199, 21, 133, 1); },
    /**
     * @return  {Color}    the MIDNIGHTBLUE color
     */
    get MIDNIGHTBLUE() { return Color.createFromRGBA(25, 25, 112, 1); },
    /**
     * @return  {Color}    the MINTCREAM color
     */
    get MINTCREAM() { return Color.createFromRGBA(245, 255, 250, 1); },
    /**
     * @return  {Color}    the MISTYROSE color
     */
    get MISTYROSE() { return Color.createFromRGBA(255, 228, 225, 1); },
    /**
     * @return  {Color}    the MOCCASIN color
     */
    get MOCCASIN() { return Color.createFromRGBA(255, 228, 181, 1); },
    /**
     * @return  {Color}    the NAVAJOWHITE color
     */
    get NAVAJOWHITE() { return Color.createFromRGBA(255, 222, 173, 1); },
    /**
     * @return  {Color}    the NAVY color
     */
    get NAVY() { return Color.createFromRGBA(0, 0, 128, 1); },
    /**
     * @return  {Color}    the OLDLACE color
     */
    get OLDLACE() { return Color.createFromRGBA(253, 245, 230, 1); },
    /**
     * @return  {Color}    the OLIVE color
     */
    get OLIVE() { return Color.createFromRGBA(128, 128, 0, 1); },
    /**
     * @return  {Color}    the OLIVEDRAB color
     */
    get OLIVEDRAB() { return Color.createFromRGBA(107, 142, 35, 1); },
    /**
     * @return  {Color}    the ORANGE color
     */
    get ORANGE() { return Color.createFromRGBA(255, 165, 0, 1); },
    /**
     * @return  {Color}    the ORANGERED color
     */
    get ORANGERED() { return Color.createFromRGBA(255, 69, 0, 1); },
    /**
     * @return  {Color}    the ORCHID color
     */
    get ORCHID() { return Color.createFromRGBA(218, 112, 214, 1); },
    /**
     * @return  {Color}    the PALEGOLDENROD color
     */
    get PALEGOLDENROD() { return Color.createFromRGBA(238, 232, 170, 1); },
    /**
     * @return  {Color}    the PALEGREEN color
     */
    get PALEGREEN() { return Color.createFromRGBA(152, 251, 152, 1); },
    /**
     * @return  {Color}    the PALETURQUOISE color
     */
    get PALETURQUOISE() { return Color.createFromRGBA(175, 238, 238, 1); },
    /**
     * @return  {Color}    the PALEVIOLETRED color
     */
    get PALEVIOLETRED() { return Color.createFromRGBA(219, 112, 147, 1); },
    /**
     * @return  {Color}    the PAPAYAWHIP color
     */
    get PAPAYAWHIP() { return Color.createFromRGBA(255, 239, 213, 1); },
    /**
     * @return  {Color}    the PEACHPUFF color
     */
    get PEACHPUFF() { return Color.createFromRGBA(255, 218, 185, 1); },
    /**
     * @return  {Color}    the PERU color
     */
    get PERU() { return Color.createFromRGBA(205, 133, 63, 1); },
    /**
     * @return  {Color}    the PINK color
     */
    get PINK() { return Color.createFromRGBA(255, 192, 203, 1); },
    /**
     * @return  {Color}    the PLUM color
     */
    get PLUM() { return Color.createFromRGBA(221, 160, 221, 1); },
    /**
     * @return  {Color}    the POWDERBLUE color
     */
    get POWDERBLUE() { return Color.createFromRGBA(176, 224, 230, 1); },
    /**
     * @return  {Color}    the PURPLE color
     */
    get PURPLE() { return Color.createFromRGBA(128, 0, 128, 1); },
    /**
     * @return  {Color}    the RED color
     */
    get RED() { return Color.createFromRGBA(255, 0, 0, 1); },
    /**
     * @return  {Color}    the ROSYBROWN color
     */
    get ROSYBROWN() { return Color.createFromRGBA(188, 143, 143, 1); },
    /**
     * @return  {Color}    the ROYALBLUE color
     */
    get ROYALBLUE() { return Color.createFromRGBA(65, 105, 225, 1); },
    /**
     * @return  {Color}    the SADDLEBROWN color
     */
    get SADDLEBROWN() { return Color.createFromRGBA(139, 69, 19, 1); },
    /**
     * @return  {Color}    the SALMON color
     */
    get SALMON() { return Color.createFromRGBA(250, 128, 114, 1); },
    /**
     * @return  {Color}    the SANDYBROWN color
     */
    get SANDYBROWN() { return Color.createFromRGBA(244, 164, 96, 1); },
    /**
     * @return  {Color}    the SEAGREEN color
     */
    get SEAGREEN() { return Color.createFromRGBA(46, 139, 87, 1); },
    /**
     * @return  {Color}    the SEASHELL color
     */
    get SEASHELL() { return Color.createFromRGBA(255, 245, 238, 1); },
    /**
     * @return  {Color}    the SIENNA color
     */
    get SIENNA() { return Color.createFromRGBA(160, 82, 45, 1); },
    /**
     * @return  {Color}    the SILVER color
     */
    get SILVER() { return Color.createFromRGBA(192, 192, 192, 1); },
    /**
     * @return  {Color}    the SKYBLUE color
     */
    get SKYBLUE() { return Color.createFromRGBA(135, 206, 235, 1); },
    /**
     * @return  {Color}    the SLATEBLUE color
     */
    get SLATEBLUE() { return Color.createFromRGBA(106, 90, 205, 1); },
    /**
     * @return  {Color}    the SLATEGRAY color
     */
    get SLATEGRAY() { return Color.createFromRGBA(112, 128, 144, 1); },
    /**
     * @return  {Color}    the SLATEGREY color
     */
    get SLATEGREY() { return Color.createFromRGBA(112, 128, 144, 1); },
    /**
     * @return  {Color}    the SNOW color
     */
    get SNOW() { return Color.createFromRGBA(255, 250, 250, 1); },
    /**
     * @return  {Color}    the SPRINGGREE color
     */
    get SPRINGGREE() { return Color.createFromRGBA(0, 255, 127, 1); },
    /**
     * @return  {Color}    the STEELBLUE color
     */
    get STEELBLUE() { return Color.createFromRGBA(70, 130, 180, 1); },
    /**
     * @return  {Color}    the TAN color
     */
    get TAN() { return Color.createFromRGBA(210, 180, 140, 1); },
    /**
     * @return  {Color}    the TEAL color
     */
    get TEAL() { return Color.createFromRGBA(0, 128, 128, 1); },
    /**
     * @return  {Color}    the THISTLE color
     */
    get THISTLE() { return Color.createFromRGBA(216, 191, 216, 1); },
    /**
     * @return  {Color}    the TOMATO color
     */
    get TOMATO() { return Color.createFromRGBA(255, 99, 71, 1); },
    /**
     * @return  {Color}    the TRANSPARENT color
     */
    get TRANSPARENT() { return Color.createFromRGBA(0, 0, 0, 0); },
    /**
     * @return  {Color}    the TURQUOISE color
     */
    get TURQUOISE() { return Color.createFromRGBA(64, 224, 208, 1); },
    /**
     * @return  {Color}    the VIOLET color
     */
    get VIOLET() { return Color.createFromRGBA(238, 130, 238, 1); },
    /**
     * @return  {Color}    the WHEAT color
     */
    get WHEAT() { return Color.createFromRGBA(245, 222, 179, 1); },
    /**
     * @return  {Color}    the WHITE color
     */
    get WHITE() { return Color.createFromRGBA(255, 255, 255, 1); },
    /**
     * @return  {Color}    the WHITESMOKE color
     */
    get WHITESMOKE() { return Color.createFromRGBA(245, 245, 245, 1); },
    /**
     * @return  {Color}    the YELLOW color
     */
    get YELLOW() { return Color.createFromRGBA(255, 255, 0, 1); },
    /**
     * @return  {Color}    the YELLOWGREEN color
     */
    get YELLOWGREEN() { return Color.createFromRGBA(154, 205, 50, 1); }
});
//#endregion
Core.classes.register(Types.CATEGORIES.COLOR, Color);
export { Color, Colors };