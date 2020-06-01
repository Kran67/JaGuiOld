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
            core.private(this, {
                pathTrue: null,
                pathFalse: null
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region pathTrue
    get pathTrue() {
        return core.private(this).pathTrue;
    }
    set pathTrue(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isString(newValue) && priv.pathTrue !== newValue && (priv.pathTrue = newValue);
    }
    //#endregion pathTrue
    //#region pathFalse
    get pathFalse() {
        return core.private(this).pathFalse;
    }
    set pathFalse(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isString(newValue) && priv.pathFalse !== newValue && (priv.pathFalse = newValue);
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (source instanceof core.classes.PathSwitcher) {
            super.assign(source);
            priv.pathTrue = source.pathTrue;
            priv.pathFalse = source.pathFalse;
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