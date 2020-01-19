//#region Imports
import { ThemedControl } from "/scripts/core/themedcontrol.js";
//#endregion Imports
//#region ScrollControl
class ScrollControl extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            //#region Private
            //#endregion
        }
    }
    //#endregion constructor
}
Object.seal(ScrollControl);
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, ScrollControl);
export { ScrollControl };