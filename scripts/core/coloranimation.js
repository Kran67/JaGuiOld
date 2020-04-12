//#region Imports
import { Animation } from '/scripts/core/animation.js';
import { Colors } from '/scripts/core/color.js';
import { Interpolation } from '/scripts/core/interpolations';
//#endregion
//#region ColorAnimation
/**
 * Class representing an ColorAnimation.
 * @extends {Animation}
 */
class ColorAnimation extends Animation {
    /**
     * Create a new instance of ColorAnimation.
     * @param   {Object}    owner       Owner of the ColorAnimation.
     * @param   {Object}    props       Properties to initialize the ColorAnimation.
     * @param   {Boolean}   autoStart   Start the animation after creation.
     */
    constructor(owner, props, autoStart) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props, autoStart);
            this.startValue = new Core.classes.Color(Colors.TRANSPARENT);
            this.startFromCurrent = !1;
            this.stopValue = new Core.classes.Color(Colors.TRANSPARENT);
        }
    }
    //#region Methods
    /**
     * Start the animation
     */
    start() {
        const control = this.control;
        const propertyName = this.propertyName;
        if (control && control[this.propertyName]) {
            if (!Core.isHTMLRenderer || control.HTMLElement === Types.HTMLELEMENTS.CANVAS) {
                if (this.startFromCurrent) {
                    if (control[propertyName] instanceof Core.classes.Color) {
                        this.startValue.assign(control[propertyName]);
                    }
                }
            }
            super.start();
        }
    }
    //#region Methods
    /**
     * process animation on each tick
     */
    processAnimation() {
        const form = this.form;
        const control = this.control;
        const propertyName = this.propertyName;
        if (this.owner.checkOwnerVisible() && !form.loading && !form.creating && control) {
            super.processAnimation();
            if (control[propertyName]) {
                if (control[propertyName] instanceof Core.classes.Color) {
                    const newColor = Interpolation.color(this.startValue, this.stopValue, this.normalizedTime());
                    control[propertyName].assign(newColor);
                    if (control.allowUpdate) {
                        if (typeof control.update === Types.CONSTANTS.FUNCTION) {
                            control.update();
                        }
                    }
                    //if (!this.form.useRequestAnim) this.owner.redraw();
                    //else this.form.needRedraw=!0;
                }
            }
        }
    }
    /**
     * Assign properties from another animation
     * @param   {ColorAnimation}     source      The animation source
     */
    assign(source) {
        if (source instanceof Core.classes.ColorAnimation) {
            super.assign(source);
            this.startValue = source.startValue;
            this.startFromCurrent = source.startFromCurrent;
            this.stopValue = source.stopValue;
        }
    }
    //#endregion
}
//#endregion
Core.classes.register(Types.CATEGORIES.ANIMATIONS, ColorAnimation);
export { ColorAnimation };