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
            props.startValue = 0;
            props.startFromCurrent = !1;
            props.stopValue = 0;
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
            !this.convertToCSS || control.HTMLElement === core.types.HTMLELEMENTS.CANVAS
                && this.startFromCurrent && !isNaN(control[propertyName])
                && (this.startValue = control[propertyName]);
            super.start();
        }
    }
    /**
     * Stop the animation
     */
    stop() {
        super.stop();
        !this.convertToCSS || this.control.HTMLElement === core.types.HTMLELEMENTS.CANVAS
            && (this.control = null);
    }
    /**
     * process animation on each tick
     */
    processAnimation() {
        const control = this.control;
        const form = this.form;
        const propertyName = this.propertyName;
        if (!this.convertToCSS || control.HTMLElement === core.types.HTMLELEMENTS.CANVAS) {
            if (!core.isHTMLRenderer && !control.checkOwnerVisible()) {
                return;
            }
            if (!form.loading && !form.creating && control) {
                super.processAnimation();
                if (!isNaN(control[propertyName])) {
                    let r = null;
                    icontrol.allowUpdate && !core.isHTMLRenderer && (r = control.screenRect());
                    const oldValue = control[propertyName];
                    const newValue = Interpolation.single(this.startValue, this.stopValue, this.normalizedTime());
                    if (oldValue !== newValue) {
                        /*if(typeof this.control["set" + this.propertyName.firstCharUpper()] === _const.FUNCTION) */control[propertyName](newValue);
                        /*else*/ control[propertyName] = newValue;
                        if (control.allowUpdate && !core.isHTMLRenderer) {
                            control.update();
                            control.updateXML();
                        }
                        if (!core.isHTMLRenderer) {
                            !form.useRequestAnim ? control.redraw(r) : form.needRedraw = true;
                        } else {
                            core.tools.isFunc(control.update) && control.update();
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
        if (source instanceof core.classes.FloatAnimation) {
            super.assign(source);
            this.startValue = source.startValue;
            this.startFromCurrent = source.startFromCurrent;
            this.stopValue = source.stopValue;
        }
    }
    //#endregion
}
core.classes.register(core.types.CATEGORIES.ANIMATIONS, FloatAnimation);
//#endregion FloatAnimation
export { FloatAnimation };