//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Text } from '/scripts/core/text.js';
import { Colors, Color } from '/scripts/core/color.js';
import { TextDecoration } from '/scripts/core/textdecoration.js';
import { TextShadows } from '/scripts/core/textshadows.js';
//#endregion Import
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
                core.setPrivate(this, 'caption', props.hasOwnProperty('caption') ? props.caption : this.constructor.name);
            }
            //#region wordWrap
            if (captionControlTheme.hasOwnProperty('wordWrap')) {
                value = captionControlTheme.wordWrap;
            } else if (props.hasOwnProperty('wordWrap')) {
                value = props.wordWrap;
            } else {
                value = !1;
            }
            core.setPrivate(this, 'wordWrap', value);
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
            core.setPrivate(this, 'horizAlign', value);
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
            core.setPrivate(this, 'color', value);
            //#endregion color
            //#region fontFamily
            if (props.hasOwnProperty('fontFamily')) {
                value = props.fontFamily;
            } else if (captionControlTheme.hasOwnProperty('fontFamily')) {
                value = captionControlTheme.fontFamily;
            } else if (props.hasOwnProperty('fontFamily')) {
                value = props.fontFamily;
            }
            core.setPrivate(this, 'fontFamily', value);
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
            core.setPrivate(this, 'fontSize', value);
            //#endregion fontSize
            //#region fontSizeUnit
            if (props.hasOwnProperty('fontSizeUnit')) {
                value = props.fontSizeUnit;
            } else {
                value = core.types.CSSUNITS.PT;
            }
            core.setPrivate(this, 'fontSizeUnit', value);
            //#endregion fontSizeUnit
            //#region fontBold
            if (props.hasOwnProperty('fontBold') && core.tools.isBool(props.fontBold)) {
                value = props.fontBold;
            } else if (captionControlTheme.hasOwnProperty('fontBold')) {
                value = captionControlTheme.fontBold;
            } else if (props.hasOwnProperty('fontBold')) {
                value = props.fontBold;
            }
            core.setPrivate(this, 'fontBold', value);
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
            core.setPrivate(this, 'fontStyle', value);
            //#endregion fontStyle
            //#region textDecoration
            if (props.hasOwnProperty('textDecoration')) {
                params = props.textDecoration;
            } else if (captionControlTheme.hasOwnProperty('textDecoration')) {
                params = captionControlTheme.textDecoration;
            } else if (props.hasOwnProperty('textDecoration')) {
                params = props.textDecoration;
            }
            core.setPrivate(this, 'textDecoration', new TextDecoration(this, params));
            //#endregion textDecoration
            //#region textShadow
            if (props.hasOwnProperty('textShadow')) {
                params = props.textShadow;
            } else if (captionControlTheme.hasOwnProperty('textShadow')) {
                params = captionControlTheme.textShadow;
            } else if (props.hasOwnProperty('textShadow')) {
                params = props.textShadow;
            }
            core.setPrivate(this, 'textShadows', new TextShadows(this, params));
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
            core.setPrivate(this, 'textTransform', value);
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
            core.setPrivate(this, 'vertAlign', value);
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
            core.setPrivate(this, 'backColor', value);
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
            core.setPrivate(this, 'autoSize', value);
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
            core.setPrivate(this, 'textOverflow', value);
            //#endregion textOverflow
            //#endregion Properties
            //#endregion Private Properties
        }
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region caption
    get caption() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set caption(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && core.getPrivate(this, propName) !== newValue) {
            core.setPrivate(this, propName,
                Text.replace(newValue, core.types.CONSTANTS.HOTKEYPREFIX, String.EMPTY));
            this.propertyChanged(core.tools.getPropertyName());
            this.update();
        }
    }
    //#endregion caption
    //#region wordWrap
    get wordWrap() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set wordWrap(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        const form = this.form;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && core.getPrivate(this, propName) !== newValue) {
            core.setPrivate(this, propName, newValue);
            this.propertyChanged(propName);
            !this.loading && !form.loading && !core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion wordWrap
    //#region horizAlign
    get horizAlign() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set horizAlign(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        const form = this.form;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, core.types.TEXTALIGNS)
            && newValue !== core.getPrivate(this, propName)) {
            core.setPrivate(this, propName, newValue);
            this.propertyChanged(propName);
            !this.loading && !form.loading && !core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion horizAlign
    //#region vertAlign
    get vertAlign() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set vertAlign(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        const form = this.form;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, core.types.VERTTEXTALIGNS)
            && newValue !== core.getPrivate(this, propName)) {
            core.setPrivate(this, propName, newValue);
            this.propertyChanged(propName);
            !this.loading && !form.loading && !core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion vertAlign
    //#region color
    get color() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set color(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        const form = this.form;
        //#endregion Variables déclaration
        core.tools.isString(newValue) && (newValue = Color.parse(newValue));
        if (newValue instanceof Color && !core.getPrivate(this, propName).equals(newValue)) {
            core.setPrivate(this, propName, newValue);
            this.propertyChanged(propName);
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion color
    //#region fontFamily
    get fontFamily() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set fontFamily(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        const form = this.form;
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && core.getPrivate(this, propName) !== newValue) {
            core.setPrivate(this, propName, newValue);
            this.propertyChanged(propName);
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion fontFamily
    //#region fontSize
    get fontSize() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set fontSize(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        const form = this.form;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && core.getPrivate(this, propName) !== newValue) {
            core.setPrivate(this, propName, newValue);
            this.propertyChanged(propName);
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion fontSize
    //#region fontSizeUnit
    get fontSizeUnit() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set fontSizeUnit(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        const form = this.form;
        const CSSUNITS = core.types.CSSUNITS;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, CSSUNITS) && core.getPrivate(this, propName) !== newValue) {
            core.setPrivate(this, propName, newValue);
            this.propertyChanged(propName);
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion fontSizeUnit
    //#region fontBold
    get fontBold() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set fontBold(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        const form = this.form;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && core.getPrivate(this, propName) !== newValue) {
            core.setPrivate(this, propName, newValue);
            this.propertyChanged(propName);
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion fontBold
    //#region fontStyle
    get fontStyle() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set fontStyle(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        const form = this.form;
        const FONTSTYLES = core.types.FONTSTYLES;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, FONTSTYLES) && core.getPrivate(this, propName) !== newValue) {
            core.setPrivate(this, propName, newValue);
            this.propertyChanged(propName);
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion fontStyle
    //#region textTransform
    get textTransform() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set textTransform(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        const form = this.form;
        const TEXTTRANSFORMS = core.types.TEXTTRANSFORMS;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, TEXTTRANSFORMS) && core.getPrivate(this, propName) !== newValue) {
            core.setPrivate(this, propName, newValue);
            this.propertyChanged(propName);
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion textTransform
    //#region textShadows
    get textShadows() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set textShadows(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        const form = this.form;
        //#endregion Variables déclaration
        if (newValue instanceof TextShadows && !core.getPrivate(this, propName).equals(newValue.items)) {
            core.getPrivate(this, propName).items.clear();
            core.getPrivate(this, propName).items.addRange(newValue.items);
            this.propertyChanged(propName);
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion textShadows
    //#region textDecoration
    get textDecoration() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set textDecoration(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        const form = this.form;
        //#endregion Variables déclaration
        if (newValue instanceof TextDecoration && !core.getPrivate(this, propName).equals(newValue.items)) {
            core.getPrivate(this, propName).items.clear();
            core.getPrivate(this, propName).items.addRange(newValue.items);
            this.propertyChanged(propName);
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion textDecoration
    //#region autoSize
    get autoSize() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set autoSize(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && newValue !== core.getPrivate(this, propName)) {
            core.setPrivate(this, propName, newValue);
            this.propertyChanged(propName);
            !this.loading && !this.form.loading && this.update();
        }
    }
    //#endregion autoSize
    //#region textOverflow
    get textOverflow() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set textOverflow(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        const form = this.form;
        const TEXTOVERFLOWS = core.types.TEXTOVERFLOWS;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, TEXTOVERFLOWS) && core.getPrivate(this, propName) !== newValue) {
            core.setPrivate(this, propName, newValue);
            this.propertyChanged(propName);
            !this.loading && !form.loading && core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion textOverflow
    //#region backColor
    get backColor() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set backColor(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        const form = this.form;
        //#endregion Variables déclaration
        core.tools.isString(newValue) && (newValue = Color.parse(newValue));
        if (newValue instanceof Color && !core.getPrivate(this, propName).equals(newValue)) {
            core.getPrivate(this, propName).assign(newValue);
            this.propertyChanged(propName);
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
        html = a.join(core.getPrivate(this, 'caption'));
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
            Text.setTextNode(htmlElement, core.getPrivate(this, 'caption'));
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
        const textDecoration = core.getPrivate(this, 'textDecoration');
        let textDecorationStr = String.EMPTY;
        const color = core.getPrivate(this, 'color')
            ? core.getPrivate(this, 'color').toRGBAString() : core.getPrivate(this, 'color');
        const TEXTALIGNS = core.types.TEXTALIGNS;
        const VERTTEXTALIGNS = core.types.VERTTEXTALIGNS;
        const isHtmlRenderer = core.isHTMLRenderer;
        const CSSVALUES = core.types.CSSVALUES;
        const DISPLAYS = core.types.DISPLAYS;
        const fontFamily = core.getPrivate(this, 'fontFamily');
        const fontSize = core.getPrivate(this, 'fontSize');
        const textShadows = core.getPrivate(this, 'textShadows');
        const horizAlign = core.getPrivate(this, 'horizAlign');
        const vertAlign = core.getPrivate(this, 'vertAlign');
        const backColor = core.getPrivate(this, 'backColor');
        const fontBold = core.getPrivate(this, 'fontBold');
        //#endregion Variables déclaration
        if (core.getPrivate(this, 'autoSize')) {
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
        color && (this.HTMLElementStyle.color = color);
        !this.wordWrap
            ? htmlElementStyle.whiteSpace = 'nowrap'
            : htmlElementStyle.whiteSpace = 'normal';
        fontFamily
            ? htmlElementStyle.fontFamily = fontFamily
            : htmlElementStyle.fontFamily = 'inherit';
        fontSize
            && (htmlElementStyle.fontSize = `${fontSize}${core.getPrivate(this, 'fontSizeUnit')}`);
        htmlElementStyle.fontWeight = core.getPrivate(this, 'fontBold') && core.tools.isBool(fontBold)
            ? FONTSTYLES.BOLD : FONTSTYLES.NORMAL;
        htmlElementStyle.fontStyle = core.getPrivate(this, 'fontStyle');
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
        htmlElementStyle.textTransform = core.getPrivate(this, 'textTransform');
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
        core.getPrivate(this, 'color').destroy();
        core.getPrivate(this, 'backColor').destroy();
        super.destroy();
    }
    //#region destroy
    //#endregion
}
core.classes.register(core.types.CATEGORIES.COMMON, CaptionControl);
//#region CaptionControl
export { CaptionControl };