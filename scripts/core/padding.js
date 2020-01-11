import { Bounds } from "/scripts/core/bounds.js";
//#region Padding
class Padding extends Bounds {
    constructor(owner) {
        super(null, owner);
    }
}
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, Padding);
export { Padding };