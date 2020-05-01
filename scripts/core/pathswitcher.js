//#region imports
import { Animation } from '/scripts/core/animation.js';
//#endregion imports
//#region PathSwitcher
/**
 * Class representing an PathSwitcher.
 * @extends {Animation}
 */
const PathSwitcher = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) ? _private.set(key, {}) : 1;
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
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
                const priv = internal(this);
                priv.pathTrue = null;
                priv.pathFalse = null;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region pathTrue
        get pathTrue() {
            return internal(this).pathTrue;
        }
        set pathTrue(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isString(newValue) && priv.pathTrue !== newValue ? priv.pathTrue = newValue : 1;
        }
        //#endregion pathTrue
        //#region pathFalse
        get pathFalse() {
            return internal(this).pathFalse;
        }
        set pathFalse(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isString(newValue) && priv.pathFalse !== newValue ? priv.pathFalse = newValue : 1;
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
            const priv = internal(this);
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
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.pathTrue = null;
            priv.pathFalse = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return PathSwitcher;
    //#region PathSwitcher
})();
core.classes.register(core.types.CATEGORIES.ANIMATIONS, PathSwitcher);
//#region Class PathSwitcher
export { PathSwitcher };