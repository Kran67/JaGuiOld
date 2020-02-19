//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Imports
//#region HitTest
const HitTest = (function () {
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
    //#region HitTest
    class HitTest extends BaseClass {
        //#region constructor
        constructor(owner) {
            super(owner);
            const priv = internal(this);
            priv.owner = owner;
            priv.mousedown = true;
            priv.mousemove = false;
            priv.mouseup = true;
            priv.mousewheel = false;
            priv.dblclick = false;
        }
        //#endregion constructor
        //#region Getter / Setters
        //#region owner
        get owner() {
            return internal(this).owner;
        }
        //#endregion owner
        //#region mouseDown
        get mouseDown() {
            return internal(this).mousedown;
        }
        set mouseDown(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.mousedown !== newValue) {
                    priv.mousedown = newValue;
                }
            }
        }
        //#endregion mouseDown
        //#region mouseMove
        get mouseMove() {
            return internal(this).mousemove;
        }
        set mouseMove(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.mousemove !== newValue) {
                    priv.mousemove = newValue;
                }
            }
        }
        //#endregion mouseMove
        //#region mouseUp
        get mouseUp() {
            return internal(this).mouseup;
        }
        set mouseUp(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.mouseup !== newValue) {
                    priv.mouseup = newValue;
                }
            }
        }
        //#endregion mouseUp
        //#region mouseWheel
        get mouseWheel() {
            return internal(this).mousewheel;
        }
        set mouseWheel(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.mousewheel !== newValue) {
                    priv.mousewheel = newValue;
                }
            }
        }
        //#endregion mouseWheel
        //#region dblClick
        get dblClick() {
            return internal(this).dblclick;
        }
        set dblClick(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.dblclick !== newValue) {
                    priv.dblclick = newValue;
                }
            }
        }
        //#endregion dblClick
        //#region all
        set all(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                priv.mousedown = priv.mousemove = priv.mouseup =
                    priv.mousewheel = priv.dblclick = newValue;
            }
        }
        //#endregion all
        //#region properties
        get properties() {
            //#region Variables déclaration
            const props = Tools.getPropertiesFromObject(this);
            //#endregion Variables déclaration
            return props;
        }
        //#endregion properties
        //#endregion
        //#region Methods
        //#region equals
        equals(obj) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return priv.mousedown === obj.mouseDown &&
                priv.mousemove === obj.mouseMove &&
                priv.mouseup === obj.mouseUp &&
                priv.mousewheel === obj.mouseWheel &&
                priv.dblclick === obj.dblClick;
        }
        //#endregion equals
        //#region has
        has(type) {
            //#region Variables déclaration
            const priv = internal(this);
            const res = (priv.hasOwnProperty(type) ? priv[type] === true : false);
            //#endregion Variables déclaration
            return res;
        }
        //#endregion has
        //#endregion
    }
    return HitTest;
    //#endregion HitTest
})();
//#region HitTest defineProperties
Object.defineProperties(HitTest, {
    'mouseDown': {
        enumerable: true
    },
    'mouseMove': {
        enumerable: true
    },
    'mouseUp': {
        enumerable: true
    },
    'mouseWheel': {
        enumerable: true
    },
    'dblClick': {
        enumerable: true
    }
});
//#endregion HitTest defineProperties
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, HitTest);
export { HitTest };