//#region Imports
import { ThemedControl } from "/scripts/core/themedcontrol.js";
import { Tools } from "/scripts/core/tools.js";
import { Convert } from "/scripts/core/convert.js";
import { Events } from "/scripts/core/events.js";
import { Keyboard } from "/scripts/core/keyboard.js";
//#endregion Imports
//#region CustomTextControl
const CustomTextControl = (function () {
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
    //#region Class CustomTextControl
    class CustomTextControl extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.inputObj = null;
                priv.hasError = props.hasOwnProperty("hasError")?props.hasError:false;
                this.stopEvent = false;
                priv.text = props.hasOwnProperty("text")?props.text:String.EMPTY;
                priv.maxLength = props.hasOwnProperty("maxLength")?props.maxLength:0;
                priv.readOnly = props.hasOwnProperty("readOnly")?props.readOnly:false;
                priv.placeHolder = props.hasOwnProperty("placeHolder")?props.placeHolder:String.EMPTY;
                priv.filterChars = props.hasOwnProperty("filterChars")?props.filterChars:String.EMPTY;
                priv.autoTranslate = true;
                priv.required = props.hasOwnProperty("required")?props.required:false;
                priv.errorMsg = props.hasOwnProperty("errorMsg")?props.errorMsg:String.EMPTY;
                this.addBindableProperties(["text", "readOnly", "placeHolder", "autoTranslate", "horizAlign"]);
                let textAligns = Types.TEXTALIGNS;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "horizAlign",
                    enum: textAligns,
                    variable: priv,
                    value: props.hasOwnProperty("horizAlign")?props.horizAlign:textAligns.CENTER
                });
                textAligns = null;
                let htmlInputTypes = Types.HTMLINPUTTYPES;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "type",
                    enum: htmlInputTypes,
                    variable: priv,
                    forceUpdate: true,
                    value: props.hasOwnProperty("type")?props.type:htmlInputTypes.TEXT
                });
                htmlInputTypes = null;
                this.onChange = new Core.classes.NotifyEvent(this);
                this.canFocused = true;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region inputObj
        get inputObj() {
            return internal(this).inputObj;
        }
        set inputObj(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof HTMLInputElement) {
                if (priv.inputObj !== newValue) {
                    priv.inputObj = newValue;
                }
            }
        }
        //#endregion inputObj
        //#region hasError
        get hasError() {
            return internal(this).hasError;
        }
        set hasError(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.hasError !== newValue) {
                    priv.hasError = newValue;
                }
            }
        }
        //#endregion hasError
        //#region stopEvent
        get stopEvent() {
            return internal(this).stopEvent;
        }
        set stopEvent(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.stopEvent !== newValue) {
                    priv.stopEvent = newValue;
                }
            }
        }
        //#endregion stopEvent
        //#region text
        get text() {
            return this.inputObj.value;
        }
        set text(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.text !== newValue) {
                    priv.text = newValue;
                    priv.inputObj.value = priv.text;
                    if ((this.loading || this.form.loading)) {
                        return;
                    }
                    if (Core.isHTMLRenderer) {
                        this.update();
                    }
                }
            }
        }
        //#endregion text
        //#region maxLength
        get maxLength() {
            return internal(this).maxLength;
        }
        set maxLength(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.maxLength !== newValue) {
                    priv.maxLength = newValue;
                    if (Core.isHTMLRenderer) {
                        this.update();
                    }
                }
            }
        }
        //#endregion maxLength
        //#region readOnly
        get readOnly() {
            return internal(this).readOnly;
        }
        set readOnly(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.readOnly !== newValue) {
                    priv.readOnly = newValue;
                    if (Core.isHTMLRenderer) {
                        this.update();
                    }
                }
            }
        }
        //#endregion readOnly
        //#region placeHolder
        get placeHolder() {
            return internal(this).placeHolder;
        }
        set placeHolder(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.placeHolder !== newValue) {
                    priv.placeHolder = newValue;
                    if (Core.isHTMLRenderer) {
                        this.update();
                    }
                }
            }
        }
        //#endregion placeHolder
        //#region filterChars
        get filterChars() {
            return internal(this).filterChars;
        }
        set filterChars(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.filterChars !== newValue) {
                    priv.filterChars = newValue;
                }
            }
        }
        //#endregion filterChars
        //#region autoTranslate
        get autoTranslate() {
            return internal(this).autoTranslate;
        }
        set autoTranslate(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.autoTranslate !== newValue) {
                    priv.autoTranslate = newValue;
                }
            }
        }
        //#endregion autoTranslate
        //#region required
        get required() {
            return internal(this).required;
        }
        set required(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.required !== newValue) {
                    priv.required = newValue;
                }
            }
        }
        //#endregion required
        //#region errorMsg
        get errorMsg() {
            return internal(this).errorMsg;
        }
        set errorMsg(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.errorMsg !== newValue) {
                    priv.errorMsg = newValue;
                }
            }
        }
        //#endregion errorMsg
        //#region enabled
        get enabled() {
            return internal(this).enabled;
        }
        set enabled(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const inputObj = priv.inputObj;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (this.enabled !== newValue) {
                    super.enabled = newValue;
                    if (this.enabled) {
                        inputObj.removeAttribute("disabled");
                    } else {
                        inputObj.setAttribute("disabled", "disabled");
                    }
                }
            }
        }
        //#endregion enabled
        //#region _horizAlign
        _horizAlign(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, Types.TEXTALIGNS)) {
                if (newValue !== priv.horizAlign) {
                    priv.horizAlign = newValue;
                    if ((!this.loading && !this.form.loading)) {
                        if (this.allowUpdate) {
                            this.update();
                        }
                        if (!Core.isHTMLRenderer) {
                            this.form.addControlToRedraw(this);
                        }
                    }
                }
            }
        }
        //#endregion _horizAlign
        //#endregion Getters / Setters
        //#region Methods
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (!htmlElement.querySelector("input")) {
                priv.inputObj = document.createElement(Types.HTMLELEMENTS.INPUT);
                priv.inputObj.type = "text";
                priv.inputObj.classList.add("Control", "csr_text", "TextBoxInput", `${this.constructor.name}Input`, this.themeName);
                priv.inputObj.jsObj = this;
                htmlElement.appendChild(priv.inputObj);
                this.bindEventToHTMLInput();
            }
            this.bindEventToHTML("onChange");
            super.loaded();
            this.app.getLocalText(this);
            this.update();
        }
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const inputObj = priv.inputObj;
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                if (inputObj) {
                    inputObj.value = priv.text;
                    if (priv.maxLength > 0) {
                        inputObj.setAttribute("maxlength", priv.maxLength);
                    }
                    inputObj.setAttribute("placeholder", priv.placeHolder);
                    if (priv.readOnly) {
                        inputObj.setAttribute("readonly", String.EMPTY);
                    } else {
                        inputObj.removeAttribute("readonly");
                    }
                }
            }
        }
        //getHTMLElement(id) {
        //    //#region Variables déclaration
        //    const priv = internal(this);
        //    //#endregion Variables déclaration
        //    super.getHTMLElement(id);
        //    const htmlElement = this.HTMLElement;
        //    if (htmlElement) {
        //        priv.inputObj = htmlElement.querySelector("input");
        //        priv.inputObj.jsObj = this;
        //        this.bindEventToHTMLInput();
        //    }
        //}
        textChanged() {
            //#region Variables déclaration
            const jsObj = this.jsObj;
            //#endregion Variables déclaration
            jsObj.text = this.value;
            if (!jsObj.updating) {
                jsObj.onChange.invoke();
            }
        }
        keyPress() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            const filterChars = this.filterChars;
            if (!Core.keyboard.isNavigationKey) {
                if (filterChars.length > 0 && filterChars.indexOf(Core.keyboard.keyChar) === -1) {
                    Core.keyboard.stopEvent();
                }
                //else this.onChange.invoke();
            }
            this.textChanged.apply(priv.inputObj);
            super.keyPress();
            this.onChange.invoke();
        }
        keyUp() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.textChanged.apply(priv.inputObj);
            super.keyUp();
            this.onChange.invoke();
        }
        HTMLFocus() {
            //#region Variables déclaration
            const jsObj = this.jsObj;
            //#endregion Variables déclaration
            if (jsObj.canFocused) {
                jsObj.enterFocus();
            }
        }
        HTMLBlur() {
            //#region Variables déclaration
            const jsObj = this.jsObj;
            //#endregion Variables déclaration
            if (jsObj.form.focusedControl === jsObj) {
                if (jsObj.app.activeWindow === jsObj.form) {
                    this.focus();
                } else {
                    this.blur();
                }
            }
        }
        setFocus() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            const inputObj = priv.inputObj;
            super.setFocus();
            if (this.canFocused) {
                if (inputObj) {
                    //this.selectAll();
                    inputObj.focus();
                }
            }
        }
        selectAll() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.inputObj.setSelectionRange(0, priv.inputObj.value.length);
        }
        destroy() {
            this.unbindEventToHTMLInput();
            this.onChange.destroy();
            super.destroy();
        }
        bindEventToHTMLInput() {
            //#region Variables déclaration
            const priv = internal(this);
            const inputObj = priv.inputObj;
            const htmlEvents = Types.HTMLEVENTS;
            const KEYBORDEVENTS = Keyboard.KEYBORDEVENTS;
            //#endregion Variables déclaration
            Events.bind(inputObj, htmlEvents.CHANGE, this.textChanged);
            Events.bind(inputObj, htmlEvents.FOCUS, this.HTMLFocus);
            Events.bind(inputObj, htmlEvents.KILLFOCUS, this.HTMLBlur);
            Events.bind(inputObj, KEYBORDEVENTS.DOWN, this.dispatchEvent);
            Events.bind(inputObj, KEYBORDEVENTS.UP, this.dispatchEvent);
            Events.bind(inputObj, KEYBORDEVENTS.PRESS, this.dispatchEvent);
        }
        unbindEventToHTMLInput() {
            //#region Variables déclaration
            const priv = internal(this);
            const inputObj = priv.inputObj;
            const htmlEvents = Types.HTMLEVENTS;
            const KEYBORDEVENTS = Keyboard.KEYBORDEVENTS;
            //#endregion Variables déclaration
            Events.unBind(inputObj, htmlEvents.CHANGE, this.textChanged);
            Events.unBind(inputObj, htmlEvents.FOCUS, this.HTMLFocus);
            Events.unBind(inputObj, htmlEvents.KILLFOCUS, this.HTMLBlur);
            Events.unBind(inputObj, KEYBORDEVENTS.DOWN, this.dispatchEvent);
            Events.unBind(inputObj, KEYBORDEVENTS.UP, this.dispatchEvent);
            Events.unBind(inputObj, KEYBORDEVENTS.PRESS, this.dispatchEvent);
        }
        //#endregion
    }
    return CustomTextControl;
    //#endregion Class CustomTextControl
})();
//#region BaseWindow defineProperties
Object.defineProperties(CustomTextControl, {
    "text": {
        enumerable: true
    },
    "maxLength": {
        enumerable: true
    },
    "readOnly": {
        enumerable: true
    },
    "placeHolder": {
        enumerable: true
    },
    "filterChars": {
        enumerable: true
    },
    "autoTranslate": {
        enumerable: true
    },
    "required": {
        enumerable: true
    },
    "errorMsg": {
        enumerable: true
    }
});
//#endregion BaseWindow defineProperties
//#endregion Class CustomTextControl
Core.classes.register(Types.CATEGORIES.INTERNAL, CustomTextControl);
export { CustomTextControl };