import { Position } from "/scripts/core/position.js";
//#region RotateCenter
class RotateCenter extends Position {
    constructor(owner) {
        super(new Core.classes.Point(50, 50), owner);
    }
}
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, RotateCenter);
export { RotateCenter };