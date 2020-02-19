//#region Imports
import { Bounds } from '/scripts/core/bounds.js';
//#endregion Imports
//#region Padding
class Padding extends Bounds {
    //#region constructor
    constructor(owner) {
        super(null, owner);
    }
    //#endregion constructor
}
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, Padding);
export { Padding };