//#region Imports
import { Control } from '/scripts/components/control.js';
import { Color, Colors } from '/scripts/core/color.js';
//#endregion Imports
//#region GraphicControl
const GraphicControl = (function () {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
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
                priv.fillColor = props.hasOwnProperty('fillColor') ? Color.parse(props.fillColor) : new Color(this, Colors.WHITE);
                priv.strokeColor = props.hasOwnProperty('strokeColor') ? Color.parse(props.strokeColor) : new Color(this, Colors.BLACK);
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
            if (newValue instanceof Color && !priv.fillColor.equals(newValue)) {
                priv.fillColor.assign(newValue);
                this.update();
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
            if (newValue instanceof Color && !priv.strokeColor.equals(newValue)) {
                priv.strokeColor.assign(newValue);
                this.update();
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
            if (core.tools.isNumber(newValue)) {
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
            if (core.tools.isString(newValue) && priv.strokeDash !== newValue) {
                priv.strokeDash = newValue;
                this.update();
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
            if (core.tools.isNumber(newValue) && priv.strokeDashOffset !== newValue) {
                priv.strokeDashOffset = newValue;
                this.update();
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
            core.tools.isFunc(this.update) && this.update();
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            const fillColor = priv.fillColor;
            const strokeColor = priv.strokeColor;
            //#endregion Variables déclaration
            fillColor && fillColor.destroy();
            strokeColor && strokeColor.destroy();
            priv.fillColor = null;
            priv.strokeColor = null;
            priv.strokeWidth = null;
            priv.strokeDash = null;
            priv.strokeDashOffset = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return GraphicControl;
    //#endregion GraphicControl
})();
core.classes.register(core.types.CATEGORIES.INTERNAL, GraphicControl);
//#endregion GraphicControl
export { GraphicControl };