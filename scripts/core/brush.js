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
//#region Brush
class Brush extends Bindable {
    //#region Private fields
    #gradient;
    #bitmap;
    #color;
    #bitmapRepeatMode;
    #style;
    #owner;
    //#endregion Private fields
    /**
     * Create a new instance of Bounds.
     * @param   {String}    style       The brush style.
     * @param   {Color}     color       The brush color.
     * @param   {Object}    owner       Owner of the Bounds.
     */
    constructor(style, color, owner) {
        super();
        const bitmap = new Image;
        if (owner) {
            !(color instanceof core.classes.Color) && (color = Colors.BLACK);
            //#region Properties
            //#region Private Properties
            bitmap.obj = this;
            this.#gradient = new core.classes.Gradient(this);
            this.#bitmap = bitmap;
            this.#color = color;
            this.#bitmapRepeatMode = core.types.BITMAPREPEATMODES.REPEAT;
            this.#style = style;
            this.#owner = owner;
            //#endregion Private Properties
            //#region Public Properties
            this.onChange = new core.classes.NotifyEvent(owner);
            //#endregion Public Properties
            //#endregion Properties
        }
    }
    //#region Getters / Setters
    //#region color
    get color() {
        return this.#color;
    }
    set color(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.Color && !newValue.equals(this.#color)) {
            this.#color.assign(newValue);
            this.onChange.invoke();
        }
    }
    //#endregion color
    //#region gradient
    get gradient() {
        return this.#gradient;
    }
    set gradient(newValue) {
        if (newValue instanceof core.classes.Gradient) {
            this.#gradient.assign(newValue);
            this.onChange.invoke();
        }
    }
    //#endregion gradient
    //#region bitmap
    get bitmap() {
        return this.#bitmap;
    }
    set(newValue) {
        //#region Variables déclaration
        const bitmap = this.#bitmap;
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && newValue !== bitmap.src) {
            bitmap.src = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion bitmap
    //#region bitmapRepeatMode
    get bitmapRepeatMode() {
        return this.#bitmapRepeatMode;
    }
    set bitmapRepeatMode(newValue) {
        if (core.tools.valueInSet(newValue, core.types.BITMAPREPEATMODES) && newValue !== this.#bitmapRepeatMode) {
            this.#bitmapRepeatMode = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion bitmapRepeatMode
    //#region style
    get style() {
        return this.#style;
    }
    set style(newValue) {
        if (core.tools.valueInSet(newValue, core.types.BRUSHSTYLES) && newValue !== this.#style) {
            this.#style = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion style
    //#endregion Getters / Setters
    //#region Methods
    /**
     * Assign properties from another brush
     * @param   {Brush}     source      The brush source
     * @override
     */
    assign(source) {
        if (source instanceof core.classes.Brush) {
            this.#color.assign(source.color);
            !String.isNullOrEmpty(source.bitmap.src) && (this.#bitmap.src = source.bitmap.src);
            core.private(this, { style: source.style });
            this.#gradient && source.gradient && this.#gradient.assign(source.gradient);
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
        this.#style = core.types.BRUSHSTYLES.NONE;
        this.#color.assign(Colors.TRANSPARENT);
    }
    /**
     * Destroy all properties of the instance
     * @override
     */
    destroy() {
        this.#gradient.destroy();
        this.#color.destroy();
        this.onChange.destroy();
        this.onChange = null;
        delete this.onChange;
        super.destroy();
    }
    //#endregion Methods
}
Object.defineProperties(Brush.prototype, {
    'gradient': {
        enumerable: !0
    },
    'bitmap': {
        enumerable: !0
    },
    'color': {
        enumerable: !0
    },
    'bitmapRepeatMode': {
        enumerable: !0
    },
    'style': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.COMMON, Brush);
//#endregion Brush
export { Brush };