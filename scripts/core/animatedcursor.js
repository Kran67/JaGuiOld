//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Css } from '/scripts/core/css.js';
//#endregion
//#region AnimatedCursor
/**
 * Class representing an AnimatedCursor.
 * @extends BaseClass
 */
const AnimatedCursor = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class AnimatedCursor extends BaseClass {
        /**
         * Create a new instance Action.
         */
        constructor() {
            super();
            //#region Private properties
            const priv = internal(this);
            priv.HTMLElement = null;
            priv.maxFrame = null;
            priv.curFrame = null;
            priv.className = null;
            priv.iterationBetweenFrames = 0;
            priv.iteration = 0;
            //#endregion
        }
        get HTMLElement() {
            return internal(this).HTMLElement;
        }
        set HTMLElement(newValue) {
            const priv = internal(this);
            if (newValue instanceof HTMLElement) {
                if (priv.HTMLElement !== newValue) {
                    priv.HTMLElement = newValue;
                }
            }
        }
        get maxFrame() {
            return internal(this).maxFrame;
        }
        set maxFrame(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.maxFrame !== newValue) {
                    priv.maxFrame = newValue;
                }
            }
        }
        get curFrame() {
            return internal(this).curFrame;
        }
        set curFrame(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.curFrame !== newValue) {
                    priv.curFrame = newValue;
                }
            }
        }
        get className() {
            return internal(this).className;
        }
        set className(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (priv.className !== newValue) {
                    priv.className = newValue;
                }
            }
        }
        get iterationBetweenFrames() {
            return internal(this).iterationBetweenFrames;
        }
        set iterationBetweenFrames(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.iterationBetweenFrames !== newValue) {
                    priv.iterationBetweenFrames = newValue;
                }
            }
        }
        get iteration() {
            return internal(this).iteration;
        }
        set iteration(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.iteration !== newValue) {
                    priv.iteration = newValue;
                }
            }
        }
        //#region Methods
        /**
         * animate the cursor
         */
        animate(elapsedTime) {
            const htmlElement = this.HTMLElement;
            let curFrame = this.curFrame;
            let iteration = this.iteration;
            const className = this.className;
            const iterationBetweenFrames = this.iterationBetweenFrames;
            if (iterationBetweenFrames > 0) {
                if (iteration < iterationBetweenFrames) {
                    iteration = this.iteration++;
                    //console.log("frame skipped");
                    return;
                }
            }
            //console.log("rendering frame:"+this._curFrame);
            htmlElement.classList.remove(`${className}${curFrame}`);
            curFrame = curFrame++;
            if (curFrame > this.maxFrame) {
                curFrame = this.curFrame = 0;
            }
            htmlElement.classList.add(`${className}${curFrame}`);
            this.iteration = 0;
        }
        /**
         * Initialize the animation
         */
        initAnimation(htmlObj, className) {
            let theme = null;
            let htmlElement = this.HTMLElement;
            if (htmlObj.jsObj) {
                theme = htmlObj.jsObj.form.getThemeName();
            } else if (htmlObj === document.body) {
                theme = document.body.className;
            }
            htmlElement = this.HTMLElement = htmlObj;
            this.className = className;
            this.curFrame = 0;
            const curFrame = this.curFrame;
            htmlElement.classList.remove(className);
            htmlElement.classList.add(`${className}${curFrame}`);
            this.maxFrame = ~~Css.getCSSValue(`.${theme}.${className}${curFrame}`, Core.browser.getVendorPrefixedCssProperty('animation-iteration-count'), null, theme);
            this.iterationBetweenFrames = ~~parseFloat(Css.getCSSValue(`.${theme}.${className}${curFrame}`, Core.browser.getVendorPrefixedCssProperty('animation-duration'), null, theme)) | 0;
            Core.looper.addListener(this, 'animate');
        }
        /**
         * Stop the animation
         */
        stopAnimation() {
            Core.looper.removeListener(this);
            this.HTMLElement.classList.remove(`${this.className}${this.curFrame}`);
        }
        //#endregion Methods
    }
    return AnimatedCursor;
})();
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, AnimatedCursor);
export { AnimatedCursor };