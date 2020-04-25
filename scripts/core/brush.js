//#region Imports
import { Bindable } from '/scripts/core/bindable.js';
import { Colors } from '/scripts/core/color.js';
//#endregion
//#region Brush
// TODO : support of databinding
/**
 * Class representing an Brush.
 * @extends {Bindable}
 */
const Brush = (() => {
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
    //#region Brush
    class Brush extends Bindable {
        /**
         * Create a new instance of Bounds.
         * @param   {String}    style       The brush style.
         * @param   {Color}     color       The brush color.
         * @param   {Object}    owner       Owner of the Bounds.
         */
        constructor(style, color, owner) {
            super();
            //#region Properties
            //#region Private Properties
            const bitmap = new Image;
            if (owner) {
                if (!(color instanceof core.classes.Color)) {
                    color = Colors.BLACK;
                }
                bitmap.obj = this;
                const priv = internal(this);
                priv.gradient = new core.classes.Gradient(this);
                priv.bitmap = bitmap;
                priv.color = color;
                priv.bitmapRepeatMode = core.types.BITMAPREPEATMODES.REPEAT;
                priv.style = style;
                priv.owner = owner;
                //#endregion Private Properties
                //#region Public Properties
                Object.defineProperties(this, {
                    'color': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).color;
                        },
                        set: function (newValue) {
                            //#region Variables déclaration
                            const priv = internal(this);
                            //#enregion Variables déclaration
                            if (newValue instanceof core.classes.Color && !newValue.equals(priv.color)) {
                                priv.color.assign(newValue);
                                this.onChange.invoke();
                            }
                        }
                    },
                    'gradient': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).gradient;
                        },
                        set: function (newValue) {
                            //#region Variables déclaration
                            const priv = internal(this);
                            //#endregion Variables déclaration
                            if (newValue instanceof core.classes.Gradient) {
                                priv.gradient.assign(newValue);
                                this.onChange.invoke();
                            }
                        }
                    },
                    'bitmap': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).bitmap;
                        },
                        set: function (newValue) {
                            //#region Variables déclaration
                            const priv = internal(this);
                            const bitmap = priv.bitmap;
                            //#region Variables déclaration
                            if (core.tools.isString(newValue) && newValue !== bitmap.src) {
                                bitmap.src = newValue;
                                this.onChange.invoke();
                            }
                        }
                    },
                    'bitmapRepeatMode': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).bitmapRepeatMode;
                        },
                        set: function (newValue) {
                            //#region Variables déclaration
                            const priv = internal(this);
                            //#endregion Variables déclaration
                            if (core.tools.valueInSet(newValue, core.types.BITMAPREPEATMODES) && newValue !== priv.bitmapRepeatMode) {
                                priv.bitmapRepeatMode = newValue;
                                this.onChange.invoke();
                            }
                        }
                    },
                    'style': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).style;
                        },
                        set: function (newValue) {
                            //#region Variables déclaration
                            const priv = internal(this);
                            //#endregion Variables déclaration
                            if (core.tools.valueInSet(newValue, core.types.BRUSHSTYLES) && newValue !== priv.style) {
                                priv.style = newValue;
                                this.onChange.invoke();
                            }
                        }
                    }
                });
                this.onChange = new core.classes.NotifyEvent(owner);
                //#endregion Public Properties
                //#endregion Properties
            }
        }
        //#region Methods
        /**
         * Assign properties from another brush
         * @param   {Brush}     source      The brush source
         * @override
         */
        assign(source) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (source instanceof core.classes.Brush) {
                priv.color.assign(source.color);
                !String.isNullOrEmpty(source.bitmap.src) ? priv.bitmap.src = source.bitmap.src : 1;
                priv.style = source.style;
                priv.gradient && source.gradient ? priv.gradient.assign(source.gradient) : 1;
            }
        }
        /**
         * Invoke the onChange event of gradient.
         */
        gradientChanged() {
            this.obj.onChange.invoke();
        }
        /**
         * Invoke the onChange event of the bitmap.
         */
        bitmapChanged() {
            //#region Variables déclaration
            const obj = this.obj;
            //#endregion Variables déclaration
            obj.onChange.hasListener ? obj.onChange.invoke() : obj.form.addControlToRedraw(obj);
        }
        /**
         * Clear the brush properties.
         */
        clear() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.style = core.types.BRUSHSTYLES.NONE;
            priv.color.assign(Colors.TRANSPARENT);
        }
        /**
         * Destroy all properties of the instance
         * @override
         */
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.gradient.destroy();
            priv.color.destroy();
            priv.gradient = null;
            priv.color = null;
            this.onChange.destroy();
            this.onChange = null;
            delete this.color= null;
            delete this.gradient= null;
            delete this.bitmap= null;
            delete this.bitmapRepeatMode= null;
            delete this.style = null;
            super.destroy();
        }
        //#endregion Methods
    }
    return Brush;
    //#endregion Brush
})();
core.classes.register(core.types.CATEGORIES.COMMON, Brush);
//#endregion Brush
export { Brush };