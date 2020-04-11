//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Tools } from '/scripts/core/tools.js';
import { Convert } from '/scripts/core/convert.js';
import { Events } from '/scripts/core/events.js';
import { Keyboard } from '/scripts/core/keyboard.js';
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
                priv.hasError = props.hasOwnProperty('hasError')?props.hasError:!1;
                this.stopEvent = !0;
                priv.text = props.hasOwnProperty('text')?props.text:String.EMPTY;
                priv.maxLength = props.hasOwnProperty('maxLength')?props.maxLength:0;
                priv.readOnly = props.hasOwnProperty('readOnly')?props.readOnly:!1;
                priv.placeHolder = props.hasOwnProperty('placeHolder')?props.placeHolder:String.EMPTY;
                priv.filterChars = props.hasOwnProperty('filterChars')?props.filterChars:String.EMPTY;
                priv.autoTranslate = !0;
                priv.required = props.hasOwnProperty('required')?props.required:!1;
                priv.errorMsg = props.hasOwnProperty('errorMsg')?props.errorMsg:String.EMPTY;
                let textAligns = Types.TEXTALIGNS;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'horizAlign',
                    enum: textAligns,
                    variable: priv,
                    value: props.hasOwnProperty('horizAlign')?props.horizAlign:textAligns.CENTER
                });
                textAligns = null;
                let htmlInputTypes = Types.HTMLINPUTTYPES;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'type',
                    enum: htmlInputTypes,
                    variable: priv,
                    forceUpdate: !0,
                    value: props.hasOwnProperty('type')?props.type:htmlInputTypes.TEXT
                });
                htmlInputTypes = null;
                this.createEventsAndBind(['onChange'], props);
                this.canFocused = !0;
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
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (newValue instanceof HTMLInputElement || newValue instanceof HTMLTextAreaElement) {
                if (priv.inputObj !== newValue) {
                    htmlElement.removeChild(priv.inputObj);
                    priv.inputObj = newValue;
                    htmlElement.appendChild(priv.inputObj);
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
                    this.propertyChanged(Tools.getPropertyName());
                    if (!this.loading && !this.form.loading) {
                        if (Core.isHTMLRenderer) {
                            this.update();
                        }
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
                    this.propertyChanged(Tools.getPropertyName());
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
                    this.propertyChanged(Tools.getPropertyName());
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
                    this.propertyChanged(Tools.getPropertyName());
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
            return super.enabled;
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
                        inputObj.removeAttribute('disabled');
                    } else {
                        inputObj.setAttribute('disabled', 'disabled');
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
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (!htmlElement.querySelector('input')) {
                priv.inputObj = document.createElement(Types.HTMLELEMENTS.INPUT);
                priv.inputObj.type = priv.type;
                priv.inputObj.classList.add('Control', 'csr_text', 'TextBoxInput', `${this.constructor.name}Input`, this.themeName);
                priv.inputObj.jsObj = this;
                htmlElement.appendChild(priv.inputObj);
                this.bindEventToHTMLInput();
            }
            super.loaded();
            this.app.getLocalText(this);
            this.update();
        }
        //#endregion loaded
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const inputObj = priv.inputObj;
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                if (inputObj) {
                    inputObj.value = priv.text;
                    if (priv.maxLength > 0) {
                        inputObj.setAttribute('maxlength', priv.maxLength);
                    }
                    inputObj.setAttribute('placeholder', priv.placeHolder);
                    if (priv.readOnly) {
                        inputObj.setAttribute('readonly', String.EMPTY);
                    } else {
                        inputObj.removeAttribute('readonly');
                    }
                }
            }
        }
        //#endregion update
        //#region textChanged
        textChanged() {
            //#region Variables déclaration
            const jsObj = this.jsObj;
            //#endregion Variables déclaration
            jsObj.text = this.value;
            if (!jsObj.updating) {
                jsObj.onChange.invoke();
            }
        }
        //#endregion textChanged
        //#region keyPress
        keyPress() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            const filterChars = this.filterChars;
            if (!Core.keyboard.isNavigationKey) {
                if (filterChars.length > 0 && filterChars.indexOf(Core.keyboard.keyChar) === -1) {
                    Core.keyboard.stopEvent();
                }
            }
            this.textChanged.apply(priv.inputObj);
            super.keyPress();
            this.onChange.invoke();
        }
        //#endregion keyPress
        //#region keyUp
        keyUp() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.textChanged.apply(priv.inputObj);
            super.keyUp();
            this.onChange.invoke();
        }
        //#endregion keyUp
        //#region HTMLFocus
        HTMLFocus() {
            //#region Variables déclaration
            const jsObj = this.jsObj;
            //#endregion Variables déclaration
            if (jsObj.canFocused) {
                jsObj.enterFocus();
            }
        }
        //#ndregion HTMLFocus
        //#region HTMLBlur
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
        //#endregion HTMLBlur
        //#region setFocus
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
        //#endregion setFocus
        //#region selectAll
        selectAll() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.inputObj.setSelectionRange(0, priv.inputObj.value.length);
        }
        //#endregion selectAll
        //#region destroy
        destroy() {
            this.unbindEventToHTMLInput();
            this.onChange.destroy();
            super.destroy();
        }
        //#endregion destroy
        //#region bindEventToHTMLInput
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
        //#endregion bindEventToHTMLInput
        //#region unbindEventToHTMLInput
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
        //#endregion unbindEventToHTMLInput
        //#endregion Methods
    }
    return CustomTextControl;
    //#endregion Class CustomTextControl
})();
//#region BaseWindow defineProperties
Object.defineProperties(CustomTextControl, {
    'text': {
        enumerable: !0
    },
    'maxLength': {
        enumerable: !0
    },
    'readOnly': {
        enumerable: !0
    },
    'placeHolder': {
        enumerable: !0
    },
    'filterChars': {
        enumerable: !0
    },
    'autoTranslate': {
        enumerable: !0
    },
    'required': {
        enumerable: !0
    },
    'errorMsg': {
        enumerable: !0
    }
});
//#endregion BaseWindow defineProperties
//#endregion Class CustomTextControl
Core.classes.register(Types.CATEGORIES.INTERNAL, CustomTextControl);
export { CustomTextControl };