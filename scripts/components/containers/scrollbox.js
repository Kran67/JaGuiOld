//#region Import
import { ScrollControl } from '/scripts/core/scrollcontrol.js';
//#endregion Import
//#region ScrollBox
class ScrollBox extends ScrollControl {}
core.classes.register(core.types.CATEGORIES.CONTAINERS, ScrollBox);
Object.seal(ScrollBox);
//#endregion ScrollBox
//#region Templates
if (core.isHTMLRenderer) {
    const ScrollBoxTpl = ['<jagui-scrollbox id="{internalId}" data-class="ScrollBox" class="Control scrollContent ScrollBox {theme}">',
        '<properties>{ "name": "{name}", "width": 140, "height": 140 }</properties></jagui-scrollbox>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: ScrollBox, template: ScrollBoxTpl }]);
}
//#endregion
export { ScrollBox };