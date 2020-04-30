//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Text } from '/scripts/core/text.js';
import { Colors, Color } from '/scripts/core/color.js';
import { TextDecoration } from '/scripts/core/textdecoration.js';
import { TextShadows } from '/scripts/core/textshadows.js';
//#endregion Import
//#region CaptionControl
const CaptionControl = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) ? _private.set(key, {}) : 1;
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region CaptionControl
    class CaptionControl extends ThemedControl {
        //#region Constructor
        constructor(owner, props) {
            //#region Variables déclaration
            const VERTTEXTALIGNS = core.types.VERTTEXTALIGNS;
            let themeName = null;
            let theme = null;
            let captionControlTheme = null;
            let params;
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                props.autoTranslate = !0;
                super(owner, props);
                //#region Properties
                //#region Private Properties
                const priv = internal(this);
                if (!core.isHTMLRenderer) {
                    themeName = this.app.themeName;
                    theme = core.themes[themeName];
                    captionControlTheme = theme[this.constructor.name] ? theme[this.constructor.name] : {};
                } else {
                    theme = {};
                    captionControlTheme = {};
                    priv.caption = props.hasOwnProperty('caption') ? props.caption : this.constructor.name;
                }
                //#region wordWrap
                if (captionControlTheme.hasOwnProperty('wordWrap')) {
                    priv.wordWrap = captionControlTheme.wordWrap;
                } else if (props.hasOwnProperty('wordWrap')) {
                    priv.wordWrap = props.wordWrap;
                } else {
                    priv.wordWrap = !1;
                }
                //#endregion wordWrap
                //#region horizAlign
                if (props.hasOwnProperty('horizAlign')) {
                    priv.horizAlign = props.horizAlign;
                } else if (captionControlTheme.hasOwnProperty('horizAlign')) {
                    priv.horizAlign = captionControlTheme.horizAlign;
                } else if (props.hasOwnProperty('horizAlign')) {
                    priv.horizAlign = props.horizAlign;
                } else {
                    priv.horizAlign = core.types.TEXTALIGNS.LEFT;
                }
                //#endregion horizAlign
                //#region color
                if (Color.parse(captionControlTheme.hasOwnProperty('color'))) {
                    priv.color = captionControlTheme.color;
                } else if (theme.DEFAULTTEXTCOLOR) {
                    priv.color = theme.DEFAULTTEXTCOLOR;
                } else if (props.hasOwnProperty('color')) {
                    if (core.tools.isString(props.color)) {
                        priv.color = Color.parse(props.color);
                    }
                }
                //#endregion color
                //#region fontFamily
                if (props.hasOwnProperty('fontFamily')) {
                    priv.fontFamily = props.fontFamily;
                } else if (captionControlTheme.hasOwnProperty('fontFamily')) {
                    priv.fontFamily = captionControlTheme.fontFamily;
                } else if (props.hasOwnProperty('fontFamily')) {
                    priv.fontFamily = props.fontFamily;
                }
                //#endregion fontFamily
                //#region fontSize
                if (props.hasOwnProperty('fontSize')) {
                    priv.fontSize = props.fontSize;
                } else if (captionControlTheme.hasOwnProperty('fontSize')) {
                    priv.fontSize = captionControlTheme.fontSize;
                } else if (props.hasOwnProperty('fontSize')) {
                    priv.fontSize = props.fontSize;
                } else {
                    priv.fontSize = 8;
                }
                //#endregion fontSize
                //#region fontSizeUnit
                if (props.hasOwnProperty('fontSizeUnit')) {
                    priv.fontSizeUnit = props.fontSizeUnit;
                } else {
                    priv.fontSizeUnit = core.types.CSSUNITS.PT;
                }
                //#endregion fontSizeUnit
                //#region fontBold
                if (props.hasOwnProperty('fontBold') && core.tools.isBool(props.fontBold)) {
                    priv.fontBold = props.fontBold;
                } else if (captionControlTheme.hasOwnProperty('fontBold')) {
                    priv.fontBold = captionControlTheme.fontBold;
                } else if (props.hasOwnProperty('fontBold')) {
                    priv.fontBold = props.fontBold;
                }
                //#endregion fontBold
                //#region fontStyle
                if (props.hasOwnProperty('fontStyle')) {
                    priv.fontStyle = props.fontStyle;
                } else if (captionControlTheme.hasOwnProperty('fontStyle')) {
                    priv.fontStyle = captionControlTheme.fontStyle;
                } else if (props.hasOwnProperty('fontStyle')) {
                    priv.fontStyle = props.fontStyle;
                } else {
                    priv.fontStyle = core.types.FONTSTYLES.NORMAL;
                }
                //#endregion fontStyle
                //#region textDecoration
                if (props.hasOwnProperty('textDecoration')) {
                    params = props.textDecoration;
                } else if (captionControlTheme.hasOwnProperty('textDecoration')) {
                    params = captionControlTheme.textDecoration;
                } else if (props.hasOwnProperty('textDecoration')) {
                    params = props.textDecoration;
                }
                priv.textDecoration = new TextDecoration(this, params);
                //#endregion textDecoration
                //#region textShadow
                if (props.hasOwnProperty('textShadow')) {
                    params = props.textShadow;
                } else if (captionControlTheme.hasOwnProperty('textShadow')) {
                    params = captionControlTheme.textShadow;
                } else if (props.hasOwnProperty('textShadow')) {
                    params = props.textShadow;
                }
                priv.textShadows = new TextShadows(this, params);
                //#endregion textShadow
                //#region textTransform
                if (props.hasOwnProperty('textTransform')) {
                    priv.textTransform = props.textTransform;
                } else if (captionControlTheme.hasOwnProperty('textTransform')) {
                    priv.textTransform = captionControlTheme.textTransform;
                } else if (props.hasOwnProperty('textTransform')) {
                    priv.textTransform = props.textTransform;
                } else {
                    priv.textTransform = core.types.TEXTTRANSFORMS.NONE;
                }
                //#endregion textTransform
                //#region vertAlign
                if (props.hasOwnProperty('vertAlign')) {
                    priv.vertAlign = props.vertAlign;
                } else if (captionControlTheme.hasOwnProperty('vertAlign')) {
                    priv.vertAlign = captionControlTheme.vertAlign;
                } else if (props.hasOwnProperty('vertAlign')) {
                    priv.vertAlign = props.vertAlign;
                } else {
                    priv.vertAlign = VERTTEXTALIGNS.TOP;
                }
                //#endregion vertAlign
                //#region backColor
                if (captionControlTheme.hasOwnProperty('backColor')) {
                    priv.backColor = Color.parse(captionControlTheme.backColor);
                } else if (props.hasOwnProperty('backColor')) {
                    if (core.tools.isString(props.backColor)) {
                        priv.backColor = Color.parse(props.backColor);
                    } else if (props.backColor instanceof Color) {
                        priv.backColor = props.backColor;
                    }
                } else {
                    priv.backColor = Colors.TRANSPARENT;//.toRGBAString();
                }
                //#endregion backColor
                //#region autoSize
                if (props.hasOwnProperty('autoSize')) {
                    priv.autoSize = props.autoSize;
                } else if (captionControlTheme.hasOwnProperty('autoSize')) {
                    priv.autoSize = captionControlTheme.autoSize;
                } else if (props.hasOwnProperty('autoSize')) {
                    priv.autoSize = props.autoSize;
                } else {
                    priv.autoSize = !0;
                }
                //#endregion autoSize
                //#region textOverflow
                if (props.hasOwnProperty('textOverflow')) {
                    priv.textOverflow = props.textOverflow;
                } else if (captionControlTheme.hasOwnProperty('textOverflow')) {
                    priv.textOverflow = captionControlTheme.textOverflow;
                } else if (props.hasOwnProperty('textOverflow')) {
                    priv.textOverflow = props.textOverflow;
                } else {
                    priv.textOverflow = core.types.TEXTOVERFLOWS.CLIP;
                }
                //#endregion textOverflow
                //#endregion Properties
                //#endregion Private Properties
            }
        }
        //#endregion Constructor
        //#region Getters / Setters
        //#region caption
        get caption() {
            return internal(this).caption;
        }
        set caption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isString(newValue) && priv.caption !== newValue) {
                priv.caption = Text.replace(newValue, core.types.CONSTANTS.HOTKEYPREFIX, String.EMPTY);
                this.propertyChanged(core.tools.getPropertyName());
                this.update();
            }
        }
        //#endregion caption
        //#region wordWrap
        get wordWrap() {
            return internal(this).wordWrap;
        }
        set wordWrap(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            //#endregion Variables déclaration
            if (core.tools.isBool(newValue) && priv.wordWrap !== newValue) {
                priv.wordWrap = newValue;
                this.propertyChanged(core.tools.getPropertyName());
                !this.loading && !form.loading && !core.isHTMLRenderer && this.allowUpdate
                    ? this.update() : 1;
            }
        }
        //#endregion wordWrap
        //#region horizAlign
        get horizAlign() {
            return internal(this).horizAlign;
        }
        set horizAlign(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            //#endregion Variables déclaration
            if (core.tools.valueInSet(newValue, core.types.TEXTALIGNS) && newValue !== priv.horizAlign) {
                priv.horizAlign = newValue;
                this.propertyChanged(core.tools.getPropertyName());
                !this.loading && !form.loading && !core.isHTMLRenderer && this.allowUpdate
                    ? this.update() : 1;
            }
        }
        //#endregion horizAlign
        //#region vertAlign
        get vertAlign() {
            return internal(this).vertAlign;
        }
        set vertAlign(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            //#endregion Variables déclaration
            if (core.tools.valueInSet(newValue, core.types.VERTTEXTALIGNS) && newValue !== priv.vertAlign) {
                priv.vertAlign = newValue;
                this.propertyChanged(core.tools.getPropertyName());
                !this.loading && !form.loading && !core.isHTMLRenderer && this.allowUpdate
                    ? this.update() : 1;
            }
        }
        //#endregion vertAlign
        //#region color
        get color() {
            return internal(this).color;
        }
        set color(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            //#endregion Variables déclaration
            core.tools.isString(newValue) ? newValue = Color.parse(newValue) : 1;
            if (newValue instanceof Color && !priv.color.equals(newValue)) {
                priv.color.assign(newValue);
                this.propertyChanged(core.tools.getPropertyName());
                !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate
                    ? this.update() : 1;
            }
        }
        //#endregion color
        //#region fontFamily
        get fontFamily() {
            return internal(this).fontFamily;
        }
        set fontFamily(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            //#endregion Variables déclaration
            if (core.tools.isString(newValue) && priv.fontFamily !== newValue) {
                priv.fontFamily = newValue;
                this.propertyChanged(core.tools.getPropertyName());
                !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate
                    ? this.update() : 1;
            }
        }
        //#endregion fontFamily
        //#region fontSize
        get fontSize() {
            return internal(this).fontSize;
        }
        set fontSize(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && priv.fontSize !== newValue) {
                priv.fontSize = newValue;
                this.propertyChanged(core.tools.getPropertyName());
                !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate
                    ? this.update() : 1;
            }
        }
        //#endregion fontSize
        //#region fontSizeUnit
        get fontSizeUnit() {
            return internal(this).fontSizeUnit;
        }
        set fontSizeUnit(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            const CSSUNITS = core.types.CSSUNITS;
            //#endregion Variables déclaration
            if (core.tools.valueInSet(newValue, CSSUNITS) && priv.fontSizeUnit !== newValue) {
                priv.fontSizeUnit = newValue;
                this.propertyChanged(core.tools.getPropertyName());
                !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate
                    ? this.update() : 1;
            }
        }
        //#endregion fontSizeUnit
        //#region fontBold
        get fontBold() {
            return internal(this).fontBold;
        }
        set fontBold(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            //#endregion Variables déclaration
            if (core.tools.isBool(newValue) && priv.fontBold !== newValue) {
                priv.fontBold = newValue;
                this.propertyChanged(core.tools.getPropertyName());
                !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate
                    ? this.update() : 1;
            }
        }
        //#endregion fontBold
        //#region fontStyle
        get fontStyle() {
            return internal(this).fontStyle;
        }
        set fontStyle(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            const FONTSTYLES = core.types.FONTSTYLES;
            //#endregion Variables déclaration
            if (core.tools.valueInSet(newValue, FONTSTYLES) && priv.fontStyle !== newValue) {
                priv.fontStyle = newValue;
                this.propertyChanged(core.tools.getPropertyName());
                !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate
                    ? this.update() : 1;
            }
        }
        //#endregion fontStyle
        //#region textTransform
        get textTransform() {
            return internal(this).textTransform;
        }
        set textTransform(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            const TEXTTRANSFORMS = core.types.TEXTTRANSFORMS;
            //#endregion Variables déclaration
            if (core.tools.valueInSet(newValue, TEXTTRANSFORMS) && priv.textTransform !== newValue) {
                priv.textTransform = newValue;
                this.propertyChanged(core.tools.getPropertyName());
                !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate
                    ? this.update() : 1;
            }
        }
        //#endregion textTransform
        //#region textShadows
        get textShadows() {
            return internal(this).textShadows;
        }
        set textShadows(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            //#endregion Variables déclaration
            if (newValue instanceof TextShadows && !priv.textShadows.equals(newValue.items)) {
                priv.textShadows.items.clear();
                priv.textShadows.items.addRange(newValue.items);
                this.propertyChanged(core.tools.getPropertyName());
                !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate
                    ? this.update() : 1;
            }
        }
        //#endregion textShadows
        //#region textDecoration
        get textDecoration() {
            return internal(this).textDecoration;
        }
        set textDecoration(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            //#endregion Variables déclaration
            if (newValue instanceof TextDecoration && !priv.textDecoration.equals(newValue.items)) {
                priv.textDecoration.items.clear();
                priv.textDecoration.items.addRange(newValue.items);
                this.propertyChanged(core.tools.getPropertyName());
                !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate
                    ? this.update() : 1;
            }
        }
        //#endregion textDecoration
        //#region autoSize
        get autoSize() {
            return internal(this).autoSize;
        }
        set autoSize(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isBool(newValue) && newValue !== priv.autoSize) {
                priv.autoSize = newValue;
                this.propertyChanged(core.tools.getPropertyName());
                !this.loading && !this.form.loading
                    ? this.update() : 1;
            }
        }
        //#endregion autoSize
        //#region textOverflow
        get textOverflow() {
            return internal(this).textOverflow;
        }
        set textOverflow(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            const TEXTOVERFLOWS = core.types.TEXTOVERFLOWS;
            //#endregion Variables déclaration
            if (core.tools.valueInSet(newValue, TEXTOVERFLOWS) && priv.textOverflow !== newValue) {
                priv.textOverflow = newValue;
                this.propertyChanged(core.tools.getPropertyName());
                !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate
                    ? this.update() : 1;
            }
        }
        //#endregion textOverflow
        //#region backColor
        get backColor() {
            return internal(this).backColor;
        }
        set backColor(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            //#endregion Variables déclaration
            if (core.tools.isString(newValue)) {
                newValue = Color.parse(newValue);
            }
            if (newValue instanceof Color && !priv.backColor.equals(newValue)) {
                priv.backColor.assign(newValue);
                this.propertyChanged(core.tools.getPropertyName());
                !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate
                    ? this.update() : 1;
            }
        }
        //#endregion backColor
        //#region template
        get template() {
            //#region Variables déclaration
            const priv = internal(this);
            let html = super.template;
            const a = html.split('{caption}');
            //#endregion Variables déclaration
            html = a.join(priv.caption);
            return html;
        }
        //#endregion template
        //#endregion Getters / Setters
        //#region Methods
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (core.isHTMLRenderer) {
                if (htmlElement) {
                    Text.setTextNode(htmlElement, priv.caption);
                    this.updateCssProperties();
                }
            } else {
                //
            }
        }
        //#endregion update
        //#region updateCssProperties
        updateCssProperties() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElementStyle = this.HTMLElementStyle;
            const FONTSTYLES = core.types.FONTSTYLES;
            const TEXTDECORATIONS = core.types.TEXTDECORATIONS;
            const textDecoration = priv.textDecoration;
            let textDecorationStr = String.EMPTY;
            const color = priv.color ? priv.color.toRGBAString() : priv.color;
            const TEXTALIGNS = core.types.TEXTALIGNS;
            const VERTTEXTALIGNS = core.types.VERTTEXTALIGNS;
            const isHtmlRenderer = core.isHTMLRenderer;
            const CSSVALUES = core.types.CSSVALUES;
            const DISPLAYS = core.types.DISPLAYS;
            //#endregion Variables déclaration
            if (priv.autoSize) {
                if (isHtmlRenderer) {
                    htmlElementStyle.width = String.EMPTY;
                    htmlElementStyle.height = String.EMPTY;
                    htmlElementStyle.display = DISPLAYS.INLINE;
                }
            } else {
                this.beginUpdate();
                if (isHtmlRenderer) {
                    htmlElementStyle.width = this.width;
                    htmlElementStyle.height = this.height;
                    htmlElementStyle.display = DISPLAYS.FLEX;
                    // change font properties

                } else {
                    //this.width = this.width;
                    //this.height = this.height;
                }
                this.endUpdate();
            }
            this.clipped
                ? htmlElementStyle.overflow = CSSVALUES.HIDDEN
                : htmlElementStyle.overflow = CSSVALUES.VISIBLE;
            color ? this.HTMLElementStyle.color = color : 1
            !this.wordWrap
                ? htmlElementStyle.whiteSpace = 'nowrap'
                : htmlElementStyle.whiteSpace = 'normal';
            priv.fontFamily
                ? htmlElementStyle.fontFamily = priv.fontFamily
                : htmlElementStyle.fontFamily = 'inherit';
            priv.fontSize
                ? htmlElementStyle.fontSize = `${priv.fontSize}${priv.fontSizeUnit}` : 1;
            htmlElementStyle.fontWeight = priv.fontBold ? FONTSTYLES.BOLD : FONTSTYLES.NORMAL;
            htmlElementStyle.fontStyle = priv.fontStyle;
            if (textDecoration) {
                textDecorationStr += textDecoration.underline
                    ? `${String.SPACE}${TEXTDECORATIONS.UNDERLINE}` : String.EMPTY;
                textDecorationStr += textDecoration.overline
                    ? `${String.SPACE}${TEXTDECORATIONS.OVERLINE}` : String.EMPTY;
                textDecorationStr += textDecoration.lineThrough
                    ? `${String.SPACE}${TEXTDECORATIONS.LINETHROUGH}` : String.EMPTY;
                textDecorationStr += textDecoration.color
                    ? `${String.SPACE}${textDecoration.color.toRGBAString()}` : String.EMPTY;
                textDecorationStr += textDecoration.style
                    ? `${String.SPACE}${textDecoration.style}` : String.EMPTY;
                htmlElementStyle.textDecoration = textDecorationStr.trim();
            } else {
                htmlElementStyle.textDecoration = 'unset';
            }
            htmlElementStyle.textShadow = String.EMPTY;
            if (priv.textShadows && priv.textShadows.items.length > 0) {
                const textS = [];
                priv.textShadows.items.forEach(ts => {
                    textS.push(ts.toCss());
                });
                htmlElementStyle.textShadow = textS.join(String.SPACE);
            }
            htmlElementStyle.textTransform = priv.textTransform;
            if (priv.horizAlign !== TEXTALIGNS.LEFT || priv.vertAlign !== VERTTEXTALIGNS.TOP) {
                htmlElementStyle.display = DISPLAYS.FLEX;
                switch (priv.horizAlign) {
                    case TEXTALIGNS.LEFT:
                        htmlElementStyle.justifyContent = 'flex-start';
                        break;
                    case TEXTALIGNS.CENTER:
                        htmlElementStyle.justifyContent = priv.horizAlign;
                        break;
                    case TEXTALIGNS.RIGHT:
                        htmlElementStyle.justifyContent = 'flex-end';
                        break;
                }
                switch (priv.vertAlign) {
                    case VERTTEXTALIGNS.TOP:
                        htmlElementStyle.alignItems = 'flex-start';
                        break;
                    case VERTTEXTALIGNS.MIDDLE:
                        htmlElementStyle.alignItems = 'center';
                        break;
                    case VERTTEXTALIGNS.BOTTOM:
                        htmlElementStyle.alignItems = 'flex-end';
                        break;
                }
            }
            priv.backColor.alpha !== 0
                ? htmlElementStyle.backgroundColor = priv.backColor.toRGBAString() : 1;
        }
        //#endregion updateCssProperties
        //#region loaded
        loaded() {
            super.loaded();
            this.app.getLocalText(this);
            this.update();
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.wordWrap = null;
            priv.horizAlign = null;
            priv.color.destroy();
            priv.color = null;
            priv.fontFamily = null;
            priv.fontSize = null;
            priv.fontSizeUnit = null;
            priv.fontBold = null;
            priv.fontStyle = null
            priv.textDecoration = null;
            priv.textShadows = null;
            priv.textTransform = null;
            priv.vertAlign = null;
            priv.backColor.destroy();
            priv.backColor = null;
            priv.autoSize = null;
            priv.textOverflow = null;
            super.destroy();
        }
        //#region destroy
        //#endregion
    }
    return CaptionControl;
    //#endregion CaptionControl
})();
core.classes.register(core.types.CATEGORIES.COMMON, CaptionControl);
//#region CaptionControl
export { CaptionControl };