import { ThemedControl } from "/scripts/core/themedcontrol.js";
//#region ScrollControl
class ScrollControl extends ThemedControl {
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            //#region Private
            //#endregion
        }
    }
}
Object.seal(ScrollControl);
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, ScrollControl);
export { ScrollControl };