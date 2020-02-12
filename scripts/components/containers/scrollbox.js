//#region Import
import { ScrollControl } from "/scripts/core/scrollcontrol.js";
//#endregion Import
//#region ScrollBox
class ScrollBox extends ScrollControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#endregion Getters / Setters
}
Core.classes.register(Types.CATEGORIES.CONTAINERS, ScrollBox);
Object.seal(ScrollBox);
//#endregion ScrollBox
export { ScrollBox };
//#region Templates
if (Core.isHTMLRenderer) {
    const ScrollBoxTpl = ["<jagui-scrollbox id=\"{internalId}\" data-class=\"ScrollBox\" class=\"Control scrollContent ScrollBox {theme}\"><properties>{ \"name\": \"{name}\", \"width\": 140, \"height\": 140 }</properties></jagui-scrollbox>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: ScrollBox, template: ScrollBoxTpl }]);
}
//#endregion