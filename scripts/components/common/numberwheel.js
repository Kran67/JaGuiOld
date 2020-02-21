//#region Import
import { ItemsWheel } from '/scripts/core/itemswheel.js';
//import { Window } from '/scripts/components/containers/window.js';
//import { Keyboard } from '/scripts/core/keyboard.js';
//import { Mouse } from '/scripts/core/mouse.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region NumberWheel
const NumberWheel = (() => {
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
    //#region Class NumberWheel
    class NumberWheel extends ItemsWheel {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.min = props.hasOwnProperty('min') && Tools.isNumber(props.min) ? props.min : 0;
                priv.max = props.hasOwnProperty('max') && Tools.isNumber(props.max) ? props.max : 100;
                priv.numberDigits = props.hasOwnProperty('numberDigits') && Tools.isNumber(props.numberDigits) ? props.numberDigits : 2;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
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
                    this.recreateItems();
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
                    this.recreateItems();
                }
            }
        }
        //#endregion max
        //#region numberDigits
        set numberDigits(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.numberDigits !== newValue) {
                    priv.numberDigits = newValue;
                    this.recreateItems();
                }
            }
        }
        //#endregion numberDigits
        //#endregion Getters / Setters
        //#region Methods
        //#region recreateItems
        recreateItems() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.items.clear();
            for (let i = priv.min; i <= priv.max; i++) {
                let str = i.toString();
                if (str.length < priv.numberDigits) {
                    str = String.dupeString('0', priv.numberDigits - str.length) + str;
                }
                this.items.push(str);
            }
            super.recreateItems();
        }
        //#endregion recreateItems
        //#region destroy
        destroy() {
            super.destroy();
            priv.min = null;
            priv.max = null;
            priv.numberDigits = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return NumberWheel;
    //#endregion NumberWheel
})();
//#endregion NumberWheel
Object.seal(NumberWheel);
Core.classes.register(Types.CATEGORIES.COMMON, NumberWheel);
//#region Templates
if (Core.isHTMLRenderer) {
    const NumberWheelTpl = "<div id='{internalId}' data-name='{name}' data-class='NumberWheel' class='Control ItemsWheel NumberWheel {theme}' style='width:20px;height:40px;'>\
                        <div class='Control ItemsWheelTopGradient {theme}'></div>\
                        <div class='Control ItemsWheelSep {theme}'></div>\
                        <div class='Control ItemsWheelContent {theme}'></div>\
                        <div class='Control ItemsWheelBottomGradient {theme}'></div>\
                        </div>";
    Core.classes.registerTemplates([{ Class: NumberWheel, template: NumberWheelTpl }]);
}
//#endregion
/*(function () {
    var NumberWheel = $j.classes.ItemsWheel.extend("NumberWheel", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.min = 0;
                this.max = 100;
                this.numberDigits = 2;
            }
        },
        //#region Setters
        setMin: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue !== this.min) {
                this.min = newValue;
                this.recreateItems();
            }
        },
        setMax: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue !== this.max) {
                this.max = newValue;
                this.recreateItems();
            }
        },
        setNumberDigits: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue !== this.numberDigits) {
                this.numberDigits = newValue;
                this.recreateItems();
            }
        },
        //#endregion
        //#region Methods
        updateFromHTML: function () {
            var data;
            data = this._HTMLElement.dataset.min;
            this.min = parseFloat(data);
            data = this._HTMLElement.dataset.max;
            this.max = parseFloat(data);
            this._inherited();
        },
        recreateItems: function () {
            var str;
            this.items.clear();
            for (var i = this.min; i <= this.max; i++) {
                str = i.toString();
                if (str.length < this.numberDigits) str = String.dupeString("0", this.numberDigits - str.length) + str;
                this.items.push(str);
            }
            this._inherited();
        },
        destroy: function () {
            this._inherited();
            this.min = null;
            this.max = null;
            this.numberDigits = null;
        }
        //#endregion
    });
    Object.seal(NumberWheel);
    $j.classes.register($j.types.categories.COMMON, NumberWheel);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var NumberWheelTpl = "<div id='{internalId}' data-name='{name}' data-class='NumberWheel' class='Control ItemsWheel NumberWheel {theme}' style='width:20px;height:40px;'>\
                        <div class='Control ItemsWheelTopGradient {theme}'></div>\
                        <div class='Control ItemsWheelSep {theme}'></div>\
                        <div class='Control ItemsWheelContent {theme}'></div>\
                        <div class='Control ItemsWheelBottomGradient {theme}'></div>\
                        </div>";
        $j.classes.registerTemplates([{ Class: NumberWheel, template: $j.templates["ItemsWheel"] }]);
    }
    //endregion
})();*/