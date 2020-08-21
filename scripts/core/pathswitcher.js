//#region imports
import { Animation } from '/scripts/core/animation.js';
//#endregion imports
//#region PathSwitcher
/**
 * Class representing an PathSwitcher.
 * @extends {Animation}
 */
//#region Class PathSwitcher
class PathSwitcher extends Animation {
    //#region Private fields
    #pathTrue;
    #pathFalse;
    //#endregion Private fields
    /**
     * Create a new instance of PathSwitcher.
     * @param   {Object}    owner       Owner of the PathSwitcher.
     * @param   {Object}    props       Properties to initialize the PathSwitcher.
     * @param   {Boolean}   autoStart   Start the animation after creation.
     */
    //#region constructor
    constructor(owner, props, autoStart) {
        props = !props ? {} : props;
        if (owner) {
            props.duration = 0.001;
            super(owner, props, autoStart);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region pathTrue
    get pathTrue() {
        return this.#pathTrue;
    }
    set pathTrue(newValue) {
        core.tools.isString(newValue) && this.#pathTrue !== newValue && (this.#pathTrue = newValue);
    }
    //#endregion pathTrue
    //#region pathFalse
    get pathFalse() {
        return this.#pathFalse;
    }
    set pathFalse(newValue) {
        core.tools.isString(newValue) && this.#pathFalse !== newValue && (this.#pathFalse = newValue);
    }
    //#endregion pathFalse
    //#endregion Getters / Setters
    //#region Methods
    /**
     * Assign properties from another animation
     * @param   {PathSwitcher}     source      The animation source
     */
    //#region assign
    assign(source) {
        if (source instanceof core.classes.PathSwitcher) {
            super.assign(source);
            this.#pathTrue = source.pathTrue;
            this.#pathFalse = source.pathFalse;
        }
    }
    //#endregion assign
    /**
     * Destroy the instance
     */
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.ANIMATIONS, PathSwitcher);
//#region Class PathSwitcher
export { PathSwitcher };