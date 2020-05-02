//#region Imports
import { Position } from '/scripts/core/position.js';
//#endregion Imports
//#region Scale
class Scale extends Position {
    //#region constructor
    constructor(owner) {
        super(new core.classes.Point(1, 1), owner);
    }
    //#endregion constructor
}
core.classes.register(core.types.CATEGORIES.INTERNAL, Scale);
//#endregion Scale
export { Scale };