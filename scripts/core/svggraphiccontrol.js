//#region Imports
import { GraphicControl } from '/scripts/core/graphiccontrol.js';
//#endregion Imports
//#region SVGGraphicControl
class SVGGraphicControl extends GraphicControl {
    //#region Private fields
    #svg = null;
    #svgShape;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = props || {};
        if (owner) {
            props.allowUpdateOnResize = !0;
            super(owner, props);
            this.#svgShape = document.createElementNS(core.types.SVG.XMLNS, props.shape);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region svg
    get svg() {
        return this.#svg;
    }
    set svg(newValue) {
        newValue instanceof HTMLElement && this.#svg !== newValue && (this.#svg = newValue);
    }
    //#endregion svg
    //#region svgShape
    get svgShape() {
        return this.#svgShape;
    }
    set svgShape(newValue) {
        newValue instanceof HTMLElement && this.#svgShape !== newValue && (this.#svgShape = newValue);
    }
    //#endregion svgShape
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const SVG = core.types.SVG.SVG;
        const XMLNS = core.types.SVG.XMLNS;
        //#endregion Variables déclaration
        if (!htmlElement.querySelector(SVG)) {
            this.#svg = document.createElementNS(XMLNS, SVG);
            this.#svg.classList.add('svgShape');
            htmlElement.appendChild(this.#svg);
            this.#svg.appendChild(this.#svgShape);
        }
        super.loaded();
    }
    //#endregion loaded
    //#region update
    update() {
        //#region Variables déclaration
        const fillColor = this.fillColor;
        const svgShape = this.#svgShape;
        const strokeColor = this.strokeColor;
        const strokeDash = this.strokeDash;
        //#endregion Variables déclaration
        if (!this.loading) {
            fillColor && this.#svgShape.setAttribute('fill', fillColor.toRGBAString());
            svgShape.setAttribute('stroke-width', this.strokeWidth);
            strokeColor && svgShape.setAttribute('stroke', strokeColor.toRGBAString());
            strokeDash && strokeDash !== String.EMPTY
                && svgShape.setAttribute('stroke-dasharray', strokeDash.join(String.COMMA));
            svgShape.setAttribute('stroke-dashoffset', this.strokeDashOffset);
        }
    }
    //#endregion update
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, SVGGraphicControl);
//#endregion SVGGraphicControl
export { SVGGraphicControl };