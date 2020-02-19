//#region imports
import { Position } from '/scripts/core/position.js';
//#endregion imports
//#region RotateCenter
class RotateCenter extends Position {
    //#region constructor
    constructor(owner) {
        super(new Core.classes.Point(50, 50), owner);
    }
    //#endregion constructor
}
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, RotateCenter);
export { RotateCenter };