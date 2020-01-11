import { Animation } from "/scripts/core/animation.js";
//#region PathSwitcher
//#region PathAnimation
/**
 * Class representing an PathSwitcher.
 * @extends {Animation}
 */
const PathSwitcher = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class PathSwitcher extends Animation {
        /**
         * Create a new instance of PathSwitcher.
         * @param   {Object}    owner       Owner of the PathSwitcher.
         * @param   {Object}    props       Properties to initialize the PathSwitcher.
         * @param   {Boolean}   autoStart   Start the animation after creation.
         */
        constructor(owner, props, autoStart) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props, autoStart);
                const priv = internal(this);
                priv.duration = 0.001;
                priv.pathTrue = null;
                priv.pathFalse = null;
            }
        }
        //#region Getter / Setter
        get duration() {
            return internal(this).duration;
        }
        set duration(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.duration !== newValue) {
                    priv.duration = newValue;
                }
            }
        }
        get pathTrue() {
            return internal(this).pathTrue;
        }
        set pathTrue(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (priv.pathTrue !== newValue) {
                    priv.pathTrue = newValue;
                }
            }
        }
        get pathFalse() {
            return internal(this).pathFalse;
        }
        set pathFalse(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (priv.pathFalse !== newValue) {
                    priv.pathFalse = newValue;
                }
            }
        }
        //#endregion
        //#region Methods
        /**
         * Assign properties from another animation
         * @param   {PathSwitcher}     source      The animation source
         */
        assign(source) {
            if (source instanceof Core.classes.PathSwitcher) {
                super.assign(source);
                this.pathTrue = source.pathTrue;
                this.pathFalse = source.pathFalse;
            }
        }
        /**
         * Destroy the instance
         */
        destroy() {
            super.destroy();
        }
        //#endregion
    }
    return PathSwitcher;
})();
Object.defineProperties(PathSwitcher, {
    "duration": {
        enumerable: true
    },
    "pathTrue": {
        enumerable: true
    },
    "pathFalse": {
        enumerable: true
    }
});
//#endregion
Core.classes.register(Types.CATEGORIES.ANIMATIONS, PathSwitcher);
export { PathSwitcher };