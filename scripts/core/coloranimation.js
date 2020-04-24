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
            props.startValue = new core.classes.Color(Colors.TRANSPARENT);
            props.startFromCurrent = !1;
            props.stopValue = new core.classes.Color(Colors.TRANSPARENT);
            super(owner, props, autoStart);
        }
    }
    //#region Methods
    /**
     * Start the animation
     */
    start() {
        //#region Variables déclaration
        const control = this.control;
        const propertyName = this.propertyName;
        //#endregion Variables déclaration
        if (control && control[this.propertyName] && core.isHTMLRenderer || control.HTMLElement === core.types.HTMLELEMENTS.CANVAS) {
            this.startFromCurrent && control[propertyName] instanceof core.classes.Color
                ? this.startValue.assign(control[propertyName]) : 1;
            super.start();
        }
    }
    //#region Methods
    /**
     * process animation on each tick
     */
    processAnimation() {
        //#region Variables déclaration
        const form = this.form;
        const control = this.control;
        const propertyName = this.propertyName;
        //#endregion Variables déclaration
        if (this.owner.checkOwnerVisible() && !form.loading && !form.creating && control) {
            super.processAnimation();
            if (control[propertyName] && control[propertyName] instanceof core.classes.Color) {
                const newColor = Interpolation.color(this.startValue, this.stopValue, this.normalizedTime());
                control[propertyName].assign(newColor);
                control.allowUpdate && core.tools.isFunc(control.update) ? control.update() : 1;
            }
        }
    }
    /**
     * Assign properties from another animation
     * @param   {ColorAnimation}     source      The animation source
     */
    assign(source) {
        if (source instanceof core.classes.ColorAnimation) {
            super.assign(source);
            this.startValue = source.startValue;
            this.startFromCurrent = source.startFromCurrent;
            this.stopValue = source.stopValue;
        }
    }
    //#endregion
}
core.classes.register(core.types.CATEGORIES.ANIMATIONS, ColorAnimation);
//#endregion
export { ColorAnimation };