//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import * as Canvas from '/scripts/core/canvas.js';
//#endregion Imports
//#region Font
// TODO : support of databinding
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
        core.private(this, {
            underline: !1,
            strikeout: !1,
            size: 10,
            sizeUnit: core.types.CSSUNITS.PT,
            family: 'Tahoma',
            style: core.types.FONTSTYLES.NORMAL,
            string: String.EMPTY,
            height: 0,
            owner,
            brush: new core.classes.Brush(core.types.BRUSHSTYLES.NONE, Colors.TRANSPARENT, owner)
        });
        if (owner) {
            this.onChange = new core.classes.NotifyEvent(owner);
            this.stringify();
        }
    }
    //#endregion
    //#region Getter / Setter
    //#region underline
    get underline() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set underline(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && newValue !== priv[propName]) {
            core.private(this, { [propName]: newValue });
            core.isHTMLRenderer && this.stringify();
            this.onChange.invoke();
        }
    }
    //#endregion underline
    //#region strikeout
    get strikeout() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set strikeout(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && newValue !== priv[propName]) {
            core.private(this, { [propName]: newValue });
            core.isHTMLRenderer && this.stringify();
        }
    }
    //#endregion strikeout
    //#region size
    get size() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set size(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && newValue !== priv[propName]) {
            core.private(this, { [propName]: newValue });
            core.isHTMLRenderer && this.stringify();
            this.onChange.invoke();
        }
    }
    //#endregion size
    //#region sizeUnit
    get sizeUnit() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set sizeUnit(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, core.types.CSSUNITS) && newValue !== priv[propName]) {
            core.private(this, { [propName]: newValue });
            this.onChange.invoke();
        }
    }
    //#endregion sizeUnit
    //#region family
    get family() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set family(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && newValue !== priv[propName]) {
            core.private(this, { [propName]: newValue });
            core.isHTMLRenderer && this.stringify();
            this.onChange.invoke();
        }
    }
    //#endregion family
    //#region style
    get style() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set style(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, core.types.BRUSHSTYLES) && newValue !== priv[propName]) {
            core.private(this, { [propName]: newValue });
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
        return core.private(this)[core.tools.getPropertyName()];
    }
    set string(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        core.tools.isString(newValue) && priv[propName] !== newValue
            && core.private(this, { [propName]: newValue });
    }
    //#endregion string
    //#region height
    get height() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set height(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && priv[propName] !== newValue
            && core.private(this, { [propName]: newValue });
    }
    //#endregion height
    //#region owner
    get owner() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    //#endregion owner
    //#region brush
    get brush() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    //#endregion brush
    //#region isEmpty
    get isEmpty() {
        //#region Variables déclaration
        const priv = core.private(this);
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
        const priv = core.private(this);
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
        core.private(this, { string: str });
    }
    //#endregion stringify
    //#region toCss
    toCss(object) {
        //#region Variables déclaration
        const FONTSTYLES = core.types.FONTSTYLES;
        const _style = this.style;
        const priv = core.private(this);
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
        const priv = core.private(this);
        //#endregion Variables déclaration
        str += `${priv.size}${priv.sizeUnit}`;
        str += ` "${priv.family}"`;
        style === FONTSTYLES.BOLD && (str += ' bold');
        style === FONTSTYLES.ITALIC && (str += ' italic');
        priv.underline && (str += ' underline');
        priv.strikeout && (str += ' line-through');
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
                    core.private(this, { family: s.replace(/"/g, String.EMPTY) });
                }
            });
            !core.isHTMLRenderer && this.stringify();
        }
    }
    //#endregion fromString
    //#region assign
    assign(source) {
        if (source instanceof core.classes.Font) {
            const priv = core.private(this, {
                family: source.family,
                size: source.size,
                strikeout: source.strikeout,
                style: source.style,
                underline: source.underline,
                sizeUnit: source.sizeUnit,
                string: source.string
            });
            priv.brush.assign(source.brush);
            this.onChange.invoke();
        }
    }
    //#endregion assign
    //#region equals
    equals(font) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.private(this, {
            underline: !1,
            strikeout: !1,
            size: 10,
            sizeUnit: core.types.CSSUNITS.PT,
            family: 'Tahoma',
            style: core.types.FONTSTYLES.NORMAL,
            height: 0
        });
        priv.brush.clear();
        this.stringify();
    }
    //#endregion reset
    //#region generateChars
    generateChars() {
        //#region Variables déclaration
        const priv = core.private(this);
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
        const priv = core.private(this);
        //#endregion Variables déclaration
        this.onChange.destroy();
        this.onChange = null;
        delete this.onChange;
        priv.brush.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion
}
core.classes.register(core.types.CATEGORIES.INTERNAL, Font);
//#endregion Font
export { Font };