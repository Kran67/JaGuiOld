//#region imports
import { Position } from '/scripts/core/position.js';
//#endregion imports
//#region RotateCenter
class RotateCenter extends Position {
    //#region constructor
    constructor(owner) {
        super(new core.classes.Point(50, 50), owner);
    }
    //#endregion constructor
}
core.classes.register(core.types.CATEGORIES.INTERNAL, RotateCenter);
//#endregion RotateCenter
export { RotateCenter };