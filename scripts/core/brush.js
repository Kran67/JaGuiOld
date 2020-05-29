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
            !(color instanceof core.classes.Color) ? color = Colors.BLACK : 1;
            //#region Properties
            //#region Private Properties
            bitmap.obj = this;
            core.private(this, {
                gradient: new core.classes.Gradient(this),
                bitmap: bitmap,
                color: color,
                bitmapRepeatMode: core.types.BITMAPREPEATMODES.REPEAT,
                style: style,
                owner: owner
            });
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
        return core.private(this)[core.tools.getPropertyName()];
    }
    set color(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#enregion Variables déclaration
        if (newValue instanceof core.classes.Color && !newValue.equals(priv[propName])) {
            priv[propName].assign(newValue);
            this.onChange.invoke();
        }
    }
    //#endregion color
    //#region gradient
    get gradient() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set gradient(newValue) {
        if (newValue instanceof core.classes.Gradient) {
            core.private(this)[core.tools.getPropertyName()].assign(newValue);
            this.onChange.invoke();
        }
    }
    //#endregion gradient
    //#region bitmap
    get bitmap() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set(newValue) {
        //#region Variables déclaration
        const bitmap = core.private(this).bitmap;
        //#region Variables déclaration
        if (core.tools.isString(newValue) && newValue !== bitmap.src) {
            bitmap.src = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion bitmap
    //#region bitmapRepeatMode
    get bitmapRepeatMode() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set bitmapRepeatMode(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, core.types.BITMAPREPEATMODES) && newValue !== priv[propName]) {
            core.private(this, { [propName]: newValue });
            this.onChange.invoke();
        }
    }
    //#endregion bitmapRepeatMode
    //#region style
    get style() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set style(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, core.types.BRUSHSTYLES) && newValue !== priv[propName]) {
            core.private(this, { [propName]: newValue });
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (source instanceof core.classes.Brush) {
            priv.color.assign(source.color);
            !String.isNullOrEmpty(source.bitmap.src) && (priv.bitmap.src = source.bitmap.src);
            core.private(this, { style: source.style});
            priv.gradient && source.gradient && priv.gradient.assign(source.gradient);
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
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.private(this, { style: core.types.BRUSHSTYLES.NONE});
        priv.color.assign(Colors.TRANSPARENT);
    }
    /**
     * Destroy all properties of the instance
     * @override
     */
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.gradient.destroy();
        priv.color.destroy();
        this.onChange.destroy();
        this.onChange = null;
        delete this.onChange;
        super.destroy();
    }
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.COMMON, Brush);
//#endregion Brush
export { Brush };