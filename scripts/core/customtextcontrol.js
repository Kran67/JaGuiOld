//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Events } from '/scripts/core/events.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Imports
//#region Class CustomTextControl
class CustomTextControl extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.canFocused = !0;
            props.mouseEvents = { mousedown: !1, mouseup: !1, click: !1 };
            super(owner, props);
            //#region Properties
            //#region Private Properties
            core.private(this, {
                inputObj: null,
                hasError: props.hasOwnProperty('hasError') ? props.hasError : !1,
                text: props.hasOwnProperty('text') ? props.text : String.EMPTY,
                maxLength: props.hasOwnProperty('maxLength') ? props.maxLength : 0,
                readOnly: props.hasOwnProperty('readOnly') ? props.readOnly : !1,
                placeHolder: props.hasOwnProperty('placeHolder') ? props.placeHolder : String.EMPTY,
                filterChars: props.hasOwnProperty('filterChars') ? props.filterChars : String.EMPTY,
                autoTranslate: !0,
                required: props.hasOwnProperty('required') ? props.required : !1,
                errorMsg: props.hasOwnProperty('errorMsg') ? props.errorMsg : String.EMPTY
            });
            let textAligns = core.types.TEXTALIGNS;
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'horizAlign',
                enum: textAligns,
                forceUpdate: !0,
                value: props.hasOwnProperty('horizAlign') ? props.horizAlign : textAligns.CENTER
            });
            textAligns = null;
            let htmlInputTypes = core.types.HTMLINPUTTYPES;
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'type',
                enum: htmlInputTypes,
                forceUpdate: !0,
                value: props.hasOwnProperty('type') ? props.type : htmlInputTypes.TEXT
            });
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
    //#region inputObj
    get inputObj() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set inputObj(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if ((newValue instanceof HTMLInputElement || newValue instanceof HTMLTextAreaElement)
            && priv[propName] !== newValue) {
            htmlElement.removeChild(priv[propName]);
            core.private(this, { [propName]: newValue });
            htmlElement.appendChild(newValue);
        }
    }
    //#endregion inputObj
    //#region hasError
    get hasError() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set hasError(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv[propName] !== newValue
            && core.private(this, { [propName]: newValue });
    }
    //#endregion hasError
    //#region text
    get text() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set text(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && priv[propName] !== newValue) {
            core.private(this, { [propName]: newValue });
            this.propertyChanged(propName);
            !this.loading && !this.form.loading && core.isHTMLRenderer && this.update();
        }
    }
    //#endregion text
    //#region maxLength
    get maxLength() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set maxLength(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv[propName] !== newValue) {
            core.private(this, { [propName]: newValue });
            this.propertyChanged(propName);
            core.isHTMLRenderer && this.update();
        }
    }
    //#endregion maxLength
    //#region readOnly
    get readOnly() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set readOnly(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv[propName] !== newValue) {
            core.private(this, { [propName]: newValue });
            this.propertyChanged(propName);
            core.isHTMLRenderer && this.update();
        }
    }
    //#endregion readOnly
    //#region placeHolder
    get placeHolder() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set placeHolder(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && priv[propName] !== newValue) {
            core.private(this, { [propName]: newValue });
            this.propertyChanged(propName);
            core.isHTMLRenderer && this.update();
        }
    }
    //#endregion placeHolder
    //#region filterChars
    get filterChars() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set filterChars(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        core.tools.isString(newValue) && priv[propName] !== newValue
            && core.private(this, { [propName]: newValue });
    }
    //#endregion filterChars
    //#region autoTranslate
    get autoTranslate() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set autoTranslate(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv[propName] !== newValue
            && core.private(this, { [propName]: newValue });
    }
    //#endregion autoTranslate
    //#region required
    get required() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set required(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv[propName] !== newValue
            && core.private(this, { [propName]: newValue });
    }
    //#endregion required
    //#region errorMsg
    get errorMsg() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set errorMsg(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv[propName] !== newValue
            && core.private(this, { [propName]: newValue });
    }
    //#endregion errorMsg
    //#region enabled
    get enabled() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set enabled(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        const inputObj = priv.inputObj;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this[propName] !== newValue) {
            super[propName] = newValue;
            newValue ? inputObj.removeAttribute('disabled') : inputObj.setAttribute('disabled', 'disabled');
        }
    }
    //#endregion enabled
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        let priv;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (!htmlElement.querySelector('input')) {
            priv = core.private(this, { inputObj: document.createElement(core.types.HTMLELEMENTS.INPUT) });
            priv.inputObj.type = priv.type;
            priv.inputObj.classList.add('csr_text', 'TextBoxInput', `${this.constructor.name}Input`, this.themeName);
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
        const priv = core.private(this);
        const inputObj = priv.inputObj;
        //#endregion Variables déclaration
        if (!this.loading && !this.form.loading && inputObj) {
            inputObj.value = priv.text;
            priv.maxLength > 0 && inputObj.setAttribute('maxlength', priv.maxLength);
            inputObj.setAttribute('placeholder', priv.placeHolder);
            priv.readOnly
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        const filterChars = this.filterChars;
        !core.keyboard.isNavigationKey && filterChars.length > 0
            && filterChars.indexOf(core.keyboard.keyChar) === -1
            && core.keyboard.stopEvent();
        this.textChanged.apply(priv.inputObj);
        super.keyPress();
        this.onChange.invoke();
    }
    //#endregion keyPress
    //#region keyUp
    keyUp() {
        //#region Variables déclaration
        const priv = core.private(this);
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        const inputObj = priv.inputObj;
        super.setFocus();
        this.canFocused && inputObj && inputObj.focus();
    }
    //#endregion setFocus
    //#region selectAll
    selectAll() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.inputObj.setSelectionRange(0, priv.inputObj.value.length);
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
        const priv = core.private(this);
        const inputObj = priv.inputObj;
        const htmlEvents = core.types.HTMLEVENTS;
        //#endregion Variables déclaration
        Events.bind(inputObj, htmlEvents.CHANGE, this.textChanged);
        Events.bind(inputObj, htmlEvents.FOCUS, this.HTMLFocus);
        Events.bind(inputObj, htmlEvents.KILLFOCUS, this.HTMLBlur);
    }
    //#endregion bindEventToHTMLInput
    //#region unbindEventToHTMLInput
    unbindEventToHTMLInput() {
        //#region Variables déclaration
        const priv = core.private(this);
        const inputObj = priv.inputObj;
        const htmlEvents = core.types.HTMLEVENTS;
        //#endregion Variables déclaration
        Events.unBind(inputObj, htmlEvents.CHANGE, this.textChanged);
        Events.unBind(inputObj, htmlEvents.FOCUS, this.HTMLFocus);
        Events.unBind(inputObj, htmlEvents.KILLFOCUS, this.HTMLBlur);
    }
    //#endregion unbindEventToHTMLInput
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, CustomTextControl);
//#endregion Class CustomTextControl
export { CustomTextControl };