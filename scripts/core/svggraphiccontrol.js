//#region Imports
import { GraphicControl } from '/scripts/core/graphiccontrol.js';
//#endregion Imports
//#region SVGGraphicControl
const SVGGraphicControl = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) ? _private.set(key, {}) : 1;
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
                props.allowUpdateOnResize = !0;
                super(owner, props);
                const priv = internal(this);
                priv.svg = null;
                priv.svgShape = document.createElementNS(core.types.SVG.XMLNS, props.shape);
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
            newValue instanceof HTMLElement && priv.svg !== newValue ? priv.svg = newValue : 1;
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
            newValue instanceof HTMLElement && priv.svgShape !== newValue ? priv.svgShape = newValue : 1;
        }
        //#endregion svgShape
        //#endregion Getter / Setter
        //#region Methods
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const SVG = core.types.SVG.SVG;
            const XMLNS = core.types.SVG.XMLNS;
            //#endregion Variables déclaration
            if (!htmlElement.querySelector(SVG)) {
                priv.svg = document.createElementNS(XMLNS, SVG);
                priv.svg.classList.add('Control', 'svgShape');
                htmlElement.appendChild(priv.svg);
                priv.svg.appendChild(priv.svgShape);
            }
            super.loaded();
        }
        //#endregion loaded
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const fillColor = this.fillColor;
            const svgShape = priv.svgShape;
            const strokeColor = this.strokeColor;
            const strokeDash = this.strokeDash;
            //#endregion Variables déclaration
            if (!this.loading) {
                fillColor ? priv.svgShape.setAttribute('fill', fillColor.toRGBAString()) : 1;
                svgShape.setAttribute('stroke-width', this.strokeWidth);
                strokeColor?svgShape.setAttribute('stroke', strokeColor.toRGBAString()):1;
                strokeDash && strokeDash !== String.EMPTY
                    ? svgShape.setAttribute('stroke-dasharray', JSON.parse(strokeDash).join(String.COMMA))
                    : 1;
                svgShape.setAttribute('stroke-dashoffset', this.strokeDashOffset);
            }
        }
        //#endregion update
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.svg = null;
            priv.svgShape = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return SVGGraphicControl;
    //#endregion SVGGraphicControl
})();
core.classes.register(core.types.CATEGORIES.INTERNAL, SVGGraphicControl);
//#endregion SVGGraphicControl
export { SVGGraphicControl };