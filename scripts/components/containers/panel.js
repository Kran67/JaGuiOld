//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
//#endregion Import
//#region Panel
class Panel extends ThemedControl {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.allowRealignChildsOnResize = !0;
            super(owner, props);
        }
    }
    //#endregion Constructor
}
core.classes.register(core.types.CATEGORIES.CONTAINERS, Panel);
//#endregion Panel
//#region Templates
if (core.isHTMLRenderer) {
    const PanelTpl = ['<jagui-panel id="{internalId}" data-class="Panel" class="Control Panel {theme}"><properties>',
        '{ "name": "{name}", "width": 100, "height": 100 }</properties></jagui-panel>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: Panel, template: PanelTpl }]);
}
//#endregion
export { Panel };