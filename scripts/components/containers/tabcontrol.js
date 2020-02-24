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
}
//#endregion constructor
Object.seal(TabControl);
Core.classes.register(Types.CATEGORIES.CONTAINERS, TabControl);
//#region Template
//#region Template
if (Core.isHTMLRenderer) {
    const TabControlTpl = ['<jagui-tabcontrol id="{internalId}" data-class="TabControl" data-name="{name}" ',
        'class="Control TabControl csr_default {theme}"></jagui-tabcontrol>'].join(String.EMPTY);
    Core.classes.registerTemplates([
        { Class: CustomTabControl, template: TabControlTpl }
    ]);
}
//#endregion
//#endregion
export { TabControl };