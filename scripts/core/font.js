//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import * as Canvas from '/scripts/core/canvas.js';
//#endregion Imports
//#region Font
// TODO : support of databinding
const Font = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Font
    class Font extends BaseClass {
        //#region statics
        //#region getTextHeight
        static getTextHeight(text, font) {
            if (core.tools.isString(text)) {
                if (font && !(font instanceof core.classes.Font)) {
                    return 0;
                }
                const d = document.createElement('div');
                font && font.toCss(d);
                d.innerHTML = text;
                document.documentElement.appendChild(d);
                const h = d.offsetHeight - 1;
                document.documentElement.removeChild(d);
                return h;
            }
            return 0;
        }
        //#endregion getTextHeight
        //#region getCharWidth
        static getCharWidth(font, char) {
            return Font.fontsInfos[font.family].sizes[font.size].chars[char.charCodeAt(0)];
        }
        //#endregion getCharWidth
        //#endregion
        //#region constructor
        constructor(owner) {
            super(owner);
            const priv = internal(this);
            priv.underline = !1;
            priv.strikeout = !1;
            priv.size = 10;
            priv.sizeUnit = core.types.CSSUNITS.PT;
            priv.family = 'Tahoma';
            priv.style = core.types.FONTSTYLES.NORMAL;
            priv.string = String.EMPTY;
            priv.height = 0;
            priv.owner = owner;
            priv.brush = new core.classes.Brush(core.types.BRUSHSTYLES.NONE, Colors.TRANSPARENT, owner);
            if (owner) {
                this.onChange = new core.classes.NotifyEvent(owner);
                this.stringify();
            }
        }
        //#endregion
        //#region Getter / Setter
        //#region underline
        get underline() {
            return internal(this).underline;
        }
        set underline(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isBool(newValue) && newValue !== priv.underline) {
                priv.underline = newValue;
                core.isHTMLRenderer && this.stringify();
                this.onChange.invoke();
            }
        }
        //#endregion underline
        //#region strikeout
        get strikeout() {
            return internal(this).strikeout;
        }
        set strikeout(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isBool(newValue) && newValue !== priv.strikeout) {
                priv.strikeout = newValue;
                core.isHTMLRenderer && this.stringify();
            }
        }
        //#endregion strikeout
        //#region size
        get size() {
            return internal(this).size;
        }
        set size(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && newValue !== priv.size) {
                priv.size = newValue;
                core.isHTMLRenderer && this.stringify();
                this.onChange.invoke();
            }
        }
        //#endregion size
        //#region sizeUnit
        get sizeUnit() {
            return internal(this).sizeUnit;
        }
        set sizeUnit(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.valueInSet(newValue, core.types.CSSUNITS) && newValue !== priv.sizeUnit) {
                priv.sizeUnit = newValue;
                this.onChange.invoke();
            }
        }
        //#endregion sizeUnit
        //#region family
        get family() {
            return internal(this).family;
        }
        set family(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isString(newValue) && newValue !== priv.family) {
                priv.family = newValue;
                core.isHTMLRenderer && this.stringify();
                this.onChange.invoke();
            }
        }
        //#endregion family
        //#region style
        get style() {
            return internal(this).style;
        }
        set style(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.valueInSet(newValue, core.types.BRUSHSTYLES) && newValue !== priv.style) {
                priv.style = newValue;
                core.isHTMLRenderer && this.stringify();
                this.onChange.invoke();
                if (priv.owner.allowUpdate) {
                    priv.owner.form.addControlToRedraw(priv.owner);
                }
            }
        }
        //#endregion style
        //#region string
        get string() {
            return internal(this).string;
        }
        set string(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isString(newValue) && priv.string !== newValue
                && (priv.string = newValue);
        }
        //#endregion string
        //#region height
        get height() {
            return internal(this).height;
        }
        set height(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isNumber(newValue) && priv.height !== newValue
                && (priv.height = newValue);
        }
        //#endregion height
        //#region owner
        get owner() {
            return internal(this).owner;
        }
        //#endregion owner
        //#region brush
        get brush() {
            return internal(this).brush;
        }
        //#endregion brush
        //#region isEmpty
        get isEmpty() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return priv.underline === !1 &&
                priv.strikeout === !1 &&
                priv.size === 10 &&
                priv.family === 'Tahoma' &&
                priv.style === core.types.FONTSTYLES.NORMAL &&
                priv.brush.style === core.types.BRUSHSTYLES.NONE &&
                priv.brush.color.equals(Colors.TRANSPARENT);
        }
        //#endregion isEmpty
        //#endregion
        //#region Methods
        //#region stringify
        stringify() {
            //#region Variables déclaration
            const priv = internal(this);
            const FONTSTYLES = core.types.FONTSTYLES;
            const style = this.style;
            let str = String.Empty;
            const size = tihs.size;
            const family = this.family;
            //#endregion Variables déclaration
            style === FONTSTYLES.BOLD && (str += ' bold');
            style === FONTSTYLES.ITALIC && (str += ' italic');
            str += String.SPACE + size + priv.sizeUnit + String.SPACE + family;
            str.trim();
            priv.height = Font.getTextHeight('°_', this);
            if (!Font.fontsInfos[family]) {
                Font.fontsInfos[family] = {};
                Font.fontsInfos[family].sizes = {};
                if (!Font.fontsInfos[family].sizes[size]) {
                    Font.fontsInfos[family].sizes[size] = {};
                    Font.fontsInfos[family].sizes[size].chars = {};
                    !Font.fontsInfos[family].sizes[size].chars.A && this.generateChars();
                }
            }
            priv.string = str;
        }
        //#endregion stringify
        //#region toCss
        toCss(object) {
            //#region Variables déclaration
            const FONTSTYLES = core.types.FONTSTYLES;
            const _style = this.style;
            const priv = internal(this);
            //#endregion Variables déclaration
            if (object instanceof HTMLElement) {
                const style = object.style;
                style.fontFamily = priv.family;
                style.fontSize = `${priv.size}${priv.sizeUnit}`;
                style.fontWeight = String.EMPTY;
                style.fontStyle = String.EMPTY;
                style.textDecoration = String.EMPTY;
                _style === FONTSTYLES.BOLD && (style.fontWeight = 'bold');
                _style === FONTSTYLES.ITALIC && (style.fontStyle = 'italic');
                priv.underline && (style.textDecoration = 'underline');
                if (priv.strikeout) {
                    !String.isNullOrEmpty(style.textDecoration) && (style.textDecoration += ',');
                    style.textDecoration += 'line-through';
                }
            }
        }
        //#endregion toCss
        //#region toCssString
        toCssString() {
            //#region Variables déclaration
            const style = this.style;
            let str = String.EMPTY;
            const FONTSTYLES = core.types.FONTSTYLES;
            const priv = internal(this);
            //#endregion Variables déclaration
            str += priv.size + priv.sizeUnit;
            str += String.SPACE + '"' + priv._family + '"';
            style === FONTSTYLES.BOLD && (str += String.SPACE + 'bold');
            style === FONTSTYLES.ITALIC && (str += String.SPACE + 'italic');
            priv.underline && (str += String.SPACE + 'underline');
            priv.strikeout && (str += String.SPACE + 'line-through');
            str += ';';
            return str;
        }
        //#endregion toCssString
        //#region fromString
        fromString(str) {
            //#region Variables déclaration
            const FONTSTYLES = core.types.FONTSTYLES;
            const CSSUNITS = core.types.CSSUNITS;
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isString(str)) {
                str = str.toLowerCase();
                priv.size = 0;
                priv.family = String.EMPTY;
                priv.style = FONTSTYLES.NORMAL;
                priv.underline = !1;
                priv.strikeout = !1;
                str = str.split(String.SPACE);
                str.forEach(s => {
                    if (!isNaN(int(s))) {
                        if (s.endsWith(CSSUNITS.PO)) {
                            priv.sizeUnit = CSSUNITS.PO;
                        } else if (s.endsWith(CSSUnits.REM)) {
                            priv.sizeUnit = CSSUnits.REM;
                        } else {
                            priv.sizeUnit = s.substr(s.length - 2, 2).toLowerCase();
                        }
                        priv.size = int(s);
                    }
                    else if (s.includes('bold')) {
                        core.tools.include(this, 'style', FONTSTYLES.BOLD);
                    } else if (s.includes('italic')) {
                        core.tools.include(this, 'style', FONTSTYLES.ITALIC);
                    } else {
                        priv.family = s.replace(/"/g, String.EMPTY);
                    }
                });
                !core.isHTMLRenderer && this.stringify();
            }
        }
        //#endregion fromString
        //#region assign
        assign(source) {
            if (source instanceof core.classes.Font) {
                priv.family = source.family;
                priv.size = source.size;
                priv.strikeout = source.strikeout;
                priv.style = source.style;
                priv.underline = source.underline;
                priv.sizeUnit = source.sizeUnit;
                this.onChange.invoke();
                priv.brush.assign(source.brush);
                priv.string = source.string;
            }
        }
        //#endregion assign
        //#region equals
        equals(font) {
            return font.size === priv.size &&
                font.family === priv.family &&
                font.style === priv.style &&
                font.underline === priv.underline &&
                font.strikeout === priv.strikeout &&
                font.sizeUnit === priv.sizeUnit;
        }
        //#endregion equals
        //#region reset
        reset() {
            priv.underline = priv.strikeout = !1;
            priv.size = 10;
            priv.sizeUnit = core.types.CSSUNITS.PT;
            priv.family = 'Tahoma';
            priv.style = core.types.FONTSTYLES.NORMAL;
            priv.height = 0;
            priv.brush.clear();
            this.stringify();
        }
        //#endregion reset
        //#region generateChars
        generateChars() {
            //#region Variables déclaration
            const canvas = Canvas.newCanvas();
            const ctx = canvas.getContext('2d');
            const family = priv.family;
            const size = priv.size;
            //#endregion Variables déclaration
            ctx.font = priv.string;
            Font.fontsInfos[family].sizes[size].chars[String.SPACE] = ctx.measureText(String.SPACE).width;
            for (let i = 32; i < 255; i++) {
                Font.fontsInfos[family].sizes[size].chars[i] = ctx.measureText(String.fromCharCode(i)).width;
            }
        }
        //#endregion generateChars
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.onChange.destroy();
            this.onChange = null;
            delete this.onChange;
            priv.brush.destroy();
            priv.underline = null;
            priv.strikeout = null;
            priv.size = null;
            priv.sizeUnit = null;
            priv.family = null;
            priv.style = null;
            priv.string = null;
            priv.height = null;
            priv.owner = null;
            priv.brush = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion
    }
    return Font;
    //#endregion Font
})();
core.classes.register(core.types.CATEGORIES.INTERNAL, Font);
//#endregion Font
export { Font };