//#region Imports
import { Animation } from '/scripts/core/animation.js';
import { Convert } from '/scripts/core/convert.js';
import { Css } from '/scripts/core/css.js';
//#endregion
//#region BitmapAnimation
/**
 * Class representing an BitmapAnimation.
 * @extends {Animation}
 */
const BitmapAnimation = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class BitmapAnimation extends Animation {
        /**
         * Create a new instance of BitmapAnimation.
         * @param   {Object}    owner       Owner of the BitmapAnimation.
         * @param   {Object}    props       Properties to initialize the BitmapAnimation.
         * @param   {Boolean}   autoStart   Start the animation after creation.
         */
        constructor(owner, props, autoStart) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props, autoStart);
                // Initialization
                const priv = internal(this);
                const current = priv.current = {};
                current.canvas = doc.createElement(Types.HTMLELEMENTS.CANVAS);
                current.canvas.width = 1;
                current.canvas.height = 1;
                current.ctx = canvas.getContext('2d');
                //#region Getter/Setter
                //#endregion
                this.startValue = new Image;
                this.startFromCurrent = false;
                this.stopValue = new Image;
            }
        }
        get current() {
            return internal(this).current;
        }
        /**
         * Set the current property
         * @param   {Object}   newValue    the new value
         */
        set current(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.OBJECT && newValue.canvas) {
                if (priv.current !== newValue) {
                    priv.current = newValue;
                }
            }
        }
        //#region Methods
        /**
         * process animation on each tick
         * @override
         */
        processAnimation() {
            const form = this.form;
            const control = this.control;
            const propertyName = this.propertyName;
            const stopValue = this.stopValue;
            const inverse = this.inverse;
            const current = this.current;
            const currentCtx = current.ctx;
            const startValue = this.startValue;
            const imgCanvasCtx = control.imgCanvas.ctx;
            if (control && control.checkOwnerVisible() && !form.loading && !form.creating) {
                super.processAnimation();
                if (control[propertyName]) {
                    if (control[propertyName] instanceof Image) {
                        let r;
                        if (control.allowUpdate) {
                            r = control.screenRect();
                            //this.owner.redraw(r);
                        }
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
                        if (control.allowUpdate) {
                            control.update();
                        }
                        if (!form.useRequestAnim) {
                            control.redraw(r);
                        } else {
                            form.needRedraw = true;
                        }
                    }
                }
            }
        }
        /**
         * When the class is loaded
         * @override
         */
        loaded() {
            let style = String.EMPTY;
            let back = String.EMPTY;
            const imageWraps = Types.IMAGEWRAPS;
            const _const = Types.CONSTANTS;
            const control = this.control;
            const ctrlInternalId = control.internalId;
            const internalId = this.internalId;
            if (control) {
                super.loaded();
                const cssProp = `0% { ${Convert.propertyToCssProperty(this, true)} }
                   100% { ${Convert.propertyToCssProperty(this)} } `;
                Css.addCSSRule(`@${Core.browser.getVendorPrefix('keyframes')} keyframes ${internalId}_hover`, cssProp);
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
                Css.addCSSRule(`#${ctrlInternalId}:hover${_const.PSEUDOCLASSBEFORE}:before`, Core.browser.getVendorPrefix('animation') + `animation:${this.toCSS(internalId + '_hover').replace(' none ', ' forwards ')};`);
                style = `position:absolute;left:0;top:0;right:0;bottom:0;content:'';opacity:0;background-image:url('${this.stopValue.src}');`;
                Css.addCSSRule(`#${ctrlInternalId}${_const.PSEUDOCLASSBEFORE}:after`, `${style}${back}`);
                Css.addCSSRule(`#${ctrlInternalId}${_const.PSEUDOCLASSBEFORE}:after`, `animation:${this.toCSS(internalId + '_hover')};`);
                Css.addCSSRule(`#${ctrlInternalId}:hover${_const.PSEUDOCLASSBEFORE}:after`, Core.browser.getVendorPrefix('animation') + `animation:${this.toCSS().replace(' none ', ' forwards ')};`);
            }
        }
        /**
         * Assign properties from another animation
         * @param   {BitmapAnimation}     source      The animation source
         * @override
         */
        assign(source) {
            if (source instanceof Core.classes.BitmapAnimation) {
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
            const current = this.current;
            if (current) {
                current.canvas = null;
                current.ctx = null;
            }
            super.destroy();
        }
        //#endregion
    }
    return BitmapAnimation;
})();
//#endregion
Core.classes.register(Types.CATEGORIES.ANIMATIONS, BitmapAnimation);
export { BitmapAnimation };