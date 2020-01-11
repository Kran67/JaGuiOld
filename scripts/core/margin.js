import { Bounds } from "/scripts/core/bounds.js";
//#region Margin
class Margin extends Bounds {
    constructor(owner) {
        super(null, owner);
    }
}
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, Margin);
export { Margin };