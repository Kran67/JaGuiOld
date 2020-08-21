//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Text } from '/scripts/core/text.js';
import { Colors, Color } from '/scripts/core/color.js';
import { TextDecoration } from '/scripts/core/textdecoration.js';
import { TextShadows } from '/scripts/core/textshadows.js';
//#endregion Import
//#region CaptionControl
class CaptionControl extends ThemedControl {
    //#region Private fields
    #caption;
    #wordWrap;
    #horizAlign;
    #color;
    #fontFamily;
    #fontSize;
    #fontSizeUnit;
    #fontBold;
    #fontStyle;
    #textDecoration;
    #textShadows;
    #textTransform;
    #vertAlign;
    #backColor;
    #autoSize;
    #textOverflow;
    //#endregion Private fields
    //#region Constructor
    constructor(owner, props) {
        //#region Variables déclaration
        const VERTTEXTALIGNS = core.types.VERTTEXTALIGNS;
        let themeName = null;
        let theme = null;
        let captionControlTheme = null;
        let params;
        let value;
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            props.autoTranslate = !0;
            super(owner, props);
            //#region Properties
            //#region Private Properties
            if (!core.isHTMLRenderer) {
                themeName = this.app.themeName;
                theme = core.themes[themeName];
                captionControlTheme = theme[this.constructor.name] ? theme[this.constructor.name] : {};
            } else {
                theme = {};
                captionControlTheme = {};
                this.#caption = props.hasOwnProperty('caption') ? props.caption : this.constructor.name;
            }
            //#region wordWrap
            if (captionControlTheme.hasOwnProperty('wordWrap')) {
                value = captionControlTheme.wordWrap;
            } else if (props.hasOwnProperty('wordWrap')) {
                value = props.wordWrap;
            } else {
                value = !1;
            }
            this.#wordWrap = value;
            //#endregion wordWrap
            //#region horizAlign
            if (props.hasOwnProperty('horizAlign')) {
                value = props.horizAlign;
            } else if (captionControlTheme.hasOwnProperty('horizAlign')) {
                value = captionControlTheme.horizAlign;
            } else if (props.hasOwnProperty('horizAlign')) {
                value = props.horizAlign;
            } else {
                value = core.types.TEXTALIGNS.LEFT;
            }
            this.#horizAlign = value;
            //#endregion horizAlign
            //#region color
            if (Color.parse(captionControlTheme.hasOwnProperty('color'))) {
                value = captionControlTheme.color;
            } else if (theme.DEFAULTTEXTCOLOR) {
                value = theme.DEFAULTTEXTCOLOR;
            } else if (props.hasOwnProperty('color')) {
                if (core.tools.isString(props.color)) {
                    value = Color.parse(props.color);
                }
            }
            this.#color = value;
            //#endregion color
            //#region fontFamily
            if (props.hasOwnProperty('fontFamily')) {
                value = props.fontFamily;
            } else if (captionControlTheme.hasOwnProperty('fontFamily')) {
                value = captionControlTheme.fontFamily;
            } else if (props.hasOwnProperty('fontFamily')) {
                value = props.fontFamily;
            }
            this.#fontFamily = value;
            //#endregion fontFamily
            //#region fontSize
            if (props.hasOwnProperty('fontSize')) {
                value = props.fontSize;
            } else if (captionControlTheme.hasOwnProperty('fontSize')) {
                value = captionControlTheme.fontSize;
            } else if (props.hasOwnProperty('fontSize')) {
                value = props.fontSize;
            } else {
                value = 8;
            }
            this.#fontSize = value;
            //#endregion fontSize
            //#region fontSizeUnit
            if (props.hasOwnProperty('fontSizeUnit')) {
                value = props.fontSizeUnit;
            } else {
                value = core.types.CSSUNITS.PT;
            }
            this.#fontSizeUnit = value;
            //#endregion fontSizeUnit
            //#region fontBold
            if (props.hasOwnProperty('fontBold') && core.tools.isBool(props.fontBold)) {
                value = props.fontBold;
            } else if (captionControlTheme.hasOwnProperty('fontBold')) {
                value = captionControlTheme.fontBold;
            } else if (props.hasOwnProperty('fontBold')) {
                value = props.fontBold;
            }
            this.#fontBold = value;
            //#endregion fontBold
            //#region fontStyle
            if (props.hasOwnProperty('fontStyle')) {
                value = props.fontStyle;
            } else if (captionControlTheme.hasOwnProperty('fontStyle')) {
                value = captionControlTheme.fontStyle;
            } else if (props.hasOwnProperty('fontStyle')) {
                value = props.fontStyle;
            } else {
                value = core.types.FONTSTYLES.NORMAL;
            }
            this.#fontStyle = value;
            //#endregion fontStyle
            //#region textDecoration
            if (props.hasOwnProperty('textDecoration')) {
                params = props.textDecoration;
            } else if (captionControlTheme.hasOwnProperty('textDecoration')) {
                params = captionControlTheme.textDecoration;
            } else if (props.hasOwnProperty('textDecoration')) {
                params = props.textDecoration;
            }
            this.#textDecoration = new TextDecoration(this, params);
            //#endregion textDecoration
            //#region textShadow
            if (props.hasOwnProperty('textShadow')) {
                params = props.textShadow;
            } else if (captionControlTheme.hasOwnProperty('textShadow')) {
                params = captionControlTheme.textShadow;
            } else if (props.hasOwnProperty('textShadow')) {
                params = props.textShadow;
            }
            this.#textShadows = new TextShadows(this, params);
            //#endregion textShadow
            //#region textTransform
            if (props.hasOwnProperty('textTransform')) {
                value = props.textTransform;
            } else if (captionControlTheme.hasOwnProperty('textTransform')) {
                value = captionControlTheme.textTransform;
            } else if (props.hasOwnProperty('textTransform')) {
                value = props.textTransform;
            } else {
                value = core.types.TEXTTRANSFORMS.NONE;
            }
            this.#textTransform = value;
            //#endregion textTransform
            //#region vertAlign
            if (props.hasOwnProperty('vertAlign')) {
                value = props.vertAlign;
            } else if (captionControlTheme.hasOwnProperty('vertAlign')) {
                value = captionControlTheme.vertAlign;
            } else if (props.hasOwnProperty('vertAlign')) {
                value = props.vertAlign;
            } else {
                value = VERTTEXTALIGNS.TOP;
            }
            this.#vertAlign = value;
            //#endregion vertAlign
            //#region backColor
            if (captionControlTheme.hasOwnProperty('backColor')) {
                value = Color.parse(captionControlTheme.backColor);
            } else if (props.hasOwnProperty('backColor')) {
                if (core.tools.isString(props.backColor)) {
                    value = Color.parse(props.backColor);
                } else if (props.backColor instanceof Color) {
                    value = props.backColor;
                }
            } else {
                value = Colors.TRANSPARENT;//.toRGBAString();
            }
            this.#backColor = value;
            //#endregion backColor
            //#region autoSize
            if (props.hasOwnProperty('autoSize')) {
                value = props.autoSize;
            } else if (captionControlTheme.hasOwnProperty('autoSize')) {
                value = captionControlTheme.autoSize;
            } else if (props.hasOwnProperty('autoSize')) {
                value = props.autoSize;
            } else {
                value = !0;
            }
            this.#autoSize = value;
            //#endregion autoSize
            //#region textOverflow
            if (props.hasOwnProperty('textOverflow')) {
                value = props.textOverflow;
            } else if (captionControlTheme.hasOwnProperty('textOverflow')) {
                value = captionControlTheme.textOverflow;
            } else if (props.hasOwnProperty('textOverflow')) {
                value = props.textOverflow;
            } else {
                value = core.types.TEXTOVERFLOWS.CLIP;
            }
            this.#textOverflow = value;
            //#endregion textOverflow
            //#endregion Properties
            //#endregion Private Properties
        }
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region caption
    get caption() {
        return this.#caption;
    }
    set caption(newValue) {
        if (core.tools.isString(newValue) && this.#caption !== newValue) {
            this.#caption = Text.replace(newValue, core.types.CONSTANTS.HOTKEYPREFIX, String.EMPTY);
            this.propertyChanged('caption');
            this.update();
        }
    }
    //#endregion caption
    //#region wordWrap
    get wordWrap() {
        return this.#wordWrap;
    }
    set wordWrap(newValue) {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#wordWrap !== newValue) {
            this.#wordWrap = newValue;
            this.propertyChanged('wordWrap');
            !this.loading && !form.loading && !core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion wordWrap
    //#region horizAlign
    get horizAlign() {
        return this.#horizAlign;
    }
    set horizAlign(newValue) {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, core.types.TEXTALIGNS)
            && newValue !== this.#horizAlign) {
            this.#horizAlign = newValue;
            this.propertyChanged('horizAlign');
            !this.loading && !form.loading && !core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion horizAlign
    //#region vertAlign
    get vertAlign() {
        return this.#vertAlign;
    }
    set vertAlign(newValue) {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, core.types.VERTTEXTALIGNS)
            && newValue !== this.#vertAlign) {
            this.#vertAlign = newValue;
            this.propertyChanged('vertAlign');
            !this.loading && !form.loading && !core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion vertAlign
    //#region color
    get color() {
        return this.#color;
    }
    set color(newValue) {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        core.tools.isString(newValue) && (newValue = Color.parse(newValue));
        !this.#color && (this.#color = Colors.BLACK);
        if (newValue instanceof Color && !this.#color.equals(newValue)) {
            this.#color = newValue;
            this.propertyChanged('color');
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion color
    //#region fontFamily
    get fontFamily() {
        return this.#fontFamily;
    }
    set fontFamily(newValue) {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && this.#fontFamily !== newValue) {
            this.#fontFamily = newValue;
            this.propertyChanged('fontFamily');
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion fontFamily
    //#region fontSize
    get fontSize() {
        return this.#fontSize;
    }
    set fontSize(newValue) {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && this.#fontSize !== newValue) {
            this.#fontSize = newValue;
            this.propertyChanged('fontSize');
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion fontSize
    //#region fontSizeUnit
    get fontSizeUnit() {
        return this.#fontSizeUnit;
    }
    set fontSizeUnit(newValue) {
        //#region Variables déclaration
        const form = this.form;
        const CSSUNITS = core.types.CSSUNITS;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, CSSUNITS) && this.#fontSizeUnit !== newValue) {
            this.#fontSizeUnit = newValue;
            this.propertyChanged('fontSizeUnit');
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion fontSizeUnit
    //#region fontBold
    get fontBold() {
        return this.#fontBold;
    }
    set fontBold(newValue) {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#fontBold !== newValue) {
            this.#fontBold = newValue;
            this.propertyChanged('fontBold');
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion fontBold
    //#region fontStyle
    get fontStyle() {
        return this.#fontStyle;
    }
    set fontStyle(newValue) {
        //#region Variables déclaration
        const form = this.form;
        const FONTSTYLES = core.types.FONTSTYLES;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, FONTSTYLES) && this.#fontStyle !== newValue) {
            this.#fontStyle = newValue;
            this.propertyChanged('fontStyle');
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion fontStyle
    //#region textTransform
    get textTransform() {
        return this.#textTransform;
    }
    set textTransform(newValue) {
        //#region Variables déclaration
        const form = this.form;
        const TEXTTRANSFORMS = core.types.TEXTTRANSFORMS;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, TEXTTRANSFORMS) && this.#textTransform!== newValue) {
            this.#textTransform = newValue;
            this.propertyChanged('textTransform');
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion textTransform
    //#region textShadows
    get textShadows() {
        return this.#textShadows;
    }
    set textShadows(newValue) {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        if (newValue instanceof TextShadows && !this.#textTransform.equals(newValue.items)) {
            this.#textTransform.items.clear();
            this.#textTransform.items.addRange(newValue.items);
            this.propertyChanged('textTransform');
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion textShadows
    //#region textDecoration
    get textDecoration() {
        return this.#textDecoration;
    }
    set textDecoration(newValue) {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        if (newValue instanceof TextDecoration && !this.#textDecoration.equals(newValue.items)) {
            this.#textDecoration.items.clear();
            this.#textDecoration.items.addRange(newValue.items);
            this.propertyChanged('textDecoration');
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion textDecoration
    //#region autoSize
    get autoSize() {
        return this.#autoSize;
    }
    set autoSize(newValue) {
        if (core.tools.isBool(newValue) && newValue !== this.#autoSize) {
            this.#autoSize = newValue;
            this.propertyChanged('autoSize');
            !this.loading && !this.form.loading && this.update();
        }
    }
    //#endregion autoSize
    //#region textOverflow
    get textOverflow() {
        return this.#textOverflow;
    }
    set textOverflow(newValue) {
        //#region Variables déclaration
        const form = this.form;
        const TEXTOVERFLOWS = core.types.TEXTOVERFLOWS;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, TEXTOVERFLOWS) && this.#textOverflow!== newValue) {
            this.#textOverflow = newValue;
            this.propertyChanged('textOverflow');
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion textOverflow
    //#region backColor
    get backColor() {
        return this.#backColor;
    }
    set backColor(newValue) {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        core.tools.isString(newValue) && (newValue = Color.parse(newValue));
        !this.#backColor && (this.#color = Colors.BLACK);
        if (newValue instanceof Color && !this.#backColor.equals(newValue)) {
            this.#backColor.assign(newValue);
            this.propertyChanged('backColor');
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion backColor
    //#region template
    get template() {
        //#region Variables déclaration
        let html = super.template;
        const a = html.split('{caption}');
        //#endregion Variables déclaration
        html = a.join(this.#caption);
        return html;
    }
    //#endregion template
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.isHTMLRenderer && htmlElement) {
            Text.setTextNode(htmlElement, this.#caption);
            this.updateCssProperties();
        }
    }
    //#endregion update
    //#region updateCssProperties
    updateCssProperties() {
        //#region Variables déclaration
        const htmlElementStyle = this.HTMLElementStyle;
        const FONTSTYLES = core.types.FONTSTYLES;
        const TEXTDECORATIONS = core.types.TEXTDECORATIONS;
        const textDecoration = this.#textDecoration;
        let textDecorationStr = String.EMPTY;
        const color = this.#color ? this.#color.toRGBAString() : this.#color;
        const TEXTALIGNS = core.types.TEXTALIGNS;
        const VERTTEXTALIGNS = core.types.VERTTEXTALIGNS;
        const isHtmlRenderer = core.isHTMLRenderer;
        const CSSVALUES = core.types.CSSVALUES;
        const DISPLAYS = core.types.DISPLAYS;
        const fontFamily = this.#fontFamily;
        const fontSize = this.#fontSize;
        const textShadows = this.#textShadows;
        const horizAlign = this.#horizAlign;
        const vertAlign = this.#vertAlign;
        const backColor = this.#backColor;
        const fontBold = this.#fontBold;
        //#endregion Variables déclaration
        if (this.#autoSize) {
            if (isHtmlRenderer) {
                htmlElementStyle.width = String.EMPTY;
                htmlElementStyle.height = String.EMPTY;
                htmlElementStyle.display = DISPLAYS.INLINEBLOCK;
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
        color && (this.HTMLElementStyle.color = color);
        !this.wordWrap
            ? htmlElementStyle.whiteSpace = 'nowrap'
            : htmlElementStyle.whiteSpace = 'normal';
        fontFamily
            ? htmlElementStyle.fontFamily = fontFamily
            : htmlElementStyle.fontFamily = 'inherit';
        fontSize
            && (htmlElementStyle.fontSize = `${fontSize}${this.#fontSizeUnit}`);
        htmlElementStyle.fontWeight = this.#fontBold && core.tools.isBool(fontBold)
            ? FONTSTYLES.BOLD : FONTSTYLES.NORMAL;
        htmlElementStyle.fontStyle = this.#fontStyle;
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
        if (textShadows && textShadows.items.length > 0) {
            const textS = [];
            textShadows.items.forEach(ts => {
                textS.push(ts.toCss());
            });
            htmlElementStyle.textShadow = textS.join(String.SPACE);
        }
        htmlElementStyle.textTransform = this.#textTransform;
        if (horizAlign !== TEXTALIGNS.LEFT || vertAlign !== VERTTEXTALIGNS.TOP) {
            htmlElementStyle.display = DISPLAYS.FLEX;
            switch (horizAlign) {
                case TEXTALIGNS.LEFT:
                    htmlElementStyle.justifyContent = 'flex-start';
                    break;
                case TEXTALIGNS.CENTER:
                    htmlElementStyle.justifyContent = horizAlign;
                    break;
                case TEXTALIGNS.RIGHT:
                    htmlElementStyle.justifyContent = 'flex-end';
                    break;
            }
            switch (vertAlign) {
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
        backColor.alpha !== 0 && (htmlElementStyle.backgroundColor = backColor.toRGBAString());
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
        this.#color && this.#color.destroy();
        this.#backColor && this.#backColor.destroy();
        super.destroy();
    }
    //#region destroy
    //#endregion
}
Object.defineProperties(CaptionControl.prototype, {
    'caption': {
        enumerable: !0
    },
    'wordWrap': {
        enumerable: !0
    },
    'horizAlign': {
        enumerable: !0
    },
    'color': {
        enumerable: !0
    },
    'fontFamily': {
        enumerable: !0
    },
    'fontSize': {
        enumerable: !0
    },
    'fontSizeUnit': {
        enumerable: !0
    },
    'fontBold': {
        enumerable: !0
    },
    'fontStyle': {
        enumerable: !0
    },
    'textDecoration': {
        enumerable: !0
    },
    'textShadows': {
        enumerable: !0
    },
    'textTransform': {
        enumerable: !0
    },
    'vertAlign': {
        enumerable: !0
    },
    'backColor': {
        enumerable: !0
    },
    'autoSize': {
        enumerable: !0
    },
    'textOverflow': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.COMMON, CaptionControl);
//#region CaptionControl
export { CaptionControl };