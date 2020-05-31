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
    //#region constructor
    constructor() {
        super();
        //#region Private properties
        core.private(this, {
            HTMLElement: null,
            maxFrame: 0,
            curFrame: 0,
            className: null,
            iterationBetweenFrames: 0,
            iteration: 0
        });
        //#endregion
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region HTMLElement
    get HTMLElement() {
        return core.private(this).HTMLElement;
    }
    set HTMLElement(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = priv.HTMLElement;
        //#endregion Variables déclaration
        newValue instanceof HTMLElement && htmlElement !== newValue
            && (priv.HTMLElement = newValue);
    }
    //#endregion HTMLElement
    //#region maxFrame
    get maxFrame() {
        return core.private(this).maxFrame;
    }
    set maxFrame(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const maxFrame = priv.maxFrame;
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && maxFrame !== newValue
            && (priv.maxFrame = newValue);
    }
    //#endregion maxFrame
    //#region curFrame
    get curFrame() {
        return core.private(this).curFrame;
    }
    set curFrame(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const curFrame = priv.curFrame;
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && curFrame !== newValue
            && (priv.curFrame = newValue);
    }
    //#endregion curFrame
    //#region className
    get className() {
        return core.private(this).className;
    }
    set className(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const className = priv.className;
        //#endregion Variables déclaration
        core.tools.isString(newValue) && className !== newValue
            && (priv.className = newValue);
    }
    //#endregion className
    //#region iterationBetweenFrames
    get iterationBetweenFrames() {
        return core.private(this).iterationBetweenFrames;
    }
    set iterationBetweenFrames(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const iterationBetweenFrames = priv.iterationBetweenFrames;
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && iterationBetweenFrames !== newValue
            && (priv.iterationBetweenFrames = newValue);
    }
    //#endregion iterationBetweenFrames
    //#region iteration
    get iteration() {
        return core.private(this).iteration;
    }
    set iteration(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const iteration = priv.iteration;
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && iteration !== newValue
            && (priv.iteration = newValue);
    }
    //#endregion iteration
    //#endregion Getters / Setters
    //#region Methods
    //#region animate
    animate(elapsedTime) {
        //#region Variables déclaration
        const priv = core.private(this);
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
        curFrame > priv.maxFrame && (curFrame = 0);
        htmlElement.classList.add(`${className}${curFrame}`);
        priv.iteration = 0;
        priv.curFrame = curFrame;
    }
    //#endregion animate
    //#region initAnimation
    initAnimation(htmlObj, className) {
        //#region Variables déclaration
        const priv = core.private(this);
        let htmlElement;
        //#endregion Variables déclaration
        priv.HTMLElement = htmlElement = htmlObj;
        priv.className = className;
        priv.curFrame = 0;
        const curFrame = 0;
        htmlElement.classList.remove(className);
        htmlElement.classList.add(`${className}${curFrame}`);
        priv.maxFrame = int(getComputedStyle(htmlElement).animationIterationCount);
        priv.iterationBetweenFrames = int(getComputedStyle(htmlElement).animationDuration);
        core.looper.addListener(this, 'animate');
    }
    //#endregion initAnimation
    //#region stopAnimation
    stopAnimation() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.looper.removeListener(this);
        priv.HTMLElement.classList.remove(`${priv.className}${priv.curFrame}`);
    }
    //#endregion stopAnimation
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, AnimatedCursor);
//#endregion AnimatedCursor
export { AnimatedCursor };