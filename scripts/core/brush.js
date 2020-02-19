//#region Imports
import { Bindable } from '/scripts/core/bindable.js';
import { Colors } from '/scripts/core/color.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion
//#region Brush
// TODO : support of databinding
/**
 * Class representing an Brush.
 * @extends {Bindable}
 */
const Brush = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Brush extends Bindable {
        /**
         * Create a new instance of Bounds.
         * @param   {String}    style       The brush style.
         * @param   {Color}     color       The brush color.
         * @param   {Object}    owner       Owner of the Bounds.
         */
        constructor(style, color, owner) {
            super();
            const _bitmap = new Image;
            if (owner) {
                if (!(color instanceof Core.classes.Color)) {
                    color = Colors.BLACK;
                }
                this.onChange = new Core.classes.NotifyEvent(owner);
                _bitmap.obj = this;
                const priv = internal(this);
                priv.gradient = new Core.classes.Gradient(this);
                priv.bitmap = _bitmap;
                priv.color = color;
                priv.bitmapRepeatMode = Types.BITMAPREPEATMODES.REPEAT;
                priv.style = style;
                priv.owner = owner;
            }
        }
        /**
         * @return {Color} the color
         */
        get color() {
            return internal(this).color;
        }
        /**
         * Set the color property
         * @param   {Color}   newValue    the new color
         */
        set color(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Color) {
                if (!newValue.equals(priv.color)) {
                    priv.color.assign(newValue);
                    this.onChange.invoke();
                }
            }
        }
        /**
         * @return {Gradient} the gradient
         */
        get gradient() {
            return internal(this).gradient;
        }
        /**
         * Set the gradient property
         * @param   {Gradient}   newValue    the new value
         */
        set gradient(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Gradient) {
                priv.gradient.assign(newValue);
                this.onChange.invoke();
            }
        }
        /**
         * @return {Image} the image
         */
        get bitmap() {
            return internal(this).bitmap;
        }
        /**
         * Set the bitmap property
         * @param   {String}   newValue    the new value
         */
        set bitmap(newValue) {
            const priv = internal(this);
            const bitmap = priv.bitmap;
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (newValue !== bitmap.src) {
                    bitmap.src = newValue;
                    this.onChange.invoke();
                }
            }
        }
        /**
         * @return {String} the bitmapRepeatMode
         */
        get bitmapRepeatMode() {
            return internal(this).bitmapRepeatMode;
        }
        /**
         * Set the bitmapRepeatMode property
         * @param   {String}   newValue    the new value
         */
        set bitmapRepeatMode(newValue) {
            const priv = internal(this);
            if (Tools.valueInSet(newValue, Types.BITMAPREPEATMODES)) {
                if (newValue !== priv.bitmapRepeatMode) {
                    priv.bitmapRepeatMode = newValue;
                    this.onChange.invoke();
                }
            }
        }
        /**
         * @return {String} the style
         */
        get style() {
            return internal(this).style;
        }
        /**
         * Set the style property
         * @param   {String}   newValue    the new value
         */
        set style(newValue) {
            const priv = internal(this);
            if (Tools.valueInSet(newValue, Types.BRUSHSTYLES)) {
                if (newValue !== priv.style) {
                    priv.style = newValue;
                    this.onChange.invoke();
                }
            }
        }
        //#region Methods
        /**
         * Assign properties from another brush
         * @param   {Brush}     source      The brush source
         * @override
         */
        assign(source) {
            if (source instanceof Core.classes.Brush) {
                this.color.assign(source.color);
                if (source.bitmap.src !== String.EMPTY) {
                    this.bitmap.src = source.bitmap.src;
                }
                this.style = source.style;
                if (this.gradient) {
                    if (source.gradient) this.gradient.assign(source.gradient);
                }
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
            const obj = this.obj;
            obj.onChange.hasListener?obj.onChange.invoke():obj.form.addControlToRedraw(obj);
        }
        /**
         * Clear the brush properties.
         */
        clear() {
            this.style = Types.BRUSHSTYLES.NONE;
            this.color.assign(Colors.TRANSPARENT);
        }
        /**
         * Destroy all properties of the instance
         * @override
         */
        destroy() {
            const priv = internal(this);
            priv.gradient.destroy();
            priv.color.destroy();
            this.onChange.destroy();
            super.destroy();
        }
        //#endregion
    }
    return Brush;
})();
Object.defineProperties(Brush, {
    'gradient': {
        enumerable: true
    },
    'bitmap': {
        enumerable: true
    },
    'color': {
        enumerable: true
    },
    'bitmapRepeatMode': {
        enumerable: true
    },
    'style': {
        enumerable: true
    }
});
//#endregion
Core.classes.register(Types.CATEGORIES.COMMON, Brush);
export { Brush };