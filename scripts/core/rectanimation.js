import { Animation } from '/scripts/core/animation.js';
import { Rect } from '/scripts/core/geometry.js';
import { Css } from '/scripts/core/css.js';
import { Interpolation } from '/scripts/core/interpolations.js';
//#region RectAnimation
const RectAnimation = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) ? _private.set(key, {}) : 1;
        // Return private properties object
        return _private.get(key);
    };
    //#region RectAnimation
    class RectAnimation extends Animation {
        //#region constructor
        constructor(owner, props, autoStart) {
            props = !props ? {} : props;
            if (owner) {
                props.startValue = new core.classes.Rect;
                props.startFromCurrent = !1;
                props.stopValue = new core.classes.Rect;
                super(owner, props, autoStart);
                const priv = internal(this);
                priv.current = new core.classes.Rect;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        get current() {
            return internal(this).current;
        }
        //#endregion Getters / Setters
        //#region Methods
        //#region start
        start() {
            if (this.control) {
                if (!this.convertToCSS || this.control.HTMLElement === core.types.HTMLELEMENTS.CANVAS
                    && this.startFromCurrent && this.control[this.propertyName]
                    && this.control[this.propertyName] instanceof core.classes.Bounds) {
                    this.startValue = this.control[this.propertyName];
                }
                super.start();
            }
        }
        //#endregion start
        //#region processAnimation
        processAnimation() {
            //#region Variables déclaration
            const nt = this.normalizedTime();
            const rect = this.current;
            const startValue = this.startValue;
            const stopValue = this.stopValue;
            const control = this.control;
            const form = this.form;
            const propertyName = this.propertyName;
            //#endregion Variables déclaration
            if (this.control && !this.convertToCSS || this.control.HTMLElement === core.types.HTMLELEMENTS.CANVAS) {
                if (!core.isHTMLRenderer && !this.control.isVisible) {
                    return;
                }
                if (form.loading || form.creating) {
                    return;
                }
                super.processAnimation();
                rect.left = Interpolation.single(startValue.left, stopValue.left, nt);
                rect.top = Interpolation.single(startValue.top, stopValue.top, nt);
                rect.right = Interpolation.single(startValue.right, stopValue.right, nt);
                rect.bottom = Interpolation.single(startValue.bottom, stopValue.bottom, nt);
                this.current.assign(rect);
                if (control[propertyName]) {
                    if (control[propertyName] instanceof Rect) {
                        control.allowUpdate && !core.isHTMLRenderer ? control.update() : 1;
                        !core.isHTMLRenderer
                            ? core.canvas.needRedraw = !0
                            : Css.updateInlineCSS(control, core.types.JSCSSPROPERTIES.MARGIN);
                    }
                }
            }
        }
        //#endregion processAnimation
        //#region assign
        assign(source) {
            if (source instanceof core.classes.RectAnimation) {
                super.assign(source);
                this.startValue = source.startValue;
                this.startFromCurrent = source.startFromCurrent;
                this.stopValue = source.stopValue;
            }
        }
        //#endregion assign
        //#region destroy
        destroy() {
            priv.current.destroy();
            priv.current = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return RectAnimation;
    //#endregion RectAnimation
})();
core.classes.register(core.types.CATEGORIES.ANIMATIONS, RectAnimation);
//#endregion RectAnimation
export { RectAnimation };