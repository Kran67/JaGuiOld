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
        return core.private(this)[core.tools.getPropertyName()];
    }
    set HTMLElement(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        const htmlElement = priv[propName];
        //#endregion Variables déclaration
        newValue instanceof HTMLElement && htmlElement !== newValue
            && core.private(this, { [propName]: newValue });
    }
    //#endregion HTMLElement
    //#region maxFrame
    get maxFrame() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set maxFrame(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        const maxFrame = priv[propName];
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && maxFrame !== newValue
            && core.private(this, { [propName]: newValue });
    }
    //#endregion maxFrame
    //#region curFrame
    get curFrame() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set curFrame(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        const curFrame = priv[propName];
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && curFrame !== newValue
            && core.private(this, { [propName]: newValue });
    }
    //#endregion curFrame
    //#region className
    get className() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set className(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        const className = priv[propName];
        //#endregion Variables déclaration
        core.tools.isString(newValue) && className !== newValue
            && core.private(this, { [propName]: newValue });
    }
    //#endregion className
    //#region iterationBetweenFrames
    get iterationBetweenFrames() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set iterationBetweenFrames(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        const iterationBetweenFrames = priv[propName];
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && iterationBetweenFrames !== newValue
            && core.private(this, { [propName]: newValue });
    }
    //#endregion iterationBetweenFrames
    //#region iteration
    get iteration() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set iteration(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        const iteration = priv[propName];
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && iteration !== newValue
            && core.private(this, { [propName]: newValue });
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
        core.private(this, { 'iteration': 0, curFrame });
    }
    //#endregion animate
    //#region initAnimation
    initAnimation(htmlObj, className) {
        //#region Variables déclaration
        let htmlElement;
        //#endregion Variables déclaration
        htmlElement = htmlObj;
        core.private(this, {
            HTMLElement: htmlElement,
            className,
            curFrame: 0
        });
        const curFrame = 0;
        htmlElement.classList.remove(className);
        htmlElement.classList.add(`${className}${curFrame}`);
        core.private(this, {
            maxFrame: int(getComputedStyle(htmlElement).animationIterationCount),
            iterationBetweenFrames: int(getComputedStyle(htmlElement).animationDuration)
        });
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