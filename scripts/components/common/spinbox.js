//#region Import
import { CustomTextBoxBtn } from '/scripts/core/customtextboxbtn.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region SPINBOXTYPES
const SPINBOXTYPES = Object.freeze(Object.seal({
    INTEGER: 'integer',
    FLOAT: 'float'
}));
//#endregion SPINBOXTYPES
//#region Class SpinBox
class SpinBox extends CustomTextBoxBtn {
    //#region Private fields
    #value;
    #increment;
    #decimalDigits;
    #min;
    #max;
    #valueType;
    #btnPlus;
    #btnMinus;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        props.mouseEvents = { wheel: !0 };
        if (owner) {
            props.numBtns = 2;
            if (!core.isHTMLRenderer) {
                props.width = 100;
                props.height = 21;
            }
            props.filterChars = '0123456789.,-';
            super(owner, props);
            this.#value = props.hasOwnProperty('value') && core.tools.isNumber(props.value) ? props.value : 0;
            this.#increment = props.hasOwnProperty('increment') && core.tools.isNumber(props.increment)
                ? props.value : 1;
            this.#decimalDigits = props.hasOwnProperty('decimalDigits')
                && core.tools.isNumber(props.decimalDigits) ? props.value : 2;
            this.#min = props.hasOwnProperty('min') && core.tools.isNumber(props.min) ? props.min : 0;
            this.#max = props.hasOwnProperty('max') && core.tools.isNumber(props.max) ? props.max : 100;
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'valueType',
                enum: SPINBOXTYPES,
                value: props.hasOwnProperty('valueType') ? props.valueType : SPINBOXTYPES.INTEGER
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region SPINBOXTYPES
    /**
     * @type    {Object}        SPINBOXTYPES
     */
    static get SPINBOXTYPES() {
        return SPINBOXTYPES;
    }
    //#endregion SPINBOXTYPES
    //#region value
    get value() {
        return this.#value;
    }
    set value(newValue) {
        if (core.tools.isNumber(newValue) && this.#value !== newValue) {
            newValue = Math.min(Math.max(newValue, this.#min), this.#max);
            this.#value = newValue;
            this.#valueType === SPINBOXTYPES.FLOAT && (this.#value = parseFloat(this.#value.toFixed(this.#decimalDigits)));
            this.text = (Math.frac(this.#value) === 0 || this.#valueType === SPINBOXTYPES.INTEGER)
                ? parseInt(this.#value, 10).toString()
                : this.text = this.#value.toString();
            this.onChange.invoke();
        }
    }
    //#endregion value
    //#region increment
    get increment() {
        return this.#increment;
    }
    set increment(newValue) {
        core.tools.isNumber(newValue) && this.#increment !== newValue && (this.#increment = newValue);
    }
    //#endregion increment
    //#region decimalDigits
    get decimalDigits() {
        return this.#decimalDigits;
    }
    set decimalDigits(newValue) {
        if (core.tools.isNumber(newValue) && this.#decimalDigits !== newValue) {
            this.#decimalDigits = newValue;
            this.update();
        }
    }
    //#endregion decimalDigits
    //#region min
    get min() {
        return this.#min;
    }
    set min(newValue) {
        if (core.tools.isNumber(newValue) && this.#min !== newValue) {
            this.#min = newValue;
            this.#value = Math.min(this.#value, this.#min);
            this.update();
        }
    }
    //#endregion min
    //#region max
    get max() {
        return this.#max;
    }
    set max(newValue) {
        if (core.tools.isNumber(newValue) && this.#max !== newValue) {
            this.#max = newValue;
            this.#value = Math.min(this.#value, this.#max);
            this.update();
        }
    }
    //#endregion max
    //#region enabled
    get enabled() {
        return super.enabled;
    }
    set enabled(newValue) {
        if (core.tools.isBool(newValue) && this.enabled !== newValue) {
            super.enabled = newValue;
            this.#btnPlus.enabled = newValue;
            this.#btnMinus.enabled = newValue;
        }
    }
    //#endregion enabled
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        super.update();
        if (!this.loading && !this.form.loading) {
            if (this.inputObj && this.text === String.EMPTY || !core.tools.isNumber(this.inputObj.value)) {
                this.#value = 0;
                this.text = '0';
                this.inputObj.value = this.#value;
            }
            if (this.#btnMinus && this.#btnPlus) {
                this.#btnMinus.enabled = !(this.#value === this.#min);
                this.#btnPlus.enabled = !(this.#value === this.#max);
            }
        }
    }
    //#endregion update
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const btns = this.btns;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.loaded();
        this.#btnPlus = btns.last;
        this.#btnMinus = btns.first;
        this.#btnPlus.repeatClick = true;
        this.#btnMinus.repeatClick = true;
        this.#btnPlus.fontFamily = 'JaGui';
        this.#btnMinus.fontFamily = 'JaGui';
        this.#btnPlus.fontSize = 4;
        this.#btnMinus.fontSize = 4;
        this.#btnMinus.caption = String.EMPTY;
        this.#btnPlus.caption = String.EMPTY;
        this.#btnMinus.HTMLElement.classList.add('SpinBoxMinusBtn');
        this.#btnMinus.HTMLElement.classList.remove('TextBoxBtnButton');
        this.#btnPlus.HTMLElement.classList.add('SpinBoxPlusBtn');
        this.#btnPlus.HTMLElement.classList.remove('TextBoxBtnButton');
        this.#btnMinus.onMouseDown.addListener(this.decValue);
        this.#btnPlus.onMouseDown.addListener(this.incValue);
        htmlElement.addEventListener(core.types.HTMLEVENTS.WHEEL, event => { this.wheel(event); });
    }
    //#endregion loaded
    //#region wheel
    wheel(event) {
        core.mouse.getMouseInfos(event);
        core.mouse.preventDefault(event);
        core.mouse.wheelDir === Mouse.MOUSEWHEELDIRS.DOWN ? this.incValue() : this.decValue();
    }
    //#endregion wheel
    //#region decValue
    decValue() {
        //#region Variables déclaration
        const owner = this instanceof SpinBox ? this : this.owner;
        let value = owner.value -= owner.increment;
        //#endregion Variables déclaration
        if (this.isEnabled && this.mouseEvents.mousedown) {
            value = Math.max(value, owner.min);
            owner.value = value;
        }
    }
    //#endregion decValue
    //#region incValue
    incValue() {
        //#region Variables déclaration
        const owner = this instanceof SpinBox ? this : this.owner;
        let value = owner.value += owner.increment;
        //#endregion Variables déclaration
        if (this.isEnabled && this.mouseEvents.mousedown) {
            value = Math.min(value, owner.max);
            owner.value = value;
        }
    }
    //#endregion incValue
    //#region keyDown
    keyDown() {
        //#region Variables déclaration
        const VKeysCodes = Keyboard.VKEYSCODES;
        //#endregion Variables déclaration
        super.keyDown();
        if (core.keyboard.key === VKeysCodes.VK_DOWN) {
            this.decValue();
        } else if (core.keyboard.key === VKeysCodes.VK_UP) {
            this.incValue();
        }
    }
    //#endregion keyDown
    //#region keyUp
    keyUp() {
        super.keyUp();
        this.value = this.valueType === SPINBOXTYPES.INTEGER ? int(this.inputObj.value) : parseFloat(this.inputObj.value);
    }
    //#endregion keyUp
    //#region mouseWheel
    mouseWheel() {
        //#region Variables déclaration
        const wheelDelta = core.mouse.wheelDelta;
        const multiplier = wheelDelta < 0 ? -1 : 1;
        //#endregion Variables déclaration
        super.mouseWheel();
        multiplier > 0 ? this.incValue() : this.decValue();
        this.form.focusedControl !== this && this.setFocus();
        //core.mouse.preventDefault();
    }
    //#endregion mouseWheel
    //#endregion Methods
}
//#endregion SpinBox
Object.defineProperties(SpinBox.prototype, {
    'value': {
        enumerable: !0
    },
    'increment': {
        enumerable: !0
    },
    'decimalDigits': {
        enumerable: !0
    },
    'min': {
        enumerable: !0
    },
    'max': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.COMMON, SpinBox);
//#region Template
if (core.isHTMLRenderer) {
    const SpinBoxTpl = ['<jagui-spinbox id="{internalId}" data-class="SpinBox" class="Control TextBox SpinBox {theme}">',
        '<properties>{ "name": "{name}", "width": 81, "height": 20 }</properties></jagui-spinbox>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: SpinBox, template: SpinBoxTpl }]);
}
//#endregion
export { SpinBox };