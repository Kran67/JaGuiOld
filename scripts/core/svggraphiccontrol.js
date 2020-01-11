import { GraphicControl } from "/scripts/core/graphiccontrol.js";
//import { Color } from "/scripts/core/color.js";
//#region SVGGraphicControl
const SVGGraphicControl = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class SVGGraphicControl extends GraphicControl {
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
        get svg() {
            return internal(this).svg;
        }
        set svg(newValue) {
            const priv = internal(this);
            if (newValue instanceof HTMLElement) {
                if (priv.svg !== newValue) {
                    priv.svg = newValue;
                }
            }
        }
        get svgShape() {
            return internal(this).svgShape;
        }
        set svgShape(newValue) {
            const priv = internal(this);
            if (newValue instanceof HTMLElement) {
                if (priv.svgShape !== newValue) {
                    priv.svgShape = newValue;
                }
            }
        }
        //#region Methods
        getChildsHTMLElement() {
            this.svg = this.HTMLElement.firstElementChild;
            this.svgShape = this.svg.firstElementChild;
        }
        update() {
            const fillColor = this.fillColor;
            const svgShape = this.svgShape;
            const strokeColor = this.strokeColor;
            const strokeDash = this.strokeDash;
            if (!this.loading) {
                if (fillColor) {
                    this.svgShape.setAttribute("fill", fillColor.toARGBString());
                }
                svgShape.setAttribute("stroke-width", this.strokeWidth);
                if (strokeColor) {
                    svgShape.setAttribute("stroke", strokeColor.toARGBString());
                }
                if (strokeDash && strokeDash !== String.EMPTY) {
                    svgShape.setAttribute("stroke-dasharray", JSON.parse(strokeDash).join(String.COMMA));
                }
                svgShape.setAttribute("stroke-dashoffset", this.strokeDashOffset);
                super.update();
            }
        }
        updateFromHTML() {
            super.updateFromHTML();
            //data = this.HTMLElement.dataset.fill;
            //if (data) this.fillColor.assign(Color.parse(data));
            //data = this.HTMLElement.dataset.stroke;
            //if (data) this.strokeColor.assign(Color.parse(data));
            //data = this.HTMLElement.dataset.strokewidth;
            //if (data) this.strokeWidth = ~~data;
        }
        //#endregion
    }
    return SVGGraphicControl;
})();
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, SVGGraphicControl);
export { SVGGraphicControl };