//#region Imports
import { GraphicControl } from "/scripts/core/graphiccontrol.js";
//import { Color } from "/scripts/core/color.js";
//#endregion Imports
//#region SVGGraphicControl
const SVGGraphicControl = (() => {
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
    //#region SVGGraphicControl
    class SVGGraphicControl extends GraphicControl {
        //#region constructor
        constructor(owner, props) {
            props = props || {};
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                //#region Privates

                priv.svg = null;
                priv.svgShape = null;
                //#endregion
            }
        }
        //#endregion constructor
        //#region Getter / Setter
        //#region svg
        get svg() {
            return internal(this).svg;
        }
        set svg(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof HTMLElement) {
                if (priv.svg !== newValue) {
                    priv.svg = newValue;
                }
            }
        }
        //#endregion svg
        //#region svgShape
        get svgShape() {
            return internal(this).svgShape;
        }
        set svgShape(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof HTMLElement) {
                if (priv.svgShape !== newValue) {
                    priv.svgShape = newValue;
                }
            }
        }
        //#endregion svgShape
        //#endregion Getter / Setter
        //#region Methods
        //#region getHTMLElement
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.getHTMLElement(id);
            priv.svg = this.HTMLElement.firstElementChild;
            priv.svgShape = this.svg.firstElementChild;
        }
        //#endregion getHTMLElement
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const fillColor = priv.fillColor;
            const svgShape = priv.svgShape;
            const strokeColor = priv.strokeColor;
            const strokeDash = priv.strokeDash;
            //#endregion Variables déclaration
            if (!this.loading) {
                if (fillColor) {
                    priv.svgShape.setAttribute("fill", fillColor.toARGBString());
                }
                svgShape.setAttribute("stroke-width", priv.strokeWidth);
                if (strokeColor) {
                    svgShape.setAttribute("stroke", strokeColor.toARGBString());
                }
                if (strokeDash && strokeDash !== String.EMPTY) {
                    svgShape.setAttribute("stroke-dasharray", JSON.parse(strokeDash).join(String.COMMA));
                }
                svgShape.setAttribute("stroke-dashoffset", priv.strokeDashOffset);
                super.update();
            }
        }
        //#endregion update
        //#endregion Methods
    }
    return SVGGraphicControl;
    //#endregion SVGGraphicControl
})();
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, SVGGraphicControl);
export { SVGGraphicControl };