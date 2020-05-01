//#region Imports
import { Bounds } from '/scripts/core/bounds.js';
//#endregion Imports
//#region Margin
class Margin extends Bounds {
    //#region constructor
    constructor(owner) {
        super(null, owner);
    }
    //#endregion constructor
}
Core.classes.register(Types.CATEGORIES.INTERNAL, Margin);
//#endregion Margin
export { Margin };