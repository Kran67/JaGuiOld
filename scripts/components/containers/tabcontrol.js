//#region Import
import { CaptionControl } from '/scripts/core/captioncontrol.js';
//#endregion Import
//#region Class TabControl
class TabControl extends CaptionControl {}
Object.seal(TabControl);
core.classes.register(core.types.CATEGORIES.CONTAINERS, TabControl);
//#endregion Class TabControl
//#region Template
if (core.isHTMLRenderer) {
    const TabControlTpl = ['<jagui-tabcontrol id="{internalId}" data-class="TabControl" ',
        'class="Control TabControl csr_default {theme}"><jagui-tabcontrolheader class="Control TabControlHeader {theme}">',
        '<jagui-tabscontainer class="Control TabsContainer {theme}"></jagui-tabscontainer>',
        '</jagui-tabcontrolheader></jagui-tabcontrol>'].join(String.EMPTY);
    core.classes.registerTemplates([
        { Class: CustomTabControl, template: TabControlTpl }
    ]);
}
//#endregion
export { TabControl };