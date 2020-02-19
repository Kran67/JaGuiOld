import { Animation } from '/scripts/core/animation.js';
//import { Bounds } from '/scripts/core/bounds.js';
import { Rect } from '/scripts/core/geometry.js';
import { Css } from '/scripts/core/css.js';
import { Interpolation } from '/scripts/core/interpolations.js';
//#region RectAnimation
const RectAnimation = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class RectAnimation extends Animation {
        constructor(owner, props, autoStart) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props, autoStart);
                const priv = internal(this);
                this.startValue = new Core.classes.Rect;
                this.startFromCurrent = false;
                this.stopValue = new Core.classes.Rect;
                priv.current = new Core.classes.Rect;
            }
        }
        get current() {
            return internal(this).current;
        }
        //#region Methods
        start() {
            if (this.control) {
                if (!this.convertToCSS || this.control.HTMLElement === Types.HTMLELEMENTS.CANVAS) {
                    if (this.startFromCurrent && this.control[this.propertyName] &&
                        this.control[this.propertyName] instanceof Core.classes.Bounds) {
                        this.startValue = this.control[this.propertyName];
                    }
                }
                super.start();
            }
        }
        processAnimation() {
            const nt = this.normalizedTime();
            const rect = this.current;
            const startValue = this.startValue;
            const stopValue = this.stopValue;
            const control = this.control;
            const form = this.form;
            const propertyName = this.propertyName;
            if (this.control) {
                if (!this.convertToCSS || this.control.HTMLElement === Types.HTMLELEMENTS.CANVAS) {
                    if (!Core.isHTMLRenderer) {
                        if (!this.control.isVisible) {
                            return;
                        }
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
                            //let r;
                            //if (control.allowUpdate && !Core.isHTMLRenderer) {
                            //    r = control.screenRect();
                            //}
                            control[propertyName] = rect;
                            if (control.allowUpdate && !Core.isHTMLRenderer) {
                                control.update();
                                //control.updateXML();
                            }
                            if (!Core.isHTMLRenderer) {
                                //if (!form.useRequestAnim) {
                                //    control.redraw(r);
                                //} else {
                                    //form.needRedraw = true;
                                //}
                                Core.canvas.needRedraw = true;
                            } else {
                                Css.updateInlineCSS(control, Types.JSCSSPROPERTIES.MARGIN);
                                //this.owner.update();
                            }
                        }
                    }
                }
            }
        }
        assign(source) {
            if (source instanceof Core.classes.RectAnimation) {
                super.assign(source);
                this.startValue = source.startValue;
                this.startFromCurrent = source.startFromCurrent;
                this.stopValue = source.stopValue;
            }
        }
        destroy() {
            this.current.destroy();
            super.destroy();
        }
        //#endregion
    }
    return RectAnimation;
})();
//#endregion
Core.classes.register(Types.CATEGORIES.ANIMATIONS, RectAnimation);
export { RectAnimation };