//#region Imports
import { Position } from "/scripts/core/position.js";
//#endregion Imports
//#region Scale
class Scale extends Position {
    //#region constructor
    constructor(owner) {
        super(new Core.classes.Point(1, 1), owner);
    }
    //#endregion constructor
}
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, Scale);
export { Scale };