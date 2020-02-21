//#region Import
import { CustomTextBoxBtn } from '/scripts/core/customtextboxbtn.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region SPINBOXTYPES
const SPINBOXTYPES = {
    INTEGER: 'integer',
    FLOAT: 'float'
};
Object.seal(SPINBOXTYPES);
Object.freeze(SPINBOXTYPES);
//#endregion SPINBOXTYPES
//#region SpinBox
const SpinBox = (() => {
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
    //#region Class SpinBox
    class SpinBox extends CustomTextBoxBtn {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.numBtns = 2;
                super(owner, props);
                const priv = internal(this);
                if (!Core.isHTMLRenderer) {
                    this.width = 100;
                    this.height = 21;
                }
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'valueType',
                    enum: SPINBOXTYPES,
                    variable: priv,
                    value: props.hasOwnProperty('valueType') ? props.valueType : SPINBOXTYPES.INTEGER
                });
                priv.value = props.hasOwnProperty('value') && Tools.isNumber(props.value)?props.value:0;
                priv.increment = props.hasOwnProperty('increment') && Tools.isNumber(props.increment)?props.value:1;
                priv.decimalDigits = props.hasOwnProperty('decimalDigits') && Tools.isNumber(props.decimalDigits)?props.value:2;
                priv.min = props.hasOwnProperty('min') && Tools.isNumber(props.min)?props.min:0;
                priv.max = props.hasOwnProperty('max') && Tools.isNumber(props.max)?props.max:100;
                this.filterChars = '0123456789.,-';
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
            if (Tools.isNumber(newValue)) {
                if (priv.value !== newValue) {
                    newValue = Math.min(Math.max(newValue, priv.min), priv.max);
                    priv.value = newValue;
                    if (priv.valueType === SPINBOXTYPES.FLOAT) {
                        priv.value = parseFloat(priv.value.toFixed(priv.decimalDigits));
                    }
                    if ((Math.frac(priv.value) === 0) || (priv.valueType === SPINBOXTYPES.INTEGER)) {
                        this.text = parseInt(priv.value, 10).toString();
                    }
                    else {
                        this.text = priv.value.toString();
                    }
                    this.onChange.invoke();
                }
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
            if (Tools.isNumber(newValue)) {
                if (priv.increment !== newValue) {
                    priv.increment = newValue;
                }
            }
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
            if (Tools.isNumber(newValue)) {
                if (priv.decimalDigits !== newValue) {
                    priv.decimalDigits = newValue;
                    this.update();
                }
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
            if (Tools.isNumber(newValue)) {
                if (priv.min !== newValue) {
                    priv.min = newValue;
                    if (priv.value > priv.min) {
                        priv.value = priv.min;
                    }
                    this.update();
                }
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
            if (Tools.isNumber(newValue)) {
                if (priv.max !== newValue) {
                    priv.max = newValue;
                    if (priv.value > priv.max) {
                        priv.value = priv.max;
                    }
                    this.update();
                }
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
            if (Tools.isBool(newValue)) {
                if (this.enabled !== newValue) {
                    super.enabled = newValue;
                    priv.btnPlus.enabled = newValue;
                    priv.btnMinus.enabled = newValue;
                }
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
                if (this.inputObj) {
                    if (this.text === String.EMPTY || !Tools.isNumber(this.inputObj.value)) {
                        priv.value = 0;
                        this.text = '0';
                        this.inputObj.value = priv.value;
                    }
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
            priv.btnPlus.HTMLElement.classList.add('SpinBoxPlusBtn');
            priv.btnMinus.onMouseDown.addListener(this.decValue);
            priv.btnPlus.onMouseDown.addListener(this.incValue);
        }
        //#endregion loaded
        //#region decValue
        decValue() {
            //#region Variables déclaration
            const owner = this instanceof SpinBox?this:this.owner;
            let value = owner.value -= owner.increment;
            //#endregion Variables déclaration
            if (this.isEnabled) {
                if (this.hitTest.mouseDown) {
                    if (value < owner.min) {
                        value = owner.min;
                    }
                    owner.value = value;
                }
            }
        }
        //#endregion decValue
        //#region incValue
        incValue() {
            //#region Variables déclaration
            const owner = this instanceof SpinBox?this:this.owner;
            let value = owner.value += owner.increment;
            //#endregion Variables déclaration
            if (this.isEnabled) {
                if (this.hitTest.mouseDown) {
                    if (value > owner.max) {
                        value = owner.max;
                    }
                    owner.value = value;
                }
            }
        }
        //#endregion incValue
        //#region keyDown
        keyDown() {
            //#region Variables déclaration
            const VKeysCodes = Keyboard.VKEYSCODES;
            //#endregion Variables déclaration
            super.keyDown();
            if (Core.keyboard.keyCode === VKeysCodes.VK_DOWN) {
                this.decValue();
            }
            else if (Core.keyboard.keyCode === VKeysCodes.VK_UP) {
                this.incValue();
            }
        }
        //#endregion keyDown
        //#region keyUp
        keyUp() {
            super.keyUp();
            this.value = this.valueType === SPINBOXTYPES.INTEGER ? ~~this.inputObj.value : parseFloat(this.inputObj.value);
        }
        //#endregion keyUp
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.btnPlus = null;
            priv.btnMinus = null;
            priv.valueType = null;
            priv.value = null;
            priv.increment = null;
            priv.decimalDigits = null;
            priv.min = null;
            priv.max = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return SpinBox;
    //#endregion SpinBox
})();
Core.classes.register(Types.CATEGORIES.COMMON, SpinBox);
//#endregion SpinBox
//#region Template
if (Core.isHTMLRenderer) {
    const SpinBoxTpl = ['<jagui-spinbox id="{internalId}" data-class="SpinBox" class="Control TextBox SpinBox {theme}">',
        '<properties>{ "name": "{name}", "width": 81, "height": 20 }</properties></jagui-spinbox>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: SpinBox, template: SpinBoxTpl }]);
}
//#endregion
export { SpinBox };