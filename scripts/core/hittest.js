import { BaseClass } from "/scripts/core/baseclass.js";
import { Tools } from "/scripts/core/tools.js";
//#region HitTest
const HitTest = (function () {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class HitTest extends BaseClass {
        constructor(owner) {
            super(owner);
            const priv = internal(this);
            priv.owner = owner;
            priv.mousedown = true;
            priv.mousemove = false;
            priv.mouseup = true;
            priv.mousewheel = false;
            priv.dblclick = false;
            //#region Private
        }
        //#region Setters
        get owner() {
            return internal(this).owner;
        }
        get mouseDown() {
            return internal(this).mousedown;
        }
        set mouseDown(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.mousedown !== newValue) {
                    priv.mousedown = newValue;
                }
            }
        }
        get mouseMove() {
            return internal(this).mousemove;
        }
        set mouseMove(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.mousemove !== newValue) {
                    priv.mousemove = newValue;
                }
            }
        }
        get mouseUp() {
            return internal(this).mouseup;
        }
        set mouseUp(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.mouseup !== newValue) {
                    priv.mouseup = newValue;
                }
            }
        }
        get mouseWheel() {
            return internal(this).mousewheel;
        }
        set mouseWheel(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.mousewheel !== newValue) {
                    priv.mousewheel = newValue;
                }
            }
        }
        get dblClick() {
            return internal(this).dblclick;
        }
        set dblClick(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.dblclick !== newValue) {
                    priv.dblclick = newValue;
                }
            }
        }
        set all(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                priv.mousedown = priv.mousemove = priv.mouseup =
                    priv.mousewheel = priv.dblclick = newValue;
            }
        }
        get properties() {
            const props = Tools.getPropertiesFromObject(this);
            return props;
        }
        //#endregion
        //#region Methods
        equals(obj) {
            const priv = internal(this);
            return priv.mousedown === obj.mouseDown &&
                priv.mousemove === obj.mouseMove &&
                priv.mouseup === obj.mouseUp &&
                priv.mousewheel === obj.mouseWheel &&
                priv.dblclick === obj.dblClick;
        }
        has(type) {
            const priv = internal(this);
            const res = (priv[type] ? priv[type] === true : false);
            return res;
        }
        //#endregion
    }
    return HitTest;
})();
Object.defineProperties(HitTest, {
    "mouseDown": {
        enumerable: true
    },
    "mouseMove": {
        enumerable: true
    },
    "mouseUp": {
        enumerable: true
    },
    "mouseWheel": {
        enumerable: true
    },
    "dblClick": {
        enumerable: true
    }
});
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, HitTest);
export { HitTest };