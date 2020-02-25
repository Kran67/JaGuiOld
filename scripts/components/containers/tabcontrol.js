//#region Import
import { CaptionControl } from '/scripts/core/captioncontrol.js';
//#endregion Import
//#region Class TabControl
class TabControl extends CaptionControl {
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
        }
    }
    //#endregion constructor
}
Object.seal(TabControl);
Core.classes.register(Types.CATEGORIES.CONTAINERS, TabControl);
//#endregion Class TabControl
//#region Template
if (Core.isHTMLRenderer) {
    const TabControlTpl = ['<jagui-tabcontrol id="{internalId}" data-class="TabControl" ',
        'class="Control TabControl csr_default {theme}"><jagui-tabcontrolheader class="Control TabControlHeader {theme}">',
        '<jagui-tabscontainer class="Control TabsContainer {theme}"></jagui-tabscontainer>',
        '</jagui-tabcontrolheader></jagui-tabcontrol>'].join(String.EMPTY);
    Core.classes.registerTemplates([
        { Class: CustomTabControl, template: TabControlTpl }
    ]);
}
//#endregion
export { TabControl };