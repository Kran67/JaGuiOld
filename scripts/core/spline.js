//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Interpolation } from '/scripts/core/interpolations.js';
//#endregion
//#region Spline
const Spline = (function () {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Spline
    class Spline extends BaseClass {
        //#region constructor
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
        //#endregion constructor
        //#region Getter / Setter
        //#region x
        get x() {
            return internal(this).x;
        }
        //#endregion x
        //#region y
        get y() {
            return internal(this).y;
        }
        //#endregion y
        //#region len
        get len() {
            return internal(this).len;
        }
        //#endregion len
        //#region matX
        get matX() {
            return internal(this).matX;
        }
        //#endregion matX
        //#region matY
        get matY() {
            return internal(this).matY;
        }
        //#endregion matY
        //#endregion Getter / Setter
        //#region Methods
        //#region splineXY
        splineXY(t) {
            //#region Variables déclaration
            const priv = internal(this);
            const len = priv.len;
            const x = Interpolation.hermitInterpolate(priv.matX, t, len);
            const y = Interpolation.hermitInterpolate(priv.matY, t, len);
            //#endregion Variables déclaration
            return new Core.classes.Point(x, y);
        }
        //#endregion splineXY
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.x.destroy();
            priv.y.destroy();
            priv.matX.destroy();
            priv.matY.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return Spline;
    //#endregion Spline
})();
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, Spline);
export { Spline };