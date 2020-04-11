//#region Imports
import { Control } from '/scripts/components/control.js';
import { Color,  Colors } from '/scripts/core/color.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Imports
//#region GraphicControl
const GraphicControl = (function () {
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
    //#region GraphicControl
    class GraphicControl extends Control {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.fillColor = props.hasOwnProperty('fillColor') ? Color.parse(props.fillColor) : new Color(Colors.WHITE);
                priv.strokeColor = props.hasOwnProperty('strokeColor') ? Color.parse(props.strokeColor) : new Color(Colors.BLACK);
                priv.strokeWidth = props.hasOwnProperty('strokeWidth') ? props.strokeWidth : 1;
                priv.strokeDash = props.hasOwnProperty('strokeDash') ? props.strokeDash : '[]';
                priv.strokeDashOffset = props.hasOwnProperty('strokeDashOffset') ? props.strokeDashOffset : 0;
                delete this.tabOrder;
            }
        }
        //#endregion constructor
        //#region Getter / Setters
        //#region fillColor
        get fillColor() {
            return internal(this).fillColor;
        }
        set fillColor(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Color) {
                if (!priv.fillColor.equals(newValue)) {
                    priv.fillColor.assign(newValue);
                    this.update();
                }
            }
        }
        //#endregion fillColor
        //#region strokeColor
        get strokeColor() {
            return internal(this).strokeColor;
        }
        set strokeColor(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Color) {
                if (!priv.strokeColor.equals(newValue)) {
                    priv.strokeColor.assign(newValue);
                    this.update();
                }
            }
        }
        //#endregion strokeColor
        //#region strokeWidth
        get strokeWidth() {
            return internal(this).strokeWidth;
        }
        set strokeWidth(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                newValue = Math.max(0, newValue);
                if (priv.strokeWidth !== newValue) {
                    priv.strokeWidth = newValue;
                    this.update();
                }
            }
        }
        //#endregion strokeWidth
        //#region strokeDash
        get strokeDash() {
            return internal(this).strokeDash;
        }
        set strokeDash(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.strokeDash !== newValue) {
                    priv.strokeDash = newValue;
                    this.update();
                }
            }
        }
        //#endregion strokeDash
        //#region strokeDashOffset
        get strokeDashOffset() {
            return internal(this).strokeDashOffset;
        }
        set strokeDashOffset(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.strokeDashOffset !== newValue) {
                    priv.strokeDashOffset = newValue;
                    this.update();
                }
            }
        }
        //#endregion strokeDashOffset
        //#endregion
        //#region Methods
        //#region changed
        changed() { }
        //#endregion changed
        //#region loaded
        loaded() {
            super.loaded();
            if (Tools.isFunc(this.update)) {
                this.update();
            }
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            const fillColor = priv.fillColor;
            const strokeColor = priv.strokeColor;
            //#endregion Variables déclaration
            if (fillColor) {
                fillColor.destroy();
            }
            if (strokeColor) {
                strokeColor.destroy();
            }
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return GraphicControl;
    //#endregion GraphicControl
})();
//#region GraphicControl defineProperties
Object.defineProperties(GraphicControl, {
    'fillColor': {
        enumerable: !0
    },
    'strokeColor': {
        enumerable: !0
    },
    'strokeWidth': {
        enumerable: !0
    },
    'strokeDash': {
        enumerable: !0
    },
    'strokeDashOffset': {
        enumerable: !0
    }
});
//#endregion GraphicControl defineProperties
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, GraphicControl);
export { GraphicControl };