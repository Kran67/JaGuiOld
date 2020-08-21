//#region Imports
import { Control } from '/scripts/components/control.js';
import { Color, Colors } from '/scripts/core/color.js';
//#endregion Imports
//#region GraphicControl
class GraphicControl extends Control {
    //#region Private fields
    #fillColor;
    #strokeColor;
    #strokeWidth;
    #strokeDash;
    #strokeDashOffset;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#fillColor = props.hasOwnProperty('fillColor') ? Color.parse(props.fillColor) : new Color(this, Colors.WHITE);
            this.#strokeColor = props.hasOwnProperty('strokeColor') ? Color.parse(props.strokeColor) : new Color(this, Colors.BLACK);
            this.#strokeWidth = props.hasOwnProperty('strokeWidth') ? props.strokeWidth : 1;
            this.#strokeDash = props.hasOwnProperty('strokeDash') ? props.strokeDash : [];
            this.#strokeDashOffset = props.hasOwnProperty('strokeDashOffset') ? props.strokeDashOffset : 0;
            delete this.tabOrder;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region fillColor
    get fillColor() {
        return this.#fillColor;
    }
    set fillColor(newValue) {
        if (newValue instanceof Color && !this.#fillColor.equals(newValue)) {
            this.#fillColor.assign(newValue);
            this.update();
        }
    }
    //#endregion fillColor
    //#region strokeColor
    get strokeColor() {
        return this.#strokeColor;
    }
    set strokeColor(newValue) {
        if (newValue instanceof Color && !this.#strokeColor.equals(newValue)) {
            this.#strokeColor.assign(newValue);
            this.update();
        }
    }
    //#endregion strokeColor
    //#region strokeWidth
    get strokeWidth() {
        return this.#strokeWidth;
    }
    set strokeWidth(newValue) {
        if (core.tools.isNumber(newValue)) {
            newValue = Math.max(0, newValue);
            if (this.#strokeWidth !== newValue) {
                this.#strokeWidth = newValue;
                this.update();
            }
        }
    }
    //#endregion strokeWidth
    //#region strokeDash
    get strokeDash() {
        return this.#strokeDash;
    }
    set strokeDash(newValue) {
        if (core.tools.isString(newValue) && this.#strokeDash !== newValue) {
            this.#strokeDash = newValue;
            this.update();
        }
    }
    //#endregion strokeDash
    //#region strokeDashOffset
    get strokeDashOffset() {
        return this.#strokeDashOffset;
    }
    set strokeDashOffset(newValue) {
        if (core.tools.isNumber(newValue) && this.#strokeDashOffset !== newValue) {
            this.#strokeDashOffset = newValue;
            this.update();
        }
    }
    //#endregion strokeDashOffset
    //#endregion Getters / Setters
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
        const fillColor = this.#fillColor;
        const strokeColor = this.#strokeColor;
        //#endregion Variables déclaration
        fillColor && fillColor.destroy();
        strokeColor && strokeColor.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(GraphicControl.prototype, {
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
core.classes.register(core.types.CATEGORIES.INTERNAL, GraphicControl);
//#endregion GraphicControl
export { GraphicControl };