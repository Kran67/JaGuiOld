//#region Import
import { ThemedControl } from "/scripts/core/themedcontrol.js";
import { Text } from "/scripts/core/text.js";
import { Tools } from "/scripts/core/tools.js";
import { Colors, Color } from "/scripts/core/color.js";
import { TextDecoration } from "/scripts/core/textdecoration.js";
import { TextShadows } from "/scripts/core/textshadows.js";
//#endregion Import
//#region CaptionControl
const CaptionControl = (() => {
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
    class CaptionControl extends ThemedControl {
        //#region Constructor
        constructor(owner, props) {
            //#region Variables déclaration
            const CONSTANTS = Types.CONSTANTS;
            const VERTTEXTALIGNS = Types.VERTTEXTALIGNS;
            let themeName = null;
            let theme = null;
            let captionControlTheme = null;
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                this.autoTranslate = true;
                const priv = internal(this);
                if (!Core.isHTMLRenderer) {
                    themeName = this.app.themeName;
                    theme = Core.themes[themeName];
                    captionControlTheme = theme[this.constructor.name] ? theme[this.constructor.name] : {};
                } else {
                    theme = {};
                    captionControlTheme = {};
                    priv.caption = props.hasOwnProperty("caption") ? props.caption : this.constructor.name;
                }
                priv.wordWrap = captionControlTheme.hasOwnProperty("wordWrap") ? captionControlTheme.wordWrap : props.hasOwnProperty("wordWrap") ? props.wordWrap : false;
                priv.horizAlign = props.hasOwnProperty("horizAlign") ? props.horizAlign : captionControlTheme.hasOwnProperty("horizAlign") ? captionControlTheme.horizAlign : props.hasOwnProperty("horizAlign") ? props.horizAlign : Types.TEXTALIGNS.LEFT;
                priv.color = Color.parse(captionControlTheme.hasOwnProperty("color") ? captionControlTheme.color : theme.DEFAULTTEXTCOLOR ? theme.DEFAULTTEXTCOLOR : props.hasOwnProperty("color") ? Color.parse(props.color) : null);
                if (props.hasOwnProperty("color")) {
                    if (Tools.isString(props.color)) {
                        priv.color = Color.parse(props.color);
                    }
                }
                priv.fontFamily = props.hasOwnProperty("fontFamily") ? props.fontFamily : captionControlTheme.hasOwnProperty("fontFamily") ? captionControlTheme.fontFamily : props.hasOwnProperty("fontFamily") ? props.fontFamily : null;
                priv.fontSize = props.hasOwnProperty("fontSize") ? props.fontSize : captionControlTheme.hasOwnProperty("fontSize") ? captionControlTheme.fontSize : props.hasOwnProperty("fontSize") ? props.fontSize : 8;
                priv.fontSizeUnit = props.hasOwnProperty("fontSizeUnit") ? props.fontSizeUnit : Types.CSSUNITS.PT;
                priv.fontBold = props.hasOwnProperty("fontBold") && typeof props.fontBold === CONSTANTS.BOOLEAN ? props.fontBold : captionControlTheme.hasOwnProperty("fontBold") ? captionControlTheme.fontBold : props.hasOwnProperty("fontBold") ? props.fontBold : false;
                priv.fontStyle = props.hasOwnProperty("fontStyle") ? props.fontStyle : captionControlTheme.hasOwnProperty("fontStyle") ? captionControlTheme.fontStyle : props.hasOwnProperty("fontStyle") ? props.fontStyle : Types.FONTSTYLES.NORMAL;
                priv.textDecoration = new TextDecoration(this, props.hasOwnProperty("textDecoration") ? props.textDecoration : captionControlTheme.hasOwnProperty("textDecoration") ? captionControlTheme.textDecoration : props.hasOwnProperty("textDecoration") ? props.textDecoration : null);
                priv.textShadows = new TextShadows(this, props.hasOwnProperty("textShadow") ? props.textShadow : captionControlTheme.hasOwnProperty("textShadow") ? captionControlTheme.textShadow : props.hasOwnProperty("textShadow") ? props.textShadow : null);
                priv.textTransform = props.hasOwnProperty("textTransform") ? props.textTransform : captionControlTheme.hasOwnProperty("textTransform") ? captionControlTheme.textTransform : props.hasOwnProperty("textTransform") ? props.textTransform : Types.TEXTTRANSFORMS.NONE;
                priv.vertAlign = props.hasOwnProperty("vertAlign") ? props.vertAlign : captionControlTheme.hasOwnProperty("vertAlign") ? captionControlTheme.vertAlign : props.hasOwnProperty("vertAlign") ? props.vertAlign : VERTTEXTALIGNS.TOP;
                priv.backColor = Color.parse(captionControlTheme.hasOwnProperty("backColor") ? captionControlTheme.backColor : props.hasOwnProperty("backColor") ? Color.parse(props.backColor) : Colors.TRANSPARENT.toRGBAString());
                if (props.hasOwnProperty("backColor")) {
                    if (Tools.isString(props.backColor)) {
                        priv.backColor = Color.parse(props.backColor);
                    } else if (props.backColor instanceof Color) {
                        priv.backColor = props.backColor;
                    }
                }
                priv.autoSize = props.hasOwnProperty("autoSize") ? props.autoSize : captionControlTheme.hasOwnProperty("autoSize") ? captionControlTheme.autoSize : props.hasOwnProperty("autoSize") ? props.autoSize : true;
                priv.textOverflow = props.hasOwnProperty("textOverflow") ? props.textOverflow : captionControlTheme.hasOwnProperty("textOverflow") ? captionControlTheme.textOverflow : props.hasOwnProperty("textOverflow") ? props.textOverflow : Types.TEXTOVERFLOWS.CLIP;
                this.addBindableProperties(["caption", "horizAlign", "wordWrap", "color", "fontFamily", "fontSize", "fontSizeUnit",
                    "fontBold", "fontStyle", "textTransform", "vertAlign", "backColor", "autSize", "textOverflow"]);
            }
        }
        //#endregion Constructor
        //#region Getter/Setter
        //#region caption
        get caption() {
            return internal(this).caption;
        }
        set caption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.caption !== newValue) {
                    priv.caption = Text.replace(newValue, Types.CONSTANTS.HOTKEYPREFIX, String.EMPTY);
                    //if ((this.loading||this.form.loading)&&!Tools.Debugger.useFragment) return;
                    this.update();
                }
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
            if (Tools.isBool(newValue)) {
                if (priv.wordWrap !== newValue) {
                    priv.wordWrap = newValue;
                    if (this.loading || form.loading) {
                        return;
                    }
                    if (!Core.isHTMLRenderer && this.allowUpdate) {
                        this.update();
                    }
                }
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
            if (Tools.valueInSet(newValue, Types.TEXTALIGNS)) {
                if (newValue !== priv.horizAlign) {
                    priv.horizAlign = newValue;
                    if (this.loading || form.loading) {
                        return;
                    }
                    if (!Core.isHTMLRenderer && this.allowUpdate) {
                        this.update();
                    }
                }
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
            if (Tools.valueInSet(newValue, Types.VERTTEXTALIGNS)) {
                if (newValue !== priv.vertAlign) {
                    priv.vertAlign = newValue;
                    if (this.loading || form.loading) {
                        return;
                    }
                    if (!Core.isHTMLRenderer && this.allowUpdate) {
                        this.update();
                    }
                }
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
            if (Tools.isString(newValue)) {
                newValue = Color.parse(newValue);
            }
            if (newValue instanceof Color) {
                if (!priv.color.equals(newValue)) {
                    priv.color.assign(newValue);
                    if (this.loading || form.loading) {
                        return;
                    }
                    if (Core.isHTMLRenderer && this.allowUpdate) {
                        this.update();
                    }
                }
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
            if (Tools.isString(newValue)) {
                if (priv.fontFamily !== newValue) {
                    priv.fontFamily = newValue;
                    if (this.loading || form.loading) {
                        return;
                    }
                    if (Core.isHTMLRenderer && this.allowUpdate) {
                        this.update();
                    }
                }
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
            if (Tools.isNumber(newValue)) {
                if (priv.fontSize !== newValue) {
                    priv.fontSize = newValue;
                    if (this.loading || form.loading) {
                        return;
                    }
                    if (Core.isHTMLRenderer && this.allowUpdate) {
                        this.update();
                    }
                }
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
            const CSSUNITS = Types.CSSUNITS;
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, CSSUNITS)) {
                if (priv.fontSizeUnit !== newValue) {
                    priv.fontSizeUnit = newValue;
                    if (this.loading || form.loading) {
                        return;
                    }
                    if (Core.isHTMLRenderer && this.allowUpdate) {
                        this.update();
                    }
                }
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
            if (Tools.isBool(newValue)) {
                if (priv.fontBold !== newValue) {
                    priv.fontBold = newValue;
                    if (this.loading || form.loading) {
                        return;
                    }
                    if (Core.isHTMLRenderer && this.allowUpdate) {
                        this.update();
                    }
                }
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
            const FONTSTYLES = Types.FONTSTYLES;
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, FONTSTYLES)) {
                if (priv.fontStyle !== newValue) {
                    priv.fontStyle = newValue;
                    if (this.loading || form.loading) {
                        return;
                    }
                    if (Core.isHTMLRenderer && this.allowUpdate) {
                        this.update();
                    }
                }
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
            const TEXTTRANSFORMS = Types.TEXTTRANSFORMS;
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, TEXTTRANSFORMS)) {
                if (priv.textTransform !== newValue) {
                    priv.textTransform = newValue;
                    if (this.loading || form.loading) {
                        return;
                    }
                    if (Core.isHTMLRenderer && this.allowUpdate) {
                        this.update();
                    }
                }
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
            if (newValue instanceof TextShadows) {
                if (!priv.textShadows.equals(newValue.items)) {
                    priv.textShadows.items.clear();
                    priv.textShadows.items.addRange(newValue.items);
                    if ((this.loading || form.loading)) {
                        return;
                    }
                    if (Core.isHTMLRenderer && this.allowUpdate) {
                        this.update();
                    }
                }
            }
        }
        //#endregion textShadows
        //#region TextDecoration
        get textDecoration() {
            return internal(this).textDecoration;
        }
        //#endregion TextDecoration
        //#region autoSize
        get autoSize() {
            return internal(this).autoSize;
        }
        set autoSize(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (newValue !== priv.autoSize) {
                    priv.autoSize = newValue;
                    if (!this.loading && !this.form.loading) {
                        this.update();
                    }
                }
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
            const TEXTOVERFLOWS = Types.TEXTOVERFLOWS;
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, TEXTOVERFLOWS)) {
                if (priv.textOverflow !== newValue) {
                    priv.textOverflow = newValue;
                    if (this.loading || form.loading) {
                        return;
                    }
                    if (Core.isHTMLRenderer && this.allowUpdate) {
                        this.update();
                    }
                }
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
            if (Tools.isString(newValue)) {
                newValue = Color.parse(newValue);
            }
            if (newValue instanceof Color) {
                if (!priv.backColor.equals(newValue)) {
                    priv.backColor.assign(newValue);
                    if (this.loading || form.loading) {
                        return;
                    }
                    if (Core.isHTMLRenderer && this.allowUpdate) {
                        this.update();
                    }
                }
            }
        }
        //#endregion backColor
        //#region getTemplate
        get template() {
            //#region Variables déclaration
            const priv = internal(this);
            let html = super.template;
            const a = html.split("{caption}");
            //#endregion Variables déclaration
            html = a.join(priv.caption);
            return html;
        }
        //#endregion getTemplate
        //#endregion Getter/Setter
        //#region Methods
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (Core.isHTMLRenderer) {
                super.update();
                Text.setTextNode(htmlElement, priv.caption);
                //htmlElement.innerHTML = this.caption;
                this.updateCssProperties();
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
            const FONTSTYLES = Types.FONTSTYLES;
            const TEXTDECORATIONS = Types.TEXTDECORATIONS;
            const textDecoration = priv.textDecoration;
            let textDecorationStr = String.EMPTY;
            const color = priv.color ? priv.color.toRGBAString() : priv.color;
            const TEXTALIGNS = Types.TEXTALIGNS;
            const VERTTEXTALIGNS = Types.VERTTEXTALIGNS;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const CSSVALUES = Types.CSSVALUES;
            const DISPLAYS = Types.DISPLAYS;
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
                    this.width = this.width;
                    this.height = this.height;
                }
                this.endUpdate();
            }
            if (this.clipped) {
                htmlElementStyle.overflow = CSSVALUES.HIDDEN;
            } else {
                htmlElementStyle.overflow = CSSVALUES.VISIBLE;
            }
            if (color) {
                this.HTMLElementStyle.color = color;
            }
            if (!this.wordWrap) {
                this.HTMLElementStyle.whiteSpace = "nowrap";
            } else {
                this.HTMLElementStyle.whiteSpace = "normal";
            }
            if (priv.fontFamily) {
                htmlElementStyle.fontFamily = priv.fontFamily;
            } else {
                htmlElementStyle.fontFamily = "inherit";
            }
            if (priv.fontSize) {
                htmlElementStyle.fontSize = `${priv.fontSize}${priv.fontSizeUnit}`;
            }
            htmlElementStyle.fontWeight = priv.fontBold ? FONTSTYLES.BOLD : FONTSTYLES.NORMAL;
            htmlElementStyle.fontStyle = priv.fontStyle;
            if (textDecoration) {
                if (textDecoration.underline) {
                    textDecorationStr += `${String.SPACE}${TEXTDECORATIONS.UNDERLINE}`;
                }
                if (textDecoration.overline) {
                    textDecorationStr += `${String.SPACE}${TEXTDECORATIONS.OVERLINE}`;
                }
                if (textDecoration.lineThrough) {
                    textDecorationStr += `${String.SPACE}${TEXTDECORATIONS.LINETHROUGH}`;
                }
                if (textDecoration.color) {
                    textDecorationStr += `${String.SPACE}${textDecoration.color.toRGBAString()}`;
                }
                if (textDecoration.style) {
                    textDecorationStr += `${String.SPACE}${textDecoration.style}`;
                }
                htmlElementStyle.textDecoration = textDecorationStr.trim();
            } else {
                htmlElementStyle.textDecoration = "unset";
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
                        htmlElementStyle.justifyContent = "flex-start";
                        break;
                    case TEXTALIGNS.CENTER:
                        htmlElementStyle.justifyContent = priv.horizAlign;
                        break;
                    case TEXTALIGNS.RIGHT:
                        htmlElementStyle.justifyContent = "flex-end";
                        break;
                }
                switch (priv.vertAlign) {
                    case VERTTEXTALIGNS.TOP:
                        htmlElementStyle.alignItems = "flex-start";
                        break;
                    case VERTTEXTALIGNS.MIDDLE:
                        htmlElementStyle.alignItems = "center";
                        break;
                    case VERTTEXTALIGNS.BOTTOM:
                        htmlElementStyle.alignItems = "flex-end";
                        break;
                }
            }
            if (priv.backColor.alpha !== 0) {
                htmlElementStyle.backgroundColor = priv.backColor.toRGBAString();
            }
        }
        //#endregion updateCssProperties
        //#region loaded
        loaded() {
            super.loaded();
            this.app.getLocalText(this);
        }
        //#endregion loaded
        //#endregion
    }
    return CaptionControl;
})();
//#region CaptionControl
//#region CaptionControl defineProperties
Object.defineProperties(CaptionControl, {
    "caption": {
        enumerable: true
    },
    "wordWrap": {
        enumerable: true
    },
    "autoTranslate": {
        enumerable: true
    },
    "horizAlign": {
        enumerable: true
    },
    "color": {
        enumerable: true
    },
    "fontFamily": {
        enumerable: true
    },
    "fontSize": {
        enumerable: true
    },
    "fontSizeUnit": {
        enumerable: true
    },
    "fontBold": {
        enumerable: true
    },
    "fontStyle": {
        enumerable: true
    },
    "textDecoration": {
        enumerable: true
    },
    "textShadows": {
        enumerable: true
    },
    "textTransform": {
        enumerable: true
    },
    "vertAlign": {
        enumerable: true
    },
    "backColor": {
        enumerable: true
    },
    "textOverflow": {
        enumerable: true
    }
});
//#endregion CaptionControl defineProperties
//#region CaptionControl
Core.classes.register(Types.CATEGORIES.COMMON, CaptionControl);
export { CaptionControl };