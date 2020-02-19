//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
//#endregion Imports
//#region Style
class Style extends BaseClass {
    //#region constructor
    constructor(parentClasses, props) {
        if (!Array.isArray(parentClasses)) {
            parentClasses = [];
        }
        if (!parentClasses.isEmpty) {
            parentClasses.forEach(parentClasse => {
                const keys = Object.keys(parentClasse);
                keys.forEach(key => {
                    this[key] = parentClasse[key];
                });
            });
        }
        if (props) {
            const keys = Object.keys(props);
            keys.forEach(key => {
                this[key] = props[key];
            });
        }
    }
    //#endregion constructor
}
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, Style);
export { Style };