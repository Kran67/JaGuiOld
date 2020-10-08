//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Events } from '/scripts/core/events.js';
//#endregion Imports
//#region Class CustomTextControl
class CustomTextControl extends ThemedControl {
    //#region Private fields
    #inputObj = null;
    #hasError;
    #text;
    #maxLength;
    #readOnly;
    #placeHolder;
    #filterChars;
    #autoTranslate = !0;
    #required;
    #errorMsg;
    #horizAlign;
    #type;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.canFocused = !0;
            props.mouseEvents = { mousedown: !1, mouseup: !1, click: !1 };
            super(owner, props);
            //#region Properties
            //#region Private Properties
            this.#hasError = props.hasOwnProperty('hasError') ? props.hasError : !1;
            this.#text = props.hasOwnProperty('text') ? props.text : String.EMPTY;
            this.#maxLength = props.hasOwnProperty('maxLength') ? props.maxLength : 0;
            this.#readOnly = props.hasOwnProperty('readOnly') ? props.readOnly : !1;
            this.#placeHolder = props.hasOwnProperty('placeHolder') ? props.placeHolder : String.EMPTY;
            this.#filterChars = props.hasOwnProperty('filterChars') ? props.filterChars : String.EMPTY;
            this.#required = props.hasOwnProperty('required') ? props.required : !1;
            this.#errorMsg = props.hasOwnProperty('errorMsg') ? props.errorMsg : String.EMPTY;
            let textAligns = core.types.TEXTALIGNS;
            this.#horizAlign = props.hasOwnProperty('horizAlign') ? props.horizAlign : textAligns.CENTER;
            this.addPropertyEnum('horizAlign', textAligns);
            textAligns = null;
            let htmlInputTypes = core.types.HTMLINPUTTYPES;
            this.#type = props.hasOwnProperty('type') ? props.type : htmlInputTypes.TEXT;
            this.addPropertyEnum('type', htmlInputTypes);
            htmlInputTypes = null;
            //#endregion Private Properties
            //#region Public Properties
            this.createEventsAndBind(['onChange'], props);
            //#endregion Public Properties
            //#endregion Properties
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region horizAlign
    get horizAlign() {
        return this.#horizAlign;
    }
    set horizAlign(newValue) {
        if (core.tools.valueInSet(newValue, core.types.TEXTALIGNS) && this.#horizAlign !== newValue) {
            this.#horizAlign = newValue;
            this.update && !this.loading && !this.form.creating && !this.form.loading && this.update();
        }
    }
    //#endregion horizAlign
    //#region type
    get type() {
        return this.#type;
    }
    set type(newValue) {
        if (core.tools.valueInSet(newValue, core.types.HTMLINPUTTYPES) && this.#type !== newValue) {
            this.#type = newValue;
            this.update && !this.loading && !this.form.creating && !this.form.loading && this.update();
        }
    }
    //#endregion type
    //#region inputObj
    get inputObj() {
        return this.#inputObj;
    }
    set inputObj(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if ((newValue instanceof HTMLInputElement || newValue instanceof HTMLTextAreaElement)
            && this.#inputObj !== newValue) {
            htmlElement.removeChild(this.#inputObj);
            this.#inputObj = newValue;
            htmlElement.appendChild(newValue);
        }
    }
    //#endregion inputObj
    //#region hasError
    get hasError() {
        return this.#hasError;
    }
    set hasError(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && this.#hasError !== newValue
            && (this.#hasError = newValue);
        htmlElement.classList[newValue ? 'add' : 'remove']('haserror');
    }
    //#endregion hasError
    //#region text
    get text() {
        return this.#text;
    }
    set text(newValue) {
        if (core.tools.isString(newValue) && this.#text !== newValue) {
            this.#text = newValue;
            this.propertyChanged('text');
            !this.loading && !this.form.loading && core.isHTMLRenderer && this.update();
        }
    }
    //#endregion text
    //#region maxLength
    get maxLength() {
        return this.#maxLength;
    }
    set maxLength(newValue) {
        if (core.tools.isNumber(newValue) && this.#maxLength !== newValue) {
            this.#maxLength = newValue;
            this.propertyChanged('maxLength');
            core.isHTMLRenderer && this.update();
        }
    }
    //#endregion maxLength
    //#region readOnly
    get readOnly() {
        return this.#readOnly;
    }
    set readOnly(newValue) {
        if (core.tools.isBool(newValue) && this.#readOnly !== newValue) {
            this.#readOnly = newValue;
            this.propertyChanged('readOnly');
            core.isHTMLRenderer && this.update();
        }
    }
    //#endregion readOnly
    //#region placeHolder
    get placeHolder() {
        return this.#placeHolder;
    }
    set placeHolder(newValue) {
        if (core.tools.isString(newValue) && this.#placeHolder !== newValue) {
            this.#placeHolder = newValue;
            this.propertyChanged('placeHolder');
            core.isHTMLRenderer && this.update();
        }
    }
    //#endregion placeHolder
    //#region filterChars
    get filterChars() {
        return this.#filterChars;
    }
    set filterChars(newValue) {
        core.tools.isString(newValue) && this.#filterChars !== newValue
            && (this.#filterChars = newValue);
    }
    //#endregion filterChars
    //#region autoTranslate
    get autoTranslate() {
        return this.#autoTranslate;
    }
    set autoTranslate(newValue) {
        core.tools.isBool(newValue) && this.#autoTranslate !== newValue
            && (this.#autoTranslate = newValue);
    }
    //#endregion autoTranslate
    //#region required
    get required() {
        return this.#required;
    }
    set required(newValue) {
        core.tools.isBool(newValue) && this.#required !== newValue
            && (this.#required = newValue);
    }
    //#endregion required
    //#region errorMsg
    get errorMsg() {
        return this.#errorMsg;
    }
    set errorMsg(newValue) {
        core.tools.isString(newValue) && this.#errorMsg !== newValue
            && (this.#errorMsg = newValue);
    }
    //#endregion errorMsg
    //#region enabled
    get enabled() {
        return super.enabled;
    }
    set enabled(newValue) {
        //#region Variables déclaration
        const inputObj = this.#inputObj;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.enabled !== newValue) {
            super.enabled = newValue;
            newValue ? inputObj.removeAttribute('disabled') : inputObj.setAttribute('disabled', 'disabled');
        }
    }
    //#endregion enabled
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (!htmlElement.querySelector('input')) {
            this.#inputObj = document.createElement(core.types.HTMLELEMENTS.INPUT);
            this.#inputObj.type = this.#type;
            this.#inputObj.classList.add('csr_text', 'TextBoxInput', `${this.constructor.name}Input`, this.themeName);
            this.#inputObj.jsObj = this;
            htmlElement.appendChild(this.#inputObj);
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
        const inputObj = this.#inputObj;
        //#endregion Variables déclaration
        if (!this.loading && !this.form.loading && inputObj) {
            inputObj.value = this.#text;
            this.#maxLength > 0 && inputObj.setAttribute('maxlength', this.#maxLength);
            inputObj.setAttribute('placeholder', this.#placeHolder);
            this.#readOnly
                ? inputObj.setAttribute('readonly', String.EMPTY)
                : inputObj.removeAttribute('readonly');
        }
    }
    //#endregion update
    //#region textChanged
    textChanged() {
        //#region Variables déclaration
        const jsObj = this.jsObj;
        //#endregion Variables déclaration
        jsObj.text = this.value;
        !jsObj.updating && jsObj.onChange.invoke();
    }
    //#endregion textChanged
    //#region keyPress
    keyPress() {
        const filterChars = this.filterChars;
        !core.keyboard.isNavigationKey && filterChars.length > 0
            && filterChars.indexOf(core.keyboard.key) === -1
            && core.keyboard.stopEvent();
        //this.textChanged.apply(this.#inputObj);
        super.keyPress();
        //this.onChange.invoke();
    }
    //#endregion keyPress
    //#region keyUp
    keyUp() {
        this.textChanged.apply(this.#inputObj);
        super.keyUp();
        this.onChange.invoke();
    }
    //#endregion keyUp
    //#region HTMLFocus
    HTMLFocus() {
        //#region Variables déclaration
        const jsObj = this.jsObj;
        //#endregion Variables déclaration
        jsObj.canFocused && jsObj.setFocus();
    }
    //#endregion HTMLFocus
    //#region HTMLBlur
    HTMLBlur() {
        //#region Variables déclaration
        const jsObj = this.jsObj;
        //#endregion Variables déclaration
        jsObj.form.focusedControl === jsObj && this.blur();
    }
    //#endregion HTMLBlur
    //#region setFocus
    setFocus() {
        const inputObj = this.#inputObj;
        super.setFocus();
        this.canFocused && inputObj && inputObj.focus();
    }
    //#endregion setFocus
    //#region selectAll
    selectAll() {
        this.#inputObj.setSelectionRange(0, this.#inputObj.value.length);
    }
    //#endregion selectAll
    //#region destroy
    destroy() {
        this.unbindEventToHTMLInput();
        this.unBindAndDestroyEvents(['onChange']);
        super.destroy();
    }
    //#endregion destroy
    //#region bindEventToHTMLInput
    bindEventToHTMLInput() {
        //#region Variables déclaration
        const inputObj = this.#inputObj;
        const htmlEvents = core.types.HTMLEVENTS;
        //#endregion Variables déclaration
        Events.bind(inputObj, htmlEvents.INPUT, this.textChanged);
        Events.bind(inputObj, htmlEvents.FOCUS, this.HTMLFocus);
        Events.bind(inputObj, htmlEvents.KILLFOCUS, this.HTMLBlur);
    }
    //#endregion bindEventToHTMLInput
    //#region unbindEventToHTMLInput
    unbindEventToHTMLInput() {
        //#region Variables déclaration
        const inputObj = this.#inputObj;
        const htmlEvents = core.types.HTMLEVENTS;
        //#endregion Variables déclaration
        Events.unBind(inputObj, htmlEvents.INPUT, this.textChanged);
        Events.unBind(inputObj, htmlEvents.FOCUS, this.HTMLFocus);
        Events.unBind(inputObj, htmlEvents.KILLFOCUS, this.HTMLBlur);
    }
    //#endregion unbindEventToHTMLInput
    //#endregion Methods
}
Object.defineProperties(CustomTextControl.prototype, {
    'hasError': {
        enumerable: !0
    },
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
    'required': {
        enumerable: !0
    },
    'errorMsg': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.INTERNAL, CustomTextControl);
//#endregion Class CustomTextControl
export { CustomTextControl };