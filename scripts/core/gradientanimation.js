//#region Imports
import { Interpolation } from "/scripts/core/interpolations.js";
//import { Gradient } from '/scripts/core/gradient.js';
import { Animation } from '/scripts/core/animation.js';
//#endregion
//#region GradientAnimation
/**
 * Class representing an GradientAnimation.
 * @extends {Animation}
 */
class GradientAnimation extends Animation {
    /**
     * Create a new instance of GradientAnimation.
     * @param   {Object}    owner       Owner of the GradientAnimation.
     * @param   {Object}    props       Properties to initialize the GradientAnimation.
     * @param   {Boolean}   autoStart   Start the animation after creation.
     */
    constructor(owner, props, autoStart) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props, autoStart);
            this.startValue = new Core.classes.Gradient(this);
            this.startFromCurrent = false;
            this.stopValue = new Core.classes.Gradient(this);
        }
    }
    //#region Methods
    /**
     * Start the animation
     */
    start() {
        const control = this.control;
        const propertyName = this.propertyName;
        if (control) {
            if (!Core.isHTMLRenderer || control.HTMLElement === Types.HTMLELEMENTS.CANVAS) {
                if (this.startFromCurrent) {
                    if (control[propertyName]) {
                        if (control[propertyName] instanceof Core.classes.Gradient) {
                            this.startValue = control[propertyName];
                        }
                    }
                }
            }
            super.start();
        }
    }
    /**
     * process animation on each tick
     */
    processAnimation() {
        const control = this.control;
        const form = this.form;
        const propertyName = this.propertyName;
        if (!control) return;
        if (!this.convertToCSS || control.HTMLElement === Types.HTMLELEMENTS.CANVAS) {
            if (!Core.isHTMLRenderer) {
                if (!control.checkOwnerVisible()) return;
                if (form.loading || form.creating) return;
            }
            super.processAnimation();
            if (control[propertyName]) {
                if (control[propertyName] instanceof Core.classes.Gradient) {
                    const g = control[propertyName];
                    g.items.forEach((item, i) => {
                        const stopValue = this.stopValue;
                        const startValue = this.startValue;
                        if (i < stopValue.items.length || i < startValue.items.length) {
                            const newColor = Interpolation.color(startValue.items[i].color, stopValue.items[i].color, this.normalizedTime());
                            item.color.assign(newColor);
                        }
                    });
                    if (!Core.isHTMLRenderer) {
                        if (control.allowUpdate) control.update();
                        if (!form.useRequestAnim) control.redraw();
                        else form.needRedraw = true;
                    } else {
                        control.paint();
                    }
                }
            }
        }
    }
    /**
     * Assign properties from another animation
     * @param   {GradientAnimation}     source      The animation source
     */
    assign(source) {
        if (source instanceof Core.classes.GradientAnimation) {
            super.assign(source);
            this.startValue = source.startValue;
            this.startFromCurrent = source.startFromCurrent;
            this.stopValue = source.stopValue;
        }
    }
    //#endregion
}
//#endregion
Core.classes.register(Types.CATEGORIES.ANIMATIONS, GradientAnimation);
export { GradientAnimation };