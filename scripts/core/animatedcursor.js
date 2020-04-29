//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
//#endregion
//#region AnimatedCursor
/**
 * Class representing an AnimatedCursor.
 * @extends BaseClass
 */
const AnimatedCursor = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) ? _private.set(key, {}) : 1;
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class AnimatedCursor
    class AnimatedCursor extends BaseClass {
        //#region constructor
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
        //#endregion constructor
        //#region Getters / Setters
        //#region HTMLElement
        get HTMLElement() {
            return internal(this).HTMLElement;
        }
        set HTMLElement(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            newValue instanceof HTMLElement && priv.HTMLElement !== newValue
                ? priv.HTMLElement = newValue : 1;
        }
        //#endregion HTMLElement
        //#region maxFrame
        get maxFrame() {
            return internal(this).maxFrame;
        }
        set maxFrame(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isNumber(newValue) && priv.maxFrame !== newValue
                ? priv.maxFrame = newValue : 1;
        }
        //#endregion maxFrame
        //#region curFrame
        get curFrame() {
            return internal(this).curFrame;
        }
        set curFrame(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isNumber(newValue) && priv.curFrame !== newValue
                ? priv.curFrame = newValue : 1;
        }
        //#endregion curFrame
        //#region className
        get className() {
            return internal(this).className;
        }
        set className(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isString(newValue) && priv.className !== newValue
                ? priv.className = newValue : 1;
        }
        //#endregion className
        //#region iterationBetweenFrames
        get iterationBetweenFrames() {
            return internal(this).iterationBetweenFrames;
        }
        set iterationBetweenFrames(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isNumber(newValue) && priv.iterationBetweenFrames !== newValue
                ? priv.iterationBetweenFrames = newValue : 1;
        }
        //#endregion iterationBetweenFrames
        //#region iteration
        get iteration() {
            return internal(this).iteration;
        }
        set iteration(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isNumber(newValue) && priv.iteration !== newValue
                ? priv.iteration = newValue : 1;
        }
        //#endregion iteration
        //#endregion Getters / Setters
        //#region Methods
        //#region animate
        animate(elapsedTime) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = priv.HTMLElement;
            let curFrame = priv.curFrame;
            let iteration = priv.iteration;
            const className = priv.className;
            const iterationBetweenFrames = priv.iterationBetweenFrames;
            //#endregion Variables déclaration
            if (iterationBetweenFrames > 0 && iteration < iterationBetweenFrames) {
                iteration = priv.iteration++;
                return;
            }
            htmlElement.classList.remove(`${className}${curFrame}`);
            curFrame++;
            curFrame > priv.maxFrame ? curFrame = priv.curFrame = 0 : 1;
            htmlElement.classList.add(`${className}${curFrame}`);
            priv.iteration = 0;
            priv.curFrame = curFrame;
        }
        //#endregion animate
        //#region initAnimation
        initAnimation(htmlObj, className) {
            //#region Variables déclaration
            const priv = internal(this);
            let htmlElement = priv.HTMLElement;
            //#endregion Variables déclaration
            htmlElement = priv.HTMLElement = htmlObj;
            priv.className = className;
            priv.curFrame = 0;
            const curFrame = priv.curFrame;
            htmlElement.classList.remove(className);
            htmlElement.classList.add(`${className}${curFrame}`);
            priv.maxFrame = ~~getComputedStyle(htmlElement).animationIterationCount;
            priv.iterationBetweenFrames = ~~getComputedStyle(htmlElement).animationDuration;
            core.looper.addListener(this, 'animate');
        }
        //#endregion initAnimation
        //#region stopAnimation
        stopAnimation() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.looper.removeListener(this);
            priv.HTMLElement.classList.remove(`${priv.className}${priv.curFrame}`);
        }
        //#endregion stopAnimation
        //#endregion Methods
    }
    return AnimatedCursor;
    //#endregion Class AnimatedCursor
})();
core.classes.register(core.types.CATEGORIES.INTERNAL, AnimatedCursor);
//#endregion AnimatedCursor
export { AnimatedCursor };