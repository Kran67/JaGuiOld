﻿//#region Import
import { ItemsWheel } from '/scripts/core/itemswheel.js';
//import { Window } from '/scripts/components/containers/window.js';
//import { Keyboard } from '/scripts/core/keyboard.js';
//import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region Class NumberWheel
class NumberWheel extends ItemsWheel {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                min: props.hasOwnProperty('min') && core.tools.isNumber(props.min) ? props.min : 0,
                max: props.hasOwnProperty('max') && core.tools.isNumber(props.max) ? props.max : 100,
                numberDigits: props.hasOwnProperty('numberDigits') && core.tools.isNumber(props.numberDigits)
                    ? props.numberDigits : 2
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region min
    get min() {
        return core.private(this).min;
    }
    set min(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv.min !== newValue) {
            priv.min = newValue;
            this.recreateItems();
        }
    }
    //#endregion min
    //#region max
    get max() {
        return core.private(this).max;
    }
    set max(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv.max !== newValue) {
            priv.max = newValue;
            this.recreateItems();
        }
    }
    //#endregion max
    //#region numberDigits
    set numberDigits(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv.numberDigits !== newValue) {
            priv.numberDigits = newValue;
            this.recreateItems();
        }
    }
    //#endregion numberDigits
    //#endregion Getters / Setters
    //#region Methods
    //#region recreateItems
    recreateItems() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        this.items.clear();
        for (let i = priv.min; i <= priv.max; i++) {
            let str = i.toString();
            str.length < priv.numberDigits && (str = String.dupeString('0', priv.numberDigits - str.length) + str);
            this.items.push(str);
        }
        super.recreateItems();
    }
    //#endregion recreateItems
    //#endregion Methods
}
//#endregion NumberWheel
Object.seal(NumberWheel);
core.classes.register(core.types.CATEGORIES.COMMON, NumberWheel);
//#region Templates
if (core.isHTMLRenderer) {
    const NumberWheelTpl = ['<jagui-numberwheel id="{internalId}" data-class="NumberWheel" class="Control ',
        'ItemsWheel NumberWheel {theme}"><properties>{ "name": "{name}", "width": 20, "height": 40 }</properties>',
        '</jagui-numberwheel>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: NumberWheel, template: NumberWheelTpl }]);
}
//#endregion
export { NumberWheel };