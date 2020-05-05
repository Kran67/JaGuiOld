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
            props.startValue = new core.classes.Gradient(this);
            props.startFromCurrent = false;
            props.stopValue = new core.classes.Gradient(this);
            super(owner, props, autoStart);
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
            if (!core.isHTMLRenderer || control.HTMLElement === core.types.HTMLELEMENTS.CANVAS
                && this.startFromCurrent && control[propertyName]
                && control[propertyName] instanceof core.classes.Gradient) {
                this.startValue = control[propertyName];
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
        if (control) {
            if (!this.convertToCSS || control.HTMLElement === core.types.HTMLELEMENTS.CANVAS) {
                if (core.isHTMLRenderer && control.checkOwnerVisible() && !form.loading && !form.creating) {
                    super.processAnimation();
                    if (control[propertyName]) {
                        if (control[propertyName] instanceof core.classes.Gradient) {
                            const g = control[propertyName];
                            g.items.forEach((item, i) => {
                                const stopValue = this.stopValue;
                                const startValue = this.startValue;
                                if (i < stopValue.items.length || i < startValue.items.length) {
                                    const newColor = Interpolation.color(startValue.items[i].color,
                                        stopValue.items[i].color, this.normalizedTime());
                                    item.color.assign(newColor);
                                }
                            });
                            if (!core.isHTMLRenderer) {
                                control.allowUpdate && control.update();
                                !form.useRequestAnim ? control.redraw() : form.needRedraw = true;
                            } else {
                                control.paint();
                            }
                        }
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
        if (source instanceof core.classes.GradientAnimation) {
            super.assign(source);
            this.startValue = source.startValue;
            this.startFromCurrent = source.startFromCurrent;
            this.stopValue = source.stopValue;
        }
    }
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.ANIMATIONS, GradientAnimation);
//#endregion GradientAnimation
export { GradientAnimation };