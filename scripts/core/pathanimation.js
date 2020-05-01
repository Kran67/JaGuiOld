//#region Imports
import { Css } from '/scripts/core/css.js';
import { Convert } from '/scripts/core/convert.js';
//import { Vector, Point } from '/scripts/core/geometry.js';
//import { Spline } from '/scripts/core/spline.js';
//import { PathData } from '/scripts/core/path.js';
import { Animation } from '/scripts/core/animation.js';
//#endregion
//#region PathAnimation
/**
 * Class representing an PathAnimation.
 * @extends {Animation}
 */
const PathAnimation = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) ? _private.set(key, {}) : 1;
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class PathAnimation
    class PathAnimation extends Animation {
        /**
         * Create a new instance of PathAnimation.
         * @param   {Object}    owner       Owner of the PathAnimation.
         * @param   {Object}    props       Properties to initialize the PathAnimation.
         * @param   {Boolean}   autoStart   Start the animation after creation.
         */
        //#region constructor
        constructor(owner, props, autoStart) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props, autoStart);
                const priv = internal(this);
                // Initialization
                priv.path = new core.classes.PathData(this);
                priv.rotate = !1;
                priv.startPt = new core.classes.Point(1, 1);
                priv.obj = null;
                priv.polygon = null;
                priv.spline = null;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region path
        get path() {
            return internal(this).path;
        }
        set path(newValue) {
            const priv = internal(this);
            newValue instanceof core.classes.PathData && priv.path !== newValue ? priv.path = newValue : 1;
        }
        //#endregion path
        //#region rotate
        get rotate() {
            return internal(this).rotate;
        }
        set rotate(newValue) {
            const priv = internal(this);
            core.tools.isBool(newValue) && priv.rotate !== newValue ? priv.rotate = newValue : 1;
        }
        //#endregion rotate
        //#region startPt
        get startPt() {
            return internal(this).startPt;
        }
        //#endregion startPt
        //#region obj
        get obj() {
            return internal(this).obj;
        }
        set obj(newValue) {
            const priv = internal(this);
            newValue instanceof core.classes.Control && priv.obj !== newValue ? priv.obj = newValue : 1;
        }
        //#endregion obj
        //#region polygon
        get polygon() {
            return internal(this).polygon;
        }
        set polygon(newValue) {
            const priv = internal(this);
            Array.isArray(newValue) && priv.polygon !== newValue ? priv.polygon = newValue : 1;
        }
        //#endregion polygon
        //#region spline
        get spline() {
            return internal(this).spline;
        }
        set spline(newValue) {
            const priv = internal(this);
            newValue instanceof core.classes.Spline && priv.spline !== newValue ? priv.spline = newValue : 1;
        }
        //#endregion spline
        //#endregion Getters / Setters
        //#region Methods
        /**
         * Start the animation
         */
        start() {
            const CLOSEPOLYGON = core.types.CONSTANTS.CLOSEPOLYGON;
            const control = this.control;
            let spline = this.spline;
            let polygon = this.polygon;
            const obj = this.obj;
            const htmlElement = obj.HTMLElement;
            if (control) {
                spline ? spline = null : 1;
                polygon ? polygon = null : 1;
                const i = this.path.flattenToPolygon();
                this.polygon = i.Polygon;
                if (polygon.length > 1) {
                    polygon.forEach(poly => {
                        poly.x === CLOSEPOLYGON.x && poly.y === CLOSEPOLYGON.y ? polygon[i] = polygon[i - 1] : 1;
                    });
                }
                this.spline = new core.classes.Spline(polygon);
                this.obj = control.visible ? control : null;
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
            const PX = core.types.CSSUNITS.PX;
            const control = this.control;
            const form = this.form;
            const polygon = this.polygon;
            const obj = this.obj;
            const htmlElement = obj.HTMLElement;
            const htmlElementStyle = obj.HTMLElementStyle
            if (control) {
                if (!core.isHTMLRenderer && !control.checkOwnerVisible()) {
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
                    !core.isHTMLRenderer && control.allowUpdate)?r = control.screenRect(): 1;
                    const nt = this.normalizedTime();
                    const oldP = new core.classes.Point(htmlElement.offsetLeft, htmlElement.offsetTop);
                    const p1 = this.spline.splineXY(nt * polygon.length);
                    const l = this.startPt.x + p1.x;
                    const t = this.startPt.y + p1.y;
                    if (this.rotate && nt !== 0 && nt !== 1 && (oldP.x !== l && oldP.y !== t)) {
                        const v = new core.classes.Vector(l - oldP.x, t - oldP.y);
                        const c = v.crossProductZ(new core.classes.Vector(0, 1)) < 0;
                        if (this.inverse) {
                            c ? 180 + Convert.rad2Deg(Math.acos(v.angleCosine(new core.classes.Vector(0, 1)))) : 180 - Convert.rad2Deg(Math.acos(v.angleCosine(new core.classes.Vector(0, 1))));
                        } else {
                            a = c ? Convert.rad2Deg(Math.acos(v.angleCosine(new core.classes.Vector(0, 1)))) : -Convert.rad2Deg(Math.acos(v.angleCosine(new core.classes.Vector(0, 1))));
                        }
                    }
                    a !== 0 ? obj.rotateAngle = a : 1;
                    if (!core.isHTMLRenderer) {
                        if (control.allowUpdate) {
                            control.update();
                            control.updateXML();
                        }
                        !form.useRequestAnim ? control.redraw(r) : form.needRedraw = true;
                    } else {
                        if (!this.loading && !form.loading) {
                            Css.updateInlineCSS(obj, core.types.JSCSSPROPERTIES.TRANSFORM);
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
            if (source instanceof core.classes.PathAnimation) {
                super.assign(source);
                this.path = source.path;
                this.rotate = source.rotate;
            }
        }
        /**
         * Destroy the instance
         */
        destroy() {
            priv.path.destroy();
            priv.startPt.destroy();
            priv.polygon ? priv.polygon.destroy() : 1;
            priv.spline ? priv.spline.destroy() : 1;
            priv.path = null;
            priv.rotate = null;
            priv.startPt = null;
            priv.obj = null;
            priv.polygon = null;
            priv.spline = null;
            super.destroy();
        }
        //#endregion Methods
    }
    return PathAnimation;
    //#endregion PathAnimation
})();
core.classes.register(core.types.CATEGORIES.ANIMATIONS, PathAnimation);
//#endregion PathAnimation
export { PathAnimation };