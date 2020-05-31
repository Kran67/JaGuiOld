//#region Imports
import { Control } from '/scripts/components/control.js';
import { Color, Colors } from '/scripts/core/color.js';
//#endregion Imports
//#region GraphicControl
class GraphicControl extends Control {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                fillColor: props.hasOwnProperty('fillColor') ? Color.parse(props.fillColor) : new Color(this, Colors.WHITE),
                strokeColor: props.hasOwnProperty('strokeColor') ? Color.parse(props.strokeColor) : new Color(this, Colors.BLACK),
                strokeWidth: props.hasOwnProperty('strokeWidth') ? props.strokeWidth : 1,
                strokeDash: props.hasOwnProperty('strokeDash') ? props.strokeDash : '[]',
                strokeDashOffset: props.hasOwnProperty('strokeDashOffset') ? props.strokeDashOffset : 0
            });
            delete this.tabOrder;
        }
    }
    //#endregion constructor
    //#region Getter / Setters
    //#region fillColor
    get fillColor() {
        return core.private(this).fillColor;
    }
    set fillColor(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof Color && !priv.fillColor.equals(newValue)) {
            priv.fillColor.assign(newValue);
            this.update();
        }
    }
    //#endregion fillColor
    //#region strokeColor
    get strokeColor() {
        return core.private(this).strokeColor;
    }
    set strokeColor(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof Color && !priv.strokeColor.equals(newValue)) {
            priv.strokeColor.assign(newValue);
            this.update();
        }
    }
    //#endregion strokeColor
    //#region strokeWidth
    get strokeWidth() {
        return core.private(this).strokeWidth;
    }
    set strokeWidth(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
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
        return core.private(this).strokeDash;
    }
    set strokeDash(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && priv.strokeDash !== newValue) {
            priv.strokeDash = newValue;
            this.update();
        }
    }
    //#endregion strokeDash
    //#region strokeDashOffset
    get strokeDashOffset() {
        return core.private(this).strokeDashOffset;
    }
    set strokeDashOffset(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
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
        const priv = core.private(this);
        const fillColor = priv.fillColor;
        const strokeColor = priv.strokeColor;
        //#endregion Variables déclaration
        fillColor && fillColor.destroy();
        strokeColor && strokeColor.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, GraphicControl);
//#endregion GraphicControl
export { GraphicControl };