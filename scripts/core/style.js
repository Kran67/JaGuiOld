//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
//#endregion Imports
//#region Style
class Style extends BaseClass {
    //#region constructor
    constructor(parentClasses, props) {
        !Array.isArray(parentClasses)?parentClasses = []:1;
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
core.classes.register(core.types.CATEGORIES.INTERNAL, Style);
//#endregion Style
export { Style };