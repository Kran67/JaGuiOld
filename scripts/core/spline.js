//#region Imports
import { BaseClass } from "/scripts/core/baseclass.js";
import { Interpolation } from "/scripts/core/interpolations.js";
//#endregion
//#region Spline
const Spline = (function () {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Spline extends BaseClass {
        constructor(a) {
            super();
            const priv = internal(this);
            priv.x = a.map(e => e.x);
            priv.y = a.map(e => e.y);
            priv.len = a.length;
            priv.matX = Interpolation.calcHermiteFactors(priv.x);
            priv.matY = Interpolation.calcHermiteFactors(priv.y);
            //for (let i = 0, l = priv.len; i < l; i++) {
            //    priv.x[i] = a[i].x;
            //    priv.y[i] = a[i].y;
            //}
        }
        get x() {
            return internal(this).x;
        }
        get y() {
            return internal(this).y;
        }
        get len() {
            return internal(this).len;
        }
        get matX() {
            return internal(this).matX;
        }
        get matY() {
            return internal(this).matY;
        }
        //#region Methods
        splineXY(t) {
            const len = this.len;
            const x = Interpolation.hermitInterpolate(this.matX, t, len);
            const y = Interpolation.hermitInterpolate(this.matY, t, len);
            return new Core.classes.Point(x, y);
        }
        destroy() {
            this.x.destroy();
            this.y.destroy();
            this.matX.destroy();
            this.matY.destroy();
        }
        //#endregion
    }
    return Spline;
})();
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, Spline);
export { Spline };