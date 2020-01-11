//#region Imports
import { Css } from "/scripts/core/css.js";
import { Convert } from "/scripts/core/convert.js";
//import { Vector, Point } from "/scripts/core/geometry.js";
//import { Spline } from "/scripts/core/spline.js";
//import { PathData } from "/scripts/core/path.js";
import { Animation } from "/scripts/core/animation.js";
//#endregion
//#region PathAnimation
/**
 * Class representing an PathAnimation.
 * @extends {Animation}
 */
const PathAnimation = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class PathAnimation extends Animation {
        /**
         * Create a new instance of PathAnimation.
         * @param   {Object}    owner       Owner of the PathAnimation.
         * @param   {Object}    props       Properties to initialize the PathAnimation.
         * @param   {Boolean}   autoStart   Start the animation after creation.
         */
        constructor(owner, props, autoStart) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props, autoStart);
                const priv = internal(this);
                // Initialization
                priv.path = new Core.classes.PathData(this);
                priv.rotate = false;
                priv.startPt = new Core.classes.Point(1, 1);
                priv.obj = null;
                priv.polygon = null;
                priv.spline = null;
            }
        }
        //#region Getter/Setter
        get path() {
            return internal(this).path;
        }
        set path(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.PathData) {
                if (priv.path !== newValue) {
                    priv.path = newValue;
                }
            }
        }
        get rotate() {
            return internal(this).rotate;
        }
        set rotate(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.rotate !== newValue) {
                    priv.rotate = newValue;
                }
            }
        }
        get startPt() {
            return internal(this).startPt;
        }
        get obj() {
            return internal(this).obj;
        }
        set obj(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Control) {
                if (priv.obj !== newValue) {
                    priv.obj = newValue;
                }
            }
        }
        get polygon() {
            return internal(this).polygon;
        }
        set polygon(newValue) {
            const priv = internal(this);
            if (Array.isArray(newValue) {
                if (priv.polygon !== newValue) {
                    priv.polygon = newValue;
                }
            }
        }
        get spline() {
            return internal(this).spline;
        }
        set spline(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Spline) {
                if (priv.spline !== newValue) {
                    priv.spline = newValue;
                }
            }
        }
        //#region Methods
        /**
         * Start the animation
         */
        start() {
            const CLOSEPOLYGON = Types.CONSTANTS.CLOSEPOLYGON;
            const control = this.control;
            let spline = this.spline;
            let polygon = this.polygon;
            const obj = this.obj;
            const htmlElement = obj.HTMLElement;
            if (control) {
                if (spline) {
                    spline = null;
                }
                if (polygon) {
                    polygon = null;
                }
                const i = this.path.flattenToPolygon();
                this.polygon = i.Polygon;
                if (polygon.length > 1) {
                    polygon.forEach(poly => {
                        if (poly.x === CLOSEPOLYGON.x && poly.y === CLOSEPOLYGON.y) {
                            polygon[i] = polygon[i - 1];
                        }
                    });
                }
                this.spline = new Core.classes.Spline(polygon);
                if (control.visible) {
                    this.obj = control;
                } else {
                    this.obj = null;
                }
                if (obj) {
                    this.startPt.x = htmlElement.offsetLeft;
                    this.startPt.y = htmlElement.offsetTop;
                }
                super.start();
            }
        }
        /**
         * process animation on each tick
         */
        processAnimation() {
            const PX = Types.CSSUNITS.PX;
            const control = this.control;
            const form = this.form;
            const polygon = this.polygon;
            const obj = this.obj;
            const htmlElement = obj.HTMLElement;
            const htmlElementStyle = obj.HTMLElementStyle
            if (control) {
                if (!Core.isHTMLRenderer && !control.checkOwnerVisible()) {
                    return null;
                }
                if (form.loading || form.creating) {
                    return null;
                }
                super.processAnimation();
                let a = 0;
                let r = 0;
                if (!polygon) {
                    return null;
                }
                if (polygon.length > 0 && obj) {
                    if (!Core.isHTMLRenderer) {
                        if (control.allowUpdate) r = control.screenRect();
                    }
                    const nt = this.normalizedTime();
                    const oldP = new Core.classes.Point(htmlElement.offsetLeft, htmlElement.offsetTop);
                    const p1 = this.spline.splineXY(nt * polygon.length);
                    const l = this.startPt.x + p1.x;
                    const t = this.startPt.y + p1.y;
                    if (this.rotate && nt !== 0 && nt !== 1 && (oldP.x !== l && oldP.y !== t)) {
                        const v = new Core.classes.Vector(l - oldP.x, t - oldP.y);
                        const c = v.crossProductZ(new Core.classes.Vector(0, 1)) < 0;
                        if (this.inverse) {
                            a = c ? 180 + Convert.rad2Deg(Math.acos(v.angleCosine(new Core.classes.Vector(0, 1)))) : 180 - Convert.rad2Deg(Math.acos(v.angleCosine(new Core.classes.Vector(0, 1))));
                        } else {
                            a = c ? Convert.rad2Deg(Math.acos(v.angleCosine(new Core.classes.Vector(0, 1)))) : -Convert.rad2Deg(Math.acos(v.angleCosine(new Core.classes.Vector(0, 1))));
                        }
                    }
                    if (a !== 0) {
                        obj.rotateAngle = a;
                    }
                    if (!Core.isHTMLRenderer) {
                        if (control.allowUpdate) {
                            control.update();
                            control.updateXML();
                        }
                        if (!form.useRequestAnim) {
                            control.redraw(r);
                        } else {
                            form.needRedraw = true;
                        }
                    } else {
                        if (!this.loading && !form.loading) {
                            Css.updateInlineCSS(obj, Types.JSCSSPROPERTIES.TRANSFORM);
                            htmlElementStyle.left = l + PX;
                            htmlElementStyle.top = t + PX;
                            //CSS.updateInlineCSS(this.obj,jsCSSProperties.LEFT);
                            //CSS.updateInlineCSS(this.obj,jsCSSProperties.TOP);
                        }
                    }
                }
            }
        }
        /**
         * Assign properties from another animation
         * @param   {PathAnimation}     source      The animation source
         */
        assign(source) {
            if (source instanceof Core.classes.PathAnimation) {
                super.assign(source);
                this.path = source.path;
                this.rotate = source.rotate;
            }
        }
        /**
         * Destroy the instance
         */
        destroy() {
            this.path.destroy();
            this.startPt.destroy();
            if (this.polygon) {
                this.polygon.destroy();
            }
            if (this.spline) {
                this.spline.destroy();
            }
            super.destroy();
        }
        //#endregion
    }
    return PathAnimation;
})();
//#endregion
Core.classes.register(Types.CATEGORIES.ANIMATIONS, PathAnimation);
export { PathAnimation };