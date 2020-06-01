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
            core.private(this, {
                // Initialization
                path: new core.classes.PathData(this),
                rotate: !1,
                startPt: new core.classes.Point(1, 1),
                obj: null,
                polygon: null,
                spline: null
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region path
    get path() {
        return core.private(this).path;
    }
    set path(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        newValue instanceof core.classes.PathData && priv.path !== newValue && (priv.path = newValue);
    }
    //#endregion path
    //#region rotate
    get rotate() {
        return core.private(this).rotate;
    }
    set rotate(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv.rotate !== newValue && (priv.rotate = newValue);
    }
    //#endregion rotate
    //#region startPt
    get startPt() {
        return core.private(this).startPt;
    }
    //#endregion startPt
    //#region obj
    get obj() {
        return core.private(this).obj;
    }
    set obj(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        newValue instanceof core.classes.Control && priv.obj !== newValue && (priv.obj = newValue);
    }
    //#endregion obj
    //#region polygon
    get polygon() {
        return core.private(this).polygon;
    }
    set polygon(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        Array.isArray(newValue) && priv.polygon !== newValue && (priv.polygon = newValue);
    }
    //#endregion polygon
    //#region spline
    get spline() {
        return core.private(this).spline;
    }
    set spline(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        newValue instanceof core.classes.Spline && priv.spline !== newValue && (priv.spline = newValue);
    }
    //#endregion spline
    //#endregion Getters / Setters
    //#region Methods
    /**
     * Start the animation
     */
    start() {
        //#region Variables déclaration
        const CLOSEPOLYGON = core.types.CONSTANTS.CLOSEPOLYGON;
        const control = this.control;
        let spline = this.spline;
        let polygon = this.polygon;
        const obj = this.obj;
        const htmlElement = obj.HTMLElement;
        //#endregion Variables déclaration
        if (control) {
            spline && (spline = null);
            polygon && (polygon = null);
            const i = this.path.flattenToPolygon();
            this.polygon = i.Polygon;
            if (polygon.length > 1) {
                polygon.forEach(poly => {
                    poly.x === CLOSEPOLYGON.x && poly.y === CLOSEPOLYGON.y && (polygon[i] = polygon[i - 1]);
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
        //#region Variables déclaration
        const PX = core.types.CSSUNITS.PX;
        const control = this.control;
        const form = this.form;
        const polygon = this.polygon;
        const obj = this.obj;
        const htmlElement = obj.HTMLElement;
        const htmlElementStyle = obj.HTMLElementStyle;
        //#endregion Variables déclaration
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
                !core.isHTMLRenderer && control.allowUpdate && (r = control.screenRect());
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
                a !== 0 && (obj.rotateAngle = a);
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.path.destroy();
        priv.startPt.destroy();
        priv.polygon && (priv.polygon.destroy());
        priv.spline && (priv.spline.destroy());
        super.destroy();
    }
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.ANIMATIONS, PathAnimation);
//#endregion PathAnimation
export { PathAnimation };