//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
//#endregion Import
//#region Panel
class Panel extends ThemedControl {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.allowRealignChildsOnResize = !0;
        }
    }
    //#endregion Constructor
}
//#endregion Panel
Core.classes.register(Types.CATEGORIES.CONTAINERS, Panel);
export { Panel };
//#region Templates
if (Core.isHTMLRenderer) {
    const PanelTpl = ['<jagui-panel id="{internalId}" data-class="Panel" class="Control Panel {theme}"><properties>',
        '{ "name": "{name}", "width": 100, "height": 100 }</properties></jagui-panel>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: Panel, template: PanelTpl }]);
}
//#endregion