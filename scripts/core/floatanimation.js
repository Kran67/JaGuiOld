//#region Imports
import { Interpolation } from '/scripts/core/interpolations.js';
import { Animation } from '/scripts/core/animation.js';
//#endregion
//#region FloatAnimation
/**
 * Class representing an FloatAnimation.
 * @extends {Animation}
 */
class FloatAnimation extends Animation {
    /**
     * Create a new instance of FloatAnimation.
     * @param   {Object}    owner       Owner of the FloatAnimation.
     * @param   {Object}    props       Properties to initialize the FloatAnimation.
     * @param   {Boolean}   autoStart   Start the animation after creation.
     */
    constructor(owner, props, autoStart) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props, autoStart);
            this.startValue = 0;
            this.startFromCurrent = !1;
            this.stopValue = 0;
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
            if (!this.convertToCSS || control.HTMLElement === Types.HTMLELEMENTS.CANVAS) {
                if (this.startFromCurrent) {
                    if (!isNaN(control[propertyName])) {
                        this.startValue = control[propertyName];
                    }
                }
            }
            super.start();
        }
    }
    /**
     * Stop the animation
     */
    stop() {
        super.stop();
        if (!this.convertToCSS || this.control.HTMLElement === Types.HTMLELEMENTS.CANVAS) {
            this.control = null;
        }
    }
    /**
     * process animation on each tick
     */
    processAnimation() {
        const control = this.control;
        const form = this.form;
        const propertyName = this.propertyName;
        if (!this.convertToCSS || control.HTMLElement === Types.HTMLELEMENTS.CANVAS) {
            if (!Core.isHTMLRenderer) {
                if (!control.checkOwnerVisible()) {
                    return;
                }
            }
            if (!form.loading && !form.creating && control) {
                super.processAnimation();
                if (!isNaN(control[propertyName])) {
                    let r = null;
                    if (control.allowUpdate && !Core.isHTMLRenderer) {
                        r = control.screenRect();
                    }
                    const oldValue = control[propertyName];
                    const newValue = Interpolation.single(this.startValue, this.stopValue, this.normalizedTime());
                    if (oldValue !== newValue) {
                        /*if(typeof this.control["set" + this.propertyName.firstCharUpper()] === _const.FUNCTION) */control[propertyName](newValue);
                        /*else*/ control[propertyName] = newValue;
                        if (control.allowUpdate && !Core.isHTMLRenderer) {
                            control.update();
                            control.updateXML();
                        }
                        if (!Core.isHTMLRenderer) {
                            if (!form.useRequestAnim) {
                                control.redraw(r);
                            } else {
                                form.needRedraw = true;
                            }
                        } else {
                            if (typeof control.update === Types.CONSTANTS.FUNCTION) {
                                control.update();
                            }
                        }
                    }
                }
            }
        }
    }
    /**
     * Assign properties from another animation
     * @param   {FloatAnimation}     source      The animation source
     */
    assign(source) {
        if (source instanceof Core.classes.FloatAnimation) {
            super.assign(source);
            this.startValue = source.startValue;
            this.startFromCurrent = source.startFromCurrent;
            this.stopValue = source.stopValue;
        }
    }
    //#endregion
}
//#endregion
Core.classes.register(Types.CATEGORIES.ANIMATIONS, FloatAnimation);
export { FloatAnimation };