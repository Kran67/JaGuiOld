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
        core.setPrivate(this, 'HTMLElement', null);
        core.setPrivate(this, 'maxFrame', null);
        core.setPrivate(this, 'curFrame', null);
        core.setPrivate(this, 'className', null);
        core.setPrivate(this, 'iterationBetweenFrames', 0);
        core.setPrivate(this, 'iteration', 0);
        //#endregion
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region HTMLElement
    get HTMLElement() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set HTMLElement(newValue) {
        //#region Variables déclaration
        const propName=  core.tools.getPropertyName();
        const htmlElement = core.getPrivate(this, propName);
        //#endregion Variables déclaration
        newValue instanceof HTMLElement && htmlElement !== newValue && core.setPrivate(this, propName, newValue);
    }
    //#endregion HTMLElement
    //#region maxFrame
    get maxFrame() {
        return core.getPrivate(this, maxFrame);
    }
    set maxFrame(newValue) {
        //#region Variables déclaration
        const propName =  core.tools.getPropertyName();
        const maxFrame = core.getPrivate(this, propName);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && maxFrame !== newValue && core.setPrivate(this, propName, newValue);
    }
    //#endregion maxFrame
    //#region curFrame
    get curFrame() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set curFrame(newValue) {
        //#region Variables déclaration
        const propName =  core.tools.getPropertyName();
        const curFrame = core.getPrivate(this, propName);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && curFrame !== newValue && core.setPrivate(this, propName, newValue);
    }
    //#endregion curFrame
    //#region className
    get className() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set className(newValue) {
        //#region Variables déclaration
        const propName =  core.tools.getPropertyName();
        const className = core.getPrivate(this, propName);
        //#endregion Variables déclaration
        core.tools.isString(newValue) && className !== newValue && core.setPrivate(this, propName, newValue);
    }
    //#endregion className
    //#region iterationBetweenFrames
    get iterationBetweenFrames() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set iterationBetweenFrames(newValue) {
        //#region Variables déclaration
        const propName =  core.tools.getPropertyName();
        const iterationBetweenFrames = core.getPrivate(this, propName);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && iterationBetweenFrames !== newValue
            && core.setPrivate(this, propName, newValue);
    }
    //#endregion iterationBetweenFrames
    //#region iteration
    get iteration() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set iteration(newValue) {
        //#region Variables déclaration
        const propName =  core.tools.getPropertyName();
        const iteration = core.getPrivate(this, propName);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && iteration !== newValue && core.setPrivate(this, propName, newValue);
    }
    //#endregion iteration
    //#endregion Getters / Setters
    //#region Methods
    //#region animate
    animate(elapsedTime) {
        //#region Variables déclaration
        const htmlElement = core.getPrivate(this, 'HTMLElement');
        let curFrame = core.getPrivate(this, 'curFrame');
        let iteration = core.getPrivate(this, 'iteration');
        const className = core.getPrivate(this, 'className');
        const iterationBetweenFrames = core.getPrivate(this, 'iterationBetweenFrames');
        //#endregion Variables déclaration
        if (iterationBetweenFrames > 0 && iteration < iterationBetweenFrames) {
            iteration = core.getPrivate(this, 'iteration')++;
            return;
        }
        htmlElement.classList.remove(`${className}${curFrame}`);
        curFrame++;
        curFrame > core.getPrivate(this, 'maxFrame') && (curFrame = 0);
        htmlElement.classList.add(`${className}${curFrame}`);
        core.setPrivate(this, 'iteration', 0);
        core.setPrivate(this, 'curFrame', curFrame);
    }
    //#endregion animate
    //#region initAnimation
    initAnimation(htmlObj, className) {
        //#region Variables déclaration
        let htmlElement;
        //#endregion Variables déclaration
        htmlElement = htmlObj;
        core.setPrivate(this, 'HTMLElement', htmlElement);
        core.setPrivate(this, 'className', className);
        core.setPrivate(this, 'curFrame', 0);
        const curFrame = core.getPrivate(this, 'curFrame');
        htmlElement.classList.remove(className);
        htmlElement.classList.add(`${className}${curFrame}`);
        core.setPrivate(this, 'maxFrame', int(getComputedStyle(htmlElement).animationIterationCount));
        core.setPrivate(this, 'iterationBetweenFrames', int(getComputedStyle(htmlElement).animationDuration));
        core.looper.addListener(this, 'animate');
    }
    //#endregion initAnimation
    //#region stopAnimation
    stopAnimation() {
        core.looper.removeListener(this);
        core.getPrivate(this, 'HTMLElement').classList
            .remove(`${core.getPrivate(this, 'className')}${core.getPrivate(this, 'curFrame')}`);
    }
    //#endregion stopAnimation
    //#region destroy
    destroy() {
        core.setPrivate(this, 'HTMLElement', null);
        core.setPrivate(this, 'maxFrame', null);
        core.setPrivate(this, 'curFrame', null);
        core.setPrivate(this, 'className', null);
        core.setPrivate(this, 'iterationBetweenFrames', null);
        core.setPrivate(this, 'iteration', null);
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, AnimatedCursor);
//#endregion AnimatedCursor
export { AnimatedCursor };