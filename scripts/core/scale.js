import { Position } from "/scripts/core/position.js";
//#region Scale
class Scale extends Position {
    constructor(owner) {
        super(new Core.classes.Point(1, 1), owner);
    }
}
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, Scale);
export { Scale };