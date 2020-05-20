//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Events } from '/scripts/core/events.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Imports
//#region CustomTextControl
const CustomTextControl = (function () {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
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
                props.canFocused = !0;
                props.mouseEvents = { mousedown: !1, mouseup: !1, click: !1 };
                super(owner, props);
                //#region Properties
                //#region Private Properties
                const priv = internal(this);
                priv.inputObj = null;
                priv.hasError = props.hasOwnProperty('hasError') ? props.hasError : !1;
                priv.text = props.hasOwnProperty('text') ? props.text : String.EMPTY;
                priv.maxLength = props.hasOwnProperty('maxLength') ? props.maxLength : 0;
                priv.readOnly = props.hasOwnProperty('readOnly') ? props.readOnly : !1;
                priv.placeHolder = props.hasOwnProperty('placeHolder') ? props.placeHolder : String.EMPTY;
                priv.filterChars = props.hasOwnProperty('filterChars') ? props.filterChars : String.EMPTY;
                priv.autoTranslate = !0;
                priv.required = props.hasOwnProperty('required') ? props.required : !1;
                priv.errorMsg = props.hasOwnProperty('errorMsg') ? props.errorMsg : String.EMPTY;
                let textAligns = core.types.TEXTALIGNS;
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'horizAlign',
                    enum: textAligns,
                    variable: priv,
                    forceUpdate: !0,
                    value: props.hasOwnProperty('horizAlign') ? props.horizAlign : textAligns.CENTER
                });
                textAligns = null;
                let htmlInputTypes = core.types.HTMLINPUTTYPES;
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'type',
                    enum: htmlInputTypes,
                    variable: priv,
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
            return internal(this).inputObj;
        }
        set inputObj(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if ((newValue instanceof HTMLInputElement || newValue instanceof HTMLTextAreaElement)
                && priv.inputObj !== newValue) {
                htmlElement.removeChild(priv.inputObj);
                priv.inputObj = newValue;
                htmlElement.appendChild(priv.inputObj);
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
            core.tools.isBool(newValue) && priv.hasError !== newValue && (priv.hasError = newValue);
        }
        //#endregion hasError
        //#region text
        get text() {
            return this.inputObj.value;
        }
        set text(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isString(newValue) && priv.text !== newValue) {
                priv.text = newValue;
                this.propertyChanged(core.tools.getPropertyName());
                !this.loading && !this.form.loading && core.isHTMLRenderer && this.update();
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
            if (core.tools.isNumber(newValue) && priv.maxLength !== newValue) {
                priv.maxLength = newValue;
                this.propertyChanged(core.tools.getPropertyName());
                core.isHTMLRenderer && this.update();
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
            if (core.tools.isBool(newValue) && priv.readOnly !== newValue) {
                priv.readOnly = newValue;
                this.propertyChanged(core.tools.getPropertyName());
                core.isHTMLRenderer && this.update();
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
            if (core.tools.isString(newValue) && priv.placeHolder !== newValue) {
                priv.placeHolder = newValue;
                this.propertyChanged(core.tools.getPropertyName());
                core.isHTMLRenderer && this.update();
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
            core.tools.isString(newValue) && priv.filterChars !== newValue && (priv.filterChars = newValue);
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
            core.tools.isBool(newValue) && priv.autoTranslate !== newValue && (priv.autoTranslate = newValue);
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
            core.tools.isBool(newValue) && priv.required !== newValue && (priv.required = newValue);
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
            core.tools.isBool(newValue) && priv.errorMsg !== newValue && (priv.errorMsg = newValue);
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
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (!htmlElement.querySelector('input')) {
                priv.inputObj = document.createElement(core.types.HTMLELEMENTS.INPUT);
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
            const priv = internal(this);
            //#endregion Variables déclaration
            const filterChars = this.filterChars;
            !core.keyboard.isNavigationKey && filterChars.length > 0 && filterChars.indexOf(core.keyboard.keyChar) === -1
                && core.keyboard.stopEvent();
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
            const priv = internal(this);
            //#endregion Variables déclaration
            const inputObj = priv.inputObj;
            super.setFocus();
            this.canFocused && inputObj && inputObj.focus();
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
            this.unBindAndDestroyEvents(['onChange']);
            priv.inputObj = null;
            priv.hasError = null;
            priv.text = null;
            priv.maxLength = null;
            priv.readOnly = null;
            priv.placeHolder = null;
            priv.filterChars = null;
            priv.autoTranslate = null;
            priv.required = null;
            priv.errorMsg = null;
            priv.horizAlign = null;
            priv.type = null;
            super.destroy();
        }
        //#endregion destroy
        //#region bindEventToHTMLInput
        bindEventToHTMLInput() {
            //#region Variables déclaration
            const priv = internal(this);
            const inputObj = priv.inputObj;
            const htmlEvents = core.types.HTMLEVENTS;
            const MOUSEEVENTS = Mouse.MOUSEEVENTS;
            //#endregion Variables déclaration
            Events.bind(inputObj, htmlEvents.CHANGE, this.textChanged);
            Events.bind(inputObj, htmlEvents.FOCUS, this.HTMLFocus);
            Events.bind(inputObj, htmlEvents.KILLFOCUS, this.HTMLBlur);
            //Events.bind(inputObj, MOUSEEVENTS.DOWN, () => { core.mouse.stopAllEvent(); });
            //Events.bind(inputObj, MOUSEEVENTS.MOVE, () => { core.mouse.stopAllEvent(); });
            //Events.bind(inputObj, MOUSEEVENTS.UP, () => { core.mouse.stopAllEvent(); });
        }
        //#endregion bindEventToHTMLInput
        //#region unbindEventToHTMLInput
        unbindEventToHTMLInput() {
            //#region Variables déclaration
            const priv = internal(this);
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
    return CustomTextControl;
    //#endregion Class CustomTextControl
})();
core.classes.register(core.types.CATEGORIES.INTERNAL, CustomTextControl);
//#endregion Class CustomTextControl
export { CustomTextControl };