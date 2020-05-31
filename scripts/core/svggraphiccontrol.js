﻿//#region Imports
import { GraphicControl } from '/scripts/core/graphiccontrol.js';
//#endregion Imports
//#region SVGGraphicControl
class SVGGraphicControl extends GraphicControl {
    //#region constructor
    constructor(owner, props) {
        props = props || {};
        if (owner) {
            props.allowUpdateOnResize = !0;
            super(owner, props);
            core.private(this, {
                svg: null,
                svgShape: document.createElementNS(core.types.SVG.XMLNS, props.shape)
            });
        }
    }
    //#endregion constructor
    //#region Getter / Setter
    //#region svg
    get svg() {
        return core.private(this).svg;
    }
    set svg(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = 'svg';
        //#endregion Variables déclaration
        newValue instanceof HTMLElement && priv[propName] !== newValue && (priv[propName] = newValue);
    }
    //#endregion svg
    //#region svgShape
    get svgShape() {
        return core.private(this).svgShape;
    }
    set svgShape(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = 'svgShape';
        //#endregion Variables déclaration
        newValue instanceof HTMLElement && priv[propName] !== newValue && (priv[propName] = newValue);
    }
    //#endregion svgShape
    //#endregion Getter / Setter
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
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
        const priv = core.private(this);
        const fillColor = this.fillColor;
        const svgShape = priv.svgShape;
        const strokeColor = this.strokeColor;
        const strokeDash = this.strokeDash;
        //#endregion Variables déclaration
        if (!this.loading) {
            fillColor && priv.svgShape.setAttribute('fill', fillColor.toRGBAString());
            svgShape.setAttribute('stroke-width', this.strokeWidth);
            strokeColor && svgShape.setAttribute('stroke', strokeColor.toRGBAString());
            strokeDash && strokeDash !== String.EMPTY
                && svgShape.setAttribute('stroke-dasharray', JSON.parse(strokeDash).join(String.COMMA));
            svgShape.setAttribute('stroke-dashoffset', this.strokeDashOffset);
        }
    }
    //#endregion update
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, SVGGraphicControl);
//#endregion SVGGraphicControl
export { SVGGraphicControl };