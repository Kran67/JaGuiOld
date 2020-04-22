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
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class AnimatedCursor
    class AnimatedCursor {
        //#region constructor
        constructor() {
            //#region Properties
            //#region Private Properties
            const priv = internal(this);
            priv.HTMLElement = null;
            priv.maxFrame = null;
            priv.curFrame = null;
            priv.className = null;
            priv.iterationBetweenFrames = 0;
            priv.iteration = 0;
            //#endregion Private Properties
            //#region Public Properties
            Object.defineProperties(this, {
                'HTMLElement': {
                    enumerable: !0,
                    configurable: !0,
                    get: function () {
                        return internal(this).HTMLElement;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        newValue instanceof HTMLElement && priv.HTMLElement !== newValue ? priv.HTMLElement = newValue : 1;
                    }
                },
                'maxFrame': {
                    enumerable: !0,
                    configurable: !0,
                    get: function () {
                        return internal(this).maxFrame;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isNumber(newValue) && priv.maxFrame !== newValue ? priv.maxFrame = newValue : 1;
                    }
                },
                'curFrame': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).curFrame;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isNumber(newValue) && priv.curFrame !== newValue ? priv.curFrame = newValue : 1;
                    }
                },
                'className': {
                    enumerable: !0,
                    configurable: !0,
                    get: function () {
                        return internal(this).className;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isString(newValue) && priv.className !== newValue ? priv.className = newValue : 1;
                    }
                },
                'iterationBetweenFrames': {
                    enumerable: !0,
                    configurable: !0,
                    get: function () {
                        return internal(this).iterationBetweenFrames;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isNumber(newValue) && priv.iterationBetweenFrames !== newValue ? priv.iterationBetweenFrames = newValue : 1;
                    }
                },
                'iteration': {
                    enumerable: !0,
                    configurable: !0,
                    get: function () {
                        return internal(this).iteration;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isNumber(newValue) && priv.iteration !== newValue ? priv.iteration = newValue : 1;
                    }
                }
            });
            //#endregion Public Properties
            //#endregion Properties
        }
        //#endregion constructor
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
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.HTMLElement = null;
            priv.maxFrame = null;
            priv.curFrame = null;
            priv.className = null;
            priv.iterationBetweenFrames = null;
            priv.iteration = null;
            this.HTMLElement = null;
            this.maxFrame = null;
            this.curFrame = null;
            this.className = null;
            this.iterationBetweenFrames = null;
            this.iteration = null;
        }
        //#endregion
        //#endregion Methods
    }
    return AnimatedCursor;
    //#endregion Class AnimatedCursor
})();
core.classes.register(core.types.CATEGORIES.INTERNAL, AnimatedCursor);
//#endregion AnimatedCursor
export { AnimatedCursor };