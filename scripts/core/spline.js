//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Interpolation } from '/scripts/core/interpolations.js';
//#endregion
//#region Spline
class Spline extends BaseClass {
    //#region constructor
    constructor(a) {
        super();
        core.private(this, {
            x: a.map(e => e.x),
            y: a.map(e => e.y),
            len: a.length,
            matX: Interpolation.calcHermiteFactors(priv.x),
            matY: Interpolation.calcHermiteFactors(priv.y)
        });
        //for (let i = 0, l = priv.len; i < l; i++) {
        //    priv.x[i] = a[i].x;
        //    priv.y[i] = a[i].y;
        //}
    }
    //#endregion constructor
    //#region Getter / Setter
    //#region x
    get x() {
        return core.private(this).x;
    }
    //#endregion x
    //#region y
    get y() {
        return core.private(this).y;
    }
    //#endregion y
    //#region len
    get len() {
        return core.private(this).len;
    }
    //#endregion len
    //#region matX
    get matX() {
        return core.private(this).matX;
    }
    //#endregion matX
    //#region matY
    get matY() {
        return core.private(this).matY;
    }
    //#endregion matY
    //#endregion Getter / Setter
    //#region Methods
    //#region splineXY
    splineXY(t) {
        //#region Variables déclaration
        const priv = core.private(this);
        const len = priv.len;
        const x = Interpolation.hermitInterpolate(priv.matX, t, len);
        const y = Interpolation.hermitInterpolate(priv.matY, t, len);
        //#endregion Variables déclaration
        return new core.classes.Point(x, y);
    }
    //#endregion splineXY
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.x.destroy();
        priv.y.destroy();
        priv.matX.destroy();
        priv.matY.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, Spline);
//#endregion Spline
export { Spline };