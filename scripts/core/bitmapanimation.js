﻿//#region Imports
import { Animation } from '/scripts/core/animation.js';
import { Convert } from '/scripts/core/convert.js';
import { Css } from '/scripts/core/css.js';
//#endregion
//#region BitmapAnimation
/**
 * Class representing an BitmapAnimation.
 * @extends {Animation}
 */
//#region BitmapAnimation
class BitmapAnimation extends Animation {
    #current = {};
    /**
     * Create a new instance of BitmapAnimation.
     * @param   {Object}    owner       Owner of the BitmapAnimation.
     * @param   {Object}    props       Properties to initialize the BitmapAnimation.
     * @param   {Boolean}   autoStart   Start the animation after creation.
     */
    constructor(owner, props, autoStart) {
        props = !props ? {} : props;
        if (owner) {
            props.startValue = new Image;
            props.startFromCurrent = !1;
            props.stopValue = new Image;
            super(owner, props, autoStart);
            //#region Properties
            //#region Private Properties
            this.#current.canvas = doc.createElement(core.types.HTMLELEMENTS.CANVAS);
            this.#current.canvas.width = 1;
            this.#current.canvas.height = 1;
            this.#current.ctx = canvas.getContext('2d');
            //#endregion Private Properties
            //#endregion Properties
        }
    }
    //#region Getters / Setters
    get current() {
        return this.#current;
    }
    set current(newValue) {
        core.tools.isObject(newValue) && newValue.canvas && this.#current !== newValue
            && (this.#current = newValue);
    }
    //#endregion Getters / Setters
    //#region Methods
    /**
     * process animation on each tick
     * @override
     */
    processAnimation() {
        //#region Variables déclaration
        const form = this.form;
        const control = this.control;
        const propertyName = this.propertyName;
        const stopValue = this.stopValue;
        const inverse = this.inverse;
        const current = this.#current;
        const currentCtx = current.ctx;
        const startValue = this.startValue;
        const imgCanvasCtx = control.imgCanvas.ctx;
        //#endregion Variables déclaration
        if (control && control.checkOwnerVisible() && !form.loading && !form.creating) {
            super.processAnimation();
            if (control[propertyName]) {
                if (control[propertyName] instanceof Image) {
                    let r;
                    control.allowUpdate && (r = control.screenRect());
                    if (stopValue.width === 0 || stopValue.height === 0) {
                        return;
                    }
                    if (inverse) {
                        currentCtx.resize(stopValue.width, stopValue.height);
                        currentCtx.save();
                        currentCtx.drawImage(stopValue, 0, 0);
                        currentCtx.globalAlpha = 1 - this.normalizedTime();
                        currentCtx.drawImage(startValue, 0, 0);
                        currentCtx.restore();
                    } else {
                        currentCtx.resize(startValue.width, startValue.height);
                        currentCtx.clear();
                        currentCtx.save();
                        currentCtx.drawImage(startValue, 0, 0);
                        currentCtx.globalAlpha = this.normalizedTime();
                        currentCtx.drawImage(stopValue, 0, 0);
                        currentCtx.restore();
                    }
                    if (control.imgCanvas) {
                        if (imgCanvasCtx) {
                            imgCanvasCtx.clear();
                            imgCanvasCtx.drawImage(current.canvas, 0, 0);
                        }
                    }
                    control.allowUpdate && control.update();
                    !form.useRequestAnim ? control.redraw(r) : form.needRedraw = !0;
                }
            }
        }
    }
    /**
     * When the class is loaded
     * @override
     */
    loaded() {
        //#region Variables déclaration
        let style = String.EMPTY;
        let back = String.EMPTY;
        const imageWraps = core.types.IMAGEWRAPS;
        const _const = core.types.CONSTANTS;
        const control = this.control;
        const ctrlInternalId = control.internalId;
        const internalId = this.internalId;
        //#endregion Variables déclaration
        if (control) {
            super.loaded();
            const cssProp = `0% { ${Convert.propertyToCssProperty(this, !0)} }
                   100% { ${Convert.propertyToCssProperty(this)} } `;
            Css.addCSSRule(`@${core.browser.getVendorPrefix('keyframes')} keyframes ${internalId}_hover`, cssProp);
            control.bitmap.src = _const.PIX;
            switch (control.wrapMode) {
                case imageWraps.ORIGINAL:
                    back = `background-size:auto auto;
                                background-position:auto auto;
                                background-repeat:no-repeat;`;
                    break;
                case imageWraps.FIT:
                    back = `background-size:contain;
                                background-position:center center;
                                background-repeat:no-repeat;`;
                    break;
                case imageWraps.STRETCH:
                    back = `background-size:100% 100%;
                                background-position:center center;
                                background-repeat:no-repeat;`;
                    break;
                case imageWraps.TILED:
                    back = `background-size:auto auto;
                                background-position:auto auto;
                                background-repeat:repeat;`;
                    break;
            }
            style = `position:absolute;left:0;top:0;right:0;bottom:0;content:'';background-image:url('${this.startValue.src}');`;
            Css.addCSSRule(`#${ctrlInternalId}${_const.PSEUDOCLASSBEFORE}:before`, `${style}${back}`);
            Css.addCSSRule(`#${ctrlInternalId}${_const.PSEUDOCLASSBEFORE}:before`, `animation:${this.toCSS().replace(' none ', ' backwards ')};`);
            Css.addCSSRule(`#${ctrlInternalId}:hover${_const.PSEUDOCLASSBEFORE}:before`, core.browser.getVendorPrefix('animation') + `animation:${this.toCSS(internalId + '_hover').replace(' none ', ' forwards ')};`);
            style = `position:absolute;left:0;top:0;right:0;bottom:0;content:'';opacity:0;background-image:url('${this.stopValue.src}');`;
            Css.addCSSRule(`#${ctrlInternalId}${_const.PSEUDOCLASSBEFORE}:after`, `${style}${back}`);
            Css.addCSSRule(`#${ctrlInternalId}${_const.PSEUDOCLASSBEFORE}:after`, `animation:${this.toCSS(internalId + '_hover')};`);
            Css.addCSSRule(`#${ctrlInternalId}:hover${_const.PSEUDOCLASSBEFORE}:after`, core.browser.getVendorPrefix('animation') + `animation:${this.toCSS().replace(' none ', ' forwards ')};`);
        }
    }
    /**
     * Assign properties from another animation
     * @param   {BitmapAnimation}     source      The animation source
     * @override
     */
    assign(source) {
        if (source instanceof core.classes.BitmapAnimation) {
            super.assign(source);
            this.startValue = source.startValue;
            this.startFromCurrent = source.startFromCurrent;
            this.stopValue = source.stopValue;
        }
    }
    /**
     * Destroy all properties of the instance
     * @override
     */
    destroy() {
        //#region Variables déclaration
        const current = this.#current;
        //#endregion Variables déclaration
        if (current) {
            current.canvas = null;
            current.ctx = null;
        }
        super.destroy();
    }
    //#endregion
}
core.classes.register(core.types.CATEGORIES.ANIMATIONS, BitmapAnimation);
//#endregion BitmapAnimation
export { BitmapAnimation };