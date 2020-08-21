//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import * as Canvas from '/scripts/core/canvas.js';
//#endregion Imports
//#region Font
// TODO : support of databinding
//#region Font
class Font extends BaseClass {
    //#region Private fields
    #underline = !1;
    #strikeout = !1;
    #size = 10;
    #sizeUnit = core.types.CSSUNITS.PT;
    #family = 'Tahoma';
    #style = core.types.FONTSTYLES.NORMAL;
    #string = String.EMPTY;
    #height = 0;
    #owner;
    #brush;
    //#endregion Private fields
    //#region constructor
    constructor(owner) {
        super(owner);
        this.#owner = owner;
        this.#brush = new core.classes.Brush(core.types.BRUSHSTYLES.NONE, Colors.TRANSPARENT, owner);
        if (owner) {
            this.onChange = new core.classes.NotifyEvent(owner);
            this.stringify();
        }
    }
    //#endregion
    //#region Getters / Setters
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
    //#region underline
    get underline() {
        return this.#underline;
    }
    set underline(newValue) {
        if (core.tools.isBool(newValue) && newValue !== this.#underline) {
            this.#underline = newValue;
            core.isHTMLRenderer && this.stringify();
            this.onChange.invoke();
        }
    }
    //#endregion underline
    //#region strikeout
    get strikeout() {
        return this.#strikeout;
    }
    set strikeout(newValue) {
        if (core.tools.isBool(newValue) && newValue !== this.#strikeout) {
            this.#strikeout = newValue;
            core.isHTMLRenderer && this.stringify();
        }
    }
    //#endregion strikeout
    //#region size
    get size() {
        return this.#size;
    }
    set size(newValue) {
        if (core.tools.isNumber(newValue) && newValue !== this.#size) {
            this.#size = newValue;
            core.isHTMLRenderer && this.stringify();
            this.onChange.invoke();
        }
    }
    //#endregion size
    //#region sizeUnit
    get sizeUnit() {
        return this.#sizeUnit;
    }
    set sizeUnit(newValue) {
        if (core.tools.valueInSet(newValue, core.types.CSSUNITS) && newValue !== this.#sizeUnit) {
            this.#sizeUnit = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion sizeUnit
    //#region family
    get family() {
        return this.#family;
    }
    set family(newValue) {
        if (core.tools.isString(newValue) && newValue !== this.#family) {
            this.#family = newValue;
            core.isHTMLRenderer && this.stringify();
            this.onChange.invoke();
        }
    }
    //#endregion family
    //#region style
    get style() {
        return this.#style;
    }
    set style(newValue) {
        if (core.tools.valueInSet(newValue, core.types.BRUSHSTYLES) && newValue !== this.#style) {
            this.#style = newValue;
            core.isHTMLRenderer && this.stringify();
            this.onChange.invoke();
            if (this.#owner.allowUpdate) {
                this.#owner.form.addControlToRedraw(this.#owner);
            }
        }
    }
    //#endregion style
    //#region string
    get string() {
        return this.#string;
    }
    set string(newValue) {
        core.tools.isString(newValue) && this.#string !== newValue
            && (this.#string = newValue);
    }
    //#endregion string
    //#region height
    get height() {
        return this.#height;
    }
    set height(newValue) {
        core.tools.isNumber(newValue) && this.#height !== newValue
            && (this.#height = newValue);
    }
    //#endregion height
    //#region owner
    get owner() {
        return this.#owner;
    }
    //#endregion owner
    //#region brush
    get brush() {
        return this.#brush;
    }
    //#endregion brush
    //#region isEmpty
    get isEmpty() {
        return this.#underline === !1 &&
            this.#strikeout === !1 &&
            this.#size === 10 &&
            this.#family === 'Tahoma' &&
            this.#style === core.types.FONTSTYLES.NORMAL &&
            this.#brush.style === core.types.BRUSHSTYLES.NONE &&
            this.#brush.color.equals(Colors.TRANSPARENT);
    }
    //#endregion isEmpty
    //#endregion Getters / Setters
    //#region Methods
    //#region stringify
    stringify() {
        //#region Variables déclaration
        const FONTSTYLES = core.types.FONTSTYLES;
        const style = this.style;
        let str = String.Empty;
        const size = tihs.size;
        const family = this.family;
        //#endregion Variables déclaration
        style === FONTSTYLES.BOLD && (str += ' bold');
        style === FONTSTYLES.ITALIC && (str += ' italic');
        str += String.SPACE + size + this.#sizeUnit + String.SPACE + family;
        str.trim();
        this.#height = Font.getTextHeight('°_', this);
        if (!Font.fontsInfos[family]) {
            Font.fontsInfos[family] = {};
            Font.fontsInfos[family].sizes = {};
            if (!Font.fontsInfos[family].sizes[size]) {
                Font.fontsInfos[family].sizes[size] = {};
                Font.fontsInfos[family].sizes[size].chars = {};
                !Font.fontsInfos[family].sizes[size].chars.A && this.generateChars();
            }
        }
        this.#string = str;
    }
    //#endregion stringify
    //#region toCss
    toCss(object) {
        //#region Variables déclaration
        const FONTSTYLES = core.types.FONTSTYLES;
        const _style = this.style;
        //#endregion Variables déclaration
        if (object instanceof HTMLElement) {
            const style = object.style;
            style.fontFamily = this.#family;
            style.fontSize = `${this.#size}${this.#sizeUnit}`;
            style.fontWeight = String.EMPTY;
            style.fontStyle = String.EMPTY;
            style.textDecoration = String.EMPTY;
            _style === FONTSTYLES.BOLD && (style.fontWeight = 'bold');
            _style === FONTSTYLES.ITALIC && (style.fontStyle = 'italic');
            this.#underline && (style.textDecoration = 'underline');
            if (this.#strikeout) {
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
        //#endregion Variables déclaration
        str += `${this.#size}${this.#sizeUnit}`;
        str += ` "${this.#family}"`;
        style === FONTSTYLES.BOLD && (str += ' bold');
        style === FONTSTYLES.ITALIC && (str += ' italic');
        this.#underline && (str += ' underline');
        this.#strikeout && (str += ' line-through');
        str += ';';
        return str;
    }
    //#endregion toCssString
    //#region fromString
    fromString(str) {
        //#region Variables déclaration
        const FONTSTYLES = core.types.FONTSTYLES;
        const CSSUNITS = core.types.CSSUNITS;
        let sizeUnit;
        //#endregion Variables déclaration
        if (core.tools.isString(str)) {
            str = str.toLowerCase();
            core.private(this, {
                size: 0,
                family: String.EMPTY,
                style: FONTSTYLES.NORMAL,
                underline: !1,
                strikeout: !1
            });
            str = str.split(String.SPACE);
            str.forEach(s => {
                if (!isNaN(int(s))) {
                    if (s.endsWith(CSSUNITS.PO)) {
                        sizeUnit = CSSUNITS.PO;
                    } else if (s.endsWith(CSSUnits.REM)) {
                        sizeUnit = CSSUnits.REM;
                    } else {
                        sizeUnit = s.substr(s.length - 2, 2).toLowerCase();
                    }
                    core.private(this, {
                        size: int(s),
                        sizeUnit
                    });
                }
                else if (s.includes('bold')) {
                    core.tools.include(this, 'style', FONTSTYLES.BOLD);
                } else if (s.includes('italic')) {
                    core.tools.include(this, 'style', FONTSTYLES.ITALIC);
                } else {
                    this.#family = s.replace(/"/g, String.EMPTY);
                }
            });
            !core.isHTMLRenderer && this.stringify();
        }
    }
    //#endregion fromString
    //#region assign
    assign(source) {
        if (source instanceof core.classes.Font) {
            this.#family = source.family;
            this.#size = source.size;
            this.#strikeout = source.strikeout;
            this.#style = source.style;
            this.#underline = source.underline;
            this.#sizeUnit = source.sizeUnit;
            this.#string = source.string;
            this.#brush.assign(source.brush);
            this.onChange.invoke();
        }
    }
    //#endregion assign
    //#region equals
    equals(font) {
        return font.size === this.#size &&
            font.family === this.#family &&
            font.style === this.#style &&
            font.underline === this.#underline &&
            font.strikeout === this.#strikeout &&
            font.sizeUnit === this.#sizeUnit;
    }
    //#endregion equals
    //#region reset
    reset() {
        this.#underline = !1;
        this.#strikeout = !1;
        this.#size = 10;
        this.#sizeUnit = core.types.CSSUNITS.PT;
        this.#family = 'Tahoma';
        this.#style = core.types.FONTSTYLES.NORMAL;
        this.#height = 0;
        this.#brush.clear();
        this.stringify();
    }
    //#endregion reset
    //#region generateChars
    generateChars() {
        //#region Variables déclaration
        const canvas = Canvas.newCanvas();
        const ctx = canvas.getContext('2d');
        const family = this.#family;
        const size = this.#size;
        //#endregion Variables déclaration
        ctx.font = this.#string;
        Font.fontsInfos[family].sizes[size].chars[String.SPACE] = ctx.measureText(String.SPACE).width;
        for (let i = 32; i < 255; i++) {
            Font.fontsInfos[family].sizes[size].chars[i] = ctx.measureText(String.fromCharCode(i)).width;
        }
    }
    //#endregion generateChars
    //#region destroy
    destroy() {
        this.onChange.destroy();
        this.onChange = null;
        delete this.onChange;
        this.#brush.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(Font.prototype, {
    'underline': {
        enumerable: !0
    },
    'strikeout': {
        enumerable: !0
    },
    'size': {
        enumerable: !0
    },
    'sizeUnit': {
        enumerable: !0
    },
    'family': {
        enumerable: !0
    },
    'style': {
        enumerable: !0
    },
    'brush': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.INTERNAL, Font);
//#endregion Font
export { Font };