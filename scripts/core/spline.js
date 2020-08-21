//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Interpolation } from '/scripts/core/interpolations.js';
//#endregion
//#region Spline
class Spline extends BaseClass {
    //#region Private fields
    #x;
    #y;
    #len;
    #matX;
    #matY;
    //#endregion Private fields
    //#region constructor
    constructor(a) {
        super();
        this.#x = a.map(e => e.x);
        this.#y = a.map(e => e.y);
        this.#len = a.length;
        this.#matX = Interpolation.calcHermiteFactors(this.#x);
        this.#matY = Interpolation.calcHermiteFactors(this.#y);
    }
    //#endregion constructor
    //#region Getter / Setter
    //#region x
    get x() {
        return this.#x;
    }
    //#endregion x
    //#region y
    get y() {
        return this.#y;
    }
    //#endregion y
    //#region len
    get len() {
        return this.#len;
    }
    //#endregion len
    //#region matX
    get matX() {
        return this.#matX;
    }
    //#endregion matX
    //#region matY
    get matY() {
        return this.#matY;
    }
    //#endregion matY
    //#endregion Getter / Setter
    //#region Methods
    //#region splineXY
    splineXY(t) {
        //#region Variables déclaration
        const len = this.#len;
        const x = Interpolation.hermitInterpolate(this.#matX, t, len);
        const y = Interpolation.hermitInterpolate(this.#matY, t, len);
        //#endregion Variables déclaration
        return new core.classes.Point(x, y);
    }
    //#endregion splineXY
    //#region destroy
    destroy() {
        this.#x.destroy();
        this.#y.destroy();
        this.#matX.destroy();
        this.#matY.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, Spline);
//#endregion Spline
export { Spline };