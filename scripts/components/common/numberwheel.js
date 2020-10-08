//#region Import
import { ItemsWheel } from '/scripts/core/itemswheel.js';
//import { Window } from '/scripts/components/containers/window.js';
//import { Keyboard } from '/scripts/core/keyboard.js';
//import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region Class NumberWheel
class NumberWheel extends ItemsWheel {
    //#region Private fields
    #min;
    #max;
    #numberDigits;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#min = props.hasOwnProperty('min') && core.tools.isNumber(props.min) ? props.min : 0;
            this.#max = props.hasOwnProperty('max') && core.tools.isNumber(props.max) ? props.max : 100;
            this.#numberDigits = props.hasOwnProperty('numberDigits') && core.tools.isNumber(props.numberDigits)
                    ? props.numberDigits : 2;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region min
    get min() {
        return this.#min;
    }
    set min(newValue) {
        if (core.tools.isNumber(newValue) && this.#min !== newValue) {
            this.#min = newValue;
            this.recreateItems();
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
            this.recreateItems();
        }
    }
    //#endregion max
    //#region numberDigits
    set numberDigits(newValue) {
        if (core.tools.isNumber(newValue) && this.#numberDigits !== newValue) {
            this.#numberDigits = newValue;
            this.recreateItems();
        }
    }
    //#endregion numberDigits
    //#endregion Getters / Setters
    //#region Methods
    //#region recreateItems
    recreateItems() {
        this.items.clear();
        for (let i = this.#min; i <= this.#max; i++) {
            let str = i.toString();
            str.length < this.#numberDigits && (str = String.dupeString('0', this.#numberDigits - str.length) + str);
            this.items.push(str);
        }
        super.recreateItems();
    }
    //#endregion recreateItems
    //#endregion Methods
}
Object.defineProperties(NumberWheel.prototype, {
    'min': {
        enumerable: !0
    },
    'max': {
        enumerable: !0
    },
    'numberDigits': {
        enumerable: !0
    }
});
Object.seal(NumberWheel);
core.classes.register(core.types.CATEGORIES.COMMON, NumberWheel);
//#endregion NumberWheel
//#region Templates
if (core.isHTMLRenderer) {
    const NumberWheelTpl = ['<jagui-numberwheel id="{internalId}" data-class="NumberWheel" class="Control ',
        'ItemsWheel NumberWheel {theme}"><properties>{ "name": "{name}", "width": 20, "height": 40 }</properties>',
        '</jagui-numberwheel>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: NumberWheel, template: NumberWheelTpl }]);
}
//#endregion
export { NumberWheel };