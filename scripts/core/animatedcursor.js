//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
//#endregion
//#region AnimatedCursor
/**
 * Class representing an AnimatedCursor.
 * @extends BaseClass
 */
//#region Class AnimatedCursor
class AnimatedCursor extends BaseClass {
    //#region Private fields
    #HTMLElement= null;
    #maxFrame= 0;
    #curFrame= 0;
    #className= null;
    #iterationBetweenFrames= 0;
    #iteration= 0;
    //#endregion Private fields
    //#region Getters / Setters
    //#region HTMLElement
    get HTMLElement() {
        return this.#HTMLElement;
    }
    set HTMLElement(newValue) {
        //#region Variables déclaration
        const htmlElement = this.#HTMLElement;
        //#endregion Variables déclaration
        newValue instanceof HTMLElement && htmlElement !== newValue
            && (this.#HTMLElement = newValue);
    }
    //#endregion HTMLElement
    //#region maxFrame
    get maxFrame() {
        return this.#maxFrame;
    }
    set maxFrame(newValue) {
        //#region Variables déclaration
        const maxFrame = this.#maxFrame;
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && maxFrame !== newValue
            && (this.#maxFrame = newValue);
    }
    //#endregion maxFrame
    //#region curFrame
    get curFrame() {
        return this.#curFrame;
    }
    set curFrame(newValue) {
        //#region Variables déclaration
        const curFrame = this.#curFrame;
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && curFrame !== newValue
            && (this.#curFrame = newValue);
    }
    //#endregion curFrame
    //#region className
    get className() {
        return this.#className;
    }
    set className(newValue) {
        //#region Variables déclaration
        const className = this.#className;
        //#endregion Variables déclaration
        core.tools.isString(newValue) && className !== newValue
            && (this.#className = newValue);
    }
    //#endregion className
    //#region iterationBetweenFrames
    get iterationBetweenFrames() {
        return this.#iterationBetweenFrames;
    }
    set iterationBetweenFrames(newValue) {
        //#region Variables déclaration
        const iterationBetweenFrames = this.#iterationBetweenFrames;
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && iterationBetweenFrames !== newValue
            && (this.#iterationBetweenFrames = newValue);
    }
    //#endregion iterationBetweenFrames
    //#region iteration
    get iteration() {
        return this.#iteration;
    }
    set iteration(newValue) {
        //#region Variables déclaration
        const iteration = this.#iteration;
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && iteration !== newValue
            && (this.#iteration = newValue);
    }
    //#endregion iteration
    //#endregion Getters / Setters
    //#region Methods
    //#region animate
    animate(elapsedTime) {
        //#region Variables déclaration
        const htmlElement = this.#HTMLElement;
        let curFrame = this.#curFrame;
        let iteration = this.#iteration;
        const className = this.#className;
        const iterationBetweenFrames = this.#iterationBetweenFrames;
        //#endregion Variables déclaration
        if (iterationBetweenFrames > 0 && iteration < iterationBetweenFrames) {
            iteration = this.#iteration++;
            return;
        }
        htmlElement.classList.remove(`${className}${curFrame}`);
        curFrame++;
        curFrame > this.#maxFrame && (curFrame = 0);
        htmlElement.classList.add(`${className}${curFrame}`);
        this.#iteration = 0;
        this.#curFrame = curFrame;
    }
    //#endregion animate
    //#region initAnimation
    initAnimation(htmlObj, className) {
        //#region Variables déclaration
        let htmlElement;
        //#endregion Variables déclaration
        this.#HTMLElement = htmlElement = htmlObj;
        this.#className = className;
        this.#curFrame = 0;
        const curFrame = 0;
        htmlElement.classList.remove(className);
        htmlElement.classList.add(`${className}${curFrame}`);
        this.#maxFrame = int(getComputedStyle(htmlElement).animationIterationCount);
        this.#iterationBetweenFrames = int(getComputedStyle(htmlElement).animationDuration);
        core.looper.addListener(this, 'animate');
    }
    //#endregion initAnimation
    //#region stopAnimation
    stopAnimation() {
        core.looper.removeListener(this);
        this.#HTMLElement.classList.remove(`${this.#className}${this.#curFrame}`);
    }
    //#endregion stopAnimation
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, AnimatedCursor);
//#endregion AnimatedCursor
export { AnimatedCursor };