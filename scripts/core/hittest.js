//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
//#endregion Imports
//#region HitTest
const HitTest = (function () {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) ? _private.set(key, {}) : 1;
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region HitTest
    class HitTest extends BaseClass {
        //#region constructor
        constructor(props) {
            super();
            const priv = internal(this);
            //priv.owner = owner;
            priv.mouseDown = props && props.hasOwnProperty('mouseDown') ? props.mouseDown : !0;
            priv.mouseMove = props && props.hasOwnProperty('mouseMove') ? props.mouseMove : !1;
            priv.mouseUp = props && props.hasOwnProperty('mouseUp') ? props.mouseUp : !0;
            priv.mouseWheel = props && props.hasOwnProperty('mouseWheel') ? props.mouseWheel : !1;
            priv.dblClick = props && props.hasOwnProperty('dblClick') ? props.dblClick : !1;
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
            return internal(this).mouseDown;
        }
        set mouseDown(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isBool(newValue) && priv.mouseDown !== newValue ? priv.mouseDown = newValue : 1;
        }
        //#endregion mouseDown
        //#region mouseMove
        get mouseMove() {
            return internal(this).mouseMove;
        }
        set mouseMove(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isBool(newValue) && priv.mouseMove !== newValue ? priv.mouseMove = newValue : 1;
        }
        //#endregion mouseMove
        //#region mouseUp
        get mouseUp() {
            return internal(this).mouseUp;
        }
        set mouseUp(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isBool(newValue) && priv.mouseUp !== newValue ? priv.mouseUp = newValue : 1;
        }
        //#endregion mouseUp
        //#region mouseWheel
        get mouseWheel() {
            return internal(this).mouseWheel;
        }
        set mouseWheel(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isBool(newValue) && priv.mouseWheel !== newValue ? priv.mouseWheel = newValue : 1;
        }
        //#endregion mouseWheel
        //#region dblClick
        get dblClick() {
            return internal(this).dblClick;
        }
        set dblClick(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isBool(newValue) && priv.dblClick !== newValue ? priv.dblClick = newValue : 1;
        }
        //#endregion dblClick
        //#region all
        set all(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isBool(newValue)) {
                priv.mouseDown = priv.mouseMove = priv.mouseUp =
                    priv.mouseWheel = priv.dblClick = newValue;
            }
        }
        //#endregion all
        //#region properties
        get properties() {
            //#region Variables déclaration
            const props = core.tools.getPropertiesFromObject(this);
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
            return priv.mouseDown === obj.mouseDown &&
                priv.mouseMove === obj.mouseMove &&
                priv.mouseUp === obj.mouseUp &&
                priv.mouseWheel === obj.mouseWheel &&
                priv.dblClick === obj.dblClick;
        }
        //#endregion equals
        //#region has
        has(type) {
            //#region Variables déclaration
            const priv = internal(this);
            const res = (priv.hasOwnProperty(type) && core.tools.isBool(priv[type]) ? priv[type] : !1);
            //#endregion Variables déclaration
            return res;
        }
        //#endregion has
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.mouseDown = null;
            priv.mouseMove = null;
            priv.mouseUp = null;
            priv.mouseWheel = null;
            priv.dblClick = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion
    }
    return HitTest;
    //#endregion HitTest
})();
core.classes.register(core.types.CATEGORIES.INTERNAL, HitTest);
//#endregion HitTest
export { HitTest };