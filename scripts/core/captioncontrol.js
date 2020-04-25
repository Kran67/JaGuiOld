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
        if (!_private.has(key)) {
            _private.set(key, {});
        }
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
                priv.wordWrap = captionControlTheme.hasOwnProperty('wordWrap')
                    ? captionControlTheme.wordWrap : props.hasOwnProperty('wordWrap')
                        ? props.wordWrap : !1;
                priv.horizAlign = props.hasOwnProperty('horizAlign')
                    ? props.horizAlign : captionControlTheme.hasOwnProperty('horizAlign')
                        ? captionControlTheme.horizAlign : props.hasOwnProperty('horizAlign')
                            ? props.horizAlign : core.types.TEXTALIGNS.LEFT;
                priv.color = Color.parse(captionControlTheme.hasOwnProperty('color')
                    ? captionControlTheme.color : theme.DEFAULTTEXTCOLOR
                        ? theme.DEFAULTTEXTCOLOR : props.hasOwnProperty('color')
                            ? Color.parse(props.color) : null);
                props.hasOwnProperty('color') && core.tools.isString(props.color)
                    ? priv.color = Color.parse(props.color) : 1;
                priv.fontFamily = props.hasOwnProperty('fontFamily')
                    ? props.fontFamily : captionControlTheme.hasOwnProperty('fontFamily')
                        ? captionControlTheme.fontFamily : props.hasOwnProperty('fontFamily')
                            ? props.fontFamily : null;
                priv.fontSize = props.hasOwnProperty('fontSize')
                    ? props.fontSize : captionControlTheme.hasOwnProperty('fontSize')
                        ? captionControlTheme.fontSize : props.hasOwnProperty('fontSize')
                            ? props.fontSize : 8;
                priv.fontSizeUnit = props.hasOwnProperty('fontSizeUnit')
                    ? props.fontSizeUnit : core.types.CSSUNITS.PT;
                priv.fontBold = props.hasOwnProperty('fontBold') && core.tools.isBool(props.fontBold)
                    ? props.fontBold : captionControlTheme.hasOwnProperty('fontBold')
                        ? captionControlTheme.fontBold : props.hasOwnProperty('fontBold')
                            ? props.fontBold : !1;
                priv.fontStyle = props.hasOwnProperty('fontStyle')
                    ? props.fontStyle : captionControlTheme.hasOwnProperty('fontStyle')
                        ? captionControlTheme.fontStyle : props.hasOwnProperty('fontStyle')
                            ? props.fontStyle : core.types.FONTSTYLES.NORMAL;
                priv.textDecoration = new TextDecoration(this, props.hasOwnProperty('textDecoration')
                    ? props.textDecoration : captionControlTheme.hasOwnProperty('textDecoration')
                        ? captionControlTheme.textDecoration : props.hasOwnProperty('textDecoration')
                            ? props.textDecoration : null);
                priv.textShadows = new TextShadows(this, props.hasOwnProperty('textShadow')
                    ? props.textShadow : captionControlTheme.hasOwnProperty('textShadow')
                        ? captionControlTheme.textShadow : props.hasOwnProperty('textShadow')
                            ? props.textShadow : null);
                priv.textTransform = props.hasOwnProperty('textTransform')
                    ? props.textTransform : captionControlTheme.hasOwnProperty('textTransform')
                        ? captionControlTheme.textTransform : props.hasOwnProperty('textTransform')
                            ? props.textTransform : core.types.TEXTTRANSFORMS.NONE;
                priv.vertAlign = props.hasOwnProperty('vertAlign')
                    ? props.vertAlign : captionControlTheme.hasOwnProperty('vertAlign')
                        ? captionControlTheme.vertAlign : props.hasOwnProperty('vertAlign')
                            ? props.vertAlign : VERTTEXTALIGNS.TOP;
                priv.backColor = Color.parse(captionControlTheme.hasOwnProperty('backColor')
                    ? captionControlTheme.backColor : props.hasOwnProperty('backColor')
                        ? Color.parse(props.backColor) : Colors.TRANSPARENT.toRGBAString());
                props.hasOwnProperty('backColor')
                    ? core.tools.isString(props.backColor) : priv.backColor = Color.parse(props.backColor)
                        ? props.backColor instanceof Color : priv.backColor = props.backColor;
                priv.autoSize = props.hasOwnProperty('autoSize')
                    ? props.autoSize : captionControlTheme.hasOwnProperty('autoSize')
                        ? captionControlTheme.autoSize : props.hasOwnProperty('autoSize')
                            ? props.autoSize : !0;
                priv.textOverflow = props.hasOwnProperty('textOverflow')
                    ? props.textOverflow : captionControlTheme.hasOwnProperty('textOverflow')
                        ? captionControlTheme.textOverflow : props.hasOwnProperty('textOverflow')
                            ? props.textOverflow : core.types.TEXTOVERFLOWS.CLIP;
                //#endregion Private Properties
                //#region Public Properties
                Object.defineProperties(this, {
                    'caption': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).caption;
                        },
                        set: function (newValue) {
                            //#region Variables déclaration
                            const priv = internal(this);
                            //#endregion Variables déclaration
                            if (core.tools.isString(newValue) && priv.caption !== newValue) {
                                priv.caption = Text.replace(newValue, core.types.CONSTANTS.HOTKEYPREFIX, String.EMPTY);
                                this.propertyChanged(core.tools.getPropertyName());
                                this.update();
                            }
                        }
                    },
                    'wordWrap': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).wordWrap;
                        },
                        set: function (newValue) {
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
                    },
                    'horizAlign': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).horizAlign;
                        },
                        set: function (newValue) {
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
                    },
                    'vertAlign': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).vertAlign;
                        },
                        set: function (newValue) {
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
                    },
                    'color': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).color;
                        },
                        set: function (newValue) {
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
                    },
                    'fontFamily': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).fontFamily;
                        },
                        set: function (newValue) {
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
                    },
                    'fontSize': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).fontSize;
                        },
                        set: function (newValue) {
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
                    },
                    'fontSizeUnit': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).fontSizeUnit;
                        },
                        set: function (newValue) {
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
                    },
                    'fontBold': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).fontBold;
                        },
                        set: function (newValue) {
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
                    },
                    'fontStyle': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).fontStyle;
                        },
                        set: function (newValue) {
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
                    },
                    'textTransform': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).textTransform;
                        },
                        set: function (newValue) {
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
                    },
                    'textShadows': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).textShadows;
                        },
                        set: function (newValue) {
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
                    },
                    'textDecoration': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).textDecoration;
                        },
                        set: function (newValue) {
                            //#region Variables déclaration
                            const priv = internal(this);
                            const form = this.form;
                            //#endregion Variables déclaration
                        }
                    },
                    'autoSize': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).autoSize;
                        },
                        set: function (newValue) {
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
                    },
                    'textOverflow': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).textOverflow;
                        },
                        set: function (newValue) {
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
                    },
                    'backColor': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).backColor;
                        },
                        set: function (newValue) {
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
                    },
                    'template': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            //#region Variables déclaration
                            const priv = internal(this);
                            let html = super.template;
                            const a = html.split('{caption}');
                            //#endregion Variables déclaration
                            html = a.join(priv.caption);
                            return html;
                        }
                    },
                });
                //#endregion Public Properties
                //#endregion Properties
            }
        }
        //#endregion Constructor
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
            delete this.caption;
            delete this.wordWrap;
            delete this.horizAlign;
            delete this.vertAlign;
            delete this.color;
            delete this.fontFamily;
            delete this.fontSize;
            delete this.fontSizeUnit;
            delete this.fontBold;
            delete this.fontStyle;
            delete this.textTransfor;
            delete this.textShadows;
            delete this.textDecoration;
            delete this.autoSize;
            delete this.textOverflow;
            delete this.backColor;
            delete this.template;
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