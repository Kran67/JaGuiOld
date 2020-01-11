import { ThemedControl } from "/scripts/core/themedcontrol.js";
import { Tools } from "/scripts/core/tools.js";
import { Convert } from "/scripts/core/convert.js";
//import { NotifyEvent } from "/scripts/core/events.js";
import { Keyboard } from "/scripts/core/keyboard.js";
//#region CustomTextControl
const CustomTextControl = (function () {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class CustomTextControl extends ThemedControl {
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.inputObj = null;
                priv.hasError = false;
                priv.stopEvent = false;
                priv.text = String.EMPTY;
                priv.maxLength = 0;
                priv.readOnly = false;
                priv.placeHolder = String.EMPTY;
                priv.filterChars = String.EMPTY;
                priv.autoTranslate = true;
                priv.required = false;
                priv.errorMsg = String.EMPTY;
                priv.horizAlign = Types.TEXTALIGNS.CENTER;
                priv.type = Types.HTMLINPUTTYPES.TEXT;
                this.addBindableProperties(["text", "readOnly", "placeHolder", "autoTranslate", "horizAlign"]);
                //#region Private
                //#endregion
                let textAligns = Types.TEXTALIGNS;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "horizAlign",
                    enum: textAligns
                });
                textAligns = null;
                let htmlInputTypes = Types.HTMLINPUTTYPES;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "type",
                    enum: htmlInputTypes,
                    forceUpdate: true
                });
                htmlInputTypes = null;
                this.onChange = new Core.classes.NotifyEvent(this);
                this.canFocused = true;
            }
        }
        //#region setter
        get inputObj() {
            return internal(this).inputObj;
        }
        set inputObj(newValue) {
            const priv = internal(this);
            if (newValue instanceof HTMLInputElement) {
                if (priv.inputObj !== newValue) {
                    priv.inputObj = newValue;
                }
            }
        }
        get hasError() {
            return internal(this).hasError;
        }
        set hasError(newValue) {
            const priv = internal(this);
            if (typeof newValue === BOOLEAN) {
                if (priv.hasError !== newValue) {
                    priv.hasError = newValue;
                    //this.HTMLElement.dataset.haserror = this._hasError;
                }
            }
        }
        get stopEvent() {
            return internal(this).stopEvent;
        }
        set stopEvent(newValue) {
            const priv = internal(this);
            if (typeof newValue === BOOLEAN) {
                if (priv.stopEvent !== newValue) {
                    priv.stopEvent = newValue;
                }
            }
        }
        get text() {
            return this.inputObj.value;
        }
        set text(newValue) {
            const priv = internal(this);
            if (typeof newValue === STRING) {
                if (priv.text !== newValue) {
                    priv.text = newValue;
                    priv.inputObj.value = priv.text;
                    if ((this.loading || this.form.loading)/* && !Tools.Debugger.useFragment*/) {
                        return;
                    }
                    if (Core.isHTMLRenderer) {
                        this.update();
                    }
                }
            }
        }
        get maxLength() {
            return internal(this).maxLength;
        }
        set maxLength(newValue) {
            const priv = internal(this);
            if (typeof newValue === NUMBER) {
                if (priv.maxLength !== newValue) {
                    priv.maxLength = newValue;
                    if (Core.isHTMLRenderer) {
                        this.update();
                    }
                }
            }
        }
        get readOnly() {
            return internal(this).readOnly;
        }
        set readOnly(newValue) {
            const priv = internal(this);
            if (typeof newValue === BOOLEAN) {
                if (priv.readOnly !== newValue) {
                    priv.readOnly = newValue;
                    if (Core.isHTMLRenderer) {
                        this.update();
                    }
                }
            }
        }
        get placeHolder() {
            return internal(this).placeHolder;
        }
        set placeHolder(newValue) {
            const priv = internal(this);
            if (typeof newValue === STRING) {
                if (priv.placeHolder !== newValue) {
                    priv.placeHolder = newValue;
                    if (Core.isHTMLRenderer) {
                        this.update();
                    }
                }
            }
        }
        get filterChars() {
            return internal(this).filterChars;
        }
        set filterChars(newValue) {
            const priv = internal(this);
            if (typeof newValue === STRING) {
                if (priv.filterChars !== newValue) {
                    priv.filterChars = newValue;
                }
            }
        }
        get autoTranslate() {
            return internal(this).autoTranslate;
        }
        set autoTranslate(newValue) {
            const priv = internal(this);
            if (typeof newValue === BOOLEAN) {
                if (priv.autoTranslate !== newValue) {
                    priv.autoTranslate = newValue;
                }
            }
        }
        get required() {
            return internal(this).required;
        }
        set required(newValue) {
            const priv = internal(this);
            if (typeof newValue === BOOLEAN) {
                if (priv.required !== newValue) {
                    priv.required = newValue;
                }
            }
        }
        get errorMsg() {
            return internal(this).errorMsg;
        }
        set errorMsg(newValue) {
            const priv = internal(this);
            if (typeof newValue === BOOLEAN) {
                if (priv.errorMsg !== newValue) {
                    priv.errorMsg = newValue;
                }
            }
        }
        get enabled() {
            return internal(this).enabled;
        }
        set enabled(newValue) {
            const priv = internal(this);
            const inputObj = priv.inputObj;
            if (typeof newValue === BOOLEAN) {
                if (this.enabled !== newValue) {
                    super.enabled = newValue; // Gros point noir ici
                    if (this.enabled) {
                        inputObj.removeAttribute("disabled");
                    } else {
                        inputObj.setAttribute("disabled", "disabled");
                    }
                }
            }
        }
        _horizAlign(newValue) {
            if (Tools.valueInSet(newValue, Types.TEXTALIGNS)) {
                if (newValue !== this.horizAlign) {
                    this.horizAlign = newValue;
                    if ((!this.loading && !this.form.loading)/* && !Tools.Debugger.useFragment*/) {
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
        //#endregion
        //#region Methods
        loaded() {
            super.loaded();
            //if (this._text===String.EMPTY) this._text=this.name;
        }
        update() {
            const inputObj = this.inputObj;
            if (!this.loading && !this.form.loading) {
                if (inputObj) {
                    inputObj.value = this.text;
                    if (this.maxLength > 0) {
                        inputObj.setAttribute("maxlength", this.maxLength);
                    }
                    inputObj.setAttribute("placeholder", this.placeHolder);
                    if (this.readOnly) {
                        inputObj.setAttribute("readonly", String.EMPTY);
                    } else {
                        inputObj.removeAttribute("readonly");
                    }
                }
            }
        }
        getChildsHTMLElement() {
            if (this.HTMLElement) {
                this.inputObj = this.HTMLElement.firstElementChild;
                this.inputObj.jsObj = this;
                this.bindEventToHTMLInput();
            }
        }
        updateFromHTML() {
            //let data = this.HTMLElement.dataset.horizalign;
            //if (data) this.horizAlign = data;
            //this._maxLength = ~~parseFloat(this.HTMLElement.getAttribute("maxlength")) | 0;
            //data = this.HTMLElement.dataset.readonly;
            //if (data) this.readOnly = Convert.strToBool(data);
            //data = this.HTMLElement.dataset.haserror;
            //if (data) this.hasError = Convert.strToBool(data);
            //this.placeHolder = this.inputObj.getAttribute("placeholder");
            //if (!this.placeHolder) this.placeHolder = String.EMPTY;
            //data = this.HTMLElement.dataset.filterchars;
            //if (data) this.filterChars = data;
            //data = this.HTMLElement.dataset.required;
            //if (data) this.required = Convert.strToBool(data);
            //data = this.HTMLElement.dataset.errormsg;
            //if (data) this.errorMsg = data;
            this.app.getLocalText(this);
            this.bindEventToHTML("onChange");
            //if (this._required) {
            //  this._requiredElement=document.createElement(Types.HTMLElements.DIV);
            //  this._requiredElement.dataset.jsonname="required";
            //  this._requiredElement.innerHTML="*";
            //  this._requiredElement.display="none";
            //  this.HTMLElement.appendChild(this._requiredElement);
            //}
            super.updateFromHTML();
        }
        textChanged() {
            const jsObj = this.jsObj;
            jsObj.text = this.value;
            if (!jsObj.updating) {
                jsObj.onChange.invoke();
            }
        }
        keyPress() {
            const filterChars = this.filterChars;
            if (!Core.keyboard.isNavigationKey()) {
                if (filterChars.length > 0 && filterChars.indexOf(Core.keyboard.keyChar) === -1) {
                    Core.keyboard.stopEvent();
                }
                //else this.onChange.invoke();
            }
            this.textChanged.apply(this.inputObj);
            super.keyPress();
            this.onChange.invoke();
        }
        keyUp() {
            this.textChanged.apply(this.inputObj);
            //this.HTMLElement.dataset.length = this.inputObj.value.length;
            super.keyUp();
            this.onChange.invoke();
        }
        HTMLFocus() {
            const jsObj = this.jsObj;
            if (jsObj.canFocused) {
                jsObj.enterFocus();
            }
        }
        HTMLBlur() {
            const jsObj = this.jsObj;
            if (jsObj.form.focusedControl === jsObj) {
                if (jsObj.app.activeWindow === jsObj.form) {
                    this.focus();
                } else {
                    this.blur();
                }
            }
        }
        setFocus() {
            const inputObj = this.inputObj;
            super.setFocus();
            if (this.canFocused) {
                if (inputObj) {
                    //this.selectAll();
                    inputObj.focus();
                }
            }
        }
        selectAll() {
            this.inputObj.setSelectionRange(0, this.inputObj.value.length);
        }
        destroy() {
            this.unbindEventToHTMLInput();
            this.onChange.destroy();
            super.destroy();
        }
        bindEventToHTMLInput() {
            const inputObj = this.inputObj;
            const htmlEvents = Types.HTMLEvents;
            const KEYBORDEVENTS = Keyboard.KEYBORDEVENTS;
            Events.bind(inputObj, htmlEvents.CHANGE, this.textChanged);
            Events.bind(inputObj, htmlEvents.FOCUS, this.HTMLFocus);
            Events.bind(inputObj, htmlEvents.KILLFOCUS, this.HTMLBlur);
            Events.bind(inputObj, KEYBORDEVENTS.DOWN, this.dispatchEvent);
            Events.bind(inputObj, KEYBORDEVENTS.UP, this.dispatchEvent);
            Events.bind(inputObj, KEYBORDEVENTS.PRESS, this.dispatchEvent);
        }
        unbindEventToHTMLInput() {
            const inputObj = this.inputObj;
            const htmlEvents = Types.HTMLEvents;
            const KEYBORDEVENTS = Keyboard.KEYBORDEVENTS;
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
})();
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
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, CustomTextControl);
export { CustomTextControl };