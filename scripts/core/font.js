import { BaseClass } from "/scripts/core/baseclass.js";
import { Color } from "/scripts/core/color.js";
import * as Canvas from "/scripts/core/canvas.js";
//#region Font
// TODO : support of databinding
const Font = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Font extends BaseClass {
        //#region statics
        static getTextHeight(text, font) {
            if (typeof text !== Types.CONSTANTS.STRING) {
                return 0;
            }
            if (font) {
                if (!(font instanceof Core.classes.Font)) {
                    return 0;
                }
            }
            const d = document.createElement("div");
            //$j.CSS.addClass(d,"basecss");
            //d.style.position="absolute";
            if (font) font.toCss(d);
            d.innerHTML = text;
            document.documentElement.appendChild(d);
            const h = d.offsetHeight - 1;
            document.documentElement.removeChild(d);
            return h;
        }
        static getCharWidth(font, char) {
            return Font.fontsInfos[font.family].sizes[font.size].chars[char.charCodeAt(0)];
        }
        //#endregion
        //#region constructor
        constructor(owner) {
            super(owner);
            const priv = internal(this);
            priv.underline = false;
            priv.strikeout = false;
            priv.size = 10;
            priv.sizeUnit = Types.CSSUNITS.PT;
            priv.family = "Tahoma";
            priv.style = Types.FONTSTYLES.NORMAL;
            priv.string = String.EMPTY;
            priv.height = 0;
            priv.owner = owner;
            priv.brush = new Core.classes.Brush(Types.BRUSHSTYLES.NONE, Colors.TRANSPARENT, owner);
            if (owner) {
                this.onChange = new Core.classes.NotifyEvent(owner);
                this.stringify();
            }
        }
        get underline() {
            return internal(this).underline;
        }
        set underline(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (newValue !== priv.underline) {
                    priv.underline = newValue;
                    if (Core.isHTMLRenderer) {
                        this.stringify();
                    }
                    this.onChange.invoke();
                }
            }
        }
        get strikeout() {
            return internal(this).strikeout;
        }
        set strikeout(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (newValue !== priv.strikeout) {
                    priv.strikeout = newValue;
                    if (Core.isHTMLRenderer) {
                        this.stringify();
                    }
                    this.onChange.invoke();
                }
            }
        }
        get size() {
            return internal(this).size;
        }
        set size(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue !== priv.size) {
                    priv.size = newValue;
                    if (Core.isHTMLRenderer) {
                        this.stringify();
                    }
                    this.onChange.invoke();
                }
            }
        }
        get sizeUnit() {
            return internal(this).sizeUnit;
        }
        set sizeUnit(newValue) {
            const priv = internal(this);
            if (Tools.valueInSet(newValue, Types.CSSUNITS) {
                if (newValue !== priv.sizeUnit) {
                    priv.sizeUnit = newValue;
                    this.onChange.invoke();
                }
            }
        }
        get family() {
            return internal(this).family;
        }
        set family(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (newValue !== priv.family) {
                    priv.family = newValue;
                    if (Core.isHTMLRenderer) {
                        this.stringify();
                    }
                    this.onChange.invoke();
                }
            }
        }
        get style() {
            return internal(this).style;
        }
        set style(newValue) {
            const priv = internal(this);
            if (Tools.valueInSet(newValue, Types.BRUSHSTYLES)) {
                if (newValue !== priv.style) {
                    priv.style = newValue;
                    if (Core.isHTMLRenderer) {
                        this.stringify();
                    }
                    this.onChange.invoke();
                    if (priv.owner.allowUpdate) {
                        priv.owner.form.addControlToRedraw(priv.owner);
                    }
                    //if(this.owner._allowUpdate){
                    //  this.owner.form.updateRects.push(this.owner.getClipParentRect());
                    //  this.owner.update();
                    //  this.owner.form.updateRects.push(this.owner.getClipParentRect());
                    //  //$j.canvas.needUpdate=true;
                    //}
                }
            }
        }
        get string() {
            return internal(this).string;
        }
        set string(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (priv.string !== newValue) {
                    priv.string = newValue;
                }
            }
        }
        get height() {
            return internal(this).height;
        }
        set height(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.height !== newValue) {
                    priv.height = newValue;
                }
            }
        }
        get owner() {
            return internal(this).owner;
        }
        get brush() {
            return internal(this).brush;
        }
        get isEmpty() {
            const priv = internal(this);
            return priv.underline === false &&
                priv.strikeout === false &&
                priv.size === 10 &&
                priv.family === "Tahoma" &&
                priv.style === Types.FONTSTYLES.NORMAL &&
                priv.brush.style === Types.BRUSHSTYLES.NONE &&
                priv.brush.color.equals(Colors.TRANSPARENT);
        }
        //#endregion
        //#region Methods
        stringify() {
            const FONTSTYLES = Types.FONTSTYLES;
            const style = this.style;
            let str = String.Empty;
            const size = tihs.size;
            const family = this.family;
            //this.string = String.EMPTY;
            if (style === FONTSTYLES.BOLD) {
                str += " bold";
            }
            if (style === FONTSTYLES.ITALIC) {
                str += " italic";
            }
            str += String.SPACE + size + this.sizeUnit + String.SPACE + family;
            str.trim();
            this.height = Font.getTextHeight("°_", this);
            if (!Font.fontsInfos[family]) {
                Font.fontsInfos[family] = {};
                Font.fontsInfos[family].sizes = {};
                if (!Font.fontsInfos[family].sizes[size]) {
                    Font.fontsInfos[family].sizes[size] = {};
                    Font.fontsInfos[family].sizes[size].chars = {};
                    if (!Font.fontsInfos[family].sizes[size].chars.A) this.generateChars();
                }
            }
            this.string = str;
        }
        toCss(object) {
            const FONTSTYLES = Types.FONTSTYLES;
            const _style = this.style;
            if (object instanceof HTMLElement) {
                const style = object.style;
                style.fontFamily = this.family;
                style.fontSize = `${this.size}${this.sizeUnit}`;
                style.fontWeight = String.EMPTY;
                style.fontStyle = String.EMPTY;
                style.textDecoration = String.EMPTY;
                if (_style === FONTSTYLES.BOLD) {
                    style.fontWeight = "bold";
                }
                if (_style === FONTSTYLES.ITALIC) {
                    style.fontStyle = "italic";
                }
                if (this.underline) {
                    style.textDecoration = "underline";
                }
                if (this.strikeout) {
                    if (style.textDecoration !== String.EMPTY) {
                        style.textDecoration += ",";
                    }
                    style.textDecoration += "line-through";
                }
            }
        }
        toCssString() {
            const style = this.style;
            let str = String.EMPTY;
            const FONTSTYLES = Types.FONTSTYLES;
            str += this.size + this.sizeUnit;
            str += String.SPACE + '"' + this._family + '"';
            if (style === FONTSTYLES.BOLD) {
                str += String.SPACE + "bold";
            }
            if (style === FONTSTYLES.ITALIC) {
                str += String.SPACE + "italic";
            }
            if (this.underline) {
                str += String.SPACE + "underline";
            }
            if (this.strikeout) {
                //if(object.style.textDecoration!==String.EMPTY) str+=",";
                str += String.SPACE + "line-through";
            }
            str += ";";
            return str;
        }
        fromString(str) {
            const FONTSTYLES = Types.FONTSTYLES;
            const CSSUNITS = Types.CSSUNITS;
            if (typeof str === Types.CONSTANTS.STRING) {
                str = str.toLowerCase();
                this.size = 0;
                this.family = String.EMPTY;
                this.style = FONTSTYLES.NORMAL;
                this.underline = false;
                this.strikeout = false;
                str = str.split(String.SPACE);
                str.forEach(s => {
                    if (!isNaN(~~parseFloat(s))) {
                        if (s.endsWith(CSSUNITS.PO)) {
                            this.sizeUnit = CSSUNITS.PO;
                        } else if (s.endsWith(CSSUnits.REM)) {
                            this.sizeUnit = CSSUnits.REM;
                        } else {
                            this.sizeUnit = str[i].substr(str[i].length - 2, 2).toLowerCase();
                        }
                        this.size = ~~parseFloat(str[i]);
                    }
                    else if (s.includes("bold")) {
                        Tools.include(this, "style", FONTSTYLES.BOLD);
                    } else if (s.includes("italic")) {
                        Tools.include(this, "style", FONTSTYLES.ITALIC);
                    } else {
                        this.family = str[i].replace(/"/g, String.EMPTY);
                    }
                });
                if (!Core.isHTMLRenderer) {
                    this.stringify();
                }
            }
        }
        assign(source) {
            if (source instanceof Core.classes.Font) {
                this.family = source.family;
                this.size = source.size;
                this.strikeout = source.strikeout;
                this.style = source.style;
                this.underline = source.underline;
                this.sizeUnit = source.sizeUnit;
                this.onChange.invoke();
                this.brush.assign(source.brush);
                //this._stringify();
                this.string = source.string;
            }
        }
        equals(font) {
            return font.size === this.size &&
                font.family === this.family &&
                font.style === this.style &&
                font.underline === this.underline &&
                font.strikeout === this.strikeout &&
                font.sizeUnit === this.sizeUnit;
        }
        reset() {
            this.underline = this.strikeout = false;
            this.size = 10;
            this.sizeUnit = Types.CSSUNITS.PT;
            this.family = "Tahoma";
            this.style = Types.FONTSTYLES.NORMAL;
            this.height = 0;
            this.brush.clear();
            this.stringify();
        }
        generateChars() {
            const canvas = Canvas.newCanvas();
            const ctx = canvas.getContext("2d");
            const family = this.family;
            const size = this.size;
            ctx.font = this._string;
            Font.fontsInfos[family].sizes[size].chars[String.SPACE] = ctx.measureText(String.SPACE).width;
            //Tools.font.fontsInfos[this._family].sizes[this._size].chars["\t"]=ctx.measureText("\t").width;
            for (let i = 32; i < 255; i++) {
                Font.fontsInfos[family].sizes[size].chars[i] = ctx.measureText(String.fromCharCode(i)).width;
            }
        }
        destroy() {
            this.onChange.destroy();
            this.brush.destroy();
        }
        //#endregion
    }
    return Font;
})();
Object.defineProperties(Font, {
    "underline": {
        enumerable: true
    },
    "strikeout": {
        enumerable: true
    },
    "size": {
        enumerable: true
    },
    "sizeUnit": {
        enumerable: true
    },
    "family": {
        enumerable: true
    },
    "style": {
        enumerable: true
    },
    "brush": {
        enumerable: true
    }
});
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, Font);
export { Font };