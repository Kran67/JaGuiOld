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
//#region SpinBox
const SpinBox = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class SpinBox
    class SpinBox extends CustomTextBoxBtn {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            props.mouseEvents = { wheel: !0 };
            props.stopEvent = !0;
            if (owner) {
                props.numBtns = 2;
                if (!core.isHTMLRenderer) {
                    props.width = 100;
                    props.height = 21;
                }
                props.filterChars = '0123456789.,-';
                props.stopEvent = !0;
                super(owner, props);
                const priv = internal(this);
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'valueType',
                    enum: SPINBOXTYPES,
                    variable: priv,
                    value: props.hasOwnProperty('valueType') ? props.valueType : SPINBOXTYPES.INTEGER
                });
                priv.value = props.hasOwnProperty('value') && core.tools.isNumber(props.value) ? props.value : 0;
                priv.increment = props.hasOwnProperty('increment') && core.tools.isNumber(props.increment) ? props.value : 1;
                priv.decimalDigits = props.hasOwnProperty('decimalDigits') && core.tools.isNumber(props.decimalDigits) ? props.value : 2;
                priv.min = props.hasOwnProperty('min') && core.tools.isNumber(props.min) ? props.min : 0;
                priv.max = props.hasOwnProperty('max') && core.tools.isNumber(props.max) ? props.max : 100;
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
            return internal(this).value;
        }
        set value(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //const decimalSeparator = '.';
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && priv.value !== newValue) {
                newValue = Math.min(Math.max(newValue, priv.min), priv.max);
                priv.value = newValue;
                priv.valueType === SPINBOXTYPES.FLOAT && (priv.value = parseFloat(priv.value.toFixed(priv.decimalDigits)));
                this.text = (Math.frac(priv.value) === 0 || priv.valueType === SPINBOXTYPES.INTEGER)
                    ? parseInt(priv.value, 10).toString()
                    : this.text = priv.value.toString();
                this.onChange.invoke();
            }
        }
        //#endregion value
        //#region increment
        get increment() {
            return internal(this).increment;
        }
        set increment(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isNumber(newValue) && priv.increment !== newValue && (priv.increment = newValue);
        }
        //#endregion increment
        //#region decimalDigits
        get decimalDigits() {
            return internal(this).decimalDigits;
        }
        set decimalDigits(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && priv.decimalDigits !== newValue) {
                priv.decimalDigits = newValue;
                this.update();
            }
        }
        //#endregion decimalDigits
        //#region min
        get min() {
            return internal(this).min;
        }
        set min(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && priv.min !== newValue) {
                priv.min = newValue;
                priv.value = Math.min(priv.value, priv.min);
                this.update();
            }
        }
        //#endregion min
        //#region max
        get max() {
            return internal(this).max;
        }
        set max(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && priv.max !== newValue) {
                priv.max = newValue;
                priv.value = Math.min(priv.value, priv.max);
                this.update();
            }
        }
        //#endregion max
        //#region enabled
        get enabled() {
            return super.enabled;
        }
        set enabled(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isBool(newValue) && this.enabled !== newValue) {
                super.enabled = newValue;
                priv.btnPlus.enabled = newValue;
                priv.btnMinus.enabled = newValue;
            }
        }
        //#endregion enabled
        //#endregion Getters / Setters
        //#region Methods
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.update();
            if (!this.loading && !this.form.loading) {
                if (this.inputObj && this.text === String.EMPTY || !core.tools.isNumber(this.inputObj.value)) {
                    priv.value = 0;
                    this.text = '0';
                    this.inputObj.value = priv.value;
                }
                if (priv.btnMinus && priv.btnPlus) {
                    priv.btnMinus.enabled = !(priv.value === priv.min);
                    priv.btnPlus.enabled = !(priv.value === priv.max);
                }
            }
        }
        //#endregion update
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const btns = this.btns;
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            super.loaded();
            priv.btnPlus = btns.last;
            priv.btnMinus = btns.first;
            priv.btnPlus.repeatClick = true;
            priv.btnMinus.repeatClick = true;
            priv.btnPlus.fontFamily = 'JaGui';
            priv.btnMinus.fontFamily = 'JaGui';
            priv.btnPlus.fontSize = 4;
            priv.btnMinus.fontSize = 4;
            priv.btnMinus.caption = String.EMPTY;
            priv.btnPlus.caption = String.EMPTY;
            priv.btnMinus.HTMLElement.classList.add('SpinBoxMinusBtn');
            priv.btnMinus.HTMLElement.classList.remove('TextBoxBtnButton');
            priv.btnPlus.HTMLElement.classList.add('SpinBoxPlusBtn');
            priv.btnPlus.HTMLElement.classList.remove('TextBoxBtnButton');
            priv.btnMinus.onMouseDown.addListener(this.decValue);
            priv.btnPlus.onMouseDown.addListener(this.incValue);
            htmlElement.addEventListener(core.types.HTMLEVENTS.WHEEL, event => { this.wheel(event); });
        }
        //#endregion loaded
        //#region wheel
        wheel(event) {
            core.mouse.getMouseInfos(event);
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
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
            if (core.keyboard.keyCode === VKeysCodes.VK_DOWN) {
                this.decValue();
            } else if (core.keyboard.keyCode === VKeysCodes.VK_UP) {
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
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.btnPlus = null;
            priv.btnMinus = null;
            priv.valueType = null;
            priv.value = null;
            priv.increment = null;
            priv.decimalDigits = null;
            priv.min = null;
            priv.max = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return SpinBox;
    //#endregion SpinBox
})();
//#endregion SpinBox
core.classes.register(core.types.CATEGORIES.COMMON, SpinBox);
//#region Template
if (core.isHTMLRenderer) {
    const SpinBoxTpl = ['<jagui-spinbox id="{internalId}" data-class="SpinBox" class="Control TextBox SpinBox {theme}">',
        '<properties>{ "name": "{name}", "width": 81, "height": 20 }</properties></jagui-spinbox>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: SpinBox, template: SpinBoxTpl }]);
}
//#endregion
export { SpinBox };